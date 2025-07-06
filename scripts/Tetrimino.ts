class Tetrimino{
    private tetrimino;

    public static get J() : Tetrimino {return new Tetrimino("J")};
    public static get T() : Tetrimino {return new Tetrimino("T")};
    public static get S() : Tetrimino {return new Tetrimino("S")};
    public static get L() : Tetrimino {return new Tetrimino("L")};
    public static get I() : Tetrimino {return new Tetrimino("I")};
    public static get Z() : Tetrimino {return new Tetrimino("Z")};
    public static get O() : Tetrimino {return new Tetrimino("O")};
    public static from(queue:string):Tetrimino[]{
        const tetriminos: Tetrimino[] = [];
        for(let char of queue){
            if(char === 'J' || char === 'T' || char === 'S' || char === 'L' || char === 'I' || char === 'Z' || char === 'O'){
                tetriminos.push(new Tetrimino(char));
            }
        }
        return tetriminos;
    }
    private constructor(tetrimino:"J"|"T"|"S"|"L"|"I"|"Z"|"O"){
        this.tetrimino = tetrimino;
    }

    public toString(): string {
        return this.tetrimino;
    }

    get index(): number {
        return "JTSLIZO".indexOf(this.tetrimino) + 1;
    }
}

export default Tetrimino;
export const J = Tetrimino.J;
export const T = Tetrimino.T;
export const S = Tetrimino.S;
export const L = Tetrimino.L;
export const I = Tetrimino.I;
export const Z = Tetrimino.Z;
export const O = Tetrimino.O;
export const tetriminos = [J, T, S, L, I, Z, O];
export const tetrimino = (arg: string|number):Tetrimino => {
    if (typeof arg === "string") {
        switch (arg.toUpperCase()) {
            case "J":
                return J;
            case "T":
                return T;
            case "S":
                return S;
            case "L":
                return L;
            case "I":
                return I;
            case "Z":
                return Z;
            case "O":
                return O;
            default:
                throw new Error("Invalid tetrimino string");
        }
    } else if (typeof arg === "number") {
        if (arg < 1 || arg > tetriminos.length) {
            throw new Error("Invalid tetrimino index");
        }
        return tetriminos[arg - 1];
    } else {
        throw new Error("Invalid argument type");
    }
}
export const mirror = (tetrimino: Tetrimino): Tetrimino => {
    switch (tetrimino) {
        case J: return L
        case T: return T
        case S: return Z
        case L: return J
        case I: return I
        case Z: return S
        case O: return O
        default: throw new Error("Invalid tetrimino");
    }
}