import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day1.txt", "utf8").split("\n");

const nums = values.map((x) => {
	const temp = x.replaceAll(/[a-zA-Z]/g, "");
	return Number(temp.charAt(0) + temp.charAt(temp.length - 1));
});

console.log(nums.reduce((a, b) => a + b));
