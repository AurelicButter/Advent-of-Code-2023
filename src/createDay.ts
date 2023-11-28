/**
 * @author Frederick Katsura <fkatsura@katsurin.com>
 * @version 2.0.0
 * @description Script to setup the code space for an AOC day.
 */

import { createWriteStream, existsSync, mkdirSync } from "fs";
import axios from "axios";
import config from "../config.json";

const TSHeader = "import { readFileSync } from \"fs\"; \nconst values = readFileSync(\"./inputs/Day--DAYINPUT.txt\", \"utf8\").split(\"\\n\");";

function writeToFile(path: string, data: unknown) {
    const writeStream = createWriteStream(path);
    writeStream.write(data);
    writeStream.end();
}

async function retrieveDayInfo(day: number): Promise<boolean> {
    const { data: problemData, status: problemStatus } = await axios.get(
        `https://adventofcode.com/${config.year}/day/${day}`,
        {
            headers: {
                "Cookie": `session=${config.api_key}`
            }
        }
    );

    if (problemStatus !== 200) {
        console.error("FAILED TO RETREIVE PROBLEM FOR DAY!");
        return false;
    }

    const firstIndex = problemData.indexOf("<article");
    const secondIndex = problemData.indexOf("<article", firstIndex + 1);

    const parsedData = problemData
        .substring(firstIndex, problemData.indexOf("/article>") + 9)
        .replace("<h2>---", `<h2><a href="https://adventofcode.com/${config.year}/day/${day}">`)
        .replace("---</h2>", "</a></h2>")
        .replace("<article", "<div")
        .replace("article>", "div>");

    let secondHalf = "";

    if (secondIndex > 0) {
        secondHalf = problemData.substring(secondIndex);
        secondHalf = secondHalf
            .substring(0, secondHalf.indexOf("/article>") + 9)
            .replace("<article", "<div")
            .replace("article>", "div>");
    }

    writeToFile(`./src/Day${day}/README.md`, parsedData + secondHalf)

    if (existsSync(`./inputs/Day${day}.txt`)) {
        return true;
    }

    const { data, status } = await axios.get(
        `https://adventofcode.com/${config.year}/day/${day}/input`,
        {
            headers: {
                "Cookie": `session=${config.api_key}`
            }
        }
    );

    if (status !== 200) {
        console.error("FAILED TO RETREIVE INPUT FOR DAY!");
        return false;
    }

    if (!existsSync("./inputs")) {
        mkdirSync("./inputs");
    }

    writeToFile(`./inputs/Day${day}.txt`, data);
    return true;
}

async function createDay() {
    const day = process.argv[2] === undefined ? new Date().getDate() : Number(process.argv[2]);

    if (isNaN(day)) {
        throw new Error("Day input is not a number.");
    }
    if (day > 25) {
        throw new Error("Day input exceeds AOC time.");
    }
    if (day < 1) {
        throw new Error("Day input is lower than 1.");
    }

    const dirPath = `./src/day${day}`;
    let firstDownload = false;

    if (!existsSync(dirPath)) {
        mkdirSync(dirPath);
        firstDownload = true;
    }

    const check = await retrieveDayInfo(day);
    if (!check) {
        console.log("Failure detected. Halted day creation...");
        return;
    }

    if (!firstDownload) {
        console.log("Updated README With Second Part!");
        return;
    }

    writeToFile(`${dirPath}/part1.ts`, TSHeader.replace("--DAYINPUT", day.toString()));
    writeToFile(`${dirPath}/part2.ts`, TSHeader.replace("--DAYINPUT", day.toString()));

    console.log("Day created.");
}

createDay();