import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day2.txt", "utf8").split("\n");

let sum = 0;

for (let i = 0; i < values.length; i++) {
	if (!values[i]) continue;
	const rounds = values[i].split(": ")[1].trim().split("; ");
	let maxRed = 0;
	let maxGreen = 0;
	let maxBlue = 0;

	for (let x = 0; x < rounds.length; x++) {
		const cubes = rounds[x].split(", ");
		for (let y = 0; y < cubes.length; y++) {
			const [amt, color] = cubes[y].split(" ");

			if (color === "red" && Number(amt) > maxRed) {
				maxRed = Number(amt);
			}

			if (color === "blue" && Number(amt) > maxBlue) {
				maxBlue = Number(amt);
			}

			if (color === "green" && Number(amt) > maxGreen) {
				maxGreen = Number(amt);
			}
		}
	}

	// console.log(`MAXIMUM: RED(${maxRed}), GREEN(${maxGreen}), BLUE(${maxBlue})`);

	// console.log(maxRed * maxGreen * maxBlue);

	sum = sum + maxRed * maxGreen * maxBlue;
}

console.log(sum);
