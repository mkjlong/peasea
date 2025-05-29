class Tetrimino{
    private tetrimino;

    public static get J() : Tetrimino {return new Tetrimino("J")};
    public static get T() : Tetrimino {return new Tetrimino("T")};
    public static get S() : Tetrimino {return new Tetrimino("S")};
    public static get L() : Tetrimino {return new Tetrimino("L")};
    public static get I() : Tetrimino {return new Tetrimino("I")};
    public static get Z() : Tetrimino {return new Tetrimino("Z")};
    public static get O() : Tetrimino {return new Tetrimino("O")};
    public from(queue:string):Tetrimino[]{
        const tetriminos: Tetrimino[] = [];
        for(let char of queue){
            if(char === 'J' || char === 'T' || char === 'S' || char === 'L' || char === 'I' || char === 'Z' || char === 'O'){
                tetriminos.push(new Tetrimino(char));
            }
        }
        return tetriminos;
    }
    constructor(tetrimino:"J"|"T"|"L"|"S"|"I"|"Z"|"O"){
        this.tetrimino = tetrimino;
    }

    public toString(): string {
        return this.tetrimino;
    }

    get index(): number {
        return "JTLSIZO".indexOf(this.tetrimino);
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