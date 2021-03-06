import { Component } from "../../lib/Component";
import { firestore, storage } from "../../../Firebase";

class Profile extends Component {
  me: any;
  constructor(parent, me) {
    super(parent);
    this.me = me;
  }

  mount() {
    
    /* 이름 텍스트 입력 시에 넓이 세팅 */
    var textObj = (<HTMLInputElement>document.getElementById("myName"));
    var resize = textObj.value.length;
    
    textObj.setAttribute('size', String(resize));
    textObj.style.width = `${textObj.offsetWidth-44}px`;
    
    document
    .querySelector("#myName")
    .addEventListener("input", (event) => {
      var textObj = (<HTMLInputElement>document.getElementById("myName"));
      var resize = textObj.value.length;
      
      textObj.style.width = `${50 + resize*10}px`;
    })

    /* 프로필 사진 수정 관련 이벤트 리스너 */
    this.addEventFile()

    /* 이름 수정 관련 이벤트 리스너 */
    this.addEventName()

    /* 프로필 메세지 수정 관련 이벤트리스너 */
    this.addEventMessage();

  }

  addEventMessage = () => {
    document
    .getElementById("clickMessage")
    .addEventListener(("click"), ()=>{
      const message = document.querySelector(".message");
      message.classList.remove("message");
      message.innerHTML = `<div class="messageForm"><textarea class="messageInput">${this.me.profileMessage}</textarea><img src="./public/images/done.png" id="submitMessage" /></div>`
      document
      .getElementById("submitMessage")
      .addEventListener("click", () => {
        console.log("submitMessage")
        const text = (<HTMLTextAreaElement>document.querySelector(".messageInput")).value;
        firestore
        .collection("users")
        .doc(this.me.uid)
        .update({"profileMessage" : text })
        .catch((err)=>console.log(err.message))
        message.classList.add("message");
        message.innerHTML = `${this.me.profileMessage}<img id='clickMessage' src='./public/images/write.png' />`;
        this.addEventMessage();
      })
    });
  }

  addEventName = () => {
    document
    .getElementById("clickName")
    .addEventListener("click", (event) => {
      const img = (<HTMLImageElement>document.getElementById("clickName"));
      const input = (<HTMLInputElement>document.getElementById("myName"));
      const srcArr = img.src.split("/");
      if (srcArr[srcArr.length-1] == "write.png") {
        input.style.pointerEvents = "all";
        input.focus();
        img.src = "./public/images/done.png";
      } else if (srcArr[srcArr.length-1] == "done.png") {
        if (input.value == "") {
          alert("you must input something...")
          return
        }
        firestore.collection("users").doc(this.me.uid).update({"nickname" : input.value}).catch(err=>console.log(err.message))
        img.src="./public/images/write.png"
        input.style.pointerEvents = "none";
      }
    })
  }

  addEventFile = () => {
     // 파일 입력을 위해 클릭시에 동작
    document
    .querySelector("#thumbnailUpdate")
    .addEventListener("click", (event)=>{
      event.stopPropagation();
      (<HTMLInputElement>document.querySelector(".profileFileInput")).click();
    })

    // 파일 선택시 이벤트
    document
    .querySelector(".profileFileInput")
    .addEventListener("change", () => {
      const file = (<HTMLInputElement>event.target).files[0]
      var reader = new FileReader();
      var fileUrl;
      // 선택한 파일을 읽을 때 동작
      reader.onload = function(progressEvent) {
        fileUrl = progressEvent.target.result
      }
      // 선택한 파일을 다 읽었을 때 동작
      reader.onloadend = (finishedEvent) => {
        this.uploadStorage(fileUrl);
      }
      reader.readAsDataURL(file);
    })
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
        <img src="${this.me.profileImg ? this.me.profileImg : "./public/images/profile.jpg"}" class="thumbnail myThumbnail" id="thumbnailUpdate" />
        <span class="name"><input type="text" id="myName" value="${this.me.nickname}" /><img src="./public/images/write.png" id="clickName" /></span>
        <div class="email"><span>${this.me.email}</span></div>
        <span class="message" id="myMessage">${this.me.profileMessage !== "" ? `${this.me.profileMessage}<img id='clickMessage' src='./public/images/write.png' />` : "<img id='clickMessage' src='./public/images/write.png' />" }</span>
        <input class="profileFileInput" type="file" accept="images/*" />
        <div class="add"></div>
    </div>
    `;
  }
}

export { Profile };
