const themeButton=document.getElementById('themeToggle');
const themeGlyph=document.getElementById('themeGlyph');
const themeText=document.getElementById('themeText');
function refreshTheme(){const dark=document.documentElement.dataset.theme==='dark';if(themeGlyph)themeGlyph.textContent=dark?'☀':'◐';if(themeText)themeText.textContent=dark?'Claro':'Tema';const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=dark?'#0d0d0d':'#ffffff';}
if(themeButton){refreshTheme();themeButton.addEventListener('click',()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('portfolio-theme',document.documentElement.dataset.theme);}catch(e){}refreshTheme();});}
