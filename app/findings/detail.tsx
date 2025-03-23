import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useMoveTrapData from '@/hooks/useMoveTrapData'; // Adjust the path to match your project structure
import tw from 'twrnc';
import CustomText from '@/components/CustomText';
import UserAvatar from 'react-native-user-avatar';
import Ripple from 'react-native-material-ripple';
import { Button } from 'react-native-paper';
import useAuthStore from '@/hooks/useAuthStore';
import BottomSheet from '@/components/core/BottomSheet';
import { useQuery } from '@tanstack/react-query';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Header from '@/components/Header';

export default function Detail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { repoId } = params;
  const [repoDetails, setRepoDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { postMoveTrapData, isLoading: isDataLoading } = useMoveTrapData(); // Zustand store

  const [showForm, setShowForm] = useState(false);


  const toggleFilter = () => {
    setShowForm(!showForm);
  };


  const user = useAuthStore((state) => state.user);


  const handleMoveTrap = async () => {
    if (!selectedRepo) {
      console.error('Error: No repo selected');
      return;
    }

    if (!repoDetails?.all_items?.[0]?.id) {
      console.error('Error: No repo ID found');
      return;
    }

    const payload = {
      newlocationid: selectedRepo?.id,
      newlocationname: selectedRepo?.repo_name,
    };

    try {
      await postMoveTrapData(repoDetails.all_items[0].id, payload);

      router.push("/repos"); // Correct syntax for navigation
    } catch (error) {
    } finally {
      setShowForm(false);
    }
  }


  const [selectedRepo, setSelectedRepo] = useState(null); // State to track selected repo


  const handleRepoSelection = (repo) => {
    setSelectedRepo(repo);
  };



  const { data, error, isLoading: isRepoLoading, refetch } = useQuery({
    queryKey: ['carts-info'],
    queryFn: () =>
      fetch(`https://glamsipms.com/api/v2/repo-summary/${user?.id}`).then((res) => res.json()),
  });

  useEffect(() => {
    const fetchRepoDetails = async () => {
      if (repoId) {
        try {
          const response = await fetch(`https://glamsipms.com/api/v2/finding-show/${repoId}`);
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

  // Extract entries for rendering
  const entries = repoDetails?.all_items?.[0]?.entries
    ? JSON.parse(repoDetails.all_items[0].entries)
    : {};

  const totalCaught = repoDetails?.all_items?.[0]?.total;


  return (
    <SafeAreaView>
      <ScrollView style={tw`mx-4 my-2 bg-white rounded-5 h-full p-5`}>
                        <Header />
        
        <View>
          <View style={tw`flex flex-row items-center justify-between`}>
            <CustomText style={tw`font-semibold text-[20px]`}>{repoDetails?.all_items?.[0]?.repo_name}</CustomText>
            <UserAvatar style={tw`mt-[0px]`} size={40} name={user?.name} />

          </View>
        </View>
        <View style={tw`mt-[20px]`}>
          <Image
            source={{
              uri: 'https://gpcpest.com/wp-content/uploads/2024/06/bed-bugs-invasion.webp', // Replace with a pest control-related image URL
            }}
            style={tw`w-[100%] h-[200px]`}
            resizeMode="contain"
          />
          <CustomText style={tw`mt-2 font-semibold text-[11px] text-[#999]`}>Name</CustomText>
          <CustomText style={tw`mt-1 font-semibold text-[13px] text-[#000]`}>
            {repoDetails?.all_items?.[0]?.name}
          </CustomText>
          <View style={tw`flex flex-row items-center mt-[10px]`}>
            <View>
              <CustomText style={tw`mt-2 font-semibold text-[11px] text-[#999]`}>Status</CustomText>
              <CustomText style={tw`mt-1 font-semibold text-[13px] text-[#000] w-[150px]`}>
              {repoDetails?.all_items?.[0]?.status}

              </CustomText>
            </View>
            <View>
              <CustomText style={tw`mt-2 font-semibold text-[11px] text-[#999]`}>Echo Type</CustomText>
              <CustomText style={tw`mt-1 font-semibold text-[13px] text-[#000]`}>{repoDetails?.all_items?.[0]?.echo}
              </CustomText>
            </View>
          </View>

          <View style={tw`flex flex-row items-center mt-[10px] `}>
            <View style={tw``}>
              <CustomText style={tw`mt-2 font-semibold text-[11px] text-[#999]`}>
                Life Stage
              </CustomText>
              <CustomText style={tw`mt-1 font-semibold text-[13px] text-[#000] w-[150px]`}>
                {repoDetails?.all_items?.[0]?.lifestage}

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

          {/* Render Entries */}
          <View style={tw`mt-[20px]`}>
            {Object.keys(entries).map((date) => (
              <View key={date} style={tw`mb-5`}>
                <CustomText style={tw`font-semibold text-[15px] text-[#000] pb-[10px] border-b border-black-300`}>{date}</CustomText>
                {entries[date].map((entry, index) => (
                  <View key={index} style={tw`flex flex-row justify-between mt-2`}>
                    <CustomText style={tw`text-[14px] text-[#000]`}>{entry.name}</CustomText>
                    <CustomText style={tw`text-[14px] text-[#000]`}>{entry.count}</CustomText>
                  </View>
                ))}
              </View>
            ))}
            <View style={tw`flex flex-row items-center justify-center`}>
              <Text style={tw`text-[20px] font-bold text-[#555] mt-4 text-center`}>
                Total Caught
              </Text>
              <Text style={tw`text-[20px] ml-[10px] text-blue-500 font-bold mt-4 text-center border p-[5px] rounded-[5px]`}>
                {totalCaught}
              </Text>
            </View>
          </View>


          <View style={tw`flex flex-row mb-[200px] items-center`}>

            <Ripple
              onPress={() => setShowForm(true)}

              style={tw`py-[05px] w-[100%] mr-[10px]   px-[20px] rounded-[10px] bg-[#D83A39] text-white mt-[30px]`}
            >
              <Button
                textColor="white" style={tw`py-0`}>
                Move Trap
              </Button>
            </Ripple>


          </View>

          {showForm && (
            <BottomSheet closeBottomSheet={toggleFilter} isVisible={showForm}>
              <View style={tw`p-4 px-[20px] py-0`}>
                <View style={tw`flex flex-row items-center justify-between mt-2 pb-[30px]`}>
                  <CustomText style={tw`text-[#000] font-medium  text-[18px]`}>Choose Repo</CustomText>
                  <MaterialIcons onPress={() => setShowForm(false)} name="close" size={20} />
                </View>
                <ScrollView style={tw`pt-[0px] h-[400px]`}>
                  {data?.all_items?.length ? (
                    data.all_items.map((item) => (
                      <Ripple
                        key={item.id}
                        onPress={() => handleRepoSelection(item)}
                        style={tw`py-2 px-4 mb-5 rounded-lg ${selectedRepo?.id === item.id ? 'bg-blue-500' : 'bg-gray-200'}`}
                      >
                        <CustomText style={tw`font-semibold text-[15px] text-${selectedRepo?.id === item.id ? 'white' : 'black'}`}>
                          {item?.repo_name || 'Unnamed Repo'}
                        </CustomText>
                      </Ripple>
                    ))
                  ) : (
                    <Text style={tw`text-center text-[#999]`}>No repositories found.</Text>
                  )}
                </ScrollView>

                {/* Submit Button */}
                <Button
                  onPress={handleMoveTrap}
                  mode="contained"
                  disabled={!selectedRepo}
                  style={tw`mt-4 rounded-[10px]`}
                >
                  Confirm Move Trap
                </Button>
              </View>
            </BottomSheet>
          )}


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
