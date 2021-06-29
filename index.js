var db = firebase.firestore();

// offline data 

firebase.firestore().enablePersistence()
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
    });
// Subsequent queries will use persistence, if it was enabled successfully


function addData() {
    var inputData = document.getElementById("input_txt").value;
    db.collection("todo").add({
        todoValue: inputData
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

db.collection("todo").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        console.log(doc.id);
        var ul = document.getElementById("ul");
        var li = document.createElement("li");
        li.setAttribute("id", data.todoValue);
        var textNode = document.createTextNode(data.todoValue);
        li.appendChild(textNode);
        ul.appendChild(li);

        // edit Button 
        var btn1 = document.createElement("input");
        btn1.setAttribute("type", "button");
        btn1.setAttribute("value", "Edit");
        btn1.setAttribute("id", doc.id);
        btn1.setAttribute("onclick", "editFunc(this)");
        li.appendChild(btn1)

          // Delete Button 
          var btn2 = document.createElement("input");
          btn2.setAttribute("type", "button");
          btn2.setAttribute("value", "Delete");
          btn2.setAttribute("id", doc.id);
          btn2.setAttribute("onclick", "deleteFunc(this)");
          li.appendChild(btn2)


    });



});

function editFunc(e) {
var promt = prompt("update here...");
db.collection("todo").doc(e.id).update({todoValue: promt})
.then(() => {
    console.log("Document successfully updated!");
});
}


function deleteFunc(e) {
    db.collection("todo").doc(e.id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    
}

