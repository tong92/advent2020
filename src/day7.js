const { getData } = require('./lib');
const path = './day7.txt';

const bagColor = txt => txt.replace(/(?:\d )?(\w*) (\w*) bags?\.?/g, '$1 $2');

const bagColor2 = txt => txt.replace(/(\w*) (\w*) bags?\.?/g, '$1 $2');

const makeMap = bagColor => array => array.reduce((o, txt) => {
		const [h, t] = bagColor(txt).split(' contain ');
		o[h] = t.split(', ');
		return o;
	}, {});

const searchColor = (map, color) => {
	map = Object.entries(map);
	const colorSet = new Set();
	let nextColor = color;
	let idx = 0;
	while (nextColor) {
		map.map(([key, values]) => {
			if (values.includes(nextColor) && !colorSet.has(key)) {
				colorSet.add(key);
			}
		});
		nextColor = [...colorSet][idx++];
	}
	return colorSet.size;
}

const countBag = (colorMap, colors, res) => {
	if (colors.length === 0) {
		return res;
	}
	const newList = [];
	colors.map(([bag, mul]) => {
		const bags = colorMap[bag];
		bags.map(txt => {
			if (txt !== 'no other') {
				const n = txt.replace(/(\d*)\D*/, '$1');
				res += mul * n;
				const key = txt.replace(/(\d* )/, '');
				newList.push([key, n * mul]);
			}
		});
	});
	return countBag(colorMap, newList, res)
}

const cb = array => {
	const colorMap = makeMap(bagColor)(array);
	console.log(searchColor(colorMap, 'shiny gold'));
	const colorMap2 = makeMap(bagColor2)(array);
    console.log(countBag(colorMap2, [['shiny gold', 1]], 0));
};

getData({ path, cb });
