const fs = require('fs');

const data2Array = data => data.split('\n');

const getData = ({ path, cb }) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        let array = data2Array(data);
        array.length -= 1;
        if (!cb) {
            console.log(array);
        } else {
            cb(array);
        }
    });
};

module.exports = {
    getData,
};
