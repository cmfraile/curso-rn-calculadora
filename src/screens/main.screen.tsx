import { SafeAreaView } from "react-native";
import ScreenLed from "../components/ScreenLed.component";
import Keyboard from "../components/Keyboard.component";
import useCalculator from "../hooks/useCalculator.hook";

const Main = () => {

    const { memory , input , callbacks } = useCalculator()

    return(
        <SafeAreaView style={{flex:1}}>
            <ScreenLed input={input} memory={memory} />
            <Keyboard callbacks={callbacks} />
        </SafeAreaView>
    )

}

export default Main