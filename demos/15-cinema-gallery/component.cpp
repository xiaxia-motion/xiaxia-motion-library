// 夏夏的AI灵感 · 放映机拉远与错列控件展墙。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
#include "墨线.hpp"
#include "时钟.hpp"
#include "演员.hpp"
#include "片单.hpp"
namespace fs=std::filesystem;
cairo_surface_t *substrate,*patina;
constexpr int frames=Show::frames;
struct Pose{double x,y,z;};
Pose camera(double t){
 const std::pair<double,Pose> k[]={
 {0,{720,537,1}},{2.53,{720,537,1}},{3.52,{275,404,2.78}},{4.62,{275,408,2.88}},
 {5.75,{720,403,2.77}},{6.96,{720,405,2.87}},
 {8.09,{1162,409,2.72}},{9.98,{1162,410,2.83}},
 {11.12,{1162,732,2.72}},{12.64,{1162,733,2.86}},
 {13.60,{720,727,2.72}},{15.72,{720,730,2.87}},
 {16.60,{275,735,2.72}},{18.43,{275,735,2.85}},
 {19.29,{627,1321,1.78}},{20.40,{629,1324,1.95}},{21.56,{645,1327,1.95}},
 {22.49,{637,1318,1.93}},{23.85,{634,1331,1.93}},{25.22,{635,1335,1.89}},
 {25.97,{715,1924,1.36}},{26.60,{740,1929,1.40}},{27.63,{885,1940,2.14}},
 {28.55,{910,1950,2.55}},{29.5,{910,1950,2.55}}};
 // 对相邻速度取调和平均，镜头经过中间构图时保持连贯，折返与停镜处自然刹住。
 const int count=std::size(k);
 auto channel=[&](int j,double Pose::*field){
  auto speed=[&](int i){
   if(i==0||i==count-1)return 0.;
   double a=(k[i].second.*field-k[i-1].second.*field)/(k[i].first-k[i-1].first);
   double b=(k[i+1].second.*field-k[i].second.*field)/(k[i+1].first-k[i].first);
   return a*b<=0?0.:2*a*b/(a+b);
  };
  double dt=k[j+1].first-k[j].first,u=unit((t-k[j].first)/dt),v=1-u;
  return v*v*(1+2*u)*(k[j].second.*field)+u*u*(3-2*u)*(k[j+1].second.*field)
       +dt*(u*v*v*speed(j)-u*u*v*speed(j+1));
 };
 for(int j=0;j<count-1;j++)if(t<k[j+1].first)return {channel(j,&Pose::x),channel(j,&Pose::y),channel(j,&Pose::z)};
 return k[count-1].second;
}
void scallop(double x,double y,int side){
 cairo_save(c);cairo_translate(c,x,y);cairo_scale(c,side,1);
 drawPath("M 0 24 C 0 12 7 1 24 0 L 54 0 M 9 25 C 11 13 16 9 29 8 L 45 8",N,DB,2.6);diamond(57,0,3,R);cairo_restore(c);
}
void framePrint(){
 // 节目纸上的双色框饰连接总览和下方放映区。
 for(int side:{-1,1}){
  double x=side<0?64:1376;
  ln(x,60,x,1000,DB,1.4);ln(x-5*side,75,x-5*side,975,DB,.8);
  scallop(x,40,side<0?1:-1);
 }
 ln(89,40,1351,40,DB,1.6);
 for(double y:{592.,953.}){
  ln(119,y,683,y,DB,1.);ln(757,y,1321,y,DB,1.);diamond(720,y,7,R);diamond(701,y,3,DB);diamond(739,y,3,DB);
 }
 for(double x:{495.,945.}){for(double y:{338.,695.}){ln(x,y,x,y+159,0xc6a875,.9);diamond(x,y+173,3,DB);}}
}
void header(double t){
 double alpha=1-ease(2.55,3.05,t);if(alpha<=0)return;cairo_save(c);cairo_push_group(c);
 // 开头的两行标题与系列习惯一致，以红色套印阴影和细饰线贴合老戏院题字。
 double rise=15*(1-ease(0,.55,t));
 cairo_save(c);cairo_translate(c,0,rise);chinese("复古橡皮管动画",723,169,76,0xb64a33);chinese("复古橡皮管动画",720,166,76,I);cairo_restore(c);
 txt("VibeCoding必备组件",720,222,30,I,"Hiragino Sans GB",true);
 for(int d:{-1,1}){double x=720+d*209;ln(x,213,x+d*112,213,DB,1.7);diamond(x+d*127,213,6,R);}
 cairo_pop_group_to_source(c);cairo_paint_with_alpha(c,alpha);cairo_restore(c);
}
struct Cell{double x,y;const char*cn,*eng;void(*fn)(double);};
const Cell cells[]={{276,425,"入场按键","ADMIT ONE",ticket},{720,425,"舞台灯开关","HOUSE LIGHTS",lamp},{1164,425,"音量滑杆","SOUND LEVEL",horn},
 {1164,751,"验票复选框","TICKET CHECK",stampPlayer},{720,751,"片名输入框","TITLE ENTRY",typewriter},{276,751,"星级评分","STAR RATING",rating}};
void label(const Cell &cell){
 chinese(cell.cn,0,-120,27,I);ln(-45,-107,45,-107,R,1.25);txt(cell.eng,0,-87,12,DB,"Georgia",true);
}
void screening(double t){
 double light=ease(rollAt,rollAt+.42,t);
 // 放映区也是一个控件，按钮驱动片轴、进度窗和投影画面。
 chinese("胶片放映",505,1071,31);txt("PICTURE SHOW",505,1093,15,DB,"Georgia",true);
 box(690,1061,435,345,8,I,I,4);box(699,1071,417,324,5,0xb99861,I,2.1);
 box(706,1079,403,307,2,0x534f42,I,1.5);
 if(light>.001){
  cairo_save(c);cairo_rectangle(c,707,1080,402,305);cairo_clip(c);
  double drift=ease(rollAt,rollAt+2.4,t);
  imageBox(moonImage,707-13*drift,1080-8*drift,402+18*drift,305+14*drift,light);
  // 银幕内星光与蒸汽随片轴运行；运动与放映机同时启动。
  double age=std::max(0.,t-rollAt);
  for(int i=0;i<5;i++){double a=.5+.5*std::sin(age*3.4+i*1.7);
   cairo_save(c);cairo_translate(c,740+i*70,1107+(i%3)*29);cairo_scale(c,a*.76+.14,a*.76+.14);
   diamond(0,0,3.3,0xffdd8b);cairo_restore(c);}
  for(int i=0;i<3;i++){double q=std::fmod(age*.53+i/3.,1.);
   cairo_save(c);cairo_push_group(c);curve(880-42*q,1267-32*q,879-46*q,1262-43*q,889-50*q,1260-48*q,898-56*q,1264-53*q,0xf3d08a,1.3+q);
   cairo_pop_group_to_source(c);cairo_paint_with_alpha(c,.43*std::sin(pi*q));cairo_restore(c);}
  // 开机的短促亮度起伏随即收住。
  ink(P,.035*light*std::exp(-std::max(0.,t-rollAt)*1.7)*(1+sin(t*31)));cairo_paint(c);cairo_restore(c);
 }
 if(light>.001){cairo_new_path(c);cairo_move_to(c,608,1272);cairo_line_to(c,689,1160);cairo_line_to(c,689,1338);cairo_close_path(c);ink(G,.24*light);cairo_fill(c);}
 projector(t);txt("MOON EXPRESS",907,1443,26,I,"Georgia",true);chinese("月夜特快",907,1472,21,DB);
 // 两段片齿将上下两个画面连接起来。
 for(int i=0;i<8;i++){box(730+i*50,1064,18,4,1.2,P,N);box(730+i*50,1398,18,4,1.2,P,N);}
}
void borders(){
 ln(89,1010,1351,1010,DB,1.8);
 txt("纸上放映厅",174,993,18,DB,"Hiragino Sans GB",true);
 txt("THE PAPER PICTURE HOUSE",1260,993,12,DB,"Georgia",true);
}

#include "布局.hpp"
void run(double begin,int fps,int count,int w,int h,const std::string& dest,bool single){
 paperImage=cairo_image_surface_create(CAIRO_FORMAT_RGB24,32,32);c=cairo_create(paperImage);ink(0xf4dfac);cairo_paint(c);cairo_destroy(c);
 moonImage=cairo_image_surface_create(CAIRO_FORMAT_RGB24,160,100);c=cairo_create(moonImage);ink(DB);cairo_paint(c);ellipse(105,33,17,17,G,N);ln(0,83,160,58,I,6);cairo_destroy(c);
substrate=cairo_image_surface_create(CAIRO_FORMAT_RGB24,w,h);c=cairo_create(substrate);
 imageBox(paperImage,0,0,w,h);ink(P,.15);cairo_paint(c);cairo_destroy(c);
 patina=cairo_image_surface_create(CAIRO_FORMAT_ARGB32,193,199);
 auto* pix=(uint32_t*)cairo_image_surface_get_data(patina);unsigned rng=83711;
 for(int i=0;i<193*199;i++){rng=rng*1664525u+1013904223u;unsigned u=rng>>24;
  // 预乘透明度的疏淡纸纤维噪点，填色也自然露纸。
  unsigned a=u>247?37:u<12?18:0;bool pale=u>247;pix[i]=(a<<24)|(pale?((a*243/255)<<16|(a*215/255)<<8|(a*164/255)):0);}
 cairo_surface_mark_dirty(patina);auto surf=cairo_image_surface_create(CAIRO_FORMAT_RGB24,w,h);c=cairo_create(surf);
 cairo_set_line_join(c,CAIRO_LINE_JOIN_ROUND);cairo_set_line_cap(c,CAIRO_LINE_CAP_ROUND);
 for(int i=0;i<count;i++){endFrame(begin+double(i)/fps,w,h);cairo_surface_flush(surf);std::string out=single?dest:dest+"/"+std::to_string(i)+".png";if(cairo_surface_write_to_png(surf,out.c_str())!=CAIRO_STATUS_SUCCESS)std::exit(2);}
 cairo_destroy(c);for(auto image:{surf,substrate,patina,paperImage,moonImage})cairo_surface_destroy(image);
}
int main(int n,char**v){if(n==6&&std::string(v[1])=="--frame")run(std::stod(v[2]),1,1,std::stoi(v[3]),std::stoi(v[4]),v[5],true);else if(n==7)run(std::stod(v[1]),std::stoi(v[2]),std::stoi(v[3]),std::stoi(v[4]),std::stoi(v[5]),v[6],false);else return 1;}
