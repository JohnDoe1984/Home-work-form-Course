function getAge(birthday) {
    const today = new Date();
    let age = 0;

    if (birthday.getFullYear() < today.getFullYear()) {
        age = today.getFullYear() - birthday.getFullYear()
        if (birthday.getMonth() > today.getMonth()) {
            age--;
        } else if (birthday.getMonth() === today.getMonth()) {
            if (birthday.getDate() > today.getDate()) {
                age--;
            }
        }
    }

    return age
}

function getWeekDay(input) {
    let date;
    if (input instanceof Date) {
        date = input;
    } else if (typeof input === 'number') {
        date = new Date(input);
    } else {
        return;
    }

    return date.toLocaleString('en-us', { weekday: 'long' });
}

function getAmountDaysToNewYear() {
    const ms = 1000;
    const sec = 60;
    const hours = 24
    const newYear = new Date(new Date().getFullYear() + 1, 0, 1);
    const today = new Date();
    const daysToNewYear = newYear - today;

    return Math.trunc(daysToNewYear / ms / sec / sec / hours);
}

function getProgrammersDay(year) {
    const celebrateDay = 256;
    const date = new Date(year, 0, celebrateDay);
    const weeksName = getWeekDay(date)
    const mounth = `${date.toLocaleString('en-us', { month: 'short' })}`
    const output = `${date.getDate()} ${mounth}, ` + `${date.getFullYear()} (${weeksName})`

    return output.toLocaleString();
}

function howFarIs(weekday) {
    const zero = 0
    const one = 1
    const tho = 2
    const three = 3
    const four = 4
    const five = 5
    const six = 6
    const seven = 7

    const weekdays = new Map();
    weekdays.set('monday', one);
    weekdays.set('tuesday', tho);
    weekdays.set('wednesday', three);
    weekdays.set('thursday', four);
    weekdays.set('friday', five);
    weekdays.set('saturday', six);
    weekdays.set('sunday', zero);

    const date = new Date();
    const specifiedWeekday = Number(weekdays.get(weekday.toLowerCase()));
    const today = date.getUTCDay();
    const number = (seven - today + specifiedWeekday - 1) % seven;
    const expectedDay = new Date(date.setDate(date.getDate() + number)).toLocaleString('en-us', { weekday: 'long' });

    if (number === 0) {
        return `Hey, today is ${expectedDay} =)`;
    } else {
        return `It's ${number} day(s) left till ${expectedDay}`;
    }
}

function isValidIdentifier(string) {
    const regExp = new RegExp(/^[a-zA-Z_$]{1}[a-zA-Z0-9_$]*$/)
    return regExp.test(string)
}

function capitalize(testStr) {
    return testStr.replace(/( |^)[а-яёa-z]/g, function (x) {
        return x.toUpperCase();
    });
}

function isValidAudioFile(fileName) {
    const regExp = /^[a-zA-Z]+\.(mp3|flac|alac|aac)$/;
    return regExp.test(fileName);
}

function getHexadecimalColors(testString) {
    const regExp = /#([a-fA-Z0-9]{3}){1,2}(?![a-zA-Z0-9])/ig;
    const arr = [];
    let match = regExp.exec(testString);

    while (match) {
        arr.push(match[0]);
        match = regExp.exec(testString);
    }

    return arr;
}

function isValidPassword(password) {
    const reg2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    return reg2.test(password);
}

function addThousandsSeparators(input) {
    let str = input.toString();

    const regex = new RegExp('(?:((?<!,)\\d{3}))(,|$)', 'g');

    do {
        str = str.replace(regex, ',$1');
    } while (regex.test(str))

    return str;
}

function getAllUrlsFromText(testString) {
    if (!testString) {
        return 'error';
    }

    const regExp = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/ig;
    const arr = [];
    let match = regExp.exec(testString);

    while (match) {
        arr.push(match[0]);
        match = regExp.exec(testString);
    }

    return arr;
}