const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// 내 정보를 바꿀 때
exports.myFunction = functions.firestore
    .document("/users/{myId}")
    .onUpdate((snap, context) => {
      // 새롭게 바뀐 내 정보
      const newValue = snap.after.data();
      const myId = context.params.myId;
      console.log(newValue);
      // 나를 친구로 등록한 친구들 데이터베이스 안의 내 정보를 수정
      db.collection("users")
          .where("friends", "array-contains-any", [myId])
          .get().then((snapshot) => {
            console.log(snapshot.docs.length);
            snapshot.docs.map((doc) => {
              console.log(doc.data());
              db.collection("users")
                  .doc(doc.data().uid)
                  .collection("friends")
                  .doc(myId)
                  .update(newValue);
            });
          }).catch((err) => console.log(err.message));
      // 나와 채팅창을 공유하는 모든 유저들의 정보를 수정
      db.collection("users")
          .doc(myId)
          .collection("rooms")
          .get().then((snapshot) => {
            snapshot.docs.map((doc) => {
              db.collection("users")
                  .doc(doc.data().friend.uid)
                  .collection("rooms")
                  .doc(doc.data().id)
                  .update({"friend": newValue});
            });
          }).catch((err) => console.log(err.message));
    });

// 채팅을 보낼 때마다
exports.sendChat = functions.firestore
    .document("/rooms/{roomId}/chats/{chatId}")
    .onCreate((snap, context) => {
      // 새롭게 등록된 채팅 정보
      const newChat = snap.data();
      const id = newChat.id;
      const year = newChat.year;
      const month = newChat.month;
      const date = newChat.date;
      const hour = newChat.hour;
      const minute = newChat.minute;
      const sender = newChat.sender;
      const receiver = newChat.receiver;
      const message = newChat.chatting;
      console.log(
          newChat,
          id,
          year,
          month,
          date,
          hour,
          minute,
          sender,
          receiver,
          message);
      db.collection("users")
          .doc(sender)
          .collection("rooms")
          .doc(context.params.roomId)
          .update({
            "time": id,
            "recentMessage": message,
            "year": year,
            "month": month,
            "date": date,
            "hour": hour,
            "minute": minute,
          }).catch((err) => console.log(err.message));
      db.collection("users")
          .doc(receiver)
          .collection("rooms")
          .doc(context.params.roomId)
          .update({
            "time": id,
            "unreadMessage": admin.firestore.FieldValue.increment(1),
            "recentMessage": message,
            "year": year,
            "month": month,
            "date": date,
            "hour": hour,
            "minute": minute,
          }).catch((err) => console.log(err.message));
    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
