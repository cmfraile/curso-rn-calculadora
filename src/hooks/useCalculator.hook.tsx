import { useEffect, useState } from "react";


const useCalculator = () => {

    const [ memory , setMemory ] = useState<string|undefined>(undefined);
    const [ input , setInput ] = useState<string>('0');

    const callbacks:{[key:string]:() => void} = {
        ...numbers(setInput),
        ...functions(setInput,setMemory),
        ...operations(setInput,setMemory)
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
        if(parseInt(v) > 0){return `-${v}`};
        if(parseInt(v) < 0){return v.substring(1)};
        return v;
    }),
    'del':() => { setInput(v => Number.isNaN(parseInt(v.substring(0,v.length-1))) ? '0' : v.substring(0,v.length-1) )}
});

const add = (
    setInput:React.Dispatch<React.SetStateAction<string>>,
    setMemory:React.Dispatch<React.SetStateAction<string | undefined>>,
    sign:'+'|'-'|'*'|'/'
):void => { setInput(v1 => {
    setMemory(v2 => eval(`${v1}${sign}${v2}`));
    return '0'
})}

const operations = (
    setInput:React.Dispatch<React.SetStateAction<string>>,
    setMemory:React.Dispatch<React.SetStateAction<string | undefined>>
) => ({
    '+':add(setInput,setMemory,'+'),
    '-':add(setInput,setMemory,'-'),
    '*':add(setInput,setMemory,'*'),
    '/':add(setInput,setMemory,'/'),
})



export default useCalculator