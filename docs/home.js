/* ============================================================================
   Dashwell home page — progressive enhancement for the app grid.

   The tiles in index.html are real <a> links to the detail pages, so the page
   is fully usable for crawlers and with JavaScript off. This file upgrades
   them: it intercepts the click to open the detail <dialog> instead, and
   builds the filter bar from each tile's own data-families / data-platforms.
   Popup content comes from window.DASHWELL_CATALOG, matched on data-slug.

   No dependencies. All catalog text is injected with textContent, never HTML.
   Depends on style.css for --ink/--muted/--border/--soft/--link and for the
   .btn / .btn-primary / .btn-outline classes applied to the popup's two CTAs.
   ========================================================================== */
(function () {
  'use strict';

  var catalog = {};
  (window.DASHWELL_CATALOG || []).forEach(function (a) { catalog[a.slug] = a; });

  var grid = document.getElementById('app-grid');
  var bar = document.getElementById('app-filters');
  var modal = document.getElementById('app-modal');
  if (!grid || !bar || !modal) { return; }

  var tiles = [].slice.call(grid.querySelectorAll('.app-tile'));
  if (!tiles.length) { return; }

  function tokens(tile, attr) {
    return (tile.getAttribute(attr) || '').split(/\s+/).filter(Boolean);
  }

  /* Filter definitions. A chip only appears if some app actually matches it,
     so a new app with a new platform needs no change here beyond the label. */
  var FILTERS = [
    { id: 'all',    label: 'All apps', match: function () { return true; } },
    { id: 'money',  label: 'Money',    match: function (t) { return fam(t, 'money'); } },
    { id: 'music',  label: 'Music',    match: function (t) { return fam(t, 'music'); } },
    { id: 'mac',    label: 'Mac',      match: function (t) { return plat(t, 'mac'); } },
    { id: 'mobile', label: 'iPhone & iPad',
      match: function (t) { return plat(t, 'ipad') || plat(t, 'iphone'); } }
  ];

  function fam(tile, v)  { return tokens(tile, 'data-families').indexOf(v) !== -1; }
  function plat(tile, v) { return tokens(tile, 'data-platforms').indexOf(v) !== -1; }

  var active = 'all';
  var lastFocused = null;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text != null) { node.textContent = text; }
    return node;
  }

  var FAMILY_LABELS = window.DASHWELL_FAMILY_LABELS || {};

  /* Category badge(s) first, then the platform chips. The category is derived
     from `families` so the badge and the Money/Music filter can never drift
     apart, and it gets a `cat-<family>` class for its colour. */
  function chipRow(app) {
    var row = el('div', 'chip-row');

    (app.families || []).forEach(function (family) {
      var label = FAMILY_LABELS[family] ||
                  family.charAt(0).toUpperCase() + family.slice(1);
      row.appendChild(el('span', 'chip chip-cat cat-' + family, label));
    });

    (app.chips || []).forEach(function (label) {
      row.appendChild(el('span', 'chip', label));
    });

    return row;
  }

  /* ---------- Grid: enhance what is already in the HTML ---------- */

  /* Each tile stays a working link to its detail page; we only intercept the
     click. Modified clicks (new tab, download) and the keyboard's own link
     activation are left alone where the user clearly wants to navigate. */
  function enhanceTiles() {
    tiles.forEach(function (tile) {
      tile.setAttribute('aria-haspopup', 'dialog');
      tile.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) { return; }
        var slug = tile.getAttribute('data-slug');
        if (!catalog[slug]) { return; }   // no popup content: let the link work
        e.preventDefault();
        openApp(slug, tile);
      });
    });
  }

  function renderGrid() {
    var filter = FILTERS.filter(function (f) { return f.id === active; })[0] || FILTERS[0];
    var shown = 0;

    tiles.forEach(function (tile) {
      var match = filter.match(tile);
      tile.hidden = !match;
      if (match) { shown++; }
    });

    var empty = grid.querySelector('.grid-empty');
    if (!shown && !empty) {
      grid.appendChild(el('p', 'grid-empty', 'No apps match this filter yet.'));
    } else if (shown && empty) {
      empty.parentNode.removeChild(empty);
    }
  }

  function renderFilters() {
    bar.textContent = '';
    FILTERS.forEach(function (f) {
      /* Hide a chip nothing matches, so the bar stays honest as apps change. */
      if (f.id !== 'all' && !tiles.some(f.match)) { return; }

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
    headText.appendChild(chipRow(app));
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
        /* Deliberately NOT lazy. These <img>s are created and inserted into a
           closed <dialog>, and browsers do not reliably start a lazy load for
           content that was never laid out in the document flow — they stayed
           at complete=false, on screen, with no request made. Only one app's
           shots exist at a time and opening the popup is an explicit action,
           so eager is both correct and cheap. The detail pages' rails are
           static markup in normal flow and do keep loading="lazy". */
        img.loading = 'eager';

        /* Portrait phone and tablet shots get more height than landscape ones,
           or they end up as unreadable slivers next to a Mac window. Intrinsic
           w/h from the data reserves the right box before the image loads, so
           the rail never jumps; without them, fall back to measuring on load. */
        if (shot.w && shot.h) {
          img.width = shot.w;
          img.height = shot.h;
          if (shot.h > shot.w) { fig.classList.add('is-portrait'); }
        } else {
          img.addEventListener('load', function () {
            if (img.naturalHeight > img.naturalWidth) { fig.classList.add('is-portrait'); }
          }, { once: true });
        }
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
    close.addEventListener('click', function () { closeModal(); });
    inner.appendChild(close);

    modal.setAttribute('aria-labelledby', 'app-modal-title');
  }

  function openApp(slug, trigger) {
    var app = catalog[slug];
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

  /* Every close path goes through here. Cleanup does NOT hang off the native
     'close' event alone: neither it nor 'cancel' is reliably delivered in
     every embedding, and when they are missing the hash and focus are left
     stranded. Idempotent, so the listener below can safely call it too. */
  function closeModal() {
    if (modal.open) { modal.close(); }
    else { modal.removeAttribute('open'); }

    if (slugFromHash()) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
    if (lastFocused && document.contains(lastFocused)) { lastFocused.focus(); }
    lastFocused = null;
  }

  /* Escape closes. A modal <dialog> normally does this itself via the native
     close request, but that does not fire in every embedding. */
  modal.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      closeModal();
    }
  });

  /* Backdrop click closes — the dialog element itself fills the backdrop, so a
     click landing outside the inner panel's box is a backdrop click. */
  modal.addEventListener('click', function (e) {
    if (e.target !== modal) { return; }
    var r = modal.getBoundingClientRect();
    var outside = e.clientX < r.left || e.clientX > r.right ||
                  e.clientY < r.top || e.clientY > r.bottom;
    if (outside) { closeModal(); }
  });

  modal.addEventListener('close', function () { closeModal(); });

  /* Back/forward drives the modal, so Back closes it. */
  window.addEventListener('popstate', function () {
    var slug = slugFromHash();
    if (slug) {
      openApp(slug, lastFocused);
    } else if (modal.open) {
      closeModal();
    }
  });

  enhanceTiles();
  renderFilters();
  renderGrid();
  bar.hidden = false;   /* only now is the filter bar actually functional */

  var initial = slugFromHash();
  if (initial) { openApp(initial, null); }
}());
