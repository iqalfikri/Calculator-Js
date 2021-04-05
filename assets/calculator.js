console.log("Selamat anda berhasil menggunakan JavaScript pada Website");

alert("Selamat datang di program WebCalculator 1.0");
// alert("Mohon mengisi biodata dengan huruf kapital");
//
// //greeting
// const firstName = prompt("Name");
// const language = prompt("Languange");
//
// //object greeting
// const user = {
//    name: {
//        first: firstName,
//        // last: lastName,
//    },
//    language: language
// };
// if (user.language === "English") {
//   alert("Nice to meet you " + user.name.first + "!");
//   document.write("<h2>Hello !<h2>" + user.name.first);
// } else if (user.language === "French") {
//   alert("Ravi de vous rencontrer " + user.name.first + "!");
//   document.write("<h2>Bonjour !<h2>" + user.name.first);
// } else if (user.language === "Japanese") {
//   alert("Hajimemashite, " + user.name.first + "!");
//   document.write("<h2>Kon'nichiwa !<h2>" + user.name.first);
// } else if (user.language === "Korean") {
//   alert("mannaseo bangawo, " + user.name.first + "!");
//   document.write("<h2>Annyeong !<h2>" + user.name.first);
// } else {
//   alert("Senang bertemu dengan Anda " + user.name.first + "!");
//   document.write("<h2>Halo !<h2>" + user.name.first);
// }

//object calculator
const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false
};

//FUNCTION
//update display
function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

//delete number
function clearCalculator() {
  calculator.displayNumber = '0';
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

//input number
function inputDigit(digit) {
  if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
    calculator.displayNumber = digit;
  } else {
    if (calculator.displayNumber === '0') {
      calculator.displayNumber = digit;
    } else {
      calculator.displayNumber += digit;
    }
  }
}

//minus number
function inverseNumber() {
  if (calculator.displayNumber === '0') {
    return
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

//menetapkan operator
function handleOperator(operator) {
   if (!calculator.waitingForSecondNumber) {
       calculator.operator = operator;
       calculator.waitingForSecondNumber = true;
       calculator.firstNumber = calculator.displayNumber;
   } else {
       alert('Operator sudah ditetapkan')
   }
}

//kalkulasi nilai
function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum menetapkan operator");
    return;
  }

  let result = 0;
  if (calculator.operator == "+") {
    result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
   const history = {
       firstNumber: calculator.firstNumber,
       secondNumber: calculator.displayNumber,
       operator: calculator.operator,
       result: result
   }
  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}


//program
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  button.addEventListener('click', function(event) {

    //mendapatkan objek elemen yg dikllik
    const target = event.target;

    if (target.classList.contains('clear')) {
      clearCalculator()
      updateDisplay()
      return;
    }

    if(target.classList.contains('negatif')) {
           inverseNumber();
           updateDisplay();
           return;
    }

    if(target.classList.contains('equals')) {
           performCalculation();
           updateDisplay();
           return;
    }

    if(target.classList.contains('operator')) {
           handleOperator(target.innerText)
           updateDisplay();
           return;
    }

    inputDigit(target.innerText);
    updateDisplay()
  })
}
