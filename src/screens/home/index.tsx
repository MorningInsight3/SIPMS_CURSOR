import {
    Image,
    StyleSheet,
    Platform,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
  
  import Animated, {
    Easing,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
  } from "react-native-reanimated";
  import { HelloWave } from "@/components/HelloWave";
  import ParallaxScrollView from "@/components/ParallaxScrollView";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeTabStackParamList } from "@/src/nav";
import About from "@/components/about";

  
  const Stack = createStackNavigator<HomeTabStackParamList>();
  
  export default function HomeStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={About} />

      
      </Stack.Navigator>
    );
  }
  
  function Home() {
   
  
    const lastContentOffset = useSharedValue(0);
    const isScrolling = useSharedValue(false);
    const translateY = useSharedValue(0);
  
    const actionBar = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: withTiming(translateY.value, {
              duration: 200,
              easing: Easing.inOut(Easing.ease),
            }),
          },
        ],
      };
    });
  
    const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
        if (
          lastContentOffset.value > event.contentOffset.y &&
          isScrolling.value
        ) {
          translateY.value = 0;
        } else if (
          lastContentOffset.value < event.contentOffset.y &&
          isScrolling.value
        ) {
          translateY.value = 100;
        }
        lastContentOffset.value = event.contentOffset.y;
      },
      onBeginDrag: (e) => {
        isScrolling.value = true;
      },
      onEndDrag: (e) => {
        isScrolling.value = false;
      },
    });
  
  
  
  
   
  

  
    return (
     <Text>asd</Text>
    );
  }
  
  const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      position: "absolute",
      height: 150,
      width: 200,
      bottom: -110,
      left: -30,
      objectFit: "contain",
    },
  
    borderright: {
      borderRightWidth: 1,
      borderColor: "#aaa",
      width: "50%",
    },
  
    action: {
      flexDirection: "row",
      borderRadius: 25,
      padding: 15,
      position: "absolute",
      bottom: 95,
      right: 10,
      backgroundColor: "#4E256B",
      justifyContent: "space-around",
    },
    actionItem: {
      color: "#000",
    },
  });
  