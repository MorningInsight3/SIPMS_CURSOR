import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import UserAvatar from 'react-native-user-avatar';
import Ripple from 'react-native-material-ripple';
import CustomText from '@/components/CustomText';
import { Button } from 'react-native-paper';
import useRepoStore from '@/hooks/useRepoStore'; // Adjust the path to match your project structure
import useAuthStore from '@/hooks/useAuthStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

export default function Repos() {
  const { postRepoData, isLoading } = useRepoStore(); // Zustand store
  const queryClient = useQueryClient(); // Used to trigger refetch

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  const [textareaValue, setTextareaValue] = useState('');

  // Fetch repo data
  const { data, error, isLoading: isDataLoading, refetch } = useQuery({
    queryKey: ['carts-info'],
    queryFn: () =>
      fetch(`https://glamsipms.com/api/v2/repo-summary/${user?.id}`).then((res) => res.json()),
  });




  // Refetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      refetch(); // Trigger refetch whenever the screen is focused
    }, [refetch])
  );

  // Handle repo data submission
  const handleRepoData = async () => {
    const payload = {
      name: textareaValue,
      user_id: user?.id,
    };

    // Post new repo
    await postRepoData(payload);

    setTextareaValue('');
    // After posting, refetch or update data
    queryClient.invalidateQueries(['carts-info']); // This triggers a refetch of the data
  };



  const gotoFindings = () => {
    router.push('findings'); // Navigate to the traps page
  };

  if (isDataLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error loading data.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView style={tw`mx-4 my-2 bg-white rounded-5 h-full p-5`}>
        <View style={tw`flex pb-[10px] flex-row items-center justify-between border-b border-black-300`}>
          <View style={tw`flex flex-row items-center`}>
            <UserAvatar style={tw`mt-[0px]`} size={40} name={isLoggedIn ? user?.name : 'Howdy'} />
            <View>
              <CustomText style={tw`text-[#999] font-semibold max-w-[250px] ml-[10px]`}>My Repos</CustomText>
            </View>
          </View>

          <Ripple onPress={gotoFindings}
            style={tw` px-[10px] rounded-[10px] bg-[#000] text-white`}
          >
            <Button textColor="white" style={tw`py-0`}>
              <CustomText style={tw`font-semibold text-[10px]`}>View Repo Data</CustomText>
            </Button>
          </Ripple>
        </View>
        <View style={tw`pt-[10px]`}>
  {data?.all_items?.length ? (
    data.all_items.map((item) => (
      <Link
        key={item.id}
        href={{
          pathname: '/(tabs)/repodetail/[repoId]',
          params: { repoId: item.id }, // Passing the dynamic repoId
        }}
      >
        <View style={tw`flex flex-row items-center h-[50px]`}>
          <UserAvatar
            style={tw`mr-[10px]`}
            size={40}
            name={item?.repo_name || 'Unnamed Repo'} // Fallback to "Unnamed Repo"
          />
          <CustomText style={tw`font-semibold text-[15px]`}>
            {item?.repo_name || 'Unnamed Repo'} {/* Fallback to "Unnamed Repo" */}
          </CustomText>
        </View>
      </Link>
    ))
  ) : (
    <Text style={tw`text-center text-[#999]`}>No repositories found.</Text>
  )}
</View>



        <View>
          <View style={tw`flex flex-row items-center justify-between`}>
            <View>
              <CustomText style={tw`text-[#999] font-semibold mt-2 max-w-[250px]`}>Create a new repo</CustomText>
            </View>
          </View>

          <View style={tw`mt-4`}>
            <Text style={tw`text-[#000] font-medium mb-2`}>Repo name</Text>
            <TextInput
              style={tw`h-[100px] bg-gray-100 border border-[#ddd] rounded-[5px] p-3 text-[16px] text-black`}
              multiline
              numberOfLines={4}
              placeholder="Please write Repo name."
              placeholderTextColor="#999"
              value={textareaValue}
              onChangeText={(text) => setTextareaValue(text)}
            />
          </View>

          <View style={tw`flex flex-row mb-[200px] items-center`}>
            <Ripple
              onPress={handleRepoData}
              disabled={isLoading}
              style={tw`py-[05px] w-[50%] px-[20px] rounded-[10px] bg-[#000] text-white mt-[30px]`}
            >
              <Button textColor="white" style={tw`py-0`}>
                {isLoading ? 'Posting...' : 'Create Repo'}
              </Button>
            </Ripple>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
