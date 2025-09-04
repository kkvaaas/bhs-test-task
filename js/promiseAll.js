function all(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError('Argument must be an array'));
      return;
    }

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    const results = new Array(promises.length);
    let completedCount = 0;
    let hasRejected = false;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(result => {
          if (hasRejected) return;

          results[index] = result;
          completedCount++;

          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(error => {
          if (hasRejected) return;

          hasRejected = true;
          reject(error);
        });
    });
  });
}

function createPromise(value, delay, shouldReject = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(value);
      } else {
        resolve(value);
      }
    }, delay);
  });
}