import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomText from './CustomText';
import tw from 'twrnc';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';

export class Header extends Component {
    render() {
        const { title } = this.props; // Access props using `this.props`
        return (
            <View style={tw`flex flex-row items-center`}>
                <TouchableOpacity onPress={() => router.back()} style={tw`p-[20px] pr-[10px] pl-0`}>
                    <MaterialIcons name="arrow-back" size={20} color={"#000"} />
                </TouchableOpacity>
                <CustomText style={tw`font-bold text-center flex-1 text-[15px]`}>{title ? title : ''}</CustomText>
            </View>
        );
    }
}

export default Header;