import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import tw from 'twrnc';

const SplashScreenComponent = ({ setIsSplashVisible }: { setIsSplashVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <View style={tw`h-full w-full mt-10 items-center flex`}>
      <Swiper
        dotColor="#000"
        activeDotColor="red"
        paginationStyle={{ bottom: 105 }}
      >
        {/* First Slide - Pest Control Awareness */}
        <View style={styles.slide1}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-vector/pest-control-service-illustration_1284-8981.jpg', // Replace with a pest control-related image URL
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <View
            style={{
              width: '100%',
              padding: 20,
              paddingBottom: 30,
              marginBottom: 100,
              marginTop: 10,
              borderRadius: 20,
              position: 'absolute',
              bottom: 20,
            }}
          >
            <Text style={[styles.text]}>
              Effective Pest Control Starts Here{"\n"}
              {"\n"}
              <Text style={[styles.innertext, { fontFamily: 'Rubik_400Regular' }]}>
                Take control of your environment! Learn about various pests and how you can manage infestations effectively with our expert resources and services.
              </Text>
            </Text>
          </View>
        </View>

        {/* Second Slide - Preventing Pest Infestations */}
        <View style={styles.slide1}>
          <Image
            source={{
              uri: 'https://pestflash.com/wp-content/uploads/2023/09/pest-control-mobile-app-for-android-768x1662.png', // Replace with a pest control-related image URL
            }}
            style={tw`h-[350px] w-[350px] mt-[-200px]`}
            resizeMode="contain"
          />
          <View
            style={{
              width: '100%',
              padding: 20,
              paddingBottom: 30,
              marginBottom: 100,
              marginTop: 10,
              borderRadius: 20,
              position: 'absolute',
              bottom: 20,
            }}
          >
            <Text style={[styles.text]}>
              Preventing Pests is Easier Than You Think{"\n"}
              {"\n"}
              <Text style={[styles.innertext, { fontFamily: 'Rubik_400Regular' }]}>
                Discover tips and techniques to prevent pests before they become a problem. Keep your galleries, libraries archives and museums safe from unwelcome guests.
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setIsSplashVisible(false)}
            style={styles.skipButton}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </Swiper> 
    </View>
  );
};

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    height: '200%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  text: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  innertext: {
    fontSize: 13,
    fontWeight: 'normal',
    padding: 20,
    lineHeight: 20,
  },
  skipButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff735c',
    borderRadius: 10,
    position: 'absolute',
    bottom: 50,
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    flex: 1,
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: -250,
  },
});

export default SplashScreenComponent;
