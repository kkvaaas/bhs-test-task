function debounce(func, delay, immediate = false) {
  let timeoutId;

  return function (...args) {
    const context = this;
    const later = function () {
      timeoutId = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, delay);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

function throttle(func, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func.apply(this, args);
  };
}