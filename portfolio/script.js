const tabs = Array.from(document.querySelectorAll('[role="tab"][data-tab]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

function activateTab(name, { focus = false, updateHash = false } = {}) {
  const selected = tabs.find(tab => tab.dataset.tab === name);
  if (!selected) return;

  tabs.forEach(tab => {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  panels.forEach(panel => {
    panel.hidden = panel.id !== `painel-${name}`;
  });

  if (focus) selected.focus();
  if (updateHash) history.replaceState(null, '', `#${name}`);
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  tab.addEventListener('keydown', event => {
    let next = null;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === null) return;
    event.preventDefault();
    activateTab(tabs[next].dataset.tab, {focus: true});
  });
});

function activateFromHash() {
  const name = location.hash.slice(1).toLowerCase();
  if (tabs.some(tab => tab.dataset.tab === name)) {
    activateTab(name);
    document.querySelector('#projetos')?.scrollIntoView({block: 'start'});
  }
}
window.addEventListener('hashchange', activateFromHash);
activateFromHash();
document.querySelector('#ano').textContent = new Date().getFullYear();
