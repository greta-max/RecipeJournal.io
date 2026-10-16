

document.addEventListener('DOMContentLoaded', () => {

  if (!requireAuth()) return;

  const CUSTOM_KEY = 'ss_custom_recipes';
  const getAll  = () => JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]');
  const saveAll = v  => localStorage.setItem(CUSTOM_KEY, JSON.stringify(v));

  function genId() {
    return 'r_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
  }

  
  let editingId        = null;
  let deleteTarget     = null;
  let searchQuery      = '';
  let currentImageData = null;

  const FALLBACK_IMG = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=80';

  
  const formTitle   = document.getElementById('form-title');
  const btnSave     = document.getElementById('btn-save');
  const btnCancel   = document.getElementById('btn-cancel-edit');
  const manageList  = document.getElementById('manage-list');
  const recipeCount = document.getElementById('recipe-count');
  const searchInput = document.getElementById('manage-search');

  const fields = {
    name:        document.getElementById('r-name'),
    category:    document.getElementById('r-category'),
    tags:        document.getElementById('r-tags'),
    prepTime:    document.getElementById('r-prep'),
    cookTime:    document.getElementById('r-cook'),
    servings:    document.getElementById('r-servings'),
    ingredients: document.getElementById('r-ingredients'),
    steps:       document.getElementById('r-steps'),
  };

  const imgFileInput  = document.getElementById('r-image-file');
  const imgPreview    = document.getElementById('img-preview');
  const imgUploadWrap = document.getElementById('img-upload-wrap');
  const btnRemoveImg  = document.getElementById('btn-remove-img');


  imgUploadWrap.addEventListener('click', () => imgFileInput.click());

  imgFileInput.addEventListener('change', () => {
    const file = imgFileInput.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { showToast('Please select an image file.', 'error'); return; }
    if (file.size > 5 * 1024 * 1024)    { showToast('Image must be under 5 MB.', 'error'); return; }
    const reader = new FileReader();
    reader.onload = e => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  });

  btnRemoveImg.addEventListener('click', e => { e.stopPropagation(); clearImagePreview(); });

  function setImagePreview(src) {
    currentImageData = src;
    imgPreview.innerHTML = `<img src="${src}" alt="Preview" />`;
    imgPreview.classList.add('has-image');
    btnRemoveImg.style.display = 'block';
  }

  function clearImagePreview() {
    currentImageData = null;
    imgFileInput.value = '';
    imgPreview.classList.remove('has-image');
    imgPreview.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <span>Click to upload image</span>`;
    btnRemoveImg.style.display = 'none';
  }

  
  function showErr(key, msg) {
    const err = document.getElementById(`r-${key}-error`);
    if (err) { err.textContent = msg; err.classList.add('show'); }
    const inp = fields[key];
    if (inp) inp.classList.add('error');
  }
  function clearErrors() {
    document.querySelectorAll('.form-panel .field-error')
      .forEach(e => { e.classList.remove('show'); e.textContent = ''; });
    document.querySelectorAll('.form-panel input, .form-panel select, .form-panel textarea')
      .forEach(i => i.classList.remove('error'));
  }
  function validateForm() {
    clearErrors();
    let ok = true;
    const v = getFormValues();
    if (!v.name)               { showErr('name',        'Recipe name is required.');        ok = false; }
    if (!v.category)           { showErr('category',    'Please select a category.');       ok = false; }
    if (!v.prepTime)           { showErr('prep',        'Prep time is required.');          ok = false; }
    if (!v.cookTime)           { showErr('cook',        'Cook time is required.');          ok = false; }
    if (!v.servings || v.servings < 1) { showErr('servings', 'Enter a valid serving count.'); ok = false; }
    if (!v.ingredients.length) { showErr('ingredients', 'Add at least one ingredient.');   ok = false; }
    if (!v.steps.length)       { showErr('steps',       'Add at least one step.');         ok = false; }
    return ok;
  }


  function getFormValues() {
    return {
      name:        fields.name.value.trim(),
      category:    fields.category.value,
      tags:        fields.tags.value.split(',').map(t => t.trim().toLowerCase()).filter(Boolean),
      prepTime:    fields.prepTime.value.trim(),
      cookTime:    fields.cookTime.value.trim(),
      servings:    parseInt(fields.servings.value, 10) || 0,
      image:       currentImageData || FALLBACK_IMG,
      ingredients: fields.ingredients.value.split('\n').map(s => s.trim()).filter(Boolean),
      steps:       fields.steps.value.split('\n').map(s => s.trim()).filter(Boolean),
    };
  }

  function populateForm(recipe) {
    fields.name.value        = recipe.name;
    fields.category.value    = recipe.category;
    fields.tags.value        = (recipe.tags || []).join(', ');
    fields.prepTime.value    = recipe.prepTime;
    fields.cookTime.value    = recipe.cookTime;
    fields.servings.value    = recipe.servings;
    fields.ingredients.value = (recipe.ingredients || []).join('\n');
    fields.steps.value       = (recipe.steps || []).join('\n');
    recipe.image ? setImagePreview(recipe.image) : clearImagePreview();
  }

  function resetForm() {
    editingId = null;
    clearErrors();
    Object.values(fields).forEach(f => { f.value = ''; });
    clearImagePreview();
    formTitle.textContent = 'Add New Recipe';
    btnSave.textContent   = 'Save Recipe';
    btnCancel.classList.remove('visible');
    document.querySelectorAll('.recipe-list-item.editing').forEach(el => el.classList.remove('editing'));
    fields.name.focus();
  }

  
  btnSave.addEventListener('click', () => {
    if (!validateForm()) return;
    const v   = getFormValues();
    const all = getAll();

    if (editingId === null) {
      all.push({ ...v, id: genId() });
      showToast(`"${v.name}" added to ${v.category}!`, 'success');
    } else {
      const idx = all.findIndex(r => r.id === editingId);
      if (idx >= 0) all[idx] = { ...all[idx], ...v };
      showToast(`"${v.name}" updated!`, 'success');
    }

    saveAll(all);
    resetForm();
    renderList();
  });

  btnCancel.addEventListener('click', resetForm);

  
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.toLowerCase();
    renderList();
  });

  
  function renderList() {
    const all      = getAll();
    const filtered = searchQuery
      ? all.filter(r => r.name.toLowerCase().includes(searchQuery))
      : all;

    recipeCount.textContent = `${filtered.length} recipe${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      manageList.innerHTML = `<div class="empty-list">No recipes yet. Add one using the form.</div>`;
      return;
    }

    manageList.innerHTML = '';

    const cooking = filtered.filter(r => r.category === 'cooking');
    const baking  = filtered.filter(r => r.category === 'baking');

    if (cooking.length) {
      manageList.insertAdjacentHTML('beforeend',
        `<div style="font-size:.78rem;font-weight:700;color:var(--gray-400);
          text-transform:uppercase;letter-spacing:.06em;margin:12px 0 6px;">
          Cooking (${cooking.length})</div>`);
      cooking.forEach(r => manageList.appendChild(buildItem(r)));
    }
    if (baking.length) {
      manageList.insertAdjacentHTML('beforeend',
        `<div style="font-size:.78rem;font-weight:700;color:var(--gray-400);
          text-transform:uppercase;letter-spacing:.06em;margin:16px 0 6px;">
          Baking (${baking.length})</div>`);
      baking.forEach(r => manageList.appendChild(buildItem(r)));
    }
  }


  function buildItem(recipe) {
    const isEditing  = recipe.id === editingId;
    const badgeClass = recipe.category === 'cooking' ? 'badge-cooking' : 'badge-baking';
    const badgeLabel = recipe.category === 'cooking' ? 'Cooking' : 'Baking';

    const item = document.createElement('div');
    item.className = `recipe-list-item${isEditing ? ' editing' : ''}`;
    item.dataset.id = recipe.id;
    item.innerHTML = `
      <img class="list-item-img" src="${recipe.image || FALLBACK_IMG}"
           alt="${escapeHtml(recipe.name)}" loading="lazy"
           onerror="this.src='${FALLBACK_IMG}'" />
      <div class="list-item-info">
        <h4>${escapeHtml(recipe.name)}</h4>
        <p>${recipe.prepTime} prep &bull; ${recipe.cookTime} cook &bull; ${recipe.servings} servings</p>
      </div>
      <span class="list-item-badge ${badgeClass}">${badgeLabel}</span>
      <div class="list-item-actions">
        <button class="btn-edit-item" title="Edit" aria-label="Edit ${escapeHtml(recipe.name)}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button class="btn-delete-item" title="Delete" aria-label="Delete ${escapeHtml(recipe.name)}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
        </button>
      </div>`;

    item.querySelector('.btn-edit-item').addEventListener('click',   () => editRecipe(recipe));
    item.querySelector('.btn-delete-item').addEventListener('click', () => openConfirm(recipe.id, recipe.name));
    return item;
  }


  function editRecipe(recipe) {
    editingId = recipe.id;
    populateForm(recipe);
    formTitle.textContent = 'Edit Recipe';
    btnSave.textContent   = 'Update Recipe';
    btnCancel.classList.add('visible');
    renderList();
    document.getElementById('form-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  
  function openConfirm(id, name) {
    deleteTarget = id;
    document.getElementById('confirm-msg').textContent = `"${name}" will be permanently removed.`;
    document.getElementById('confirm-overlay').classList.add('open');
  }

  window.closeConfirm = function () {
    deleteTarget = null;
    document.getElementById('confirm-overlay').classList.remove('open');
  };

  document.getElementById('btn-confirm-delete').addEventListener('click', () => {
    if (deleteTarget === null) return;
    saveAll(getAll().filter(r => r.id !== deleteTarget));
    if (editingId === deleteTarget) resetForm();
    showToast('Recipe deleted.', 'info');
    closeConfirm();
    renderList();
  });

  document.getElementById('confirm-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('confirm-overlay')) closeConfirm();
  });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeConfirm(); });

  renderList();
});
