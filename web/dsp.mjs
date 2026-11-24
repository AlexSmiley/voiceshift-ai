export const presets={Original:[0,0,0],Male:[-4,0,0],Female:[5,0,0],Deep:[-8,0,0],Robot:[0,1,0],Alien:[7,.6,.2],Cartoon:[10,0,0],Demon:[-10,.4,.3]};
export class Engine {
 constructor(rate){this.rate=rate;this.buf=new Float32Array(8192);this.w=0;this.phase=0;this.t=0;this.echo=new Float32Array(Math.round(rate*.18));this.e=0;}
 sample(x,p=0,robot=0,echo=0){const b=this.buf; b[this.w]=x; const span=1024; this.phase=(this.phase+1-Math.pow(2,p/12)+span)%span; const tap=d=>{let a=(this.w-d+b.length)%b.length;let i=Math.floor(a);return b[i]*(1-a+i)+b[(i+1)%b.length]*(a-i)};let q=this.phase/span;let y=p===0?x:tap(32+this.phase)*Math.sin(Math.PI*q)**2+tap(32+(this.phase+span/2)%span)*Math.cos(Math.PI*q)**2;this.w=(this.w+1)%b.length;y*=1-robot+robot*Math.sin(2*Math.PI*65*this.t++/this.rate);let z=this.echo[this.e];this.echo[this.e]=y+z*.25;this.e=(this.e+1)%this.echo.length;return Math.max(-1,Math.min(1,y+echo*z));}
}
