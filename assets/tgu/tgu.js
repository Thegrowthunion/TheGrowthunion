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
