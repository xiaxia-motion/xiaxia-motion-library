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
