// Main page helpers (featured events, shared utilities)

async function loadFeaturedEvents(limit = 6) {
  const grid = document.getElementById('featuredEventsGrid');
  if (!grid) return;

  try {
    const res = await fetch('http://localhost:5001/api/events');
    const events = await res.json();
    const featured = events.slice(0, limit);

    if (featured.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#6b7280;">No featured events</p>';
      return;
    }

    grid.innerHTML = featured.map(ev => `
      <div class="card event-card" onclick="goToEvent('${ev._id}')">
        <div class="event-image-placeholder">🎪</div>
        <div class="event-info">
          <div class="event-title">${ev.title}</div>
          <div class="event-date">📅 ${new Date(ev.date).toLocaleDateString()}</div>
          <div class="event-price">₦${ev.price?.toLocaleString() || 'Free'}</div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Failed to load featured events', err);
    if (typeof showAlert === 'function') showAlert('Failed to load featured events', 'error');
  }
}

function goToEvent(id) {
  window.location.href = `event-details.html?id=${id}`;
}

// initialize featured on index
if (document.body.contains(document.getElementById('featuredEventsGrid'))) {
  loadFeaturedEvents();
}
