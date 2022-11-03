const MIN_AMOUNT = 1000;
const MIN_YEARS = 1;
const MAX_PERCENTAGE = 100;
const FIXED = 2;

const amount = getAmmount()
const year = getYears();
const percentage = getPercent();



function getAmmount() {
    const amount = parseInt(window.prompt('initial amount of money'));

    if (isNaN(amount) || amount < MIN_AMOUNT) {
        return alert('Invalid input data');
    }
    return amount;
}

function getYears() {
    const year = parseInt(window.prompt('number of years'));

    if (isNaN(year) || year < MIN_YEARS) {
        return alert('Invalid input data');
    }
    return year;
}

function getPercent() {
    const percentage = parseInt(window.prompt('percentage of a year'))

    if (isNaN(percentage) || percentage > MAX_PERCENTAGE) {
        return alert('Invalid input data');
    }
    return percentage;
}

function getProfit(amount, percentage) {
    return amount * percentage / MAX_PERCENTAGE
}

let currentAmount = amount;

for (let i = year; i !== 0; i--) {
    currentAmount = currentAmount + getProfit(currentAmount, percentage);
}

let profit = currentAmount - amount;

alert(
    `Initial amount: ${amount}
Number of years: ${year}
Percentage of year: ${percentage}

Total profit: ${profit.toFixed(FIXED)}
Total amount: ${currentAmount.toFixed(FIXED)}`)