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
  let buttonSymbol = getButtonSymbolRegular(e);
  

  //avoid using multiple "."s
  if (screen.textContent.includes(".") && buttonSymbol === ".") {
  } else if (screen.textContent === "" && buttonSymbol === ".") {
     screen.textContent = "0.";
  } else {
    if (screen.textContent === "Impossibru!") clearAll();

    if (screen.textContent === "0" && buttonSymbol !== ".") {
      screen.textContent = "";
    }

    if (clearScreen === false) {
      if (nextOperand === false) {
        screen.textContent += buttonSymbol;
        firstOperand = screen.textContent;
      } else {
        screen.textContent += buttonSymbol;
        secondOperand = screen.textContent;
      }
    } else {
      screen.textContent = "";
      screen.textContent = buttonSymbol
      secondOperand = screen.textContent;
      clearScreen = false;
    }
}
}

function operatorAction(e) {
  let buttonSymbol = getButtonSymbolOperator(e);
 
  if (operatorString === null) {
    nextOperand = true;
    clearScreen = true;
    operatorString = `${buttonSymbol}`;
    firstOperand = screen.textContent;
    memory.textContent = `${firstOperand} ${operatorString}`;
  } else {
    nextOperand = true;
    clearScreen = true;
    let partialResult = operate(firstOperand, secondOperand, operatorString);
    operatorString = `${buttonSymbol}`;
    screen.textContent = partialResult;
    firstOperand = screen.textContent;
    memory.textContent = `${partialResult} ${operatorString}`
  }
}

function equalsAction() {
  equalsUsed = true;
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
  if (equalsUsed === true) {
       screenTextArr = screen.textContent.split("");
       screenTextArr.pop();
       let toBeDisplayed = screenTextArr.join(""); 
       clearAll();
       screen.textContent = toBeDisplayed;
       firstOperand = screen.textContent;
  } else {
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
}

function clearAll() {
  firstOperand = 0;
  secondOperand = 0;
  operatorString = null;
  equalsUsed = false;
  screen.textContent = "";
  memory.textContent = "";
  screen.textContent = "0";
}

//using this function to help with keyboard implementation
function getButtonSymbolRegular(e) {
  let buttonSymbol = null;

  if (!keyPressed) {
    buttonSymbol = e.target.textContent;
  } else buttonSymbol = e.textContent;

  return buttonSymbol;
}

//using this function to help with keyboard implementation
function getButtonSymbolOperator(e) {
  let buttonSymbol = null;

  if (!keyPressed) {
    buttonSymbol = e.target.value;
  } else buttonSymbol = e.textContent

  return buttonSymbol;
}

let firstOperand = 0;
let secondOperand = 0;
let operatorString = null;
let nextOperand = false;
let clearScreen = false;
let equalsUsed = false;
//using this variable to help with keyboard implementation
let keyPressed = false;

let screen = document.querySelector(".screen-text");
let regularButtons = document.querySelectorAll(".regular");
let operators = document.querySelectorAll(".operator");
let memory = document.querySelector(".memory");
let equals = document.querySelector(".equals");
let zero = document.querySelector(".zero");
let clear = document.querySelector(".clear");
let del = document.querySelector(".delete");
let squareButtons = document.querySelectorAll(".buttons button");


regularButtons.forEach(button => button.addEventListener("click", (e) => operandAction(e)))
operators.forEach(operator => operator.addEventListener("click", (e) => operatorAction(e)))
equals.addEventListener("click", () => equalsAction());
del.addEventListener("click", () => delAction());
clear.addEventListener("click", () => clearAll());

squareButtons.forEach(button => button.addEventListener("mousedown", (e) => e.target.classList.add("button-press")));
squareButtons.forEach(button => button.addEventListener("transitionend", (e) => e.target.classList.remove("button-press")));
clear.addEventListener("mousedown", (e) => e.target.classList.add("clear-press"));
clear.addEventListener("transitionend", (e) => e.target.classList.remove("clear-press"));
del.addEventListener("mousedown", (e) => e.target.classList.add("del-press"));
del.addEventListener("transitionend", (e) => e.target.classList.remove("del-press"));

//keyboard implementation
window.addEventListener("keydown", (e) => {
  let key = document.querySelector(`button[data-key="${e.key}"]`);
  if (key.classList.contains("regular")) {
    keyPressed = true;
    key.classList.add("button-press");
    operandAction(key);
    keyPressed = false;
  } else if (key.classList.contains("operator")) {
    keyPressed = true;
    key.classList.add("button-press");
    operatorAction(key);
    keyPressed = false;
  } else if (key.classList.contains("equals")) {
    keyPressed = true;
    key.classList.add("button-press");
    equalsAction();
    keyPressed = false;
  }
})