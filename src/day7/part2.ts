import { readFileSync } from "fs";
const values = readFileSync("./inputs/Day7.txt", "utf8").split("\n");

const ranks = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];
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

		let unique = Object.keys(counts);
		const jokers = counts["J"];

		if (jokers) {
			for (let i = 0; i < unique.length; i++) {
				counts[unique[i]] += jokers;
			}
			delete counts["J"];
		}

		unique = Object.keys(counts);
		const values = Object.values(counts);

		if (unique.length === 1 || jokers === 5) this.type = "Five";
		else if (unique.length === 2) {
			if (values.includes(4)) this.type = "Four";
			else this.type = "Full";
		} else if (unique.length === 3) {
			if (values.includes(3)) this.type = "Three";
			else this.type = "Two";
		} else if (unique.length === 4) {
			if (values.includes(3)) this.type = "Three";
			else this.type = "One";
		} else if (values.includes(2)) this.type = "One";
		else this.type = "High";
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
console.log(hands.reduce((sum, curr, index) => sum + curr.bid * (index + 1), 0));
