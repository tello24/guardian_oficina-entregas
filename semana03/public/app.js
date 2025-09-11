// Pequena helper para seletor
const $ = (s) => document.querySelector(s);

// UI helpers
function setLoading(btn, isLoading){
  if(!btn) return;
  btn.classList.toggle('loading', isLoading);
  btn.disabled = isLoading;
}

function toast(message, type='success'){
  const el = $('#toast');
  if(!el) return;
  el.textContent = message;
  el.className = `toast show ${type === 'error' ? 'error' : 'success'}`;
  setTimeout(() => el.classList.remove('show'), 2500);
}

// Console helpers
function logLine({ level='info', text='' }){
  const c = $('#console');
  if(!c) return;
  const time = new Date().toLocaleTimeString();
  const code = c.querySelector('code');
  const span = document.createElement('span');
  span.className = `line ${level}`;
  span.innerHTML = `<span class="time">[${time}]</span> ${escapeHtml(text)}`;
  code.appendChild(span);
  c.scrollTop = c.scrollHeight;
}
function escapeHtml(str){
  return String(str).replace(/[&<>"'`=\/]/g, (s) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"
  }[s]));
}

// Limpar console
$('#btnClear')?.addEventListener('click', () => {
  const code = $('#console code');
  if(code) code.textContent = '⟶ Console limpo.';
});

// ====== Form: Dados ======
$('#formExample')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const btn = $('#btnExample');
  setLoading(btn, true);
  try{
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();

    const res = await fetch('/postExample', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    if(!res.ok){
      const msg = `Falha ${res.status}: ${res.statusText}`;
      logLine({ level:'err', text:`/postExample ➜ ${msg}` });
      toast(msg, 'error');
      return;
    }

    const data = await res.json();
    logLine({ level:'ok', text:`/postExample ➜ ${JSON.stringify(data)}` });
    toast(data.message || 'Dados enviados!');
    event.target.reset();
  }catch(err){
    logLine({ level:'err', text:`/postExample ➜ ${err.message}` });
    toast('Erro ao enviar. Veja o console.', 'error');
  }finally{
    setLoading(btn, false);
  }
});

// ====== Form: Mensagem ======
$('#formMensagem')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const btn = $('#btnMensagem');
  setLoading(btn, true);
  try{
    const nome = $('#nome').value.trim();
    const mensagem = $('#mensagem').value.trim();

    const res = await fetch('/submitForm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, mensagem })
    });

    if(!res.ok){
      const msg = `Falha ${res.status}: ${res.statusText}`;
      logLine({ level:'err', text:`/submitForm ➜ ${msg}` });
      toast(msg, 'error');
      return;
    }

    const data = await res.json();
    logLine({ level:'ok', text:`/submitForm ➜ ${JSON.stringify(data)}` });
    toast(data.message || 'Mensagem enviada!');
    event.target.reset();
  }catch(err){
    logLine({ level:'err', text:`/submitForm ➜ ${err.message}` });
    toast('Erro ao enviar. Veja o console.', 'error');
  }finally{
    setLoading(btn, false);
  }
});
