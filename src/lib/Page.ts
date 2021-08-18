import {subject} from "./Subject";

class Page {
    router: any;
    constructor(router) {{
        subject.reset();
        this.router = router;
    }}
    render() {
        subject.render();
    }
}

export{Page};