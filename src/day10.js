const { getData } = require('./lib');
const path = './day10.txt';

const countDiff = array => {
	const map = array.reduce(({ pre, ...obj }, num) => {
		if (!obj[num - pre]) obj[num - pre] = 0;
		obj[num - pre] += 1;
		obj.pre = num;
		return obj;
	}, { pre: 0 });
	return map[1] * (map[3] + 1);
}

const routeChecker = array => {
	if (array.length < 3) {
		return 1;
	}
	const [head, ...tail] = array;
	const sub = (last, arr) => {
		const [h, ...t] = arr;
		if (h - last > 3) {
			return 0;
		}
		if (arr.length === 1) {
			return 1;
		}
		return sub(h, t) + sub(last, t)
	}
	return sub(head, tail);
}

const countRoute = array => {
	const { arr: splitArr, last } = array.reduce(({ arr, pre, last }, cur) => {
		if (cur - pre === 3) {
			arr.push(last);
			last = [cur];
		} else {
			last.push(cur);	
		}
		pre = cur;
		return { arr, pre ,last };
	}, { arr: [], pre: array[0], last: [] });
	splitArr.push(last);
	return splitArr.reduce((total, arr) => total * routeChecker(arr), 1);
}

const cb = array => {
	array = array.reduce((arr, t) => {
		arr.push(t * 1);
		return arr;
	}, [0]).sort((a, b) => a - b);
	console.log(countDiff(array));
	console.log(countRoute(array));
};

getData({ path, cb });
