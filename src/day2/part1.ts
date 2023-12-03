import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day2.txt", "utf8").split("\n");

const redCubes = 12;
const greenCubes = 13;
const blueCubes = 14;
let sum = 0;

for (let i = 0; i < values.length; i++) {
	if (!values[i]) continue;
	const rounds = values[i].split(": ")[1].trim().split("; ");
	let possible = true;

	for (let x = 0; x < rounds.length; x++) {
		const cubes = rounds[x].split(", ");
		for (let y = 0; y < cubes.length; y++) {
			const [amt, color] = cubes[y].split(" ");

			if (
				color === "green" && Number(amt) > greenCubes ||
				color === "blue" && Number(amt) > blueCubes ||
				color === "red" && Number(amt) > redCubes
			) {
				possible = false;
				break;
			}
		}

		if (!possible) break;
	}

	if (possible) sum = sum + i + 1;
}

console.log(sum);
