import type { FC } from 'react';
import { encoder, decoder, Pages } from 'tetris-fumen';
import { FumenImage } from './FumenImage/FumenImage';

interface Props{
    className?:string;
    fumen:string
    showComments?:boolean,
}

export const Fumen:FC<Props> = (props: Props) => {
    const fumen = props.fumen//props.fumen;
    let pages:Pages;
    try{
        pages = decoder.decode(fumen);
    }catch{
        return <></>
    }

    console.log(pages);

    return <div className={props.className?`${props.className} fumen`:`fumen`}>
        <FumenImage fumen={fumen}></FumenImage>
    </div>
}

