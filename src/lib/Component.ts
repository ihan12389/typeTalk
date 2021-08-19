import { Observable } from "./Observable";

class Component extends Observable {
  components = [];

  constructor(parent) {
    super();
    super.register(!parent ? this : null);
    if (parent) {
      parent.addChild(this);
    }
  }

  addChild(child) {
    this.components.push(child);
  }

  render() {
    this.components.map((component) => component.render).join("");
  }

  mount() {
    this.components.forEach((component) => component.mount());
  }
}

export { Component };
