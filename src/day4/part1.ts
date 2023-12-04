import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day4.txt", "utf8").split("\n");

let sum = 0;
for (let i = 0; i < values.length; i++) {
	if (!values[i]) break;
	const cards = values[i].split(": ")[1].replaceAll("  ", " ");

	const pairs = cards.split(" | ");

	const winning = pairs[0].split(" ").map((x) => Number(x));
	const entered = pairs[1].split(" ").map((x) => Number(x));

	let count = 0;
	for (let x = 0; x < entered.length; x++) {
		if (winning.includes(entered[x])) count++;
	}

	if (count > 0) count = 1 << count - 1;
	sum += count;
}

console.log(sum);
