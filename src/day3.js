const { getData } = require('./lib');
const path = './day3.txt';

const cb = array => {
    console.log(ans(array));
    console.log(ans2(array));
};

const ans = (array, right = 3) => {
    const length = array[0].length;
    const [, result] = array.reduce(([pos, result], line) => {
        line.charAt(pos) === '#' && result++;
        return [(pos + right) % length, result];
    }, [0, 0]);
    return result;
};

const ans2 = array => {
    array[0].replace(/#/g, '.');
    const subTotal = [1, 3, 5, 7].reduce((t, n) => t * ans(array, n), 1);
    const last = ans(array.filter((_, i) => i % 2 === 0), 1);
    return subTotal * last;
};

getData({ path, cb });
