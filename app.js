/* ======== INPUT BINDINGS & GATES ======== */
const bbTypeRadios = Array.from(document.querySelectorAll('input[name="bbType"]'));
const fttcSpeedRow = document.getElementById('fttcSpeedRow');
const fttcSpeedInput = document.getElementById('fttcSpeed');

const tvAsked = document.getElementById('tvAsked');
const tvBlock = document.getElementById('tvBlock');
tvAsked.addEventListener('change', ()=>{
  tvBlock.hidden = !tvAsked.checked;
  if(tvAsked.checked){ tvBlock.scrollIntoView({behavior:'smooth',block:'start'}); }
});

const mobileAsked = document.getElementById('mobileAsked');
const mobileBlock = document.getElementById('mobileBlock');
mobileAsked.addEventListener('change', ()=>{
  mobileBlock.hidden = !mobileAsked.checked;
  if(mobileAsked.checked){ mobileBlock.scrollIntoView({behavior:'smooth',block:'start'}); }
});

bbTypeRadios.forEach(r => r.addEventListener('change', ()=>{
  if(r.value==='FTTC' && r.checked) fttcSpeedRow.hidden = false;
  else if(r.checked) fttcSpeedRow.hidden = true;
}));

/* ======== DATA (brand-neutral) ======== */
const DATA = {
  objections: [
    { id:'expensive', label:'Too expensive', response:`People pick this because it actually works at busy times (evenings, match day, video calls) without drop‑offs.` },
    { id:'sky', label:'Sky is cheaper', response:`Once Netflix/apps are bundled, a single TV setup with the right add‑ons is often lower overall — and easier to use.` },
    { id:'mvno', label:'Budget SIMs are cheaper', response:`They’re great on price but can slow at busy times. Priority access plans keep speeds stable when everyone’s online.` },
    { id:'wifi', label:'Wi‑Fi is the issue, not speed', response:`Exactly — Premium Wi‑Fi/mesh removes blackspots so the speed you pay for actually reaches the rooms you use.` },
    { id:'think', label:'I’ll think about it', response:`Of course — so I help properly, is it the monthly price, the contract length, or the exact bundle you’re unsure about?` },
  ],

  products: {
    broadband: [
      { id:'MBB', name:'Mobile Broadband (4G/5G)', kind:'MBB',
        short:`Bypass old copper lines and get steadier everyday speeds.`,
        long:`If the line is the bottleneck (copper or FTTC < 30), mobile broadband sidesteps it entirely and feels more consistent.`,
        solves:['copper','fttc_under_30','far_cab'] },

      { id:'FF150', name:'Full Fibre 150', kind:'FF',
        short:`Removes evening slowdowns and boosts stability.`,
        long:`A solid upgrade if evenings dip — fibre avoids copper cross‑talk and keeps performance consistent at busy times.`,
        solves:['evening','base_upgrade'] },

      { id:'FF300', name:'Full Fibre 300', kind:'FF',
        short:`Lower latency and extra headroom for gaming.`,
        long:`Keeps gaming smooth and voice chat stable; a noticeable step up when several devices pull at once.`,
        solves:['gaming','evening'] },

      { id:'FF500', name:'Full Fibre 500', kind:'FF',
        short:`Handles multiple 4K streams and busy households.`,
        long:`Where 4K, gaming and work all happen at once — this keeps it all running without buffering.`,
        solves:['4k','wfh','evening'] },

      { id:'FF900', name:'Full Fibre 900', kind:'FF',
        short:`Loads of headroom for smart homes and uploads.`,
        long:`For 10+ devices, cameras, backups or large transfers — keeps everything quick without spikes.`,
        solves:['smarthome','uploads','wfh'] },

      { id:'PREMIUM_WIFI', name:'Premium Wi‑Fi / Mesh', kind:'ADDON',
        short:`Removes blackspots so speed reaches every room.`,
        long:`If coverage is the real issue, mesh/extenders fix in‑home problems so the connection feels fast everywhere.`,
        solves:['blackspots'] },
    ],

    tv: [
      { id:'TV_NETFLIX', name:'Entertainment + Netflix',
        short:`Bundle Netflix and keep everything in one place.`,
        long:`If you’re already paying for Netflix, this tidies it into one bill and one box — simple and often lower overall.`,
        solves:['netflix','apps','allinone'] },

      { id:'TV_NOW_ENT', name:'NOW Entertainment (via TV box)',
        short:`Sky‑style channels without the Sky price.`,
        long:`Bring key channels into one box via NOW — fewer remotes and typically better value than running two systems.`,
        solves:['sky','now','apps'] },

      { id:'TV_SPORTS', name:'Sports Pack',
        short:`Sport in one place: football, European nights, UFC and more.`,
        long:`If sport matters, keep it centralised so you’re not juggling multiple logins on match day.`,
        solves:['sports'] },

      { id:'TV_CINEMA', name:'Cinema Pack',
        short:`Thousands of films in one app on your box.`,
        long:`For movie fans, it’s the easiest way to keep a big catalogue at your fingertips.`,
        solves:['movies'] },

      { id:'TV_CORE', name:'Core TV + Apps',
        short:`All the main apps with one remote.`,
        long:`If you mostly stream, a simple app‑first setup keeps things tidy and easy.`,
        solves:['apps'] },
    ],

    mobile: [
      { id:'ONE', name:'One Plan (Unlimited)',
        short:`Unlimited on a priority network — often simpler & better value.`,
        long:`If you’re paying separately elsewhere, one plan often cuts the total while improving indoor reliability with Wi‑Fi calling.`,
        solves:['high_bill','one'] },

      { id:'ALL_ROUNDER', name:'All‑Rounder SIM',
        short:`Stays fast at busy times vs budget MVNOs.`,
        long:`If you’re on a low‑cost MVNO, moving to a priority plan stops the slowdowns when everyone’s online.`,
        solves:['mvno'] },

      { id:'WIFI_SIM', name:'Wi‑Fi Calling SIM',
        short:`Fixes indoor signal so calls/texts just work.`,
        long:`Wi‑Fi calling + stronger in‑building coverage end the “can you hear me?” moments indoors.`,
        solves:['indoor'] },

      { id:'UPGRADE', name:'Handset Upgrade',
        short:`New battery, new cameras — same line item.`,
        long:`If you’re out of contract or the phone’s tired, upgrading keeps costs tidy and improves daily experience.`,
        solves:['ooc'] },

      { id:'FAMILY', name:'Family — Add Lines',
        short:`Keep everyone on one account with shared benefits.`,
        long:`Add‑line discounts + simple management in one place.`,
        solves:['family'] },
    ],

    tablets: [
      { id:'TAB_SAMSUNG_A9', name:'Android Tab — Samsung A9',
        short:`Ideal for Android homes — smooth & reliable.`,
        long:`Great screen and fits right in with Android phones at home — perfect for streaming and browsing.`,
        solves:['android','streams','kids'] },

      { id:'TAB_HONOR_X8A', name:'Honor X8a',
        short:`Budget‑friendly streaming without draining your phone.`,
        long:`Offload streaming from the phone — better battery life and a more comfortable watch.`,
        solves:['streams'] },

      { id:'TAB_LENOVO_LUNA', name:'Lenovo Luna',
        short:`Keep the laptop free for work; stream on this instead.`,
        long:`If the laptop doubles as a TV, this separates work and downtime nicely.`,
        solves:['laptop'] },

      { id:'TAB_IPAD', name:'iPad (Entry)',
        short:`Best long‑term option for Apple households.`,
        long:`Seamless with iPhone/Apple TV, holds value, and just works.`,
        solves:['apple','kids'] },
    ]
  }
};

/* ======== HELPERS ======== */
function pick(group,id){ return DATA.products[group].find(p=>p.id===id); }
function getCheckedTriggers(){
  const boxes = Array.from(document.querySelectorAll('input[type="checkbox"][data-trigger]'));
  return boxes.reduce((acc,el)=>{ acc[el.dataset.trigger]=el.checked; return acc; },{});
}

/* ======== SCORING (Option 3: scoring + overrides) ======== */
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

  if(triggers.tv_netflix) add('TV_NETFLIX', 3, ['Already paying Netflix']);
  if(triggers.tv_sky)     add('TV_NOW_ENT', 3, ['Pays Sky — NOW style']);
  if(triggers.tv_now)     add('TV_NOW_ENT', 2, ['Already uses NOW']);
  if(triggers.tv_sports)  add('TV_SPORTS', 3, ['Sports fan']);
  if(triggers.tv_movies)  add('TV_CINEMA', 2, ['Movies']);
  if(triggers.tv_apps)    add('TV_CORE', 2, ['App‑first viewing']);
  if(triggers.tv_allinone)add('TV_NETFLIX', 1, ['All‑in‑one preference']);

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

  if(triggers.m_high_bill || triggers.m_one) add('ONE', 3, ['High bill / wants one plan']);
  if(triggers.m_mvno)  add('ALL_ROUNDER', 3, ['Budget MVNO — peak-time slowdowns']);
  if(triggers.m_indoor) add('WIFI_SIM', 3, ['Poor indoor signal → Wi‑Fi calling']);
  if(triggers.m_ooc)    add('UPGRADE', 2, ['Out of contract / tired device']);
  if(triggers.m_family) add('FAMILY', 2, ['Family SIMs']);
  if(triggers.m_android) add('ALL_ROUNDER', 1, ['Android household']);
  if(triggers.m_apple)   add('WIFI_SIM', 1, ['Apple household']);
  if(triggers.m_lowdata) add('ALL_ROUNDER', 1, ['Low data allowance']);

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

/* ======== RENDERING ======== */
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
  bbTypeRadios.forEach(r=> r.checked=false);
  fttcSpeedInput.value=''; fttcSpeedRow.hidden=true;
  tvAsked.checked=false; tvBlock.hidden=true;
  mobileAsked.checked=false; mobileBlock.hidden=true;
  Array.from(document.querySelectorAll('input[type="checkbox"][data-trigger]')).forEach(c=> c.checked=false);
  [bbResults,tvResults,mobileResults,tabletResults].forEach(node=> node.innerHTML='');
  tvResults.classList.add('empty'); tvResults.textContent='Ask about TV to show recommendations.';
  mobileResults.classList.add('empty'); mobileResults.textContent='Ask about Mobile to show recommendations.';
  tabletResults.classList.add('empty'); tabletResults.textContent='Tick a tablet trigger to see suggestions.';
  finalScript.value=''; objectionSelect.value=''; objectionResponse.textContent='';
});

/* evaluate with hard gates */
btnEval.addEventListener('click', ()=>{
  const bbType = (bbTypeRadios.find(r=>r.checked)?.value) || null;
  if(!bbType){ alert('Step 1 — Please select the Broadband connection type.'); return; }

  if(!tvAsked.checked){ alert('Step 2 — You must ask about TV before we can recommend TV bundles.'); }
  if(!mobileAsked.checked){ alert('Step 3 — You must ask about Mobile before we can recommend mobile plans.'); }

  const fttcSpeed = (bbType==='FTTC') ? (fttcSpeedInput.value||null) : null;
  const triggers = getCheckedTriggers();

  const ctx = { bbType, fttcSpeed, tvAsked: tvAsked.checked, mobileAsked: mobileAsked.checked, triggers };
  const bb = scoreBroadband(ctx).slice(0,3);
  const tv = scoreTV(ctx).slice(0,3);
  const m  = scoreMobile(ctx).slice(0,3);
  const tb = scoreTablets(ctx).slice(0,3);

  renderList(bbResults, bb, 'Broadband');
  renderConditional(tvResults, tv, tvAsked.checked, 'TV');
  renderConditional(mobileResults, m, mobileAsked.checked, 'Mobile');
  renderTablets(tb);

  finalScript.value = buildFinalScript({bb, tv: tvAsked.checked? tv:[], mobile: mobileAsked.checked? m:[], tablets:tb});
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
  const {product, why} = r;
  return `
    <div class="result">
      <div class="title">${product.name} <span class="badge">${rank}</span></div>
      <div class="meta">Why: ${why.join(' · ')}</div>
      <div class="pitch-short">${product.short}</div>
      <details><summary>More detail</summary><div class="pitch-long">${product.long}</div></details>
    </div>
  `;
}

/* final script */
function buildFinalScript({bb,tv,mobile,tablets}){
  const lines = [];
  if(bb.length){ lines.push(`Broadband — ${bb[0].product.name}: ${bb[0].product.short}`); }
  if(tv.length){ lines.push(`TV — ${tv[0].product.name}: ${tv[0].product.short}`); }
  if(mobile.length){ lines.push(`Mobile — ${mobile[0].product.name}: ${mobile[0].product.short}`); }
  if(tablets.length){ lines.push(`Tablet — ${tablets[0].product.name}: ${tablets[0].product.short}`); }

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
