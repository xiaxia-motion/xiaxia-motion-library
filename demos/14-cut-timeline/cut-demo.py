"""独立 FFmpeg 裁切范例。运行 python3 cut-demo.py 或 python3 cut-demo.py 自己的视频.mp4 新建目录。"""
import argparse
from pathlib import Path
import subprocess
import tempfile

def execute(arguments):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-n', *arguments], check=True)

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('source', nargs='?', type=Path)
parser.add_argument('destination', nargs='?', type=Path, default=Path('裁切输出'))
args = parser.parse_args()
args.destination.mkdir(exist_ok=True)
result = args.destination / 'three-cuts.mp4'
with tempfile.TemporaryDirectory() as tmp:
    source = args.source
    if source is None:
        source = Path(tmp) / 'example.mp4'
        execute(['-f','lavfi','-i','testsrc2=size=640x360:rate=30:duration=12','-an','-c:v','libx264','-pix_fmt','yuv420p',str(source)])
    filters='[0:v]split=3[a][b][c];[a]trim=start=1:end=2,setpts=PTS-STARTPTS[p];[b]trim=start=5:end=6,setpts=PTS-STARTPTS[q];[c]trim=start=9:end=10,setpts=PTS-STARTPTS[r];[p][q][r]concat=n=3:v=1:a=0[v]'
    execute(['-i',str(source),'-filter_complex',filters,'-map','[v]','-an','-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart',str(result)])
print(result)
