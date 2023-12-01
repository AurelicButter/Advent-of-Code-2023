import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day1.txt", "utf8").split("\n");

function replaceAt(str: string, char: string, index: number) {
	return str.substring(0, index) + char + str.substring(index + 1);
}

const nums = values.map((x) => {
	for (let i = 0; i < x.length; i++) {
		const temp = x.slice(i, i + 5);

		if (temp.startsWith("one")) {
			x = replaceAt(x, "1", i);
		} else if (temp.startsWith("two")) {
			x = replaceAt(x, "2", i);
		} else if (temp.startsWith("three")) {
			x = replaceAt(x, "3", i);
		} else if (temp.startsWith("four")) {
			x = replaceAt(x, "4", i);
		} else if (temp.startsWith("five")) {
			x = replaceAt(x, "5", i);
		} else if (temp.startsWith("six")) {
			x = replaceAt(x, "6", i);
		} else if (temp.startsWith("seven")) {
			x = replaceAt(x, "7", i);
		} else if (temp.startsWith("eight")) {
			x = replaceAt(x, "8", i);
		} else if (temp.startsWith("nine")) {
			x = replaceAt(x, "9", i);
		}
	}

	const temp = x.replaceAll(/[a-zA-Z]/g, "").trim();
	return Number(temp.charAt(0) + temp.charAt(temp.length - 1));
});

console.log(nums.reduce((a, b) => a + b));
