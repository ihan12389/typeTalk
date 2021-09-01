import { firestore, storage } from "../../../Firebase";
import { Component } from "../../lib/Component";

class Background extends Component {
  me: any;
  router: any;

  constructor(parent, me, router) {
    super(parent);
    this.me = me;
    this.router = router;
  }

  mount() {
    document.querySelector("div > .closeProfile").addEventListener("click", (event) => {
      event.stopPropagation();
      this.router.push("/");
    });
    document.querySelector(".myBackground").addEventListener("click", (event)=> {
      event.stopPropagation();
      (<HTMLInputElement>document.querySelector(".backgroundFileInput")).click();
    })
    document.querySelector(".backgroundFileInput").addEventListener("change", (event) => {
      const file = (<HTMLInputElement>event.target).files[0]
      var reader = new FileReader();
      var fileUrl;
      reader.onload = function(progressEvent) {
        fileUrl = progressEvent.target.result
      }
      reader.onloadend = (finishedEvent) => {
        this.uploadStorage(fileUrl);
      }
      reader.readAsDataURL(file);
    })
  }

  uploadStorage = async(url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const task = storage.ref().child(`background${this.me.uid}`).put(blob);
    const taskProgress = (snapshot) => {
      console.log(`transferred : ${snapshot.bytesTransferred}`)
    }
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then(snapshot => {
        this.updateFirestore(snapshot);
      });
    }
    const taskError = (snapshot) => {
      console.log(snapshot);
    }
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  }

  updateFirestore (url) {
    console.log("downloadURL?", url)
    firestore.collection("users").doc(this.me.uid).update({
      "background" : url
    }).catch(err => console.log(err.message))
  }

  render() {
    return `
    <div class="backgroundImg myBackground">
      <img src="${this.me.background ? this.me.background : "./images/background.jpg"}" />
      <span class="closeProfile">X</span>
      <input class="backgroundFileInput" type="file" accept="images/*" />
    </div>
    `;
  }
}

export { Background };
