import { readFileSync } from "fs";
const [rawTimes, rawDistances] = readFileSync("./inputs/Day6.txt", "utf8").split("\n");

function cleanArray(arr: string) {
	return arr
		.split(":")[1]
		.split(" ")
		.reduce(function (res, x) {
			if (x !== "") res.push(Number(x));
			return res;
		}, []);
}

const times = cleanArray(rawTimes);
const distances = cleanArray(rawDistances);

let multiplySum = 1;

for (let raceNum = 0; raceNum < times.length; raceNum++) {
	let currWays = 0;

	for (let buttonHeld = 1; buttonHeld < times[raceNum] - 1; buttonHeld++) {
		const distancePerformed = (times[raceNum] - buttonHeld) * buttonHeld;
		if (distancePerformed > distances[raceNum]) currWays++;
	}

	if (currWays > 0) multiplySum = multiplySum * currWays;
}

console.log(multiplySum);
