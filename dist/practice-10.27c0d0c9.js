function t(t=.975){function e(t){const e={t:Math.sqrt(-2*Math.log(t)),c0:2.515517,c1:.802853,c2:.010328,d1:1.432788,d2:.1892659,d3:.001308},{t:r,c0:i,c1:s,c2:n,d1:a,d2:o,d3:h}=e;return r-(i+s*r+n*Math.pow(r,2))/(1+a*r+o*Math.pow(r,2)+h*Math.pow(r,3))}return t<=.5?-e(t):e(1-t)}function e(e,r=.975){const i=t(r);return+(i+(s=i,(Math.pow(s,3)+s)/4/e)+(t=>(5*Math.pow(t,5)+16*Math.pow(t,3)+3*t)/96)(i)/Math.pow(e,2)+(t=>(3*Math.pow(t,7)+19*Math.pow(t,5)+17*Math.pow(t,3)-15*t)/384)(i)/Math.pow(e,3)+(t=>(79*Math.pow(t,9)+779*Math.pow(t,7)+1482*Math.pow(t,5)-1920*Math.pow(t,3)-945*t)/92160)(i)/Math.pow(e,4)).toFixed(2);var s}class r{#t=[];#e=[];constructor(...t){this.#t=t[0].x||t[0].x||t[0],this.#e=t[0].y||t[0].y||t[1]}set x(t){if("object"!=typeof t)return console.error("Type Error: Parameter type must be an array");this.#t=t}get x(){return this.#t}set y(t){if("object"!=typeof t)return console.error("Type Error: Parameter type must be an array");this.#e=t}get y(){return this.#e}getAverage(t="x"){return"y"==t.toLowerCase()?this.#e.reduce(((t,e)=>t+e))/this.#e.length:this.#t.reduce(((t,e)=>t+e))/this.#t.length}getAverageByGroup(){return this.#t.reduce(((t,e,r)=>t+e*this.#e[r]))/this.#t.length}getS(t="x"){return Math.sqrt(1/this[t.toLowerCase()].length*this[t.toLowerCase()].reduce(((e,r)=>e+Math.pow(r-this.getAverage(t),2))))}getR(){return(this.getAverageByGroup()-this.getAverage("x")*this.getAverage("y"))/(this.getS("x")*this.getS("y"))}getStatistics(){return this.getR()*Math.sqrt(this.x.length-2)/Math.sqrt(1-Math.pow(this.getR(),2))}getEstimation(){return this.getR()*(this.getS("y")/this.getS("x"))}getEstimationA(){return this.getAverage("y")-this.getEstimationB()*this.getAverage("x")}getReconstructedRegressionLine(){const t=[...this.#t].map((t=>this.getEstimationA()+this.getEstimationB()*t));return{x:[...this.x].sort(((t,e)=>t-e)),y:t}}getReconstructedRegressionFunction(){const{reconstructedY:t}=this.getReconstructedRegressionLine();return this.y.map(((e,r)=>e-t[r])).map((t=>Math.pow(t,2))).reduce(((t,e)=>t+e))}getDispersionOfPours(){return this.getReconstructedRegressionFunction()/(this.#t.length-2)}getAverageQuadraticDeviationsA(){return Math.sqrt(this.getDispersionOfPours()/this.x.length*(1+Math.pow(this.getAverage("x"),2)/Math.pow(this.getS("x"),2)))}getAverageQuadraticDeviationsB(){return Math.sqrt(this.getDispersionOfPours()/(this.x.length*Math.pow(this.getS("x"),2)))}getConfidenceIntervals(){const t=this.x.length-2;return{a:[this.getEstimationA()-e(t)*this.getAverageQuadraticDeviationsA(),this.getEstimationA()+e(t)*this.getAverageQuadraticDeviationsA()],b:[this.getEstimationB()-e(t)*this.getAverageQuadraticDeviationsB(),this.getEstimationB()+e(t)*this.getAverageQuadraticDeviationsB()]}}getValueOfParemetherA(){return this.getEstimationA()/this.getAverageQuadraticDeviationsA()}getValueOfParemetherB(){return this.getEstimationB()/this.getAverageQuadraticDeviationsB()}printChart(t="chart1-1"){const e=document.querySelector(`#${t}`).getContext("2d"),[r,i]=this.getReconstructedRegressionLine();console.log(r,i);const[s,n]=[x,y];new Chart(e,{data:{labels:s,datasets:[{type:"scatter",label:"Correlation field",pointRadius:3,data:n,backgroundColor:"#34a853"},{type:"line",label:"Reconstructed regression line",data:i}]},options:{responsive:!1,scales:{x:{title:{text:"x",display:!0,align:"end"},position:"bottom"},y:{title:{text:"y",display:!0,align:"end"}}}}})}}function i(t,e=!1){return console.log(t),e?t.filter(((t,e)=>""!==t)).map((t=>Number.isNaN(Number(t))?0:Number(t))):t.split(",").filter((t=>""!==t)).map((t=>Number.isNaN(Number(t))?0:Number(t)))}!function(){const t=document.querySelector("#submit-input"),e=document.querySelector("#input-file")??null;let s=null;if(null===e)return console.error("fileInput === null");e.addEventListener("change",(t=>{const e=t.target.files[0],r=new FileReader;r.readAsText(e),r.addEventListener("load",(t=>{s=r.result.split("\n").map((t=>t.trim())).map((t=>t.split(/\s+/))),result1=s.map((t=>"NA"==t[0]||"?"==t[0]?0:+t[0])),result2=s.map((t=>"NA"==t[1]||"?"==t[1]?0:+t[1])),s={x:result1,y:result2},document.querySelector("#file-label").innerText=`Loaded: ${e.name}`})),r.onerror=()=>console.log(r.error)})),t.addEventListener("click",(t=>{const e=document.querySelector("#input-x").value??"",n=document.querySelector("#input-y").value??"",a=null===s?new r(i(e),i(n)):new r(s);console.log(a.getS("x")),a.printChart("chart1-1")}))}();
//# sourceMappingURL=practice-10.27c0d0c9.js.map