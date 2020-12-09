const { getData } = require('./lib');
const path = './day5.txt';

const cb = array => {
    console.log(ans(array));
    console.log(ans2(array));
};

const bin2Int = bin => parseInt(bin, 2);

class BoardingPass {
	constructor(txt) {
		const [row, column, ] = txt.replace(/[BR]/g, '1')
			.replace(/[FL]/g, '0')
			.split(/(\d{3})$/).map(bin2Int);
		this._row = row;
		this._column = column;
		this._magicN = 8;
	}

	get getId() { return this._row * this._magicN + this._column }
}

const ans = array => Math.max(...array.map(txt => new BoardingPass(txt).getId));

const ans2 = array => array.map(txt => new BoardingPass(txt).getId).sort((a, b) => b - a)
	.reduce(([arr, pre], cur) => {
		if (pre - cur !== 1) {
			arr.push(cur + 1);
		}
		pre = cur;
		return [arr, pre];
	}, [[], 0])[0][1];

getData({ path, cb });
