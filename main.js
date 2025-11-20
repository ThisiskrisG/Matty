
async function loadQRData() {
  const res = await fetch('qr_index.json');
  const data = await res.json();
  return data;
}

const state = {
  items: [],
  filterStyle: 'all',
  filterKind: 'all',
  search: '',
};

function applyFilters() {
  const grid = document.querySelector('.grid');
  grid.innerHTML = '';
  const searchLower = state.search.trim().toLowerCase();
  let filtered = state.items.slice();

  if (state.filterStyle !== 'all') {
    filtered = filtered.filter(x => x.style === state.filterStyle);
  }
  if (state.filterKind !== 'all') {
    filtered = filtered.filter(x => x.kind === state.filterKind);
  }
  if (searchLower) {
    filtered = filtered.filter(x =>
      (x.name || '').toLowerCase().includes(searchLower) ||
      (x.route || '').toLowerCase().includes(searchLower)
    );
  }

  if (!filtered.length) {
    const div = document.createElement('div');
    div.style.color = '#aaa';
    div.style.fontSize = '13px';
    div.textContent = 'No QR codes match your filters.';
    grid.appendChild(div);
    return;
  }

  for (const item of filtered) {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = item.file;
    img.alt = item.name || '';
    card.appendChild(img);

    const badgesRow = document.createElement('div');
    badgesRow.className = 'badges-row';

    const styleBadge = document.createElement('span');
    styleBadge.className = 'badge style-' + item.style;
    styleBadge.textContent = item.style.replace('_', ' ');
    badgesRow.appendChild(styleBadge);

    const kindBadge = document.createElement('span');
    kindBadge.className = 'badge kind-' + item.kind;
    kindBadge.textContent = item.kind;
    badgesRow.appendChild(kindBadge);

    card.appendChild(badgesRow);

    const nameDiv = document.createElement('div');
    nameDiv.className = 'card-name';
    nameDiv.textContent = item.name || '';
    card.appendChild(nameDiv);

    const routeDiv = document.createElement('div');
    routeDiv.className = 'card-route';
    routeDiv.textContent = item.route || 'No route inferred';
    card.appendChild(routeDiv);

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const btnOpen = document.createElement('button');
    btnOpen.className = 'btn-small';
    btnOpen.textContent = 'Open image';
    btnOpen.onclick = () => {
      window.open(item.file, '_blank');
    };
    actions.appendChild(btnOpen);

    const btnDownload = document.createElement('button');
    btnDownload.className = 'btn-small secondary';
    btnDownload.textContent = 'Download PNG';
    btnDownload.onclick = () => {
      const a = document.createElement('a');
      a.href = item.file;
      a.download = item.name || 'matty-qr.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    actions.appendChild(btnDownload);

    if (item.route) {
      const btnCopy = document.createElement('button');
      btnCopy.className = 'btn-small secondary';
      btnCopy.textContent = 'Copy route';
      btnCopy.onclick = async () => {
        try {
          await navigator.clipboard.writeText(item.route);
          btnCopy.textContent = 'Copied!';
          setTimeout(() => (btnCopy.textContent = 'Copy route'), 900);
        } catch (e) {
          alert('Route: ' + item.route);
        }
      };
      actions.appendChild(btnCopy);
    }

    card.appendChild(actions);
    grid.appendChild(card);
  }
}

function setFilterStyle(style) {
  state.filterStyle = style;
  document.querySelectorAll('[data-filter-style]').forEach(el => {
    el.classList.toggle('active', el.dataset.filterStyle === style);
  });
  applyFilters();
}

function setFilterKind(kind) {
  state.filterKind = kind;
  document.querySelectorAll('[data-filter-kind]').forEach(el => {
    el.classList.toggle('active', el.dataset.filterKind === kind);
  });
  applyFilters();
}

function setupUI() {
  document.querySelectorAll('[data-filter-style]').forEach(el => {
    el.addEventListener('click', () => setFilterStyle(el.dataset.filterStyle));
  });
  document.querySelectorAll('[data-filter-kind]').forEach(el => {
    el.addEventListener('click', () => setFilterKind(el.dataset.filterKind));
  });

  const searchInput = document.querySelector('#search');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      state.search = e.target.value;
      applyFilters();
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  setupUI();
  try {
    state.items = await loadQRData();
  } catch (e) {
    console.error('Failed to load qr_index.json', e);
    state.items = [];
  }
  applyFilters();
});
