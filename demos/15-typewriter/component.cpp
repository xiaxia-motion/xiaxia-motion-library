// 夏夏的AI灵感 · 打字机逐键输入 MOON。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
#include "墨线.hpp"
#include "时钟.hpp"
// 各件控件分别绑定不同的关节与操作状态。手套、墨线、纸张和脚部画法来自同一套画稿。
constexpr double punch=9*beat,lightAt=14*beat,slideIn=17.6*beat,slideOut=21*beat,stampAt=26*beat,rollAt=Show::projectorStart;
const std::array<double,4> letters={30.1*beat,30.95*beat,31.83*beat,32.70*beat};
const std::array<double,4> votes={36.6*beat,37.30*beat,38.*beat,38.72*beat};
void typewriter(double t){
 unsigned count=0;double h=0;for(double q:letters){if(t>=q)count++;h+=press(t,q,.16);}
 shadow(0,91,116);limbs(43,54,79,t);
 cairo_save(c);cairo_translate(c,0,2.4*h);
 box(-65,-80,130,63,4,P,I,3);for(int i=0;i<4;i++)ln(-51,-68+i*10,-29,-68+i*10,0xb3a17e,1);
 string name="MOON";txt(name.substr(0,count),-18,-47,20,I,"Courier",true,0);
 if(count<4&&std::fmod(t,1.)<.65)ln(-17+12*count,-61,-17+12*count,-45,I,1.8);
 box(-80,-27,160,26,12,DB,I,3);ellipse(-81,-14,8,13,B,I,2);ellipse(81,-14,8,13,B,I,2);
 drawPath("M -69 -8 C -61 -14 -40 -17 -17 -16 L 49 -16 C 62 -16 70 -7 72 2 L 92 38 C 96 51 86 57 76 58 L -77 58 C -90 58 -94 49 -88 38 Z",B,I,3.5);
 auto m=reaction(t,letters.front(),letters.back(),.76,.54,.65);
 for(size_t i=0;i<letters.size();i++){double f=arcPulse(t,letters[i]-.19,letters[i]+.17);m.x-=f*(.77-.21*i);m.y+=f*.31;}
 m.y-=.90*ease(letters.back()+.1,letters.back()+.35,t)*(1-ease(letters.back()+.62,letters.back()+1.12,t));face(-44,6,.72,t,m);
 for(int row=0;row<2;row++)for(int i=0;i<5;i++){double x=-2+i*14-row*5,y=10+row*14+((i+row)==(int)count?3*h:0);ellipse(x,y,5.3,3.8,P,I,1.35);}
 box(-11,37,69,6,3,DB,I,1.3);
 arm(-71,4,-91,-7,-17,-.56,.49,true);
 double key=0;for(int i=1;i<4;i++)key+=14*ease(letters[i-1]+.09,letters[i]-.08,t);
 double gx=key+3,gy=-15+23*h;curve(71,13,109,2,91,-33,gx,gy,I,5.3);glove(gx,gy,2.9,.47);cairo_restore(c);
 mark(124,-48,"TAP!",t,letters.back(),.1);
}

// 单独的透明画布保留发布版的角色绘制坐标，示例纸底使用程序填色。
void one(double t,int w,int h,const std::string& output){
 auto surface=cairo_image_surface_create(CAIRO_FORMAT_ARGB32,w,h);c=cairo_create(surface);
 ink(0xf4dfac);cairo_paint(c);cairo_set_line_join(c,CAIRO_LINE_JOIN_ROUND);cairo_set_line_cap(c,CAIRO_LINE_CAP_ROUND);
 cairo_translate(c,w*.5,h*.5);double z=w/365.0;cairo_scale(c,z,z);cairo_translate(c,0,0);
 typewriter(t);
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