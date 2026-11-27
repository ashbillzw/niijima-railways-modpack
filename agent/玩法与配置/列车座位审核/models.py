"""Render textured Minecraft JSON cuboids with orthographic projection and per-pixel depth."""
from functools import lru_cache
from io import BytesIO
from math import cos, sin, radians
import numpy as np
from PIL import Image

def resource(identifier, kind, suffix):
    namespace, sep, path = identifier.partition(":")
    if not sep:
        namespace, path = "minecraft", namespace
    return f"assets/{namespace}/{kind}/{path}{suffix}"

# Vertices correspond to (u1,v1), (u2,v1), (u2,v2), (u1,v2) on each face.
faces = {
    "north": ([(1,1,0),(0,1,0),(0,0,0),(1,0,0)], .87),
    "south": ([(0,1,1),(1,1,1),(1,0,1),(0,0,1)], .87),
    "west": ([(0,1,0),(0,1,1),(0,0,1),(0,0,0)], .76),
    "east": ([(1,1,1),(1,1,0),(1,0,0),(1,0,1)], .76),
    "up": ([(0,1,0),(1,1,0),(1,1,1),(0,1,1)], 1.0),
    "down": ([(0,0,1),(1,0,1),(1,0,0),(0,0,0)], .65),
}
def auto_uv(face, a, b):
    x,y,z = a
    X,Y,Z = b
    return {"north":[16-X,16-Y,16-x,16-y],"south":[x,16-Y,X,16-y],
            "east":[16-Z,16-Y,16-z,16-y],"west":[z,16-Y,Z,16-y],
            "up":[x,z,X,Z],"down":[x,16-Z,X,16-z]}[face]

def rotate(points, rot):
    axis = "xyz".index(rot["axis"])
    i,j = (axis+1)%3,(axis+2)%3
    angle = radians(rot["angle"])
    origin = np.array(rot.get("origin",[8,8,8]))
    q = points-origin
    a,b = q[:,i].copy(),q[:,j].copy()
    scale = 1/cos(angle) if rot.get("rescale") else 1
    q[:,i] = (a*cos(angle)-b*sin(angle))*scale
    q[:,j] = (a*sin(angle)+b*cos(angle))*scale
    return q+origin

class Renderer:
    def __init__(self, assets):
        self.assets = assets

    @lru_cache(maxsize=8192)
    def model(self, model):
        data = self.assets.json(resource(model,"models",".json"))
        elements, tex = [], {}
        if data.get("parent") and data["parent"] not in ("builtin/entity","minecraft:builtin/entity","builtin/generated","minecraft:builtin/generated","item/generated","minecraft:item/generated"):
            elements, tex = self.model(data["parent"])
        return data.get("elements", elements), {**tex, **data.get("textures",{})}

    @lru_cache(maxsize=1024)
    def texture(self, name):
        if name=="minecraft:missingno":
            check=np.indices((16,16))//8
            return np.array([[0,0,0,255],[248,0,248,255]],np.uint8)[(check[0]+check[1])%2]
        im = Image.open(BytesIO(self.assets.read(resource(name,"textures",".png")))).convert("RGBA")
        if im.height>im.width and resource(name,"textures",".png.mcmeta") in self.assets.files:
            im=im.crop((0,0,im.width,im.width))
        return np.asarray(im)

    def render(self, parts, out):
        quads = []
        right=np.array([.82,0,.57]); right/=np.linalg.norm(right)
        forward=np.array([right[2]*.87,.493,-right[0]*.87]); forward/=np.linalg.norm(forward)
        up=np.cross(right,forward)
        axes=np.array([right,-up,forward]).T
        for elements, tex, state in parts:
            for el in elements:
                a,b=np.array(el["from"],float),np.array(el["to"],float)
                for face, spec in el.get("faces",{}).items():
                    corners,light = faces[face]
                    v = a+(b-a)*np.array(corners)
                    if el.get("rotation"):
                        v = rotate(v,el["rotation"])
                    for transform in el.get("boneRotations",[]):
                        v=rotate(v,transform)
                    for axis in ("x","y"):
                        if state.get(axis):
                            v=rotate(v,{"axis":axis,"angle":-state[axis]})
                    v=v@axes
                    side1,side2=v[1]-v[0],v[3]-v[0]
                    # With screen Y down the front face has negative signed area.
                    if side1[0]*side2[1]-side1[1]*side2[0] >= -1e-6:
                        continue
                    key=spec["texture"]
                    seen=set()
                    while key.startswith("#"):
                        if key in seen: raise ValueError("texture cycle")
                        seen.add(key)
                        key="minecraft:missingno" if key=="#missing" else tex[key[1:]]
                    img=self.texture(key)
                    uv=spec.get("uv",auto_uv(face,a,b))
                    u,t,U,T=uv
                    coords=np.array([(u,t),(U,t),(U,T),(u,T)],float)/16
                    coords=np.roll(coords,-(spec.get("rotation",0)//90),axis=0)
                    quads.append((v,img,coords,light))
        if not quads: raise ValueError("model has no visible cuboids")
        size=200
        points=np.concatenate([q[0] for q in quads])
        lo,hi=points[:,:2].min(0),points[:,:2].max(0)
        zoom=(size-18)/max(hi-lo)
        depth=np.full((size,size),-np.inf)
        image=np.zeros((size,size,4),dtype=np.uint8)
        for v,img,uv,light in quads:
            xy=(v[:,:2]-(lo+hi)/2)*zoom+size/2
            x0,y0=np.maximum(0,np.floor(xy.min(0)).astype(int))
            x1,y1=np.minimum(size,np.ceil(xy.max(0)).astype(int))
            if x1<=x0 or y1<=y0: continue
            x,y=np.meshgrid(np.arange(x0,x1)+.5-xy[0,0],np.arange(y0,y1)+.5-xy[0,1])
            (ax,ay),(bx,by)=xy[1]-xy[0],xy[3]-xy[0]
            det=ax*by-ay*bx
            s,t=(by*x-bx*y)/det,(-ay*x+ax*y)/det
            z=v[0,2]+s*(v[1,2]-v[0,2])+t*(v[3,2]-v[0,2])
            d=depth[y0:y1,x0:x1]
            mask=(s>=0)&(s<=1)&(t>=0)&(t<=1)&(z>=d-1e-6)
            if not mask.any(): continue
            u=uv[0,0]+s*(uv[1,0]-uv[0,0])+t*(uv[3,0]-uv[0,0])
            h=uv[0,1]+s*(uv[1,1]-uv[0,1])+t*(uv[3,1]-uv[0,1])
            pixels=img[np.floor(h*img.shape[0]).astype(int)%img.shape[0],np.floor(u*img.shape[1]).astype(int)%img.shape[1]]
            mask &= pixels[:,:,3]>8
            values=pixels[mask].copy()
            values[:,:3]=(values[:,:3]*light).astype(np.uint8)
            image[y0:y1,x0:x1][mask]=values
            d[mask]=z[mask]
        if not image[:,:,3].any(): raise ValueError("empty render")
        Image.fromarray(image).save(out)

