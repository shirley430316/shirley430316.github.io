const dialog=document.getElementById('figure-dialog');let figureOpener=null;
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{figureOpener=button;document.getElementById('dialog-image').classList.toggle('latency-crop',button.dataset.crop==='panel-a');document.getElementById('dialog-image').src=button.dataset.zoom;document.getElementById('dialog-image').alt=button.dataset.caption;document.getElementById('dialog-caption').textContent=button.dataset.caption;dialog.showModal()}));
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',()=>figureOpener?.focus());
document.getElementById('copy-citation').addEventListener('click',async()=>{const text=document.getElementById('bibtex').textContent;const button=document.getElementById('copy-citation');try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text)}else{const input=document.createElement('textarea');input.value=text;input.style.position='fixed';input.style.left='-9999px';document.body.append(input);input.select();if(!document.execCommand('copy'))throw new Error('Copy unavailable');input.remove()}button.querySelector('span').textContent='Copied!';document.getElementById('copy-status').textContent='BibTeX copied to clipboard.';setTimeout(()=>button.querySelector('span').textContent='Copy BibTeX',2200)}catch{const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(document.getElementById('bibtex'));selection.removeAllRanges();selection.addRange(range);document.getElementById('copy-status').textContent='Citation selected. Press Control+C or Command+C to copy.'}});

const queryDemo=document.getElementById('query-demo');
let queryTask='open',queryMasked=true,queryPlaying=!matchMedia('(prefers-reduced-motion: reduce)').matches;
function updateQueryDemo(){
 queryDemo.dataset.task=queryTask;queryDemo.dataset.mask=queryMasked?'on':'off';
 document.querySelectorAll('[data-query-task]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.queryTask===queryTask)));
 const opening=queryTask==='open';
 document.getElementById('query-progress-value').textContent=opening?'Positive ↑':'Negative ↓';
 document.getElementById('mask-switch-state').textContent=queryMasked?'On':'Off';
 document.getElementById('mask-toggle').setAttribute('aria-checked',String(queryMasked));
 document.getElementById('query-mask-label').textContent=queryMasked?'Task information blocked':'Risk: task-semantic shortcut';
 document.getElementById('query-explanation').textContent=queryMasked?(opening?'Opening the computer gives positive progress for the screen-lifting action.':'Closing the computer gives negative progress for the same screen-lifting action.')+' The mask keeps task information out of latent dynamics prediction.':'Without the mask, the dynamics branch can attend to the task query. This creates a risk of task-semantic shortcuts.';
 queryDemo.classList.toggle('is-paused',!queryPlaying);
 const playButton=document.getElementById('query-play');
 playButton.innerHTML=queryPlaying?'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 4v16l14-8z"/></svg>';
 playButton.setAttribute('aria-label',queryPlaying?'Pause animation':'Play animation');
 playButton.title=queryPlaying?'Pause animation':'Play animation';
 document.getElementById('query-play').setAttribute('aria-pressed',String(queryPlaying));
 const svg=queryDemo.querySelector('.query-diagram');if(queryPlaying)svg.unpauseAnimations();else svg.pauseAnimations();
}
document.querySelectorAll('[data-query-task]').forEach(b=>b.addEventListener('click',()=>{queryTask=b.dataset.queryTask;updateQueryDemo()}));
document.getElementById('mask-toggle').addEventListener('click',()=>{queryMasked=!queryMasked;updateQueryDemo()});
document.getElementById('query-play').addEventListener('click',()=>{queryPlaying=!queryPlaying;updateQueryDemo()});
setInterval(()=>{if(queryPlaying&&!document.hidden){const r=queryDemo.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0){queryTask=queryTask==='close'?'open':'close';updateQueryDemo()}}},5000);
updateQueryDemo();

const paperTabs=[...document.querySelectorAll('[data-paper-result]')];
function selectPaperResult(index){paperTabs.forEach((tab,i)=>{const active=i===index;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;document.getElementById('paper-panel-'+i).hidden=!active})}
paperTabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectPaperResult(i));tab.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%paperTabs.length;if(e.key==='ArrowLeft')n=(i+paperTabs.length-1)%paperTabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=paperTabs.length-1;if(n!==undefined){e.preventDefault();selectPaperResult(n);paperTabs[n].focus()}})});

const efficiencySection=document.querySelector('.efficiency-section');
const efficiencyText=efficiencySection.querySelector('.section-heading');
new ResizeObserver(()=>efficiencySection.style.setProperty('--efficiency-text-height',efficiencyText.getBoundingClientRect().height+'px')).observe(efficiencyText);
