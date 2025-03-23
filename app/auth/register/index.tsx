import { HelloWave } from "@/components/HelloWave";
import useAuthStore from "@/hooks/useAuthStore";
import { useRef, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import tw from "twrnc";
import { TextInput } from "@/components/core/TextInput";
import CustomText from "@/components/CustomText";
import { router } from "expo-router";


export default function Register() {
  const [email, setEmail] = useState("");
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toastRef = useRef(null);

  const register = useAuthStore((state) => state.register);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register(name, emailOrPhone, mobile, password);
      setName("");
      setEmailOrPhone("");
      setPassword("");
      setMobile("");

    } catch (error) {
      alert(error)
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

  return (
    <SafeAreaView style={tw`relative`}>
      <ScrollView>
        {isLoggedIn ? (
          <>
            <Text>Welcome, {user?.name}!</Text>
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
              <Text style={tw`text-[#fff] text-[30px] pt-[10px]`}>Sign Up!</Text>
            </View>



            <View>
              <View
                style={tw`flex-row items-center mt-[-100px] pt-[0px]  rounded-[0px] justify-center h-full w-full relative mx-[0px] bg-white`}
              >
                <View style={tw` w-[100%] h-full relative px-[20px] pt-[20px]`}>


                  <View
                    style={tw` mt-[0px] pt-[10px] mb-[10px] flex flex-row items-center justify-center`}
                  >
                    <CustomText style={tw`text-[#777] mt-2 max-w-[200px] text-[16px]`}>Smart Integrated Pest Management System</CustomText>

                  </View>



                  <Image
                    style={tw`w-[80px] h-[80px] mb-[20px] mx-auto`}
                    source={require('@/assets/images/logo.png')}
                    resizeMode="contain"
                  />

                  <TextInput
                    placeholder="Name"
                    style={tw`h-[10px] w-full`}
                    value={name}
                    onChangeText={setName}
                  />
                  <View style={tw`mt-[20px] mb-[20px]`}>

                    <TextInput
                      placeholder="Email"
                      style={tw`h-[10px] w-full`}
                      value={emailOrPhone}
                      onChangeText={setEmailOrPhone}
                    />
                  </View>

                  <TextInput
                    placeholder="Phone Number"
                    style={tw`h-[10px] w-full`}
                    value={mobile}
                    onChangeText={setMobile}
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

                  <Ripple
                    onPress={handleRegister}
                    style={tw`py-[05px] px-[20px]  rounded-[999px] bg-[#D83A39] text-white mt-[30px]`}
                  >
                    <Button loading={loading} textColor="white" style={tw`py-0`}>
                      Register
                    </Button>
                  </Ripple>

                  <CustomText
                    style={{ color: "gray", marginTop: 20, marginBottom: 200, textAlign: "center" }}
                    onPress={() => router.push("/auth/login")}
                  >
                    Existing user ? Login
                  </CustomText>


                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
