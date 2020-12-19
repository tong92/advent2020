const fs = require('fs');

const getData = ({ path, cb }) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        let array = data.split('\n');
        array.length -= 1;
        if (!cb) {
            console.log(array);
        } else {
            cb(array);
        }
    });
};

const getData2 = ({ path, cb, separator = ' ' }) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        let array = data.split('\n').reduce((res, txt) => {
            if (txt) {
                res[res.length - 1] += `${separator}${txt}`;
            } else {
                res.push('');
            }
            return res;
        }, ['']).filter(txt => txt !== '');
        if (!cb) {
            console.log(array);
        } else {
            cb(array);
        }
    });
};

module.exports = {
    getData,
    getData2,
};
