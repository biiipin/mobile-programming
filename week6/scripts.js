  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

  import{getDatabase, set, ref, update, remove, get} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBENCUE0RxA5c1kPwFoOHZuBvnmQH0nFyE",
    authDomain: "mobile-programming-bsit.firebaseapp.com",
    projectId: "mobile-programming-bsit",
    storageBucket: "mobile-programming-bsit.firebasestorage.app",
    messagingSenderId: "722270584693",
    appId: "1:722270584693:web:7a5cba67ced0ed2fbc1d3c",
    measurementId: "G-QZXSPQN4PG"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
    const db = getDatabase(app)
 
console.log(db)


function writeUserData(userId, firstname, lastname, age, address) {
  set(ref(db, 'users/' + userId), {
    firstname,
    lastname,
    age,
    address,
  })
  .then(() => {
    console.log("User added successfully with ID:", userId);
  })
  .catch((error) => {
    console.error("Error addding user:", error);
  });
}
window.writeUserData = writeUserData;



function readUser(){
    const userRef = ref(db,'users')
    get(userRef).then((snapshot)=>{
        snapshot.forEach((childsnapshot)=>{
            console.log(childsnapshot.val());
        })
    })
}
//readUser()
window.readUser = readUser;

// Read a single user by ID and show the result on the page.
function readUserById(userId) {
  const userRef = ref(db, 'users/' + userId);
  get(userRef).then((snapshot) => {
    const user = snapshot.val();
    console.log("User found:", user);
    document.getElementById('read-result').textContent =
    `First Name: ${user.firstname}
    Last Name: ${user.lastname}
    Age: ${user.age}
    Address: ${user.address}`;
  });
}
window.readUserById = readUserById;

// Fetch an existing user by ID and load their data into the update input fields,
// so the values can be edited and then saved with updateUserData().
function fetchUserForUpdate(userId) {
  const userRef = ref(db, 'users/' + userId);
  get(userRef).then((snapshot) => {
    const user = snapshot.val();
    document.getElementById('update-firstname').value = user.firstname;
    document.getElementById('update-lastname').value = user.lastname;
    document.getElementById('update-age').value = user.age;
    document.getElementById('update-address').value = user.address;
    console.log("Loaded user into form:", user);
  });
}
window.fetchUserForUpdate = fetchUserForUpdate;

function updateUserData(userId, updatedData) {
  const userRef = ref(db, 'users/' + userId);
  update(userRef, updatedData)
    .then(() => {
      console.log("User updated successfully");
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}

// Example usage:
//updateUserData();
window.updateUserData = updateUserData;


function deleteUserData(userId) {
  const userRef = ref(db, 'users/' + userId);
  remove(userRef)
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

// Example usage:
//deleteUserData(2);
window.deleteUserData = deleteUserData;