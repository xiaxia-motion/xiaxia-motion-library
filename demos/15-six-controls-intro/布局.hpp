// 在日常 App 组件版的绘制器中使用。112 帧相当于约四拍，正文仍运行原来的时钟。
constexpr int shortened=112;
cairo_surface_t* subtitleInk;
void titleRow(double t){
 const char* word[]={"复","古","橡","皮","管","UI"};
 const double widths[]={124,124,124,124,124,146};
 const double base=325;double left=720-(124*5+146)/2.;
 cairo_save(c);cairo_rectangle(c,152,172,1136,176);cairo_clip(c);
 cairo_select_font_face(c,"Hiragino Sans GB",CAIRO_FONT_SLANT_NORMAL,CAIRO_FONT_WEIGHT_BOLD);
 cairo_set_font_size(c,133);
 for(int i=0;i<6;i++){
  cairo_set_font_size(c,i==5?151:133);
  double off=129*std::pow(1-unit((t+.055-i*.027)/.34),3)-174*ease(1.16+i*.012,1.51+i*.012,t);
  cairo_text_extents_t m;cairo_text_extents(c,word[i],&m);
  cairo_save(c);cairo_translate(c,left+widths[i]*.5,base+off);cairo_scale(c,i==5?1:.91,1);left+=widths[i];
  cairo_move_to(c,-m.x_bearing-m.width*.5,0);cairo_text_path(c,word[i]);paint(I,I,8.2);cairo_restore(c);
 }
 cairo_restore(c);
 cairo_save(c);cairo_rectangle(c,300,372,840,69);cairo_clip(c);
 double dy=64*std::pow(1-unit((t-.095)/.43),3)-70*ease(1.20,1.56,t);
 cairo_translate(c,1150*.375,986*.375+dy);cairo_scale(c,.375,.375);
 ink(I);cairo_mask_surface(c,subtitleInk,0,0);cairo_restore(c);
}
void newOpening(double t,int w,int h){
 double old=t+shortened/60.;
 
 cairo_set_source_surface(c,substrate,0,0);cairo_paint(c);
 cairo_save(c);cairo_scale(c,w/1440.,h/1080.);
 titleRow(t);
 struct ActorSpot{int id;double x,y,scale,cy;};
 // 原版下方两排的六个光学中心，按各自轮廓高度对齐。
 const ActorSpot grid[]={{1,720,638,1.39,24},{4,343,649,1.09,18},{2,1097,644,1.11,19},
                         {3,343,825,.79,0},{0,720,857,1.00,-1},{5,1095,824,.79,11}};
 double fly=ease(1.20,1.98,t),leave=ease(1.20,1.73,t),details=ease(1.53,1.98,t);
 Pose body=camera(old);
 if(details>.0001){
  cairo_save(c);cairo_translate(c,720,540);cairo_scale(c,body.z,body.z);cairo_translate(c,-body.x,-body.y);
  cairo_push_group(c);framePrint();borders();
  auto s=cells[0];cairo_translate(c,s.x,s.y);label(s);
  cairo_pop_group_to_source(c);cairo_paint_with_alpha(c,details);cairo_restore(c);
 }
 for(int i=0;i<6;i++){
  auto o=grid[i];auto s=cells[o.id];
  double enterAt=.15+i*.038,alpha=unit((t-enterAt)/.14);
  if(o.id!=0)alpha*=1-leave;
  if(alpha<=.0001)continue;
  double entry=1-std::pow(1-unit((t-enterAt)/.42),4);
  double z=o.scale*(.94+.06*entry);
  double x=o.x,y=o.y+27*(1-entry)-o.cy*z;
  if(o.id==0){
   double targetX=720+(s.x-body.x)*body.z,targetY=540+(s.y-body.y)*body.z;
   x=mix(x,targetX,fly);y=mix(y,targetY,fly);z=mix(z,body.z,fly);
  }else{x=mix(x,720,leave*.12);y=mix(y,633,leave*.09);z*=1-.055*leave;}
  cairo_save(c);cairo_translate(c,x,y);cairo_scale(c,z,z);
  if(alpha>.9999)s.fn(old);
  else{cairo_push_group(c);s.fn(old);cairo_pop_group_to_source(c);cairo_paint_with_alpha(c,alpha);}
  cairo_restore(c);
 }
 cairo_restore(c);
 auto tile=cairo_pattern_create_for_surface(patina);cairo_pattern_set_extend(tile,CAIRO_EXTEND_REPEAT);cairo_set_source(c,tile);cairo_paint(c);cairo_pattern_destroy(tile);
}
