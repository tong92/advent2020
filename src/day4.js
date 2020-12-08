const { getData2 } = require('./lib');
const path = './day4.txt';

const cb = array => {
    console.log(ans(array));
    console.log(ans2(array));
};

class Passport {
	constructor(txt) {
		this._data = txt.split(' ').reduce((obj, t) => {
			const [k, v] = t.split(':');
			obj[k] = v;
			return obj;
		}, this.empty());
	}

	empty = _ => ({
		byr: '',
		iyr: '',
		eyr: '',
		hgt: '',
		hcl: '',
		ecl: '',
		pid: '',
		// cid: '', //optional
	})

	isValid = _ => Object.keys(this.empty()).every(key => this._data[key] !== '')

	isValid2 = _ => {
		if (!this.isValid) return false;
		const { byr, iyr, eyr, hgt, hcl, ecl, pid } = this._data;
		const [, h, unit, ] = hgt.split(/(\d+)(\w+)/);
		if (byr < 1920 || byr > 2002) return false;
		if (iyr < 2010 || iyr > 2020) return false;
		if (eyr < 2020 || eyr > 2030) return false;
		if (unit === 'cm') {
			if (h < 150 || h > 193) return false;
		} else if (unit === 'in') {
			if (h < 59 || h > 76) return false;
		} else return false;
		if (!/^#[0-9a-z]{6}$/.test(hcl)) return false;
		if (!/^amb|blu|brn|gry|grn|hzl|oth$/.test(ecl)) return false;
		if (!/^\d{9}$/.test(pid)) return false;
		return true;
	}
}

const ans = array => array.filter(txt => new Passport(txt).isValid()).length;

const ans2 = array => array.filter(txt => new Passport(txt).isValid2()).length;

getData2({ path, cb });
