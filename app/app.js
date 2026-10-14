const STORAGE_KEY = 'tatkal-ready-v1';
const $ = (id) => document.getElementById(id);
const safeRead = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; } };
let state = safeRead();
state.passengers ||= [];
state.checks ||= {};
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function renderTrip() {
  const t = state.trip;
  $('trip-summary').textContent = t ? `${t.from} → ${t.to} · ${t.date}${t.train ? ` · ${t.train}` : ''}` : 'No trip saved yet.';
  if (t) { $('from').value=t.from; $('to').value=t.to; $('journey-date').value=t.date; $('train').value=t.train || ''; }
}
function renderPassengers() {
  const list = $('passenger-list'); list.replaceChildren();
  if (!state.passengers.length) { const p=document.createElement('p');p.className='empty';p.textContent='No passenger profiles added.';list.append(p);return; }
  state.passengers.forEach((p,i) => {
    const card=document.createElement('div');card.className='passenger';
    const info=document.createElement('div');const name=document.createElement('strong');name.textContent=p.name;const meta=document.createElement('small');meta.textContent=`Age ${p.age} · ${p.gender} · ${p.berth}`;info.append(name,meta);
    const actions=document.createElement('div');actions.className='passenger-actions';
    const copy=document.createElement('button');copy.className='mini';copy.textContent='Copy';copy.type='button';copy.addEventListener('click',async()=>{const text=`Name: ${p.name}\nAge: ${p.age}\nGender: ${p.gender}\nBerth preference: ${p.berth}`;try{await navigator.clipboard.writeText(text);copy.textContent='Copied';setTimeout(()=>copy.textContent='Copy',1200)}catch{window.prompt('Copy passenger details:',text)}});
    const remove=document.createElement('button');remove.className='mini';remove.textContent='Remove';remove.type='button';remove.addEventListener('click',()=>{state.passengers.splice(i,1);save();renderPassengers()});actions.append(copy,remove);card.append(info,actions);list.append(card);
  });
}
function renderChecks(){let count=0;document.querySelectorAll('[data-check]').forEach(el=>{el.checked=Boolean(state.checks[el.dataset.check]);if(el.checked)count++});$('check-progress').textContent=`${count} of 5 complete`;}
$('trip-form').addEventListener('submit',e=>{e.preventDefault();state.trip={from:$('from').value.trim().toUpperCase(),to:$('to').value.trim().toUpperCase(),date:$('journey-date').value,train:$('train').value.trim()};save();renderTrip()});
$('passenger-form').addEventListener('submit',e=>{e.preventDefault();state.passengers.push({name:$('passenger-name').value.trim(),age:Number($('passenger-age').value),gender:$('passenger-gender').value,berth:$('berth').value});save();renderPassengers();e.target.reset()});
document.querySelectorAll('[data-check]').forEach(el=>el.addEventListener('change',()=>{state.checks[el.dataset.check]=el.checked;save();renderChecks()}));
$('reset-checklist').addEventListener('click',()=>{state.checks={};save();renderChecks()});
$('booking-time').value=state.bookingTime || '';
$('booking-time').addEventListener('change',e=>{state.bookingTime=e.target.value;save();renderCountdown()});
function renderCountdown(){const raw=$('booking-time').value;if(!raw){$('countdown').textContent='Set a date and time';return}const ms=new Date(raw).getTime()-Date.now();if(!Number.isFinite(ms)){$('countdown').textContent='Choose a valid date and time';return}if(ms<=0){$('countdown').textContent='Planned time has arrived';return}const days=Math.floor(ms/86400000),hours=Math.floor(ms%86400000/3600000),mins=Math.floor(ms%3600000/60000),secs=Math.floor(ms%60000/1000);$('countdown').textContent=`${days}d ${hours}h ${mins}m ${secs}s`}
renderTrip();renderPassengers();renderChecks();renderCountdown();setInterval(renderCountdown,1000);
