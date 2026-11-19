// 夏夏的AI灵感 · 下拉刷新与纸面回弹。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
#include "墨线.hpp"
#include "时钟.hpp"
// 各件控件分别绑定不同的关节与操作状态。手套、墨线、纸张和脚部画法来自同一套画稿。
constexpr double punch=9*beat,lightAt=14*beat,slideIn=17.6*beat,slideOut=21*beat,stampAt=26*beat,rollAt=Show::projectorStart;
const std::array<double,4> letters={30.1*beat,30.95*beat,31.83*beat,32.70*beat};
const std::array<double,4> votes={36.6*beat,37.30*beat,38.*beat,38.72*beat};
// 界面、视线和手指共用同一组接触点与拍位。
struct Finger { double x,y; };
struct Stop { double at; Finger pos; };
Finger pointAt(double t){
 using namespace Show;
 const Stop stops[]={
  {searchFocus-.72,{147,31}},{searchFocus-.21,{81,-57}},{searchFocus,{70,-45}},
  {searchFocus+.12,{65,-66}},{searchFirst,{28,-47}},{searchFirst+.105,{50,-66}},
  {searchSecond,{77,-47}},{searchSecond+.18,{109,-60}},
  {favorite-.26,{107,22}},{favorite,{73,47}},{favorite+.22,{105,15}},
  {watchlist-.23,{35,-133}},{watchlist,{-7,-115}},{watchlist+.22,{45,-139}},
  {pullStart-.19,{98,-17}},{pullStart,{72,0}},{pullFull,{72,61}},{release,{72,61}},
  {release+.34,{129,-28}},{refreshed+.45,{138,-16}}};
 if(t<=stops[0].at)return stops[0].pos;
 for(size_t i=1;i<std::size(stops);i++)if(t<stops[i].at){
  auto a=stops[i-1],b=stops[i];double u=ease(a.at,b.at,t);
  double arc=(std::abs(a.pos.y-b.pos.y)>55)?10.:0.;
  return {mix(a.pos.x,b.pos.x,u),mix(a.pos.y,b.pos.y,u)-arc*std::sin(pi*u)};
 }return stops[std::size(stops)-1].pos;
}
void pointingHand(Finger tip,double pressure){
 cairo_save(c);cairo_translate(c,tip.x,tip.y);cairo_rotate(c,-.13+.12*pressure);
 cairo_scale(c,1+.07*pressure,1-.11*pressure);
 drawPath("M 46 -5 C 36 -8 29 -13 22 -10 C 18 -9 16 -7 15 -5 L 5 -5 C -2 -5 -4 -2 0 1 C 2 3 10 4 17 4 C 12 8 13 12 18 13 C 14 17 17 20 23 20 C 25 26 30 26 36 23 L 50 13 Z",C,I,2.7);
 curve(18,13,21,12,23,11,25,10,I,1.4);curve(23,20,27,18,28,17,30,16,I,1.4);
 box(43,-6,11,23,3,P,I,2);cairo_restore(c);
}
void heart(double x,double y,double size,double fill){
 cairo_save(c);cairo_translate(c,x,y);cairo_scale(c,size,size);
 const char* shape="M 0 14 C -5 10 -17 3 -17 -6 C -17 -16 -5 -20 0 -10 C 7 -20 18 -15 18 -6 C 18 2 8 10 0 14 Z";
 drawPath(shape,P,DR,2.6);
 if(fill>.001){cairo_push_group(c);drawPath(shape,R,DR,2.6);curve(-11,-7,-11,-10,-9,-12,-6,-12,C,2);
  cairo_pop_group_to_source(c);cairo_paint_with_alpha(c,fill);}
 cairo_restore(c);
}
void movieRow(double y,bool moon,bool saved,double t){
 box(-294,y,395,69,7,moon?0xf3dcab:0xe5cda3,I,1.9);
 box(-284,y+7,84,55,3,I,I,1.5);
 if(moon)imageBox(moonImage,-281,y+10,78,49);
 else{box(-281,y+10,78,49,2,B,N);ellipse(-229,y+25,8,8,LG,N);
   for(int i=0;i<3;i++)curve(-280,y+43+i*4,-258,y+30+i*4,-245,y+57+i*4,-204,y+40+i*4,DB,1.3);}
 txt(moon?"月夜特快":"海岸来信",-186,y+31,22,I,"Hiragino Sans GB",true,0);
 txt(moon?"MOON EXPRESS":"LETTERS BY THE SEA",-185,y+51,11,DB,"Georgia",true,0);
 double active=moon?ease(Show::favorite,Show::favorite+.19,t):0.;
 double scale=moon?1.-.22*press(t,Show::favorite,.14)+.27*settle(t,Show::favorite+.07,17,5.8):1.;
 heart(73,y+35,scale, saved?1:active);
 if(moon){double age=t-Show::favorite;double fade=arcPulse(t,Show::favorite,Show::favorite+.53);
 if(fade>.01)for(int i=0;i<3;i++){double angle=-2.6+i*1.13;double d=23+age*25;
  diamond(73+d*cos(angle),y+35+d*sin(angle),4.2*fade,G);}}
}
void appPanel(double t){
 using namespace Show;
 double tab=ease(watchlist-.035,watchlist+.32,t);
 double drag=61*ease(pullStart,pullFull,t)*(1-ease(release,release+.34,t))-7*settle(t,release+.28,18,8);
 double focused=ease(searchFocus-.03,searchFocus+.18,t);
 box(-316,-182,436,360,13,DB,I,3);box(-321,-187,436,360,13,C,I,3.5);
 box(-310,-177,414,54,6,DB,I,1.8);chinese("放 映 手 册",-105,-140,29,P);
 for(int side:{-1,1})for(int n=0;n<3;n++){double x=-104+side*(142+n*12);box(x-3,-153,6,10,1.5,G,N);}
 box(-294,-129,395,38,14,P,I,2);box(-291+196*tab,-125,192,30,11,R,I,1.6);
 chinese("找电影",-198,-104,18,tab<.5?C:I);
 chinese(t>=favorite?"我的片单  1":"我的片单  0",-2,-104,18,tab>.5?C:I);
 cairo_save(c);cairo_rectangle(c,-304,-80,414,237);cairo_clip(c);
 if(tab<.999){cairo_save(c);cairo_translate(c,-413*tab,0);
  box(-294,-74,395,55,10,C,focused>.5?DB:I,1.8+focused*1.4);
  ellipse(-267,-49,8.5,8.5,N,DB,2.4);ln(-261,-42,-253,-34,DB,3);
  string term=t<searchFirst?"搜索片名":t<searchSecond?"月":"月夜";
  txt(term,-239,-39,20,t<searchFirst?DB:I,"Hiragino Sans GB",true,0);
  if(t>=searchFocus&&t<favorite-.16){
   if(t>=searchFirst){double cx=t<searchSecond?-215:-195;ln(cx,-59,cx,-37,DB,1.6);}
   double keys=focused*(1-ease(searchSecond+.24,searchSecond+.48,t));
   if(keys>.005){cairo_push_group(c);
    for(int i=0;i<2;i++){double x=27+49*i,hit=press(t,i?searchSecond:searchFirst,.13);
     box(x-18,-62,37,30,5,DB,I,1.4);box(x-18,-65+3.8*hit,37,29,5,hit>.65?LG:P,I,1.6);
     chinese(i?"夜":"月",x,-44+3.8*hit,17,I);}
    cairo_pop_group_to_source(c);cairo_paint_with_alpha(c,keys);}
  }
  txt("片目",-293,3,12,DB,"Hiragino Sans GB",true,0);
  txt(t<searchFirst?"2 部":"1 部",95,3,12,DB,"Hiragino Sans GB",true,2);
  movieRow(12,true,false,t);
  double gone=ease(searchFirst,searchSecond+.15,t);if(gone<.99){cairo_push_group(c);movieRow(90+18*gone,false,false,t);cairo_pop_group_to_source(c);cairo_paint_with_alpha(c,1-gone);}
  cairo_restore(c);}
 if(tab>.001){cairo_save(c);cairo_translate(c,413*(1-tab),0);
  cairo_save(c);cairo_rectangle(c,-300,-76,408,228);cairo_clip(c);
  double pending=ease(pullStart,pullFull,t)*(1-ease(refreshed,refreshed+.20,t));
  if(pending>.01){cairo_push_group(c);cairo_save(c);cairo_translate(c,-104,-55);cairo_rotate(c,t<release?pi*ease(pullStart,pullFull,t):(t-release)*7+pi);
   cairo_new_path(c);cairo_arc(c,0,0,8,-2.7,1.1);paint(N,DB,2.4);drawPath("M 6 4 L 4 9 L 11 8",N,DB,2);cairo_restore(c);
   cairo_pop_group_to_source(c);cairo_paint_with_alpha(c,pending);}
  double working=16*ease(release,release+.23,t)*(1-ease(refreshed,refreshed+.20,t));
  cairo_translate(c,0,drag+working);
  txt("珍藏片单",-287,-37,25,I,"Hiragino Sans GB",true,0);
  txt(t<refreshed?"已收藏 1 部":"刚刚更新",89,-38,16,DB,"Hiragino Sans GB",true,2);
  if(t>=refreshed){ellipse(12,-44,7,7,DB,N);curve(8,-44,9,-43,10,-42,11,-41,C,1.6);ln(11,-41,16,-47,C,1.6);}
  ln(-292,-22,98,-22,DB,1.3);movieRow(-7,true,true,t);
  for(int i=0;i<15;i++)box(-280+i*25,85,9,4,1,0xba9767,N);
  cairo_restore(c);cairo_restore(c);}
 cairo_restore(c);
}
void usher(double t){
 using namespace Show;auto tip=pointAt(t);auto look=pointAt(t+.19);
 double push=press(t,searchFocus,.17)+.55*press(t,searchFirst,.12)+.55*press(t,searchSecond,.12)+press(t,favorite,.19)+press(t,watchlist,.15);
 double pull=ease(pullStart,pullFull,t)*(1-ease(release,release+.32,t));
 double hop=arcPulse(t,favorite+.09,favorite+.6)*15+arcPulse(t,refreshed+.06,refreshed+.56)*13;
 double cx=235-10*push-13*pull,cy=18+2.2*sin(t*3.3)-hop+8*pull;

 shadow(239,153,70);
 for(int s:{-1,1}){double foot=240+s*30,fy=143-(s==1?hop*.72:0);
  curve(cx+s*22,cy+61,cx+s*38,cy+99,foot-s*13,fy-38,foot,fy-6,I,7);
  box(foot-9,fy-14,18,8,3,C,I,1.6);shoe(foot,fy,s,s*.045+hop*.013);}
 curve(cx-40,cy+18,cx-85,cy+47,tip.x+81,tip.y+2,tip.x+48,tip.y+8,I,8.5);
 arm(cx+39,cy+14,cx+64+7*push,cy+35-20*pull-hop*.6,32,.42,.63);
 cairo_save(c);cairo_translate(c,cx,cy);cairo_rotate(c,-.075-.055*pull+.042*push-.055*settle(t,release));
 // 小场务的制服和电影卷盘共用一条轮廓，底片孔与帽章指向戏院身份。
 drawPath("M -29 34 C -44 44 -39 68 -32 78 C -17 84 16 84 31 77 C 37 58 39 43 27 34 Z",DB,I,3);
 drawPath("M -22 42 L -6 65 L -1 48 L 10 62 L 25 40 Z",C,I,2);
 box(-27,74,53,6,2,R,I,1.5);ellipse(0,67,3,3,G,I,1);
 ellipse(0,-6,56,58,G,I,3.5);ellipse(0,-6,50,52,LG,I,1.7);
 for(int s:{-1,1}){ellipse(s*42,8,5,8,DB,I,1.4);ellipse(s*32,29,6,4,G,I,1.2);}
 Acting m=reaction(t,searchFocus,searchSecond,-.97,-.4,.61);
 double dx=look.x-cx,eyeDy=look.y-(cy-8),len=std::hypot(dx,eyeDy*1.8);
 m.x=.92*dx/len+.055*sin(t*3.);m.y=std::clamp(eyeDy*2.1/len,-1.,1.);
 double meet=arcPulse(t,refreshed+.06,refreshed+.73);
 m.x=mix(m.x,.12,meet);m.y=mix(m.y,.03,meet);
 double happy=.88*ease(searchSecond+.03,searchSecond+.25,t)*(1-ease(favorite-.4,favorite-.2,t))+
     arcPulse(t,favorite+.025,favorite+.92)+.65*arcPulse(t,watchlist+.04,watchlist+.66)+ease(refreshed+.03,refreshed+.32,t);
 m.joy=std::min(1.,happy);m.wonder=.78*arcPulse(t,favorite-.36,favorite+.05)+.7*pull+.65*arcPulse(t,refreshed-.14,refreshed+.18);
 m.focus=.76*(std::max(push,pull));m.squeeze=.65*push+.35*pull;m.tilt=.045*sin(t*3.1)-.07*pull;
 face(0,-6,1.35,t,m);
 drawPath("M -47 -50 C -53 -66 -49 -73 -28 -75 C -13 -86 11 -89 30 -79 C 41 -74 43 -60 38 -50 C 12 -48 -26 -44 -47 -50 Z",R,I,3);
 drawPath("M -49 -55 C -24 -48 10 -55 39 -61 L 38 -51 C 8 -41 -22 -41 -47 -45 Z",DR,I,1.8);
 drawPath("M -50 -48 C -28 -49 5 -48 21 -48 C 9 -39 -25 -34 -59 -39 C -65 -42 -58 -47 -50 -48 Z",I,I,2);
 star(2,-65,8,G,-pi/2,I,1.2);cairo_restore(c);
 pointingHand(tip,push+.3*pull);
}

// 单独的透明画布保留发布版的角色绘制坐标，示例纸底使用程序填色。
void one(double t,int w,int h,const std::string& output){
 auto surface=cairo_image_surface_create(CAIRO_FORMAT_ARGB32,w,h);c=cairo_create(surface);
 ink(0xf4dfac);cairo_paint(c);cairo_set_line_join(c,CAIRO_LINE_JOIN_ROUND);cairo_set_line_cap(c,CAIRO_LINE_CAP_ROUND);
 cairo_translate(c,w*.5,h*.5);double z=w/770.0;cairo_scale(c,z,z);cairo_translate(c,0,0);
 appPanel(t);usher(t);
 cairo_status_t result=cairo_surface_write_to_png(surface,output.c_str());cairo_destroy(c);cairo_surface_destroy(surface);if(result!=CAIRO_STATUS_SUCCESS)std::exit(2);
}
int main(int argc,char** argv){
 // 给片单的示例缩图生成一枚月亮，不依赖字体包和外部图片。
 moonImage=cairo_image_surface_create(CAIRO_FORMAT_ARGB32,160,100);c=cairo_create(moonImage);
 ink(DB);cairo_paint(c);ellipse(103,34,17,17,G,N);ln(0,84,160,63,I,6);cairo_destroy(c);
 if(argc==6 && std::string(argv[1])=="--frame"){one(std::stod(argv[2]),std::stoi(argv[3]),std::stoi(argv[4]),argv[5]);}
 else if(argc==7){double begin=std::stod(argv[1]);int fps=std::stoi(argv[2]),count=std::stoi(argv[3]);for(int i=0;i<count;i++){one(begin+double(i)/fps,std::stoi(argv[4]),std::stoi(argv[5]),std::string(argv[6])+"/"+std::to_string(i)+".png");}}
 else return 1;
 cairo_surface_destroy(moonImage);return 0;
}