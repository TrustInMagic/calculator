function add(x, y) {
  return +x + +y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(x, y, operator) {
  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
  }
}

function operandAction(e) {
  if (screen.textContent.includes(".") && e.target.textContent === ".") {
  } else if (screen.textContent === "" && e.target.textContent === ".") {
     screen.textContent = "0.";
  } else {
    if (screen.textContent === "Impossibru!") clearAll();

    if (screen.textContent === "0" && e.target.textContent !== ".") {
      screen.textContent = "";
    }

    if (clearScreen === false) {
      if (nextOperand === false) {
        screen.textContent += e.target.textContent;
        firstOperand = screen.textContent;
      } else {
        screen.textContent += e.target.textContent;
        secondOperand = screen.textContent;
      }
    } else {
      screen.textContent = "";
      screen.textContent = e.target.textContent;
      secondOperand = screen.textContent;
      clearScreen = false;
    }
}
}

function operatorAction(e) {
  if (operatorString === null) {
    nextOperand = true;
    clearScreen = true;
    operatorString = `${e.target.value}`;
    firstOperand = screen.textContent;
    memory.textContent = `${firstOperand} ${operatorString}`;
  } else {
    nextOperand = true;
    clearScreen = true;
    let partialResult = operate(firstOperand, secondOperand, operatorString);
    operatorString = `${e.target.value}`;
    screen.textContent = partialResult;
    firstOperand = screen.textContent;
    memory.textContent = `${partialResult} ${operatorString}`
  }
}

function equalsAction() {
  if (operatorString !== null) {
    result = operate(firstOperand, secondOperand, operatorString);

    if (secondOperand === "0" && operatorString === "/") {
      result = "Impossibru!";
      screen.textContent = result;
      memory.textContent = "";
    } else {
      memory.textContent = `${firstOperand} ${operatorString} ${secondOperand} =`;
      screen.textContent = result;
    }   
  }
}

function delAction() {
  if (operatorString === null) {
    screenTextArr = screen.textContent.split("");
    screenTextArr.pop();
    screen.textContent = screenTextArr.join(""); 
  } else {
    screenTextArr = screen.textContent.split("");
    screenTextArr.pop();
    screen.textContent = screenTextArr.join("");
    secondOperand = screen.textContent;
  }
}

function clearAll() {
  firstOperand = 0;
  secondOperand = 0;
  operatorString = null;
  screen.textContent = "";
  memory.textContent = "";
  screen.textContent = "0";
}

let firstOperand = 0;
let secondOperand = 0;
let operatorString = null;
let nextOperand = false;
let clearScreen = false;

let screen = document.querySelector(".screen-text");
let regularButtons = document.querySelectorAll(".regular");
let operators = document.querySelectorAll(".operator");
let memory = document.querySelector(".memory");
let equals = document.querySelector(".equals");
let zero = document.querySelector(".zero");
let clear = document.querySelector(".clear");
let del = document.querySelector(".delete");



regularButtons.forEach(button => button.addEventListener("click", (e) => operandAction(e)))
operators.forEach(operator => operator.addEventListener("click", (e) => operatorAction(e)))
equals.addEventListener("click", (e) => equalsAction());
del.addEventListener("click", () => delAction());
clear.addEventListener("click", () => clearAll());


