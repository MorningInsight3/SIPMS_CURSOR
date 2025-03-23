import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useRepoFindingStore from '@/hooks/useRepoFindingStore'; // Adjust the path to match your project structure
import tw from 'twrnc';
import CustomText from '@/components/CustomText';
import Ripple from 'react-native-material-ripple';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomSheet from '@/components/core/BottomSheet';
import * as ImagePicker from "expo-image-picker";
import Header from '@/components/Header';

export default function RepoDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { repoId, Type } = params;
  const [repoDetails, setRepoDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { postRepofindingData, isLoading: isDataLoading } = useRepoFindingStore(); // Zustand store

  const [textareaValue, setTextareaValue] = React.useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [entries, setEntries] = useState({});

  const [selectedValues, setSelectedValues] = useState({
    name: "Select Name",
    status: 'Select Status',
    echo: 'Select Echo',
    lifeStage: 'Select Life Stage',
    size: 'Select Size',
    surface: 'Select Surface',

  });

  const options = {
    name: ['Cockroach', 'Termite', 'Bedbug'],
    status: ['Active', 'Inactive', 'Pending'],
    echo: ['Dry'],
    lifeStage: ['Larva', 'Pupa', 'Adult'],
    size: ['Small', 'Medium', 'Large'],
    surface: ['Floor', 'Kitchen Floor', 'Garden Soil'],

  };

  const [count, setCount] = useState(0);

  // Increment function
  const increment = () => setCount(count + 1);

  // Decrement function
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1); // prevent going below 0
    }
  };

  const toggleFilter = (field = null) => {
    setActiveField(field);
    setShowForm(!showForm);
  };


  const togglePosition = () => {
    setShowPosition(!showPosition);
  };


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    // Format date as YYYY-MM-DD for unique keys
    const formattedDate = currentDate.toISOString().split('T')[0];

    // Add date to entries if not already present
    if (!entries[formattedDate]) {
      setEntries((prevEntries) => ({
        ...prevEntries,
        [formattedDate]: [{ name: '', count: '' }],
      }));
    }
  };

  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  console.log(selectedPosition, 'selectedPosition')


  const handleSelectOption = (field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    setShowForm(false); // Close the bottom sheet
  };


  const showDatePicker = () => {
    setShow(true);
  };

  const [image, setImage] = useState(null);


  const handleAddRow = (dateKey) => {
    setEntries((prevEntries) => ({
      ...prevEntries,
      [dateKey]: [...prevEntries[dateKey], { name: '', count: '' }],
    }));
  };

  const handleDeleteRow = (dateKey, index) => {
    setEntries((prevEntries) => ({
      ...prevEntries,
      [dateKey]: prevEntries[dateKey].filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (dateKey, index, field, value) => {
    setEntries((prevEntries) => {
      const updatedEntries = prevEntries[dateKey] ? [...prevEntries[dateKey]] : [];
      updatedEntries[index][field] = value;
      return { ...prevEntries, [dateKey]: updatedEntries };
    });
  };


  // Calculate total count
  const totalCaught = Object.values(entries).reduce((total, dateEntries) => {
    const dateTotal = dateEntries.reduce((sum, entry) => {
      const count = parseInt(entry.count, 10) || 0; // Convert to number or default to 0
      return sum + count;
    }, 0);
    return total + dateTotal;
  }, 0);



  const [showForm, setShowForm] = useState(false);
  const [activeField, setActiveField] = useState(null); // Track the active field
  const [showPosition, setShowPosition] = useState(false);


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

  const uniquePosition = selectedPosition + "." + new Date().getTime();



  const handleRepoData = async () => {
    const formData = new FormData();

    // Append other fields to FormData
    formData.append("user_id", repoDetails?.all_items?.[0]?.user_id);
    formData.append("repo_id", repoDetails?.all_items?.[0]?.id);
    formData.append("repo_name", repoDetails?.all_items?.[0]?.repo_name);
    formData.append("entries", JSON.stringify(entries));
    formData.append("notes", textareaValue);
    formData.append("total", totalCaught);
    formData.append("type", Type);
    formData.append("position", selectedPosition);
    formData.append("uniqueposition", uniquePosition);

    // Append selected values to FormData
    Object.entries(selectedValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      // Wait for the response from the store's postRepofindingData function
      const response = await postRepofindingData(formData);
      router.push('/findings');

    } catch (error) {
      console.error('Error posting repo data:', error);
      alert('There was an error while posting the data');
    }
  };




  useEffect(() => {
    const fetchRepoDetails = async () => {
      if (repoId) {
        try {
          const response = await fetch(`https://glamsipms.com/api/v2/repo-show/${repoId}`);
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
      <ScrollView style={tw`mx-4 my-2 bg-white rounded-5 h-full p-5`}>
        <Header />

        <CustomText style={tw`font-semibold text-[20px]`}>{repoDetails?.all_items?.[0]?.repo_name}</CustomText>


        <Ripple
          onPress={() => setShowPosition(true)}

          style={tw`py-[05px] w-[100%] mr-[10px]   px-[20px] rounded-[10px] bg-[#D83A39] text-white mt-[30px]`}
        >
          <Button
            textColor="white" style={tw`py-0`}>
            {selectedPosition ? `Position ${selectedPosition}` : 'Select Position'}
          </Button>
        </Ripple>


        {selectedPosition &&
          <>
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

            <View>

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


              <TouchableOpacity
                onPress={showDatePicker}
                style={tw`bg-blue-500 p-3 rounded-md mb-5 mt-5`}
              >
                <Text style={tw`text-white text-center`}>Select Date</Text>
              </TouchableOpacity>

              {show && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChange}
                />
              )}

              {Object.keys(entries).map((dateKey) => (
                <View key={dateKey} style={tw`mb-8`}>
                  <Text style={tw`text-gray-500 mb-2 border-[#D3D3D3] border-b-[1px] pb-[10px] mb-[20px]`}>{dateKey}</Text>
                  {entries[dateKey].map((entry, index) => (
                    <View key={index} style={tw`flex-row mb-2 items-center`}>
                      <TextInput
                        style={tw`flex-1 border border-gray-300 p-2 rounded-md mr-2`}
                        placeholder="Name"
                        placeholderTextColor="#999"
                        value={entry.name}
                        onChangeText={(text) =>
                          handleInputChange(dateKey, index, 'name', text)
                        }
                      />
                      <TextInput
                        style={tw`w-[70px] border border-gray-300 p-2 rounded-md`}
                        placeholder="Count"
                        placeholderTextColor="#999"

                        keyboardType="numeric"
                        value={entry.count}
                        onChangeText={(text) =>
                          handleInputChange(dateKey, index, 'count', text)
                        }
                      />
                      <TouchableOpacity
                        onPress={() => handleDeleteRow(dateKey, index)}
                        style={tw`ml-2 bg-red-500 p-2 rounded-md`}
                      >
                        <Text style={tw`text-white`}>X</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                  <TouchableOpacity
                    onPress={() => handleAddRow(dateKey)}
                    style={tw`bg-green-500 p-2 rounded-md`}
                  >
                    <Text style={tw`text-white text-center`}>Add Row</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <Text style={tw`text-sm mt-4 text-center`}>
                Total Caught
              </Text>
              <Text style={tw`text-[30px] text-blue-500 font-bold mt-4 text-center`}>
                {totalCaught}
              </Text>
              <View style={tw`flex flex-row mb-[200px] items-center`}>
                <Ripple
                  onPress={handleRepoData}
                  disabled={isLoading}
                  style={tw`py-[05px] w-[100%] px-[20px] rounded-[10px] bg-green-500 text-white mt-[30px]`}
                >
                  <Button textColor="white" style={tw`py-0`}>
                    {isDataLoading ? 'Posting...' : 'Done'}
                  </Button>
                </Ripple>
              </View>
            </View>
          </>
        }

      </ScrollView>

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

      <BottomSheet closeBottomSheet={togglePosition} isVisible={showPosition}>
        <View style={tw`p-4 px-[50px] py-0`}>
          {/* Check if activeField is a string */}

          <CustomText style={tw`text-[#000] font-medium mt-2 pb-[30px] text-[18px]`}>Select Position</CustomText>
          <ScrollView style={tw` h-[500px]`}>

            {repoDetails?.all_items?.length > 0 &&
              [...Array(parseInt(repoDetails.all_items[0].position))].map((_, index) => {
                const positionNumber = index + 1;
                const isSelected = selectedPosition === positionNumber;

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedPosition(positionNumber); // Set the selected position
                      setShowPosition(false); // Close the BottomSheet
                    }}
                    style={tw`p-2 ${isSelected ? 'bg-blue-500' : 'bg-gray-200'} rounded-lg mt-2`}
                  >
                    <CustomText style={tw`text-[#000] ${isSelected ? 'text-white' : 'text-black'}`}>
                      Position {positionNumber}
                    </CustomText>
                  </TouchableOpacity>
                );
              })
            }
          </ScrollView>


        </View>
      </BottomSheet>
    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
