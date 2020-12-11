const { getData } = require('./lib');
const path = './day9.txt', preLength = 25;

const findError = (array, preLength) => {
	const inner = (idx, n) => {
		const preArr = array.slice(idx, preLength + idx);
		while (x = preArr.pop()) {
			const num = n - x;
			if (preArr.includes(num)) {
				break;
			}
		}
		if (preArr.length === 0) {
			return n;
		}
		idx += 1;
		return inner(idx, array[preLength + idx]);
	}
	return inner(0, array[preLength]);
}

const finedWeakness = (array, preLength) => {
	const errorNum = findError(array, preLength);
	let weakList = [], idx = 0;
	let total = sum(weakList);
	while (total !== errorNum) {
		if (total < errorNum) {
			weakList.push(array[idx++]);
		} else {
			weakList.shift();
		}
		total = sum(weakList);
	}
	return calWeakness(weakList);
}

const sum = arr => arr.reduce((total, n) => n + total, 0);

const calWeakness = arr => Math.max(...arr) + Math.min(...arr);

const cb = array => {
	array = array.map(x => x * 1);
	console.log(findError(array, preLength));
	console.log(finedWeakness(array, preLength));
};

getData({ path, cb });
