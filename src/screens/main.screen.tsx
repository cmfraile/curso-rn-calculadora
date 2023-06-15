import { SafeAreaView } from "react-native";
import Keyboard from "../components/ScreenLed.component";
import ScreenLed from "../components/Keyboard.component";

const Main = () => {

    return(
        <SafeAreaView style={{flex:1}}>
            <Keyboard/>
            <ScreenLed/>
        </SafeAreaView>
    )

}

export default Main