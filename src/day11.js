const { getData } = require('./lib');
const path = './day11.txt';
// const path = './day11sample.txt';

const seatCheck = (pre, now ,next, idx) => {
	let seats = pre[idx - 1] || '.';
	seats += pre[idx] || '.';
	seats += pre[idx + 1] || '.';
	seats += now[idx - 1] || '.';
	seats += now[idx + 1] || '.';
	seats += next[idx - 1] || '.';
	seats += next[idx] || '.';
	seats += next[idx + 1] || '.';
	return seats;
}

const seatCheck2 = (array, i, j) => {
	const l = array[0].length;
	const h = array.length;
	let seats = '', dx = -1, dy = -1;
	seats += findSeat(array, i + dy, j + dx, dx, dy, l, h), dx = 0;
	seats += findSeat(array, i + dy, j + dx, dx, dy, l, h), dx = 1;
	seats += findSeat(array, i + dy, j + dx, dx, dy, l, h), dy = 0;
	seats += findSeat(array, i + dy, j + dx, dx, dy, l, h), dy = 1;
	seats += findSeat(array, i + dy, j + dx, dx, dy, l, h), dx = 0;
	seats += findSeat(array, i + dy, j + dx, dx, dy, l, h), dx = -1;
	seats += findSeat(array, i + dy, j + dx, dx, dy, l, h), dy = 0;
	seats += findSeat(array, i + dy, j + dx, dx, dy, l, h);
	return seats;
}

const findSeat = (array, i, j, dx, dy, l, h) => {
	if (i < 0 || i >= h) return '.';
	if (j < 0 || j >= l) return '.';
	const seat = array[i][j];
	if (seat === '.') return findSeat(array, i + dy, j + dx, dx, dy, l, h);
	return seat;
}

const conditionCheck = (pre, now, next) => now.map((seat, idx) => {
		const seats = seatCheck(pre, now, next, idx);
		if (/L/.test(seat)) {
			if (seats.replace(/[.L]/g, '').length === 0) return '#';
		} else if (/#/.test(seat)) {
			if (seats.replace(/[.L]/g, '').length >= 4) return 'L';
		}
		return seat;
	});
	
const conditionCheck2 = (row, array, i) => row.map((seat, j) => {
		const seats = seatCheck2(array, i, j);
		if (/L/.test(seat)) {
			if (seats.replace(/[.L]/g, '').length === 0) return '#';
		} else if (/#/.test(seat)) {
			if (seats.replace(/[.L]/g, '').length >= 5) return 'L';
		}
		return seat;
	});

const countOccuped = array => {
	let state = Array(...array);
	const inner = array => {
		let pre = [], next = array[1];
		const newArr = array.map((now, idx) => {
			const newNow = conditionCheck(pre, now, next);
			pre = now;
			next = array[idx + 2] || [];
			return newNow;
		});
		if (state.join('') === newArr.join('')) {
			x = newArr.join('').replace(/[.,L]/g, '').length;

			return x;
		}
		state = Array(...newArr);
		return inner(newArr);
	}
	return inner(array);
};

const countOccuped2 = array => {
	let state = Array(...array);
	const inner = array => {
		const newArr = array.map((row, idx) => conditionCheck2(row, array, idx));
		if (state.join('') === newArr.join('')) {
			x = newArr.join('').replace(/[.,L]/g, '').length;

			return x;
		}
		state = Array(...newArr);
		return inner(newArr);
	}
	return inner(array);
};

const cb = array => {
	array = array.map(t => t.split(''));
	console.log(countOccuped(array));
	console.log(countOccuped2(array));
};

getData({ path, cb });
