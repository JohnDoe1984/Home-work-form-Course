const NUM_MINUS_ONE = -1
const EIGHTEEN = 18

function reverseNumber(num) {
    let mod = num >= 0 ? 1 : NUM_MINUS_ONE;
    let abs = num * mod;

    let del = 10;
    let lt;
    let parsed = '';
    let proc = true;
    while (proc) {
        lt = abs % del;
        parsed += lt;
        proc = abs - lt;
        abs = proc / del;
    }

    return Number(parsed) * mod;
}

function forEach(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        func(element);
    }
}

function map(arr, func) {
    let result = []
    forEach(arr, function (el) {
        const iterationResult = func(el)
        result.push(iterationResult)
    })
    return result
}

function filter(arr, func) {
    let result = []
    forEach(arr, function (el) {
        if (func(el)) {
            result.push(el)
        }
    })
    return result
}

function getAdultAppleLovers(data) {
    const filterElements = filter(data, function (el) {
        return el.age > EIGHTEEN && el.favoriteFruit === 'apple';
    })

    const mapName = map(filterElements, function (el) {
        return el.name
    })

    return mapName;
}

function getKeys(obj) {
    let result = [];
    for (const key in obj) {
        if (key) {
            result.push(key);
        }
    }
    return result;
}

function getValues(obj) {
    let result = []
    for (const key in obj) {
        if (key) {
            const element = obj[key];
            result.push(element)
        }
    }
    return result
}