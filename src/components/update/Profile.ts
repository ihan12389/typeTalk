import { Component } from "../../lib/Component";
import { firestore, storage } from "../../../Firebase";

class Profile extends Component {
  me: any;
  constructor(parent, me) {
    super(parent);
    this.me = me;
  }

  mount() {
    document.querySelector("#thumbnailUpdate").addEventListener("click", (event)=>{
      event.stopPropagation();
      (<HTMLInputElement>document.querySelector(".profileFileInput")).click();
    })

    document.querySelector(".profileFileInput").addEventListener("change", () => {
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

    /* Input's Width Setting */
    var textObj = (<HTMLInputElement>document.getElementById("myName"));
    var resize = textObj.value.length;

    textObj.setAttribute('size', String(resize));
    textObj.style.width = `${textObj.offsetWidth-44}px`;

    document.querySelector("#myName").addEventListener("input", (event) => {
      var textObj = (<HTMLInputElement>document.getElementById("myName"));
      var resize = textObj.value.length;

      textObj.style.width = `${50 + resize*10}px`;
    })

    /* upload Profile Name */
    document.getElementById("clickName").addEventListener("click", (event) => {
      const img = (<HTMLImageElement>document.getElementById("clickName"));
      const input = (<HTMLInputElement>document.getElementById("myName"));
      const srcArr = img.src.split("/");
      if (srcArr[srcArr.length-1] == "write.png") {
        input.style.pointerEvents = "all";
        input.focus();
        img.src = "./images/done.png";
      } else if (srcArr[srcArr.length-1] == "done.png") {
        if (input.value == "") {
          alert("you must input something...")
          return
        }
        firestore.collection("users").doc(this.me.uid).update({"nickname" : input.value}).catch(err=>console.log(err.message))
        img.src="./images/write.png"
        input.style.pointerEvents = "none";
      }
    })

    /* Update Profile Message */
    document.getElementById("clickMessage").addEventListener(("click"), ()=>{
      console.log("clickMessage")
      const message = document.querySelector(".message");
      message.classList.remove("message");
      message.innerHTML = `<div class="messageForm"><textarea class="messageInput">${this.me.profileMessage}</textarea><img src="./images/done.png" id="submitMessage" /></div>`
      document.getElementById("submitMessage").addEventListener("click", () => {
        console.log("submitMessage")
        const text = (<HTMLTextAreaElement>document.querySelector(".messageInput")).value;
        firestore.collection("users").doc(this.me.uid).update({"profileMessage" : text }).catch((err)=>console.log(err.message))
        message.classList.add("message");
        message.innerHTML = `${this.me.profileMessage}<img id='clickMessage' src='./images/write.png' />`;
      })
    });
  }

  uploadStorage = async(url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const task = storage.ref().child(`thumbnail${this.me.uid}`).put(blob);
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
      "profileImg" : url
    }).catch(err => console.log(err.message))
  }

  render() {
    return `
    <div class="profile">
        <img src="${this.me.profileImg ? this.me.profileImg : "./images/profile.jpg"}" class="thumbnail myThumbnail" id="thumbnailUpdate" />
        <span class="name"><input type="text" id="myName" value="${this.me.nickname}" /><img src="./images/write.png" id="clickName" /></span>
        <div class="email"><span>${this.me.email}</span></div>
        <span class="message" id="myMessage">${this.me.profileMessage !== "" ? `${this.me.profileMessage}<img id='clickMessage' src='./images/write.png' />` : "<img id='clickMessage' src='./images/write.png' />" }</span>
        <input class="profileFileInput" type="file" accept="images/*" />
        <div class="add"></div>
    </div>
    `;
  }
}

export { Profile };
