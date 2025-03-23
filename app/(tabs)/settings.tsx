import { useRouter } from "expo-router"; // Import useRouter hook from expo-router
import CustomText from "@/components/CustomText";
import useAuthStore from "@/hooks/useAuthStore";
import { useState } from "react";
import {
  Button,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import UserAvatar from 'react-native-user-avatar';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";


export default function Settings() {
  const router = useRouter(); // Use the router hook from expo-router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  const handlePress = (link: string | (() => void)) => {
    if (typeof link === "string") {
      Linking.openURL(link);
    } else if (typeof link === "function") {
      link();
    }
  };

  const handleLogout = () => {
    try {
      logout();
      router.replace('/'); // Use router.replace to navigate to the home page
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Logged Out Successfully",
        text2: "See you soon!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Logout Failed",
        text2: "Please try again later.",
      });
    }
  };

  const handlePreviewedTraps = () => {
    // Use hardcoded path to ensure proper navigation
    console.log("Navigating to previewed traps");
    try {
      router.push({
        pathname: '/traps', 
        params: { trapType: 'previewed' },
      });
    } catch (error) {
      console.error("Navigation error:", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Navigation Failed",
        text2: "Could not navigate to traps.",
      });
    }
  };

  const handleSavedTraps = () => {
    // Use hardcoded path to ensure proper navigation
    console.log("Navigating to saved traps");
    try {
      router.push({
        pathname: '/traps',
        params: { trapType: 'saved' },
      });
    } catch (error) {
      console.error("Navigation error:", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Navigation Failed",
        text2: "Could not navigate to traps.",
      });
    }
  };
  
  const handleAboutUs = () => {
    // Add actual implementation for About Us navigation
    console.log("Navigating to about page");
    try {
      router.push('/about');
    } catch (error) {
      console.error("Navigation error:", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Navigation Failed",
        text2: "Could not navigate to about page.",
      });
    }
  };
  
  const menu = [ 
    {
      name: "Previewed Traps",
      image: "🔍", // Emoji or icon
      link: handlePreviewedTraps, // Directly call the function for traps
    },
    {
      name: "Saved Traps",
      image: "💾",
      link: handleSavedTraps, // Directly call the function for traps
    },
    {
      name: "About Us",
      image: "ℹ️",
      link: handleAboutUs, // Use the new handler instead of console.log
    },
    {
      name: "Logout",
      image: "🚪",
      link: handleLogout, // Call handleLogout for logging out
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView style={tw`mx-4 my-2 bg-white rounded-5 h-full p-5 `}>
        <View >
          <View style={tw`flex flex-row items-center justify-between`}>
            <View>
              <CustomText style={tw`text-[#FF0000] font-semibold`}>Oct 6,2025</CustomText>
              <CustomText style={tw`mt-2 font-bold text-[18px]`}>
                {isLoggedIn ? user?.name : 'Howdy'}
              </CustomText>
              <CustomText style={tw`text-[#999] font-semibold mt-2 max-w-[200px]`}>Conservator Preservation Services</CustomText>
            </View>
            <UserAvatar style={tw`mt-[-50px]`} size={40} name={isLoggedIn ? user?.name : 'Howdy'} />
          </View>
        </View>
        <View style={tw`bg-[#EDF0F2]`}>
          <ScrollView>
            <View style={tw`px-[0px] pt-[0px] bg-white`}>
              {menu.map((item, index) => (
                <TouchableOpacity
                  onPress={() => handlePress(item.link)}
                  key={item?.name}
                  style={tw`p-[20px] px-[0px] ${index !== menu?.length - 1
                      ? "border-[#D3D3D3] border-b-[1px]"
                      : ""
                    } flex flex-row`}
                >
                  <Text>{item?.image}</Text>
                  <CustomText style={tw`font-semibold text-[15px] flex-1 ml-[10px]`}>
                    {item?.name}
                  </CustomText>
                  <MaterialIcons name="chevron-right" size={20} color={"#000"} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
