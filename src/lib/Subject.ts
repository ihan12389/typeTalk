class Subject {
    app: HTMLElement;
    observers = [];

    constructor() {
        this.app = document.getElementById("app")
    }

    register(observer) {
        this.observers.push(observer);
    }

    render() {
        this.app.innerHTML = this.observers.map((observer) => observer.render()).join("");
    }
}

const subject = new Subject();

export {Subject, subject};