

function getMergedRecipes() {
  return JSON.parse(localStorage.getItem('ss_custom_recipes') || '[]');
}

document.addEventListener('DOMContentLoaded', () => {

  const page = window.location.pathname.split('/').pop() || 'index.html';

  if (page === 'cooking.html') {
    if (!requireAuth()) return;
    const all = getMergedRecipes().filter(r => r.category === 'cooking');
    renderRecipes(all, 'recipe-grid');
    initSearch(all, 'recipe-grid');
  }

  if (page === 'baking.html') {
    if (!requireAuth()) return;
    const all = getMergedRecipes().filter(r => r.category === 'baking');
    renderRecipes(all, 'recipe-grid');
    initSearch(all, 'recipe-grid');
  }

  if (page === 'favorites.html') {
    if (!requireAuth()) return;
    const favs     = getFavorites();
    const grid     = document.getElementById('recipe-grid');
    const emptyMsg = document.getElementById('favorites-empty');
    const countEl  = document.getElementById('fav-count');
    if (!grid) return;
    if (countEl) countEl.textContent = favs.length;
    if (favs.length === 0) {
      grid.innerHTML = '';
      if (emptyMsg) emptyMsg.classList.remove('hidden');
    } else {
      if (emptyMsg) emptyMsg.classList.add('hidden');
      renderRecipes(favs, 'recipe-grid');
    }
  }
});
