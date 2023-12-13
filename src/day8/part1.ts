import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day8.txt", "utf8").split("\n");

class Node {
	key: string;
	left: string;
	right: string;

	constructor(input: string) {
		const [key, paths] = input.split(" = ");
		const [left, right] = paths.split(", ");

		this.key = key.trim();
		this.left = left.substring(1);
		this.right = right.substring(0, right.length - 1);
	}
}

const NodeMap = new Map<string, Node>();
const directions = values[0].split("");

for (let i = 2; i < values.length; i++) {
	const temp = new Node(values[i]);
	NodeMap.set(temp.key, temp);
}

let currLocation = NodeMap.get("AAA");
let currSteps = 0;
let directionIndex = 0;

while (currLocation.key !== "ZZZ") {
	currSteps++;

	currLocation = NodeMap.get(directions[directionIndex] === "R" ? currLocation.right : currLocation.left);

	if (directionIndex + 1 >= directions.length) directionIndex = 0;
	else directionIndex++;
}

console.log(currSteps);
