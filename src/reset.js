(
  function(doc, win) {
    let docEl = doc.documentElement,
      recalc = e => {
        document.getElementById('main-container').style.height = docEl.clientHeight + 'px'
        document.getElementById('main-container').style.width = docEl.clientWidth + 'px'
      };

    win.addEventListener('resize', recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
  }
)(document, window);