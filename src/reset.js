(
  function(doc, win) {
    let docEl = doc.documentElement,
      recalc = e => {
        document.getElementById('container').style.height = docEl.clientHeight + 'px'
        document.getElementById('container').style.width = docEl.clientWidth + 'px'
      };

    win.addEventListener('resize', recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
  }
)(document, window);