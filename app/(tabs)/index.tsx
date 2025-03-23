import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, ScrollView, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import tw from "twrnc";
import UserAvatar from 'react-native-user-avatar';
import CustomText from "@/components/CustomText";
import useAuthStore from "@/hooks/useAuthStore";


export default function HomeScreen() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);


  const Tasks = [
    { id: '1',       link: '/routineInspection',
      title: 'Routine Inspection', image: require('@/assets/images/inspection.png') },
    { id: '2', link: '/activeMonitoring', title: 'Active Monitoring', image: require('@/assets/images/monitoring.png') },
    { id: '3', link: '/incidentalCapture', title: 'Incidental Capture', image: require('@/assets/images/capture.png') },
    { id: '4', link: '/', title: 'Commercial Pest Treatment', image: require('@/assets/images/treatment.png') },
    { id: '5', link: '/', title: 'In-house Pest Treatment', image: require('@/assets/images/inhouse.png') },
    { id: '6', link: '/', title: 'Transfer', image: require('@/assets/images/transfer.png') },

  ];



  const renderItem = ({ item }) => (
    <TouchableOpacity
    onPress={() => {
      if (isLoggedIn) {
        router.push(item.link); // Navigate to the link if logged in
      } else {
        router.push('/auth/login'); // Navigate to login if not logged in
      }
    }}
            style={styles.box}
        >
            <Image source={item.image} style={tw`w-[50px] h-[50px] mb-[20px]`} />

<CustomText style={styles.boxText}>{item.title}</CustomText>
        </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <ScrollView style={tw`mx-4 my-2 bg-white rounded-5 h-full p-5 `}>
        <View >
          <View style={tw`flex flex-row items-center justify-between`}>
            <View>
              <CustomText style={tw`text-[#FF0000] font-semibold`}>Oct 6,2025</CustomText>
              <CustomText style={tw`mt-2 font-bold text-[18px]`}>
                {isLoggedIn ? user?.name  : 'Howdy'}

              </CustomText>
              <CustomText style={tw`text-[#999] font-semibold mt-2 max-w-[200px]`}>Conservator Preservation Services</CustomText>

            </View>
            <UserAvatar style={tw`mt-[-50px]`} size={40} name={isLoggedIn ? user?.name : 'Howdy'} />



          </View>

          <CustomText style={tw`mt-[30px] mb-[20px] text-[#FF0000] text-left ml-[5%] text-[26px]`}>What would you like to do today?</CustomText>
          <FlatList
            data={Tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2} // 2 columns per row
          />


          {/* <CustomText
            style={{ color: "blue", textDecorationLine: "underline", marginBottom: 100 }}
            onPress={() => router.push("/auth/login")}
          >
            Go to About Page
          </CustomText> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1, // Ensures boxes evenly share available space
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 20,
    paddingVertical: 40
  },
  boxText: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: "center"
  },
})
