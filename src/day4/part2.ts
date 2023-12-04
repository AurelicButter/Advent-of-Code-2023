import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day4.txt", "utf8").split("\n");

let sum = 0;
const copies = Array(values.length).fill(1);
for (let i = 0; i < values.length; i++) {
	if (!values[i]) break;
	const cards = values[i].split(": ")[1].replace(/\s\s/g, " ").trim();

	const pairs = cards.split(" | ");

	const winning = pairs[0].split(" ").map((x) => {
		if (x !== "") return Number(x);
	});
	const entered = pairs[1].split(" ").map((x) => {
		if (x !== "") return Number(x);
	});

	let index = 1;
	for (let x = 0; x < entered.length; x++) {
		if (winning.includes(entered[x])) {
			copies[i + index] += copies[i];
			index++;
		}
	}

	sum += copies[i];
}

console.log(sum);
