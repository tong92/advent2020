const playGame = (startingNumber, nth) => {
	const memory = Array(nth).fill(0);
	let i = 1, last = 0;
	while (i <= startingNumber.length) {
		last = startingNumber[i - 1];
		memory[last] = i;
		i += 1;
	}
	last = 0;
	while (i < nth) {
		if (memory[last] === 0) {
			memory[last] = i;
			last = 0;
		} else {
			const swap = last;
			last = i - memory[last];
			memory[swap] = i;
		}
		i += 1;
	}
	return last;
}

const input = [19,0,5,1,10,13];

console.log(playGame(input, 2020));
console.log(playGame(input, 30_000_000));
