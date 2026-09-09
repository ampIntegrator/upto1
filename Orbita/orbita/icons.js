/* ============================================================
   Orbita — système d'icônes <o-icon name="…" size sw>
   Police Nucleo (icons.css) en priorité ; repli SVG (tracés Feather
   d'origine) pour les clés pas encore mappées → migration sans casse.
   Lie icons.css dans le composant pour charger la police.
   ============================================================ */
(function () {
  // clé sémantique Orbita -> classe Nucleo (icons.css)
  const NUCLEO = {
    'arrow-right':   'arrow-right',
    'arrow-left':    'arrow-left',
    'arrow-up':      'arrow-up',
    'check':         'check-2',
    'chevron-down':  'chevron-down-2',
    'chevron-right': 'caret-right',
    'search':        'magnifier-2',
    'clock':         'clock',
    'phone':         'phone-2',
    'mail':          'envelope-2',
    'close':         'xmark-1',
    'alert':         'triangle-warning-2',
    'upload':        'cloud-upload',
    'pin':           'pin',
    'globe':         'globe-2',
    'play':          'circle-play',
    'info':          'square-info',
    // — icônes de contenu (décoratives, gérées par les users) —
    'gauge':         'gauge',
    'chart':         'chart-bar-trend-up-1',
    'coins':         'coins',
    'doc':           'file-2',
    'files':         'files',
    'shield':        'shield-2',
    'calculator':    'calculator',
    'ruler':         'ruler',
    'helmet':        'helmet',
    'hammer':        'hammer',
    'user':          'user-2',
    'target':        'bullseye',
    'key':           'key',
    'bolt':          'bolt-2'
  };
  // repli SVG (tracés d'origine) pour les clés pas encore validées côté police
  const SVG = {
    'play': '<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
    'info': '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/>',
    'mail': '<rect x="2" y="4" width="20" height="16"/><path d="m2 6 10 7L22 6"/>',
    'close': '<path d="M18 6 6 18M6 6l12 12"/>'
  };

  class OIcon extends HTMLElement {
    static get observedAttributes() { return ['name', 'size', 'sw']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const name = this.getAttribute('name');
      const size = this.getAttribute('size') || '16';
      this.style.display = 'inline-flex';
      this.style.alignItems = 'center';
      this.style.justifyContent = 'center';
      this.style.lineHeight = '0';
      const cls = NUCLEO[name];
      if (cls) {
        this.innerHTML = '<i class="icon icon-' + cls + '" style="font-size:' + size + 'px" aria-hidden="true"></i>';
        return;
      }
      const body = SVG[name];
      if (!body) { this.innerHTML = ''; return; }
      const sw = this.getAttribute('sw') || '2';
      const filled = /fill="currentColor"/.test(body);
      const paint = filled ? '' : 'fill="none" stroke="currentColor" stroke-width="' + sw + '"';
      this.innerHTML = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" ' + paint + ' aria-hidden="true">' + body + '</svg>';
    }
  }
  if (!customElements.get('o-icon')) customElements.define('o-icon', OIcon);
})();
