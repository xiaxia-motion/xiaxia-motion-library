// 夏夏的AI灵感 · 放映机双卷盘开机。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
#include "墨线.hpp"
#include "时钟.hpp"
// 各件控件分别绑定不同的关节与操作状态。手套、墨线、纸张和脚部画法来自同一套画稿。
constexpr double punch=9*beat,lightAt=14*beat,slideIn=17.6*beat,slideOut=21*beat,stampAt=26*beat,rollAt=Show::projectorStart;
const std::array<double,4> letters={30.1*beat,30.95*beat,31.83*beat,32.70*beat};
const std::array<double,4> votes={36.6*beat,37.30*beat,38.*beat,38.72*beat};
void reel(double x,double y,double r,double angle){
 ellipse(x,y,r,r,0xc2c3a7,I,3.3);ellipse(x,y,r-4,r-4,N,DB,1.5);
 for(int i=0;i<5;i++){double a=angle+2*pi*i/5;cairo_save(c);cairo_translate(c,x+std::cos(a)*r*.56,y+std::sin(a)*r*.56);cairo_rotate(c,a);ellipse(0,0,r*.22,r*.275,DB,I,1.4);cairo_restore(c);}
 ellipse(x,y,r*.13,r*.13,G,I,1.6);}
void projector(double t){
 double r=ease(rollAt-.06,rollAt+.16,t);double age=std::max(0.,t-rollAt),spin=age*5.0*r;
 cairo_save(c);cairo_translate(c,505,1281);shadow(0,114,113);limbs(55,48,102,t);
 drawPath("M -72 -27 L 45 -33 L 76 -7 L 72 53 L -67 60 C -78 61 -82 53 -83 42 L -84 -12 Z",DB,I,4);box(-70,-22,117,64,8,B,I,2);
 drawPath("M 55 -5 L 83 -9 L 103 -23 L 105 21 L 84 9 L 56 9 Z",G,I,3);
 ln(-41,-37,-50,-75,I,6);ln(28,-34,38,-83,I,6);reel(-52,-69,46,spin);reel(42,-80,56,-spin);
 auto m=reaction(t,rollAt,rollAt+.13,.99,-.62,.25);face(-12,5,.96,t,m);arm(-76,1,-101,-13,-21,-.49,.56,true);
 arm(66,32,88,39,8,.41,.53);cairo_restore(c);
}

// 单独的透明画布保留发布版的角色绘制坐标，示例纸底使用程序填色。
void one(double t,int w,int h,const std::string& output){
 auto surface=cairo_image_surface_create(CAIRO_FORMAT_ARGB32,w,h);c=cairo_create(surface);
 ink(0xf4dfac);cairo_paint(c);cairo_set_line_join(c,CAIRO_LINE_JOIN_ROUND);cairo_set_line_cap(c,CAIRO_LINE_CAP_ROUND);
 cairo_translate(c,w*.5,h*.5);double z=w/365.0;cairo_scale(c,z,z);cairo_translate(c,-505,-1281);
 projector(t);
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