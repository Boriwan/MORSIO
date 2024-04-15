async function showMorseCodeAlphabetAbl(req, res) {
    console.log("fdjkbsdflkbslbgl");
    try {
        const morseCodeAlphabet = [
            { code: ".-", letter: "A" },
            { code: "-...", letter: "B" },
            { code: "-.-.", letter: "C" },
            { code: "-..", letter: "D" },
            { code: ".", letter: "E" },
            { code: "..-.", letter: "F" },
            { code: "--.", letter: "G" },
            { code: "....", letter: "H" },
            { code: "..", letter: "I" },
            { code: ".---", letter: "J" },
            { code: "-.-", letter: "K" },
            { code: ".-..", letter: "L" },
            { code: "--", letter: "M" },
            { code: "-.", letter: "N" },
            { code: "---", letter: "O" },
            { code: ".--.", letter: "P" },
            { code: "--.-", letter: "Q" },
            { code: ".-.", letter: "R" },
            { code: "...", letter: "S" },
            { code: "-", letter: "T" },
            { code: "..-", letter: "U" },
            { code: "...-", letter: "V" },
            { code: ".--", letter: "W" },
            { code: "-..-", letter: "X" },
            { code: "-.--", letter: "Y" },
            { code: "--..", letter: "Z" }
        ];

        res.status(200).json(morseCodeAlphabet);
    } catch (error) {
        console.error("Error showing Morse code alphabet:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = showMorseCodeAlphabetAbl;
