import { View , StyleSheet } from "react-native";
import ButtonComponent, { buttonCollection } from "./Button.component";



const ScreenLed = () => {

    return(
        <View style={container}>
            {buttonCollection.map( (x,i) => (
                <ButtonComponent key={i} text={x[0]} color={x[1]} wideCondition={x[2]} onPressCallback={() => {}}/>
            ))}
        </View>
    )

}

const { container } = StyleSheet.create({
    container:{flex:1,flexDirection:"row",flexWrap:'wrap',justifyContent:"space-between",alignContent:'space-around',padding:5}
})

export default ScreenLed