export class PC{
    private index;
    constructor(index:1|2|3|4|5|6|7){
        this.index=index;
    }
    public static readonly FIRST   = new PC(1);
    public static readonly SECOND  = new PC(2);
    public static readonly THIRD   = new PC(3);
    public static readonly FOURTH  = new PC(4);
    public static readonly FIFTH   = new PC(5);
    public static readonly SIXTH   = new PC(6);
    public static readonly SEVENTH = new PC(7);

    public getBagLength(){
        return [7, 4, 1, 5, 2, 6, 3][this.getIndex()-1];
    }

    public getIndex(){
        return this.index;
    }

    public getIter(){
        return this.index + ["st","nd","rd","th","th","th","th"][this.index-1]
    }

    public toString(){
        return this.getIter() + " PC";
    }
}