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

function clearAll() {
  firstOperand = 0;
  secondOperand = 0;
  operatorString = null;
  screen.textContent = "";
  memory.textContent = "";
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



regularButtons.forEach(button => button.addEventListener("click", (e) => {
  if (screen.textContent.includes(".") && e.target.textContent === ".") {
  } else {
      if (screen.textContent === "Impossibru!") clearAll();

      if (screen.textContent === "0") {
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
}))

operators.forEach(operator => operator.addEventListener("click", (e) => {
  if (screen.textContent === "Impossibru!") clearAll();
  nextOperand = true;
  clearScreen = true;
  operatorString = `${e.target.value}`;
  firstOperand = screen.textContent;
  memory.textContent = `${firstOperand} ${operatorString}`
}))

equals.addEventListener("click", (e) => {
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
})

del.addEventListener("click", () => {
  screenTextArr = screen.textContent.split("");
  screenTextArr.pop();
  screen.textContent = screenTextArr.join("");  
})

clear.addEventListener("click", () => clearAll())


