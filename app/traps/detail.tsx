import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useRepoFindingStore from '@/hooks/useRepoFindingStore'; // Adjust the path to match your project structure
import tw from 'twrnc';
import CustomText from '@/components/CustomText';
import UserAvatar from 'react-native-user-avatar';
import Ripple from 'react-native-material-ripple';
import { Button } from 'react-native-paper';
import useAuthStore from '@/hooks/useAuthStore';
import Header from '@/components/Header';

export default function Detail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { repoId } = params;
  const [repoDetails, setRepoDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { postRepofindingData, isLoading: isDataLoading } = useRepoFindingStore(); // Zustand store

  const [textareaValue, setTextareaValue] = React.useState('');

  const user = useAuthStore((state) => state.user);

  // Handle repo data submission
  const handleRepoData = async () => {
    const payload = {
      name: textareaValue,
      user_id: repoDetails?.all_items?.[0]?.user_id,
      repo_id: repoDetails?.all_items?.[0]?.id,
      repo_name: repoDetails?.all_items?.[0]?.repo_name

    };

    // Post new repo
    await postRepofindingData(payload);

    setTextareaValue('');
    // After posting, refetch or update data
  };

  useEffect(() => {
    const fetchRepoDetails = async () => {
      if (repoId) {
        try {
          const response = await fetch(`https://glamsipms.com/api/v2/trap-show/${repoId}`);
          const data = await response.json();
          setRepoDetails(data);
        } catch (error) {
          console.error('Error fetching repo details:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRepoDetails();
  }, [repoId]);

  if (isLoading) {
    return (
      <View style={tw`bg-white h-full flex items-center justify-center`}>
        <ActivityIndicator size={20} />
      </View>
    );
  }

  if (!repoDetails) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Error fetching repo details.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>


      <ScrollView style={tw`mx-4 my-2 bg-white rounded-5 h-full p-5 `}>
                <Header />
        
        <View >
          <View style={tw`flex flex-row items-center justify-between`}>
            <CustomText style={tw`font-semibold text-[20px]`}>  {repoDetails?.all_items?.[0]?.name}</CustomText>
            <UserAvatar style={tw`mt-[0px]`} size={40} name={user?.name} />
          </View>
        </View>
        <View style={tw`mt-[20px]`}>
          <Image
            source={{ uri: repoDetails?.all_items?.[0]?.image }}

            style={tw`w-[100%] h-[200px]`}
            resizeMode="contain"
          />
          <CustomText style={tw`mt-2 font-semibold text-[11px] text-[#999]`}>
            Name
          </CustomText>
          <CustomText style={tw`mt-1 font-semibold text-[13px] text-[#000]`}>
            {repoDetails?.all_items?.[0]?.name}
          </CustomText>
          <View style={tw`flex flex-row items-center mt-[10px] `}>
            <View >
              <CustomText style={tw`mt-2 font-semibold text-[11px] text-[#999]`}>
                Status
              </CustomText>
              <CustomText style={tw`mt-1 font-semibold text-[13px] text-[#000] w-[150px]`}>
                {repoDetails?.all_items?.[0]?.status}

              </CustomText>
            </View>
            <View style={tw``}>
              <CustomText style={tw`mt-2 font-semibold text-[11px] text-[#999]`}>
                Echo Type
              </CustomText>
              <CustomText style={tw`mt-1 font-semibold text-[13px] text-[#000]`}>
                {repoDetails?.all_items?.[0]?.echo}

              </CustomText>
            </View>
          </View>
          <View style={tw`flex flex-row items-center mt-[10px] `}>
            <View style={tw``}>
              <CustomText style={tw`mt-2 font-semibold text-[11px] text-[#999]`}>
                Life Stage
              </CustomText>
              <CustomText style={tw`mt-1 font-semibold text-[13px] text-[#000] w-[150px]`}>
                {repoDetails?.all_items?.[0]?.life_stage}

              </CustomText>
            </View>
            <View>
              <CustomText style={tw`mt-2 font-semibold text-[11px] text-[#999]`}>
                Size
              </CustomText>
              <CustomText style={tw`mt-1 font-semibold text-[13px] text-[#000]`}>
                {repoDetails?.all_items?.[0]?.size}

              </CustomText>
            </View>
          </View>
          <View style={tw`flex flex-row items-center mt-[10px] `}>
            <View style={tw``}>
              <CustomText style={tw`mt-2 font-semibold text-[11px] text-[#999]`}>
                Location
              </CustomText>
              <CustomText style={tw`mt-1 font-semibold text-[13px] text-[#000] w-[150px]`}>
                {repoDetails?.all_items?.[0]?.uniqueposition}

              </CustomText>
            </View>

          </View>
          <View style={tw`flex flex-row items-center mt-[10px] `}>
            <View style={tw``}>
              <CustomText style={tw`mt-2 font-semibold text-[11px] text-[#999]`}>
                Surface
              </CustomText>
              <CustomText style={tw`mt-1 font-semibold text-[13px] text-[#000] w-[150px]`}>
                {repoDetails?.all_items?.[0]?.surface}

              </CustomText>
            </View>
            <View>
              <CustomText style={tw`mt-2 font-semibold text-[11px] text-[#999]`}>
                Date
              </CustomText>
              <CustomText style={tw`mt-1 font-semibold text-[13px] text-[#000]`}>
                {repoDetails?.all_items?.[0]?.date}

              </CustomText>
            </View>
          </View>
          <View style={tw`flex flex-row items-center mt-[10px] `}>
            <View style={tw``}>
              <CustomText style={tw`mt-2 font-semibold text-[11px] text-[#999]`}>
                Investigation Notes
              </CustomText>
              <CustomText style={tw`mt-1 font-semibold text-[12px] text-[#000]`}>
                {repoDetails?.all_items?.[0]?.notes}



              </CustomText>
            </View>

          </View>
          {/* <Ripple

                        style={tw`py-[05px] w-[50%] mx-auto  px-[20px] rounded-[10px] bg-[#000] text-white mt-[30px]`}
                    >
                        <Button textColor="white" style={tw`py-0`}>
                            Post Data
                        </Button>
                    </Ripple> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
