 
 /* function sum() {
            let num1 = Number(document.getElementById("num1").value);
            let num2 = Number(document.getElementById("num2").value);

            document.getElementById("result").innerHTML =
                "Sum = " + (num1 + num2);
        }

        function subtract() {
            let num1 = Number(document.getElementById("num1").value);
            let num2 = Number(document.getElementById("num2").value);

            document.getElementById("result").innerHTML =
                "Subtract = " + (num1 - num2);
        }

        function multiply() {
            let num1 = Number(document.getElementById("num1").value);
            let num2 = Number(document.getElementById("num2").value);

            document.getElementById("result").innerHTML =
                "Multiply = " + (num1 * num2);
        }

        function divide() {
            let num1 = Number(document.getElementById("num1").value);
            let num2 = Number(document.getElementById("num2").value);

            document.getElementById("result").innerHTML =
                "Divide = " + (num1 / num2);
        }
*/

function arithemticCalculator(operation){
    let num1= Number(document.getElementById("num1").value);
    let num2= Number(document.getElementById("num2").value);

    let result;
    
    if(operation=="sum"){
        result=num1+num2;
        document.getElementById("result").innerHTML="Sum = " + result;
    }

    else if(operation=="sub"){
        result=num1-num2;
        document.getElementById("result").innerHTML="Subtraction = " + result;
    }

    else if(operation=="mul"){
        result=num1*num2;
        document.getElementById("result").innerHTML="Multiplication = " + result;
    }

    else if (operation=="div"){
        result=num1/num2;
        document.getElementById("result").innerHTML="Divison = " + result;
    }

}