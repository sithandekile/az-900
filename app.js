const TOPICS=[
{id:"cloud",name:"Cloud Concepts",qs:[
["Which pricing model means you pay only for the resources you actually use?",["Consumption-based (OpEx)","Capital expenditure (CapEx)","Fixed-term hardware lease","Perpetual licensing"],0,"Consumption-based pricing is operational expenditure: no upfront hardware cost, and you are billed for usage. CapEx is upfront spending on physical assets, which is the on-premises model."],
["In an IaaS virtual machine, who is responsible for patching the guest operating system?",["The customer","Microsoft","The hardware vendor","The internet service provider"],0,"With IaaS, Microsoft manages the physical hosts, network and datacenter, but you manage the OS, apps and data. In PaaS, Microsoft takes over OS patching too."],
["Azure App Service, where you deploy code without managing servers, is an example of which service type?",["IaaS","PaaS","SaaS","On-premises"],1,"PaaS gives you a managed platform to run your code. IaaS gives raw VMs, and SaaS (like Microsoft 365) is a finished application you just use."],
["A web app automatically adds instances during a traffic spike and removes them afterwards. What is this called?",["Elasticity","Fault tolerance","Disaster recovery","Geo-replication"],0,"Elasticity is scaling resources out and in automatically as demand changes. Fault tolerance is surviving failures, and disaster recovery is restoring service after a major outage."]]},
{id:"arch",name:"Core Architecture",qs:[
["What is an Azure region pair?",["Two regions in the same geography, paired for disaster recovery","Two datacenters in the same building","Two subscriptions under one account","Two availability zones in one region"],0,"Region pairs sit at least 300 miles apart where possible in the same geography. Azure prioritises recovery and sequences updates across pairs to limit simultaneous outages."],
["What are Availability Zones?",["Physically separate locations within a region, each with independent power, cooling and networking","Separate Azure subscriptions","Regions in different countries","Groups of VMs on the same rack"],0,"Zones protect against datacenter-level failure inside one region. Spreading VMs across zones is how you get high availability without leaving the region."],
["Which list shows the Azure management hierarchy from largest to smallest scope?",["Management group, subscription, resource group, resource","Subscription, management group, resource, resource group","Resource group, subscription, management group, resource","Resource, resource group, subscription, management group"],0,"Management groups organise subscriptions, subscriptions contain resource groups, and resource groups contain individual resources. Policies and RBAC assigned higher up are inherited downward."],
["Which statement about resource groups is true?",["Each resource belongs to exactly one resource group","A resource can belong to several resource groups","Resource groups can be nested inside each other","Deleting a resource group keeps its resources"],0,"A resource lives in exactly one group at a time. Groups cannot be nested, and deleting a group deletes everything inside it."]]},
{id:"compute",name:"Compute & Networking",qs:[
["Which service runs a container quickly without you managing any virtual machines?",["Azure Container Instances","Azure Virtual Machines","Azure Dedicated Host","Availability sets"],0,"Container Instances is the simplest way to run a container serverlessly. Virtual Machines require you to manage the OS, and Dedicated Host is physical server hosting."],
["Which service runs small pieces of code in response to events, with no server management?",["Azure Functions","Azure Virtual Desktop","Azure Batch","Azure Bastion"],0,"Azure Functions is serverless and event-driven (HTTP request, timer, queue message) and you pay per execution."],
["How do you let resources in two different virtual networks communicate privately over the Microsoft backbone?",["VNet peering","Azure DNS","Traffic Manager","Azure Load Balancer"],0,"VNet peering links virtual networks so traffic stays on Microsoft's private network. DNS resolves names, Traffic Manager routes users by DNS, and a load balancer spreads traffic across backends."],
["Which feature allows or denies network traffic by source, destination, port and protocol on a subnet or NIC?",["Network security group (NSG)","Azure Bastion","ExpressRoute","VPN Gateway"],0,"NSGs hold inbound and outbound security rules. Bastion provides secure RDP/SSH, while ExpressRoute and VPN Gateway connect on-premises networks to Azure."]]},
{id:"storage",name:"Storage",qs:[
["Which Azure Storage service is best for unstructured data such as images and video?",["Blob Storage","Table Storage","Queue Storage","Azure Disk"],0,"Blob (binary large object) storage is designed for massive amounts of unstructured data. Tables hold NoSQL key-value data and queues pass messages."],
["Which redundancy option copies your data to a secondary region?",["Geo-redundant storage (GRS)","Locally redundant storage (LRS)","Zone-redundant storage (ZRS)","None of them"],0,"GRS replicates to a paired region hundreds of miles away. LRS keeps copies in one datacenter and ZRS spreads them across zones in the same region."],
["Which service provides fully managed file shares accessible over SMB?",["Azure Files","Blob Storage","Azure Queue","Azure Data Lake"],0,"Azure Files offers SMB (and NFS) shares that can be mounted by cloud or on-premises machines, a replacement for a traditional file server."],
["Which blob access tier has the lowest storage cost but a delay before you can read the data?",["Archive","Hot","Cool","Premium"],0,"Archive is cheapest to store but data is offline and must be rehydrated, which takes hours. Hot is for frequent access, Cool for infrequent access."]]},
{id:"identity",name:"Identity & Security",qs:[
["What is Microsoft Entra ID (formerly Azure Active Directory)?",["A cloud-based identity and access management service","A virtual network service","A database engine","A billing portal"],0,"Entra ID handles authentication and single sign-on for users, apps and devices across Azure, Microsoft 365 and third-party apps."],
["Which feature requires users to prove identity with two or more methods, such as password plus phone prompt?",["Multi-factor authentication (MFA)","Single sign-on (SSO)","Conditional deployment","Passwordless sync"],0,"MFA combines something you know, have or are. SSO lets you sign in once to reach many apps, which is convenient but not an extra verification step."],
["What does defense in depth mean?",["Using multiple layers of security so one failure does not expose everything","Placing all security in one firewall","Encrypting only the data layer","Storing backups in deep storage"],0,"Layers include physical, identity, perimeter, network, compute, application and data. An attacker who beats one layer still faces the next."]]},
{id:"gov",name:"Governance & Cost",qs:[
["Which feature enforces rules such as 'resources may only be created in approved regions'?",["Azure Policy","Azure RBAC","Azure Monitor","Azure Advisor"],0,"Policy evaluates resources against rules and can deny or audit non-compliance. RBAC controls what users can do, not what resources look like."],
["Which feature stops anyone, even an owner, from accidentally deleting a critical resource?",["Resource lock (CanNotDelete)","Resource tag","Azure Blueprint","Network security group"],0,"Locks override permissions: CanNotDelete blocks deletion, ReadOnly blocks changes. Tags only label resources for organisation and cost tracking."],
["Which tool estimates how much you will save by moving on-premises workloads to Azure?",["Total Cost of Ownership (TCO) calculator","Pricing calculator","Cost Management","Azure Service Health"],0,"TCO compares on-premises costs with Azure. The Pricing calculator estimates the monthly cost of specific Azure services you plan to deploy."],
["Which service gives personalised recommendations on reliability, security, performance and cost?",["Azure Advisor","Azure Service Health","Microsoft Defender","Azure Arc"],0,"Advisor analyses your deployed resources and suggests improvements. Service Health reports Azure outages affecting you."]]}
];
const $=id=>document.getElementById(id);
let S={},TIMED=false,CONF="sure",TM=null,SAMPLE=null;
function show(id){["home","quiz","done"].forEach(s=>$(s).hidden=s!==id)}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function home(){clearInterval(TM);
  show("home");
  const all=TOPICS.reduce((n,t)=>n+t.qs.length,0);
  $("topics").innerHTML="";
  [{id:"all",name:"Mixed: all topics",n:all},...TOPICS.map(t=>({id:t.id,name:t.name,n:t.qs.length}))].forEach(t=>{
    const b=document.createElement("button");b.className="topic";
    b.innerHTML=`<b>${t.name}</b><span>${t.n} questions</span>`;
    b.onclick=()=>start(t.id);$("topics").appendChild(b);
  });
}
function start(id,pool){
  if(!pool){
    pool=[];
    TOPICS.filter(t=>id==="all"||t.id===id).forEach(t=>t.qs.forEach(q=>pool.push({t:t.name,q:q[0],o:q[1],a:q[2],e:q[3]})));
  }
  S={pool:shuffle(pool),i:0,res:[],id};
  show("quiz");render();
}
function render(){
  const c=S.pool[S.i];
  $("tn").textContent=c.t;$("pc").textContent=`Question ${S.i+1} of ${S.pool.length}`;
  $("pb").style.width=(S.i/S.pool.length*100)+"%";
  $("qt").textContent=c.q;
  S.order=shuffle(c.o.map((_,k)=>k));S.done=false;
  $("opts").innerHTML="";
  S.order.forEach(k=>{
    const b=document.createElement("button");b.className="opt";b.textContent=c.o[k];
    b.onclick=()=>answer(k,b);$("opts").appendChild(b);
  });
  $("fb").hidden=true;$("next").hidden=true;$("ai").hidden=true;$("aibox").hidden=true;$("confrow").hidden=false;
  CONF="sure";setConf();startTimer();
}
function answer(k,btn){
  if(S.done)return;S.done=true;clearInterval(TM);
  const c=S.pool[S.i],right=k===c.a;
  S.res.push({c,k,right,conf:CONF});
  [...$("opts").children].forEach((b,j)=>{
    b.disabled=true;
    if(S.order[j]===c.a)b.classList.add("ok");
    else if(b===btn)b.classList.add("bad");
  });
  const fb=$("fb");fb.hidden=false;fb.className="fb "+(right?"ok":"bad");
  fb.innerHTML=`<b>${right?"Correct!":"Not quite."}</b>${right?"":`You chose “${esc(c.o[k]||"nothing (time ran out)")}”. The right answer is “${esc(c.o[c.a])}”. `}${esc(c.e)}`;
  $("ai").hidden=!SAMPLE;$("confrow").hidden=true;const n=$("next");n.hidden=false;n.textContent=S.i===S.pool.length-1?"See results":"Next question";n.focus();
}
function esc(s){return s.replace(/[&<>]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[m]))}
$("next").onclick=()=>{S.i++;S.i<S.pool.length?render():results()};
$("quit").onclick=home;$("again").onclick=home;
function results(){
  show("done");
  const n=S.res.length,ok=S.res.filter(r=>r.right).length,pct=Math.round(ok/n*100);
  $("score").textContent=`${ok} / ${n} (${pct}%)`;
  $("verdict").textContent=pct>=80?"Strong result. You are exam-ready on these topics.":pct>=60?"Good progress. Review the misses below and try again.":"Keep going. Read each explanation, then retry the questions you missed.";
  const by={};S.res.forEach(r=>{(by[r.c.t]=by[r.c.t]||[0,0]);by[r.c.t][1]++;if(r.right)by[r.c.t][0]++});
  $("bytopic").innerHTML=Object.entries(by).map(([t,[a,b]])=>`<div class="tb"><span class="n">${t}</span><div class="bar"><i style="width:${a/b*100}%"></i></div><span>${a}/${b}</span></div>`).join("");
  const miss=S.res.filter(r=>!r.right);
  const lucky=S.res.filter(r=>r.right&&r.conf==="guess").length,over=S.res.filter(r=>!r.right&&r.conf==="sure").length;
  $("insight").innerHTML=`Lucky guesses: <b>${lucky}</b> (right, but not secure yet). Overconfident misses: <b>${over}</b> (sure but wrong, so revise these first).`;
  $("retryMiss").hidden=!miss.length;
  $("retryMiss").onclick=()=>start(S.id,miss.map(r=>r.c));
  $("review").hidden=!miss.length;
  $("revlist").innerHTML=miss.map(r=>`<div class="rev"><small>${r.c.t}</small><div><b>${esc(r.c.q)}</b></div><div>Your answer: ${esc(r.c.o[r.k]||"no answer (timed out)")}</div><div>Correct: ${esc(r.c.o[r.c.a])}</div><p>${esc(r.c.e)}</p></div>`).join("");
}
function setConf(){document.querySelectorAll("#confrow .chip").forEach(b=>b.classList.toggle("on",b.dataset.c===CONF))}
document.querySelectorAll("#confrow .chip").forEach(b=>b.onclick=()=>{CONF=b.dataset.c;setConf()});
$("timedToggle").onclick=()=>{TIMED=!TIMED;$("timedToggle").classList.toggle("on",TIMED);$("timedToggle").textContent="⏱ Timed mode: "+(TIMED?"on (30s per question)":"off")};
function startTimer(){clearInterval(TM);const el=$("tm");if(!TIMED){el.textContent="";return}let t=30;el.textContent="⏱ "+t+"s";TM=setInterval(()=>{t--;el.textContent="⏱ "+t+"s";if(t<=0){clearInterval(TM);CONF="guess";answer(-1,null)}},1000)}
const MODES={analogy:"Explain using one everyday analogy.",beginner:"Explain for a complete beginner with no IT background, avoiding jargon.",trick:"Give one short memorable mnemonic or memory trick to recall the correct answer."};
document.querySelectorAll("#ai [data-m]").forEach(b=>b.onclick=async()=>{
  const c=S.pool[S.i],box=$("aibox"),r=S.res[S.res.length-1];box.hidden=false;box.textContent="Thinking…";
  const prompt=`You are a friendly Azure fundamentals tutor helping a learner prepare for the AZ-900 exam.
Practice question: ${c.q}
Options: ${c.o.join(" | ")}
Correct answer: ${c.o[c.a]}
Learner chose: ${r&&r.k>=0?c.o[r.k]:"nothing (timed out)"}
Existing explanation: ${c.e}
Task: ${MODES[b.dataset.m]} Also say in one sentence why the learner's choice was wrong, or confirm why they were right.
Rules: max 90 words, plain text, no markdown, do not invent Azure features, stay on this one question.`;
  try{await SAMPLE(prompt,{modelTier:"quick",cache:false,onText:({text})=>{box.textContent=text}})}
  catch(e){box.textContent=e&&e.code==="not_granted"?"AI help needs your permission to run.":"Could not reach Claude right now. Try again in a moment."}
});
(async()=>{try{SAMPLE=window.claude?await claude.use("sample"):null}catch(e){SAMPLE=null}})();
home();
