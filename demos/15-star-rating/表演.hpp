// 视线沿二维弧线先到目标。嘴角、开口度、眉间收紧和脸红连续求值。
struct Acting {double x,y,focus,wonder,joy,squeeze,blink,tilt;};
double arcPulse(double t,double a,double b){double u=unit((t-a)/(b-a));return std::sin(pi*u)*std::sin(pi*u);}
double settle(double t,double at,double frequency=21,double loss=8){
 double age=t-at;return age<0?0:std::sin(age*frequency)*std::exp(-age*loss);
}
Acting reaction(double t,double start,double finish,double targetX,double targetY,double phase){
 double seek=ease(start-.57,start-.25,t)*(1-ease(finish+.21,finish+.57,t));
 double turn=arcPulse(t,start-.58,start-.22);
 double blink=press(std::fmod(t+phase,3.31),1.08,.11);
 double focus=ease(start-.35,start-.06,t)*(1-ease(finish+.03,finish+.32,t));
 double joy=ease(finish+.065,finish+.41,t);
 double wow=arcPulse(t,start-.24,start+.10)+.60*arcPulse(t,finish+.015,finish+.32);
 return {mix(.30*std::sin(t*2.15+phase),targetX,seek),
         mix(-.16+.22*std::sin(t*2.15+phase+.9),targetY,seek)-.29*turn,
         focus,wow,joy,.56*arcPulse(t,finish-.065,finish+.12),blink,
         .045*std::sin(t*2.4+phase)+.08*targetX*focus-.09*settle(t,finish+.05)};
}
void actingEye(double x,double y,double w,double h,const Acting &m,double side){
 cairo_save(c);cairo_translate(c,x,y);
 double height=1+.14*m.wonder-.28*m.squeeze-.13*m.joy;
 double shut=std::min(.95,.88*m.blink+.36*m.squeeze);
 cairo_scale(c,1,height*(1-shut));ellipse(0,0,w,h,C,I,1.95);
 // 裁在眼白内；缺口朝光源，瞳孔单独移动，不带着整颗眼睛滑走。
 cairo_save(c);cairo_scale(c,w,h);cairo_new_path(c);cairo_arc(c,0,0,1,0,2*pi);cairo_clip(c);
 cairo_translate(c,std::clamp(m.x*.58+side*.016,-.69,.69),std::clamp(m.y*.47,-.59,.59));
 cairo_scale(c,.53-.085*m.wonder,.60-.085*m.wonder);
 double ang=-.86+.17*m.x+.14*m.y;cairo_new_path(c);cairo_move_to(c,0,0);cairo_arc(c,0,0,1,ang,ang+2*pi-.63);cairo_close_path(c);paint(I,N);
 ellipse(-.21,-.27,.15,.14,P,N);cairo_restore(c);cairo_restore(c);
 double raise=3.5*m.wonder+2*m.joy-2*m.focus;
 curve(x-w*.78,y-h-1-raise-side*.8,x-w*.30,y-h-4.4-raise,x+w*.34,y-h-4.8-raise,
       x+w*.79,y-h-2-raise+side*3.7*m.focus,I,1.65);
}
void face(double x,double y,double scale,double t,Acting m){
 cairo_save(c);cairo_translate(c,x,y);cairo_rotate(c,m.tilt);cairo_scale(c,scale,scale);
 actingEye(-10.4,-5.4,9.6,15.6,m,-1);actingEye(10.4,-5.5,9.4,15.2,m,1);
 ellipse(1.2+3.6*m.x,6.4+1.9*m.y,4.6,2.9,I,N);
 // 目标出现时收圆嘴巴，成功后嘴角外拉、露齿；同一条轮廓连续形变。
 double ow=unit(m.wonder),happy=unit(m.joy),focus=unit(m.focus);
 double width=(11.7+9.1*happy-2.0*focus)*(1-.5*ow);
 double top=16.7+focus*1.7+1.3*ow,depth=4.8+13.9*happy+10.4*ow-1.3*focus;
 double smile=1+8.6*happy-2.7*ow-1.9*focus;
 cairo_new_path(c);cairo_move_to(c,-width,top);
 cairo_curve_to(c,-width*.45,top+smile,width*.48,top+smile,width,top-.6);
 cairo_curve_to(c,width*.76,top+depth*1.26,-width*.78,top+depth*1.34,-width,top);cairo_close_path(c);
 ink(I);cairo_fill_preserve(c);cairo_save(c);cairo_clip(c);
 if(happy>.005){curve(-width,top+2.4*happy,-width*.34,top+smile+2.6*happy,width*.4,top+smile+2.3*happy,width,top+1.25*happy,C,3.7*happy);}
 ellipse(2.4,top+depth+1,width*.48,depth*.28,blush,N);cairo_restore(c);
 for(int side:{-1,1}){
  double cheek=happy*(1-.4*m.squeeze);
  if(cheek>.01){cairo_save(c);cairo_translate(c,side*(20.8+1.4*happy),8.5);cairo_scale(c,cheek,cheek);
   ellipse(0,0,4.5,2.25,blush,N);ln(-1.5,-.7,-2.5,1.2,DR,.75);ln(1.4,-.6,.25,1.3,DR,.75);cairo_restore(c);}
 }
 cairo_restore(c);
}
