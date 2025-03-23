import CustomText from "@/components/CustomText";
import useAuthStore from "@/hooks/useAuthStore";
import { useState } from "react";
import Ripple from 'react-native-material-ripple';

import {
    ActivityIndicator,
    Image,
    Linking,
    SafeAreaView,
    ScrollView,
    StyleSheet,
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
import Header from "@/components/Header";
import { Button } from "react-native-paper";


export default function RoutineInspection() {
    const user = useAuthStore((state) => state.user);
    const params = useLocalSearchParams();

  const gotoFindings = () => {
    router.push({
      pathname: '/findings',
      params: { type: 'RI' }, // Passing the dynamic repoId
    });  };



    return (
        <SafeAreaView>
            <ScrollView style={tw`mx-4 my-2 bg-[#ededed] rounded-5 h-full p-5 `}>

                <Header title={"Routine Inspection"}/>

             
                <TouchableOpacity
                    onPress={() => router.push('/(tabs)/newtrap')}
                    style={styles.box}
                >
                    <Image
                        style={tw`w-[100px] h-[100px] mb-[20px]`}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/10337/10337579.png', // Replace with a pest control-related image URL
                        }}
                        resizeMode="contain"
                    />
                    <CustomText style={styles.boxText}>Add New Trap</CustomText>
                </TouchableOpacity>


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
        fontSize: 14,
        color: '#000',
        fontFamily: 'Poppins_600SemiBold',
        textAlign: "center"
    },
})
