(function(){
  var d=document, $=function(s,r){return (r||d).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))};
  /* sticky header shadow */
  var h=$('.header'); if(h){var on=function(){h.classList.toggle('stuck',window.scrollY>10)};on();window.addEventListener('scroll',on,{passive:true})}
  /* mobile menu */
  var b=$('.burger'), n=$('.nav');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);d.body.style.overflow=o?'hidden':''});
    $$('.nav a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('open');d.body.style.overflow=''})})}
  /* reveal on scroll */
  var rv=$$('.reveal');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});rv.forEach(function(e){io.observe(e)})}else{rv.forEach(function(e){e.classList.add('in')})}
  /* counters */
  $$('[data-count]').forEach(function(el){var to=parseInt(el.getAttribute('data-count'),10),done=false;
    var run=function(){if(done)return;done=true;var t0=null;function f(t){if(!t0)t0=t;var p=Math.min((t-t0)/1100,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)};
    if('IntersectionObserver' in window){new IntersectionObserver(function(es,o){if(es[0].isIntersecting){run();o.disconnect()}},{threshold:.4}).observe(el)}else run()});
  /* testimonial slider */
  $$('.testi').forEach(function(w){var s=$('.tslides',w), p=$('[data-prev]',w), x=$('[data-next]',w); if(!s)return;
    var step=function(){var c=s.children[0];return c?c.getBoundingClientRect().width+24:300};
    if(p)p.addEventListener('click',function(){s.scrollBy({left:-step(),behavior:'smooth'})});
    if(x)x.addEventListener('click',function(){s.scrollBy({left:step(),behavior:'smooth'})});
    var t=setInterval(function(){if(s.scrollLeft+s.clientWidth>=s.scrollWidth-4)s.scrollTo({left:0,behavior:'smooth'});else s.scrollBy({left:step(),behavior:'smooth'})},6500);
    w.addEventListener('mouseenter',function(){clearInterval(t)})});
  /* case-study filters */
  $$('[data-filters]').forEach(function(box){var items=$$('[data-cat]');
    $$('button',box).forEach(function(btn){btn.addEventListener('click',function(){$$('button',box).forEach(function(o){o.classList.remove('on')});btn.classList.add('on');var f=btn.getAttribute('data-f');
      items.forEach(function(it){it.style.display=(f==='all'||(it.getAttribute('data-cat')||'').indexOf(f)>-1)?'':'none'})})})});
  /* package buttons: use the Razorpay link when it has been added, otherwise fall back to the contact form */
  $$('[data-pay]').forEach(function(a){var k=a.getAttribute('data-pay'), u=window.TGU&&window.TGU.razorpay&&window.TGU.razorpay[k];
    if(u){a.href=u;a.target='_blank';a.rel='noopener'}else{a.href='contact.html?package='+k+'#form'}});
  /* prefill the contact form from ?package= */
  var q=new URLSearchParams(location.search), pk=q.get('package'), nm={foundation:'Foundation Package (₹45,000/month)',growth:'Growth Package (₹1,05,000/month)',scale:'Scale Package (₹1,85,000/month)'};
  if(pk&&nm[pk]){var sel=$('select[name="interest"]'); if(sel){for(var i=0;i<sel.options.length;i++){if(sel.options[i].value===nm[pk]){sel.selectedIndex=i}}}}
  /* forms -> Web3Forms -> hello@thegrowthunion.com */
  $$('form[data-web3]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();
    var m=$('.msg',f), btn=$('button[type=submit]',f), key=window.TGU&&window.TGU.web3formsKey;
    var say=function(t){if(m){m.textContent=t;m.className='msg err'}};
    if($('.hp',f)&&$('.hp',f).value){return}
    if(!key||key.indexOf('PASTE')===0){say('Form is not connected yet. Please WhatsApp us on +91 95186-04324 or email hello@thegrowthunion.com.');return}
    var fd=new FormData(f); fd.append('access_key',key); fd.append('from_name','The Growth Union website'); fd.append('page',location.pathname);
    if(m)m.className='msg'; var old=btn.textContent; btn.disabled=true; btn.textContent='Sending…';
    fetch('https://api.web3forms.com/submit',{method:'POST',body:fd}).then(function(r){return r.json()}).then(function(j){
      if(j&&j.success){ if(window.gtag)gtag('event',(window.TGU&&window.TGU.gaEvent)||'generate_lead',{form:f.getAttribute('data-web3')}); location.href='thank-you.html' }
      else{say('Something went wrong. Please WhatsApp us on +91 95186-04324 or email hello@thegrowthunion.com.');btn.disabled=false;btn.textContent=old}
    }).catch(function(){say('Network problem. Please WhatsApp us on +91 95186-04324 or email hello@thegrowthunion.com.');btn.disabled=false;btn.textContent=old})})});
  /* hero headline slider */
  var hs=$$('.hslide'); if(hs.length>1&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){var hi=0;setInterval(function(){hs[hi].classList.remove('on');hi=(hi+1)%hs.length;hs[hi].classList.add('on')},6000)}
  var y=$('#yr'); if(y)y.textContent=new Date().getFullYear();
})();
