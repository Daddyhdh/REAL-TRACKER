
const collectionKey='realOtdCollectionV2';
const claimStateKey='realOtdClaimStateV1';
let COLLECTION=[];
let DATA={daily:[],cards:[],totals:{raw:0,collectible:0,lost:0}};
let claimState=JSON.parse(localStorage.getItem(claimStateKey)||'{}');
let activeScreen='dashboard';

const rarityMultipliers={
 'Rare':4,'Epic':10,'Legendary 1':25,'Legendary 2':28,'Legendary 3':32,'Legendary 4':36,'Legendary 5':40,
 'Mystic 1':75,'Mystic 2':79,'Mystic 3':83,'Mystic 4':87,'Mystic 5':91
};
const sportColors={NFL:'#4ed7ff',NBA:'#ff9b56',WNBA:'#ff6fab',MLB:'#37d996',FC:'#ffc857',Golf:'#8fa6ff'};
const fmt=n=>Number(n||0).toLocaleString();
const dateObj=s=>new Date(s+'T12:00:00');
const monthName=s=>dateObj(s).toLocaleDateString(undefined,{month:'long',year:'numeric'});
const shortDate=s=>dateObj(s).toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});
const monthDay=s=>({day:dateObj(s).toLocaleDateString(undefined,{day:'numeric'}),month:dateObj(s).toLocaleDateString(undefined,{month:'short'}).toUpperCase()});

function saveCollection(){localStorage.setItem(collectionKey,JSON.stringify(COLLECTION))}
function recompute(){
 const rows=[];
 COLLECTION.filter(c=>c.active!==false).forEach(c=>{
  (c.claims||[]).forEach(x=>rows.push({date:x.date,sport:c.sport,player:c.player,rarity:c.rarity,rax:Math.round(Number(x.base)*Number(c.multiplier))}));
 });
 const groups={};
 rows.forEach(r=>{const k=r.date+'|'+r.sport;(groups[k]??=[]).push(r)});
 Object.values(groups).forEach(g=>g.sort((a,b)=>b.rax-a.rax||a.player.localeCompare(b.player)).forEach((r,i)=>r.selected=i<2));
 const byDate={};
 rows.filter(r=>r.selected).forEach(r=>(byDate[r.date]??=[]).push(r));
 const daily=Object.keys(byDate).sort().map(date=>({date,total:byDate[date].reduce((s,x)=>s+x.rax,0),claims:byDate[date].sort((a,b)=>a.sport.localeCompare(b.sport)||b.rax-a.rax)}));
 const cards=COLLECTION.filter(c=>c.active!==false).map(c=>{
  const raw=(c.claims||[]).reduce((s,x)=>s+Math.round(Number(x.base)*Number(c.multiplier)),0);
  const collectible=rows.filter(r=>r.player===c.player&&r.selected).reduce((s,x)=>s+x.rax,0);
  return {...c,raw,collectible,lost:raw-collectible};
 }).sort((a,b)=>b.collectible-a.collectible);
 DATA={daily,cards,totals:{raw:cards.reduce((s,c)=>s+c.raw,0),collectible:cards.reduce((s,c)=>s+c.collectible,0),lost:cards.reduce((s,c)=>s+c.lost,0)}};
}
function claimedTotal(){return DATA.daily.reduce((s,d)=>s+(claimState[d.date]==='claimed'?d.total:0),0)}
function missedTotal(){return DATA.daily.reduce((s,d)=>s+(claimState[d.date]==='missed'?d.total:0),0)}
function claimedDays(){return DATA.daily.filter(d=>claimState[d.date]==='claimed').length}
function todayClaim(){const k=new Date().toISOString().slice(0,10),d=DATA.daily.find(x=>x.date===k);return d&&claimState[k]==='claimed'?d.total:0}
function nextUnclaimed(){return DATA.daily.find(d=>claimState[d.date]!=='claimed')||DATA.daily[0]}
function sportTotals(claimedOnly=false){const t={};DATA.daily.forEach(d=>{if(claimedOnly&&claimState[d.date]!=='claimed')return;d.claims.forEach(c=>t[c.sport]=(t[c.sport]||0)+c.rax)});return t}

function renderDashboard(){
 const claimed=claimedTotal(),total=DATA.totals.collectible,pct=total?claimed/total:0;
 claimedAmount.textContent=fmt(claimed);remainingAmount.textContent=fmt(total-claimed);progressFill.style.width=pct*100+'%';progressPercent.textContent=Math.round(pct*100)+'%';
 todayAmount.textContent=fmt(todayClaim());document.querySelector('.stat-card:nth-child(2)').style.display='none';claimedDays.textContent=claimedDays();totalOtd.textContent=fmt(total);
 const next=nextUnclaimed();nextClaimCard.innerHTML=next?claimCardHtml(next,true):'<div class="next-card">All claims completed.</div>';
 topEarners.innerHTML=DATA.cards.slice(0,6).map((c,i)=>`<article class="earner-card"><div class="rank-badge">${i+1}</div><div class="earner-name">${c.player}</div><div class="earner-meta">${c.sport} • ${c.rarity}</div><div class="earner-value">${fmt(c.collectible)}</div></article>`).join('');
 const totals=sportTotals(false),max=Math.max(1,...Object.values(totals));sportBreakdown.innerHTML=Object.entries(totals).map(([s,v])=>`<div class="sport-item"><div class="sport-head"><span>${s}</span><span>${fmt(v)}</span></div><div class="sport-bar"><div class="sport-fill" style="width:${v/max*100}%;background:${sportColors[s]}"></div></div></div>`).join('');
}
function claimCardHtml(d,compact=false){
 const md=monthDay(d.date),status=claimState[d.date];
 const rows=d.claims.map(c=>`<div class="claim-row"><div class="player-wrap"><span class="sport-dot" style="color:${sportColors[c.sport]};background:${sportColors[c.sport]}"></span><div><div class="player-name">${c.player}</div><div class="player-sport">${c.sport} • ${c.rarity}</div></div></div><div class="claim-rax">${fmt(c.rax)}</div></div>`).join('');
 return `<article class="${compact?'next-card':'claim-day'}"><div class="claim-header"><div class="date-badge"><div class="date-square"><strong>${md.day}</strong><small>${md.month}</small></div><div><div class="day-title">${shortDate(d.date)}</div><div class="day-sub">${d.claims.length} optimized claims</div></div></div><div class="total-pill">${fmt(d.total)}</div></div><div class="claim-list">${rows}</div><button class="claim-button ${status==='claimed'?'claimed':''}" data-claim-date="${d.date}">${status==='claimed'?'✓ Claimed':'Claim all for '+fmt(d.total)}</button></article>`;
}
function renderClaims(){
 const q=claimSearch.value.trim().toLowerCase(),sport=sportFilter.value;let html='',m='';
 DATA.daily.forEach(d=>{if(!(sport==='all'||d.claims.some(c=>c.sport===sport)))return;if(q&&!d.claims.some(c=>c.player.toLowerCase().includes(q))&&!shortDate(d.date).toLowerCase().includes(q))return;const nm=monthName(d.date);if(nm!==m){m=nm;html+=`<div class="month-label">${nm.toUpperCase()}</div>`}html+=claimCardHtml(d,false)});
 claimsFeed.innerHTML=html||'<div class="next-card">No matching claims.</div>';
}
function renderCards(){
 const q=cardSearch.value.trim().toLowerCase(),selected=document.querySelector('.filter-chip.active')?.dataset.filter||'all';
 cardsGrid.innerHTML=DATA.cards.filter(c=>(selected==='all'||c.sport===selected)&&(!q||c.player.toLowerCase().includes(q))).map(c=>`<article class="collection-card" data-edit="${c.id}"><div class="rarity">${c.rarity.toUpperCase()}</div><div class="card-player">${c.player}</div><div class="card-meta">${c.sport} • ${c.lost?fmt(c.lost)+' overlap':'No overlap'}</div><div class="card-otd">${fmt(c.collectible)}</div></article>`).join('');
}
function renderStats(){
 const claimed=claimedTotal(),total=DATA.totals.collectible,pct=total?claimed/total:0;ringPercent.textContent=Math.round(pct*100)+'%';seasonRing.style.background=`conic-gradient(var(--green) ${pct*360}deg,#163048 0deg)`;
 statsCards.innerHTML=`<div class="stats-row"><span>Amount claimed</span><strong>${fmt(claimed)}</strong></div><div class="stats-row"><span>Remaining</span><strong>${fmt(total-claimed)}</strong></div><div class="stats-row"><span>Missed</span><strong>${fmt(missedTotal())}</strong></div><div class="stats-row"><span>Claimed days</span><strong>${claimedDays()}</strong></div>`;
 const cb=sportTotals(true),all=sportTotals(false);statsSportList.innerHTML=Object.keys(all).map(s=>`<div class="sport-item"><div class="sport-head"><span>${s}</span><span>${fmt(cb[s]||0)} / ${fmt(all[s])}</span></div><div class="sport-bar"><div class="sport-fill" style="width:${(cb[s]||0)/all[s]*100}%;background:${sportColors[s]}"></div></div></div>`).join('');
}
function renderManage(){
 manageList.innerHTML=COLLECTION.map(c=>`<div class="manage-row"><div><div class="manage-name">${c.player}${c.active===false?'<span class="archived-badge">ARCHIVED</span>':''}</div><div class="manage-meta">${c.sport} • ${c.rarity} • ${c.multiplier}× • ${(c.claims||[]).length} dates</div></div><button class="edit-button" data-edit="${c.id}">Edit</button></div>`).join('');
}
function renderAll(){recompute();renderDashboard();renderClaims();renderCards();renderStats();renderManage()}
function setScreen(screen){activeScreen=screen;document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.querySelector('#'+screen+'Screen').classList.add('active');document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.screen===screen));screenTitle.textContent={dashboard:'Dashboard',claims:'Claims',cards:'My Cards',manage:'Manage',stats:'Stats'}[screen];window.scrollTo({top:0,behavior:'smooth'})}
function toggleClaim(date){claimState[date]=claimState[date]==='claimed'?'pending':'claimed';localStorage.setItem(claimStateKey,JSON.stringify(claimState));renderAll();showToast(claimState[date]==='claimed'?'Claim added':'Claim removed')}
function showToast(t){toast.textContent=t;toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),1500)}

function openModal(id=null){
 const c=id?COLLECTION.find(x=>x.id===id):null;cardModal.classList.add('open');cardModal.setAttribute('aria-hidden','false');modalTitle.textContent=c?'Edit card':'Add card';cardId.value=c?.id||'';playerInput.value=c?.player||'';sportInput.value=c?.sport||'NFL';rarityInput.value=c?.rarity||'Rare';multiplierInput.value=c?.multiplier||rarityMultipliers[rarityInput.value]||1;claimsInput.value=(c?.claims||[]).map(x=>`${x.date}, ${Number(x.base).toFixed(3).replace(/\\.?0+$/,'')}`).join('\\n');archiveButton.style.display=c?'block':'none';archiveButton.textContent=c?.active===false?'Restore':'Archive';
}
function closeModalFn(){cardModal.classList.remove('open');cardModal.setAttribute('aria-hidden','true')}
function parseClaims(text){return text.split('\\n').map(s=>s.trim()).filter(Boolean).map(line=>{const [date,base]=line.split(',').map(x=>x.trim());if(!/^\\d{4}-\\d{2}-\\d{2}$/.test(date)||isNaN(Number(base)))throw new Error('Use YYYY-MM-DD, base Rax');return {date,base:Number(base)}})}
function exportData(){const blob=new Blob([JSON.stringify({collection:COLLECTION,claimState},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='real-otd-backup.json';a.click();URL.revokeObjectURL(url)}
function importData(file){const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);if(!Array.isArray(x.collection))throw 0;COLLECTION=x.collection;claimState=x.claimState||{};saveCollection();localStorage.setItem(claimStateKey,JSON.stringify(claimState));renderAll();showToast('Backup restored')}catch{alert('That backup file is not valid.')}};r.readAsText(file)}

document.addEventListener('click',e=>{
 const claim=e.target.closest('[data-claim-date]');if(claim)toggleClaim(claim.dataset.claimDate);
 const nav=e.target.closest('[data-screen]');if(nav)setScreen(nav.dataset.screen);
 const go=e.target.closest('[data-go]');if(go)setScreen(go.dataset.go);
 const chip=e.target.closest('.filter-chip');if(chip){document.querySelectorAll('.filter-chip').forEach(x=>x.classList.remove('active'));chip.classList.add('active');renderCards()}
 const edit=e.target.closest('[data-edit]');if(edit)openModal(edit.dataset.edit);
});
claimSearch.addEventListener('input',renderClaims);sportFilter.addEventListener('change',renderClaims);cardSearch.addEventListener('input',renderCards);
resetButton.addEventListener('click',()=>{if(confirm('Reset all claim progress?')){claimState={};localStorage.removeItem(claimStateKey);renderAll();showToast('Progress reset')}});
addCardButton.addEventListener('click',()=>openModal());closeModal.addEventListener('click',closeModalFn);cardModal.addEventListener('click',e=>{if(e.target===cardModal)closeModalFn()});
rarityInput.addEventListener('change',()=>multiplierInput.value=rarityMultipliers[rarityInput.value]||multiplierInput.value);
cardForm.addEventListener('submit',e=>{e.preventDefault();try{const id=cardId.value||playerInput.value.toLowerCase().replace(/[^a-z0-9]+/g,'-');const existing=COLLECTION.find(x=>x.id===id);const obj={id,player:playerInput.value.trim(),sport:sportInput.value,rarity:rarityInput.value,multiplier:Number(multiplierInput.value),active:existing?.active!==false,claims:parseClaims(claimsInput.value)};if(existing)Object.assign(existing,obj);else COLLECTION.push(obj);saveCollection();closeModalFn();renderAll();showToast('Collection updated')}catch(err){alert(err.message)}});
archiveButton.addEventListener('click',()=>{const c=COLLECTION.find(x=>x.id===cardId.value);if(c){c.active=c.active===false;saveCollection();closeModalFn();renderAll();showToast(c.active?'Card restored':'Card archived')}});
exportButton.addEventListener('click',exportData);importInput.addEventListener('change',e=>{if(e.target.files[0])importData(e.target.files[0])});

Promise.all([fetch('collection.json').then(r=>r.json())]).then(([defaults])=>{
 COLLECTION=JSON.parse(localStorage.getItem(collectionKey)||'null')||defaults;
 rarityInput.innerHTML=Object.keys(rarityMultipliers).map(r=>`<option>${r}</option>`).join('');
 const filters=['all',...new Set(COLLECTION.map(c=>c.sport))];cardFilters.innerHTML=filters.map((f,i)=>`<button class="filter-chip ${i===0?'active':''}" data-filter="${f}">${f==='all'?'All':f}</button>`).join('');
 renderAll();if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
});
