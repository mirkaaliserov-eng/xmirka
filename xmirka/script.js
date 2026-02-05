// ===== Landing Page =====
const landing = document.getElementById('landing');
const enterBtn = document.getElementById('enter-btn');
const app = document.getElementById('app');

enterBtn.addEventListener('click', ()=>{
  landing.classList.add('hidden');
  app.classList.remove('hidden');
});

// ===== Tab Switching =====
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab=>{
  tab.addEventListener('click', ()=>{
    tabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    contents.forEach(c=>c.classList.remove('active'));
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// ===== AI Tutor Chat =====
const helpMessages = document.getElementById('help-messages');
const helpInput = document.getElementById('help-input');
const helpSend = document.getElementById('help-send');

helpSend.addEventListener('click', sendHelp);
helpInput.addEventListener('keypress', e=>{ if(e.key==='Enter') sendHelp(); });

function sendHelp(){
  const text = helpInput.value.trim();
  if(!text) return;
  addHelpMessage(text,'sent');
  helpInput.value='';
  setTimeout(()=>{
    const aiText = "AI response placeholder for: '"+text+"'";
    addHelpMessage(aiText,'received');
  },700);
}

function addHelpMessage(text,type){
  const div = document.createElement('div');
  div.classList.add('message',type);
  div.innerHTML=text;
  helpMessages.appendChild(div);
  helpMessages.scrollTop=helpMessages.scrollHeight;
}

// ===== Reading & Listening Mocks =====
const readingButtons = document.getElementById('reading-buttons');
const listeningButtons = document.getElementById('listening-buttons');
const readingFrame = document.getElementById('reading-frame');
const listeningPlayer = document.getElementById('listening-player');

// Example 5 reading mocks
const readingMocks = [
  {name:'Reading Test 1', url:'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'},
  {name:'Reading Test 2', url:'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'},
  {name:'Reading Test 3', url:'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'},
  {name:'Reading Test 4', url:'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'},
  {name:'Reading Test 5', url:'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'}
];

// Example 5 listening mocks
const listeningMocks = [
  {name:'Listening Test 1', url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
  {name:'Listening Test 2', url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
  {name:'Listening Test 3', url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
  {name:'Listening Test 4', url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
  {name:'Listening Test 5', url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
];

readingMocks.forEach(mock=>{
  const btn = document.createElement('button');
  btn.innerText = mock.name;
  btn.addEventListener('click', ()=>{ readingFrame.src = mock.url; });
  readingButtons.appendChild(btn);
});

listeningMocks.forEach(mock=>{
  const btn = document.createElement('button');
  btn.innerText = mock.name;
  btn.addEventListener('click', ()=>{ listeningPlayer.src = mock.url; });
  listeningButtons.appendChild(btn);
});

// ===== 3D background animation =====
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
for(let i=0;i<100;i++){
  particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2+1,speed:Math.random()*0.5+0.2});
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.y -= p.speed;
    if(p.y<0) p.y=canvas.height;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,0.6)';
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
