const fs = require('fs');
const path = './day1.txt';
const data2Array = data => data.split('\n').map(txt => txt * 1).sort((a, b) => a - b);
const findAns = array => {
	let a = 0;
	let b = array.length - 1;
	let c = array[a];
	let d = array[b];
	while(c + d !== 2020) {
		if (c + d < 2020) {
			a += 1;
			c = array[a];
		} else {
			b -= 1;
			d = array[b];
		}
	}
	return c * d;
};
fs.readFile(path, 'utf8', (err, data) => {
	if (err) throw err;
	const array = data2Array(data);
	console.log(findAns(array));
});
