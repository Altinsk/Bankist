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

displayMovement(account1.movements);

// const userName = function (str) {
//   const result = str.split(" ");
//   console.log(result);

//   result.forEach((ele, i, arr) => {
//     ele.slice(0, 1);
//     console.log(ele);
//   });
// };

// userName(account1.owner);

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
console.log(accounts);

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

// checkDogs(juliaData, kateData);
// checkDogs(juliaData2, kateData2);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUSD = 1.1;

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
