// 平面彩墨与贝塞尔笔画共用一个坐标系，人物动作从每帧的绝对时间计算。
#include <cairo.h>
#include <algorithm>
#include <array>
#include <cmath>
#include <cstdio>
#include <cstdlib>
#include <filesystem>
#include <iostream>
#include <map>
#include <sstream>
#include <string>
#include <vector>
using std::string;
constexpr double pi=3.141592653589793,beat=60./128;
using Paint=int;
constexpr Paint I=0x30251e,P=0xf8e7bd,C=0xffefcc,R=0xc94b34,DR=0x893728,G=0xdfa43c,LG=0xf5c966,B=0x57918e,DB=0x365c5c,blush=0xe38b6b,N=-1;
cairo_t *c; cairo_surface_t *paperImage,*moonImage;
double unit(double x){return std::clamp(x,0.,1.);}
double ease(double a,double b,double t){double q=unit((t-a)/(b-a));return q*q*q*(q*(6*q-15)+10);}
double mix(double a,double b,double t){return a+(b-a)*t;}
double press(double t,double at,double duration=.20){return ease(at-.105,at,t)*(1-ease(at+.035,at+duration,t));}
void ink(Paint k,double a=1){cairo_set_source_rgba(c,((k>>16)&255)/255.,((k>>8)&255)/255.,(k&255)/255.,a);}
void paint(Paint fill,Paint stroke=I,double w=2.8){
 if(fill!=N){ink(fill);cairo_fill_preserve(c);}if(stroke!=N&&w>0){ink(stroke);cairo_set_line_width(c,w);cairo_stroke(c);}else cairo_new_path(c);
}
void drawPath(const char* d,Paint fill,Paint stroke=I,double w=2.8){
 static std::map<string,std::vector<std::pair<char,std::array<double,6>>>> cache;
 auto it=cache.find(d);
 if(it==cache.end()){std::istringstream s(d);std::vector<std::pair<char,std::array<double,6>>> ops;char op;
  while(s>>op){int n=op=='C'?6:(op=='M'||op=='L'?2:0);std::array<double,6> vals{};for(int i=0;i<n;i++)s>>vals[i];ops.push_back({op,vals});}it=cache.emplace(d,std::move(ops)).first;}
 cairo_new_path(c);for(auto &cmd:it->second){auto &a=cmd.second;switch(cmd.first){case 'M':cairo_move_to(c,a[0],a[1]);break;case 'L':cairo_line_to(c,a[0],a[1]);break;case 'C':cairo_curve_to(c,a[0],a[1],a[2],a[3],a[4],a[5]);break;case 'Z':cairo_close_path(c);break;}}paint(fill,stroke,w);
}
void ln(double x,double y,double X,double Y,Paint k=I,double w=2){cairo_new_path(c);cairo_move_to(c,x,y);cairo_line_to(c,X,Y);paint(N,k,w);}
void curve(double x,double y,double a,double b,double d,double e,double X,double Y,Paint k=I,double w=3){cairo_new_path(c);cairo_move_to(c,x,y);cairo_curve_to(c,a,b,d,e,X,Y);paint(N,k,w);}
void ellipse(double x,double y,double rx,double ry,Paint fill,Paint stroke=I,double w=2.8){
 if(rx<=0||ry<=0)return;cairo_save(c);cairo_translate(c,x,y);cairo_scale(c,rx,ry);cairo_new_path(c);cairo_arc(c,0,0,1,0,2*pi);cairo_restore(c);paint(fill,stroke,w);}
void box(double x,double y,double w,double h,double r,Paint fill,Paint stroke=I,double lw=2.8){
 r=std::min({r,w/2,h/2});cairo_new_path(c);cairo_arc(c,x+w-r,y+r,r,-pi/2,0);cairo_arc(c,x+w-r,y+h-r,r,0,pi/2);cairo_arc(c,x+r,y+h-r,r,pi/2,pi);cairo_arc(c,x+r,y+r,r,pi,pi*1.5);cairo_close_path(c);paint(fill,stroke,lw);}
void txt(string s,double x,double y,double size,Paint col=I,const char* font="Georgia",bool bold=true,int align=1,bool italic=false){
 cairo_select_font_face(c,font,italic?CAIRO_FONT_SLANT_ITALIC:CAIRO_FONT_SLANT_NORMAL,bold?CAIRO_FONT_WEIGHT_BOLD:CAIRO_FONT_WEIGHT_NORMAL);
 cairo_set_font_size(c,size);cairo_text_extents_t m;cairo_text_extents(c,s.c_str(),&m);x-=(align==1?.5:align==2?1:0)*m.x_advance;ink(col);cairo_move_to(c,x,y);cairo_show_text(c,s.c_str());}
void chinese(string s,double x,double y,double size,Paint col=I){txt(s,x,y,size,col,"Hiragino Sans GB",true);}
void star(double x,double y,double r,Paint col,double turn=-pi/2,Paint stroke=I,double w=2.4){
 cairo_new_path(c);for(int i=0;i<10;i++){double a=turn+i*pi/5,z=i%2?.46*r:r;if(!i)cairo_move_to(c,x+z*cos(a),y+z*sin(a));else cairo_line_to(c,x+z*cos(a),y+z*sin(a));}cairo_close_path(c);paint(col,stroke,w);}
void diamond(double x,double y,double r,Paint k){cairo_new_path(c);cairo_move_to(c,x,y-r);cairo_line_to(c,x+r*.36,y);cairo_line_to(c,x,y+r);cairo_line_to(c,x-r*.36,y);cairo_close_path(c);paint(k,N);}
void imageBox(cairo_surface_t* s,double x,double y,double w,double h,double alpha=1){
 cairo_save(c);cairo_translate(c,x,y);cairo_scale(c,w/cairo_image_surface_get_width(s),h/cairo_image_surface_get_height(s));cairo_set_source_surface(c,s,0,0);cairo_pattern_set_extend(cairo_get_source(c),CAIRO_EXTEND_PAD);cairo_rectangle(c,0,0,cairo_image_surface_get_width(s),cairo_image_surface_get_height(s));cairo_clip(c);cairo_paint_with_alpha(c,alpha);cairo_restore(c);
}
void shadow(double x,double y,double w){
 cairo_save(c);cairo_translate(c,x,y);cairo_scale(c,w/65.,.65);
 for(int i=-9;i<=9;i++){double v=sqrt(std::max(0.,1.-i*i/95.));ln(i*6-5,-v*8,i*6+6,v*8,0xad9066,1.3);}
 cairo_restore(c);
}
#include "表演.hpp"
void glove(double x,double y,double angle,double size=1,bool mirrored=false){
 cairo_save(c);cairo_translate(c,x,y);cairo_rotate(c,angle);cairo_scale(c,mirrored?-size:size,size);
 drawPath("M -11 7 C -18 3 -24 -4 -21 -7 C -18 -11 -13 -5 -10 -4 C -13 -12 -15 -20 -11 -21 C -6 -23 -5 -12 -3 -9 C -4 -18 -4 -25 1 -25 C 6 -24 5 -14 6 -9 C 8 -17 11 -21 15 -18 C 18 -15 13 -6 14 -4 C 20 -8 24 -6 23 -2 C 22 3 14 5 11 11 C 6 18 -4 18 -11 7 Z",C,I,2.3);
 curve(-8,-1,-4,0,-2,2,0,5,I,1.2);curve(-1,-2,2,-1,4,2,5,4,I,1.2);
 box(-10,10,19,8,3,P,I,2);cairo_restore(c);
}
void shoe(double x,double y,double dir,double a=0){
 cairo_save(c);cairo_translate(c,x,y);cairo_rotate(c,a);cairo_scale(c,dir,1);
 drawPath("M -9 -9 C -14 -8 -16 -3 -15 3 C -9 12 21 13 29 5 C 37 -3 28 -13 15 -11 C 8 -10 3 -6 0 -7 C -2 -13 -5 -14 -9 -9 Z",I,I,2.4);
 curve(5,-5,12,-9,20,-9,24,-6,P,1.7);curve(-12,5,0,10,19,11,27,6,0xae8762,1.3);cairo_restore(c);
}
void limbs(double body,double wide,double foot,double t,double hop=0){
 double wave=std::sin(t*3.4);for(int side:{-1,1}){double sx=side*wide,ex=side*(wide+13);
 curve(sx,body,sx+side*(4+3*wave),body+14,ex-side*7,foot-19,ex,foot-7+hop,I,7);
 box(ex-8,foot-14+hop,16,7,2,C,I,1.8);shoe(ex,foot+hop,side,.03*wave*side);}}
void arm(double x,double y,double gx,double gy,double bend,double turn,double size=.68,bool mirror=false){
 curve(x,y,x+bend,y+9,gx-bend*.3,gy+24,gx,gy+8*size,I,6.3);glove(gx,gy,turn,size,mirror);}
void mark(double x,double y,string s,double t,double at,double tilt=-.14){
 double a=ease(at-.02,at+.10,t)*(1-ease(at+.48,at+.78,t));if(a<.005)return;
 cairo_save(c);cairo_translate(c,x,y-7*ease(at,at+.45,t));cairo_rotate(c,tilt);double z=.78+.22*a;cairo_scale(c,z,z);cairo_push_group(c);
 txt(s,1.7,2,28,P,"Georgia",true,1,true);txt(s,0,0,28,I,"Georgia",true,1,true);ln(-30,8,-10,7,R,2.2);cairo_pop_group_to_source(c);cairo_paint_with_alpha(c,a);cairo_restore(c);
}
