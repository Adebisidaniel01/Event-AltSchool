// Lightweight auth helpers (used by auth pages if needed)

function parseJwt(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch { return null; }
}

function currentUserRole() {
  const token = localStorage.getItem('accessToken');
  const p = parseJwt(token);
  return p?.role || null;
}

function requireAuth(redirect = 'login.html') {
  const token = localStorage.getItem('accessToken');
  if (!token) window.location.href = redirect;
}

function requireCreator() {
  const role = currentUserRole();
  if (role !== 'CREATOR') {
    showAlert('You must be a creator to access this page', 'error');
    setTimeout(() => window.location.href = 'index.html', 1200);
  }
}
