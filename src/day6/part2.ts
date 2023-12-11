import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day6.txt", "utf8").split("\n");

const time = Number(
	values[0]
		.split(":")[1]
		.split(" ")
		.filter((x) => x !== "")
		.reduce((a, b) => a + b)
);
const distance = Number(
	values[1]
		.split(":")[1]
		.split(" ")
		.filter((x) => x !== "")
		.reduce((a, b) => a + b)
);

console.log(time);
console.log(distance);

let currWays = 0;

for (let buttonHeld = 1; buttonHeld < time - 1; buttonHeld++) {
	const distancePerformed = (time - buttonHeld) * buttonHeld;
	if (distancePerformed > distance) currWays++;
}

console.log(currWays);
