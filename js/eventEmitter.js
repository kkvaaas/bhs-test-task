class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  subscribe(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    const callbacks = this.events.get(eventName);
    if (!callbacks.includes(callback)) {
      callbacks.push(callback);
    }

    return this;
  }

  unsubscribe(eventName, callback) {
    if (!this.events.has(eventName)) {
      return this;
    }

    const callbacks = this.events.get(eventName);
    const index = callbacks.indexOf(callback);

    if (index !== -1) {
      callbacks.splice(index, 1);
    }

    if (callbacks.length === 0) {
      this.events.delete(eventName);
    }

    return this;
  }

  emit(eventName, ...args) {
    if (!this.events.has(eventName)) {
      return this;
    }

    const callbacks = this.events.get(eventName);
    callbacks.forEach(callback => {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in event handler for ${eventName}:`, error);
      }
    });

    return this;
  }

  getEventCount(eventName) {
    return this.events.has(eventName) ? this.events.get(eventName).length : 0;
  }

  clear() {
    this.events.clear();
    return this;
  }
}