  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

  import{getDatabase, set, ref, update, remove} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
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

const users = [
  { id: 1, firstname: "Bipin", lastname: "Ghimire", age: 20, address: "Goldhunga" },
  { id: 2, firstname: "Sita", lastname: "Sharma", age: 22, address: "Kathmandu" },
  { id: 3, firstname: "Ram", lastname: "Karki", age: 25, address: "Lalitpur" },
  { id: 4, firstname: "Aarav", lastname: "Thapa", age: 19, address: "Bhaktapur" },
  { id: 5, firstname: "Nisha", lastname: "Shrestha", age: 21, address: "Pokhara" },
  { id: 6, firstname: "Kiran", lastname: "Lama", age: 24, address: "Dharan" },
  { id: 7, firstname: "Prakash", lastname: "Adhikari", age: 23, address: "Butwal" },
  { id: 8, firstname: "Rita", lastname: "Maharjan", age: 20, address: "Chitwan" },
  { id: 9, firstname: "Sujan", lastname: "Bista", age: 26, address: "Hetauda" },
  { id: 10, firstname: "Anita", lastname: "Rai", age: 22, address: "Itahari" }
];

function writeUserData(userId, firstname, lastname, age, address) {
  set(ref(db, 'users/' + userId), {
    firstname,
    lastname,
    age,
    address,
  });
}

// Insert all 10 users
users.forEach(user => {
  writeUserData(user.id, user.firstname, user.lastname, user.age, user.address);
});

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
updateUserData(2, {firstname: "Abisha", lastname: "Dhakal", age:22, address:"Bhaktapur"});



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

deleteUserData(4);