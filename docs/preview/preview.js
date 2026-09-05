/* ============================================================================
   Dashwell — /preview/ layout experiment
   Renders the app tile grid and the detail dialog from window.DASHWELL_CATALOG.
   No dependencies. All catalog text is injected with textContent, never HTML.
   ========================================================================== */
(function () {
  'use strict';

  var apps = window.DASHWELL_CATALOG || [];
  var grid = document.getElementById('app-grid');
  var bar = document.getElementById('app-filters');
  var modal = document.getElementById('app-modal');
  if (!grid || !bar || !modal) { return; }

  /* Filter definitions. A chip only appears if some app actually matches it,
     so a new app with a new platform needs no change here beyond the label. */
  var FILTERS = [
    { id: 'all',    label: 'All apps', match: function () { return true; } },
    { id: 'money',  label: 'Money',    match: function (a) { return has(a.families, 'money'); } },
    { id: 'music',  label: 'Music',    match: function (a) { return has(a.families, 'music'); } },
    { id: 'mac',    label: 'Mac',      match: function (a) { return has(a.platforms, 'mac'); } },
    { id: 'mobile', label: 'iPhone & iPad',
      match: function (a) { return has(a.platforms, 'ipad') || has(a.platforms, 'iphone'); } }
  ];

  var active = 'all';
  var lastFocused = null;

  function has(list, value) {
    return Array.isArray(list) && list.indexOf(value) !== -1;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text != null) { node.textContent = text; }
    return node;
  }

  function chipRow(labels) {
    var row = el('div', 'chip-row');
    (labels || []).forEach(function (label) {
      row.appendChild(el('span', 'chip', label));
    });
    return row;
  }

  /* ---------- Grid ---------- */

  function buildTile(app) {
    var tile = el('button', 'app-tile');
    tile.type = 'button';
    tile.setAttribute('aria-haspopup', 'dialog');
    tile.dataset.slug = app.slug;

    var head = el('div', 'tile-head');
    if (app.icon) {
      var icon = el('img', 'tile-icon');
      icon.src = app.icon;
      icon.alt = '';
      icon.width = 56;
      icon.height = 56;
      head.appendChild(icon);
    }
    var headText = el('div');
    headText.appendChild(el('h3', 'tile-title', app.name));
    if (app.chips && app.chips.length) { headText.appendChild(chipRow(app.chips)); }
    head.appendChild(headText);
    tile.appendChild(head);

    if (app.summary) { tile.appendChild(el('p', 'tile-summary', app.summary)); }

    var foot = el('div', 'tile-foot');
    foot.appendChild(el('span', 'tile-details', 'Details →'));
    tile.appendChild(foot);

    tile.addEventListener('click', function () { openApp(app.slug, tile); });
    return tile;
  }

  function renderGrid() {
    var filter = FILTERS.filter(function (f) { return f.id === active; })[0] || FILTERS[0];
    var shown = apps.filter(filter.match);

    grid.textContent = '';
    if (!shown.length) {
      grid.appendChild(el('p', 'grid-empty', 'No apps match this filter yet.'));
      return;
    }
    shown.forEach(function (app) { grid.appendChild(buildTile(app)); });
  }

  function renderFilters() {
    bar.textContent = '';
    FILTERS.forEach(function (f) {
      /* Hide a chip nothing matches, so the bar stays honest as apps change. */
      if (f.id !== 'all' && !apps.some(f.match)) { return; }

      var chip = el('button', 'filter-chip', f.label);
      chip.type = 'button';
      chip.setAttribute('aria-pressed', String(f.id === active));
      if (f.id === active) { chip.classList.add('is-active'); }
      chip.addEventListener('click', function () {
        active = f.id;
        renderFilters();
        renderGrid();
      });
      bar.appendChild(chip);
    });
  }

  /* ---------- Detail dialog ---------- */

  function fillModal(app) {
    var inner = modal.querySelector('.modal-inner');
    inner.textContent = '';

    /* Head: icon, name, tagline, chips */
    var head = el('div', 'modal-head');
    if (app.icon) {
      var icon = el('img', 'modal-icon');
      icon.src = app.icon;
      icon.alt = '';
      icon.width = 76;
      icon.height = 76;
      head.appendChild(icon);
    }
    var headText = el('div');
    var title = el('h2', 'modal-title', app.name);
    title.id = 'app-modal-title';
    headText.appendChild(title);
    if (app.tagline) { headText.appendChild(el('p', 'modal-tagline', app.tagline)); }
    if (app.chips && app.chips.length) { headText.appendChild(chipRow(app.chips)); }
    head.appendChild(headText);
    inner.appendChild(head);

    /* Screenshot rail — only when this app actually has screenshots. */
    if (app.shots && app.shots.length) {
      var rail = el('div', 'modal-shots');
      app.shots.forEach(function (shot) {
        var fig = el('figure', 'modal-shot');
        var img = el('img');
        img.src = shot.src;
        img.alt = shot.alt || (app.name + ' screenshot');
        img.loading = 'lazy';
        fig.appendChild(img);
        if (shot.caption) { fig.appendChild(el('figcaption', null, shot.caption)); }
        rail.appendChild(fig);
      });
      inner.appendChild(rail);
    }

    /* Meta pills — version, platform, etc. Never a price. */
    if (app.meta) {
      var keys = Object.keys(app.meta).filter(function (k) { return app.meta[k]; });
      if (keys.length) {
        var meta = el('div', 'modal-meta');
        keys.forEach(function (k) {
          var label = k === 'version' ? 'Version ' + app.meta[k] : String(app.meta[k]);
          meta.appendChild(el('span', 'chip chip-meta', label));
        });
        inner.appendChild(meta);
      }
    }

    /* Body */
    var body = el('div', 'modal-body');
    (app.description || []).forEach(function (para) {
      body.appendChild(el('p', null, para));
    });
    if (app.highlights && app.highlights.length) {
      body.appendChild(el('h4', null, 'Highlights'));
      var ul = el('ul');
      app.highlights.forEach(function (item) { ul.appendChild(el('li', null, item)); });
      body.appendChild(ul);
    }
    inner.appendChild(body);

    /* Actions */
    var actions = el('div', 'modal-actions');
    if (app.appStore) {
      var store = el('a', 'btn btn-primary', 'View on App Store ↗');
      store.href = app.appStore;
      store.rel = 'noopener';
      actions.appendChild(store);
    }
    if (app.page) {
      var page = el('a', 'btn btn-outline', 'Full details ↗');
      page.href = app.page;
      actions.appendChild(page);
    }
    if (actions.childNodes.length) { inner.appendChild(actions); }

    /* Close button last in DOM, positioned over the head by CSS. */
    var close = el('button', 'modal-close', '✕');
    close.type = 'button';
    close.setAttribute('aria-label', 'Close');
    close.addEventListener('click', function () { modal.close(); });
    inner.appendChild(close);

    modal.setAttribute('aria-labelledby', 'app-modal-title');
  }

  function openApp(slug, trigger) {
    var app = apps.filter(function (a) { return a.slug === slug; })[0];
    if (!app) { return; }

    lastFocused = trigger || document.activeElement;
    fillModal(app);
    if (typeof modal.showModal === 'function') {
      if (!modal.open) { modal.showModal(); }
    } else {
      modal.setAttribute('open', '');
    }
    var closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) { closeBtn.focus(); }

    /* Deep link, so a popup can be shared directly. */
    if (window.location.hash !== '#app=' + slug) {
      history.pushState(null, '', '#app=' + slug);
    }
  }

  function slugFromHash() {
    var m = /^#app=([\w-]+)$/.exec(window.location.hash || '');
    return m ? m[1] : null;
  }

  /* Escape closes. A modal <dialog> normally does this itself via the native
     close request, but that does not fire in every embedding, so handle the
     key explicitly. Harmless when the native behaviour works — the dialog is
     already closed by then and close() on a closed dialog is a no-op. */
  modal.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      modal.close();
    }
  });

  /* Backdrop click closes — the dialog element itself fills the backdrop, so a
     click landing outside the inner panel's box is a backdrop click. */
  modal.addEventListener('click', function (e) {
    if (e.target !== modal) { return; }
    var r = modal.getBoundingClientRect();
    var outside = e.clientX < r.left || e.clientX > r.right ||
                  e.clientY < r.top || e.clientY > r.bottom;
    if (outside) { modal.close(); }
  });

  modal.addEventListener('close', function () {
    if (slugFromHash()) { history.pushState(null, '', window.location.pathname); }
    if (lastFocused && document.contains(lastFocused)) { lastFocused.focus(); }
    lastFocused = null;
  });

  /* Back/forward drives the modal, so Back closes it. */
  window.addEventListener('popstate', function () {
    var slug = slugFromHash();
    if (slug) {
      openApp(slug, lastFocused);
    } else if (modal.open) {
      modal.close();
    }
  });

  renderFilters();
  renderGrid();

  var initial = slugFromHash();
  if (initial) { openApp(initial, null); }
}());
