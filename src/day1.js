const { getData } = require('./lib');
const path = './day1.txt';

const cb = array => {
	const sortArray = array.map(txt => txt * 1).sort((a, b) => a - b);
    console.log(ans(sortArray));
    console.log(ans2(sortArray));
};

const ans = array => {
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

const ans2 = array => {
	let a = 0;
	let b = 1;
	let c = array.length - 1;
	let total = array[a] + array[b] + array[c];
	while(total !== 2020) {
		console.log(array[b], array[c], b, c, total)
		if (total < 2020) {
			total += -array[b] + array[b += 1];
		} else {
			total += -array[c] + array[c -= 1];
		}
		if (b >= c) {
			a += 1;
			b = a + 1;
			c = array.length - 1;
			total = array[a] + array[b] + array[c];
		}
	}
	return array[a] * array[b] * array[c];
}

getData({ path, cb });
