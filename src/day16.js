const { getData2 } = require('./lib');
const path = './day16.txt';
// const path = './day16sample.txt';
// const path = './day16sample2.txt';

const getValidator = txt => {
	const [, ...validCondition] = txt.split(',');
	return validCondition.map(t => t.replace(/.*: /, ''))
		.map(condition => {
			const [a, b] = condition.split(' or ')
			const [minA, maxA] = a.split('-');
			const [minB, maxB] = b.split('-');
			return n => (n >= minA && n <= maxA) || (n >= minB && n <= maxB);
		});
}

const getTickets = txt => {
	const [, _,...tickets] = txt.split(',');
	return tickets;
}

const validChecker = ([validTxt, _, nearbyTickets]) => {
	const validator = getValidator(validTxt);
	return getTickets(nearbyTickets)
		.filter(t => !validator.some(f => f(t * 1)))
		.reduce((t, c) => t + c * 1, 0);
}

const fieldList = txt => {
	const [, ...validCondition] = txt.split(',');
	return validCondition.map(t => t.replace(/(.*): .*/, '$1'));
}

const validChecker2 = ([validTxt, myTicket, nearbyTickets]) => {
	const validator = getValidator(validTxt);
	const len = validator.length;
	const mine = getTickets(myTicket);
	const fieldPos = getTickets(nearbyTickets)
		.reduce((arr, ticket) => { // set ticket
			let last = arr.length - 1;
			if (arr[last].length === len) {
				last += 1;
				arr.push([]);
			}
			arr[last].push(ticket);
			return arr;
		}, [[]])
		.filter(ticket => ticket.every(t => validator.some(f => f(t * 1)))) // filter valid
		.reduce((arr, ticket) => { // ticket to field
			ticket.map((f, i) => { arr[i].push(f * 1); });
			return arr;
		}, Array(len).fill(0).map(_ => ([])))
		.map((col, colIdx) => ({
			arr: validator.map(f => col.every(c => f(c))),
			colIdx,
		})) // field check
		.sort((a, b) => a.arr.filter(x => x).length - b.arr.filter(x => x).length)
		.reduce((res, { arr, colIdx }) => { // find field position
			const idx = arr.findIndex((x, i) => x && res[i] < 0);
			res[idx] = colIdx;
			return res;
		}, Array(len).fill(-1))
	let result = 1;
	let cnt = 0;
	while (cnt < 6) {
		const idx = fieldPos[cnt];
		result *= mine[idx];
		cnt++;
	}
	return result;
}

const cb = array => {
	console.log(validChecker(array));
	console.log(validChecker2(array));
}

getData2({ path, cb, separator: ',' });
