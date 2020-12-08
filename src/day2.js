const { getData } = require('./lib');
const path = './day2.txt';

const cb = array => {
    console.log(array.reduce((total, txt) => total + ans(txt) * 1, 0));
    console.log(array.reduce((total, txt) => total + ans2(txt) * 1, 0));
};

const txt2Array = txt => txt.replace(/(\d+)\-(\d+) (\w): (\w+)/, '$1 $2 $3 $4').split(' ');

const ans = txt => {
    const [min, max, word, password] = txt2Array(txt);
    const reg = new RegExp(word, 'g');
    const length = (password.match(reg) || []).length;
    return min <= length && length <= max;
};

const ans2 = txt => {
    const [idx1, idx2, word, password] = txt2Array(txt);
    const match1 = password.charAt(idx1 - 1) === word;
    const match2 = password.charAt(idx2 - 1) === word;
    return match1 !== match2;
}

getData({ path, cb });
