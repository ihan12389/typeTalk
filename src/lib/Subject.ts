class Subject {
  app: HTMLElement;
  observers = [];

  constructor() {
    this.app = document.getElementById("app");
  }

  register(observer) {
    this.observers.push(observer);
  }

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

  reset() {
    this.observers = [];
  }
}

const subject = new Subject();

export { Subject, subject };
