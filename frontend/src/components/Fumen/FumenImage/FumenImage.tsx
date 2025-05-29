import type {
    DependencyList,
    EffectCallback,
    FC,
    MutableRefObject,
} from "react";
import { useEffect, useRef, useState } from "react";
import { encoder, decoder, Pages, Page, Field } from "tetris-fumen";
import { PieceType } from "tetris-fumen/lib/defines";
import skin from "./owoskin.png";

const imageTileSize = 96;

const pieceColors: Record<PieceType,{ normal: string; highlight?: string; skim?: string }> = {
    I: { normal: "#42afe1", highlight: "#6ceaff", skim: "#5cc7f9" },
    T: { normal: "#9739a2", highlight: "#d958e9", skim: "#b94bc6" },
    S: { normal: "#51b84d", highlight: "#84f880", skim: "#70d36d" },
    Z: { normal: "#eb4f65", highlight: "#ff7f79", skim: "#f96c67" },
    L: { normal: "#f38927", highlight: "#ffba59", skim: "#f99e4c" },
    J: { normal: "#1165b5", highlight: "#339bff", skim: "#2c84da" },
    O: { normal: "#f6d03c", highlight: "#ffff7f", skim: "#f9df6c" },
    X: { normal: "#868686", highlight: "#dddddd", skim: "#bdbdbd" },
    _: { normal: "#f3f3ed" },
};
const skinOffsets: Partial<Record<PieceType, { x: number; y: number } | null>> = {
    Z: {x: 0, y: 0},
    L: {x: 4 * imageTileSize, y: 0},
    O: {x: 8 * imageTileSize, y: 0},
    S: {x: 12 * imageTileSize,y: 0},
    I: {x: 0, y: 6 * imageTileSize},
    J: {x: 4 * imageTileSize,y: 6 * imageTileSize},
    T: {x: 8 * imageTileSize,y: 6 * imageTileSize}
};

const skinType: Record<number, number> = {
    0b0001: 0,
    0b0011: 1, //1 16,
    0b0111: 2, //2 22,
    0b0101: 3, //3 17,
    0b1001: 4,
    0b1011: 5, //5 19,
    0b1111: 6,
    0b1101: 7, //7 23,
    0b1000: 8,
    0b1010: 9, //9 20,
    0b1110: 10, //10 18,
    0b1100: 11, //11 21,
    0b0000: 12,
    0b0010: 13,
    0b0110: 14,
    0b0100: 15,
};

interface Props {
    page: Page;
    showComments?: boolean;
}
const skinImage = new Image();
skinImage.src = skin;

export const FumenImage: FC<Props> = (props: Props) => {
    const {page} = props;
    const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas == null) return;
        
        renderImage(canvas, page);
    }, [props.page]);

    return (
        <canvas
            ref={canvasRef}
            width="500"
            height="210"
        />
    );
};

const getHeight = (field: Field): number => {
    let numRows = 0; // counter for rows with at least 1 filled cell
    for (let row = 0; row < 23; row++) {
        for (let col = 0; col < 10; col++) { // assuming 10 columns typical for a Tetris field
            if (field.at(col, row) !== "_") { // if the cell is filled
                numRows++; // increment the counter
                break; // no need to check more columns in this row
            }
        }
    }
    return numRows;
};

const getSkinType = (
    field: Field,
    i: number,
    j: number
): { x: number; y: number } => {
    const piece: PieceType = field.at(i, j);
    const skinOffset = skinOffsets[piece];
    if (skinOffset == null) return { x: 1024, y: 192 };
    const { x: skinOffsetX, y: skinOffsetY } = skinOffset;

    const type: number =
        (j <= 23 && field.at(i, j + 1) == piece ? 8 : 0) +
        (i > 0 && field.at(i - 1, j) == piece ? 4 : 0) +
        (i <= 9 && field.at(i + 1, j) == piece ? 2 : 0) +
        (j > 0 && field.at(i, j - 1) == piece ? 1 : 0);


    //console.log(piece, type, j>0 && field.at(i,j-1) == piece ? 1 : 0);

    let skin = skinType[type];

    if(skin == 1 && field.at(i+1, j-1) != piece){
        skin = 16
    }else if(skin == 2 && field.at(i+1, j-1) != piece){
        skin = 22
    }else if(skin == 3 && field.at(i-1, j-1) != piece){
        skin = 17
    }else if(skin == 5 && field.at(i+1, j-1) != piece){
        skin = 19
    }else if (skin == 7 && field.at(i-1, j-1) != piece){
        skin = 23
    }else if (skin == 9 && field.at(i+1, j+1) != piece){
        skin = 20
    }else if (skin == 10 && field.at(i+1, j+1) != piece){
        skin = 18
    }else if (skin == 11 && field.at(i-1, j+1) != piece){
        skin = 21
    }
    return {
        x: skinOffsetX + (skin % 4) * imageTileSize,
        y: skinOffsetY + ~~(skin / 4) * imageTileSize,
    };
};

const renderImage = (canvas: HTMLCanvasElement|null, page: Page) => {
    if (canvas == null) throw new Error("canvas is undefined");
    const context = canvas.getContext("2d");
    if (context == null) throw new Error("context is undefined");
    
    //BACKGROUND COLOR
    context.fillStyle = "#FFFFFF";


    //context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    let tileSize = context.canvas.width / 10;
    const field = page.field;

    const rows = getHeight(field);
    //console.log(`Rows:  ${rows}`);
    


    for (let j = 0; j < rows; j++) {
        let skim = true;
        for (let i = 0; i < 10; i++) {
            if (field.at(i, j) != "_") {
                //console.log(field.at(i,j));
                context.fillStyle = pieceColors[field.at(i, j)].normal;
                
                //FUMEN-UTIL
                context.fillRect(i * tileSize + 1, context.canvas.height - (j + 1) * tileSize + 1, tileSize - 2, tileSize - 2);
                
                
                
                //FOUR.LOL
                context.fillRect(i * tileSize, context.canvas.height - (j + 1) * tileSize, tileSize, tileSize);
                context.fillStyle = pieceColors[field.at(i, j)].highlight??context.fillStyle;

                context.fillRect(i * tileSize, context.canvas.height - (j+1.2) * tileSize, tileSize, tileSize*0.2)

                

                //CONNECTED SKIN
                
                /*const { x, y } = getSkinType(field, i, j);
                if (skinImage.complete) {
                    context.drawImage(
                        skinImage,
                        x,
                        y,
                        imageTileSize,
                        imageTileSize,
                        i * tileSize,
                        context.canvas.height - (j + 1) * tileSize,
                        tileSize,
                        tileSize
                    );
                } else {
                    skinImage.onload = function () {
                        context.drawImage(
                            skinImage,
                            x,
                            y,
                            imageTileSize,
                            imageTileSize,
                            i * tileSize,
                            context.canvas.height - (j + 1) * tileSize,
                            tileSize,
                            tileSize
                        );
                    };
                }
                */
            } else {
                skim = false;
            }
        }
        if (skim) {
            context.fillStyle = "rgba(255,255,255,0.1)";
            context.fillRect(
                0,
                context.canvas.height - (j + 1) * tileSize,
                10 * tileSize,
                tileSize
            );
        }
    }
};
