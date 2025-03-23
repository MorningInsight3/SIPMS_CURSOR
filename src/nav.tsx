import {
    CompositeNavigationProp,
    CompositeScreenProps,
    NavigationContainer,
    NavigatorScreenParams,
  } from "@react-navigation/native";
  import { StatusBar } from "expo-status-bar";
  import {
    StackNavigationProp,
    StackScreenProps,
    createStackNavigator,
  } from "@react-navigation/stack";
  import {
    BottomTabNavigationProp,
    BottomTabScreenProps,
    createBottomTabNavigator,
  } from "@react-navigation/bottom-tabs";

  import { Image, StyleSheet, Text, View } from "react-native";
  import tw from "twrnc";
import HomeStack from "./screens/home";


  
  export type RootStackParamList = {
    Tabs: NavigatorScreenParams<TabParamList>;
    Settings: undefined;
    About: undefined;
    Login: undefined;
    Inquiry: undefined;
    Inquirydetail: undefined;
  };
  export type RootStackScreenProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>;
  
  export type TabParamList = {
    HomeTab: undefined;
    ExploreTab: undefined;
    BrowseTab: undefined;
    ProfileTab: undefined;
    LoginTab: undefined;
    RegisterTab: undefined;
  };
  export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
  
  export type HomeTabStackParamList = {
    Home: undefined;

    About: undefined;
    Login: undefined;

    Inquiry: { text: string };
    Inquirydetail: {
      id: number;
      name: string;
    };
    Explore: undefined;
    Search: undefined;
    Browse: undefined;
    Profile: undefined;
    SellerProfile: {
      id: number;
      name: string;
    };
    ProductsByCategory: {
      id: number;
      name: string;
    };
    RestProfile: {
      id: number;
      name: string;
    };
  };
  export type HomeTabStackScreenProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, "HomeTab">,
    StackNavigationProp<HomeTabStackParamList>
  >;
  export type HomeTabStackScreenProps<T extends keyof HomeTabStackParamList> =
    StackScreenProps<HomeTabStackParamList, T>;
  
  const RootStack = createStackNavigator<RootStackParamList>();
  const Tab = createBottomTabNavigator<TabParamList>();
  
  export default function Navigation() {
    return (
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="Tabs"
            component={TabsNavigation}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }
  
  function TabsNavigation() {
  
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={tw`text-center flex flex-col items-center`}>
             
  
                <Text
                  style={[
                    tw`w-[100%] flex items-center justify-center text-[12px] text-center ${focused ? "text-[#f06028]" : ""}`,
                  ]}
                >
                  Home
                </Text>
              </View>
            ),
          }}
        />
    
  
     
  
      
      </Tab.Navigator>
    );
  }
  
  const styles = StyleSheet.create({
    shadow: {
      shadowColor: "#7F5DF0",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
    tabBarStyle: {
      backgroundColor: "#fff",
  
      position: "absolute",
      elevation: 0,
      //   height: 60,
    },
  
    splashtext: {
      fontSize: 25,
      textAlign: "left",
      paddingVertical: 8,
    },
  });
  