// 夏夏的AI灵感 · 喇叭音量推子。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
#include "墨线.hpp"
#include "时钟.hpp"
// 各件控件分别绑定不同的关节与操作状态。手套、墨线、纸张和脚部画法来自同一套画稿。
constexpr double punch=9*beat,lightAt=14*beat,slideIn=17.6*beat,slideOut=21*beat,stampAt=26*beat,rollAt=Show::projectorStart;
const std::array<double,4> letters={30.1*beat,30.95*beat,31.83*beat,32.70*beat};
const std::array<double,4> votes={36.6*beat,37.30*beat,38.*beat,38.72*beat};
void horn(double t){
 double travel=ease(slideIn,slideOut,t),v=.18+.62*travel,bob=sin(t*3.1)*1.7;
 shadow(4,90,113);
 box(-127,53,251,29,14,P,I,3);box(-114,61,228,10,5,DB,I,1.9);
 double grip=-114+228*v;box(-114,63,228*v,5,2,R,N,0);
 for(int i=0;i<=10;i++){double x=-114+i*22.8;ln(x,84,x,84+(i%5?4:8),I,1.15);}
 txt(std::to_string((int)round(100*v))+"%",101,17,22,I,"Georgia",true);
 cairo_save(c);cairo_translate(c,-29,bob);
 limbs(17,25,46,t);
 drawPath("M -65 -6 C -57 -31 -37 -31 -20 -25 C 1 -21 15 -17 58 -49 L 65 -19 C 29 -10 1 -2 -11 13 C -35 37 -66 20 -65 -6 Z",G,I,4);
 drawPath("M -58 8 C -49 24 -29 28 -16 13 C -6 0 8 -5 27 -9",N,0x936329,2);
 cairo_save(c);cairo_translate(c,65,-35);cairo_rotate(c,-.37-.055*travel);ellipse(0,0,19,40,LG,I,3.5);ellipse(1,0,13,32,DR,I,2.1);ellipse(3,1,6,17,I,N);cairo_restore(c);
 auto m=reaction(t,slideIn,slideOut,mix(-.95,.98,travel),.96,.38);
 m.focus*=.72;m.wonder+=.25*arcPulse(t,slideIn,slideOut);face(-34,-8,.78,t,m);
 arm(-53,-2,-78,-22,-14,-.49,.51,true);
 curve(-4,5,17,33,grip+15,42,grip+27,49-bob,I,5.5);
 cairo_restore(c);
 box(grip-11,47,22,32,6,R,I,3);ln(grip-3,53,grip-3,66,P,1.6);ln(grip+3,53,grip+3,66,P,1.6);
 glove(grip-2,48,-.15,.53);
 if(travel>.01&&travel<.99){for(int i=0;i<3;i++){double d=4*std::sin(t*8+i);ln(68,-43+i*10,79+d,-47+i*13,I,1.8);}}
 mark(-101,-49,"ZIP!",t,slideOut,-.12);
}

// 单独的透明画布保留发布版的角色绘制坐标，示例纸底使用程序填色。
void one(double t,int w,int h,const std::string& output){
 auto surface=cairo_image_surface_create(CAIRO_FORMAT_ARGB32,w,h);c=cairo_create(surface);
 ink(0xf4dfac);cairo_paint(c);cairo_set_line_join(c,CAIRO_LINE_JOIN_ROUND);cairo_set_line_cap(c,CAIRO_LINE_CAP_ROUND);
 cairo_translate(c,w*.5,h*.5);double z=w/350.0;cairo_scale(c,z,z);cairo_translate(c,0,0);
 horn(t);
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