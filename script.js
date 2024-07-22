"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovement = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach((movement, i, array) => {
    const type = movement > 0 ? "deposit" : "withdrawal";
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${movement}</div>
        </div>

    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const createUserName = function (accounts) {
  accounts.forEach((account) => {
    account.userName = account.owner
      .toLowerCase()
      .split(" ")
      .map((ele) => ele.slice(0, 1))
      .join("");
  });
};
createUserName(accounts);

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, elem) => {
    return acc + elem;
  }, 0);
  labelBalance.textContent = `${account.balance}€`;
};

const calcDisplaySummay = function (account) {
  const income = account.movements
    .filter((elem) => elem > 0)
    .reduce((acc, elem) => acc + elem);
  labelSumIn.textContent = `${income}€`;

  const expenses = account.movements
    .filter((elem) => elem < 0)
    .reduce((acc, elem) => acc + elem);
  labelSumOut.textContent = `${expenses}€`;

  const interest = account.movements
    .filter((elem) => elem > 0)
    .map((elem) => elem * currentAccount.interestRate)
    .filter((elem) => elem >= 1)
    .reduce((acc, elem) => acc + elem);
  labelSumInterest.textContent = `${interest}€`;
};

// Login

let currentAccount;
let transferedToAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (elem) => elem.userName === inputLoginUsername.value
  );
  // display UI and welcome
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Hi, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();
    // movements
    displayMovement(currentAccount.movements);
    // balance
    calcDisplayBalance(currentAccount);
    // summary
    calcDisplaySummay(currentAccount);
  } else {
    labelWelcome.textContent = `Wronge user or password please check`;
    containerApp.style.opacity = 0;
  }
});

const updateUI = function (acc) {
  // movements
  displayMovement(acc.movements);
  // balance
  calcDisplayBalance(acc);
  // summary
  calcDisplaySummay(acc);
};

// Transfer money
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = inputTransferTo.value;

  // add to the receiver account
  transferedToAccount = accounts.find(
    (elem) => elem.userName === receiverAccount
  );

  // add to expenses sender list
  if (
    amount > 0 &&
    transferedToAccount &&
    currentAccount.balance >= amount &&
    transferedToAccount?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-inputTransferAmount.value);
    // add to income receiver
    transferedToAccount.movements.push(amount);

    updateUI(currentAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = "";
});

// close an account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  const closingAccount = accounts.findIndex(
    (elem) => elem.userName === currentAccount.userName
  );

  if (
    currentAccount?.userName === inputCloseUsername.value &&
    currentAccount?.pin === Number(inputClosePin.value)
  ) {
    accounts.splice(closingAccount, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

// Loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((elem) => elem >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

// Slice
// let arr = ["a", "b", "c", "d", "e"];
// const slicedarr = arr.slice(-1);
// console.log(arr.slice(1));
// console.log(slicedarr);
// console.log(arr.slice(1, -1));
// console.log(arr.slice());

//Splice
// console.log(arr.splice(0, 2));
// console.log(arr);
// console.log(arr.splice(2));
// console.log(arr);
// console.log(arr.splice(0, 1));
// console.log(arr);
// console.log(arr.splice(0, 1));
// console.log(arr);
// console.log(arr.splice(-2));
// console.log(arr);

// Reverse
// const arr2 = ["j", "i", "h", "g", "f"];
// const reversedarr = arr2.reverse();
// console.log(arr2);

// Concat;
// const arr1 = [1, 2, 3, 4, 5];
// const arr2 = [6, 7, 8, 9, 10];
// const numbers = arr1.concat(arr2);
// console.log(numbers);

// Join
// const myName = "Omar is a male";
// const arr = ["O", "M", "A", "R"];
// console.log(arr.join("-"));
// console.log(myName.split(" "));
// console.log(String(numbers.join(", ")));

// Push Pop Unshift Shift IndexOf Includes
// console.log(numbers.push(100));
// console.log(numbers);
// numbers.pop(100);
// console.log(numbers);
// numbers.unshift(0);
// console.log(numbers);
// numbers.shift(0);
// console.log(numbers);
// console.log(numbers.indexOf(1));
// console.log(numbers.includes(100));

// at method for array
// const arr = [23, 43, 239];
// console.log(arr[0]);
// console.log(arr.at(2));
// console.log(arr.at(arr.length - 1));
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));
// const myName = "Omar";
// console.log(myName.at(-1));

// forEach

// for (const [index, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(
//       `movement ${index + 1}- ${Math.abs(movement)}this is a deposite`
//     );
//   } else
//     console.log(
//       `movement ${index + 1}- ${Math.abs(movement)}this is a withdraw`
//     );
// }

// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(
//       `movement ${index + 1}- ${Math.abs(movement)}this is a deposite`
//     );
//   } else console.log(`movement ${index + 1}- ${Math.abs(movement)}this is a withdraw`);
// });

// movements.forEach((movement, index, array) => {
//   if (movement > 0) {
//     console.log(
//       `movement ${index + 1}- ${Math.abs(movement)}this is a deposite`
//     );
//   } else
//     console.log(
//       `movement ${index + 1}- ${Math.abs(movement)}this is a withdraw`
//     );
// });
// Map
// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// currencies.forEach((value, key, map) => {
//   console.log(`this is a currency siègle ${key}: and the country is ${value}`);
// });

// Set
// const currenciesUnique = new Set(["€", "AUD", "$", "£", "$", "€", "£"]);

// currenciesUnique.forEach((value, _, set) => {
//   console.log(`${value}`);
// });
// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice(1, 3);
//   console.log(dogsJulia);

//   console.log(dogsJuliaCorrected);
//   const allDogList = [...dogsJuliaCorrected, ...dogsKate];
//   const allDogListRepeated = dogsJuliaCorrected.concat(dogsKate);
//   console.log(allDogList);
//   console.log(allDogListRepeated);
//   for (const [i, dog] of allDogList.entries()) {
//     dog >= 3
//       ? console.log(
//           `dog number ${i + 1}: is ${dog} years old so it's an adult dog`
//         )
//       : console.log(
//           `dog number ${i + 1}: is ${dog} years old so it's a puppy 🐶`
//         );
//   }

//   allDogListRepeated.forEach((dog, i, array) => {
//     if (dog >= 3) {
//       console.log(`dog number ${i + 1}: ${dog} years old so it's an adult dog`);
//     } else {
//       console.log(`dog number ${i + 1}: ${dog} years old so it's a puppy 🐶`);
//     }
//   });
// };

// const juliaData = [3, 5, 2, 12, 7];
// const kateData = [4, 1, 15, 8, 3];
// const juliaData2 = [9, 16, 6, 8, 3];
// const kateData2 = [10, 5, 6, 1, 4];

// checkDogs(juliaData2, kateData2);
// checkDogs(juliaData, kateData);

// map
// const eurToUSD = 1.1;

// const Eur = movements.map((element) => {
//   return Math.round(element * eurToUSD);
// });

// console.log(movements, Eur);

// const newMovementsEur = [];
// for (const i of movements) newMovementsEur.push(i * eurToUSD);
// console.log(newMovementsEur);

// const movementsDescriptions = movements.map(
//   (ele, i) =>
//     `element number ${i + 1} you ${
//       ele > 0 ? "deposited" : "withdrew"
//     }: ${Math.abs(ele)}`
// );

// console.log(movementsDescriptions);

// filter

// const deposite = movements.filter((ele) => {
//   return ele > 0;
// });

// const withdrawals = movements.filter((ele) => {
//   return ele < 0;
// });

// console.log(deposite, withdrawals);

//reduce
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const balance = movements.reduce((acc, ele) => acc + ele, 0);
// console.log(balance);

// let sum = 0;
// for (const [i, value] of movements.entries()) {
//   sum += value;
//   console.log(`${i} : ${sum}`);
//   console.log(sum);
// }

// const maxVal = Math.max(...movements);
// console.log(maxVal);

// let max = movements[0];
// for (const i of movements) {
//   if (i > max) {
//     max = i;
//   }
// }
// console.log(max);

// let myMax = movements[0];
// movements.forEach((ele) => {
//   if (ele > myMax) {
//     myMax = ele;
//   }
// });
// console.log(myMax);

// const maximumVal = movements.reduce((acc, ele) => {
//   return (acc = acc > ele ? acc : ele);
// }, movements[0]);
// console.log(maximumVal);

// const maximumNum = -Infinity;
// const filteredVal = movements.filter((ele) => {
//   return maximumNum > ele ? max : ele;
// });

// console.log(filteredVal);

// const ages1 = [5, 2, 4, 1, 15, 8, 3];
// const ages2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge2 = (ages) => {
//   return ages
//     .map(function (elem) {
//       if (elem <= 2) {
//         return 2 * elem;
//       } else {
//         return 16 + elem * 4;
//       }
//     })
//     .filter(function (elem) {
//       return elem > 18;
//     })
//     .reduce(function (acc, elem, i, arr) {
//       return acc + elem / arr.length;
//     }, 0);
// };

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages.map((ele) => {
//     if (ele <= 2) {
//       return 2 * ele;
//     } else {
//       return 16 + ele * 4;
//     }
//   });

//   const filteredHumanAge = humanAge.filter((ele) => ele > 18);

//   const avgHumanAge =
//     filteredHumanAge.reduce((acc, ele) => acc + ele, 0) /
//     filteredHumanAge.length;

//   return avgHumanAge;
// };

// const avg1 = calcAverageHumanAge(ages1);
// const avg2 = calcAverageHumanAge(ages2);
// const avg3 = calcAverageHumanAge2(ages1);
// const avg4 = calcAverageHumanAge2(ages2);

// console.log(avg1, avg2, avg3, avg4);

// console.log(movements);

// console.log(movements.filter((elem) => elem < 0));

// console.log(movements.find((elem) => elem < 0));

// console.log(accounts);

// const account = accounts.find((account) => account.owner === "Jessica Davis");

// console.log(account);

// for (const { owner, pin } of accounts) {
//   if (owner === "Jessica Davis") console.log(pin);
//   if (owner === "Jonas Schmedtmann") console.log(pin);
//   if (owner === "Steven Thomas Williams") console.log(pin);
//   if (owner === "Sarah Smith") console.log(pin);
// }
