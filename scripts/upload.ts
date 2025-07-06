import { decoder } from "tetris-fumen";
import { compressToEncodedURIComponent } from "lz-string";

export default async function parseReplay(txt: string) {
    const url = "jstris.jezevec10.com";
    if (txt.indexOf(url) < 0) return codeToFumen(txt);
    const parts = txt.split("/");
    if (parts.length < 5) {
        throw new Error("");
    }
    if (parts[3] != "replay" || !parts[2].endsWith(url)) {
        throw new Error("");
    }

    let id = parts[4];
    if (parts.length > 5) {
        id = parts[5];
    }

    const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(`https://${parts[2]}/replay/data?id=${id}&type=0`)}`);
    if (!response.ok) {
        throw new Error("");
    }
    const text = await response.text();
    const comp = compressToEncodedURIComponent(text);

    return await codeToFumen(comp);
}

async function codeToFumen(replayCode: string) {
    const response = await fetch(`https://fumen.tstman.net/jstris`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: `replay=${replayCode}`,
    });
    if (!response.ok) {
        throw new Error("");
    }
    const data = await response.json();
    return parseFumen(data.fumen);
}



function parseFumen(fumenUrl : string) {
  const pages = decoder.decode(fumenUrl)

  const ret = []
  let curStateArrays = []
  let curPCNumber = 0
  let curPCLoopIndicator = 1
  for (let idx = 0; idx < pages.length; idx++) {
    const page = pages[idx]

    let board = ""
    let hasMino = false
    for (let y = 3; y >= 0; y--) {
      for (let x = 0; x < 10; x++) {
        const mino = page.field.at(x, y)
        if (mino !== "_") {
          board += mino
          hasMino = true
        } else {
          board += "N"
        }
      }
    }

    let queue = ""
    const comment = page.comment
    let i;
    if (comment[4] !== ']') {
      queue = comment[4] + comment[7]
      i = 9
    } else {
      queue = comment[6]
      i = 8
    }

    while (queue.length < 7 && i < comment.length) {
      queue += comment[i]
      i += 1
    }

    if (!hasMino && curStateArrays.length > 0) {
      ret.push({
        PCNumber: curPCNumber,
        PCLoopIndicator: curPCLoopIndicator,
        stateArray: curStateArrays
      })
      
      curStateArrays = []
      curPCNumber += 1
      curPCLoopIndicator = ((idx * 5) % 7) + 1;
    }
    // Probably end of the replay
    if (queue.length === 7) {
      curStateArrays.push({
        board: board,
        queue: queue,
        placedBlocks: idx
      })
    } else if (idx < pages.length - 1) {
      throw new Error("");
    }
  }
  if (curStateArrays.length > 0) {
    ret.push({
      PCNumber: curPCNumber,
      PCLoopIndicator: curPCLoopIndicator,
      stateArray: curStateArrays
    })
  }
  return ret;
}