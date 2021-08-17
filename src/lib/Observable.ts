import {subject} from "./Subject";

class Observable {
    register(target) {
        if(target) {
            subject.register(target);
        }
    }
}

export{Observable};