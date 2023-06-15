import { View , Text, StyleSheet, TextStyle } from "react-native";

interface screenLedsProps { input:string , memory:string|undefined }
const ScreenLed = ({input,memory}:screenLedsProps) => {

    return(
        <View style={container}>
            <Text style={text1}>{memory}</Text>
            <Text style={text2}>{input}</Text>
        </View>
    )

}

const fontSize:number = 35;
const text:TextStyle = {fontWeight:'600',fontSize,margin:20}

const { container , text1 , text2 } = StyleSheet.create({
    container:{flex:1,justifyContent:'flex-end',alignItems:'flex-end'},
    text1:{...text,opacity:0.7,fontSize:(fontSize*0.60),marginBottom:-20},
    text2:{...text}
})

export default ScreenLed