export class Tetrimino{
    private tetrimino;
    public static get T() : Tetrimino {return new Tetrimino("T")};
    public static get I() : Tetrimino {return new Tetrimino("I")};
    public static get J() : Tetrimino {return new Tetrimino("J")};
    public static get L() : Tetrimino {return new Tetrimino("L")};
    public static get O() : Tetrimino {return new Tetrimino("O")};
    public static get S() : Tetrimino {return new Tetrimino("S")};
    public static get Z() : Tetrimino {return new Tetrimino("Z")};
    public from(queue:string):Tetrimino[]{
        const tetriminos: Tetrimino[] = [];
        for(let char of queue){
            if(char === 'T' || char === 'I' || char === 'J' || char === 'L' || char === 'O' || char === 'S' || char === 'Z'){
                tetriminos.push(new Tetrimino(char));
            }
        }
        return tetriminos;
    }
    constructor(tetrimino:"T"|"I"|"J"|"L"|"O"|"S"|"Z"){
        this.tetrimino = tetrimino;
    }
}
export const T = Tetrimino.T;
export const I = Tetrimino.I;
export const J = Tetrimino.J;
export const L = Tetrimino.L;
export const O = Tetrimino.O;
export const S = Tetrimino.S;
export const Z = Tetrimino.Z;