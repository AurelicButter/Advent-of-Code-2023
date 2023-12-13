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

function gcd(a: number, b: number) {
	return b === 0 ? a : gcd(b, a % b);
}

function lcm(steps: number[]) {
	return steps.reduce((a, b) => a * b / gcd(a, b));
}

const NodeMap = new Map<string, Node>();
const directions = values[0].split("");
const startLocations: Node[] = [];

for (let i = 2; i < values.length; i++) {
	const temp = new Node(values[i]);
	NodeMap.set(temp.key, temp);

	if (temp.key.endsWith("A")) startLocations.push(temp);
}

let directionIndex = 0;
const pathing: number[] = [];

for (let i = 0; i < startLocations.length; i++) {
	let currLocation = startLocations[i];
	let currSteps = 0;

	while (!currLocation.key.endsWith("Z")) {
		currSteps++;

		currLocation = NodeMap.get(directions[directionIndex] === "R" ? currLocation.right : currLocation.left);

		if (directionIndex + 1 >= directions.length) directionIndex = 0;
		else directionIndex++;
	}

	pathing.push(currSteps);
}

console.log(lcm(pathing));
