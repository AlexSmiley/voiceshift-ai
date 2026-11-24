import {Engine} from './dsp.mjs';
class Shift extends AudioWorkletProcessor{constructor(){super();this.engine=new Engine(sampleRate);this.params=[0,0,0];this.port.onmessage=e=>this.params=e.data;}process(inputs,outputs){let x=inputs[0]?.[0],y=outputs[0][0];for(let i=0;i<y.length;i++)y[i]=this.engine.sample(x?.[i]||0,...this.params);return true;}}registerProcessor('shift',Shift);
