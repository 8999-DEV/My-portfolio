// Smooth scroll with header offset
(function(){
  const header = document.querySelector('.site-header');
  const getOffset = () => header.getBoundingClientRect().height - 1;
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - getOffset();
      window.scrollTo({ top, behavior: 'smooth' });
      nav.classList.remove('open');
      menuBtn.classList.remove('open');
    });
  });
})();

// Mobile nav toggle
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuBtn.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !menuBtn.contains(e.target)){
    nav.classList.remove('open');
    menuBtn.classList.remove('open');
  }
});

// Active link highlight
const sections = Array.from(document.querySelectorAll('main section[id]'));
const links = Array.from(document.querySelectorAll('.nav a'));
function onScroll(){
  const pos = window.scrollY + window.innerHeight * 0.25;
  let current = sections[0]?.id || '';
  for (const s of sections){ if (pos >= s.offsetTop) current = s.id; }
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', onScroll);

// Reveal animations
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('show'); io.unobserve(entry.target); }
  });
},{threshold:0.14});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Contact form mailto fallback
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const to = 'you@example.com'; // replace with your email
  const subject = encodeURIComponent('Portfolio Contact from ' + name);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  status.textContent = 'Opening your email client...';
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
