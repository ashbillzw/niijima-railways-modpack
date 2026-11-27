"""Static bed previews: vanilla BedRenderer cuboid dimensions and packaged entity textures."""
def vanilla_bed(color):
    blocks=[]
    for z,offset in ((0,0),(16,22)):
        # Unfold the 16 x 16 x 6 mattress at each half's texture offset.
        uvs={"up":[6,offset+6,22,offset+22],"north":[6,offset,22,offset+6],
             "south":[22,offset,38,offset+6],"east":[22,offset+6,28,offset+22],
             "west":[0,offset+6,6,offset+22],"down":[28,offset+6,44,offset+22]}
        blocks.append({"from":[0,3,z],"to":[16,9,z+16],
                       "faces":{f:{"uv":[v/4 for v in uv],"texture":"#bed"} for f,uv in uvs.items()}})
    for x,z,v in [(0,0,6),(13,0,18),(0,29,0),(13,29,12)]:
        blocks.append({"from":[x,0,z],"to":[x+3,3,z+3],"faces":{
            f:{"uv":[53/4,(v+3)/4,56/4,(v+6)/4],"texture":"#bed"}
            for f in ("up","down","west","east","south","north")}})
    return blocks,{"bed":"minecraft:entity/bed/"+color},{}

def bedrock(assets, path):
    model="touhou_little_maid:bedrock/block/"+path
    data=assets.json("assets/touhou_little_maid/models/bedrock/block/"+path+".json")["minecraft:geometry"][0]
    w,h=[data["description"]["texture_"+k] for k in ("width","height")]
    elems=[]
    bones={b["name"]:b for b in data["bones"]}
    for bone in data["bones"]:
        for c in bone.get("cubes",[]):
            inflated=c.get("inflate",0)
            element={"from":[p-inflated for p in c["origin"]],
                     "to":[a+b+inflated for a,b in zip(c["origin"],c["size"])],"faces":{}}
            uv=c["uv"]
            if isinstance(uv,list):
                u,v=uv
                dx,dy,dz=[round(n) for n in c["size"]]
                box={"north":(u+dz,v+dz,dx,dy),"south":(u+2*dz+dx,v+dz,dx,dy),
                     "west":(u,v+dz,dz,dy),"east":(u+dz+dx,v+dz,dz,dy),
                     "up":(u+dz,v,dx,dz),"down":(u+dz+dx,v+dz,dx,-dz)}
                uv={f:{"uv":dims[:2],"uv_size":dims[2:]} for f,dims in box.items()}
            for direction,rect in uv.items():
                x,y=rect["uv"]
                dx,dy=rect["uv_size"]
                element["faces"][direction]={"texture":"#bed","uv":[x*16/w,y*16/h,(x+dx)*16/w,(y+dy)*16/h]}
            transforms=[]
            part=c
            chain=[c]
            part=bone
            while part:
                chain.append(part)
                part=bones.get(part.get("parent"))
            for part in chain:
                for axis,angle in zip("xyz",part.get("rotation",[])):
                    if angle: transforms.append({"axis":axis,"angle":angle,"origin":part["pivot"]})
            element["boneRotations"]=transforms
            elems.append(element)
    return elems,{"bed":model},{}

