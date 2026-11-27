// 夏夏的AI灵感 · 戏票按压回弹。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
#include "墨线.hpp"
#include "时钟.hpp"
// 各件控件分别绑定不同的关节与操作状态。手套、墨线、纸张和脚部画法来自同一套画稿。
constexpr double punch=9*beat,lightAt=14*beat,slideIn=17.6*beat,slideOut=21*beat,stampAt=26*beat,rollAt=Show::projectorStart;
const std::array<double,4> letters={30.1*beat,30.95*beat,31.83*beat,32.70*beat};
const std::array<double,4> votes={36.6*beat,37.30*beat,38.*beat,38.72*beat};
void ticket(double t){
 double a=press(t,punch,.29),rel=std::max(0.,t-punch-.09);
 double spring=t>punch+.09?std::sin(rel*27)*std::exp(-rel*9):0;
 double prep=arcPulse(t,punch-.43,punch-.085);
 double cheer=arcPulse(t,punch+.13,punch+.72);
 double y=1.7*sin(t*3.8)-7*prep+14*a-8*spring;
 auto m=reaction(t,punch,punch,-.24,.98,.4);
 shadow(0,96,116);
 box(-117,76,231,18,8,DR,I,3);box(-116,71,230,16,7,G,I,3);box(-85,73,171,7,3,I,I,1);
 limbs(39,44,67,t);
 cairo_save(c);cairo_translate(c,0,y);cairo_rotate(c,-.035-.06*prep+.045*a);cairo_scale(c,1+.14*a-.035*prep,1-.26*a+.07*prep);
 arm(-76,-4,-108-9*cheer,-18-16*a-29*cheer,-23,-.52,.64,true);arm(74,1,101+9*cheer,-24-13*a-26*cheer,25,.32,.7);
 drawPath("M -82 -54 L 82 -54 L 82 -40 C 70 -39 69 -22 82 -20 L 82 13 C 68 13 69 30 82 30 L 82 46 L -82 46 L -82 32 C -68 30 -69 15 -82 13 L -82 -20 C -66 -23 -70 -40 -82 -40 Z",R,I,4.2);
 box(-67,-42,132,74,4,N,0xf4b67d,1.5);for(int k=0;k<4;k++){ln(48,-42+18*k,48,-34+18*k,I,1.2);}
 cairo_save(c);cairo_translate(c,67,-2);cairo_rotate(c,-pi/2);txt("ADMIT",0,-1,11,I,"Georgia",true);cairo_restore(c);
 for(int j=0;j<3;j++){ln(-75,1+j*7,-66,6+j*7,DR,1.7);}
 face(-5,-4,1.09,t,m);
 // 售票员的小帽子有独立帽檐和酒红帽带。
 drawPath("M -48 -54 C -53 -87 -45 -96 -20 -94 C -2 -92 5 -77 9 -58 Z",DB,I,3.5);
 drawPath("M -47 -66 C -32 -61 -11 -62 6 -67 L 9 -58 L -46 -51 Z",R,I,2.4);
 drawPath("M -61 -55 C -36 -63 0 -59 21 -59 C 23 -50 -31 -43 -60 -48 Z",I,I,2.4);cairo_restore(c);
 if(t>punch)mark(109,-51,"CLACK!",t,punch,-.14);
}

// 单独的透明画布保留发布版的角色绘制坐标，示例纸底使用程序填色。
void one(double t,int w,int h,const std::string& output){
 auto surface=cairo_image_surface_create(CAIRO_FORMAT_ARGB32,w,h);c=cairo_create(surface);
 ink(0xf4dfac);cairo_paint(c);cairo_set_line_join(c,CAIRO_LINE_JOIN_ROUND);cairo_set_line_cap(c,CAIRO_LINE_CAP_ROUND);
 cairo_translate(c,w*.5,h*.5);double z=w/340.0;cairo_scale(c,z,z);cairo_translate(c,0,0);
 ticket(t);
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