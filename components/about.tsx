import React, { Component } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import tw from "twrnc";

export default class About extends Component {
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.featured}>
            <View>
              <View style={styles.singleBorder}>
                <Text style={tw`font-bold text-base`}>About Hand2Hand</Text>
                <Text style={tw`font-normal text-sm mt-2`}>
                  Hand2Hand is your go-to marketplace for discovering and
                  purchasing products directly from sellers. Our platform offers
                  a seamless way for buyers to explore a diverse range of
                  products, communicate with sellers, and make informed
                  purchasing decisions. Whether you’re looking for unique
                  handmade items, electronics, or anything in between, Hand2Hand
                  connects you with sellers who are passionate about their
                  products.
                </Text>
              </View>

              <View style={styles.singleBorder}>
                <Text style={tw`font-bold text-base mt-2`}>
                  Why Choose Hand2Hand
                </Text>
                <Text style={tw`font-normal text-sm mt-2`}>
                  Hand2Hand stands out by providing a personalized marketplace
                  experience. With a wide selection of products from trusted
                  sellers, you can easily find what you need while supporting
                  small businesses. Our platform simplifies the buying process
                  with features that allow you to browse products, send
                  inquiries to sellers, and get updates on new arrivals and
                  promotions. We make online shopping efficient and enjoyable!
                </Text>
              </View>

              <View style={styles.singleBorder}>
                <Text style={tw`font-bold text-base mt-2`}>
                  Message From The Founder
                </Text>
                <Image
                  resizeMode="contain"
                  source={{
                    uri: "https://bhada.com.np/public/assets/img/founder-img.jpg",
                  }} // Replace with actual image URL
                  style={tw`h-60 w-full ml-3 mt-5 mb-5 text-center mx-auto`}
                />
                <Text style={tw`font-medium text-sm mt-2`}>
                  Empowering Connections
                </Text>
                <Text style={tw`font-normal text-sm mt-2`}>
                  Hand2Hand is designed to bridge the gap between buyers and
                  sellers, making it easier for you to find and purchase the
                  products you love. Our goal is to offer a marketplace that not
                  only meets but exceeds your expectations, delivering a
                  hassle-free and rewarding shopping experience. We believe in
                  supporting our community of sellers and providing buyers with
                  access to quality products and exceptional service. Thank you
                  for being a part of our journey!
                </Text>
                <Text style={tw`font-bold text-base mt-2 text-green-600`}>
                  Kiran Jung
                </Text>
                <Text style={tw`font-medium text-sm mt-2 pb-[100px]`}>
                  - Founder & CEO, Hand2Hand
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  featured: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },

  featureddata: {
    marginTop: -45,
    backgroundColor: "#06555c",
    zIndex: 15,
    elevation: Platform.OS === "android" ? 50 : 0,
    width: 250,
    padding: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  singleBorder: {
    borderBottomColor: "lightgray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
  },
});
