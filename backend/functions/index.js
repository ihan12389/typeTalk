const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// exports.myFunction = functions.firestore
//     .document("/users/{myId}")
//     .onUpdate((change, context) => {
//       const newValue = change.after.data();
//       const friends = newValue.friends;
//       friends.map((friend) => {
//         db.collection("users")
//             .doc(friend).collection("friends")
//             .doc(context.params.myId).update(newValue);
//       });
//     });

exports.myFunction = functions.firestore
    .document("/users/{myId}")
    .onUpdate((change, context) => {
      // 새롭게 바뀐 내 정보
      const newValue = change.after.data();
      const myId = context.params.myId;
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
          });
    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
