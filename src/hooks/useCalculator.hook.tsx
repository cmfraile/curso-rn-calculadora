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

const operationParser = (string:string) => string
    .split(' ')
    .map(x => x.trim())
    .filter(x => x !== '')

const functions = (
    setInput:React.Dispatch<React.SetStateAction<string>>,
    setMemory:React.Dispatch<React.SetStateAction<string | undefined>>
) => ({
    'C':() => { setInput(v => '0') ; setMemory(v => undefined) },
    '+/-':() => setInput(v => {

        const parsed = operationParser(v) ;
        const NaNparsed = parsed.filter(x => !isNaN(parseInt(x))) ;
        const lastNaNParsed = parseInt(NaNparsed[NaNparsed.length-1]) ;

        if( lastNaNParsed > 0 ){ NaNparsed[NaNparsed.length-1] = `-${lastNaNParsed}` };
        if( lastNaNParsed < 0 ){ NaNparsed[NaNparsed.length-1] = lastNaNParsed.toString().substring(1) };
        return NaNparsed.join('');

    }),
    'del':() => { setInput(v => Number.isNaN(parseInt(v.substring(0,v.length-1))) ? '0' : v.substring(0,v.length-1) )}
});

const operations = (
    setInput:React.Dispatch<React.SetStateAction<string>>,
    setMemory:React.Dispatch<React.SetStateAction<string | undefined>>
) => ({
    '+':() => setInput(v => `${v} + `),
    '-':() => setInput(v => `${v} - `),
    '*':() => setInput(v => `${v} * `),
    '/':() => setInput(v => `${v} / `),
    '=':() => setInput(v1 => {
        setMemory( v2 => {
            if(v2 == undefined){return v2}
            console.log(operationParser(v2).join(''));
            return '0'
        });
        console.log(operationParser(v1).join(''));
        return '0';
    })
})

export default useCalculator