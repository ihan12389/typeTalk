class Subject {
  app: HTMLElement;
  observers = [];

  constructor() {
    this.app = document.getElementById("app");
  }

  /* Add Observer */
  register(observer) {
    this.observers.push(observer);
  }

  /* rendering my Observers */
  render() {
    this.app.innerHTML = this.observers
      .map((observer) => observer.render())
      .join("");
  }

  mount() {
    this.observers.forEach((component) => {
      component.mount();
    });
  }

  /* reset Current Observers List */
  reset() {
    this.observers = [];
  }
}

const subject = new Subject();

export { Subject, subject };
