const PIECES = "TIJLOSZ";

//get rid of it
export function sortByPCOrder(a:string,b:string){
    return PIECES.indexOf(a)-PIECES.indexOf(b);
}

export function extractBracketedBlock(input: string, start: number): [string, number] {
    let depth = 0;
    let i = start;
    let block = "";

    for (; i < input.length; i++) {
        const char = input[i];
        block += char;
        if (char === '[') depth++;
        else if (char === ']') depth--;

        if (depth === 0) break;
    }

    if (depth !== 0) throw new Error("Unmatched brackets");

    return [block.slice(1, -1), i + 1]; // exclude outer [ ]
}

//good
export function normalizedSort(input: string): string {
    const counts: Record<string, number> = {T:0,I:0,J:0,L:0,O:0,S:0,Z:0};
    for (const char of input) {
        if (PIECES.includes(char)) {
            counts[char]++;
        }
    }
    return Object.entries(counts)
        .sort(([pieceA, countA], [pieceB, countB]) => (countB - countA) || PIECES.indexOf(pieceA) - PIECES.indexOf(pieceB)) // TIJLOSZ order
        .flatMap(([piece, count]) => Array(count).fill(piece))
        .join('');
}

//good
export function normalizeInput(input: string): string {
    
    // 1. Remove invalid syntax
    let cleaned = input.replace(/[^TIJLOSZX\[\]\^\!\*\dpc]/g, "");

    // 2. Inversion: [^TIJ] → [LOSZ]
    cleaned = cleaned.replace(/\[\^([A-Z]+)\]/g, (_, negated) => PIECES.split("").filter(c => !negated.includes(c)).join(""));

    // 3. Replace [*...] → [expanded]
    cleaned = cleaned.replace(/\[([^\]]*?)\]/g, (_, inner) => {
        const expanded = inner.replace(/\*/g, PIECES);
        return `[${expanded}]`;
    });

    // 4. Replace lone * outside of brackets with [TIJLOSZ]
    cleaned = cleaned.replace(/\*/g, `[${PIECES}]`);

    // 5. Replace [XYZ]! → [XYZ]pN
    cleaned = cleaned.replace(/\[([A-Z]+)\]!/g, (_, bag) => `[${bag}]p${bag.length}`);

    // 6. Replace [XYZ]N → [XYZ]pN
    cleaned = cleaned.replace(/\[([A-Z]+)\](\d)/g, (_, bag, n) => `[${bag}]p${n}`);

    // 7. Replace bare [XYZ] → [XYZ]p1
    cleaned = cleaned.replace(/\[([A-Z]+)\](?![pc]\d)/g, (_, bag) => `[${bag}]p1`);

    cleaned = cleaned.replace(/X/g,`[TIJLOSZ]p1`)

    cleaned = cleaned.replace(/\[([^\[\]]+?)\]/g, (match) => {
        // within each bracketed group, convert `pN` to `cN`
        return match.replace(/p(\d+)/g, "c$1");
    });

    return cleaned;
}


export function getPermutations(str: string | Set<string>, length: number): Set<string> {
    console.log("PERMUTING");
    
    if (typeof str !== "string") {
        const result = new Set<string>();
        for (const s of str) {
            for (const perm of getPermutations(s, length)) {
                result.add(perm);
            }
        }
        return result;
    }

    const results: Set<string> = new Set();
    const chars = normalizedSort(str);

    function backtrack(path: string[], used: boolean[]) {
        if (path.length === length) {
            results.add(path.join(""));
            return;
        }

        for (let i = 0; i < chars.length; i++) {
            if (used[i]) continue;
            // Skip duplicates
            if (i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) continue;

            used[i] = true;
            path.push(chars[i]);
            backtrack(path, used);
            path.pop();
            used[i] = false;
        }
    }

    backtrack([], Array(chars.length).fill(false));
    return results;
}



export function getCombinations(str: string | Set<string>, length: number): Set<string> {
    const results: Set<string> = new Set();

    if (typeof str !== "string") {
        for (const s of str) {
            const sorted = normalizedSort(s); // <- sort before recursion
            for (const combo of getCombinations(sorted, length)) {
                results.add(combo);
            }
        }
        
        return results;
    }

    const sorted = normalizedSort(str);

    function backtrack(start: number, path: string[]) {
        if (path.length === length) {
            results.add(normalizedSort(path.join("")));
            return;
        }
        for (let i = start; i < sorted.length; i++) {
            path.push(sorted[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }

    backtrack(0, []);
    return results;
}



export function pieces(input: string): Set<string> {
    input = normalizeInput(input);
    const parts: Set<string>[] = [];

    if (input.split('').every(c => PIECES.includes(c))) {
        return new Set([input]);
    }

    let i = 0;
    while (i < input.length) {
        const char = input[i];
        if (char === '[') {
            const [bagContent, nextIndex] = extractBracketedBlock(input, i);
            i = nextIndex;

            const mode = input[i];
            i++;

            let numStr = "";
            while (/\d/.test(input[i])) {
                numStr += input[i++];
            }
            const num = Number(numStr);

            const expandedBag = pieces(bagContent);
            if (mode === "p") {
                parts.push(getPermutations(expandedBag, num));
            } else if (mode === "c") {
                parts.push(getCombinations(expandedBag, num));
            }
        } else if (PIECES.includes(char)) {
            parts.push(new Set([char]));
            i++;
        } else {
            i++;
        }
    }

    return cartesianProduct(parts);
}

function cartesianProduct(arrays: Set<string>[]): Set<string> {
    return arrays.reduce((acc, curr) => {
        const result: Set<string> = new Set();
        for (const a of acc) {
            for (const b of curr) {
                result.add(a + b);
            }
        }
        return result;
    }, new Set([""]));
}


export function checkPieces(queue: string, pattern: string): boolean {
    //Fix queue (remove unnessesary pieces, replace * with [TIJLOSZ].)
    pattern = pattern.replaceAll(/\*/g, "[TIJLOSZ]").replaceAll(/[^\[\]^!TIJLOSZ0-7]/g, "");


    //Iterate through each bag and compare to queue
    for (let [_, set, count = 1] of Array.from(pattern.matchAll(/((?<=\[)\^?[TIJLOSZ]{0,7}(?=\])|[TIJLOSZ])\]?(?:([!0-7]))?/g))) {
        set = set.startsWith("^") ? "TIJLOSZ".split("").filter((piece) => !set.includes(piece)).join("") : set;
        count = count === "!" ? set.length : Number(count);
        if(queue.length < count || set.length < count)return false;

        for (let piece of queue.substring(0, count)) {
            if (!set.includes(piece)) return false;
            set = set.replace(piece, "");
        }
        queue = queue.substring(count, queue.length);
    }

    return !queue.length;
}


function checkModifiers(queue: string, pattern: string): boolean {
    
    
    return false;
}

// export default function pieces(queue: string, pattern: string): boolean {
//     console.log(`Queue: ${queue}, Set: ${pattern}`);
//     var [pattern, modifiers] = pattern.split("{");
//     if (modifiers?.endsWith("}"))
//         modifiers = modifiers.slice(0, modifiers.length - 1);
//     console.log(`Pattern: ${pattern}, Modifiers: ${modifiers}`);

//     const queuePieces = queue.trim();
//     return checkPieces(queuePieces, pattern);
// }
