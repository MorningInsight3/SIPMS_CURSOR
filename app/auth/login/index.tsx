import { HelloWave } from "@/components/HelloWave";
import useAuthStore from "@/hooks/useAuthStore";
import { useRef, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import tw from "twrnc";
import { TextInput } from "@/components/core/TextInput";
import CustomText from "@/components/CustomText";
import { router } from "expo-router";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false); // Add loading state

  const toastRef = useRef(null);

  const handleLogin = async () => {
    console.log("Login button clicked");
    if (!email || !password) {
      console.log("Email or password is empty");
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Login Failed",
        text2: "Email and password cannot be empty",
      });
      return;
    }
    
    setLoading(true);
    try {
      console.log("Starting login attempt...");
      await login(email, password);
      console.log("Login successful, preparing to navigate");
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Login Successful",
        text2: "Welcome back!",
      });
      
      // Ensure we're navigating to the home screen after successful login
      setTimeout(() => {
        router.replace("/"); // Use replace instead of push to prevent back navigation issues
      }, 500); // Small delay to allow the toast to show
    } catch (error) {
      console.error("Login failed:", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Login Failed",
        text2: "Please check your credentials or network connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      logout();
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

  // Fill admin credentials for testing
  const fillAdminCredentials = () => {
    console.log("Filling admin credentials");
    setEmail("admin@example.com");
    setPassword("123456");
  };

  // Fill test user credentials for testing
  const fillUserCredentials = () => {
    console.log("Filling test user credentials");
    setEmail("test@example.com");
    setPassword("123456");
  };

  return (
    <SafeAreaView style={tw`relative`}>
      {isLoggedIn ? (
        <>
          <Text style={tw`text-white`}>Welcome, {user?.name}!</Text>
          <Button onPress={handleLogout}>Logout</Button>
        </>
      ) : (
        <>
          <Image
            source={{
              uri: "https://www.finetuneus.com/wp-content/uploads/2021/08/banner-pest.jpg",
            }}
            style={tw`w-full h-[300px]`}
          />

          <View style={tw`left-[20px] pt-[100px] absolute`}>
            <Text style={tw`text-[#fff] text-[30px] `}>Hello</Text>
            <Text style={tw`text-[#fff] text-[30px] pt-[10px]`}>Please Login!</Text>
          </View>

          <View>
            <View
              style={tw`flex-row items-center mt-[-100px] pt-[0px]  rounded-[0px] justify-center h-full w-full relative mx-[0px] bg-white`}
            >
              <View style={tw` w-[100%] h-full relative px-[20px] pt-[20px]`}>


                <View
                  style={tw` mt-[0px] pt-[10px] mb-[10px] flex flex-row items-center justify-center`}
                >
                  <CustomText style={tw`text-[#777] mt-2 max-w-[200px] text-[16px]`}>Intelligent Integrated Pest Management System</CustomText>

                </View>

                <Image
                  style={tw`w-[80px] h-[80px] mb-[20px] mx-auto`}
                  source={require('@/assets/images/logo.png')}
                  resizeMode="contain"
                />

                <TextInput
                  placeholder="Email"
                  style={tw`h-[10px] w-full`}
                  value={email}
                  onChangeText={setEmail}
                />

                <View style={tw`mt-[20px]`}>
                  <TextInput
                    placeholder="Password"
                    style={tw`h-[10px] w-full`}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                {/* Test account buttons area */}
                <View style={tw`flex-row justify-between mt-4`}>
                  <Button 
                    mode="text" 
                    onPress={fillAdminCredentials}
                    style={tw`flex-1 mr-2`}
                    textColor="#777"
                  >
                    Admin Account
                  </Button>
                  <Button 
                    mode="text" 
                    onPress={fillUserCredentials}
                    style={tw`flex-1 ml-2`}
                    textColor="#777"
                  >
                    Test Account
                  </Button>
                </View>

                <Button 
                  mode="contained"
                  onPress={handleLogin}
                  loading={loading}
                  style={tw`py-[5px] mt-[30px] rounded-full bg-[#D83A39]`}
                  textColor="white"
                >
                  Login
                </Button>

                <CustomText
                  style={{ color: "gray", marginTop:20, marginBottom: 200, textAlign: "center" }}
                  onPress={() => router.push("/auth/register")}
                >
                  New user? Register
                </CustomText>
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
