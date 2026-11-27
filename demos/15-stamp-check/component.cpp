// 夏夏的AI灵感 · 验票章盖印勾选。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
#include "墨线.hpp"
#include "时钟.hpp"
// 各件控件分别绑定不同的关节与操作状态。手套、墨线、纸张和脚部画法来自同一套画稿。
constexpr double punch=9*beat,lightAt=14*beat,slideIn=17.6*beat,slideOut=21*beat,stampAt=26*beat,rollAt=Show::projectorStart;
const std::array<double,4> letters={30.1*beat,30.95*beat,31.83*beat,32.70*beat};
const std::array<double,4> votes={36.6*beat,37.30*beat,38.*beat,38.72*beat};
void stampPlayer(double t){
 double reach=ease(stampAt-.48,stampAt-.10,t),hit=press(t,stampAt,.31),lift=ease(stampAt+.03,stampAt+.38,t);
 shadow(0,89,112);limbs(34,35,80,t);
 cairo_save(c);cairo_rotate(c,-.055-.056*arcPulse(t,stampAt-.45,stampAt-.10)+.105*hit-.055*settle(t,stampAt+.16));
 drawPath("M -79 -47 L 58 -47 C 59 -32 65 -30 72 -30 L 72 31 C 60 32 58 38 58 46 L -79 46 C -77 34 -83 31 -88 31 L -88 -32 C -79 -31 -79 -39 -79 -47 Z",B,I,3.5);
 box(-71,-38,121,74,3,N,DB,1.5);for(int i=0;i<5;i++)ln(38,-35+14*i,38,-29+14*i,I,1);
 auto m=reaction(t,stampAt-.21,stampAt,.94,mix(-.62,.35,reach),1.34);
 m.squeeze=arcPulse(t,stampAt-.08,stampAt+.15);face(-39,-4,.83,t,m);
 box(-3,-14,30,32,4,C,I,2.7);if(t>=stampAt){double m=ease(stampAt,stampAt+.12,t);cairo_save(c);cairo_translate(c,12,1);cairo_scale(c,std::max(.01,m),std::max(.01,m));drawPath("M -10 0 L -2 9 L 14 -11",N,DR,5);cairo_restore(c);}
 arm(-75,0,-100,10,-19,-.4,.56,true);
 double hx=mix(78,14,reach*(1-lift)) ,hy=-64-13*arcPulse(t,stampAt-.43,stampAt-.13)+56*hit-5*settle(t,stampAt+.23);
 curve(65,-2,122,-16,105,-68,hx,hy-9,I,6);
 cairo_save(c);cairo_translate(c,hx,hy);cairo_rotate(c,-.13*(1-hit));
 box(-22,8,44,8,2,DR,I,2.3);drawPath("M -19 8 L -14 0 L -5 -3 L -5 -17 L 6 -17 L 6 -3 L 15 0 L 19 8 Z",G,I,2.3);
 ellipse(0,-20,11,9.2,R,I,2.5);glove(10,-19,-.7,.44);cairo_restore(c);cairo_restore(c);
 mark(-98,-54,"THUNK!",t,stampAt,-.12);
}

// 单独的透明画布保留发布版的角色绘制坐标，示例纸底使用程序填色。
void one(double t,int w,int h,const std::string& output){
 auto surface=cairo_image_surface_create(CAIRO_FORMAT_ARGB32,w,h);c=cairo_create(surface);
 ink(0xf4dfac);cairo_paint(c);cairo_set_line_join(c,CAIRO_LINE_JOIN_ROUND);cairo_set_line_cap(c,CAIRO_LINE_CAP_ROUND);
 cairo_translate(c,w*.5,h*.5);double z=w/345.0;cairo_scale(c,z,z);cairo_translate(c,0,0);
 stampPlayer(t);
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