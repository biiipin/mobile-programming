let balance = 10000;
const pin = "1234";

let balanceVisible = false;

// Show / Hide Balance
$("#eyeIcon").click(function () {

    if (balanceVisible) {

        document.getElementById("balance").innerText = "******";

        $("#eyeIcon")
            .removeClass("fa-eye")
            .addClass("fa-eye-slash");

        balanceVisible = false;

    } else {

        document.getElementById("balance").innerText = balance;

        $("#eyeIcon")
            .removeClass("fa-eye-slash")
            .addClass("fa-eye");

        balanceVisible = true;
    }
});

// Show Deposit Input

$("#depositBtn").click(function () {

    $("#depositBox").toggle();
    $("#withdrawBox").hide();

    document.getElementById("invalid").innerText = "";
});

// Show Withdraw Input
$("#withdrawBtn").click(function () {

    $("#withdrawBox").toggle();
    $("#depositBox").hide();

    document.getElementById("invalid").innerText = "";
});


// Connect buttons properly
$("#confirmDeposit").click(function () {
    deposit();
});

$("#confirmWithdraw").click(function () {
    withdraw();
});


function withdraw() {

    $("#invalid").text("");

    let amount = Number(document.getElementById("num2").value);

    if (amount <= 0) {
        document.getElementById("invalid").innerText = "Invalid Amount";
        return;
    }

    if (amount % 100 !== 0) {
        document.getElementById("invalid").innerText = "Amount must be multiple of 100";
        return;
    }

    if (amount > balance) {
        document.getElementById("invalid").innerText = "Insufficient Balance";
        return;
    }

    let enterPin = prompt("Enter PIN");

    if (enterPin == pin) {
        balance = balance - amount;

        if (balanceVisible) {
            document.getElementById("balance").innerText = balance;
        }

        document.getElementById("num2").value = "";

        alert("Withdrawal Successful");
    }

    else {
        document.getElementById("invalid").innerText = "Wrong Pin";
    }
}


function deposit() {

    $("#invalid").text("");

    let amount = Number(document.getElementById("num1").value);

    if (amount <= 0) {
        document.getElementById("invalid").innerText = "Invalid Amount";
        return;
    }

    if (amount % 100 !== 0) {
        document.getElementById("invalid").innerText = "Amount must be multiple of 100";
        return;
    }

    let enterPin = prompt("Enter PIN");

    if (enterPin == pin) {
        balance = balance + amount;

        if (balanceVisible) {
            document.getElementById("balance").innerText = balance;
        }

        document.getElementById("num1").value = "";

        alert("Deposit Successful");
    }

    else {
        document.getElementById("invalid").innerText = "Wrong Pin";
    }
}