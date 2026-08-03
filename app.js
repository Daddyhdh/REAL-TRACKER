
window.addEventListener('error',event=>{
 const box=document.getElementById('runtimeError')||document.getElementById('bootError');
 if(box){
   box.hidden=false;
   box.innerHTML='<strong>App error</strong><br>'+String(event.message||'Unknown error')+'<br><small>'+String(event.filename||'')+':'+String(event.lineno||'')+'</small>';
 }
});
window.addEventListener('unhandledrejection',event=>{
 const box=document.getElementById('runtimeError')||document.getElementById('bootError');
 if(box){
   box.hidden=false;
   box.innerHTML='<strong>App error</strong><br>'+String(event.reason?.message||event.reason||'Unknown promise error');
 }
});


const collectionKey='realTrackerPublicCollectionV1';
const claimStateKey='realTrackerPublicClaimStateV1';
const SUPABASE_URL='https://coddlvolhivjlhckehxb.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_4sglRvv86Oy-be0V1_-HcQ_FaiSslUs';

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
const formulaSampleCount = document.getElementById('formulaSampleCount');
const currentCardCount = document.getElementById('currentCardCount');
const otdCardCount = document.getElementById('otdCardCount');
const reviewQueueCount = document.getElementById('reviewQueueCount');
const formulaTotalSamples = document.getElementById('formulaTotalSamples');
const formulaSportCount = document.getElementById('formulaSportCount');
const formulaConfidenceBadge = document.getElementById('formulaConfidenceBadge');
const formulaSportBreakdown = document.getElementById('formulaSportBreakdown');
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
const boosterEnabledInput = $('boosterEnabledInput');
const boosterMultiplierInput = $('boosterMultiplierInput');
const boosterNotesInput = $('boosterNotesInput');
const boosterRatesGrid = $('boosterRatesGrid');
const boosterSection = document.querySelector('.booster-section');
const cardTypeCurrent = $('cardTypeCurrent');
const cardTypeOtd = $('cardTypeOtd');
const cardTypeToggle = $('cardTypeToggle');
const dateHelperCopy = $('dateHelperCopy');
const claimSectionTitle = $('claimSectionTitle');
const claimSectionHelp = $('claimSectionHelp');
const bulkPasteHelp = $('bulkPasteHelp');
const seasonInput = $('seasonInput');
const teamInput = $('teamInput');
const findDatesButton = $('findDatesButton');
const copyDatePromptButton = $('copyDatePromptButton');
const manualCopyPromptButton = document.getElementById('manualCopyPromptButton');
const clearDatePasteButton = $('clearDatePasteButton');
const aiDateStatus = $('aiDateStatus');
const dateOnlyPasteInput = $('dateOnlyPasteInput');
const importDateOnlyButton = $('importDateOnlyButton');
const addClaimRowButton = $('addClaimRowButton');
const addFiveClaimsButton = $('addFiveClaimsButton');
const bulkClaimInput = $('bulkClaimInput');
const importClaimsButton = $('importClaimsButton');
const claimRows = $('claimRows');
const claimEmptyState = $('claimEmptyState');
const archiveButton = $('archiveButton');
const statsModal = $('statsModal');
const closeStatsModal = $('closeStatsModal');
const statsForm = $('statsForm');
const statsRowIndex = $('statsRowIndex');
const statsModalTitle = $('statsModalTitle');
const statsOpponentInput = $('statsOpponentInput');
const statsResultInput = $('statsResultInput');
const statsFieldsGrid = $('statsFieldsGrid');
const statsSportLabel = $('statsSportLabel');
const boosterPreviewText = $('boosterPreviewText');
const statsNotesInput = $('statsNotesInput');
const statsConfirmedInput = $('statsConfirmedInput');
const balanceModal = $('balanceModal');
const closeBalanceModal = $('closeBalanceModal');
const balanceForm = $('balanceForm');
const raxBalanceInput = $('raxBalanceInput');
const toast = $('toast');
const bootError = $('bootError');
const authModal = $('authModal');
const closeAuthModal = $('closeAuthModal');
const authTitle = $('authTitle');
const authForm = $('authForm');
const authEmail = $('authEmail');
const authPassword = $('authPassword');
const authSubmitButton = $('authSubmitButton');
const loginTab = $('loginTab');
const signupTab = $('signupTab');
const forgotPasswordButton = $('forgotPasswordButton');
const authMessage = $('authMessage');
const openAuthButton = $('openAuthButton');
const logoutButton = $('logoutButton');
const syncNowButton = $('syncNowButton');
const cloudDot = $('cloudDot');
const cloudStatusText = $('cloudStatusText');
const cloudSaveStatus = $('cloudSaveStatus');
const manageCloudStatus = $('manageCloudStatus');
const manageAuthButton = $('manageAuthButton');
const manageSyncButton = $('manageSyncButton');
const cloudWidget = $('cloudWidget');
const dismissCloudWidget = $('dismissCloudWidget');
const cloudMiniChip = $('cloudMiniChip');
const cloudMiniDot = $('cloudMiniDot');
const cloudMiniText = $('cloudMiniText');


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
    team:c.team || '',
    season:c.season || '',
    cardType:c.cardType || c.type || 'otd',
    rarity:c.rarity || 'Rare',
    booster:normalizeBooster(c.booster),
    multiplier:Number(c.multiplier || rarityMultipliers?.[c.rarity] || 1),
    marketValue:Number(c.marketValue || c.value || 0),
    favorite:!!c.favorite,
    notes:c.notes || '',
    active:c.active!==false,
    claims:Array.isArray(c.claims)?c.claims.map(x=>({
      date:x.date,
      base:Number(x.base ?? x.rax ?? 0),
      actualRax:x.actualRax ?? null,
      estimatedRax:x.estimatedRax ?? null,
      formulaVersion:x.formulaVersion ?? null,
      status:x.status || '',
      stats:x.stats || null,
      statsConfirmed:!!x.statsConfirmed,
      opponent:x.opponent || '',
      result:x.result || ''
    })).filter(x=>x.date):[]
  }));
}
function scanLegacyData(){
  const candidates=[]; const states=[];
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    const raw=localStorage.getItem(key);
    if(!looksLikeJson(raw))continue;
    const parsed=safeJsonParse(raw,null);
    if(parsed===null)continue;
    if(isTrackerCollection(parsed)){
      candidates.push({key,cards:parsed});
    }else if(isTrackerState(parsed)){
      // Only keep state-like objects, not random app/library JSON blobs.
      const values=Object.values(parsed);
      const stateLike=values.length===0 || values.every(v=>['claimed','missed','skipped'].includes(v));
      if(stateLike)states.push({key,state:parsed});
    }
  }
  return {candidates,states};
}

let COLLECTION=[];
let DATA={daily:[],cards:[],totals:{raw:0,collectible:0,lost:0}};
let claimState=readFirstJson([claimStateKey,'realTrackerClaimStateV7','realTrackerClaimStateV6','realTrackerClaimStateV5','realTrackerClaimStateV4','realTrackerClaimStateV3','realOtdClaimStateV1'],{});
let activeScreen='dashboard';
let raxBalance=Number(localStorage.getItem('realTrackerPublicRaxBalanceV1')||0);
let supabaseClient=null;
let currentUser=null;
let authMode='login';
let cloudSuppress=false;
let cloudSaveTimer=null;
let cloudReady=false;
let editingStatsRow=null;
let cloudWidgetCollapsed=localStorage.getItem('realTrackerCloudPanelDismissed')==='1';

const rarityOptions=[
 'Common','Rare','Epic',
 'Legendary 1','Legendary 2','Legendary 3','Legendary 4','Legendary 5',
 'Mystic 1','Mystic 2','Mystic 3','Mystic 4','Mystic 5','Mystic 6','Mystic 7','Mystic 8','Mystic 9','Mystic 10',
 ...Array.from({length:20},(_,i)=>`Iconic ${i+1}`)
];

// Known/estimated defaults. Multiplier stays editable so users can correct it if REAL changes values.
const rarityMultipliers={
  'General':1,
  'Common':2,
  'Uncommon':3,
  'Rare':4,
  'Epic':10,
  'Legendary 1':25,
  'Legendary 2':28,
  'Legendary 3':32,
  'Legendary 4':35,
  'Legendary 5':40,
  'Mystic 1':75,
  'Mystic 2':79,
  'Mystic 3':83,
  'Mystic 4':87,
  'Mystic 5':91,
  'Mystic 6':95,
  'Mystic 7':98,
  'Mystic 8':101,
  'Mystic 9':103,
  'Mystic 10':105,
  'Iconic 1':150,
  'Iconic 2':153,
  'Iconic 3':156,
  'Iconic 4':159,
  'Iconic 5':163,
  'Iconic 6':167,
  'Iconic 7':171,
  'Iconic 8':175,
  'Iconic 9':180,
  'Iconic 10':185,
  'Iconic 11':190,
  'Iconic 12':196,
  'Iconic 13':202,
  'Iconic 14':208,
  'Iconic 15':214,
  'Iconic 16':220,
  'Iconic 17':226,
  'Iconic 18':233,
  'Iconic 19':240,
  'Iconic 20':250
};

const rarityOtdCaps={
  'Legendary 1':12500,
  'Legendary 2':14000,
  'Legendary 3':16000,
  'Legendary 4':17500,
  'Legendary 5':20000,
  'Mystic 1':37500,
  'Mystic 2':39500,
  'Mystic 3':41500,
  'Mystic 4':43500,
  'Mystic 5':45500,
  'Mystic 6':47500,
  'Mystic 7':49000,
  'Mystic 8':50000,
  'Mystic 9':51500,
  'Mystic 10':52500
};
function otdCapForCard(card){return rarityOtdCaps[card?.rarity]||null;}

const sportColors={NFL:'#009dff',NBA:'#009dff',WNBA:'#009dff',MLB:'#009dff',FC:'#009dff',Golf:'#009dff',UFC:'#009dff',CFB:'#009dff',NHL:'#009dff',CBB:'#009dff'};

const sportStatFields={
 NFL:[
  ['passingYards','Passing yards'],['passingTD','Passing TDs'],['interceptions','Interceptions'],
  ['rushingYards','Rushing yards'],['rushingTD','Rushing TDs'],
  ['receptions','Receptions'],['receivingYards','Receiving yards'],['receivingTD','Receiving TDs'],
  ['tackles','Tackles'],['sacks','Sacks'],['forcedFumbles','Forced fumbles'],['interceptionsDefense','Defensive INTs']
 ],
 CFB:[
  ['passingYards','Passing yards'],['passingTD','Passing TDs'],['interceptions','Interceptions'],
  ['rushingYards','Rushing yards'],['rushingTD','Rushing TDs'],
  ['receptions','Receptions'],['receivingYards','Receiving yards'],['receivingTD','Receiving TDs'],
  ['tackles','Tackles'],['sacks','Sacks'],['forcedFumbles','Forced fumbles'],['interceptionsDefense','Defensive INTs']
 ],
 NBA:[
  ['points','Points'],['rebounds','Rebounds'],['assists','Assists'],['steals','Steals'],['blocks','Blocks'],
  ['threesMade','3PM'],['turnovers','Turnovers'],['minutes','Minutes']
 ],
 WNBA:[
  ['points','Points'],['rebounds','Rebounds'],['assists','Assists'],['steals','Steals'],['blocks','Blocks'],
  ['threesMade','3PM'],['turnovers','Turnovers'],['minutes','Minutes']
 ],
 CBB:[
  ['points','Points'],['rebounds','Rebounds'],['assists','Assists'],['steals','Steals'],['blocks','Blocks'],
  ['threesMade','3PM'],['turnovers','Turnovers'],['minutes','Minutes']
 ],
 MLB:[
  ['hits','Hits'],['runs','Runs'],['rbi','RBI'],['homeRuns','Home runs'],['stolenBases','Stolen bases'],['walks','Walks'],
  ['strikeoutsBatting','Batting Ks'],['inningsPitched','IP'],['strikeoutsPitching','Pitching Ks'],['earnedRuns','Earned runs'],['saves','Saves']
 ],
 FC:[
  ['goals','Goals'],['assists','Assists'],['shotsOnTarget','Shots on target'],['chancesCreated','Chances created'],
  ['saves','Saves'],['cleanSheet','Clean sheet'],['tackles','Tackles'],['interceptions','Interceptions']
 ],
 Golf:[
  ['birdies','Birdies'],['eagles','Eagles'],['pars','Pars'],['bogeys','Bogeys'],['doubleBogeys','Double bogeys'],
  ['strokesUnderPar','Strokes under par'],['roundScore','Round score'],['finishPosition','Finish position']
 ],
 UFC:[
  ['significantStrikes','Significant strikes'],['takedowns','Takedowns'],['knockdowns','Knockdowns'],
  ['submissionAttempts','Submission attempts'],['reversals','Reversals'],['controlTimeMinutes','Control time min'],['win','Win'],['finish','Finish']
 ],
 NHL:[
  ['goals','Goals'],['assists','Assists'],['shots','Shots'],['blocks','Blocks'],['hits','Hits'],
  ['saves','Saves'],['goalsAgainst','Goals against'],['shutout','Shutout']
 ]
};
function fieldsForSport(sport){return sportStatFields[sport]||sportStatFields.NFL;}
function defaultBooster(){return {enabled:false,multiplier:1,notes:'',rates:{}}}
function normalizeBooster(b){
 return {enabled:!!b?.enabled,multiplier:Number(b?.multiplier||1),notes:b?.notes||'',rates:{...(b?.rates||{})}};
}
function collectBoosterSettings(){
 if(activeCardType()!=='current')return defaultBooster();
 const rates={};
 boosterRatesGrid.querySelectorAll('.booster-rate-input').forEach(input=>{
  const val=Number(input.value);
  if(input.value!=='' && !isNaN(val))rates[input.dataset.stat]=val;
 });
 return {enabled:boosterEnabledInput.checked,multiplier:Number(boosterMultiplierInput.value||1),notes:boosterNotesInput.value.trim(),rates};
}
function renderBoosterRateFields(rates={}){
 const fields=fieldsForSport(sportInput.value);
 boosterRatesGrid.innerHTML=fields.map(([key,label])=>`<label>${label}<input class="booster-rate-input" data-stat="${key}" type="number" step="0.01" placeholder="RAX per ${label.toLowerCase()}" value="${rates[key]??''}"></label>`).join('');
}
function renderStatsFields(sport,stats={}){
 const fields=fieldsForSport(sport);
 if(statsSportLabel)statsSportLabel.textContent=`${sport} stats`;
 statsFieldsGrid.innerHTML=fields.map(([key,label])=>`<label>${label}<input class="stats-field-input" data-stat="${key}" type="number" step="0.01" inputmode="decimal" value="${stats?.[key]??''}"></label>`).join('');
}
function collectStatsFromModal(){
 const stats={};
 statsFieldsGrid.querySelectorAll('.stats-field-input').forEach(input=>{
  const val=Number(input.value);
  if(input.value!=='' && !isNaN(val))stats[input.dataset.stat]=val;
 });
 const notes=statsNotesInput.value.trim();
 if(notes)stats.notes=notes;
 return stats;
}
function hasEnteredStats(stats){
 if(!stats)return false;
 return Object.entries(stats).some(([k,v])=>k==='notes'?String(v).trim():v!==''&&v!==null&&v!==undefined&&!isNaN(Number(v)));
}
function boosterRaxForStats(stats,booster){
 booster=normalizeBooster(booster);
 if(!booster.enabled || !stats)return 0;
 let total=0;
 Object.entries(booster.rates||{}).forEach(([key,rate])=>{
  const stat=Number(stats?.[key]||0);
  const r=Number(rate||0);
  if(!isNaN(stat)&&!isNaN(r))total+=stat*r;
 });
 return Math.round(total*Number(booster.multiplier||1));
}
function boosterRaxForClaim(card,claim){return (card?.cardType==='current')?boosterRaxForStats(claim?.stats,card?.booster):0;}
function totalRaxForClaim(card,claim){
 const cardRax=Math.round(Number(claim?.base||0)*Number(card?.multiplier||1));
 return cardRax+boosterRaxForClaim(card,claim);
}
function claimCardRax(multiplier,base){return Math.round(Number(base||0)*Number(multiplier||1));}
function applyOtdCap(card,amount){const cap=otdCapForCard(card);return cap&&card?.cardType!=='current'?Math.min(amount,cap):amount;}
function refreshClaimRowTotals(){
 const multiplier=Number(multiplierInput.value||1);
 const booster=activeCardType()==='current'?collectBoosterSettings():defaultBooster();
 const isCurrent=activeCardType()==='current';
 claimRows.classList.toggle('current-mode',isCurrent);
 claimRows.classList.toggle('otd-mode',!isCurrent);
 claimRows.querySelectorAll('.claim-entry-row').forEach(row=>{
  const base=Number(row.querySelector('.claim-base-input')?.value||0);
  const cardRax=claimCardRax(multiplier,base);
  const boosterRax=isCurrent?boosterRaxForStats(row._statsData?.stats,booster):0;
  const out=row.querySelector('.claim-total-output');
  if(out)out.value=fmt(cardRax+boosterRax);
  const btn=row.querySelector('.stats-row-button');
  if(btn)btn.hidden=!isCurrent;
  if(btn && isCurrent && isPastDate(row.querySelector('.claim-date-input')?.value) && base>0 && !hasEnteredStats(row._statsData?.stats)){
    btn.classList.add('needs-stats');
  }else if(btn){
    btn.classList.remove('needs-stats');
  }
 });
 updateBoosterPreview();
}
function updateBoosterPreview(){
 if(!boosterPreviewText || !editingStatsRow)return;
 const booster=activeCardType()==='current'?collectBoosterSettings():defaultBooster();
 const stats=collectStatsFromModal();
 const est=boosterRaxForStats(stats,booster);
 boosterPreviewText.textContent=`Booster estimate: ${fmt(est)} RAX`;
}


function looksLikeJson(value){
  if(typeof value!=='string')return false;
  const s=value.trim();
  return s.startsWith('{') || s.startsWith('[');
}
function safeJsonParse(value,fallback=null){
  if(!looksLikeJson(value))return fallback;
  try{return JSON.parse(value);}catch{return fallback;}
}
function safeLocalJson(key,fallback=null){
  return safeJsonParse(localStorage.getItem(key),fallback);
}
function isTrackerCollection(value){
  return Array.isArray(value) && value.every(x=>x && typeof x==='object' && (x.player || x.name || x.claims || x.sport || x.rarity));
}
function isTrackerState(value){
  return value && typeof value==='object' && !Array.isArray(value);
}

const fmt=n=>Number(n||0).toLocaleString();
const dateObj=s=>new Date(s+'T12:00:00');
const monthName=s=>dateObj(s).toLocaleDateString(undefined,{month:'long',year:'numeric'});
const shortDate=s=>dateObj(s).toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});
const monthDay=s=>({day:dateObj(s).toLocaleDateString(undefined,{day:'numeric'}),month:dateObj(s).toLocaleDateString(undefined,{month:'short'}).toUpperCase()});
const activeCardType=()=>cardTypeCurrent.checked?'current':'otd';
function isPastDate(date){return date && dateObj(date) < new Date(new Date().toISOString().slice(0,10)+'T12:00:00')}
function formulaSamples(){
 const out=[];
 COLLECTION.forEach(card=>(card.claims||[]).forEach(claim=>{
   const base=Number(claim.base||0);
   const actual=totalRaxForClaim(card,claim);
   if(card.cardType==='current' && base>0 && claim.statsConfirmed && hasEnteredStats(claim.stats)){
     out.push({card,claim,actual,base,sport:card.sport,boosterRax:boosterRaxForClaim(card,claim)});
   }
 }));
 return out;
}
function currentNeedsReview(card,claim){
 const base=Number(claim.base||0);
 return card.cardType==='current' && isPastDate(claim.date) && base>0 && (!hasEnteredStats(claim.stats) || !claim.statsConfirmed);
}

function saveCollection(){
 localStorage.setItem(collectionKey,JSON.stringify(COLLECTION));
 scheduleCloudSave();
}
function recompute(){
 const rows=[];
 COLLECTION.filter(c=>c.active!==false).forEach(c=>{
  (c.claims||[]).forEach(x=>rows.push({date:x.date,sport:c.sport,player:c.player,rarity:c.rarity,cardType:c.cardType||'otd',base:Number(x.base||0),cardRax:claimCardRax(c.multiplier,x.base),boosterRax:boosterRaxForClaim(c,x),rax:totalRaxForClaim(c,x)}));
 });
 const groups={};
 rows.filter(r=>r.cardType!=='current').forEach(r=>{const k=r.date+'|'+r.sport;(groups[k]??=[]).push(r)});
 Object.values(groups).forEach(g=>g.sort((a,b)=>b.rax-a.rax||a.player.localeCompare(b.player)).forEach((r,i)=>r.selected=i<2));
 const byDate={};
 rows.filter(r=>r.selected).forEach(r=>(byDate[r.date]??=[]).push(r));
 const daily=Object.keys(byDate).sort().map(date=>({date,total:byDate[date].reduce((s,x)=>s+x.rax,0),claims:byDate[date].sort((a,b)=>a.sport.localeCompare(b.sport)||b.rax-a.rax)}));
 const cards=COLLECTION.filter(c=>c.active!==false).map(c=>{
  const raw=(c.claims||[]).reduce((s,x)=>s+totalRaxForClaim(c,x),0);
  const uncappedCollectible=(c.cardType==='current'?raw:rows.filter(r=>r.player===c.player&&r.selected).reduce((s,x)=>s+x.rax,0));
  const collectible=applyOtdCap(c,uncappedCollectible);
  const cap=otdCapForCard(c);
  return {...c,raw,collectible,otdCap:cap,capRemaining:cap?Math.max(0,cap-collectible):null,lost:raw-collectible,marketValue:Number(c.marketValue||0),favorite:!!c.favorite,notes:c.notes||''};
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
 if(currentCardCount)currentCardCount.textContent=`${COLLECTION.filter(c=>c.active!==false&&(c.cardType||'otd')==='current').length} Current`;
 if(otdCardCount)otdCardCount.textContent=`${COLLECTION.filter(c=>c.active!==false&&(c.cardType||'otd')!=='current').length} OTD`;
 if(reviewQueueCount){const reviews=COLLECTION.reduce((s,c)=>s+(c.claims||[]).filter(x=>currentNeedsReview(c,x)).length,0);reviewQueueCount.textContent=`${reviews} Reviews`;}
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
 cardsGrid.innerHTML=DATA.cards.filter(c=>(selected==='all'||c.sport===selected)&&(!q||c.player.toLowerCase().includes(q))).map(c=>`<article class="collection-card" data-edit="${c.id}">${c.favorite?'<div class="favorite-star">★</div>':''}<div class="rarity">${c.rarity.toUpperCase()}</div><div class="card-player">${c.player}</div><div class="card-meta">${c.sport} • ${(c.cardType||'otd')==='current'?'Current':'OTD'}${c.booster?.enabled&&c.cardType==='current'?' • Booster':''}${c.otdCap?' • Cap '+fmt(c.otdCap):''}</div><div class="card-otd">${fmt(c.collectible)}</div><div class="card-value">${c.marketValue?fmt(c.marketValue)+' market value':'Add market value'}</div></article>`).join('');
}
function renderStats(){
 const claimed=claimedTotal(),total=DATA.totals.collectible,pct=total?claimed/total:0;ringPercent.textContent=Math.round(pct*100)+'%';seasonRing.style.background=`conic-gradient(var(--green) ${pct*360}deg,#163048 0deg)`;
 statsCards.innerHTML=`<div class="stats-row"><span>Amount claimed</span><strong>${fmt(claimed)}</strong></div><div class="stats-row"><span>Remaining</span><strong>${fmt(total-claimed)}</strong></div><div class="stats-row"><span>Missed</span><strong>${fmt(missedTotal())}</strong></div><div class="stats-row"><span>Claimed days</span><strong>${claimedDaysCount()}</strong></div>`;
 const cb=sportTotals(true),all=sportTotals(false);statsSportList.innerHTML=Object.keys(all).map(s=>`<div class="sport-item"><div class="sport-head"><span>${s}</span><span>${fmt(cb[s]||0)} / ${fmt(all[s])}</span></div><div class="sport-bar"><div class="sport-fill" style="width:${(cb[s]||0)/all[s]*100}%;background:${sportColors[s]}"></div></div></div>`).join('');
 const samples=formulaSamples();
 const bySport=samples.reduce((acc,x)=>{acc[x.sport]=(acc[x.sport]||0)+1;return acc},{});
 if(formulaTotalSamples)formulaTotalSamples.textContent=fmt(samples.length);
 if(formulaSportCount)formulaSportCount.textContent=Object.keys(bySport).length;
 if(formulaConfidenceBadge)formulaConfidenceBadge.textContent=samples.length>=50?'Learning ready':samples.length>=10?'Early signal':'Not ready';
 if(formulaSportBreakdown)formulaSportBreakdown.innerHTML=Object.entries(bySport).sort((a,b)=>b[1]-a[1]).map(([sport,count])=>`<div class="formula-row"><span>${sport}</span><strong>${count} samples</strong></div>`).join('')||'<div class="formula-row"><span>No confirmed samples yet</span><strong>—</strong></div>';
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
 if(formulaSampleCount){formulaSampleCount.textContent=`${formulaSamples().length} actual RAX samples saved`;}
 manageList.innerHTML=COLLECTION.map(c=>`<div class="manage-row"><div><div class="manage-name">${c.favorite?'★ ':''}${c.player}${c.active===false?'<span class="archived-badge">ARCHIVED</span>':''}</div><div class="manage-meta">${(c.cardType||'otd')==='current'?'Current Season':'OTD'} • ${c.sport} • ${c.rarity} • ${c.multiplier}×${otdCapForCard(c)&&c.cardType!=='current'?' • '+fmt(otdCapForCard(c))+' cap':''} • ${(c.claims||[]).length} rows${c.marketValue?' • '+fmt(c.marketValue)+' value':''}</div></div><button class="edit-button" data-edit="${c.id}">Edit</button></div>`).join('');
}
function renderAll(){recompute();renderDashboard();renderClaims();renderCards();renderStats();renderManage();renderPortfolio()}
function setScreen(screen){activeScreen=screen;document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.querySelector('#'+screen+'Screen').classList.add('active');document.querySelectorAll('[data-screen]').forEach(b=>b.classList.toggle('active',b.dataset.screen===screen));screenTitle.textContent={dashboard:'Dashboard',claims:'Claims',portfolio:'Portfolio',cards:'My Cards',manage:'Manage',stats:'Analytics'}[screen];window.scrollTo({top:0,behavior:'smooth'})}
function toggleClaim(date){claimState[date]=claimState[date]==='claimed'?'pending':'claimed';localStorage.setItem(claimStateKey,JSON.stringify(claimState));scheduleCloudSave();renderAll();showToast(claimState[date]==='claimed'?'Claim added':'Claim removed')}
function showToast(t){toast.textContent=t;toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),1500)}


function applyCloudWidgetPreference(){
 if(!cloudWidget||!cloudMiniChip)return;
 cloudWidget.hidden=cloudWidgetCollapsed;
 cloudMiniChip.hidden=!cloudWidgetCollapsed;
}
function collapseCloudWidget(){
 cloudWidgetCollapsed=true;
 localStorage.setItem('realTrackerCloudPanelDismissed','1');
 applyCloudWidgetPreference();
}
function expandCloudWidget(){
 cloudWidgetCollapsed=false;
 localStorage.setItem('realTrackerCloudPanelDismissed','0');
 applyCloudWidgetPreference();
}
function setCloudStatus(text, detail='', mode='offline'){
 if(cloudStatusText)cloudStatusText.textContent=text;
 if(cloudSaveStatus)cloudSaveStatus.textContent=detail;
 if(manageCloudStatus)manageCloudStatus.textContent=detail || text;
 if(cloudDot){cloudDot.className='cloud-dot '+mode;}
 if(cloudMiniDot){cloudMiniDot.className='cloud-dot '+mode;}
 if(cloudMiniText){cloudMiniText.textContent=mode==='online'?'Synced':mode==='error'?'Sync error':mode==='loading'?'Syncing':'Cloud';}
 applyCloudWidgetPreference();
 const signedIn=!!currentUser;
 if(openAuthButton)openAuthButton.hidden=signedIn;
 if(manageAuthButton)manageAuthButton.hidden=signedIn;
 if(logoutButton)logoutButton.hidden=!signedIn;
 if(syncNowButton)syncNowButton.hidden=!signedIn;
 if(manageSyncButton)manageSyncButton.hidden=!signedIn;
}
function setAuthMessage(message,type='info'){
 authMessage.hidden=!message;
 authMessage.textContent=message||'';
 authMessage.dataset.type=type;
}
function openAuth(mode='login'){
 authMode=mode;
 authModal.classList.add('open');
 authModal.setAttribute('aria-hidden','false');
 setAuthMode(mode);
 setAuthMessage('');
 setTimeout(()=>authEmail.focus(),60);
}
function closeAuth(){authModal.classList.remove('open');authModal.setAttribute('aria-hidden','true')}
function setAuthMode(mode){
 authMode=mode;
 loginTab.classList.toggle('active',mode==='login');
 signupTab.classList.toggle('active',mode==='signup');
 authTitle.textContent=mode==='login'?'Log in':'Create account';
 authSubmitButton.textContent=mode==='login'?'Log in':'Create account';
 authPassword.autocomplete=mode==='login'?'current-password':'new-password';
}
function localSnapshot(){
 return {
   collection:COLLECTION,
   claim_state:claimState,
   rax_balance:Number(raxBalance||0),
   settings:{version:'2.8',updatedFrom:'browser'}
 };
}
function persistLocalFromCloud(data){
 cloudSuppress=true;
 COLLECTION=normalizeCards(Array.isArray(data.collection)?data.collection:[]);
 claimState=(data.claim_state&&typeof data.claim_state==='object')?data.claim_state:{};
 raxBalance=Number(data.rax_balance||0);
 localStorage.setItem(collectionKey,JSON.stringify(COLLECTION));
 localStorage.setItem(claimStateKey,JSON.stringify(claimState));
 localStorage.setItem('realTrackerPublicRaxBalanceV1',String(raxBalance));
 cloudSuppress=false;
 renderAll();
}
function scheduleCloudSave(){
 if(cloudSuppress||!currentUser||!supabaseClient)return;
 clearTimeout(cloudSaveTimer);
 if(cloudSaveStatus)cloudSaveStatus.textContent='Saving...';
 cloudSaveTimer=setTimeout(()=>saveCloudData(),900);
}
async function saveCloudData(){
 if(!currentUser||!supabaseClient)return;
 try{
   const payload=localSnapshot();
   const {error}=await supabaseClient.from('user_data').upsert({
     user_id:currentUser.id,
     collection:payload.collection,
     claim_state:payload.claim_state,
     rax_balance:payload.rax_balance,
     settings:payload.settings
   },{onConflict:'user_id'});
   if(error)throw error;
   setCloudStatus('Cloud synced',`Saved as ${currentUser.email}`,'online');
 }catch(err){
   console.error(err);
   setCloudStatus('Sync error',err.message||'Could not save to cloud','error');
 }
}
async function loadCloudData(){
 if(!currentUser||!supabaseClient)return;
 try{
   setCloudStatus('Cloud sync','Loading your account...','loading');
   const {data,error}=await supabaseClient.from('user_data').select('*').eq('user_id',currentUser.id).maybeSingle();
   if(error)throw error;
   if(data){
     persistLocalFromCloud(data);
     setCloudStatus('Cloud synced',`Loaded ${currentUser.email}`,'online');
   }else{
     await saveCloudData();
     setCloudStatus('Cloud synced',`Created save for ${currentUser.email}`,'online');
   }
 }catch(err){
   console.error(err);
   setCloudStatus('Sync error',err.message||'Could not load cloud data','error');
 }
}
async function initSupabaseAuth(){
 try{
   if(!window.supabase||!SUPABASE_URL||!SUPABASE_PUBLISHABLE_KEY){
     setCloudStatus('Local only','Cloud login is not configured yet.','offline');
     return;
   }
   supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
   const {data}=await supabaseClient.auth.getSession();
   currentUser=data.session?.user||null;
   cloudReady=true;
   if(currentUser){
     setCloudStatus('Signed in',`Loading ${currentUser.email}...`,'loading');
     await loadCloudData();
   }else{
     setCloudStatus('Local only','Sign in to sync across devices.','offline');
   }
   supabaseClient.auth.onAuthStateChange(async(event,session)=>{
     currentUser=session?.user||null;
     if(event==='SIGNED_IN'&&currentUser){
       closeAuth();
       await loadCloudData();
       showToast('Signed in');
     }
     if(event==='SIGNED_OUT'){
       currentUser=null;
       setCloudStatus('Local only','Signed out. This device can still save locally.','offline');
       renderAll();
       showToast('Signed out');
     }
   });
 }catch(err){
   console.error(err);
   setCloudStatus('Cloud error',err.message||'Supabase could not start','error');
 }
}
async function handleAuthSubmit(event){
 event.preventDefault();
 if(!supabaseClient){setAuthMessage('Cloud login is not ready yet. Refresh and try again.','error');return;}
 const email=authEmail.value.trim();
 const password=authPassword.value;
 if(!email||!password)return;
 authSubmitButton.disabled=true;
 setAuthMessage(authMode==='login'?'Logging in...':'Creating account...','info');
 try{
   if(authMode==='signup'){
     const {data,error}=await supabaseClient.auth.signUp({email,password});
     if(error)throw error;
     if(data.session){
       currentUser=data.user;
       closeAuth();
       await loadCloudData();
       showToast('Account created');
     }else{
       setAuthMessage('Account created. Check your email to confirm, then log in.','success');
     }
   }else{
     const {data,error}=await supabaseClient.auth.signInWithPassword({email,password});
     if(error)throw error;
     currentUser=data.user;
     closeAuth();
     await loadCloudData();
     showToast('Logged in');
   }
 }catch(err){
   setAuthMessage(err.message||'Authentication failed.','error');
 }finally{
   authSubmitButton.disabled=false;
 }
}
async function forgotPassword(){
 if(!supabaseClient){setAuthMessage('Cloud login is not ready yet.','error');return;}
 const email=authEmail.value.trim();
 if(!email){setAuthMessage('Enter your email first, then tap forgot password.','error');authEmail.focus();return;}
 try{
   const {error}=await supabaseClient.auth.resetPasswordForEmail(email,{redirectTo:location.origin});
   if(error)throw error;
   setAuthMessage('Password reset email sent.','success');
 }catch(err){setAuthMessage(err.message||'Could not send reset email.','error');}
}


function addClaimEntry(date='',base='',entry=null){
 const row=document.createElement('div');row.className='claim-entry-row premium-claim-row';
 const statsLabel=entry?.statsConfirmed?'Stats saved':(entry?.stats?'Review stats':'Add stats');
 row.innerHTML=`<label class="claim-field date-field"><span>Date</span><input class="claim-date-input" type="date" value="${date}"></label><label class="claim-field base-field"><span>Base RAX</span><input class="claim-base-input" type="number" min="0" step="0.01" inputmode="decimal" placeholder="0" value="${base}"></label><label class="claim-field total-field"><span>Card total</span><input class="claim-total-output" type="text" value="" placeholder="0" readonly title="Base RAX × multiplier, plus booster if current card"></label><button type="button" class="stats-row-button">${statsLabel}</button><button type="button" class="remove-claim-button" aria-label="Remove row">×</button>`;
 row._statsData={stats:entry?.stats||null,statsConfirmed:!!entry?.statsConfirmed,opponent:entry?.opponent||'',result:entry?.result||''};
 claimRows.appendChild(row);updateClaimEmptyState();refreshClaimRowTotals();
}

function normalizeDateFromText(text){
 const cleaned=String(text||'').trim().replace(/[•|–—]/g,' ').replace(/[,]/g,' ').replace(/\s+/g,' ');
 if(!cleaned)return '';
 const pad=n=>String(n).padStart(2,'0');
 const iso=cleaned.match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
 const us=cleaned.match(/(\d{1,2})[-\/](\d{1,2})(?:[-\/](\d{2,4}))?/);
 const named=cleaned.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\s+(\d{1,2})(?:\s+(\d{2,4}))?/i);
 if(iso){
   return `${iso[1]}-${pad(iso[2])}-${pad(iso[3])}`;
 }
 if(us){
   const yr=us[3] ? (us[3].length===2 ? '20'+us[3] : us[3]) : String(new Date().getFullYear());
   return `${yr}-${pad(us[1])}-${pad(us[2])}`;
 }
 if(named){
   const months={jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,sept:9,oct:10,nov:11,dec:12};
   const yr=named[3] ? (named[3].length===2 ? '20'+named[3] : named[3]) : String(new Date().getFullYear());
   return `${yr}-${pad(months[named[1].toLowerCase().slice(0,3)]||9)}-${pad(named[2])}`;
 }
 return '';
}
function parseFlexibleClaimLine(line){
 const cleaned=line.trim().replace(/[•|–—]/g,' ').replace(/\s+/g,' ');
 if(!cleaned)return null;
 const date=normalizeDateFromText(cleaned);
 if(!date)throw new Error(`Could not read the date in "${line}"`);
 const numbers=[...cleaned.matchAll(/\b\d+(?:\.\d+)?\b/g)].map(m=>({value:Number(m[0]),index:m.index,text:m[0]}));
 // Pick the last number that is not obviously part of the date.
 const raxCandidate=numbers[numbers.length-1];
 let rax='';
 if(raxCandidate && !cleaned.slice(0,raxCandidate.index).match(/\d{4}[-\/]\d{1,2}[-\/]?\d{0,2}$/)){
   const after=cleaned.slice(raxCandidate.index+raxCandidate.text.length).trim();
   if(after==='' || /^rax$/i.test(after)) rax=raxCandidate.value;
 }
 return {date,rax};
}
function importDateOnlyList(){
 if(!dateOnlyPasteInput)return;
 const lines=dateOnlyPasteInput.value.split(/\n+/).map(x=>x.trim()).filter(Boolean);
 if(!lines.length){showToast('Paste dates first');return;}
 try{
   const dates=[];
   lines.forEach(line=>{
     const maybe=line.split(/[,;]+/).map(x=>x.trim()).filter(Boolean);
     // If line contains multiple comma-separated ISO dates, handle them too.
     if(maybe.length>1 && maybe.every(x=>normalizeDateFromText(x))){
       maybe.forEach(x=>dates.push({date:normalizeDateFromText(x),rax:''}));
     }else{
       const parsed=parseFlexibleClaimLine(line);
       if(parsed)dates.push(parsed);
     }
   });
   const seen=new Set([...claimRows.querySelectorAll('.claim-date-input')].map(x=>x.value).filter(Boolean));
   let added=0;
   dates.forEach(x=>{
     if(x.date && !seen.has(x.date)){
       addClaimEntry(x.date,x.rax);
       seen.add(x.date);
       added++;
     }
   });
   showToast(`Added ${added} dates`);
 }catch(err){alert(err.message);}
}
function buildDatePrompt(){
 const player=playerInput.value.trim()||'[PLAYER NAME]';
 const sport=sportInput.value||'[SPORT]';
 const season=seasonInput.value.trim()||'[SEASON/YEAR]';
 const team=teamInput.value.trim();
 const teamLine=team ? `Team/context: ${team}\n` : '';
 return `Find every official game/event date that ${player} played in for ${sport} during ${season}.\n${teamLine}Card type: ${activeCardType()==='current'?'current season performance tracking':'OTD historical claims'}\nReturn ONLY the dates, one per line, in YYYY-MM-DD format. Do not include bullets, scores, opponents, stats, explanations, or extra text.`;
}
async function copyDatePrompt(){
 const prompt=buildDatePrompt();
 try{
   await navigator.clipboard.writeText(prompt);
   showToast('Prompt copied');
 }catch{
   window.prompt('Copy this prompt:',prompt);
 }
}
function setAiStatus(message,type='info'){
 if(!aiDateStatus)return;
 aiDateStatus.hidden=false;
 aiDateStatus.textContent=message;
 aiDateStatus.dataset.type=type;
}
async function findDatesInApp(){
 const player=playerInput.value.trim();
 const sport=sportInput.value;
 const season=seasonInput.value.trim();
 const team=teamInput.value.trim();
 if(!player){alert('Enter the player name first.');return;}
 if(!season){alert('Enter the season or year first. Example: 2025-26 or 2025');return;}
 if(findDatesButton)findDatesButton.disabled=true;
 setAiStatus('Searching for official game/event dates… this can take a little bit.','loading');
 try{
   const response=await fetch('/api/find-dates',{
     method:'POST',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify({player,sport,season,team})
   });
   const data=await response.json().catch(()=>({error:'Lookup failed.'}));
   if(!response.ok)throw new Error(data.error||'Lookup failed.');
   const dates=Array.isArray(data.dates)?data.dates:[];
   if(!dates.length)throw new Error('No dates were found. Try adding the team or making the season more specific.');
   const existing=new Set([...claimRows.querySelectorAll('.claim-date-input')].map(x=>x.value).filter(Boolean));
   let added=0;
   dates.forEach(date=>{
     if(date && !existing.has(date)){
       addClaimEntry(date,'');
       existing.add(date);
       added++;
     }
   });
   setAiStatus(`Found ${dates.length} dates. Added ${added} new claim rows. Source check: ${data.note||'review dates before saving.'}`,'success');
   showToast(`Added ${added} dates`);
 }catch(err){
   setAiStatus(err.message,'error');
   alert(err.message);
 }finally{
   if(findDatesButton)findDatesButton.disabled=false;
 }
}
function importBulkClaims(){
 const lines=bulkClaimInput.value.split(/\n+/).map(x=>x.trim()).filter(Boolean);
 if(!lines.length){showToast('Paste claim lines first');return;}
 try{
   const parsed=lines.map(parseFlexibleClaimLine).filter(Boolean);
   parsed.forEach(x=>addClaimEntry(x.date,x.rax));
   bulkClaimInput.value='';
   showToast(`Imported ${parsed.length} rows`);
 }catch(err){
   alert(err.message);
 }
}

function updateClaimEmptyState(){claimEmptyState.classList.toggle('hidden',claimRows.children.length>0)}
function updateCardTypeUI(){
 const type=activeCardType();
 if(dateHelperCopy)dateHelperCopy.textContent=type==='current'
  ? 'Paste upcoming or completed game dates. After a completed game, enter base RAX and stats.'
  : 'Paste historical OTD claim dates. The app applies the 2-claim-per-sport limit and the card OTD cap.';
 if(boosterSection)boosterSection.hidden=type!=='current';
 if(claimSectionTitle)claimSectionTitle.textContent=type==='current'?'Current season performances':'OTD claim dates';
 if(claimSectionHelp)claimSectionHelp.textContent=type==='current'?'Enter base RAX after each game. Completed performances with base RAX require stats. Boosters only apply here.':'Enter base OTD RAX. Total RAX = base × card multiplier, capped by the card level when a cap exists.';
 if(bulkPasteHelp)bulkPasteHelp.innerHTML=type==='current'?'Paste game dates, optionally with base RAX.':'Paste OTD claim dates, optionally with base RAX.';
 const hint=document.getElementById('claimFormulaHint');
 if(hint)hint.textContent=type==='current'?'Total RAX = Base RAX × Card Multiplier + Booster Estimate':'Total RAX = Base RAX × Card Multiplier, then limited by OTD cap when applicable';
 refreshClaimRowTotals();
}
function openStatsEditor(row){
 editingStatsRow=row;
 const idx=[...claimRows.children].indexOf(row);
 statsRowIndex.value=idx;
 const date=row.querySelector('.claim-date-input').value||'this date';
 statsModalTitle.textContent=`Stats for ${date}`;
 statsOpponentInput.value=row._statsData?.opponent||'';
 statsResultInput.value=row._statsData?.result||'';
 renderStatsFields(sportInput.value,row._statsData?.stats||{});
 statsNotesInput.value=row._statsData?.stats?.notes||'';
 statsConfirmedInput.checked=!!row._statsData?.statsConfirmed;
 statsModal.classList.add('open');
 statsModal.setAttribute('aria-hidden','false');
 updateBoosterPreview();
}
function closeStatsEditor(){
 statsModal.classList.remove('open');
 statsModal.setAttribute('aria-hidden','true');
 editingStatsRow=null;
}

function openModal(id=null){
 const c=id?COLLECTION.find(x=>x.id===id):null;cardModal.classList.add('open');cardModal.setAttribute('aria-hidden','false');modalTitle.textContent=c?'Edit card':'Add card';cardId.value=c?.id||'';playerInput.value=c?.player||'';sportInput.value=c?.sport||'NFL';const type=c?.cardType||'otd';cardTypeCurrent.checked=type==='current';cardTypeOtd.checked=type!=='current';updateCardTypeUI();rarityInput.value=c?.rarity||'Rare';multiplierInput.value=c?.multiplier||rarityMultipliers[rarityInput.value]||1;marketValueInput.value=c?.marketValue||'';favoriteInput.checked=!!c?.favorite;notesInput.value=c?.notes||'';seasonInput.value=c?.season||'';teamInput.value=c?.team||'';if(dateOnlyPasteInput)dateOnlyPasteInput.value='';claimRows.innerHTML='';
 const multiplier=Number(c?.multiplier||multiplierInput.value||1);(c?.claims||[]).sort((a,b)=>a.date.localeCompare(b.date)).forEach(x=>addClaimEntry(x.date,Number(x.base||0),x));
 updateClaimEmptyState();archiveButton.style.display=c?'block':'none';archiveButton.textContent=c?.active===false?'Restore':'Archive';
}
function closeModalFn(){cardModal.classList.remove('open');cardModal.setAttribute('aria-hidden','true')}
function collectClaimEntries(multiplier,cardType){
 const claims=[];for(const row of claimRows.querySelectorAll('.claim-entry-row')){
  const date=row.querySelector('.claim-date-input').value;const baseText=row.querySelector('.claim-base-input').value;
  if(!date&&!baseText)continue;
  if(!date)throw new Error('Choose a date for every row.');
  if(baseText!==''&&(isNaN(Number(baseText))||Number(baseText)<0))throw new Error('Enter a valid base RAX amount for every row.');
  const base=Number(baseText||0);
  const stats=row._statsData?.stats||null;
  if(cardType==='current' && isPastDate(date) && base>0 && !hasEnteredStats(stats)){
    throw new Error('Current season cards need stats entered for each completed performance with base RAX.');
  }
  claims.push({date,base,actualRax:baseText===''?null:claimCardRax(multiplier,base),estimatedRax:null,formulaVersion:null,stats,statsConfirmed:!!row._statsData?.statsConfirmed,opponent:row._statsData?.opponent||'',result:row._statsData?.result||''});
 }
 return claims.sort((a,b)=>a.date.localeCompare(b.date));
}

function exportData(){
  const payload={version:50,collection:COLLECTION,claimState,raxBalance};
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
      localStorage.setItem('realTrackerPublicRaxBalanceV1',String(raxBalance));
      scheduleCloudSave();
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
resetButton.addEventListener('click',()=>{if(confirm('Reset all claim progress?')){claimState={};localStorage.removeItem(claimStateKey);scheduleCloudSave();renderAll();showToast('Progress reset')}});
quickAddButton.addEventListener('click',()=>openModal());addCardButton.addEventListener('click',()=>openModal());closeModal.addEventListener('click',closeModalFn);cardModal.addEventListener('click',e=>{if(e.target===cardModal)closeModalFn()});
boosterRatesGrid.addEventListener('input',refreshClaimRowTotals);
boosterEnabledInput.addEventListener('change',refreshClaimRowTotals);
boosterMultiplierInput.addEventListener('input',refreshClaimRowTotals);
statsFieldsGrid.addEventListener('input',updateBoosterPreview);
statsNotesInput.addEventListener('input',updateBoosterPreview);
claimRows.addEventListener('input',e=>{if(e.target.matches('.claim-base-input,.claim-date-input'))refreshClaimRowTotals();});
sportInput.addEventListener('change',()=>{renderBoosterRateFields(collectBoosterSettings().rates);refreshClaimRowTotals();});
multiplierInput.addEventListener('input',refreshClaimRowTotals);
rarityInput.addEventListener('change',()=>{
 const auto=rarityMultipliers[rarityInput.value];
 if(auto){multiplierInput.value=auto;}
 refreshClaimRowTotals();
});
cardForm.addEventListener('submit',e=>{e.preventDefault();try{const id=cardId.value||playerInput.value.toLowerCase().replace(/[^a-z0-9]+/g,'-');const existing=COLLECTION.find(x=>x.id===id);const multiplier=Number(multiplierInput.value);const cardType=activeCardType();const obj={id,player:playerInput.value.trim(),sport:sportInput.value,cardType,rarity:rarityInput.value,multiplier,booster:cardType==='current'?collectBoosterSettings():defaultBooster(),marketValue:Number(marketValueInput.value||0),favorite:favoriteInput.checked,notes:notesInput.value.trim(),season:seasonInput.value.trim(),team:teamInput.value.trim(),active:existing?.active!==false,claims:collectClaimEntries(multiplier,cardType)};if(existing)Object.assign(existing,obj);else COLLECTION.push(obj);saveCollection();closeModalFn();renderAll();showToast('Collection updated')}catch(err){alert(err.message)}});
addClaimRowButton.addEventListener('click',()=>addClaimEntry());addFiveClaimsButton.addEventListener('click',()=>{for(let i=0;i<5;i++)addClaimEntry();});importClaimsButton.addEventListener('click',importBulkClaims);if(importDateOnlyButton)importDateOnlyButton.addEventListener('click',importDateOnlyList);if(findDatesButton)findDatesButton.addEventListener('click',findDatesInApp);if(copyDatePromptButton)copyDatePromptButton.addEventListener('click',copyDatePrompt);
if(manualCopyPromptButton)manualCopyPromptButton.addEventListener('click',copyDatePrompt);if(clearDatePasteButton)clearDatePasteButton.addEventListener('click',()=>{if(dateOnlyPasteInput)dateOnlyPasteInput.value='';});claimRows.addEventListener('click',e=>{const statsBtn=e.target.closest('.stats-row-button');if(statsBtn){openStatsEditor(statsBtn.closest('.claim-entry-row'));return;}const btn=e.target.closest('.remove-claim-button');if(btn){btn.closest('.claim-entry-row').remove();updateClaimEmptyState()}});
archiveButton.addEventListener('click',()=>{const c=COLLECTION.find(x=>x.id===cardId.value);if(c){c.active=c.active===false;saveCollection();closeModalFn();renderAll();showToast(c.active?'Card restored':'Card archived')}});
exportButton.addEventListener('click',exportData);sidebarBackup.addEventListener('click',exportData);importInput.addEventListener('change',e=>{if(e.target.files[0])importData(e.target.files[0])});sidebarImport.addEventListener('change',e=>{if(e.target.files[0])importData(e.target.files[0])});editBalanceButton.addEventListener('click',()=>{balanceModal.classList.add('open');raxBalanceInput.value=raxBalance});closeBalanceModal.addEventListener('click',()=>balanceModal.classList.remove('open'));balanceModal.addEventListener('click',e=>{if(e.target===balanceModal)balanceModal.classList.remove('open')});balanceForm.addEventListener('submit',e=>{e.preventDefault();raxBalance=Number(raxBalanceInput.value||0);localStorage.setItem('realTrackerPublicRaxBalanceV1',raxBalance);scheduleCloudSave();balanceModal.classList.remove('open');renderAll();showToast('RAX balance updated')});


openAuthButton.addEventListener('click',()=>openAuth('login'));
manageAuthButton.addEventListener('click',()=>openAuth('login'));
closeAuthModal.addEventListener('click',closeAuth);
authModal.addEventListener('click',e=>{if(e.target===authModal)closeAuth()});
loginTab.addEventListener('click',()=>setAuthMode('login'));
signupTab.addEventListener('click',()=>setAuthMode('signup'));
authForm.addEventListener('submit',handleAuthSubmit);
forgotPasswordButton.addEventListener('click',forgotPassword);
logoutButton.addEventListener('click',async()=>{if(supabaseClient)await supabaseClient.auth.signOut()});
syncNowButton.addEventListener('click',saveCloudData);
manageSyncButton.addEventListener('click',saveCloudData);
dismissCloudWidget.addEventListener('click',collapseCloudWidget);
cloudMiniChip.addEventListener('click',expandCloudWidget);


cardTypeToggle.addEventListener('change',updateCardTypeUI);
closeStatsModal.addEventListener('click',closeStatsEditor);
statsModal.addEventListener('click',e=>{if(e.target===statsModal)closeStatsEditor()});
statsForm.addEventListener('submit',e=>{
 e.preventDefault();
 if(!editingStatsRow)return;
 const parsed=collectStatsFromModal();
 editingStatsRow._statsData={
   stats:hasEnteredStats(parsed)?parsed:null,
   statsConfirmed:statsConfirmedInput.checked,
   opponent:statsOpponentInput.value.trim(),
   result:statsResultInput.value.trim()
 };
 const btn=editingStatsRow.querySelector('.stats-row-button');
 if(btn)btn.textContent=statsConfirmedInput.checked?'✓':(hasEnteredStats(parsed)?'Review':'Stats');
 refreshClaimRowTotals();
 closeStatsEditor();
 showToast('Stats saved in row');
});

recoverButton.addEventListener('click',async()=>{
  if(confirm('Reset this public tracker back to an empty starter collection?')){
    COLLECTION=[];
    claimState={};
    raxBalance=0;
    saveCollection();
    localStorage.setItem(claimStateKey,JSON.stringify(claimState));
    localStorage.setItem('realTrackerPublicRaxBalanceV1','0');
    scheduleCloudSave();
    renderAll();
    showToast('Public starter reset');
  }
});


// Public starter empty-state polish
const oldRenderAllPublic = renderAll;
renderAll = function(){
  oldRenderAllPublic();
  if(DATA && DATA.cards && DATA.cards.length===0){
    const empty = '<div class="empty-state"><strong>No cards yet</strong>Add a Current Season card or an OTD card in Manage. Sign in to save online, or keep using this device locally.</div>';
    ['nextClaimCard','topEarners','sportBreakdown','cardsGrid','manageList','portfolioTable','valueLeaders','allocationLegend','sportTileBoard'].forEach(id=>{
      const el=document.getElementById(id);
      if(el) el.innerHTML=empty;
    });
    const chart=document.getElementById('claimLineChart');
    if(chart) chart.innerHTML='<div class="empty-state"><strong>No chart data yet</strong>Add cards with claim dates to generate visuals.</div>';
  }
};

Promise.all([fetch('collection.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('Could not load collection data');return r.json()})]).then(([defaults])=>{
 const direct=readFirstJson([collectionKey],null);
 const chosen=Array.isArray(direct)?direct:defaults;
 COLLECTION=normalizeCards(chosen);
 saveCollection();
 localStorage.setItem(claimStateKey,JSON.stringify(claimState));
 rarityInput.innerHTML=rarityOptions.map(r=>`<option>${r}</option>`).join('');
 const filters=['all','NFL','NBA','WNBA','MLB','FC','Golf','UFC','CFB','NHL','CBB'];cardFilters.innerHTML=filters.map((f,i)=>`<button class="filter-chip ${i===0?'active':''}" data-filter="${f}">${f==='all'?'All':f}</button>`).join('');
 renderAll();applyCloudWidgetPreference();initSupabaseAuth();if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(()=>{});
}).catch(err=>{console.error(err);bootError.hidden=false;bootError.textContent='REAL TRACKER could not start: '+err.message+' — refresh once or tap Recover old data after reopening.';});

window.addEventListener('error',e=>{console.error(e.error||e.message);if(bootError){bootError.hidden=false;bootError.textContent='App error: '+(e.message||'Unknown error');}});

setTimeout(()=>document.querySelectorAll('.modal:not(.open)').forEach(m=>m.setAttribute('aria-hidden','true')),0);
