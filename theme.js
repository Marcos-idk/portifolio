const themeControl = document.getElementById('themeToggle');
const themeGlyph = document.getElementById('themeGlyph');
const themeLabel = document.getElementById('themeText');

function updateThemeControl() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeControl.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
  themeControl.setAttribute('aria-pressed', String(dark));
  themeGlyph.textContent = dark ? '☀' : '☾';
  themeLabel.textContent = dark ? 'Claro' : 'Escuro';
  const color = document.querySelector('meta[name="theme-color"]');
  if (color) color.content = dark ? '#1b241f' : '#f8f7f3';
}

if (themeControl) {
  updateThemeControl();
  themeControl.addEventListener('click', () => {
    document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('portfolio-theme', document.documentElement.dataset.theme); } catch {}
    updateThemeControl();
  });
}
