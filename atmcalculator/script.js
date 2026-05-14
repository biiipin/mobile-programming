
let balance = 10000;
let pin = 1234;


function withdraw() {

    let amount = Number(document.getElementById("amt").value);

    // Checking valid amount
    if (amount <= 0) {
        document.getElementById("invalid").innerText= "Invalid Amount";
        return;
    }

    // Checking multiple of 100
    if (amount % 100 !== 0) {
        document.getElementById("invalid").innerText= "Amount must be multiple of 100";
        return;
    }

    // Checking sufficient balance
    if (amount > balance) {
        document.getElementById("invalid").innerText= "Insufficient Balance";
        return;
    }

    // Asking for pin
    let enterPin = prompt("Enter PIN");

    if (enterPin == pin) {
        balance = balance - amount;
        document.getElementById("totalamount").innerText = "Total Balance : " + balance;
        alert("Withdrawal Successful");
    } 
    
    else {
        document.getElementById("invalid").innerText= "Wrong Pin";
    }

    }


function deposit() {

    let amount = Number(document.getElementById("amt").value);

    // Checking valid amount
    if (amount <= 0) {
        document.getElementById("invalid").innerText= "Invalid Amount";
        return;
    }

    // Checking multiple of 100
    if (amount % 100 !== 0) {
        document.getElementById("invalid").innerText= "Amount must be multiple of 100";
        return;
    }

    // Ask for PIN
    let enterPin = prompt("Enter PIN");

    if (enterPin == pin) {
        balance = balance + amount;
        document.getElementById("totalamount").innerText = "Total Balance : " + balance;
        alert("Deposit Successful");
    } 
    
    else {
        document.getElementById("invalid").innerText= "Wrong Pin";

    }
}