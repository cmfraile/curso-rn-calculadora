import { TouchableOpacity , StyleSheet , Text } from "react-native"

/*
    Azul oscuro: #1E3A8A
    Verde lima: #A4C639
    Gris metalizado: #747474
*/

const { first , second , third } = {first:'#1E3A8A',second:'#A4C639',third:'#747474'};

export const buttonCollection:[string,string,boolean?][] = [
    ['C',first],['+/-',first],['del',first],['/',second],
    ['7',third],['8',third],['9',third],['X',second],
    ['4',third],['5',third],['6',third],['-',second],
    ['3',third],['2',third],['1',third],['+',second],
    ['0',third,true],['.',third],['=',third]
]

interface buttonProps {text:string,color:string,onPressCallback:() => void,wideCondition?:boolean}
const ButtonComponent = ({text,color,onPressCallback,wideCondition}:buttonProps) => {

    return(<TouchableOpacity
        onPress={onPressCallback}
        style={[
            button,
            (wideCondition) ? wide : nowide ,
            {backgroundColor:color},
            superCenter
        ]}><Text style={superCenter}>{text}</Text></TouchableOpacity>);

}

const { button , wide , nowide , superCenter } = StyleSheet.create({
    superCenter:{justifyContent:"center",alignItems:'center'},
    button:{width:'22%',height:'18%',fontSize:30,fontWeight:'700',borderRadius:100,margin:2},
    wide:{flexBasis:'50%'},nowide:{}
})

export default ButtonComponent