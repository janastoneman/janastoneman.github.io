export default function isInViewPort(object) { // eslint-disable-line no-unused-vars
  function getOffset(element) {
    if (!element.getClientRects().length) {
      return { top: 0, left: 0 };
    }

    const rect = element.getBoundingClientRect();
    const win = element.ownerDocument.defaultView;
    return (
      {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
      });
  }

  const elementTop = getOffset(object).top;
  const elementBottom = elementTop + object.offsetHeight;

  const viewportTop = window.scrollY;
  const viewportBottom = viewportTop + window.innerHeight;

  return elementBottom > viewportTop && elementTop < viewportBottom;
}
