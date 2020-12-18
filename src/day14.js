const { getData } = require('./lib');
const path = './day14.txt';

const sumValue = array => {
	const [res, ..._] = array.map(txt => txt.split(' = '))
		.reduce(([res, len, mask], [cmd, value]) => {
			if (cmd === 'mask') {
				mask = value;
				len = value.length;
			} else {
				const bin = (value * 1).toString(2).padStart(len, '0').split('')
					.map((v, i) => /x/i.test(mask[i]) ? v : mask[i])
					.join('');
				res[cmd] = bin;
			}
			return [res, len, mask];
		}, [{}, 0, '']);
	
	return Object.values(res).reduce((res, bin) => res + parseInt(bin, 2), 0);
}

const sumValue2 = array => {
	const obj = {};
	array.map(txt => txt.split(' = '))
		.reduce(([len, mask], [cmd, value]) => {
			if (cmd === 'mask') {
				mask = value;
				len = value.length;
			} else {
				const key = (cmd.replace(/mem\[(\d*)\]/, '$1') * 1).toString(2).padStart(len, '0')
				const bin = key.split('')
					.map((v, i) => /0/.test(mask[i]) ? v : mask[i])
					.join('');
				calFloating(bin).map(address => { obj[address] = value * 1; });
			}
			return [len, mask];
		}, [0, '']);
	return Object.values(obj).reduce((a, b) => a + b, 0);
}

const calFloating = inputBin => {
	const inner = (bin) => {
		if (/x/i.test(bin)) {
			return [...inner(bin.replace(/x/i, 0)), ...inner(bin.replace(/x/i, 1))];
		}
		return [bin];
	}
	return [...inner(inputBin)];
}


const cb = array => {
	console.log(sumValue(array));
	console.log(sumValue2(array));
};

getData({ path, cb });
