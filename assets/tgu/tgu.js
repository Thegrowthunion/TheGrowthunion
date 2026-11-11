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

/* ---- Package sign-up: collect details here, then reveal the Razorpay button ---- */
(function(){
  document.querySelectorAll('form[data-pay]').forEach(function(f){
    var wrap=f.closest('.tgu-start-card'), panel=wrap.querySelector('.tgu-pay');
    var country=f.querySelector('select[name=country]'), gst=f.querySelector('.gstrow'), amt=f.querySelector('.tgu-amt'), addr=f.querySelector('textarea[name=address]');
    var AIN=f.getAttribute('data-in'), AOUT=f.getAttribute('data-out'), PK=f.getAttribute('data-name');
    function india(){ return country.value==='India'; }
    function sync(){ var i=india(); if(gst) gst.style.display=i?'':'none'; amt.innerHTML='You pay: <strong>'+(i?AIN:AOUT)+'</strong> per month'; addr.placeholder=i?'Billing address, including state *':'Billing address, including country *'; }
    country.addEventListener('change',sync); sync();
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var m=f.querySelector('.msg'), btn=f.querySelector('button[type=submit]'), key=window.TGU&&window.TGU.web3formsKey;
      function say(t){ m.textContent=t; m.className='msg err'; }
      if(f.querySelector('.hp').value) return;
      if(!f.reportValidity()) return;
      if(!key||key.indexOf('PASTE')===0){ say('The form is not connected yet. Please WhatsApp us on +91 95186-04324 or email hello@thegrowthunion.com.'); return; }
      var fd=new FormData(f); var i=india();
      fd.append('access_key',key); fd.append('from_name','The Growth Union website'); fd.append('page',location.pathname);
      fd.append('subject','Package sign-up: '+PK+' ('+(i?'India':'International')+')'); fd.append('package',PK); fd.append('region',i?'India':'International'); fd.append('amount',(i?AIN:AOUT)+' per month');
      m.className='msg'; var old=btn.textContent; btn.disabled=true; btn.textContent='One moment…';
      fetch('https://api.web3forms.com/submit',{method:'POST',body:fd}).then(function(r){return r.json()}).then(function(j){
        if(!(j&&j.success)){ say('Something went wrong. Please WhatsApp us on +91 95186-04324 or email hello@thegrowthunion.com.'); btn.disabled=false; btn.textContent=old; return; }
        if(window.gtag) gtag('event','begin_checkout',{currency:i?'INR':'USD',items:[{item_name:PK+' package'}]});
        f.style.display='none'; panel.hidden=false; panel.style.display='block';
        panel.querySelector('.tgu-nm').textContent=(f.querySelector('input[name=name]').value||'').split(' ')[0];
        panel.querySelectorAll('.tgu-pay-btn').forEach(function(b){ b.style.display=(b.getAttribute('data-for')===(i?'in':'out'))?'block':'none'; });
        setTimeout(function(){ var b=panel.querySelector('.tgu-pay-btn[data-for='+(i?'in':'out')+'] .razorpay-payment-button, .tgu-pay-btn[data-for='+(i?'in':'out')+'] button, .tgu-pay-btn[data-for='+(i?'in':'out')+'] input[type=submit]'); var needs=panel.querySelector('.tgu-pay-btn[data-for='+(i?'in':'out')+']').querySelector('script'); if(needs&&!b) panel.querySelector('.tgu-pay-help').style.display='block'; },6000);
        panel.scrollIntoView({behavior:'smooth',block:'center'});
      }).catch(function(){ say('Network problem. Please WhatsApp us on +91 95186-04324 or email hello@thegrowthunion.com.'); btn.disabled=false; btn.textContent=old; });
    });
  });
})();
