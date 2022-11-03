// Your code goes here
const minusOne = -1
const three = 3

function isEqual(num1, num2) {
    let result = Object.is(num1, num2)
    return result;
}

function isBigger(num1, num2) {
    let result = num1 > num2
    return result
}

function storeNames() {
    let words = [...arguments]
    let result = words.filter(el => typeof el === 'string')
    return result
}

function getDifference(num1, num2) {
    function mod(num) {
        return num < 0 ? num * minusOne : num;
    }
    return mod(num1 < num2 ? num2 - num1 : num1 - num2);
}

function negativeCount(arr) {
    let negativeElements = arr.filter(el => el < 0);
    const result = negativeElements.length;
    return result
}

function letterCount(str1, str2) {
    let words = [...str1];
    let result = words.filter(el => el === str2);
    return result.length > 0 ? result : 0
}

function countPoints(points) {
    let result = 0;
    for (let i = 0; i < points.length; i++) {
        let oneGame = points[i].split(':')
        let toNum = oneGame.map(Number)

        let x = toNum[0]
        let y = toNum[1]
        switch (true) {
            case x > y:
                result = result + three;
                break;
            case x < y:
                result = result + 0;
                break;
            case x === y:
                result = result + 1;
                break;
            default:
                break;
        }
    }
    return result;
}