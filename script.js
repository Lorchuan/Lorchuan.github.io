const languageButton = document.querySelector('#language');
const translatable = [...document.querySelectorAll('[data-en]')];
const translatedImages = [...document.querySelectorAll('[data-en-alt]')];
translatable.forEach(el => { el.dataset.zh = el.textContent; });
translatedImages.forEach(el => { el.dataset.zhAlt = el.alt; });
let language = 'zh';
function setLanguage(next) {
  language = next === 'en' ? 'en' : 'zh';
  document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
  translatable.forEach(el => { el.textContent = el.dataset[language]; });
  translatedImages.forEach(el => { el.alt = language === 'en' ? el.dataset.enAlt : el.dataset.zhAlt; });
  languageButton.innerHTML = language === 'en' ? '中文 <span aria-hidden="true">↗</span>' : 'EN <span aria-hidden="true">↗</span>';
  languageButton.setAttribute('aria-label', language === 'en' ? '切换为中文' : 'Switch to English');
  document.querySelector('#copy-status').textContent = '';
  try { localStorage.setItem('bt-language', language); } catch {}
}
try { setLanguage(localStorage.getItem('bt-language') || 'zh'); } catch { setLanguage('zh'); }
languageButton.addEventListener('click', () => setLanguage(language === 'zh' ? 'en' : 'zh'));

const lightbox = document.querySelector('#lightbox');
document.querySelectorAll('[data-zoom]').forEach(button => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    lightbox.querySelector('img').src = image.src;
    lightbox.querySelector('img').alt = image.alt;
    lightbox.querySelector('p').textContent = image.alt;
    lightbox.showModal();
    document.body.style.overflow = 'hidden';
  });
});
lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
lightbox.addEventListener('close', () => { document.body.style.overflow = ''; });

document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('tbm25@mails.tsinghua.edu.cn');
    status.textContent = language === 'en' ? 'Email address copied.' : '邮箱已复制。';
  } catch {
    status.textContent = language === 'en' ? 'Please copy the email address above or click it to send a message.' : '请复制上方邮箱，或点击邮箱发送邮件。';
  }
});
document.querySelector('#print').addEventListener('click', () => window.print());
const links = [...document.querySelectorAll('.nav-link')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
    });
  }, { rootMargin: '-15% 0px -55% 0px' });
  ['work','experience','about'].forEach(id => observer.observe(document.getElementById(id)));
}
