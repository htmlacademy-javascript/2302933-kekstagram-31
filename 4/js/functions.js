// Функция №1: проверка длины строки
const checkingStringLength = (string, stringLength) => {
  return string.length <= stringLength;
};

// Функция №2 является ли строка палиндромом
const isStringPalindrome = (string) => {
  const initialString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';
  for (let i = initialString.length - 1; i >= 0; i--) {
    newString += initialString[i];
  }
  return initialString === newString;
};

// Функция №3 извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа
const returnNumberFromString = (string) => {
  const initialString = string.toString();
  let number = '';
  for (let i = 0; i <= initialString.length; i++) {
    if (!Number.isNaN(parseInt(initialString[i], 10))) {
      number += initialString[i];
    }
  }
  return parseInt(number, 10);
};
