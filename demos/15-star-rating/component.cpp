// 夏夏的AI灵感 · 跳跃星级评分。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
#include "墨线.hpp"
#include "时钟.hpp"
// 各件控件分别绑定不同的关节与操作状态。手套、墨线、纸张和脚部画法来自同一套画稿。
constexpr double punch=9*beat,lightAt=14*beat,slideIn=17.6*beat,slideOut=21*beat,stampAt=26*beat,rollAt=Show::projectorStart;
const std::array<double,4> letters={30.1*beat,30.95*beat,31.83*beat,32.70*beat};
const std::array<double,4> votes={36.6*beat,37.30*beat,38.*beat,38.72*beat};
void rating(double t){
 int n=0;for(double q:votes)if(t>=q)n++;
 double xx=-134,hop=0,land=0;for(double q:votes){xx+=45*ease(q-.28,q,t);hop=std::max(hop,30*std::sin(pi*ease(q-.28,q,t)));land=std::max(land,press(t,q,.15));}
 shadow(xx,44,48);cairo_save(c);cairo_translate(c,xx,-9-hop+4*land);cairo_scale(c,1+.12*land-.04*hop/30,1-.15*land+.08*hop/30);double tilt=.09*std::sin(t*3)-hop*.008;cairo_rotate(c,tilt);
 limbs(24,14,49,t);arm(-29,-3,-48,-15-hop*.47,-15,-.54,.45,true);arm(29,-4,49,-22-hop*.4,12,.51,.48);
 star(0,-2,47,G,-pi/2,I,3.3);auto m=reaction(t,votes.front()-.24,votes.back(),.92,.89,1.51);
 m.y-=hop*.018;m.squeeze=.46*land;face(0,-4,.73,t,m);cairo_restore(c);
 for(int i=0;i<5;i++)star(-89+i*45,72,17,i<n?R:P,-pi/2,I,2.25);
 txt(std::to_string(n)+" / 5",0,107,16,I,"Georgia",true);
 mark(110,-50,"BRAVO!",t,votes.back(),-.07);
}

// 单独的透明画布保留发布版的角色绘制坐标，示例纸底使用程序填色。
void one(double t,int w,int h,const std::string& output){
 auto surface=cairo_image_surface_create(CAIRO_FORMAT_ARGB32,w,h);c=cairo_create(surface);
 ink(0xf4dfac);cairo_paint(c);cairo_set_line_join(c,CAIRO_LINE_JOIN_ROUND);cairo_set_line_cap(c,CAIRO_LINE_CAP_ROUND);
 cairo_translate(c,w*.5,h*.5);double z=w/340.0;cairo_scale(c,z,z);cairo_translate(c,0,0);
 rating(t);
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