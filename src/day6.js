const { getData, getData2 } = require('./lib');
const path = './day6.txt';

const cb = array => {
    console.log(ans(array));
};

const cb2 = array => {
    console.log(ans2(array));
};

const ans = array => array.reduce((total, txt) => total + new Set(txt.split('').filter(c => c !== ' ')).size, 0);

const ans2 = array => {
	const [arr, obj, max] = array.reduce(([arr, obj, max], txt) => {
		if (txt === '') {
			obj.max = max;
			arr.push(obj);
			return [arr, {}, 0];
		}
		obj = txt.split('').reduce((o, c) => {
			if (!o[c]) o[c] = 0;
			o[c] += 1;
			return o;
		}, obj);
		return [arr, obj, max + 1];
	}, [[], {}, 0]);
	obj.max = max;
	arr.push(obj);
	return arr.reduce((total, { max, ...o }) => {
		return total + Object.entries(o).reduce((t, [_, v]) => {
			if (v === max) {
				t += 1;
			}
			return t;
		}, 0);
	}, 0);
};

getData2({ path, cb });
getData({ path, cb: cb2 });
