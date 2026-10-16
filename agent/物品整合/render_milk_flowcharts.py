from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import math
OUT=Path(__file__).parent/'delivery'; OUT.mkdir(exist_ok=True)
W,H=2800,2470
C={'fd':('#fff0ce','#bd963d'),'neo':('#eee4fa','#9270b5'),'ns':('#e8f1db','#8aa564'),'am':('#dfebfc','#5e89bd'),'create':('#e0f2ed','#3f8976'),'base':('#edf0f4','#8995a5'),'food':('#f5e5ee','#aa7995')}
def f(n,b=False):return ImageFont.truetype('C:/Windows/Fonts/msyhbd.ttc' if b else 'C:/Windows/Fonts/msyh.ttc',n)
def txt(x,y,s,n=30,c='#243548',b=False):d.text((x,y),s,font=f(n,b),fill=c)
def node(x,y,s,c='base',w=480,h=110):
    a,b=C[c];d.rounded_rectangle((x-w/2,y-h/2,x+w/2,y+h/2),22,a,b,3)
    ls=s.split('\n');fs=32
    while max(d.textlength(t,font=f(fs,True)) for t in ls)>w-28:fs-=1
    for i,t in enumerate(ls):txt(x-d.textlength(t,font=f(fs,True))/2,y-len(ls)*(fs+10)/2+i*(fs+10)-3,t,fs,b=True)
def edge(ps,s='',at=None,hot=False,dash=False):
    c='#d64b26' if hot else '#8194aa';width=6 if hot else 4
    for (x,y),(xx,yy) in zip(ps,ps[1:]):
        if not dash:d.line((x,y,xx,yy),fill=c,width=width)
        else:
            dist=math.hypot(xx-x,yy-y)
            for k in range(0,int(dist),20):
                a=k/dist;b=min(k+10,dist)/dist;d.line((x+(xx-x)*a,y+(yy-y)*a,x+(xx-x)*b,y+(yy-y)*b),fill=c,width=width)
    x,y=ps[-1];px,py=ps[-2];a=math.atan2(y-py,x-px)
    d.polygon([(x,y),(x-18*math.cos(a)+8*math.sin(a),y-18*math.sin(a)-8*math.cos(a)),(x-18*math.cos(a)-8*math.sin(a),y-18*math.sin(a)+8*math.cos(a))],fill=c)
    if s:
        x,y=at;ls=s.split('\n');ww=max(d.textlength(t,font=f(28)) for t in ls)+24;hh=len(ls)*38+10
        d.rounded_rectangle((x-ww/2,y-hh/2,x+ww/2,y+hh/2),9,'white')
        for i,t in enumerate(ls):txt(x-d.textlength(t,font=f(28))/2,y-len(ls)*38/2+i*38-3,t,28,c)
images=[]
for stage in range(3):
    im=Image.new('RGB',(W,H),'#f3f5f8');d=ImageDraw.Draw(im)
    txt(70,35,['01  原模组｜不同奶瓶，三条炼药锅路线','02  仅统一奶瓶｜物品归一，三条锅路线仍分开','03  统一炼药锅＋平衡｜一口锅，分流制作奶昔与奶酪'][stage],48,b=True)
    txt(74,115,'玩家操作流程 · 箭头标注要加入的材料或操作 · 空瓶、空桶与碗的返还合并标注',28,c='#63748a')
    for i,(k,name) in enumerate([('fd','农夫乐事'),('neo','那不勒斯'),('ns','自然之灵'),('am','Amendments'),('create','机械动力'),('food','奶昔：那不勒斯／独特风味')]):
        x=80+i*440;d.rounded_rectangle((x,175,x+23,198),5,C[k][0],C[k][1],2);txt(x+35,169,name,25)
    d.rounded_rectangle((40,230,W-40,H-100),26,'white')
    if stage<2:
        if stage==0:
            node(650,370,'农夫乐事奶瓶','fd');node(2150,370,'那不勒斯奶瓶','neo')
            edge([(650,425),(650,620),(1160,620)],'4 瓶＋空桶',(870,620))
            edge([(2150,425),(2150,620),(1640,620)],'3 瓶＋空桶',(1940,620))
            edge([(1190,570),(1190,490),(720,490),(720,425)],'＋4 空瓶 → 4 奶瓶',(860,490))
            edge([(1610,570),(1610,490),(2080,490),(2080,425)],'＋3 空瓶 → 3 奶瓶',(1835,490))
            edge([(2390,370),(2530,370),(2530,930),(650,930),(650,1045)],'那不勒斯奶瓶右键装入',(1850,930))
            edge([(890,370),(1050,370),(1050,1000),(1400,1000),(1400,1045)],'农夫乐事奶瓶装入',(1250,1000))
        else:
            node(1400,370,'统一：农夫乐事奶瓶','fd',600)
            edge([(1250,425),(1250,450),(1100,450),(1100,620),(1160,620)],'4 瓶／旧配方 3 瓶＋空桶',(1100,510))
            edge([(1640,620),(1850,620),(1850,450),(1550,450),(1550,425)],'奶桶分装：4 瓶／旧配方 3 瓶',(1850,510))
            edge([(1700,370),(2450,370),(2450,960),(1400,960),(1400,1045)],'统一奶瓶装入通用锅',(1720,960))

        node(1400,620,'奶桶','base')
        # Milk bucket branches into the three native cauldrons.
        edge([(1400,675),(1400,780),(650,780),(650,1045)],'倒入普通炼药锅',(650,865))
        edge([(1400,675),(1400,1045)],'装入通用锅',(1400,865))
        edge([(1400,780),(2150,780),(2150,1045)],
             '入口竞争\nNS 实际不可达' if stage==1 else '倒入普通炼药锅',
             (2150,865),hot=stage==1,dash=stage==1)
        node(650,1100,'那不勒斯牛奶锅\n1～3 层','neo')
        node(1400,1100,'Amendments 液体锅\n牛奶／水／岩浆／其他液体','am',560)
        node(2150,1100,'自然之灵牛奶锅','ns')
        edge([(650,1155),(650,1455)],'＋对应冰淇淋 ×1\n返还碗；保留原层数',(650,1300))
        node(650,1510,'对应口味的奶昔锅','food')
        edge([(650,1565),(650,1835)],'用空瓶取出\n满锅共 3 瓶',(650,1690))
        node(650,1890,'瓶装奶昔','food')
        edge([(2150,1155),(2150,1455)],'＋制酪原料（棕色蘑菇）\n等待熟成',(2150,1300))
        node(2150,1510,'奶酪锅','ns')
        edge([(2150,1565),(2150,1835)],'用空桶取出',(2150,1690))
        node(2150,1890,'奶酪桶','ns')
        edge([(2150,1945),(2150,2155)],'放置；返还空桶',(2150,2040))
        node(2150,2210,'奶酪块\n可直接食用','ns')
        # Original crafting route joins the same milkshake product.
        start=(410,370) if stage==0 else (1100,370)
        edge([start,(80,370),(80,1400),(280,1400),(280,1890),(410,1890)],'工作台：奶类＋冰淇淋\n＋3 空瓶 → 3 瓶奶昔',(280,1640))
        node(1400,2210,'水／岩浆等液体容器','base',540)
        edge([(1400,2155),(1400,1155)],'原有容器装入／取出',(1400,1740))
        node(650,2210,'原版水锅／岩浆锅','base')
        edge([(1130,2210),(890,2210)],'水／岩浆原生入口',(1010,2140))
        # Show the fluid-to-bottle route as a shared upstream, without repeating the bottle.
        node(260,620,'牛奶流体','create',300)
        if stage==0:
            edge([(260,565),(260,260),(650,260),(650,315)])
            edge([(260,260),(2150,260),(2150,315)],'机械动力灌装：250 mB 牛奶＋空瓶 → 1 奶瓶',(1400,260))
        else:
            edge([(260,565),(260,270),(1400,270),(1400,315)],'机械动力灌装：250 mB 牛奶＋空瓶 → 1 奶瓶',(800,270))
        txt(80,2320,'图 1／2 保留各模组入口；三瓶与四瓶配方并存。不同奶锅的右键交互不能视为互通。',26,c='#63748a')
    else:
        node(1400,370,'农夫乐事奶瓶\n每瓶 250 mB','fd',560)
        node(650,650,'奶桶\n1000 mB','base')
        edge([(1120,350),(650,350),(650,595)],'4 瓶＋空桶',(850,350))
        edge([(890,650),(1000,650),(1000,400),(1120,400)],'＋4 空瓶\n分装 4 瓶；返桶',(1000,550))
        edge([(1400,425),(1400,1045)],'倒入普通炼药锅\n4 瓶装满',(1400,720),True)
        edge([(650,705),(650,900),(1190,900),(1190,1045)],'倒入普通炼药锅',(900,900),True)
        node(2350,650,'水瓶／水桶／岩浆桶','base',560)
        edge([(2350,705),(2350,900),(1610,900),(1610,1045)],'装入同一种锅',(2100,900),True)
        node(450,1100,'奶／水／岩浆流体','create',550,140)
        edge([(725,1060),(1080,1060)],'管道灌入',(900,1060),True)
        edge([(1080,1140),(725,1140)],'管道抽出',(900,1140),True)
        node(1400,1100,'统一液体炼药锅\n满锅 1000 mB','am',640,140)
        edge([(1720,1080),(1850,1080),(1850,370),(1680,370)],'空瓶取奶\n一锅 4 瓶',(1850,570),True)
        edge([(1400,1170),(1400,1300),(750,1300),(750,1455)],'满奶锅＋冰淇淋 ×1\n返还碗',(900,1300),True)
        edge([(1400,1300),(2150,1300),(2150,1455)],'满奶锅＋棕色蘑菇\n等待熟成',(2000,1300),True)
        node(750,1510,'对应口味的奶昔锅','food',560)
        node(2150,1510,'奶酪锅','ns')
        edge([(750,1565),(750,1835)],'用空瓶取出\n满锅共 4 瓶',(750,1700),True)
        node(750,1890,'瓶装奶昔 ×4','food',560)
        edge([(2150,1565),(2150,1835)],'用空桶取出',(2150,1700))
        node(2150,1890,'奶酪桶','ns')
        edge([(2150,1945),(2150,2155)],'放置；返还空桶',(2150,2040))
        node(2150,2210,'奶酪块\n可直接食用','ns')
        node(1400,2210,'普通空炼药锅\n可重新装液','base',480)
        edge([(470,1510),(260,1510),(260,2210),(1160,2210)],'取空后',(650,2210))
        edge([(2390,1510),(2580,1510),(2580,2320),(1400,2320),(1400,2265)],'取出奶酪后',(2110,2320))
        txt(80,2380,'奶昔有九种口味；工作台奶昔配方已移除。其他软流体仍可按 Amendments 原方式装取。',26,c='#63748a')
    im.save(OUT/f'milk-cauldron-stage-{stage+1}.png',optimize=True);images.append(im)
allim=Image.new('RGB',(W,H*3),'#f3f5f8')
for i,img in enumerate(images):allim.paste(img,(0,H*i))
allim.save(OUT/'milk-cauldron-three-stages.png',optimize=True)
allim.resize((900,int(H*3*900/W))).save(OUT/'preview.png')
