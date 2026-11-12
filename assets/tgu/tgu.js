/* Forms send to hello@thegrowthunion.com through Web3Forms. The access key lives in /assets/js/config.js */
(function(){
  document.querySelectorAll('form[data-web3]').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var m=f.querySelector('.msg'), btn=f.querySelector('button[type=submit]'), key=window.TGU&&window.TGU.web3formsKey;
      function say(t){ if(m){ m.textContent=t; m.className='msg err'; } }
      if(f.querySelector('.hp')&&f.querySelector('.hp').value) return;
      if(!key||key.indexOf('PASTE')===0){ say('The form is not connected yet. Please WhatsApp us on +91 95186-04324 or email hello@thegrowthunion.com.'); return; }
      var fd=new FormData(f); fd.append('access_key',key); fd.append('from_name','The Growth Union website'); fd.append('page',location.pathname);
      if(m) m.className='msg'; var old=btn.textContent; btn.disabled=true; btn.textContent='Sending…';
      fetch('https://api.web3forms.com/submit',{method:'POST',body:fd}).then(function(r){return r.json()}).then(function(j){
        if(j&&j.success){ if(window.gtag) gtag('event','generate_lead',{form:f.getAttribute('data-web3')}); location.href='/thank-you.html'; }
        else { say('Something went wrong. Please WhatsApp us on +91 95186-04324 or email hello@thegrowthunion.com.'); btn.disabled=false; btn.textContent=old; }
      }).catch(function(){ say('Network problem. Please WhatsApp us on +91 95186-04324 or email hello@thegrowthunion.com.'); btn.disabled=false; btn.textContent=old; });
    });
  });
})();

/* ---- industry tabs (home) ---- */
(function(){
  document.querySelectorAll('.tgu-tabs').forEach(function(t){
    t.addEventListener('click',function(e){
      var b=e.target.closest('.tgu-tab'); if(!b) return;
      var id=b.getAttribute('data-tab'), root=t.parentNode;
      t.querySelectorAll('.tgu-tab').forEach(function(x){x.classList.toggle('on',x===b)});
      root.querySelectorAll('.tgu-panel').forEach(function(p){p.classList.toggle('on',p.getAttribute('data-panel')===id)});
    });
  });
})();

/* ---- insights filter + search ---- */
(function(){
  var g=document.querySelector('.tgu-pgrid'), q=document.querySelector('.tgu-fsearch'); if(!g||!q) return;
  var chips=document.querySelectorAll('.tgu-fchip'), none=document.querySelector('.tgu-fnone'), cur='all';
  function run(){ var s=(q.value||'').toLowerCase().trim(), n=0;
    g.querySelectorAll('.tgu-pcard').forEach(function(c){ var ok=(cur==='all'||c.getAttribute('data-cat')===cur)&&(!s||c.getAttribute('data-s').indexOf(s)>-1); c.style.display=ok?'':'none'; if(ok) n++; });
    none.hidden=n>0; }
  chips.forEach(function(b){ b.addEventListener('click',function(){ cur=b.getAttribute('data-cat'); chips.forEach(function(x){x.classList.toggle('on',x===b)}); run(); }); });
  q.addEventListener('input',run);
})();
