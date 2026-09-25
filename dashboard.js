document.querySelectorAll('[data-dashboard-action]').forEach((button) => button.addEventListener('click', () => {
  button.textContent = 'Saved ✓';
  setTimeout(() => { button.textContent = button.dataset.dashboardAction; }, 1800);
}));
