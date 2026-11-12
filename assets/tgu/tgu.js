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
        if(j&&j.success){ if(window.gtag) gtag('event','generate_lead',{form:f.getAttribute('data-web3')}); try{ if(f.getAttribute('data-web3')==='order') localStorage.removeItem('tguCart'); }catch(x){} location.href='/thank-you.html'; }
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

/* ---- services hub: category chips + search ---- */
(function(){
  var g=document.querySelector('.tgu-sv-grid'); if(!g) return;
  var chips=document.querySelectorAll('.tgu-sv-chip'), q=document.querySelector('.tgu-sv-search'), none=document.querySelector('.tgu-sv-none'), cur='all';
  function run(){ var s=(q&&q.value||'').toLowerCase().trim(), n=0;
    g.querySelectorAll('.tgu-sv-card').forEach(function(c){ var ok=(cur==='all'||c.getAttribute('data-cat')===cur)&&(!s||c.getAttribute('data-s').indexOf(s)>-1); c.style.display=ok?'':'none'; if(ok) n++; });
    if(none) none.hidden=n>0; }
  chips.forEach(function(b){ b.addEventListener('click',function(){ cur=b.getAttribute('data-cat'); chips.forEach(function(x){x.classList.toggle('on',x===b)}); run(); }); });
  if(q) q.addEventListener('input',run);
})();

/* ---- order cart (kept in this browser only) ---- */
(function(){
  var KEY='tguCart';
  function load(){ try{ var c=JSON.parse(localStorage.getItem(KEY)||'[]'); return Array.isArray(c)?c:[]; }catch(e){ return []; } }
  function save(c){ try{ localStorage.setItem(KEY,JSON.stringify(c)); }catch(e){} bar(); }
  function bar(){ var c=load(), b=document.querySelector('.tgu-cartbar');
    if(!c.length||document.getElementById('tgu-order')){ if(b) b.parentNode.removeChild(b); return; }
    if(!b){ b=document.createElement('a'); b.className='tgu-cartbar'; b.href='/order.html'; document.body.appendChild(b); }
    b.innerHTML='Your order <b>'+c.length+'</b> &rsaquo;'; }
  function fmtI(n){ n=Math.round(n); var s=String(n); if(s.length<=3) return '\u20b9'+s; var t=s.slice(-3), h=s.slice(0,-3), p=[]; while(h.length>2){ p.unshift(h.slice(-2)); h=h.slice(0,-2);} if(h) p.unshift(h); return '\u20b9'+p.concat([t]).join(','); }
  function fmtU(n){ return '$'+Math.round(n).toLocaleString('en-US'); }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]}); }
  document.addEventListener('click',function(e){
    var b=e.target.closest('[data-add]'); if(!b) return; e.preventDefault();
    var d=b.dataset, c=load();
    if(!c.some(function(x){return x.id===d.id;})) c.push({id:d.id,name:d.name,tier:d.tier,inr:+d.inr,usd:+d.usd,bill:d.bill,min:d.min,due:d.due,url:d.url});
    save(c);
    if(b.hasAttribute('data-go')){ location.href='/order.html'; return; }
    var old=b.textContent; b.textContent='Added \u2713'; setTimeout(function(){ b.textContent=old; },1600);
  });
  bar();
  var root=document.getElementById('tgu-order'); if(!root) return;
  var region='india';
  function dueOf(it,cur){ var p=cur==='usd'?it.usd:it.inr; if(it.due==='none') return 0; if(it.due==='half') return p/2; return p; }
  function render(){
    var c=load(), usd=region==='intl', cur=usd?'usd':'inr', f=usd?fmtU:fmtI;
    var empty=document.getElementById('tgu-oempty'), main=document.getElementById('tgu-omain');
    if(!c.length){ empty.hidden=false; main.hidden=true; return; } empty.hidden=true; main.hidden=false;
    var rows='', nowT=0, allT=0, lines=[];
    c.forEach(function(it,i){ var p=usd?it.usd:it.inr, d=dueOf(it,cur); nowT+=d; allT+=p;
      var unit=it.bill==='Monthly'?' / month':(it.bill==='One-time'?'':' ('+String(it.bill).toLowerCase()+')');
      rows+='<tr><td><b>'+esc(it.name)+'</b><small>'+esc(it.tier)+(it.min&&it.min!=='Project'&&it.min!=='Per hire'?' \u00b7 minimum '+esc(it.min):'')+'</small><button type="button" class="rm" data-rm="'+i+'">Remove</button></td><td class="n">'+f(p)+unit+'</td><td class="n">'+(d?f(d):'On hire')+'</td></tr>';
      lines.push('- '+it.name+' ('+it.tier+'): '+f(p)+unit+'; pay now '+(d?f(d):'nothing (on hire)')); });
    document.getElementById('tgu-olines').innerHTML=rows;
    var gst=usd?0:Math.round(nowT*0.18), tot=nowT+gst;
    document.getElementById('tgu-otot').innerHTML='<div><span>First payment, before tax</span><span>'+f(nowT)+'</span></div>'+(usd?'<div><span>Tax</span><span>Shown on your invoice</span></div>':'<div><span>GST (18%)</span><span>'+f(gst)+'</span></div>')+'<div class="g"><span>Total to pay now</span><span>'+f(tot)+'</span></div>';
    var summary='ORDER ('+(usd?'USD, outside India':'INR, India')+')\n'+lines.join('\n')+'\nTotal to pay now: '+f(tot)+(usd?' (tax as per invoice)':' (incl. 18% GST)')+'\nFull value of these items: '+f(allT);
    var h=document.getElementById('tgu-osum'); if(h) h.value=summary;
    var tt=document.getElementById('tgu-ototal'); if(tt) tt.value=f(tot);
    var wa=document.getElementById('tgu-owa'); if(wa) wa.href='https://wa.me/919518604324?text='+encodeURIComponent('Hi, I would like to place this order:\n'+summary);
    var gs=document.getElementById('tgu-gstrow'); if(gs) gs.hidden=usd;
  }
  root.addEventListener('click',function(e){ var r=e.target.closest('[data-rm]'); if(!r) return; var c=load(); c.splice(+r.getAttribute('data-rm'),1); save(c); render(); });
  document.querySelectorAll('input[name=region]').forEach(function(r){ r.addEventListener('change',function(){ region=r.value; var cs=document.getElementById('tgu-ocountry'); if(cs){ if(region==='india') cs.value='India'; else if(cs.value==='India') cs.value=''; } render(); }); });
  var cs=document.getElementById('tgu-ocountry'); if(cs) cs.addEventListener('change',function(){ var intl=cs.value!=='India'&&cs.value!==''; var rr=document.querySelector('input[name=region][value='+(intl?'intl':'india')+']'); if(rr&&!rr.checked){ rr.checked=true; region=rr.value; render(); } });

  var of=root.querySelector('form[data-order]');
  if(of) of.addEventListener('submit',function(e){
    e.preventDefault();
    var m=of.querySelector('.msg'), btn=of.querySelector('button[type=submit]'), key=window.TGU&&window.TGU.web3formsKey, el=of.elements;
    function say(t){ if(m) m.textContent=t; }
    if(of.querySelector('.hp')&&of.querySelector('.hp').value) return;
    if(!load().length){ say('Your order is empty. Please add a service first.'); return; }
    var need=['name','company','email','phone','billing_address'];
    for(var i=0;i<need.length;i++){ if(!el[need[i]]||!String(el[need[i]].value).trim()){ say('Please fill in the fields marked with *.'); if(el[need[i]]) el[need[i]].focus(); return; } }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.email.value.trim())){ say('Please enter a valid email address.'); el.email.focus(); return; }
    if(!el.country.value){ say('Please select your country.'); el.country.focus(); return; }
    if(!el.consent.checked){ say('Please tick the box to accept the Terms and the Refund & Cancellation policy.'); return; }
    if(!key||key.indexOf('PASTE')===0){ say('The order form is not connected yet. Please use the WhatsApp link below, or email hello@thegrowthunion.com.'); return; }
    var fd=new FormData(of); fd.append('access_key',key); fd.append('from_name','The Growth Union website'); fd.append('page',location.pathname);
    var old=btn.textContent; btn.disabled=true; btn.textContent='Placing order\u2026'; say('');
    fetch('https://api.web3forms.com/submit',{method:'POST',body:fd}).then(function(r){return r.json()}).then(function(j){
      if(j&&j.success){ if(window.gtag) gtag('event','generate_lead',{form:'order'}); try{ localStorage.removeItem(KEY); }catch(x){} location.href='/thank-you.html'; }
      else { say('Something went wrong. Please send this order on WhatsApp using the link below.'); btn.disabled=false; btn.textContent=old; }
    }).catch(function(){ say('Network problem. Please send this order on WhatsApp using the link below.'); btn.disabled=false; btn.textContent=old; });
  });
  render();
})();
