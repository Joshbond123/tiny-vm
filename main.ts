// tiny-stack-vm-01: run /input/<id>/program.bin on input.bin, write /output/<id>/stdout.bin + exit.txt.
import{mkdirSync,readFileSync,readdirSync,writeFileSync}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
const T=`!2b%'+,0        *******&***&*** ***             AEEA!           &)              %%"%"`;
const enc=new TextEncoder();
function R(P,Q){
const n=P.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),B=new Uint8Array(65536);
let sp=0,cp=0,ip=0,pc=0,st=0,ol=0;
const E=e=>[B.subarray(0,ol),e];
for(;;){
if(st===1000000)return E(10);
if(pc<0||pc>=n)return E(9);
const op=P[pc],q=T.charCodeAt(op)-33;
if(!(q>=0))return E(5);
const im=q>>4,po=q>>2&3,pu=q&3;
if(pc+im>=n)return E(9);
st++;
const nx=pc+1+im;
if(sp<po)return E(2);
if(sp-po+pu>256)return E(3);
pc=nx;
switch(op){
case 0:return E(0);
case 1:D[sp++]=(P[nx-1]<<24)>>24;break;
case 2:D[sp++]=P[nx-4]|P[nx-3]<<8|P[nx-2]<<16|P[nx-1]<<24;break;
case 3:sp--;break;
case 4:D[sp]=D[sp-1];sp++;break;
case 5:{const v=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=v;break}
case 6:D[sp]=D[sp-2];sp++;break;
case 7:{const v=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=v;break}
case 23:D[sp-1]=-D[sp-1]|0;break;
case 27:D[sp-1]=~D[sp-1];break;
case 48:case 49:case 50:{
const r=((P[nx-2]|P[nx-1]<<8)<<16)>>16;
let g=1;
if(op!=48){const v=D[--sp];g=op==49?v==0:v!=0}
if(g)pc=nx+r;break}
case 51:if(cp==64)return E(7);C[cp++]=nx;pc=P[nx-2]|P[nx-1]<<8;break;
case 52:if(!cp)return E(8);pc=C[--cp];break;
case 64:{const a=D[sp-1];if(a<0||a>255)return E(6);D[sp-1]=M[a];break}
case 65:{const a=D[sp-1];if(a<0||a>255)return E(6);M[a]=D[sp-2];sp-=2;break}
case 80:{const b=enc.encode(''+D[sp-1]);if(ol+b.length>65536)return E(11);sp--;B.set(b,ol);ol+=b.length;break}
case 81:if(ol>65535)return E(11);B[ol++]=D[--sp]&255;break;
case 82:D[sp++]=ip<Q.length?Q[ip++]:-1;break;
case 83:return E(D[--sp]&255);
default:{
const b=D[--sp],a=D[sp-1];
let r;
switch(op){
case 16:r=a+b|0;break;
case 17:r=a-b|0;break;
case 18:r=Math.imul(a,b);break;
case 19:if(!b)return E(4);r=a==-2147483648&&b==-1?a:a/b|0;break;
case 20:if(!b)return E(4);r=b==-1?0:a%b|0;break;
case 21:if(!b)return E(4);r=Math.floor((a>>>0)/(b>>>0))|0;break;
case 22:if(!b)return E(4);r=(a>>>0)%(b>>>0)|0;break;
case 24:r=a&b;break;
case 25:r=a|b;break;
case 26:r=a^b;break;
case 28:r=a<<b;break;
case 29:r=a>>b;break;
case 30:r=a>>>b|0;break;
case 32:r=a==b?1:0;break;
case 33:r=a<b?1:0;break;
case 34:r=(a>>>0)<(b>>>0)?1:0;break;
}
D[sp-1]=r;break}
}}}
for(const id of readdirSync(I).sort()){
const d=I+'/'+id,[b,e]=R(readFileSync(d+'/program.bin'),readFileSync(d+'/input.bin'));
mkdirSync(O+'/'+id,{recursive:true});
writeFileSync(O+'/'+id+'/stdout.bin',b);
writeFileSync(O+'/'+id+'/exit.txt',e+'\n');
}
