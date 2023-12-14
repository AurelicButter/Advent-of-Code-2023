import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day13.txt", "utf8").split("\n");

let vertSum = 0;
let horzSum = 0;

class Grid {
	grid: string[][] = [];

	addRow(input: string) {
		this.grid.push(input.split(""));
	}

	private checkVertical(left: number, right: number) {
		// Use right since right = left + 1 and +1 is needed for array offset
		const possibleValue = right;
		let difference = 0;

		while (left > -1 && right < this.grid[0].length) {
			for (let y = 0; y < this.grid.length; y++) {
				if (this.grid[y][left] !== this.grid[y][right]) difference++;
			}

			left--;
			right++;
		}

		return difference === 1 ? possibleValue : 0;
	}

	private checkHorizontal(left: number, right: number) {
		const possibleValue = right;
		let difference = 0;

		while (left > -1 && right < this.grid.length) {
			for (let x = 0; x < this.grid[0].length; x++) {
				if (this.grid[left][x] !== this.grid[right][x]) difference++;
			}

			left--;
			right++;
		}

		return difference === 1 ? possibleValue : 0;
	}

	findMirror() {
		for (let x = 0; x + 1 < this.grid[0].length; x++) {
			const temp = this.checkVertical(x, x + 1);
			vertSum += temp;
			if (temp > 0) return;
		}

		for (let y = 0; y + 1 < this.grid.length; y++) {
			const temp = this.checkHorizontal(y, y + 1);
			horzSum += temp;
			if (temp > 0) return;
		}
	}
}

let currGrid = new Grid();

for (let i = 0; i < values.length; i++) {
	if (values[i] !== "") {
		currGrid.addRow(values[i]);
	} else {
		currGrid.findMirror();
		currGrid = new Grid();
	}
}

currGrid.findMirror();

console.log(horzSum * 100 + vertSum);
