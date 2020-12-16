const { getData } = require('./lib');
const path = './day13.txt';

const nextBus = ([ time, busTxt ]) => {
	const [bus, earliest] = busTxt.split(',')
		.filter(txt => txt !== 'x')
		.map(bus => ([bus, bus - (time % bus)]))
		.reduce(([bus, earliest], [curBus, curEaliest]) => {
			if (curEaliest < earliest) {
				return [curBus, curEaliest];
			}
			return [bus, earliest];
		}, ['', Number.MAX_SAFE_INTEGER]);
	return bus * earliest;
};

const nextBus2 = ([ _, busTxt ]) => {
	const busTable = busTxt.split(',')
		.reduce((arr, cur, i) => {
			if (/x/.test(cur)) return arr;
			arr.push([cur * 1, i]);
			return arr;
		}, []);

	return busTable.reduce(checkOffset, [...busTable[0]].reverse())[0];
};

const checkOffset = ([time, adder], [bus, delay]) => {
	// time search
	do {
		time += adder;
	} while ((time + delay) % bus !== 0);
	const nextTime = time;
	// next time
	do {
		time += adder;
	} while ((time + delay) % bus !== 0);
	return [nextTime, time - nextTime];
};

const cb = array => {
	console.log(nextBus(array));
	console.log(nextBus2(array));
};

getData({ path, cb });
