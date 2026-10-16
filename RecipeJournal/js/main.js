
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
}


function updateNavUser() {
  const session    = JSON.parse(localStorage.getItem('ss_session') || 'null');
  const userArea   = document.getElementById('nav-user-area');
  const mobileUser = document.getElementById('mobile-user-area');
  const navLinks   = document.getElementById('nav-links');
  const mobileMenuEl = document.getElementById('mobile-menu');

  
  const authLinksHTML = `
    <li><a href="cooking.html">Cooking</a></li>
    <li><a href="baking.html">Baking</a></li>
    <li><a href="favorites.html">Favorites</a></li>
    <li><a href="manage.html">Manage Recipes</a></li>`;

  const mobileAuthLinksHTML = `
    <a href="cooking.html" role="menuitem">Cooking</a>
    <a href="baking.html" role="menuitem">Baking</a>
    <a href="favorites.html" role="menuitem">Favorites</a>
    <a href="manage.html" role="menuitem">Manage Recipes</a>`;

  if (session) {
    
    if (navLinks && !navLinks.querySelector('a[href="cooking.html"]')) {
      navLinks.insertAdjacentHTML('beforeend', authLinksHTML);
    }
    if (mobileMenuEl && !mobileMenuEl.querySelector('a[href="cooking.html"]')) {
      const userDiv = mobileMenuEl.querySelector('#mobile-user-area');
      if (userDiv) userDiv.insertAdjacentHTML('beforebegin', mobileAuthLinksHTML);
    }

    const firstName = session.name.split(' ')[0];
    if (userArea) userArea.innerHTML = `
      <div class="nav-user">
        <span>Hi, ${escapeHtml(firstName)}</span>
        <button class="btn-logout" onclick="logout()">Logout</button>
      </div>`;
    if (mobileUser) mobileUser.innerHTML = `
      <div class="mobile-user-info">Hi, ${escapeHtml(firstName)}</div>
      <button onclick="logout()" style="
        margin:4px 14px 0; padding:10px 14px; border-radius:12px;
        background:var(--pink-100); color:var(--pink-600); font-weight:600;
        font-size:.9rem; text-align:left; border:none; cursor:pointer; font-family:inherit;">
        Logout
      </button>`;
  } else {
    if (userArea)   userArea.innerHTML   = `<a href="auth.html" class="btn btn-primary" style="padding:9px 22px;font-size:.88rem;">Login</a>`;
    if (mobileUser) mobileUser.innerHTML = `<a href="auth.html" style="font-weight:600;color:var(--pink-600);">Login / Register</a>`;
  }


  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });
}

window.logout = function () {
  localStorage.removeItem('ss_session');
  showToast('Logged out. See you soon!', 'info');
  setTimeout(() => window.location.href = 'index.html', 1200);
};

window.requireAuth = function () {
  const session = JSON.parse(localStorage.getItem('ss_session') || 'null');
  if (!session) {
    showToast('Please log in to access this page.', 'error');
    setTimeout(() => window.location.href = 'auth.html', 1400);
    return false;
  }
  return true;
};


window.showToast = function (message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✓', error: '✕', info: 'i' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || 'i'}</span><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3100);
};

/* ── HTML escape helper ────────────────────────────────────── */
window.escapeHtml = function (str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
};

/* ── Modal ─────────────────────────────────────────────────── */
window.openModal = function (recipe) {
  const favorites = getFavorites();
  const isSaved   = favorites.some(f => f.id === recipe.id);
  const overlay   = document.getElementById('modal-overlay');
  if (!overlay) return;

  overlay.querySelector('#modal-img').src  = recipe.image;
  overlay.querySelector('#modal-img').alt  = recipe.name;
  overlay.querySelector('#modal-title').textContent = recipe.name;
  overlay.querySelector('#modal-prep').textContent  = recipe.prepTime;
  overlay.querySelector('#modal-cook').textContent  = recipe.cookTime;
  overlay.querySelector('#modal-servings').textContent = `${recipe.servings} servings`;

  // Ingredients
  const ingList = overlay.querySelector('#modal-ingredients');
  ingList.innerHTML = recipe.ingredients.map(i => `<li>${escapeHtml(i)}</li>`).join('');

  // Steps
  const stepsList = overlay.querySelector('#modal-steps');
  stepsList.innerHTML = recipe.steps.map((s, i) =>
    `<li><span class="step-num">${i + 1}</span><span>${escapeHtml(s)}</span></li>`
  ).join('');

  // Favorite button
  const favBtn = overlay.querySelector('#btn-favorite');
  favBtn.dataset.id = recipe.id;
  updateFavBtn(favBtn, isSaved);

  favBtn.onclick = () => {
    if (!requireAuth()) return;
    toggleFavorite(recipe);
    const nowSaved = getFavorites().some(f => f.id === recipe.id);
    updateFavBtn(favBtn, nowSaved);
    showToast(nowSaved ? 'Added to favorites!' : 'Removed from favorites.', nowSaved ? 'success' : 'info');
  };

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  overlay.querySelector('.modal-close').focus();
};

function updateFavBtn(btn, saved) {
  btn.classList.toggle('saved', saved);
  btn.innerHTML = saved
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> Saved`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Save to Favorites`;
}

window.closeModal = function () {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
};

document.addEventListener('click', e => {
  const overlay = document.getElementById('modal-overlay');
  if (overlay && e.target === overlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ── Favorites helpers ─────────────────────────────────────── */
function getFavKey() {
  const session = JSON.parse(localStorage.getItem('ss_session') || 'null');
  return session ? `ss_favs_${session.email}` : null;
}

window.getFavorites = function () {
  const key = getFavKey();
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key) || '[]');
};

window.toggleFavorite = function (recipe) {
  const key = getFavKey();
  if (!key) return;
  let favs = getFavorites();
  const idx = favs.findIndex(f => f.id === recipe.id);
  if (idx >= 0) {
    favs.splice(idx, 1);
  } else {
    favs.push(recipe);
  }
  localStorage.setItem(key, JSON.stringify(favs));
};

/* ── Render recipe cards ───────────────────────────────────── */
window.renderRecipes = function (recipes, containerId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = '';

  recipes.forEach(r => {
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open ${r.name} recipe`);
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${r.image}" alt="${escapeHtml(r.name)}" loading="lazy">
      </div>
      <div class="card-body">
        <h3>${escapeHtml(r.name)}</h3>
      </div>`;
    card.addEventListener('click', () => openModal(r));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(r); });
    grid.appendChild(card);
  });
};

/* ── Real-time search + filter ─────────────────────────────── */
window.initSearch = function (allRecipes, gridId) {
  const searchInput = document.getElementById('search-input');
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const noResults   = document.getElementById('no-results');

  let currentTag = 'all';

  function applyFilters() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const filtered = allRecipes.filter(r => {
      const matchesName = r.name.toLowerCase().includes(query);
      const matchesTag  = currentTag === 'all' || r.tags.includes(currentTag);
      return matchesName && matchesTag;
    });

    renderRecipes(filtered, gridId);

    if (noResults) {
      noResults.style.display = filtered.length === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTag = btn.dataset.tag;
      applyFilters();
    });
  });
};

/* ── Init on DOM ready ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', updateNavUser);
