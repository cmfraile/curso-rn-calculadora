import { useEffect, useState } from "react";


const useCalculator = () => {

    const [ memory , setMemory ] = useState<string|undefined>(undefined);
    const [ input , setInput ] = useState<string>('0');

    const callbacks:{[key:string]:() => void} = {
        ...numbers(setInput),
        ...functions(setInput,setMemory)
    };

    return({memory,input,callbacks});

}

const numbers = (setInput:React.Dispatch<React.SetStateAction<string>>) => {

    let bundle:any = {};

    bundle['0'] = () => setInput(v => {
        if(v.includes('.')){return `${v}0`}
        return v
    });

    bundle['.'] = () => setInput(v => {
        if(!v.includes('.')){return `${v}.`}
        return v
    })

    for( let i = 1 ; i <= 9 ; i++ ){
        bundle[`${i}`] = () => setInput(v => {
            if(v.length == 1 && v == '0'){return `${i}`}
            return `${v}${i}`
        })
    };

    return bundle;

}


const functions = (
    setInput:React.Dispatch<React.SetStateAction<string>>,
    setMemory:React.Dispatch<React.SetStateAction<string | undefined>>
) => ({
    'C':() => { setInput(v => '0') ; setMemory(v => undefined) },
    '+/-':() => setInput(v => {
        if(parseInt(v) == 0){return v}
        if(parseInt(v) > 0){return `-${v}`};
        return `${v.substring(1,v.length)}`;
    }),
    'del':() => { setInput(v => Number.isNaN(parseInt(v.substring(0,v.length-1))) ? '0' : v.substring(0,v.length-1) )}
});

export default useCalculator