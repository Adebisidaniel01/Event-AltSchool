// Shared API helpers for frontend

function showAlert(message, type = 'success', timeout = 3000) {
  const container = document.getElementById('alertContainer');
  if (!container) return;

  const div = document.createElement('div');
  div.className = `alert ${type === 'error' ? 'alert-error' : type === 'warning' ? 'alert-warning' : 'alert-success'}`;
  div.innerHTML = `<span>${message}</span><button class="close-alert" onclick="this.parentElement.remove()">×</button>`;
  container.appendChild(div);

  if (timeout) setTimeout(() => div.remove(), timeout);
}

function clearAlerts() {
  const container = document.getElementById('alertContainer');
  if (!container) return;
  container.innerHTML = '';
}

function getAuthHeader() {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function authFetch(url, opts = {}) {
  opts.headers = opts.headers || {};
  const authHeader = getAuthHeader();
  opts.headers = { 'Content-Type': 'application/json', ...opts.headers, ...authHeader };

  const res = await fetch(url, opts);
  if (res.status === 401) {
    // unauthorized
    logout();
    throw new Error('Unauthorized');
  }
  return res;
}

function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  // update nav if present
  updateNavForAuth();
  window.location.href = 'index.html';
}

function updateNavForAuth() {
  const token = localStorage.getItem('accessToken');
  const userMenu = document.getElementById('userMenuContainer');
  const logoutContainer = document.getElementById('logoutContainer');
  const authLinks = document.getElementById('authLinks');
  if (token) {
    if (userMenu) userMenu.classList.remove('hidden');
    if (logoutContainer) logoutContainer.classList.remove('hidden');
    if (authLinks) authLinks.classList.add('hidden');
  } else {
    if (userMenu) userMenu.classList.add('hidden');
    if (logoutContainer) logoutContainer.classList.add('hidden');
    if (authLinks) authLinks.classList.remove('hidden');
  }
}

// run on load
if (document.readyState !== 'loading') updateNavForAuth(); else document.addEventListener('DOMContentLoaded', updateNavForAuth);
