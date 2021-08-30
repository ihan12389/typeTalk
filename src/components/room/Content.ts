import { Component } from "../../lib/Component";

class Content extends Component {
  chats: any;
  stateArray = [];
  returnString : string;
  constructor(parent, chats) {
    super(parent);
    this.chats = chats;
    this.returnString = "";
  }

  mount() {
    var content = document.querySelector(".roomContent");
    content.scrollTop = content.scrollHeight;

    this.components.map(component => component.mount())
  }

  render() {
    var idx = 0;
    var idx2 = 0;
    var back;
    this.stateArray.fill("", this.components.length);
    return `
    <div class="roomContent">
    ${
      this.components.map(component => {
        if (idx == 0) {
                this.stateArray[0] = "top";
                back = component.chat.uid;
              } else if(idx == this.components.length-1) {
                if (back !== component.chat.uid) {
                  if (this.stateArray[idx-1] == "top") 
                  this.stateArray[idx-1] = "one";
                  else 
                  this.stateArray[idx] = "last";
                  
                  this.stateArray[idx] = "one";
                } else {back == component.chat.uid} {
                  this.stateArray[idx] = "last"
                }
                back = component.chat.uid;
              } else {
                if (back !== component.chat.uid) {
                  if (this.stateArray[idx-1] == "top")
                  this.stateArray[idx-1] = "one"
                  else
                  this.stateArray[idx-1] = "last"
                  
                  this.stateArray[idx] = "top"
                } else {
                  this.stateArray[idx] = "middle";
                }
                back = component.chat.uid;
              }
              idx++;
            }).join("")
          }
          ${this.components.map((component) => {
            if (this.stateArray[idx2] == "top") {
              component.setState("top")
              this.returnString += component.render()
            }
            else if (this.stateArray[idx2] == "last") {
              component.setState("last")
              this.returnString += component.render()
            }
            else if (this.stateArray[idx2] == "middle") {
              component.setState("middle")
              this.returnString += component.render()
            }
            else if (this.stateArray[idx2] == "one") {
              component.setState("one")
              this.returnString += component.render()
            }
            idx2++;
            }).join("")
          }
          ${this.returnString}
          </div>
          `;
        }
      }
      
      export { Content };