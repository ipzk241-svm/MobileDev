import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Navigation from "./components/Navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ProgressProvider } from "./hooks/ProgressContext";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ProgressProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
      </GestureHandlerRootView>
    </ProgressProvider>
  );
}
