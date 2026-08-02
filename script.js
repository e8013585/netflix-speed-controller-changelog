/* Netflix Speed Controller — changelog site interactions */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /*  Flag-color language chips                                          */
  /*  Each language lists its flag colors with relative coverage.       */
  /*  The majority color wins; ties are resolved randomly.              */
  /* ------------------------------------------------------------------ */

  var FLAG_COLORS = {
    'Kazakh':      [{ c: '#4fc3f7', w: 10 }],
    'Kyrgyz':      [{ c: '#ff5252', w: 10 }],
    'Tajik':       [{ c: '#ff6b6b', w: 1 }, { c: '#ffffff', w: 1 }, { c: '#66d97c', w: 1 }],
    'Mongolian':   [{ c: '#ff5a5f', w: 2 }, { c: '#4fc3f7', w: 1 }],
    'Pashto':      [{ c: '#ffffff', w: 10 }],
    'Azerbaijani': [{ c: '#4fc3f7', w: 1 }, { c: '#ff5252', w: 1 }, { c: '#66d97c', w: 1 }],
    'Georgian':    [{ c: '#ffffff', w: 10 }],
    'Armenian':    [{ c: '#ff5252', w: 1 }, { c: '#4fc3f7', w: 1 }, { c: '#ffab40', w: 1 }],
    'Bashkir':     [{ c: '#64b5f6', w: 1 }, { c: '#ffffff', w: 1 }, { c: '#66d97c', w: 1 }],
    'Chechen':     [{ c: '#66d97c', w: 9 }, { c: '#ffffff', w: 1 }],
    'Chuvash':     [{ c: '#ffd54f', w: 8 }, { c: '#ff5252', w: 2 }],
    'Ossetian':    [{ c: '#ffffff', w: 1 }, { c: '#ff5252', w: 1 }, { c: '#ffd54f', w: 1 }],
    'Yakut':       [{ c: '#4fc3f7', w: 6 }, { c: '#ffffff', w: 1 }, { c: '#ff5252', w: 1 }],
    'Okinawan':    [{ c: '#ffffff', w: 9 }, { c: '#ff5252', w: 1 }],
    'Somali':      [{ c: '#5b9cf5', w: 10 }],
    'Nepali':      [{ c: '#ff6b81', w: 10 }],
    'Sinhala':     [{ c: '#e3869f', w: 10 }],
    'Burmese':     [{ c: '#ffd54f', w: 1 }, { c: '#66d97c', w: 1 }, { c: '#ff5252', w: 1 }],
    'Khmer':       [{ c: '#ff6b6b', w: 1 }, { c: '#4fc3f7', w: 1 }],
    'Lao':         [{ c: '#4fc3f7', w: 1 }, { c: '#ff6b6b', w: 1 }],
    'Kurdish':     [{ c: '#ff5252', w: 1 }, { c: '#ffffff', w: 1 }, { c: '#66d97c', w: 1 }],
    'Urdu':        [{ c: '#4caf7d', w: 8 }, { c: '#ffffff', w: 2 }],
    'Bosnian':     [{ c: '#64b5f6', w: 8 }, { c: '#ffd54f', w: 2 }],
    'Afrikaans':   [{ c: '#ff6b6b', w: 1 }, { c: '#4fc3f7', w: 1 }, { c: '#66d97c', w: 1 },
                    { c: '#ffffff', w: 1 }, { c: '#ffd54f', w: 1 }, { c: '#888888', w: 1 }]
  };

  function hexToRgba(hex, alpha) {
    var n = parseInt(hex.slice(1), 16);
    var r = (n >> 16) & 255;
    var g = (n >> 8) & 255;
    var b = n & 255;
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  }

  function pickFlagColor(name) {
    var opts = FLAG_COLORS[name];
    if (!opts) return null;

    var best = 0;
    opts.forEach(function (o) {
      if (o.w > best) best = o.w;
    });

    var tied = opts.filter(function (o) {
      return o.w === best;
    });

    return tied[Math.floor(Math.random() * tied.length)].c;
  }

  var chips = Array.from(document.querySelectorAll('.lang-chip'));
  chips.forEach(function (chip) {
    var color = pickFlagColor(chip.getAttribute('data-lang'));
    if (!color) return;
    chip.style.color = color;
    chip.style.background = hexToRgba(color, 0.1);
    chip.style.borderColor = hexToRgba(color, 0.35);
  });

  /* Expandable language list */
  var toggles = Array.from(document.querySelectorAll('[data-lang-toggle]'));
  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var list = document.getElementById(toggle.getAttribute('data-lang-toggle'));
      if (!list) return;
      var expanded = !toggle.getAttribute('aria-expanded') ||
                     toggle.getAttribute('aria-expanded') === 'false';
      list.hidden = !expanded;
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.textContent = expanded ? 'Show fewer' : '23 new languages';
    });
  });

  /* Side nav current-version highlight on scroll */
  var links = Array.from(document.querySelectorAll('.side-link'));
  var cards = Array.from(document.querySelectorAll('.release-card'));

  function onScroll() {
    var pos = window.scrollY + 120;
    var current = cards[0];

    cards.forEach(function (card) {
      if (card.offsetTop <= pos) {
        current = card;
      }
    });

    links.forEach(function (link) {
      var active = link.getAttribute('href') === '#' + current.id;
      link.classList.toggle('is-current', active);
    });
  }

  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Footer year */
  var year = new Date().getFullYear();
  var footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = String(year);
  }
})();
