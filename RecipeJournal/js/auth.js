
document.addEventListener('DOMContentLoaded', () => {

  const tabs      = document.querySelectorAll('.auth-tab');
  const loginForm = document.getElementById('login-form');
  const regForm   = document.getElementById('register-form');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      const target = tab.dataset.tab;
      if (target === 'login') {
        loginForm.classList.add('active');
        regForm.classList.remove('active');
      } else {
        regForm.classList.add('active');
        loginForm.classList.remove('active');
      }
      clearAllErrors();
    });
  });

  if (new URLSearchParams(window.location.search).get('mode') === 'register') {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
    const regTab = document.querySelector('[data-tab="register"]');
    if (regTab) { regTab.classList.add('active'); regTab.setAttribute('aria-selected','true'); }
    loginForm.classList.remove('active');
    regForm.classList.add('active');
  }


  function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);
    if (input) input.classList.add('error');
    if (error) { error.textContent = message; error.classList.add('show'); }
  }
  function clearError(fieldId) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);
    if (input) input.classList.remove('error');
    if (error) error.classList.remove('show');
  }
  function clearAllErrors() {
    document.querySelectorAll('.field-error').forEach(e => e.classList.remove('show'));
    document.querySelectorAll('.form-group input').forEach(i => i.classList.remove('error'));
  }
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

 
  function getUsers()       { return JSON.parse(localStorage.getItem('ss_users') || '[]'); }
  function saveUsers(users) { localStorage.setItem('ss_users', JSON.stringify(users)); }
  function setSession(user) {
    const { password, ...safe } = user;
    localStorage.setItem('ss_session', JSON.stringify(safe));
  }

  
  const registerBtn = document.getElementById('register-btn');
  if (registerBtn) {
    registerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      clearAllErrors();

      const name     = document.getElementById('reg-name').value.trim();
      const email    = document.getElementById('reg-email').value.trim().toLowerCase();
      const password = document.getElementById('reg-password').value;
      const confirm  = document.getElementById('reg-confirm').value;
      let valid = true;

      if (!name)                     { showError('reg-name',     'Full name is required.');                    valid = false; }
      if (!email)                    { showError('reg-email',    'Email is required.');                        valid = false; }
      else if (!isValidEmail(email)) { showError('reg-email',    'Please enter a valid email address.');       valid = false; }
      if (!password)                 { showError('reg-password', 'Password is required.');                     valid = false; }
      else if (password.length < 6)  { showError('reg-password', 'Password must be at least 6 characters.');  valid = false; }
      if (!confirm)                  { showError('reg-confirm',  'Please confirm your password.');             valid = false; }
      else if (password !== confirm) { showError('reg-confirm',  'Passwords do not match.');                   valid = false; }
      if (!valid) return;

      const users = getUsers();
      if (users.find(u => u.email === email)) {
        showError('reg-email', 'An account with this email already exists.');
        return;
      }

      const newUser = { name, email, password };
      users.push(newUser);
      saveUsers(users);
      setSession(newUser);

      showToast(`Welcome to Sweet & Savory Kitchen, ${name.split(' ')[0]}!`, 'success');
      setTimeout(() => window.location.href = 'cooking.html', 1400);
    });

    ['reg-name','reg-email','reg-password','reg-confirm'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => clearError(id));
    });
  }

  
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      clearAllErrors();

      const email    = document.getElementById('login-email').value.trim().toLowerCase();
      const password = document.getElementById('login-password').value;
      let valid = true;

      if (!email)                    { showError('login-email',    'Email is required.');                  valid = false; }
      else if (!isValidEmail(email)) { showError('login-email',    'Please enter a valid email address.'); valid = false; }
      if (!password)                 { showError('login-password', 'Password is required.');               valid = false; }
      if (!valid) return;

      const users = getUsers();
      const user  = users.find(u => u.email === email && u.password === password);

      if (!user) {
        showError('login-email',    'Invalid email or password.');
        showError('login-password', ' ');
        showToast('Invalid credentials. Please try again.', 'error');
        return;
      }

      setSession(user);
      showToast(`Welcome back, ${user.name.split(' ')[0]}!`, 'success');
      const redirect = new URLSearchParams(window.location.search).get('redirect') || 'cooking.html';
      setTimeout(() => window.location.href = redirect, 1200);
    });

    ['login-email','login-password'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => clearError(id));
    });

    document.getElementById('login-password')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') loginBtn.click();
    });
    document.getElementById('login-email')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('login-password')?.focus();
    });
  }

  document.getElementById('reg-confirm')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') registerBtn?.click();
  });


  const session = JSON.parse(localStorage.getItem('ss_session') || 'null');
  if (session) {
    // Redirect away from both index.html and auth.html if already logged in
    const onAuthPage = window.location.pathname.includes('auth.html') ||
                       window.location.pathname.endsWith('/') ||
                       window.location.pathname.endsWith('index.html');
    if (onAuthPage) window.location.href = 'cooking.html';
  }
});
