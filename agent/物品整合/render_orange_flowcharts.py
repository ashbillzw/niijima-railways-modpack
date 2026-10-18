from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
import math
OUT=Path(__file__).parent/'delivery'; OUT.mkdir(exist_ok=True)
W,H=3200,3600
C={'a':('#fff0cf','#bf9137'),'f':('#e4f2df','#6e9a62'),'c':('#dff1ef','#468b87'),'n':('#edf0f5','#8392a5'),'warn':('#fff0e6','#c76e3f')}
def font(s,b=False):return ImageFont.truetype('C:/Windows/Fonts/msyhbd.ttc' if b else 'C:/Windows/Fonts/msyh.ttc',s)
def text(x,y,t,s=30,color='#283949',bold=False):d.text((x,y),t,font=font(s,bold),fill=color)
def center(x,y,t,s=30,b=False,color='#283949'):
 lines=t.split('\n');lh=s+13
 for i,line in enumerate(lines):d.text((x-d.textlength(line,font=font(s,b))/2,y-len(lines)*lh/2+i*lh),line,font=font(s,b),fill=color)
def label(x,y,t,s=28):
 ls=t.split('\n');ww=max(d.textlength(v,font=font(s)) for v in ls)+24;hh=len(ls)*(s+13)+10
 d.rectangle((x-ww/2,y-hh/2,x+ww/2,y+hh/2),fill='white');center(x,y,t,s)
def node(x,y,t,k='n',w=620,h=125,s=32):
 a,b=C[k];d.rounded_rectangle((x-w/2,y-h/2,x+w/2,y+h/2),20,fill=a,outline=b,width=3);center(x,y,t,s,True)
def edge(points,label='',at=None,hot=False,dash=False):
 c='#b76936' if hot else '#7f92a7'
 for (x,y),(xx,yy) in zip(points,points[1:]):
  dist=math.hypot(xx-x,yy-y)
  if dash:
   for k in range(0,int(dist),24):
    a=k/dist;b=min(k+12,dist)/dist;d.line((x+(xx-x)*a,y+(yy-y)*a,x+(xx-x)*b,y+(yy-y)*b),fill=c,width=4)
  else:d.line((x,y,xx,yy),fill=c,width=4)
 x,y=points[-1];px,py=points[-2];a=math.atan2(y-py,x-px)
 d.polygon([(x,y),(x-17*math.cos(a)+8*math.sin(a),y-17*math.sin(a)-8*math.cos(a)),(x-17*math.cos(a)-8*math.sin(a),y-17*math.sin(a)+8*math.cos(a))],fill=c)
 if label:
  x,y=at;ls=label.split('\n');ww=max(d.textlength(t,font=font(28)) for t in ls)+30;hh=len(ls)*41+12
  d.rectangle((x-ww/2,y-hh/2,x+ww/2,y+hh/2),fill='white');center(x,y,label,28,color=c)
for after in (False,True):
 im=Image.new('RGB',(W,H),'#f3f5f8');d=ImageDraw.Draw(im)
 text(70,35,'02  AFTER｜统一到 Atmospheric 橙子（提案，尚未实施）' if after else '01  BEFORE｜两种橙子，已经共享一部分加工链',48,bold=True)
 text(75,110,'悠然一派 Atmospheric 6.1.1 · 水果乐事 Fruits Delight 1.1.3 · 当前包配方与代码核对',29,color='#64758b')
 for x,k,t in [(80,'a','悠然一派'),(640,'f','水果乐事'),(1200,'c','机械动力'),(1800,'warn','拟改动／需额外适配')]:
  d.rounded_rectangle((x,175,x+25,200),4,fill=C[k][0],outline=C[k][1]);text(x+40,169,t,27)
 d.rounded_rectangle((35,235,W-35,H-50),25,fill='white')
 node(850,340,'月桂树上的橙子方块\n野生生成／种树获得','a',900)
 node(2350,340,'橙子树的成熟果叶\n野生生成／种树获得','f',900)
 if not after:
  node(850,610,'Atmospheric 橙子\natmospheric:orange','a',900)
  node(2350,610,'水果乐事橙子\nfruitsdelight:orange','f',900)
  edge([(850,403),(850,547)],'打落果实',(850,475))
  edge([(2350,403),(2350,547)],'采收／成熟叶掉落',(2350,475))
  edge([(850,673),(850,770),(1600,770),(1600,817)])
  edge([(2350,673),(2350,770),(1600,770),(1600,817)])
 else:
  node(1600,610,'统一橙子 · atmospheric:orange\n两种树和生长方式继续保留','a',1150)
  edge([(850,403),(850,470),(1350,470),(1350,547)],'原产物保留',(1080,470))
  edge([(2350,403),(2350,470),(1850,470),(1850,547)],'采收产物改为统一橙子',(2130,470),True)
  edge([(1600,673),(1600,817)])
 node(1600,880,'橙子原料池 · forge:fruits/orange\n'+('以下标签配方原本就接受两种橙子' if not after else '两种来源汇入同一物品，原配方数量不变'),'n',1300)
 # four separated output lanes, shared trunk above labels
 xs=[430,1210,1990,2770]
 edge([(1600,943),(1600,1010),(430,1010),(430,1300)])
 for x in xs[1:]:edge([(1600,1010),(x,1010),(x,1300)])
 label(430,1170,'工作台\n＋糖／布丁辅料／冰块与碗',28)
 label(1210,1170,'砧板＋刀：1 橙 → 4 片\n动力锯：'+('仅水果乐事橙子' if not after else '改为接受统一橙子'),28)
 label(1990,1170,'2 橙＋糖＋水瓶 → 1 瓶\n或搅拌＋水后灌瓶（250 mB）',28)
 label(2770,1170,'烹饪锅：2 橙＋糖\n＋柠檬片＋空瓶',28)
 node(430,1380,'糖渍橙子片／橙子布丁\n橙子冰糕','a',620,160)
 node(1210,1380,'橙子片 ×4','f',620,160)
 node(1990,1380,'瓶装橙汁 ×1','f',620,160)
 node(2770,1380,'瓶装橙子果酱 ×1','f',620,160)
 edge([(1210,1460),(1210,1640)],'烹饪锅：4 片＋肉与辅料',(1210,1550))
 node(1210,1720,'橙子鸡／橙香猪排\n每份配方使用 4 片','f',620,160)
 edge([(1990,1460),(1990,1640)],'分液／灌装 互转 空瓶',(1990,1550))
 node(1990,1720,'橙汁流体 · 250 mB／瓶','c',620,160)
 edge([(2770,1460),(2770,1640)],'分液／灌装 互转 空瓶',(2770,1550))
 node(2770,1720,'橙子果酱流体\n125 mB／瓶','c',620,160)
 # jam alternative manufacture from orange bus via reserved outer lane would collide: show as standalone recipe route
 node(430,1720,'加热搅拌\n2 橙＋糖＋柠檬片＋100 mB 水','c',620,160,s=28)
 edge([(430,1800),(430,1910),(2770,1910),(2770,1800)],'产出 125 mB 橙子果酱',(1600,1910))
 edge([(2770,1800),(3085,1800),(3085,2120),(2770,2120),(2770,2200)],'＋黏液球；加热搅拌',(2770,2120))
 node(2770,2280,'融化橙子果冻 · 125 mB','c',620,160)
 edge([(2770,2360),(2770,2510)],'＋碗灌装；可分液取回',(2770,2435))
 node(2770,2590,'橙子果冻 ×1','f',620,160)
 node(430,2280,'摆放橙子 → 踩碎 → 橙雾\n'+('仅 Atmospheric 橙子' if not after else '统一橙子保留此玩法'),'a',620,160)
 node(1210,2280,'水果乐事橙子箱\n9 橙 互转 1 箱','f',620,160)
 center(1210,2435,'原料：'+('水果乐事橙子' if not after else '统一橙子（OEI 改写）'),28)
 node(1990,2280,'果酱派生用途\n无花果布丁／果酱面包／山楂卷','f',620,160,s=28)
 edge([(2770,1800),(2770,2010),(1990,2010),(1990,2200)],'果酱物品或流体加工',(1990,2100))
 node(1990,2590,'储存闭环\n8 瓶果酱 互转 果酱块\n8 碗果冻 互转 果冻块','f',620,160,s=28)
 # separate cauldron route with exact additional scope visible
 text(85,2770,'炼药锅旁路｜水果乐事原有交互；统一水锅入口仍需另行兼容',34,bold=True)
 node(440,2980,'原版满水锅\n＋柠檬片','n',620,150)
 node(1210,2980,'柠檬水锅','f',620,150)
 node(1990,2980,'加热＋橙子 → 橙子水锅','f',620,150)
 node(2770,2980,'加糖 → 果酱锅\n加黏液球 → 果冻锅','f',620,150)
 edge([(750,2980),(900,2980)])
 edge([(1520,2980),(1680,2980)],hot=after,dash=after)
 edge([(2300,2980),(2460,2980)])
 center(1600,3180,('此处按水果乐事橙子 Item 注册，Atmospheric 橙子不能仅凭共有标签接入。' if not after else '橙色虚线：提案需补 Item 交互映射；只加 OEI 与掉落覆盖，不能保证此路通。'),30,color='#ad623a')
 center(1600,3280,'已有 helper 的统一水锅 ≠ 原版水锅；本图不把这条旁路标作整包已实测可达。',29,color='#64758b')
 center(1600,3380,'血橙保持独立。Atmospheric 橙子箱需 Quark；当前未启用，不计作有效装箱链。',29,color='#64758b')
 im.save(OUT/('orange-after.png' if after else 'orange-before.png'),optimize=True)
 im.resize((1280,1440)).save(OUT/('after-preview.png' if after else 'before-preview.png'))
