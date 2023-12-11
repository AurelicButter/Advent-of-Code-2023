import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day7.txt", "utf8").split("\n");

const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const handRanks = ["High", "One", "Two", "Three", "Full", "Four", "Five"];

class Hand {
	cards = [];
	type: string;
	bid: number;

	constructor(input: string) {
		const splitInput = input.split(" ");

		this.bid = Number(splitInput[1]);

		const counts = {};

		splitInput[0].split("").forEach((value) => {
			counts[value] = counts[value] ? counts[value] + 1 : 1;
			this.cards.push(ranks.indexOf(value));
		});

		const unique = Object.keys(counts);

		if (unique.length === 5) this.type = "High";
		else if (unique.length === 4) this.type = "One";
		else if (unique.length === 1) this.type = "Five";
		else {
			const values = Object.values(counts);

			if (unique.length === 3) {
				this.type = values.includes(3) ? "Three" : "Two";
			}
			if (unique.length === 2) {
				this.type = values.includes(4) ? "Four" : "Full";
			}
		}
	}

	compareHands(bHand: Hand): number {
		const typeCheck = handRanks.indexOf(this.type) - handRanks.indexOf(bHand.type);

		if (typeCheck !== 0) return typeCheck;

		for (let i = 0; i < this.cards.length; i++) {
			if (this.cards[i] !== bHand.cards[i]) {
				return this.cards[i] > bHand.cards[i] ? 1 : -1;
			}
		}
		return 0;
	}
}

const hands: Hand[] = [];

values.forEach((item) => hands.push(new Hand(item)));

hands.sort((a, b) => a.compareHands(b));

console.log(
	hands.reduce((sum, curr, index) => {
		return sum + curr.bid * (index + 1);
	}, 0)
);
