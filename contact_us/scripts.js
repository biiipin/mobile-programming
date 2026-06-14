import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import {
  getDatabase,
  set,
  get,
  ref
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "mobile-programming-bsit.firebaseapp.com",
  projectId: "mobile-programming-bsit",
  storageBucket: "mobile-programming-bsit.firebasestorage.app",
  messagingSenderId: "722270584693",
  appId: "1:722270584693:web:7a5cba67ced0ed2fbc1d3c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
  console.log(db);


// WRITE CONTACT
function writeContact(fullname, mobile, email, message) {

  const counterRef = ref(db, "counter");

  get(counterRef).then((snapshot) => {

    let id = snapshot.exists() ? snapshot.val() + 1 : 1;

    set(counterRef, id);

    set(ref(db, "contacts/" + id), {
      fullname,
      mobile,
      email,
      message
    })
    .then(() => {
      console.log("Contact saved successfully");
      console.log({
        id,
        fullname,
        mobile,
        email,
        message
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  });
}

window.writeContact = writeContact;


// READ ALL CONTACTS
function readContacts() {

  const contactRef = ref(db, "contacts");

  get(contactRef).then((snapshot) => {

    snapshot.forEach((childSnapshot) => {
      console.log(childSnapshot.val());
    });

  });
}

window.readContacts = readContacts;


// FORM SUBMIT
document.getElementById("contactForm").addEventListener("submit", (e) => {

  e.preventDefault();

  const fullname = document.getElementById("fullName").value;
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("gmail").value;
  const message = document.getElementById("message").value;

  writeContact(fullname, mobile, email, message);

  document.getElementById("status").textContent =
    "Message sent successfully!";

  e.target.reset();

});