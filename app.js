
const collectionKey='realTracker20Collection';
const claimStateKey='realTracker20ClaimState';

// Explicit element references. This avoids Safari/iPhone relying on element IDs as global variables.

const $ = id => {
  const el=document.getElementById(id);
  if(!el) throw new Error('Missing required element: '+id);
  return el;
};
const appShell = $('appShell');
const sidebarBackup = $('sidebarBackup');
const sidebarImport = $('sidebarImport');
const screenTitle = $('screenTitle');
const quickAddButton = $('quickAddButton');
const resetButton = $('resetButton');
const dashboardScreen = $('dashboardScreen');
const claimedAmount = $('claimedAmount');
const progressFill = $('progressFill');
const progressPercent = $('progressPercent');
const remainingAmount = $('remainingAmount');
const portfolioValue = $('portfolioValue');
const snapshotOtd = $('snapshotOtd');
const snapshotCards = $('snapshotCards');
const snapshotLost = $('snapshotLost');
const todayAmount = $('todayAmount');
const claimedDays = $('claimedDays');
const totalOtd = $('totalOtd');
const cardCount = $('cardCount');
const nextClaimCard = $('nextClaimCard');
const sportBreakdown = $('sportBreakdown');
const topEarners = $('topEarners');
const claimsScreen = $('claimsScreen');
const claimsRemaining = $('claimsRemaining');
const claimSearch = $('claimSearch');
const sportFilter = $('sportFilter');
const claimsFeed = $('claimsFeed');
const portfolioScreen = $('portfolioScreen');
const editBalanceButton = $('editBalanceButton');
const portfolioCollectionValue = $('portfolioCollectionValue');
const raxBalanceValue = $('raxBalanceValue');
const portfolioGrandTotal = $('portfolioGrandTotal');
const portfolioOtdRemaining = $('portfolioOtdRemaining');
const portfolioDonut = $('portfolioDonut');
const donutTotal = $('donutTotal');
const allocationLegend = $('allocationLegend');
const valueLeaders = $('valueLeaders');
const portfolioSearch = $('portfolioSearch');
const portfolioSort = $('portfolioSort');
const portfolioTable = $('portfolioTable');
const cardsScreen = $('cardsScreen');
const cardSearch = $('cardSearch');
const cardFilters = $('cardFilters');
const cardsGrid = $('cardsGrid');
const manageScreen = $('manageScreen');
const addCardButton = $('addCardButton');
const exportButton = $('exportButton');
const importInput = $('importInput');
const recoverButton = $('recoverButton');
const manageList = $('manageList');
const statsScreen = $('statsScreen');
const seasonRing = $('seasonRing');
const ringPercent = $('ringPercent');
const statsCards = $('statsCards');
const statsSportList = $('statsSportList');
const cardModal = $('cardModal');
const modalTitle = $('modalTitle');
const closeModal = $('closeModal');
const cardForm = $('cardForm');
const cardId = $('cardId');
const playerInput = $('playerInput');
const sportInput = $('sportInput');
const rarityInput = $('rarityInput');
const multiplierInput = $('multiplierInput');
const marketValueInput = $('marketValueInput');
const favoriteInput = $('favoriteInput');
const notesInput = $('notesInput');
const addClaimRowButton = $('addClaimRowButton');
const claimRows = $('claimRows');
const claimEmptyState = $('claimEmptyState');
const archiveButton = $('archiveButton');
const balanceModal = $('balanceModal');
const closeBalanceModal = $('closeBalanceModal');
const balanceForm = $('balanceForm');
const raxBalanceInput = $('raxBalanceInput');
const toast = $('toast');
const bootError = $('bootError');


function readFirstJson(keys, fallback){
  for(const key of keys){
    try{const value=localStorage.getItem(key);if(value){const parsed=JSON.parse(value);if(parsed!==null)return parsed;}}catch(e){}
  }
  return fallback;
}
function looksLikeCardArray(value){
  return Array.isArray(value) && value.length && value.every(x=>x && typeof x==='object' && ('player' in x || 'name' in x));
}
function normalizeCards(cards){
  return cards.map((c,index)=>({
    id:c.id || String(c.player||c.name||('card-'+index)).toLowerCase().replace(/[^a-z0-9]+/g,'-'),
    player:c.player || c.name || 'Unknown player',
    sport:c.sport || c.league || 'NFL',
    rarity:c.rarity || 'Rare',
    multiplier:Number(c.multiplier || rarityMultipliers?.[c.rarity] || 1),
    marketValue:Number(c.marketValue || c.value || 0),
    favorite:!!c.favorite,
    notes:c.notes || '',
    active:c.active!==false,
    claims:Array.isArray(c.claims)?c.claims.map(x=>({date:x.date,base:Number(x.base ?? x.rax ?? 0)})).filter(x=>x.date):[]
  }));
}
function scanLegacyData(){
  const candidates=[]; const states=[];
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i); let parsed;
    try{parsed=JSON.parse(localStorage.getItem(key));}catch(e){continue;}
    const arrays=[];
    if(looksLikeCardArray(parsed)) arrays.push(parsed);
    if(parsed && typeof parsed==='object' && looksLikeCardArray(parsed.collection)) arrays.push(parsed.collection);
    arrays.forEach(cards=>{
      const score=cards.length*20+cards.reduce((n,c)=>n+(Array.isArray(c.claims)?c.claims.length:0)*3+(Number(c.marketValue||c.value||0)>0?5:0),0);
      candidates.push({key,cards,score});
    });
    if(parsed && !Array.isArray(parsed) && typeof parsed==='object'){
      const vals=Object.values(parsed); if(vals.some(v=>v==='claimed'||v==='pending'||v==='missed')) states.push({key,state:parsed,score:vals.filter(v=>v==='claimed').length});
      if(parsed.claimState && typeof parsed.claimState==='object') states.push({key:key+':claimState',state:parsed.claimState,score:Object.values(parsed.claimState).filter(v=>v==='claimed').length});
    }
  }
  candidates.sort((a,b)=>b.score-a.score); states.sort((a,b)=>b.score-a.score);
  return {collection:candidates[0]||null,claimState:states[0]||null,candidates};
}

let COLLECTION=[];
let DATA={daily:[],cards:[],totals:{raw:0,collectible:0,lost:0}};
let claimState=readFirstJson([claimStateKey,'realTrackerClaimStateV7','realTrackerClaimStateV6','realTrackerClaimStateV5','realTrackerClaimStateV4','realTrackerClaimStateV3','realOtdClaimStateV1'],{});
let activeScreen='dashboard';
let raxBalance=Number(localStorage.getItem('realTrackerRaxBalanceV1')||0);

const rarityMultipliers={
 'Rare':4,'Epic':10,'Legendary 1':25,'Legendary 2':28,'Legendary 3':32,'Legendary 4':36,'Legendary 5':40,
 'Mystic 1':75,'Mystic 2':79,'Mystic 3':83,'Mystic 4':87,'Mystic 5':91
};
const sportColors={NFL:'#009dff',NBA:'#009dff',WNBA:'#009dff',MLB:'#009dff',FC:'#009dff',Golf:'#009dff',UFC:'#009dff',CFB:'#009dff',NHL:'#009dff',CBB:'#009dff'};
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
  return {...c,raw,collectible,lost:raw-collectible,marketValue:Number(c.marketValue||0),favorite:!!c.favorite,notes:c.notes||''};
 }).sort((a,b)=>b.collectible-a.collectible);
 DATA={daily,cards,totals:{raw:cards.reduce((s,c)=>s+c.raw,0),collectible:cards.reduce((s,c)=>s+c.collectible,0),lost:cards.reduce((s,c)=>s+c.lost,0)}};
}
function claimedTotal(){return DATA.daily.reduce((s,d)=>s+(claimState[d.date]==='claimed'?d.total:0),0)}
function missedTotal(){return DATA.daily.reduce((s,d)=>s+(claimState[d.date]==='missed'?d.total:0),0)}
function claimedDaysCount(){return DATA.daily.filter(d=>claimState[d.date]==='claimed').length}
function todayClaim(){const k=new Date().toISOString().slice(0,10),d=DATA.daily.find(x=>x.date===k);return d&&claimState[k]==='claimed'?d.total:0}
function nextUnclaimed(){return DATA.daily.find(d=>claimState[d.date]!=='claimed')||DATA.daily[0]}
function sportTotals(claimedOnly=false){const t={};DATA.daily.forEach(d=>{if(claimedOnly&&claimState[d.date]!=='claimed')return;d.claims.forEach(c=>t[c.sport]=(t[c.sport]||0)+c.rax)});return t}
function collectionValue(){return DATA.cards.reduce((s,c)=>s+c.marketValue,0)}
function sportValues(){const t={};DATA.cards.forEach(c=>t[c.sport]=(t[c.sport]||0)+c.marketValue);return t}

function renderDashboard(){
 const claimed=claimedTotal(),total=DATA.totals.collectible,pct=total?claimed/total:0;
 claimedAmount.textContent=fmt(claimed);remainingAmount.textContent=fmt(total-claimed);progressFill.style.width=pct*100+'%';progressPercent.textContent=Math.round(pct*100)+'%';
 todayAmount.textContent=fmt(todayClaim());claimedDays.textContent=claimedDaysCount();totalOtd.textContent=fmt(total);cardCount.textContent=DATA.cards.length;portfolioValue.textContent=fmt(collectionValue());snapshotOtd.textContent=fmt(total);snapshotCards.textContent=DATA.cards.length;snapshotLost.textContent=fmt(DATA.totals.lost);
 const next=nextUnclaimed();nextClaimCard.innerHTML=next?claimCardHtml(next,true):'<div class="next-card">All claims completed.</div>';
 topEarners.innerHTML=DATA.cards.slice(0,6).map((c,i)=>`<article class="earner-card" data-edit="${c.id}"><div class="rank-badge">${i+1}</div><div class="earner-name">${c.player}</div><div class="earner-meta">${c.sport} • ${c.rarity}</div><div class="earner-value">${fmt(c.collectible)}</div></article>`).join('');
 const totals=sportTotals(false),max=Math.max(1,...Object.values(totals));sportBreakdown.innerHTML=Object.entries(totals).map(([s,v])=>`<div class="sport-item"><div class="sport-head"><span>${s}</span><span>${fmt(v)}</span></div><div class="sport-bar"><div class="sport-fill" style="width:${v/max*100}%;background:${sportColors[s]}"></div></div></div>`).join('');
}
function claimCardHtml(d,compact=false){
 const md=monthDay(d.date),status=claimState[d.date];
 const rows=d.claims.map(c=>`<div class="claim-row"><div class="player-wrap"><span class="sport-dot" style="color:${sportColors[c.sport]};background:${sportColors[c.sport]}"></span><div><div class="player-name">${c.player}</div><div class="player-sport">${c.sport} • ${c.rarity}</div></div></div><div class="claim-rax">${fmt(c.rax)}</div></div>`).join('');
 return `<article class="${compact?'next-card':'claim-day'}"><div class="claim-header"><div class="date-badge"><div class="date-square"><strong>${md.day}</strong><small>${md.month}</small></div><div><div class="day-title">${shortDate(d.date)}</div><div class="day-sub">${d.claims.length} optimized claims</div></div></div><div class="total-pill">${fmt(d.total)}</div></div><div class="claim-list">${rows}</div><button class="claim-button ${status==='claimed'?'claimed':''}" data-claim-date="${d.date}">${status==='claimed'?'✓ Claimed':'Claim all for '+fmt(d.total)}</button></article>`;
}
function renderClaims(){
 claimsRemaining.textContent=fmt(DATA.totals.collectible-claimedTotal());
 const q=claimSearch.value.trim().toLowerCase(),sport=sportFilter.value;let html='',m='';
 DATA.daily.forEach(d=>{if(!(sport==='all'||d.claims.some(c=>c.sport===sport)))return;if(q&&!d.claims.some(c=>c.player.toLowerCase().includes(q))&&!shortDate(d.date).toLowerCase().includes(q))return;const nm=monthName(d.date);if(nm!==m){m=nm;html+=`<div class="month-label">${nm.toUpperCase()}</div>`}html+=claimCardHtml(d,false)});
 claimsFeed.innerHTML=html||'<div class="next-card">No matching claims.</div>';
}
function renderCards(){
 const q=cardSearch.value.trim().toLowerCase(),selected=document.querySelector('.filter-chip.active')?.dataset.filter||'all';
 cardsGrid.innerHTML=DATA.cards.filter(c=>(selected==='all'||c.sport===selected)&&(!q||c.player.toLowerCase().includes(q))).map(c=>`<article class="collection-card" data-edit="${c.id}">${c.favorite?'<div class="favorite-star">★</div>':''}<div class="rarity">${c.rarity.toUpperCase()}</div><div class="card-player">${c.player}</div><div class="card-meta">${c.sport} • ${c.lost?fmt(c.lost)+' overlap':'No overlap'}</div><div class="card-otd">${fmt(c.collectible)}</div><div class="card-value">${c.marketValue?fmt(c.marketValue)+' market value':'Add market value'}</div></article>`).join('');
}
function renderStats(){
 const claimed=claimedTotal(),total=DATA.totals.collectible,pct=total?claimed/total:0;ringPercent.textContent=Math.round(pct*100)+'%';seasonRing.style.background=`conic-gradient(var(--green) ${pct*360}deg,#163048 0deg)`;
 statsCards.innerHTML=`<div class="stats-row"><span>Amount claimed</span><strong>${fmt(claimed)}</strong></div><div class="stats-row"><span>Remaining</span><strong>${fmt(total-claimed)}</strong></div><div class="stats-row"><span>Missed</span><strong>${fmt(missedTotal())}</strong></div><div class="stats-row"><span>Claimed days</span><strong>${claimedDaysCount()}</strong></div>`;
 const cb=sportTotals(true),all=sportTotals(false);statsSportList.innerHTML=Object.keys(all).map(s=>`<div class="sport-item"><div class="sport-head"><span>${s}</span><span>${fmt(cb[s]||0)} / ${fmt(all[s])}</span></div><div class="sport-bar"><div class="sport-fill" style="width:${(cb[s]||0)/all[s]*100}%;background:${sportColors[s]}"></div></div></div>`).join('');
}
function renderPortfolio(){
 const value=collectionValue(),remaining=DATA.totals.collectible-claimedTotal(),grand=value+raxBalance;
 portfolioCollectionValue.textContent=fmt(value);raxBalanceValue.textContent=fmt(raxBalance);portfolioGrandTotal.textContent=fmt(grand);portfolioOtdRemaining.textContent=fmt(remaining);donutTotal.textContent=fmt(value);
 const values=sportValues(),total=Math.max(1,Object.values(values).reduce((a,b)=>a+b,0));let cur=0,parts=[];Object.entries(values).filter(([,v])=>v>0).forEach(([sp,v])=>{let start=cur,end=cur+v/total*360;parts.push(`${sportColors[sp]} ${start}deg ${end}deg`);cur=end});portfolioDonut.style.background=parts.length?`conic-gradient(${parts.join(',')})`:'conic-gradient(#183148 0deg 360deg)';
 allocationLegend.innerHTML=Object.entries(values).sort((a,b)=>b[1]-a[1]).map(([sp,v])=>`<div class="legend-row"><div class="legend-name"><span class="legend-dot" style="background:${sportColors[sp]}"></span><strong>${sp}</strong></div><span>${fmt(v)}</span></div>`).join('')||'<div class="legend-row">Add market values to see allocation.</div>';
 valueLeaders.innerHTML=DATA.cards.slice().sort((a,b)=>b.marketValue-a.marketValue).slice(0,6).map((c,i)=>`<div class="leader-row" data-edit="${c.id}"><div><strong>#${i+1} ${c.player}</strong><div class="manage-meta">${c.sport} • ${c.rarity}</div></div><span>${fmt(c.marketValue)}</span></div>`).join('');renderPortfolioTable();
}
function renderPortfolioTable(){const q=portfolioSearch.value.trim().toLowerCase(),sort=portfolioSort.value;let rows=DATA.cards.filter(c=>!q||c.player.toLowerCase().includes(q));if(sort==='value')rows.sort((a,b)=>b.marketValue-a.marketValue);if(sort==='otd')rows.sort((a,b)=>b.collectible-a.collectible);if(sort==='name')rows.sort((a,b)=>a.player.localeCompare(b.player));portfolioTable.innerHTML=rows.map(c=>`<div class="portfolio-row" data-edit="${c.id}"><div><h3>${c.favorite?'★ ':''}${c.player}</h3><p>${c.sport} • ${c.rarity} • ${fmt(c.collectible)} OTD</p></div><div class="portfolio-values"><strong>${fmt(c.marketValue)}</strong><small>market value</small></div></div>`).join('')}
function renderManage(){
 manageList.innerHTML=COLLECTION.map(c=>`<div class="manage-row"><div><div class="manage-name">${c.favorite?'★ ':''}${c.player}${c.active===false?'<span class="archived-badge">ARCHIVED</span>':''}</div><div class="manage-meta">${c.sport} • ${c.rarity} • ${c.multiplier}× • ${(c.claims||[]).length} dates${c.marketValue?' • '+fmt(c.marketValue)+' value':''}</div></div><button class="edit-button" data-edit="${c.id}">Edit</button></div>`).join('');
}
function renderAll(){recompute();renderDashboard();renderClaims();renderCards();renderStats();renderManage();renderPortfolio()}
function setScreen(screen){activeScreen=screen;document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.querySelector('#'+screen+'Screen').classList.add('active');document.querySelectorAll('[data-screen]').forEach(b=>b.classList.toggle('active',b.dataset.screen===screen));screenTitle.textContent={dashboard:'Dashboard',claims:'Claims',portfolio:'Portfolio',cards:'My Cards',manage:'Manage',stats:'Analytics'}[screen];window.scrollTo({top:0,behavior:'smooth'})}
function toggleClaim(date){claimState[date]=claimState[date]==='claimed'?'pending':'claimed';localStorage.setItem(claimStateKey,JSON.stringify(claimState));renderAll();showToast(claimState[date]==='claimed'?'Claim added':'Claim removed')}
function showToast(t){toast.textContent=t;toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),1500)}

function addClaimEntry(date='',rax=''){
 const row=document.createElement('div');row.className='claim-entry-row';
 row.innerHTML=`<input class="claim-date-input" type="date" value="${date}"><input class="claim-rax-input" type="number" min="0" step="1" inputmode="numeric" placeholder="RAX" value="${rax}"><button type="button" class="remove-claim-button" aria-label="Remove claim">×</button>`;
 claimRows.appendChild(row);updateClaimEmptyState();
}
function updateClaimEmptyState(){claimEmptyState.classList.toggle('hidden',claimRows.children.length>0)}
function openModal(id=null){
 const c=id?COLLECTION.find(x=>x.id===id):null;cardModal.classList.add('open');cardModal.setAttribute('aria-hidden','false');modalTitle.textContent=c?'Edit card':'Add card';cardId.value=c?.id||'';playerInput.value=c?.player||'';sportInput.value=c?.sport||'NFL';rarityInput.value=c?.rarity||'Rare';multiplierInput.value=c?.multiplier||rarityMultipliers[rarityInput.value]||1;marketValueInput.value=c?.marketValue||'';favoriteInput.checked=!!c?.favorite;notesInput.value=c?.notes||'';claimRows.innerHTML='';
 const multiplier=Number(c?.multiplier||multiplierInput.value||1);(c?.claims||[]).sort((a,b)=>a.date.localeCompare(b.date)).forEach(x=>addClaimEntry(x.date,Math.round(Number(x.base)*multiplier)));
 updateClaimEmptyState();archiveButton.style.display=c?'block':'none';archiveButton.textContent=c?.active===false?'Restore':'Archive';
}
function closeModalFn(){cardModal.classList.remove('open');cardModal.setAttribute('aria-hidden','true')}
function collectClaimEntries(multiplier){
 const claims=[];for(const row of claimRows.querySelectorAll('.claim-entry-row')){
  const date=row.querySelector('.claim-date-input').value;const raxText=row.querySelector('.claim-rax-input').value;
  if(!date&&!raxText)continue;
  if(!date)throw new Error('Choose a date for every claim.');
  if(raxText===''||isNaN(Number(raxText))||Number(raxText)<0)throw new Error('Enter a valid RAX amount for every claim.');
  claims.push({date,base:Number(raxText)/Number(multiplier||1)});
 }
 return claims.sort((a,b)=>a.date.localeCompare(b.date));
}

function exportData(){
  const payload={version:7,collection:COLLECTION,claimState,raxBalance};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download='real-tracker-backup.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
function importData(file){
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const payload=JSON.parse(reader.result);
      const cards=Array.isArray(payload)?payload:payload.collection;
      if(!Array.isArray(cards)) throw new Error('No collection found in this file.');
      COLLECTION=normalizeCards(cards);
      if(payload.claimState && typeof payload.claimState==='object') claimState=payload.claimState;
      if(payload.raxBalance!==undefined) raxBalance=Number(payload.raxBalance||0);
      saveCollection();
      localStorage.setItem(claimStateKey,JSON.stringify(claimState));
      localStorage.setItem('realTrackerRaxBalanceV1',String(raxBalance));
      renderAll();
      showToast('Backup restored');
    }catch(err){
      alert('Could not restore that backup: '+err.message);
    }
  };
  reader.readAsText(file);
}

document.addEventListener('click',event=>{
  const nav=event.target.closest('[data-screen]');
  if(nav){
    event.preventDefault();
    setScreen(nav.dataset.screen);
    return;
  }
  const go=event.target.closest('[data-go]');
  if(go){
    event.preventDefault();
    setScreen(go.dataset.go);
    return;
  }
  const claim=event.target.closest('[data-claim-date]');
  if(claim){
    event.preventDefault();
    toggleClaim(claim.dataset.claimDate);
    return;
  }
  const chip=event.target.closest('.filter-chip');
  if(chip){
    event.preventDefault();
    document.querySelectorAll('.filter-chip').forEach(x=>x.classList.remove('active'));
    chip.classList.add('active');
    renderCards();
    return;
  }
  const edit=event.target.closest('[data-edit]');
  if(edit){
    event.preventDefault();
    openModal(edit.dataset.edit);
  }
});

claimSearch.addEventListener('input',renderClaims);sportFilter.addEventListener('change',renderClaims);cardSearch.addEventListener('input',renderCards);portfolioSearch.addEventListener('input',renderPortfolioTable);portfolioSort.addEventListener('change',renderPortfolioTable);
resetButton.addEventListener('click',()=>{if(confirm('Reset all claim progress?')){claimState={};localStorage.removeItem(claimStateKey);renderAll();showToast('Progress reset')}});
quickAddButton.addEventListener('click',()=>openModal());addCardButton.addEventListener('click',()=>openModal());closeModal.addEventListener('click',closeModalFn);cardModal.addEventListener('click',e=>{if(e.target===cardModal)closeModalFn()});
rarityInput.addEventListener('change',()=>multiplierInput.value=rarityMultipliers[rarityInput.value]||multiplierInput.value);
cardForm.addEventListener('submit',e=>{e.preventDefault();try{const id=cardId.value||playerInput.value.toLowerCase().replace(/[^a-z0-9]+/g,'-');const existing=COLLECTION.find(x=>x.id===id);const multiplier=Number(multiplierInput.value);const obj={id,player:playerInput.value.trim(),sport:sportInput.value,rarity:rarityInput.value,multiplier,marketValue:Number(marketValueInput.value||0),favorite:favoriteInput.checked,notes:notesInput.value.trim(),active:existing?.active!==false,claims:collectClaimEntries(multiplier)};if(existing)Object.assign(existing,obj);else COLLECTION.push(obj);saveCollection();closeModalFn();renderAll();showToast('Collection updated')}catch(err){alert(err.message)}});
addClaimRowButton.addEventListener('click',()=>addClaimEntry());claimRows.addEventListener('click',e=>{const btn=e.target.closest('.remove-claim-button');if(btn){btn.closest('.claim-entry-row').remove();updateClaimEmptyState()}});
archiveButton.addEventListener('click',()=>{const c=COLLECTION.find(x=>x.id===cardId.value);if(c){c.active=c.active===false;saveCollection();closeModalFn();renderAll();showToast(c.active?'Card restored':'Card archived')}});
exportButton.addEventListener('click',exportData);sidebarBackup.addEventListener('click',exportData);importInput.addEventListener('change',e=>{if(e.target.files[0])importData(e.target.files[0])});sidebarImport.addEventListener('change',e=>{if(e.target.files[0])importData(e.target.files[0])});editBalanceButton.addEventListener('click',()=>{balanceModal.classList.add('open');raxBalanceInput.value=raxBalance});closeBalanceModal.addEventListener('click',()=>balanceModal.classList.remove('open'));balanceModal.addEventListener('click',e=>{if(e.target===balanceModal)balanceModal.classList.remove('open')});balanceForm.addEventListener('submit',e=>{e.preventDefault();raxBalance=Number(raxBalanceInput.value||0);localStorage.setItem('realTrackerRaxBalanceV1',raxBalance);balanceModal.classList.remove('open');renderAll();showToast('RAX balance updated')});


recoverButton.addEventListener('click',()=>{
  const legacy=scanLegacyData();
  if(!legacy.collection){alert('No older card data was found on this device.');return;}
  const count=legacy.collection.cards.length;
  if(confirm(`Found ${count} cards in older saved data (${legacy.collection.key}). Restore them now?`)){
    COLLECTION=normalizeCards(legacy.collection.cards);
    if(legacy.claimState) claimState=legacy.claimState.state;
    saveCollection();localStorage.setItem(claimStateKey,JSON.stringify(claimState));renderAll();showToast('Old data recovered');
  }
});

Promise.all([fetch('collection.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('Could not load collection data');return r.json()})]).then(([defaults])=>{
 const direct=readFirstJson([collectionKey,'realTrackerCollectionV7','realTrackerCollectionV6','realTrackerCollectionV5','realTrackerCollectionV4','realTrackerCollectionV3','realOtdCollectionV2','realOtdCollectionV1'],null);
 const legacy=scanLegacyData();
 const chosen=(Array.isArray(direct)&&direct.length?direct:(legacy.collection?legacy.collection.cards:defaults));
 COLLECTION=normalizeCards(chosen);
 saveCollection();
 localStorage.setItem(claimStateKey,JSON.stringify(claimState));
 rarityInput.innerHTML=Object.keys(rarityMultipliers).map(r=>`<option>${r}</option>`).join('');
 const filters=['all','NFL','NBA','WNBA','MLB','FC','Golf','UFC','CFB','NHL','CBB'];cardFilters.innerHTML=filters.map((f,i)=>`<button class="filter-chip ${i===0?'active':''}" data-filter="${f}">${f==='all'?'All':f}</button>`).join('');
 renderAll();if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(()=>{});
}).catch(err=>{console.error(err);bootError.hidden=false;bootError.textContent='REAL TRACKER could not start: '+err.message+' — refresh once or tap Recover old data after reopening.';});

window.addEventListener('error',e=>{console.error(e.error||e.message);if(bootError){bootError.hidden=false;bootError.textContent='App error: '+(e.message||'Unknown error');}});
