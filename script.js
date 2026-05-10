function calculateResult() {

    let totalMarks =
        Number(document.getElementById("m1").value) +
        Number(document.getElementById("m2").value) +
        Number(document.getElementById("m3").value) +
        Number(document.getElementById("m4").value) +
        Number(document.getElementById("m5").value) +
        Number(document.getElementById("m6").value) +
        Number(document.getElementById("m7").value) +
        Number(document.getElementById("m8").value);


    document.getElementById("total").innerHTML = "Total Marks: " + totalMarks + " / 800";

    if (totalMarks >= 700) {
        document.getElementById("result").innerHTML = "DISTINCTION";
        document.getElementById("result").style.color = "green";
    }
    else if (totalMarks >= 600) {
        document.getElementById("result").innerHTML = "First Division";
    }
    else if (totalMarks >= 500) {
        document.getElementById("result").innerHTML = "Second Division";
    }
    else if (totalMarks >= 400) {
        document.getElementById("result").innerHTML = " Third Division";
    }
    else {
        document.getElementById("result").innerHTML = "FAIL";
        document.getElementById("result").style.color = "red";
    }
}