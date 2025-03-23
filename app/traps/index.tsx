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
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";


export default function Traps() {
  const user = useAuthStore((state) => state.user);
  const params = useLocalSearchParams();
  const { trapType } = params;
  const { data, error, isLoading } = useQuery({

    queryKey: ["trap-info"],
    queryFn: () =>
      fetch(
        `https://glamsipms.com/api/v2/trap-summary/${user?.id}`,
      ).then((res) => res.json()),
    // Ensures data is fetched fresh on ID change
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
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



  return (
    <SafeAreaView>
      <ScrollView style={tw`mx-4 my-2 bg-[#ededed] rounded-5 h-full p-5 `}>


        <View >
          <View style={tw`flex flex-row items-center justify-between mb-[20px]`}>
            <View style={tw`flex flex-row items-center ml-[-20px] mt-[-10px]`}>
              <TouchableOpacity onPress={() => router.back()} style={tw`p-[20px]`}>
                <MaterialIcons name="arrow-back" size={20} color={"#000"} />
              </TouchableOpacity>
              <CustomText style={tw`text-[#FF0000] text-[16px] font-semibold uppercase`}>{trapType} Traps</CustomText>

            </View>

          </View>

          <View style={tw``}>
            {data?.all_items?.filter((item) => {
              // Filter based on trapType
              if (trapType === 'previewed') {
                return item.preview === '1'; // Include items with preview === 1
              }
              if (trapType === 'saved') {
                return item.post === '1'; // Include items with post === 1
              }
              return true; // Default case, include all items
            }).length === 0 ? (
              // No data case
              <>
              <Image
              source={{
                uri: 'data:image/jpeg;base64,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', // Replace with a pest control-related image URL
              }}
              style={tw`w-[100%] h-[200px]`}
              resizeMode="contain"
            />
              <CustomText style={tw`text-center text-[14px] text-[#999] mt-[20px]`}>
                 No data available
              </CustomText>
              </>
            ) : (
              // Render filtered items
              data?.all_items
                ?.filter((item) => {
                  if (trapType === 'previewed') {
                    return item.preview === '1';
                  }
                  if (trapType === 'saved') {
                    return item.post === '1';
                  }
                  return true;
                })
                .map((item) => (
                  <TouchableOpacity
                    style={tw`bg-white mb-[20px] p-[20px] w-full relative flex flex-col`}
                    key={item.id}
                    onPress={() => {
                      router.push({
                        pathname: '/traps/detail',
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
                    <CustomText style={tw`text-[11px] pt-[5px] w-fit mt-[10px] rounded-[10px] font-semibold`}>
                      Date: {item?.date}
                    </CustomText>
                    <CustomText style={tw`text-[11px] pt-[5px] w-fit mt-[10px] rounded-[10px] font-semibold`}>
                      Count: {item?.count}
                    </CustomText>
                    <CustomText style={tw`text-[11px] pt-[5px] w-fit mt-[10px] rounded-[10px] font-semibold`}>
                      Notes: {item?.notes}
                    </CustomText>
                    <CustomText
                      style={tw`text-[11px] absolute uppercase top-0 right-[10px] p-[5px] bg-[#D83A39] px-[10px] text-white w-fit mt-[10px] rounded-[10px] font-semibold`}
                    >
                      {trapType}
                    </CustomText>
                  </TouchableOpacity>
                ))
            )}
          </View>



        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
