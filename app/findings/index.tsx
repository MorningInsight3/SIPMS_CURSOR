import CustomText from "@/components/CustomText";
import useAuthStore from "@/hooks/useAuthStore";
import { useState } from "react";
import {
  ActivityIndicator,
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
import { Link, router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";


export default function Findings() {
  const user = useAuthStore((state) => state.user);

  const params = useLocalSearchParams();
  const { type } = params;

  const { data, error, isLoading } = useQuery({
    queryKey: ["finding-info"],
    queryFn: () =>
      fetch(`https://glamsipms.com/api/v2/finding-summary/${user?.id}`).then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading data.</Text>
      </View>
    );
  }

  // Filter data based on the type query parameter
  const filteredData = data?.all_items?.filter((item) => {
    if (type === "AM" && item?.type === "activemonitoring") {
      return true; // Include items where type is 'activemonitoring'
    }
  
    if (type === "IC" && item?.type === "IncidentalCapture") {
      return true; // Include items where type is 'incidentalcapture'
    }
  
    // Optionally, you can add more conditions for other types
    return type !== "AM" && type !== "IC"; // If type is not "AM" or "IC", include all items
  });
  
  const handleTrapDetail = () => {
    router.push('/traps/detail');
  };

  return (
    <SafeAreaView>
      <ScrollView style={tw`mx-4 my-2 bg-[#ededed] rounded-5 h-full p-5 `}>
        <View>
          <View style={tw`flex flex-row items-center justify-between mb-[20px]`}>
            <View style={tw`flex flex-row items-center ml-[-20px] mt-[-10px]`}>
              <TouchableOpacity onPress={() => router.back()} style={tw`p-[20px]`}>
                <MaterialIcons name="arrow-back" size={20} color={"#000"} />
              </TouchableOpacity>
              <CustomText style={tw`text-[#FF0000] text-[16px] font-semibold max-w-[200px]`}>{type == 'AM' && 'Active Monitoring'} {type == 'IC' && 'Incidental Capture'} Repo Data </CustomText>
            </View>
          </View>


          <View style={tw``}>
            {filteredData?.map((item) => (
              <TouchableOpacity
                style={tw`bg-white mb-[20px] p-[20px] w-full relative flex flex-col`}
                key={item.id}
                onPress={() => {
                  router.push({
                    pathname: '/findings/detail',
                    params: { repoId: item.id }, // Pass the dynamic repoId
                  });
                }}
              >
                <View style={tw`flex flex-row items-center`}>
                  {item?.image ? (
                    <Image
                      source={{ uri: item.image }}
                      style={tw`w-[50px] h-[50px] mr-[10px]`}
                      resizeMode="contain"
                    />
                  ) : (
                    <UserAvatar style={tw`w-[30px] h-[30px] rounded-full mr-[10px]`} size={30} name={item?.name} />
                  )}

                  <CustomText style={tw`font-semibold text-[15px]`} key={item.id}>
                    {item?.name}
                  </CustomText>
                </View>

                <CustomText style={tw`text-[11px] pt-[5px] w-fit mt-[10px] rounded-[10px] font-semibold`}>
                  Status: {item?.status}
                </CustomText>

                <CustomText
                  style={tw`text-[11px] absolute top-0 right-[10px] p-[5px] bg-[#D83A39] px-[10px] text-white w-fit mt-[10px] rounded-[10px] font-semibold`}
                >
                  {item?.repo_name}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

