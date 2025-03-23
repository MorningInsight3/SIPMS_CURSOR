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
import Header from '@/components/Header';

export default function IncidentalCapture() {
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
    router.push({
      pathname: '/findings',
      params: { type: 'IC' }, // Passing the dynamic repoId
    });  };

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
        <Header title={"Incidental Capture"} />

        <Ripple onPress={gotoFindings}
            style={tw` px-[10px] rounded-[10px] bg-[#000] text-white`}
          >
            <Button textColor="white" style={tw`py-0`}>
              <CustomText style={tw`font-semibold text-[12px]`}>View Incidental Capture Data</CustomText>
            </Button>
          </Ripple>

        <View style={tw`pt-[10px]`}>
          <CustomText style={tw` text-[15px] mb-[20px]`}>
            Inspection Area
          </CustomText>
          {data?.all_items?.length ? (
            data.all_items.map((item) => (
              <Link
                key={item.id}
                href={{
                  pathname: '/repos/repodetail',
                  params: { repoId: item.id, Type: 'IncidentalCapture' }, // Passing the dynamic repoId
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


