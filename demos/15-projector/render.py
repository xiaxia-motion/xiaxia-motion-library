"""把这个角色的原始绘图函数渲染为网页预览。需要 C++17、Cairo、pkg-config、Python 3 和 Pillow。"""
import json,math,subprocess,tempfile,sys
from pathlib import Path
from PIL import Image
here=Path(__file__).resolve().parent
settings=json.loads((here/"native.json").read_text())
with tempfile.TemporaryDirectory() as tmp:
    binary=Path(tmp)/"render"
    flags=subprocess.check_output(["pkg-config","--cflags","--libs","cairo"],text=True).split()
    subprocess.run(["c++","-std=c++17","-O2",str(here/"component.cpp"),*flags,"-o",str(binary)],check=True)
    if len(sys.argv)>1:
        # 自定义秒数、宽高与 PNG 输出路径，可用于高分辨率取帧。
        subprocess.run([str(binary),"--frame",*sys.argv[1:]],cwd=here,check=True)
    else:
        fps=24;width=384;height=288;count=math.ceil((settings["end"]-settings["start"])*fps)
        subprocess.run([str(binary),str(settings["start"]),str(fps),str(count),str(width),str(height),tmp],cwd=here,check=True)
        block=20;cols=5
        for start in range(0,count,block):
            sheet=Image.new("RGB",(cols*width,math.ceil(min(count-start,block)/cols)*height))
            for i in range(start,min(start+block,count)):
                with Image.open(Path(tmp)/(str(i)+".png")) as im:
                    j=i-start;sheet.paste(im.convert("RGB"),((j%cols)*width,(j//cols)*height))
            sheet.save(here/("atlas-"+str(start//block)+".webp"),quality=89,method=3)
        (here/"atlas.js").write_text("window.atlasInfo="+json.dumps(dict(fps=fps,width=width,height=height,count=count,cols=cols,block=block))+";")
