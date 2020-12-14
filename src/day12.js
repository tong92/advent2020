const { getData } = require('./lib');
const path = './day12.txt';

const rotate = (cmd, value, ori) => cmd === 'R' ? (ori + value) % 360 : (ori - value + 360) % 360;

const foward = (value, direction, [x, y]) => {
	if (direction === 0) {
		return [x + value, y];
	} else if (direction === 180) {
		return [x - value, y];
	} else if (direction === 90) {
		return [x, y - value];
	} else {
		return [x, y + value];
	}
}

const move = (value, direction, [x, y]) => {
	if (direction === 'E') {
		return [x + value, y];
	} else if (direction === 'W') {
		return [x - value, y];
	} else if (direction === 'S') {
		return [x, y - value];
	} else {
		return [x, y + value];
	}
}

const actions = array => {
	let x = 0, y = 0, rot = 0;
	array.map(([cmd, ...v]) => {
		const value = v.join('') * 1;
		if (/[RL]/.test(cmd)) {
			rot = rotate(cmd, value, rot);
		} else if (/F/.test(cmd)) {
			[x, y] = foward(value, rot, [x, y]);
		} else {
			[x, y] = move(value, cmd, [x, y]);
		}
	});
	return Math.abs(x) + Math.abs(y);
}

const rotate2 = (cmd, value, [dx, dy]) => {
	const rot = cmd === 'R' ? value % 360 : (360 - value) % 360;
	if (rot === 0) {
		return [dx, dy];
	} else if (rot === 180) {
		return [-dx, -dy];
	} else if (rot === 90) {
		return [dy, -dx];
	} else {
		return [-dy, dx];
	}
}

const foward2 = (value, [x, y], [dx, dy]) => [x + value * dx, y + value * dy];

const move2 = (value, direction, [x, y]) => {
	if (direction === 'E') {
		return [x + value, y];
	} else if (direction === 'W') {
		return [x - value, y];
	} else if (direction === 'S') {
		return [x, y - value];
	} else {
		return [x, y + value];
	}
}

const actions2 = array => {
	let x = 0, y = 0, dx = 10, dy = 1;
	array.map(([cmd, ...v]) => {
		const value = v.join('') * 1;
		if (/[RL]/.test(cmd)) {
			[dx, dy] = rotate2(cmd, value, [dx, dy]);
		} else if (/F/.test(cmd)) {
			[x, y] = foward2(value, [x, y], [dx, dy]);
		} else {
			[dx, dy] = move2(value, cmd, [dx, dy]);
		}
	});
	return Math.abs(x) + Math.abs(y);
}

const cb = array => {
	console.log(actions(array));
	console.log(actions2(array));
};

getData({ path, cb });
