// 夏夏的AI灵感 · 灯泡拨动开关。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
#include "墨线.hpp"
#include "时钟.hpp"
// 各件控件分别绑定不同的关节与操作状态。手套、墨线、纸张和脚部画法来自同一套画稿。
constexpr double punch=9*beat,lightAt=14*beat,slideIn=17.6*beat,slideOut=21*beat,stampAt=26*beat,rollAt=Show::projectorStart;
const std::array<double,4> letters={30.1*beat,30.95*beat,31.83*beat,32.70*beat};
const std::array<double,4> votes={36.6*beat,37.30*beat,38.*beat,38.72*beat};
void lamp(double t){
 double k=ease(lightAt-.11,lightAt+.18,t),hit=press(t,lightAt,.24);double x=mix(-49,48,k)+8.2*settle(t,lightAt+.18);double wind=arcPulse(t,lightAt-.40,lightAt-.09);
 auto m=reaction(t,lightAt,lightAt+.06,1.,-.30,.93);
 shadow(0,82,113);box(-123,38,246,43,21,DB,I,3.7);box(-116,43,232,31,16,k>.5?B:0x8d8974,I,1.4);
 txt(k>.5?"ON":"OFF",k>.5?-72:70,66,17,C,"Gill Sans",true);
 cairo_save(c);cairo_translate(c,x,5+4*hit);cairo_rotate(c,-.17*wind+.14*arcPulse(t,lightAt-.08,lightAt+.28)-.12*settle(t,lightAt+.20));double w=sin(t*4.1)*3;
 arm(-29,-10,-68,-29-31*k,-18,-.7,.66,true);arm(30,-8,67,-24-34*k+w,18,.53,.66);
 drawPath("M -24 26 C -27 10 -42 4 -43 -19 C -46 -44 -27 -62 -7 -65 C 22 -70 44 -49 44 -25 C 47 0 23 13 24 27 Z",k>.5?LG:0xbcb5a0,I,3.8);
 curve(-33,-29,-34,-46,-20,-56,-12,-55,C,4);face(0,-23,.91,t,m);
 for(int i=0;i<3;i++){box(-23,23+i*7,46,9,3,i%2?DB:B,I,1.7);ln(-17,30+i*7,16,25+i*7,I,1.25);}
 ellipse(0,47,14,4.5,I,I,1.2);
 if(k>.005){for(int i=0;i<9;i++){double ang=-pi*1.09+i*pi*1.18/8;double inner=57,outer=inner+(10+(i%2)*7)*k;ln(cos(ang)*inner,-22+sin(ang)*inner,cos(ang)*outer,-22+sin(ang)*outer,i%2?R:I,2.5);}}
 cairo_restore(c);mark(110,-49,"TIK!",t,lightAt,.10);
}

// 单独的透明画布保留发布版的角色绘制坐标，示例纸底使用程序填色。
void one(double t,int w,int h,const std::string& output){
 auto surface=cairo_image_surface_create(CAIRO_FORMAT_ARGB32,w,h);c=cairo_create(surface);
 ink(0xf4dfac);cairo_paint(c);cairo_set_line_join(c,CAIRO_LINE_JOIN_ROUND);cairo_set_line_cap(c,CAIRO_LINE_CAP_ROUND);
 cairo_translate(c,w*.5,h*.5);double z=w/340.0;cairo_scale(c,z,z);cairo_translate(c,0,0);
 lamp(t);
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