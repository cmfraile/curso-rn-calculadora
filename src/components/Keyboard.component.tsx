import { View , StyleSheet } from "react-native";
import ButtonComponent, { buttonCollection } from "./Button.component";

interface keyboardProps {callbacks:{[key:string]:() => void}};
const Keyboard = ({callbacks}:keyboardProps) => {

    return(
        <View style={container}>
            {buttonCollection.map( (x,i) => (
                <ButtonComponent key={i} text={x[0]} color={x[1]} wideCondition={x[2]} 
                onPressCallback={callbacks[x[0]]}/>
            ))}
        </View>
    )

}

const { container } = StyleSheet.create({
    container:{flex:1,flexDirection:"row",flexWrap:'wrap',justifyContent:"space-between",alignContent:'space-around',padding:5}
})

export default Keyboard