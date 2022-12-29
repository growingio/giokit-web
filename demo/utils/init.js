window._gr_ignore_local_rule = true;

// !(function (e, n, t, i, r) {
//   (e[r] =
//     e[r] ||
//     function () {
//       (e[r].q = e[r].q || []).push(arguments);
//     }),
//     (e[r].ef =
//       e[r].ef ||
//       function () {
//         c = arguments[0];
//         (c.eventTime = +Date.now()), (e[r].e = e[r].e || []).push(c);
//       }),
//     e.addEventListener('error', e[r].ef, !0),
//     e.addEventListener('unhandledrejection', e[r].ef, !0),
//     (t = n.createElement('script'));
//   s = n.getElementsByTagName('script')[0];
//   (t.async = !0), (t.src = i), s.parentNode.insertBefore(t, s);
// })(window, document, 'script', './demo/utils/gioPerformance.js', 'gdp');

!(function (e, n, t, c, i) {
  (e[i] =
    e[i] ||
    function () {
      (e[i].q = e[i].q || []).push(arguments);
    }),
    (t = n.createElement('script'));
  s = n.getElementsByTagName('script')[0];
  (t.async = 1), (t.src = c), s.parentNode.insertBefore(t, s);
})(window, document, 'script', './utils/gdp-full.js', 'gdp');

gdp('init', '91eaf9b283361032', '95fcb6d4b44fc4cd', {
  debug: true,
  host: 'http://cdp-api.growingio.com'
});

// console.log(window.location);
// console.log(Object.keys(window));
