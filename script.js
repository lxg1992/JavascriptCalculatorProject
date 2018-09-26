function add (n1, n2) {
	return n1 + n2;
}

function subtract (n1, n2) {
	return n1 - n2;
}

function multiply (n1, n2){
    return n1*n2;
}

function divide (n1,n2){
    return n1/n2;
}


function power(base, power) {
	let result = 1;
	while(power--){
		result*= base
	}
	return result;
}


function operate(operator, num1, num2) {
    return operator(num1, num2);
}

let historyValue = [];
let historyOperand = [];
let storedValue = 0;
let isOperationPressed = false;
let isFirstNumPressed = true;

let displayInput = document.querySelector('#inputDisplay');
let clearButton = document.querySelector("#clearDisplay");
let equalsButton = document.querySelector("#equals");
let decimalButton = document.querySelector('#decimal');

let numButtons = document.querySelectorAll(".num");
let operandButtons = document.querySelectorAll(".operand");


displayInput.textContent = storedValue;


numButtons.forEach(function(btn) {
    btn.addEventListener('click', function(){
        isOperationPressed = false;
        if(isFirstNumPressed){ //if the number pressed is first, it does not "add" to 0, but instead enters the value entered
            displayInput.textContent = this.textContent;
            storedValue = parseFloat(displayInput.textContent);
            isFirstNumPressed = false;            
        } else {            //if the previous button clicked is a "number" then the next number follows as normal
            displayInput.textContent += this.textContent;
            storedValue = parseFloat(displayInput.textContent);
        }
    })
});

operandButtons.forEach(function(btn){
    btn.addEventListener('click',function(e){            
        console.log(e.target.name);
        if(isOperationPressed == true){ //if operation was pressed last, the calculator will not add another operation to the historyOperand array
            historyOperand.pop();
            historyOperand.push(e.target.name);
        } else if(storedValue == 0 && historyOperand[historyOperand.length - 1] == "divide"){
            alert("Cannot divide by 0!"); //division by 0 error
        } else {
            historyValue.push(storedValue);//push the current display value into a historyValue array              
            historyOperand.push(e.target.name); //push the last pressed operand into historyOperand array
            storedValue = 0; 
            isFirstNumPressed = true;       
            console.table(historyOperand);
            isOperationPressed = true;    
        }
    })
})

clearButton.addEventListener('click', function() {
    displayInput.textContent = 0;
    storedValue = 0;
    historyValue = [];
    historyOperand = [];
    isFirstNumPressed = true;
});

equalsButton.addEventListener('click', function(){
    if(storedValue == 0 && historyOperand[historyOperand.length - 1 ] == "divide"){
        alert("Cannot divide by 0!");
    } else {
        historyValue.push(storedValue);
        let result = historyValue[0];
        console.log(result);
        console.table(historyValue);
        console.table(historyOperand);
        for (let i = 0; i < historyOperand.length; i++){ //this loop takes in a value from each array and then calculates the result based off them
            switch(historyOperand[i]){ //for each operand in historyOperand array, it manipulates the result as currently stored
                case "add":
                    result = add(parseFloat(result), parseFloat(historyValue[i+1]));
                    console.log(result);
                    break;
                case "subtract":
                    result = subtract(parseFloat(result),parseFloat(historyValue[i+1]));
                    console.log(result);
                    break;
                case "divide":
                    result = divide(parseFloat(result),parseFloat(historyValue[i+1]));
                    console.log(result);
                    break;
                case "multiply":
                    result = multiply(parseFloat(result),parseFloat(historyValue[i+1]));
                    console.log(result);
                    break;
            } //after each value in the historyOperand and historyValue arrays is used, it then returns the final result
        }
        //resetting of arrays follows...
        historyValue = [];
        historyOperand = [];
        displayInput.textContent = storedValue = result;
        isFirstNumPressed = true;
        isOperationPressed = false;
    }
    
});

decimalButton.addEventListener('click', function(){
    if(Number.isInteger(parseFloat(displayInput.textContent))){
        displayInput.textContent += ".";
    }
    isOperationPressed = false;
})





console.log(numButtons);