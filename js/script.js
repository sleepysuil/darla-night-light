/* Your Night Light — page logic */
/* ---------- default content (the Edit panel overrides it) ---------- */
const DEFAULTS = {
  herName: "DARLALA", yourName: "LUIS",
  intro: "Whatever you're feeling right now, I left something here for it. Pick one, and read it like I'm right there saying it.",
  voice: {},   // mood id -> audio data URI, added when Luis sends recordings
  moodSongs: {
    miss:     { title: "Mundo", artist: "IV of Spades", note: "For when the distance feels loud. Play it and think of me." },
    sad:      { title: "Fix You", artist: "Coldplay", note: "Let this one sit with you for a bit. You don't have to feel better right away." },
    sleep:    { title: "Bloom", artist: "The Paper Kites", note: "Soft and slow. Let it carry you to sleep." },
    stress:   { title: "Breathin", artist: "Ariana Grande", note: "Breathe along with it. One breath at a time." },
    alone:    { title: "Lean on Me", artist: "Bill Withers", note: "A reminder that you've always got someone. You've got me." },
    motivate: { title: "Hall of Fame", artist: "The Script ft. will.i.am", note: "Volume up. This is your theme song today." },
    smile:    { title: "Here Comes the Sun", artist: "The Beatles", note: "Instant good mood, I promise." }
  },
  letters: {
    miss:    { title: "I miss you too.", body: "If you're reading this, you're missing me. Just so you know, I'm probably missing you right now as well.\n\nThe distance is real, but so is this. Every call, every late-night chat, every game we play together, it all counts. It's bringing us closer to the day I finally get to see you.\n\nGo look at the moon for a second. I'm under the same one." },
    sad:     { title: "Hey. I'm here.", body: "I'm sorry today feels heavy. You don't have to explain it or fix it right now. It's okay to just feel it.\n\nYou are so much stronger than you think, and you are never a burden to me. Not on your best day, not on your worst one.\n\nTake a slow breath with the circle on this page. Then message me, even if it's just one word. I'd rather hear from you sad than not hear from you at all." },
    sleep:   { title: "It's late, isn't it?", body: "Your mind is probably running a hundred laps right now. That's okay.\n\nWhatever is keeping you up can wait until tomorrow. Tonight, your only job is to rest.\n\nPut your phone face down after this, breathe with the circle a few times, and think of something that made you smile today. If you're still awake after, call me. I'll stay on until you fall asleep." },
    stress:  { title: "One thing at a time.", body: "I know there's a lot on your plate. You don't have to carry all of it at once.\n\nDo one small thing from the list on this page. Then another. You've gotten through every hard day so far, and you'll get through this one too.\n\nI believe in you, always. And when it's done, I want to hear all about it." },
    alone:   { title: "You're not alone.", body: "Even when it's quiet and it feels like nobody's around, I'm here. I might be far, but I'm always just one message away.\n\nYou matter so much more than you realize. To me, and to so many people around you.\n\nRead the reasons on this page. Every one of them is true." },
    motivate:{ title: "You've got this.", body: "Whatever you're working on right now, I'm proud of you for not giving up on it.\n\nYou don't have to be perfect. You just have to keep going, one step at a time. Small progress is still progress.\n\nRead a few of the reminders on this page, put on your song, and go show today what you can do. I'll be cheering for you the whole time." },
    smile:   { title: "Okay, smile mode.", body: "You came here for a smile, so here's my job: make you laugh, even if it's a little corny.\n\nTap the button for something silly. If none of them work, call me and I'll try harder. I don't give up easily, especially when it comes to you." }
  },
  reasons: [
    "You make people feel safe just by being yourself.",
    "Your laugh can fix my whole day.",
    "You're kind even when nobody's watching.",
    "You try so hard, even when it's tough.",
    "Talking to you is the best part of my day.",
    "You care about the people around you so much.",
    "You're stronger than you give yourself credit for.",
    "You make the distance feel smaller.",
    "You're you, and that's honestly enough."
  ],
  jokes: [
    "Are you a charger? Because I'd be dead without you.",
    "I'd split my last fries with you. That's how serious this is.",
    "Why did the phone wear glasses? It lost its contacts. Unlike me, I'll never lose yours.",
    "If you were a vegetable, you'd be a cute-cumber.",
    "I told my Wi-Fi about you. Now it says we have a strong connection.",
    "Are you a keyboard? Because you're just my type."
  ],
  motivation: [
    "Small steps still count. Keep going.",
    "You've survived every hard day so far. Today is no different.",
    "Progress, not perfection.",
    "You are allowed to rest. You are not allowed to give up on yourself.",
    "The fact that you're trying already makes you brave.",
    "Hard things get easier the more you do them. Start with one.",
    "You're capable of more than you think. I've seen it.",
    "One bad day doesn't erase all your good ones.",
    "Do it scared. Do it tired. Just do a little.",
    "Your pace is still a pace. Don't compare it to anyone else's.",
    "Future you is going to thank you for not quitting today.",
    "You don't need to see the whole staircase. Just take the next step.",
    "It's okay to start over. Starting over is still moving.",
    "Be proud of how far you've come, then keep going.",
    "You are not behind. You are exactly where your story is.",
    "Every expert was once a beginner who didn't stop.",
    "Breathe. Focus. One thing at a time.",
    "Mistakes mean you're learning. Keep learning.",
    "Doubt kills more dreams than failure does. Believe a little.",
    "You can do hard things. You've done them before.",
    "Today, just be a little better than yesterday.",
    "Discipline is choosing what you want most over what you want now.",
    "Rest if you must, but come back. You're not done yet.",
    "Your effort is never wasted, even when it doesn't show yet.",
    "Be gentle with yourself. You're doing the best you can.",
    "The hardest part is starting. You've already done that.",
    "Keep your head up. Your crown is showing.",
    "I believe in you, even on the days you don't.",
    "Wins come from days like today, when you keep going anyway.",
    "Go get it. I'm cheering for you from here."
  ],
  tasks: ["Drink a glass of water", "Stretch for one minute", "Write down the one thing that matters most", "Take 3 slow breaths", "Message me"]
};
const MOODS = [
  { id:"miss",   label:"I miss you",       sub:"for the far-away days",    icon:"heart",  extras:["voice","msong","moon"] },
  { id:"sad",    label:"I'm sad",          sub:"for the heavy days",       icon:"cloud",  extras:["voice","msong","breathe","reasons","help"] },
  { id:"sleep",  label:"I can't sleep",    sub:"for the 2 a.m. thoughts",  icon:"moon",   extras:["voice","msong","breathe"] },
  { id:"stress", label:"I'm stressed",     sub:"for the too-much days",    icon:"bolt",   extras:["voice","msong","tasks","quotes","breathe"] },
  { id:"motivate", label:"I need motivation", sub:"for the hard-work days", icon:"spark", extras:["voice","msong","quotes"] },
  { id:"alone",  label:"I feel alone",     sub:"for the quiet nights",     icon:"user",   extras:["voice","msong","reasons"] },
  { id:"smile",  label:"I need a smile",   sub:"for a little laugh",       icon:"smile",  extras:["voice","msong","jokes"] }
];
const ICONS = {
  heart:"M12 21s-7.8-4.8-9.6-9.6C1.1 8 3.2 4.4 6.9 4.4c2.2 0 3.7 1.2 5.1 3.1 1.4-1.9 2.9-3.1 5.1-3.1 3.7 0 5.8 3.6 4.5 7C19.8 16.2 12 21 12 21z",
  cloud:"M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6 9.5 4.3 4.3 0 0 0 7 18zM9 21l-1 1M13 21l-1 1M17 21l-1 1",
  moon:"M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5z",
  bolt:"M13 2 4 14h7l-1 8 9-12h-7z",
  user:"M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  spark:"M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8",
  smile:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 14s1.5 2 4 2 4-2 4-2M9 9.5h.01M15 9.5h.01"
};
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const clone = o => JSON.parse(JSON.stringify(o));
const el = (t,c,x) => { const e=document.createElement(t); if(c) e.className=c; if(x!=null) e.textContent=x; return e; };
const show = (n,on) => { n.hidden = !on; };
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const filled = v => { const s=String(v??"").trim(); return s.length>0 && !/^\[.*\]$/.test(s); };
const validId = id => typeof id==="string" && /^[A-Za-z0-9_-]{8,128}$/.test(id);
const parseDay = s => { const d=new Date(String(s||"")+"T00:00:00"); return isNaN(d)?null:d; };
const local = { get(k){ try{ return JSON.parse(localStorage.getItem(k)); }catch(e){ return null; } }, set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} } };
function icon(name, color, size){ const ns="http://www.w3.org/2000/svg"; const s=document.createElementNS(ns,"svg"); [["width",size||22],["height",size||22],["viewBox","0 0 24 24"],["fill","none"],["stroke",color||"#F6E7B8"],["stroke-width","1.8"],["stroke-linecap","round"],["stroke-linejoin","round"],["aria-hidden","true"]].forEach(([k,v])=>s.setAttribute(k,v)); const p=document.createElementNS(ns,"path"); p.setAttribute("d",ICONS[name]); s.append(p); return s; }
function merge(saved){
  const c=clone(DEFAULTS); if(!saved||typeof saved!=="object") return c;
  for (const k of Object.keys(DEFAULTS)){
    const v=saved[k]; if(v==null) continue;
    if (k==="moodSongs"){ for (const m of Object.keys(c.moodSongs)) if (v[m]) Object.assign(c.moodSongs[m], v[m]); }
    else if (k==="letters"){ for (const m of Object.keys(c.letters)) if (v[m]) Object.assign(c.letters[m], v[m]); }
    else if (Array.isArray(DEFAULTS[k])){ if(Array.isArray(v) && v.length) c[k]=clone(v); }
    else c[k]=v;
  }
  return c;
}
let CFG = clone(DEFAULTS);
const her = () => filled(CFG.herName) ? CFG.herName : "you";
const me  = () => filled(CFG.yourName) ? CFG.yourName : "me";

/* ---------- stars ---------- */
(function(){ const c=$("#stars"), x=c.getContext("2d"); let st=[];
  function size(){ const d=devicePixelRatio||1; c.width=c.offsetWidth*d; c.height=c.offsetHeight*d; st=Array.from({length:90},()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:(Math.random()*1.3+.3)*d,p:Math.random()*6})); }
  function draw(t){ x.clearRect(0,0,c.width,c.height); st.forEach(s=>{ x.globalAlpha=reduced()?.6:.25+.6*Math.abs(Math.sin(t/1800+s.p)); x.fillStyle="#FFFFFF"; x.beginPath(); x.arc(s.x,s.y,s.r,0,7); x.fill(); }); if(!reduced()) requestAnimationFrame(draw); }
  size(); addEventListener("resize",size); requestAnimationFrame(draw);
})();

/* ---------- tonight's moon (real phase) ---------- */
function moonPhase(date){
  const synodic=29.530588853, ref=Date.UTC(2000,0,6,18,14);
  let p=((date-ref)/86400000/synodic)%1; if(p<0) p+=1;
  const lit=(1-Math.cos(2*Math.PI*p))/2;
  const names=[[.0333,"New moon"],[.2167,"Waxing crescent"],[.2833,"First quarter"],[.4667,"Waxing gibbous"],[.5333,"Full moon"],[.7167,"Waning gibbous"],[.7833,"Last quarter"],[.9667,"Waning crescent"],[1.01,"New moon"]];
  return { p, lit, name:names.find(n=>p<n[0])[1] };
}
function drawMoon(canvas, p){
  const x=canvas.getContext("2d"), W=canvas.width, r=W*0.42, cx=W/2, cy=W/2;
  x.clearRect(0,0,W,W);
  x.fillStyle="#2A3266"; x.beginPath(); x.arc(cx,cy,r,0,Math.PI*2); x.fill();
  const waxing=p<.5, k=Math.cos(2*Math.PI*p), rx=Math.abs(k)*r, lightCol="#F6E7B8";
  x.save(); x.beginPath(); x.arc(cx,cy,r,0,Math.PI*2); x.clip();
  x.fillStyle=lightCol; x.beginPath();
  if (waxing) x.arc(cx,cy,r,-Math.PI/2,Math.PI/2,false); else x.arc(cx,cy,r,Math.PI/2,-Math.PI/2+Math.PI*2,false);
  x.closePath(); x.fill();
  const gibbous = (waxing && p>.25) || (!waxing && p<.75);
  x.fillStyle = gibbous ? lightCol : "#2A3266";
  x.beginPath(); x.ellipse(cx,cy,Math.max(rx,0.5),r,0,0,Math.PI*2); x.fill();
  x.globalAlpha=.10; x.fillStyle="#7E6B3C";
  [[-.3,-.25,.16],[.18,.1,.12],[-.05,.35,.09],[.32,-.3,.07],[-.38,.18,.06]].forEach(([dx,dy,rr])=>{ x.beginPath(); x.arc(cx+dx*r,cy+dy*r,rr*r,0,Math.PI*2); x.fill(); });
  x.restore();
}
function renderMoon(){
  const m=moonPhase(new Date()); drawMoon($("#moon"), m.p);
  const pct=Math.round(m.lit*100);
  $("#moon").setAttribute("aria-label","Tonight's moon: "+m.name+", "+pct+"% lit");
  $("#moonLine").textContent = m.lit<.05 ? "No moon tonight, but I'm still looking up and thinking of you." : "Tonight's moon is "+m.name.toLowerCase()+". I'm looking at the same one.";
  $("#moonFact").textContent = m.name+" · "+pct+"% lit";
}

/* ---------- time of day ---------- */
function isLate(){ const h=new Date().getHours(); return h>=23 || h<4; }
function greeting(){ const h=new Date().getHours();
  return h<4 ? "It's late, I know" : h<12 ? "Good morning" : h<18 ? "Good afternoon" : h<23 ? "Good evening" : "It's late, I know"; }

/* ---------- moods ---------- */
function renderMoods(){
  $("#moods").replaceChildren(...MOODS.map(m=>{ const b=el("button","mood"); b.type="button"; b.dataset.id=m.id; b.setAttribute("aria-pressed", String(current===m.id)); b.setAttribute("aria-controls","view");
    const ic=el("div","ic"); ic.append(icon(m.icon, m.id==="miss"?"#F4A3B5":"#F6E7B8"));
    const t=el("div"); t.style.display="flex"; t.style.flexDirection="column"; t.append(el("b",null,m.label), el("span",null,m.sub));
    b.append(ic,t);
    if (m.id==="sleep" && isLate()) { const n=el("span","now","for tonight"); b.append(n); b.setAttribute("aria-label", m.label+", "+m.sub+", suggested for tonight"); }
    b.onclick=()=>openMood(m.id, true); return b; }));
}
let current=null;
function openMood(id, scroll){
  const m=MOODS.find(x=>x.id===id); if(!m) return; current=id; stopBreath();
  document.querySelectorAll(".mood").forEach(b=>b.setAttribute("aria-pressed", String(b.dataset.id===id)));
  const L=CFG.letters[id];
  $("#lWhen").textContent = "Open when " + ({miss:"you miss me",sad:"you're sad",sleep:"you can't sleep",stress:"you're stressed",motivate:"you need motivation",alone:"you feel alone",smile:"you need a smile"})[id];
  $("#lTitle").textContent=L.title; $("#lBody").textContent=L.body;
  $("#extras").replaceChildren(...m.extras.map(buildExtra).filter(Boolean));
  const v=$("#view"); show(v,true); const a=$("#letter"); a.classList.remove("show"); void a.offsetWidth; a.classList.add("show");
  try { history.replaceState(null,"","#"+id); } catch(e){}
  if (scroll) v.scrollIntoView({behavior: reduced()?"auto":"smooth", block:"start"});
}
$("#backBtn").onclick=()=>{ stopBreath(); show($("#view"),false); current=null; renderMoods(); try{ history.replaceState(null,"",location.pathname+location.search); }catch(e){} document.querySelector(".feel").scrollIntoView({behavior: reduced()?"auto":"smooth"}); };

/* ---------- comfort tools ---------- */
function card(title, ...kids){ const c=el("div","card"); c.append(el("h4",null,title), ...kids); return c; }
function cycler(list, label){
  const p=el("p","big"); let i=Math.floor(Math.random()*list.length); p.textContent=list[i];
  const b=el("button","btn moon",label); b.type="button"; b.style.alignSelf="flex-start";
  b.onclick=()=>{ i=(i+1+Math.floor(Math.random()*(list.length-1)))%list.length; p.textContent=list[i]; p.classList.remove("pop"); void p.offsetWidth; p.classList.add("pop"); };
  return [p,b];
}
let breathTimer=null;
function stopBreath(){ if(breathTimer){ clearTimeout(breathTimer); breathTimer=null; } }
function buildExtra(kind){
  if (kind==="breathe"){
    const wrap=el("div","breath"); const orb=el("div","orb"); const word=el("b",null,"Ready?"); orb.append(word);
    const tip=el("small",null,"In for 4, hold for 4, out for 6. Do it a few times.");
    const btn=el("button","btn rose","Breathe with me"); btn.type="button";
    let running=false;
    const steps=[["Breathe in",4000,true],["Hold",4000,true],["Breathe out",6000,false]];
    function run(i){ const [w,ms,inn]=steps[i%3]; word.textContent=w; orb.style.transitionDuration = inn ? "4s" : "6s"; orb.classList.toggle("in", inn); breathTimer=setTimeout(()=>run(i+1), ms); }
    btn.onclick=()=>{ running=!running; if(running){ btn.textContent="Stop"; run(0); } else { stopBreath(); btn.textContent="Breathe with me"; word.textContent="Ready?"; orb.classList.remove("in"); } };
    wrap.append(orb, btn, tip); return card("Breathe with me", wrap);
  }
  if (kind==="reasons"){ const [p,b]=cycler(CFG.reasons,"Another reason"); return card("Reasons you're amazing", p, b); }
  if (kind==="quotes"){ const [p,b]=cycler(CFG.motivation,"Another reminder"); return card("A reminder from me", p, b); }
  if (kind==="jokes"){ const [p,b]=cycler(CFG.jokes,"Another one"); return card("Something silly", p, b); }
  if (kind==="moon"){ const m=moonPhase(new Date()); return card("Look up tonight", el("p",null,"The moon is "+m.name.toLowerCase()+" tonight, "+Math.round(m.lit*100)+"% lit. Wherever you are, I can see it too.")); }
  if (kind==="tasks"){
    const done=new Set(local.get("tasks-done")||[]); const list=el("div","checks");
    const draw=()=>list.replaceChildren(...CFG.tasks.map((t,i)=>{ const lab=el("label","check"+(done.has(i)?" done":"")); const cb=el("input"); cb.type="checkbox"; cb.id="task"+i; cb.checked=done.has(i); cb.onchange=()=>{ cb.checked?done.add(i):done.delete(i); local.set("tasks-done",[...done]); draw(); }; lab.append(cb, el("span",null,t)); return lab; }));
    draw(); return card("Small steps", list);
  }
  if (kind==="help"){
    return card("If it's more than sad", el("p",null,"If it ever feels heavier than a bad day, please tell someone you trust near you, too. A friend, your family, anyone. You deserve support from people who can hug you in person. And I'll always be here as well."));
  }
  return null;
}

/* ---------- songs ---------- */
function songLinks(song){
  const q=encodeURIComponent([song.title, song.artist].filter(filled).join(" "));
  const sp=el("a","btn moon","Play on Spotify"); sp.href=song.spotify && /^https:\/\//.test(song.spotify) ? song.spotify : "https://open.spotify.com/search/"+q;
  const yt=el("a","btn ghost","YouTube"); yt.href=song.youtube && /^https:\/\//.test(song.youtube) ? song.youtube : "https://www.youtube.com/results?search_query="+q;
  [sp,yt].forEach(a=>{ a.target="_blank"; a.rel="noopener"; });
  return [sp,yt];
}
function songBlock(song, label, note, box){
  box.classList.add("songcard");
  const disc=el("div","disc"); disc.setAttribute("aria-hidden","true");
  const top=el("div"); top.style.cssText="display:flex;gap:14px;align-items:center";
  const t=el("div"); t.style.cssText="display:flex;flex-direction:column;min-width:0";
  t.append(el("small",null,label), el("b",null,song.title)); if (filled(song.artist)) t.append(el("small",null,song.artist));
  top.append(disc,t);
  const links=songLinks(song); links.forEach(a=>a.addEventListener("click",()=>box.classList.add("playing")));
  const row=el("div","row"); row.append(...links);
  box.replaceChildren(top, ...(note ? [el("p","songnote",note)] : []), row);
  return box;
}
let dq=0;
function dailyIndex(){ const d=new Date(); return Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()))/86400000) % CFG.motivation.length; }
function showDaily(first){ const list=CFG.motivation; if(!list.length) return; if (first) dq=dailyIndex(); $("#dailyQ").textContent=list[dq]; $("#qTag").textContent = first ? "Today's reminder" : "Another reminder"; }
$("#dailyNext").onclick=()=>{ const n=CFG.motivation.length; dq=(dq+1+Math.floor(Math.random()*(n-1)))%n; showDaily(false); const q=$("#dailyQ"); q.classList.remove("pop"); void q.offsetWidth; q.classList.add("pop"); };

/* ---------- render ---------- */
function renderAll(){
  document.querySelectorAll("[data-f]").forEach(n=>{ const k=n.dataset.f; n.textContent = k==="herName" ? her() : k==="yourName" ? me() : CFG[k]; });
  $("#greetTag").textContent = greeting() + " · a little place, just for you";
  renderMoods(); renderMoon(); showDaily(true);
  if (current) openMood(current, false);
}

/* ---------- boot ---------- */
renderAll();
const startHash=(location.hash||"").slice(1); if (MOODS.some(m=>m.id===startHash)) openMood(startHash, false);
addEventListener("hashchange",()=>{ const h=location.hash.slice(1); if (MOODS.some(m=>m.id===h) && h!==current) openMood(h, true); });
