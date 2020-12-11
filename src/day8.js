const { getData } = require('./lib');
const path = './day8.txt';

const operation = (line, idx, acc) => {
	const [cmd, n] = line.split(' ');
	if (cmd === 'acc') {
		return [idx + 1, acc + (n * 1)];
	} else if (cmd === 'jmp') {
		return [idx + (n * 1), acc];
	} else {
		return [idx + 1, acc];
	}
}

const findSecondLoop = array => {
	let idx = 0, acc = 0;
	const visitSet = new Set();
	while (!visitSet.has(idx)) {
		visitSet.add(idx);
		[idx, acc] = operation(array[idx], idx, acc);
	}
	return acc;
}

const findFinite = array => {
	let idx = 0, acc = 0;
	const last = array.length;
	const visitSet = new Set();
	visitSet.add(last);
	const jmpIdxList = array.reduce((arr, line, idx) => {
		if (/jmp/.test(line)) {
			arr.push(idx);
		}
		return arr;
	}, []);
	while (x = jmpIdxList.pop()) {
		const cloneArray = [...array];
		cloneArray[x] = cloneArray[x].replace(/jmp/, 'nop');
		while (!visitSet.has(idx)) {
			visitSet.add(idx);
			[idx, acc] = operation(cloneArray[idx], idx, acc);
		}
		if (idx === last) {
			break;
		}
		visitSet.clear();
		visitSet.add(last);
		idx = 0, acc = 0;
	}

	return acc;
}

const cb = array => {
	console.log(findSecondLoop(array));
	console.log(findFinite(array));
};

getData({ path, cb });
