import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Platform, Image } from 'react-native';
import tw from 'twrnc';
import UserAvatar from 'react-native-user-avatar';
import BottomSheet from '../../components/core/BottomSheet';
import Ripple from 'react-native-material-ripple';
import CustomText from '@/components/CustomText';
import { Button } from "react-native-paper";
import useTrapStore from '@/hooks/useTrapStore'; // Adjust the path to match your project structure
import useAuthStore from '@/hooks/useAuthStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from "expo-image-picker";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function NewTrap() {
    const [showForm, setShowForm] = useState(false);
    const [activeField, setActiveField] = useState(null); // Track the active field
    const { postTrapData } = useTrapStore(); // Zustand store
    const [selectedValues, setSelectedValues] = useState({
        name: "Select Name",
        status: 'Select Status',
        echo: 'Select Echo',
        lifeStage: 'Select Life Stage',
        size: 'Select Size',
        surface: 'Select Surface',

    });

    const [loading, setLoading] = useState(false); // Add loading state
    const [postloading, setPostLoading] = useState(false); // Add loading state


    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);



    const handlePostData = async () => {
        setPostLoading(true);

        const formData = new FormData();

        // Append image if available
        if (image) {
            formData.append("image", {
                uri: image,
                name: "trap_image.png", // You can customize the name
                type: "image/png", // Adjust the type if the image is not PNG
            });
        }

        // Append other fields
        formData.append("notes", textareaValue);
        formData.append("count", count);
        formData.append("date", date.toISOString());
        formData.append("user_id", user?.id);
        formData.append("post", 1);
        formData.append("preview", 0);

        // Append selectedValues dynamically
        Object.entries(selectedValues).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            // Send the FormData to your API
            await postTrapData(formData);
            setPostLoading(false);


            setSelectedValues('');
            alert("Trap data posted successfully!");
        } catch (error) {
            console.error("Error previewing trap data:", error);
            alert("Failed to preview trap data!");
        }
    };


    const handlePreviewData = async () => {
        setLoading(true)
        const formData = new FormData();

        // Append image if available
        if (image) {
            formData.append("image", {
                uri: image,
                name: "trap_image.png", // You can customize the name
                type: "image/png", // Adjust the type if the image is not PNG
            });
        }

        // Append other fields
        formData.append("notes", textareaValue);
        formData.append("count", count);
        formData.append("date", date.toISOString());
        formData.append("user_id", user?.id);
        formData.append("post", 0);
        formData.append("preview", 1);

        // Append selectedValues dynamically
        Object.entries(selectedValues).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            // Send the FormData to your API
            await postTrapData(formData);
            setLoading(false);

            setSelectedValues('');
            alert("Trap data previewed successfully!");
        } catch (error) {
            console.error("Error previewing trap data:", error);
            alert("Failed to preview trap data!");
        }
    };


    const [textareaValue, setTextareaValue] = React.useState('');

    const options = {
        name: ['Cockroach', 'Termite', 'Bedbug'],
        status: ['Active', 'Inactive', 'Pending'],
        echo: ['Dry'],
        lifeStage: ['Larva', 'Pupa', 'Adult'],
        size: ['Small', 'Medium', 'Large'],
        surface: ['Floor', 'Kitchen Floor', 'Garden Soil'],

    };

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const user = useAuthStore((state) => state.user);

    const [count, setCount] = useState(0);

    // Increment function
    const increment = () => setCount(count + 1);

    // Decrement function
    const decrement = () => {
        if (count > 0) {
            setCount(count - 1); // prevent going below 0
        }
    };

    const [image, setImage] = useState(null);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    const toggleFilter = (field = null) => {
        setActiveField(field);
        setShowForm(!showForm);
    };

    const handleSelectOption = (field, value) => {
        setSelectedValues((prev) => ({
            ...prev,
            [field]: value,
        }));
        setShowForm(false); // Close the bottom sheet
    };



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showDatePicker = () => {
        setShow(true);
    };


    return (
        <SafeAreaView>
            <ScrollView style={tw`mx-4 my-2 bg-white rounded-5 h-full p-5 `}>



                <View>
                    <View style={tw`flex flex-row items-center justify-between`}>
                        <View>
                            <CustomText style={tw`text-[#000] text-[16px] font-semibold`}>
                                Pest Data
                            </CustomText>
                            <CustomText style={tw`text-[#999] font-semibold mt-2 max-w-[250px]`}>
                                Fill the necessary information about the incident
                            </CustomText>
                        </View>
                        <UserAvatar style={tw`mt-[-50px]`} size={40} name={isLoggedIn ? user?.name : 'Howdy'} />
                    </View>

                    <TouchableOpacity onPress={() => pickImage()}
                        style={[
                            tw`flex flex-row items-center mt-[20px] py-[20px] px-[10px] justify-between pb-[16px] mb-[16px] bg-[#f6f6f6]`,
                        ]}
                    >
                        <View style={tw`flex flex-row items-center`}>

                            <Image
                                source={{
                                    uri: "https://cdn-icons-png.flaticon.com/128/4147/4147103.png",
                                }}
                                style={tw`w-[40px] h-[40px] `}
                            />
                            <Text style={[tw`text-[12px] font-medium ml-[5px] bg-white p-[15px] w-[82%]`, { fontFamily: "Raleway_700Bold" }]}>
                                Upload Trap Image
                            </Text>
                        </View>





                    </TouchableOpacity>

                    {image ? 
                        <View style={tw`relative`}>
                            <Image
                                source={{ uri: image }}
                                style={tw`w-full h-[100px]`} resizeMode='contain'
                            />
                            <TouchableOpacity style={tw`absolute right-0 top-0`} onPress={() => setImage(null)}>
                                <MaterialIcons name="delete" size={28} color={"#000"} />

                            </TouchableOpacity>

                        </View> : 'asd'}

                    {/* Ripple Inputs */}
                    {['name', 'status', 'echo', 'lifeStage', 'size', 'surface']?.map((field) => (
                        <View key={field} style={tw`mt-4`}>
                            <Text style={tw`text-[#000] font-medium mb-2`}>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </Text>
                            <Ripple
                                onPress={() => toggleFilter(field)}
                                style={tw`py-[10px] px-[20px] bg-gray-100 border rounded-[5px] border-[#ddd]`}
                            >
                                <Text style={tw`text-[#000]`}>
                                    {selectedValues[field]}
                                </Text>
                            </Ripple>
                        </View>
                    ))}

                    <View>

                        <Ripple
                            onPress={showDatePicker}

                            style={tw`py-[05px] mr-[10px]   px-[20px] rounded-[10px] bg-[#D83A39] text-white mt-[30px]`}
                        >
                            <Button textColor="white" style={tw`py-0`}>
                                Choose Date
                            </Button>
                        </Ripple>

                        <Text style={tw`my-[10px]`}>Selected Date: {date.toLocaleDateString()}</Text>

                        {show && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>

                    <View style={tw` mt-5`}>

                        <Text style={tw`text-[#000] font-medium mb-2`}>
                            Count
                        </Text>

                        <View style={tw`flex flex-row items-center`}>
                            <TouchableOpacity onPress={decrement} style={tw`bg-[#D9D9D9] rounded-[999px] w-[30px] h-[30px] flex items-center justify-center`}>
                                <Text>-</Text>
                            </TouchableOpacity>

                            <Text style={tw`mx-[15px]`}>{count}</Text>

                            <TouchableOpacity onPress={increment} style={tw`bg-[#D9D9D9] rounded-[999px] w-[30px] h-[30px] flex items-center justify-center`}>
                                <Text>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                    <View style={tw`mt-4 `}>
                        <Text style={tw`text-[#000] font-medium mb-2`}>Please write what you investigate</Text>
                        <TextInput
                            style={tw`h-[100px] bg-gray-100 border border-[#ddd] rounded-[5px] p-3 text-[16px] text-black`}
                            multiline
                            numberOfLines={4}
                            placeholder="Please write what you investigate."
                            placeholderTextColor="#999"
                            value={textareaValue}
                            onChangeText={(text) => setTextareaValue(text)}
                        />
                    </View>

                    <View style={tw`flex flex-row mb-[200px] items-center`}>

                        <Ripple
                            onPress={handlePreviewData}

                            style={tw`py-[05px] w-[46%] mr-[10px]   px-[20px] rounded-[10px] bg-[#D83A39] text-white mt-[30px]`}
                        >
                            <Button                             loading={loading}
 textColor="white" style={tw`py-0`}>
                                Preview
                            </Button>
                        </Ripple>

                        <Ripple onPress={handlePostData}
                             

                            style={tw`py-[05px] w-[50%]  px-[20px] rounded-[10px] bg-[#000] text-white mt-[30px]`}
                        >
                            <Button loading={postloading} textColor="white" style={tw`py-0`}>
                                Post Data                            </Button>
                        </Ripple>
                    </View>

                    {activeField && (
                        <BottomSheet closeBottomSheet={toggleFilter} isVisible={showForm}>
                            <View style={tw`p-4 px-[50px] py-0`}>
                                {/* Check if activeField is a string */}

                                <CustomText style={tw`text-[#000] font-medium mt-2 pb-[30px] text-[18px] mt-[-10px]`}>Select {typeof activeField === 'string' ? activeField : 'Unknown Field'}</CustomText>

                                {/* Check if options[activeField] is an array */}
                                {Array.isArray(options[activeField]) && options[activeField].map((option, index) => (
                                    <Text
                                        key={index}
                                        style={tw`font-medium text-[15px] text-left mb-4`}
                                        onPress={() => handleSelectOption(activeField, option)}
                                    >
                                        {option}
                                    </Text>
                                ))}
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
