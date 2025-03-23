import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import tw from 'twrnc';
import CustomText from '@/components/CustomText';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function AboutScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <ScrollView style={tw`mx-4 my-2 bg-white rounded-5 h-full p-5`}>
        <View style={tw`flex flex-row items-center mb-6`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`p-2 mr-2`}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <CustomText style={tw`font-bold text-xl`}>About Us</CustomText>
        </View>
        
        <Image
          source={require('@/assets/images/logo.png')}
          style={tw`w-24 h-24 self-center mb-6`}
          resizeMode="contain"
        />
        
        <CustomText style={tw`text-lg font-bold mb-4`}>
          Intelligent Integrated Pest Management System
        </CustomText>
        
        <CustomText style={tw`mb-4 text-gray-700`}>
          Our Integrated Pest Management System (IPMS) provides a comprehensive solution for monitoring, 
          tracking, and managing pest control activities within facilities.
        </CustomText>
        
        <CustomText style={tw`font-bold text-base mb-2`}>Key Features:</CustomText>
        
        <View style={tw`mb-4`}>
          <CustomText style={tw`mb-1 text-gray-700`}>• Trap monitoring and management</CustomText>
          <CustomText style={tw`mb-1 text-gray-700`}>• Digital pest identification</CustomText>
          <CustomText style={tw`mb-1 text-gray-700`}>• Activity logging and reporting</CustomText>
          <CustomText style={tw`mb-1 text-gray-700`}>• Location tracking of pest activities</CustomText>
          <CustomText style={tw`mb-1 text-gray-700`}>• Treatment recommendations</CustomText>
        </View>
        
        <CustomText style={tw`font-bold text-base mb-2`}>Our Mission:</CustomText>
        <CustomText style={tw`mb-4 text-gray-700`}>
          To provide an effective, environmentally responsible solution for pest management 
          that helps protect facilities while minimizing chemical usage and environmental impact.
        </CustomText>
        
        <CustomText style={tw`font-bold text-base mb-2`}>Contact Us:</CustomText>
        <CustomText style={tw`mb-1 text-gray-700`}>Email: support@ipms.com</CustomText>
        <CustomText style={tw`mb-1 text-gray-700`}>Phone: (555) 123-4567</CustomText>
        
        <CustomText style={tw`mt-8 text-center text-gray-500 text-sm`}>
          Version 1.0.0
        </CustomText>
      </ScrollView>
    </SafeAreaView>
  );
}
