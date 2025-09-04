document.addEventListener('DOMContentLoaded', function () {
  initEventEmitter();
  initPromiseAll();
  initDebouncedInput();
});

function initEventEmitter() {
  const eventEmitter = new EventEmitter();
  const outputElement = document.getElementById('eventEmitterContent');

  function logToOutput(message, className = '') {
    const p = document.createElement('p');
    p.textContent = message;
    if (className) {
      p.className = className;
    }
    outputElement.appendChild(p);
    outputElement.scrollTop = outputElement.scrollHeight;
  }

  function f1() {
    logToOutput('hello', 'success');
  }

  function f2() {
    logToOutput('world', 'success');
  }

  function f3() {
    logToOutput('some output', 'info');
  }

  document.getElementById('testEventEmitter').addEventListener('click', function () {
    outputElement.innerHTML = '';
    logToOutput('Testing EventEmitter...', 'info');

    eventEmitter
      .subscribe('event1', f1)
      .subscribe('event1', f2)
      .subscribe('event2', f3);

    setTimeout(() => {
      logToOutput('Emitting event1:', 'info');
      eventEmitter.emit('event1');
    }, 100);

    setTimeout(() => {
      logToOutput('Emitting event2:', 'info');
      eventEmitter.emit('event2');
    }, 300);
  });

  document.getElementById('testEventEmitterChain').addEventListener('click', function () {
    outputElement.innerHTML = '';
    logToOutput('Testing EventEmitter chaining...', 'info');

    eventEmitter.clear();

    eventEmitter
      .subscribe('event1', f1)
      .subscribe('event1', f2)
      .subscribe('event2', f3)
      .emit('event1');

    logToOutput('Unsubscribing f1 from event1:', 'info');

    eventEmitter
      .unsubscribe('event1', f1)
      .emit('event1');
  });
}

function initPromiseAll() {
  const outputElement = document.getElementById('promiseAllContent');

  function logToOutput(message, className = '') {
    const p = document.createElement('p');
    p.textContent = message;
    if (className) {
      p.className = className;
    }
    outputElement.appendChild(p);
    outputElement.scrollTop = outputElement.scrollHeight;
  }

  document.getElementById('testPromiseAllSuccess').addEventListener('click', function () {
    outputElement.innerHTML = '';
    logToOutput('Testing Promise.all with successful promises...', 'info');

    const pr1 = createPromise(1, 100);
    const pr2 = createPromise(2, 200);
    const pr3 = createPromise(3, 500);

    all([pr1, pr2, pr3])
      .then(data => {
        logToOutput(`Success: ${JSON.stringify(data)}`, 'success');
      })
      .catch(err => {
        logToOutput(`Error: ${err}`, 'error');
      });
  });

  document.getElementById('testPromiseAllReject').addEventListener('click', function () {
    outputElement.innerHTML = '';
    logToOutput('Testing Promise.all with rejected promise...', 'info');

    const pr1 = createPromise(1, 100);
    const pr2 = createPromise(2, 200);
    const pr3 = createPromise('reject', 300, true);

    all([pr1, pr2, pr3])
      .then(data => {
        logToOutput(`Success: ${JSON.stringify(data)}`, 'success');
      })
      .catch(err => {
        logToOutput(`Error: ${err}`, 'error');
      });
  });
}

function initDebouncedInput() {
  const inputElement = document.getElementById('debouncedInput');
  const currentValueElement = document.getElementById('currentValue');
  const debouncedValueElement = document.getElementById('debouncedValue');
  const outputElement = document.getElementById('debounceContent');

  function logToOutput(message, className = '') {
    const placeholder = outputElement.querySelector('.placeholder');
    if (placeholder) {
      outputElement.removeChild(placeholder);
    }

    const p = document.createElement('p');
    p.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
    if (className) {
      p.className = className;
    }
    outputElement.appendChild(p);
    outputElement.scrollTop = outputElement.scrollHeight;
  }

  const debouncedLog = debounce(function (value) {
    debouncedValueElement.textContent = value;
    logToOutput(`Debounced input: "${value}"`, 'success');
  }, 500);

  inputElement.addEventListener('input', function (e) {
    const value = e.target.value;
    currentValueElement.textContent = value;
    debouncedLog(value);
    logToOutput(`Input: "${value}"`, 'info');
  });

  currentValueElement.textContent = '';
  debouncedValueElement.textContent = '';
}