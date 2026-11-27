constexpr int shortened=112;
// 冰蓝尾页的比例、留白和错列卡片，在节目纸上用原来的角色及控件绘制。
enum class Exhibit { cinema, button, check, input, search, tabs, favourite, volume, light, stars, refresh, list };
struct Card {Exhibit id;double x,y,w,h;const char* label;Paint paper;};
const Card cards[]={
 {Exhibit::cinema,92,206,609,350,"",0xf8e1ad},
 {Exhibit::button,719,206,291,168,"入场按键",0xf7e7c3},
 {Exhibit::check,719,389,291,167,"验票复选框",0xe7e2bd},
 {Exhibit::input,1028,206,320,350,"片名输入框",0xe9dfb8},
 {Exhibit::search,92,574,609,106,"搜片框",0xf9e9c8},
 {Exhibit::tabs,92,696,298,104,"片单切换",0xe7e3c3},
 {Exhibit::favourite,406,696,295,104,"收藏",0xf7dfb8},
 {Exhibit::volume,719,574,300,226,"音量滑杆",0xf7e4b9},
 {Exhibit::light,1037,574,311,226,"舞台灯开关",0xf5dfad},
 {Exhibit::stars,92,818,298,176,"星级评分",0xf9e8c2},
 {Exhibit::refresh,406,818,295,176,"下拉刷新",0xe7e2bd},
 {Exhibit::list,719,818,629,176,"",0xf3e5bc}
};
void windowRect(double x,double y,double w,double h){cairo_rectangle(c,x,y,w,h);cairo_clip(c);}
void paperCard(const Card& b){
 box(b.x+2,b.y+5,b.w,b.h,14,0xb49567,N);
 box(b.x,b.y,b.w,b.h,14,b.paper,DB,1.6);
 if(b.label[0])txt(b.label,b.x+19,b.y+29,22,I,"Hiragino Sans GB",true,0);
}
void actorMini(void(*actor)(double),double x,double y,double scale,double t){
 cairo_save(c);cairo_translate(c,x,y);cairo_scale(c,scale,scale);actor(t);cairo_restore(c);
}
void appFragment(double x,double y,double z,double sx,double sy,double sw,double sh,double at){
 cairo_save(c);cairo_translate(c,x,y);cairo_scale(c,z,z);cairo_translate(c,-sx-sw/2,-sy-sh/2);
 windowRect(sx,sy,sw,sh);appPanel(at);cairo_restore(c);
}
void exhibit(const Card& b,double t){
 // 局部截取正文中真正的搜索框、字键、分段选择和片单，从已操作的状态接续。
 cairo_save(c);windowRect(b.x+4,b.y+3,b.w-8,b.h-6);
 double cx=b.x+b.w*.5;
 switch(b.id){
  case Exhibit::button:actorMini(ticket,cx+15,b.y+92,.69,t);break;
  case Exhibit::check:actorMini(stampPlayer,cx+11,b.y+91,.77,t);break;
  case Exhibit::input:actorMini(typewriter,cx,b.y+187,1.28,t);break;
  case Exhibit::volume:actorMini(horn,cx,b.y+111,.99,t);break;
  case Exhibit::light:actorMini(lamp,cx,b.y+113,.94,t);break;
  case Exhibit::stars:actorMini(rating,cx+10,b.y+83,.78,t);break;
  case Exhibit::search:appFragment(cx,b.y+66,1.20,-297,-77,401,61,Show::searchSecond+.095);break;
  case Exhibit::tabs:appFragment(cx,b.y+65,.69,-297,-132,401,44,Show::watchlist+.65);break;
  case Exhibit::favourite:
   heart(b.x+78,b.y+66,1.13,1);
   txt("已收藏",b.x+120,b.y+73,24,DR,"Hiragino Sans GB",true,0);break;
  case Exhibit::refresh:{
   double a=std::clamp((t-28.05)*6.5,0.,2*pi);
   cairo_save(c);cairo_translate(c,b.x+72,b.y+98);cairo_scale(c,2.10,2.10);cairo_rotate(c,a);
   cairo_new_path(c);cairo_arc(c,0,0,8,-2.7,1.1);paint(N,DB,2.4);drawPath("M 6 4 L 4 9 L 11 8",N,DB,2);cairo_restore(c);
   appFragment(b.x+181,b.y+99,1.23,2,-59,94,27,Show::refreshed+.5);break;
  }
  case Exhibit::list:{
   // 最终片单保留影片条目、已收藏的心形和小场务，按卡片宽度独立取景。
   appFragment(b.x+216,b.y+88,.92,-299,-82,407,155,Show::refreshed+.55);
   cairo_save(c);cairo_translate(c,b.x+508,b.y+75);cairo_scale(c,.72,.72);cairo_translate(c,-223,-37);
   usher(t);cairo_restore(c);break;
  }
  case Exhibit::cinema:break;
 }
 cairo_restore(c);
}
void endFrame(double time,int w,int h){
 double old=time+shortened/60.;constexpr double from=24.98,to=25.94;
 
 double travel=ease(from,to,time);
 cairo_set_source_surface(c,substrate,0,0);cairo_paint(c);
 cairo_save(c);cairo_scale(c,w/1440.,h/1080.);
 for(size_t i=0;i<std::size(cards);i++){
  const auto &b=cards[i];double at=from+.09+i*.030;
  double a=ease(at,at+.47,time);
  if(a<.0001)continue;
  double x=b.x+b.w/2,y=b.y+b.h/2;
  cairo_save(c);cairo_translate(c,x,y+15*(1-a));cairo_scale(c,.975+.025*a,.975+.025*a);cairo_translate(c,-x,-y);
  if(a<.9999)cairo_push_group(c);
  paperCard(b);exhibit(b,old);
  if(a<.9999){cairo_pop_group_to_source(c);cairo_paint_with_alpha(c,a);}cairo_restore(c);
 }
 // 追踪原银幕的物理中心；片轴、投影与影片画格在缩回卡片的过程中继续运行。
 auto q=camera(old);
 double mx=760,my=1260,ax=720+(mx-q.x)*q.z,ay=540+(my+680-q.y)*q.z;
 double z=mix(q.z,.737,travel);
 cairo_save(c);cairo_translate(c,mix(ax,398,travel),mix(ay,374,travel));cairo_scale(c,z,z);cairo_translate(c,-mx,-my);
 screening(old);cairo_restore(c);
 cairo_restore(c);
 auto tile=cairo_pattern_create_for_surface(patina);cairo_pattern_set_extend(tile,CAIRO_EXTEND_REPEAT);cairo_set_source(c,tile);cairo_paint(c);cairo_pattern_destroy(tile);
}
