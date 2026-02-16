/* =============== THEME =============== */
const body = document.documentElement;
const btnEE = document.getElementById('btnEE');
const btnBT = document.getElementById('btnBT');
btnEE?.addEventListener('click', () => setTheme('ee'));
btnBT?.addEventListener('click', () => setTheme('bt'));

function setTheme(theme){
  body.classList.toggle('theme-ee', theme === 'ee');
  body.classList.toggle('theme-bt', theme === 'bt');
  btnEE.classList.toggle('active', theme === 'ee');
  btnBT.classList.toggle('active', theme === 'bt');
}
setTheme('ee');

/* =============== INPUTS =============== */
const bbTypeRadios = Array.from(document.querySelectorAll('input[name="bbType"]'));
const fttcSpeedRow = document.getElementById('fttcSpeedRow');
const fttcSpeedInput = document.getElementById('fttcSpeed');

const tvAsked = document.getElementById('tvAsked');
const tvBlock = document.getElementById('tvBlock');
tvAsked.addEventListener('change', ()=> tvBlock.hidden = !tvAsked.checked);

const mobileAsked = document.getElementById('mobileAsked');
const mobileBlock = document.getElementById('mobileBlock');
mobileAsked.addEventListener('change', ()=> mobileBlock.hidden = !mobileAsked.checked);

bbTypeRadios.forEach(r => r.addEventListener('change', ()=>{
  fttcSpeedRow.hidden = r.value !== 'FTTC' || !r.checked;
}));

/* =============== DATA CATALOGUE (inline) =============== */
/* You can later externalise this into data.json */
const DATA = {
  objections: [
    { id:'expensive', label:'Too expensive', response:`People don’t pick this to spend more — they pick it because it actually works at busy times (evenings, match day, video calls) without drop‑offs.` },
    { id:'sky', label:'Sky is cheaper', response:`Once Netflix/apps are bundled, EE TV + NOW often comes out lower overall — and it’s all in one place with one remote.` },
    { id:'mvno', label:'Lebara/GiffGaff is cheaper', response:`They’re great on price but can slow at busy times. EE keeps priority speeds so your data actually works when everyone’s online.` },
    { id:'wifi', label:'Wi‑Fi is the issue, not speed', response:`Exactly — which is why Premium Wi‑Fi/mesh removes the blackspots so the speed you pay for actually reaches the rooms you use.` },
    { id:'think', label:'I’ll think about it', response:`Of course — so I help properly, is it the monthly price, the contract length, or the exact bundle you’re unsure about?` },
  ],

  products: {
    broadband: [
      { id:'MBB', name:'Mobile Broadband (4G/5G)', kind:'MBB',
        short:`Bypass old copper lines and get steadier speeds.`,
        long:`If the line is the bottleneck (copper or FTTC < 30), mobile broadband sidesteps it entirely. It’ll feel faster and more consistent day‑to‑day.`,
        solves:['copper','fttc_under_30','far_cab'] },

      { id:'FF150', name:'Full Fibre 150', kind:'FF',
        short:`Removes evening slowdowns and boosts stability.`,
        long:`A solid upgrade if evenings dip. Fibre avoids copper cross‑talk and gives you consistent performance at busy times.`,
        solves:['evening','base_upgrade'] },

      { id:'FF300', name:'Full Fibre 300', kind:'FF',
        short:`Lower latency and extra headroom for gaming.`,
        long:`Keeps gaming smooth and voice chat stable. It’s a noticeable step up if you have a few devices pulling at once.`,
        solves:['gaming','evening'] },

      { id:'FF500', name:'Full Fibre 500', kind:'FF',
        short:`Handles multiple 4K streams and busy households.`,
        long:`Great for households where 4K streaming, gaming and work all happen at once — without buffering.`,
        solves:['4k','wfh','evening'] },

      { id:'FF900', name:'Full Fibre 900', kind:'FF',
        short:`Loads of headroom for smart homes and uploads.`,
        long:`If you’ve got 10+ devices, cameras, backups or large file transfers, 900 keeps everything quick without spikes.`,
        solves:['smarthome','uploads','wfh'] },

      { id:'PREMIUM_WIFI', name:'Premium Wi‑Fi / Mesh', kind:'ADDON',
        short:`Removes blackspots so speed reaches every room.`,
        long:`If coverage is the real issue, mesh/extenders fix the in‑home problem so your connection feels fast everywhere.`,
        solves:['blackspots'] },
    ],

    tv: [
      { id:'EE_NETFLIX', name:'EE TV (Entertainment + Netflix)', 
        short:`Bundle Netflix and keep everything in one place.`,
        long:`If you’re already paying for Netflix, this tidies it into one bill and one box — simple and often lower overall.`,
        solves:['netflix','apps','allinone'] },

      { id:'EE_NOW_ENT', name:'EE TV + NOW Entertainment', 
        short:`Sky channels without the Sky price.`,
        long:`Bring Sky content into EE TV via NOW — fewer remotes, and often cheaper than Sky direct.`,
        solves:['sky','now','apps'] },

      { id:'EE_TNT', name:'EE TV + TNT Sports', 
        short:`Sport in one place: PL, UCL, UFC and more.`,
        long:`If sport matters, keep it centralised so you’re not juggling multiple logins on match day.`,
        solves:['sports'] },

      { id:'NOW_CIN', name:'NOW Cinema', 
        short:`Thousands of films in one app on your box.`,
        long:`For movie fans, it’s the easiest way to keep a big catalogue at your fingertips.`,
        solves:['movies'] },

      { id:'EE_CORE', name:'EE TV (Core Apps)', 
        short:`All the main apps with one remote.`,
        long:`If you mostly stream, a simple app-first setup keeps things tidy and easy.`,
        solves:['apps'] },
    ],

    mobile: [
      { id:'EE_ONE', name:'EE One SIM (Unlimited)', 
        short:`Unlimited on the UK’s top network — usually simpler & better value.`,
        long:`If you’re paying separately elsewhere, One plan often cuts the total while fixing indoor reliability with Wi‑Fi calling.`,
        solves:['high_bill','one'] },

      { id:'EE_AR', name:'EE All‑Rounder SIM', 
        short:`Priority speeds vs MVNOs — stays fast at busy times.`,
        long:`If you’re on Lebara/GiffGaff/Smarty, moving to EE stops the slowdowns when everyone’s online.`,
        solves:['mvno'] },

      { id:'EE_WIFI', name:'EE SIM (Wi‑Fi Calling)', 
        short:`Fixes indoor signal so calls/texts just work.`,
        long:`Wi‑Fi calling + stronger in‑building coverage end the “can you hear me?” moments indoors.`,
        solves:['indoor'] },

      { id:'EE_UPG', name:'EE Handset Upgrade', 
        short:`New battery, new cameras — same line item.`,
        long:`If you’re out of contract or the phone’s tired, upgrading keeps costs tidy and improves daily experience.`,
        solves:['ooc'] },

      { id:'EE_FAM', name:'EE Family — Add Lines', 
        short:`Keep everyone on one account with shared benefits.`,
        long:`Add‑line discounts + simple management in one place.`,
        solves:['family'] },
    ],

    tablets: [
      { id:'TAB_SAMSUNG_A9', name:'Samsung Galaxy Tab A9', 
        short:`Ideal for Android homes — smooth & reliable.`,
        long:`Great screen and fits right in with Android phones at home — perfect for streaming and browsing.`,
        solves:['android','streams','kids'] },

      { id:'TAB_HONOR_X8A', name:'Honor X8a Tablet', 
        short:`Budget‑friendly streaming without draining your phone.`,
        long:`Offload streaming from the phone — better battery life and a more comfortable watch.`,
        solves:['streams'] },

      { id:'TAB_LENOVO_LUNA', name:'Lenovo Luna Grey Tab', 
        short:`Keep the laptop free for work; stream on this instead.`,
        long:`If the laptop doubles as a TV, this separates work and downtime nicely.`,
        solves:['laptop'] },

      { id:'TAB_IPAD', name:'iPad (entry)', 
        short:`Best long‑term option for Apple households.`,
        long:`Seamless with iPhone/Apple TV, holds value, and just works.`,
        solves:['apple','kids'] },
    ]
  }
};

/* =============== SCORING + OVERRIDES =============== */
/* Option 3: scoring + disqualification overrides */
function scoreBroadband(ctx){
  const { bbType, fttcSpeed, triggers } = ctx;
  const out = [];

  // Overrides
  const forceMBB = (bbType === 'COPPER') || (bbType === 'FTTC' && fttcSpeed && Number(fttcSpeed) < 30);
  if(forceMBB){
    const mbb = pick('broadband','MBB');
    if(mbb) out.push({ product: mbb, score: 999, why: ['Copper/FTTC<30 → MBB only'] });
    return out;
  }

  // Scoring
  const add = (id, pts, why=[]) => {
    const p = pick('broadband', id); if(!p) return;
    const hit = out.find(o=>o.product.id===id);
    if(hit){ hit.score += pts; hit.why.push(...why); }
    else out.push({ product:p, score:pts, why:[...why] });
  };

  if(triggers.bb_4k)          add('FF500', 3, ['Multiple 4K streams']);
  if(triggers.bb_gaming)       add('FF300', 2, ['Gaming stability']);
  if(triggers.bb_wfh)          add('FF500', 2, ['WFH / calls stability']);
  if(triggers.bb_uploads)      add('FF900', 2, ['Heavy uploads/backups']);
  if(triggers.bb_smarthome)    add('FF900', 3, ['Many smart devices']);
  if(triggers.bb_slow_evenings)add('FF150', 2, ['Peak-time slowdowns']);
  if(triggers.bb_far_cab)      add('MBB', 2, ['Far from cabinet → line limits']);
  if(triggers.bb_blackspots)   add('PREMIUM_WIFI', 3, ['Wi‑Fi blackspots']);

  // Gentle base nudges (if nothing else fired)
  if(out.length===0){
    if(bbType==='FTTP') add('FF300', 1, ['General uplift on Full Fibre']);
    else add('FF150', 1, ['General uplift']);
  }

  return out.sort((a,b)=>b.score-a.score);
}

function scoreTV(ctx){
  const { tvAsked, triggers } = ctx;
  const out = [];
  if(!tvAsked) return out;

  const add = (id, pts, why=[]) => {
    const p = pick('tv', id); if(!p) return;
    const hit = out.find(o=>o.product.id===id);
    if(hit){ hit.score += pts; hit.why.push(...why); }
    else out.push({ product:p, score:pts, why:[...why] });
  };

  if(triggers.tv_netflix) add('EE_NETFLIX', 3, ['Already paying Netflix']);
  if(triggers.tv_sky)     add('EE_NOW_ENT', 3, ['Pays Sky — NOW path']);
  if(triggers.tv_now)     add('EE_NOW_ENT', 2, ['Already uses NOW']);
  if(triggers.tv_sports)  add('EE_TNT', 3, ['Sports fan']);
  if(triggers.tv_movies)  add('NOW_CIN', 2, ['Movies']);
  if(triggers.tv_apps)    add('EE_CORE', 2, ['App‑first viewing']);
  if(triggers.tv_allinone)add('EE_NETFLIX', 1, ['All‑in‑one preference']);

  return out.sort((a,b)=>b.score-a.score);
}

function scoreMobile(ctx){
  const { mobileAsked, triggers } = ctx;
  const out = [];
  if(!mobileAsked) return out;

  const add = (id, pts, why=[]) => {
    const p = pick('mobile', id); if(!p) return;
    const hit = out.find(o=>o.product.id===id);
    if(hit){ hit.score += pts; hit.why.push(...why); }
    else out.push({ product:p, score:pts, why:[...why] });
  };

  if(triggers.m_high_bill || triggers.m_one) add('EE_ONE', 3, ['High bill / wants one plan']);
  if(triggers.m_mvno)  add('EE_AR', 3, ['On MVNO — peak-time slowdowns']);
  if(triggers.m_indoor) add('EE_WIFI', 3, ['Poor indoor signal → Wi‑Fi calling']);
  if(triggers.m_ooc)    add('EE_UPG', 2, ['Out of contract / tired device']);
  if(triggers.m_family) add('EE_FAM', 2, ['Family SIMs']);
  if(triggers.m_android) add('EE_AR', 1, ['Android household']);
  if(triggers.m_apple)   add('EE_WIFI', 1, ['Apple household']);
  if(triggers.m_lowdata) add('EE_AR', 1, ['Low data allowance']);

  return out.sort((a,b)=>b.score-a.score);
}

function scoreTablets(ctx){
  const { triggers } = ctx;
  const anyTablet = ['t_streams_on_phone','t_uses_laptop','t_kids_screen','t_android_home','t_apple_home']
    .some(k => !!triggers[k]);
  const out = [];
  if(!anyTablet) return out;

  const add = (id, pts, why=[]) => {
    const p = pick('tablets', id); if(!p) return;
    const hit = out.find(o=>o.product.id===id);
    if(hit){ hit.score += pts; hit.why.push(...why); }
    else out.push({ product:p, score:pts, why:[...why] });
  };

  if(triggers.t_android_home) add('TAB_SAMSUNG_A9', 3, ['Android household']);
  if(triggers.t_streams_on_phone) add('TAB_HONOR_X8A', 2, ['Streams on phone']);
  if(triggers.t_uses_laptop) add('TAB_LENOVO_LUNA', 2, ['Uses laptop for TV']);
  if(triggers.t_kids_screen) { add('TAB_SAMSUNG_A9',1,['Kids sharing']); add('TAB_IPAD',1,['Kids sharing']); }
  if(triggers.t_apple_home) add('TAB_IPAD', 3, ['Apple household']);

  return out.sort((a,b)=>b.score-a.score);
}

/* helpers */
function pick(group,id){ return DATA.products[group].find(p=>p.id===id); }
function getCheckedTriggers(){
  const boxes = Array.from(document.querySelectorAll('input[type="checkbox"][data-trigger]'));
  return boxes.reduce((acc,el)=>{ acc[el.dataset.trigger]=el.checked; return acc; },{});
}

/* =============== EVALUATION & RENDERING =============== */
const btnEval = document.getElementById('btnEvaluate');
const btnReset = document.getElementById('btnReset');
const bbResults = document.getElementById('bbResults');
const tvResults = document.getElementById('tvResults');
const mobileResults = document.getElementById('mobileResults');
const tabletResults = document.getElementById('tabletResults');
const finalScript = document.getElementById('finalScript');
const btnCopy = document.getElementById('btnCopy');

const objectionSelect = document.getElementById('objectionSelect');
const objectionResponse = document.getElementById('objectionResponse');

/* load objections */
(function initObjections(){
  objectionSelect.innerHTML = `<option value="">Select an objection…</option>` +
    DATA.objections.map(o=>`<option value="${o.id}">${o.label}</option>`).join('');
  objectionSelect.addEventListener('change', ()=>{
    const obj = DATA.objections.find(o=>o.id===objectionSelect.value);
    objectionResponse.textContent = obj ? obj.response : '';
  });
})();

/* reset */
btnReset.addEventListener('click', ()=>{
  // radios
  bbTypeRadios.forEach(r=> r.checked=false);
  fttcSpeedInput.value='';
  fttcSpeedRow.hidden=true;
  // asked gates
  tvAsked.checked=false; tvBlock.hidden=true;
  mobileAsked.checked=false; mobileBlock.hidden=true;
  // checkboxes
  Array.from(document.querySelectorAll('input[type="checkbox"][data-trigger]'))
    .forEach(c=> c.checked=false);
  // outputs
  [bbResults,tvResults,mobileResults,tabletResults].forEach(node=> node.innerHTML='');
  tvResults.classList.add('empty'); tvResults.textContent='Ask about TV to show recommendations.';
  mobileResults.classList.add('empty'); mobileResults.textContent='Ask about Mobile to show recommendations.';
  tabletResults.classList.add('empty'); tabletResults.textContent='Tick a tablet trigger to see suggestions.';
  finalScript.value='';
  objectionSelect.value=''; objectionResponse.textContent='';
});

/* evaluate */
btnEval.addEventListener('click', ()=>{
  const bbType = (bbTypeRadios.find(r=>r.checked)?.value) || null;
  const fttcSpeed = (bbType==='FTTC') ? (fttcSpeedInput.value||null) : null;
  const triggers = getCheckedTriggers();

  const ctx = {
    bbType,
    fttcSpeed,
    tvAsked: tvAsked.checked,
    mobileAsked: mobileAsked.checked,
    triggers
  };

  /* score each category */
  const bb = scoreBroadband(ctx).slice(0,3);
  const tv = scoreTV(ctx).slice(0,3);
  const m  = scoreMobile(ctx).slice(0,3);
  const tb = scoreTablets(ctx).slice(0,3);

  renderList(bbResults, bb, 'Broadband');
  renderConditional(tvResults, tv, tvAsked.checked, 'TV');
  renderConditional(mobileResults, m, mobileAsked.checked, 'Mobile');
  renderTablets(tb);

  finalScript.value = buildFinalScript({bb,tv:m.length? tv:[], mobile:m, tablets:tb});
});

/* render helpers */
function renderList(node, list, label){
  node.classList.remove('empty'); node.textContent='';
  if(!list.length){ node.classList.add('empty'); node.textContent=`No ${label} recommendations based on current inputs.`; return; }
  list.forEach((r,idx)=>{
    const rank = idx===0?'Best match':(idx===1?'Strong alternative':'Backup option');
    node.insertAdjacentHTML('beforeend', cardHTML(r, rank));
  });
}
function renderConditional(node, list, gateOn, label){
  node.classList.remove('empty'); node.textContent='';
  if(!gateOn){ node.classList.add('empty'); node.textContent=`Ask about ${label} to show recommendations.`; return; }
  renderList(node, list, label);
}
function renderTablets(list){
  tabletResults.classList.remove('empty'); tabletResults.textContent='';
  if(!list.length){ tabletResults.classList.add('empty'); tabletResults.textContent='Tick a tablet trigger to see suggestions.'; return; }
  list.forEach((r,idx)=>{
    const rank = idx===0?'Best fit':(idx===1?'Alternative':'Backup');
    tabletResults.insertAdjacentHTML('beforeend', cardHTML(r, rank));
  });
}
function cardHTML(r, rank){
  const {product, why, score} = r;
  return `
    <div class="result">
      <div class="title">${product.name} <span class="badge">${rank}</span></div>
      <div class="meta">Why: ${why.join(' · ')}</div>
      <div class="pitch-short">${product.short}</div>
      <details>
        <summary>More detail</summary>
        <div class="pitch-long">${product.long}</div>
      </details>
    </div>
  `;
}

/* build final script (conversational/hybrid) */
function buildFinalScript({bb,tv,mobile,tablets}){
  const lines = [];
  if(bb.length){
    const best = bb[0].product;
    lines.push(`Broadband — ${best.name}: ${best.short}`);
  }
  if(tv.length){
    const best = tv[0].product;
    lines.push(`TV — ${best.name}: ${best.short}`);
  }
  if(mobile.length){
    const best = mobile[0].product;
    lines.push(`Mobile — ${best.name}: ${best.short}`);
  }
  if(tablets.length){
    const best = tablets[0].product;
    lines.push(`Tablet — ${best.name}: ${best.short}`);
  }

  const alt = [];
  if(bb[1]) alt.push(`BB alt: ${bb[1].product.name}`);
  if(tv[1]) alt.push(`TV alt: ${tv[1].product.name}`);
  if(mobile[1]) alt.push(`Mobile alt: ${mobile[1].product.name}`);
  if(tablets[1]) alt.push(`Tablet alt: ${tablets[1].product.name}`);

  const backup = [];
  if(bb[2]) backup.push(`BB backup: ${bb[2].product.name}`);
  if(tv[2]) backup.push(`TV backup: ${tv[2].product.name}`);
  if(mobile[2]) backup.push(`Mobile backup: ${mobile[2].product.name}`);
  if(tablets[2]) backup.push(`Tablet backup: ${tablets[2].product.name}`);

  const intro = `Based on what you’ve told me, here’s what actually fits how you use things:`;
  const core = lines.map(l=>`• ${l}`).join('\n');
  const alts = alt.length ? `\n\nIf you want to compare alternatives:\n${alt.map(a=>`• ${a}`).join('\n')}` : '';
  const backs = backup.length ? `\n\nIf you want something lighter as a backup:\n${backup.map(a=>`• ${a}`).join('\n')}` : '';
  return `${intro}\n\n${core}${alts}${backs}`;
}

/* copy */
btnCopy.addEventListener('click', ()=>{
  finalScript.select();
  document.execCommand('copy');
  btnCopy.textContent = 'Copied!';
  setTimeout(()=> btnCopy.textContent = 'Copy Final Script', 1500);
});