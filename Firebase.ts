import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// 타입스크립트는 엄격한데다 멍청해서 webpack의 plugins에서 전역변수를 찾아왔다는 사실을 모릅니다.
// 그러니 전역변수의 타입을 미리 타입스크립트에게 알려줘야합니다.
declare var APIKEY : string;
declare var AUTHDOMAIN : string;
declare var PROJECTID : string;
declare var STORAGEBUCKET : string;
declare var MESSAGINGSENDERID : string;
declare var APPID : string;

const firebaseConfig = {
  apiKey: `${APIKEY}`,
  authDomain: `${AUTHDOMAIN}`,
  projectId: `${PROJECTID}`,
  storageBucket: `${STORAGEBUCKET}`,
  messagingSenderId: `${MESSAGINGSENDERID}`,
  appId: `${APPID}`,
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export{ auth, firestore, storage };