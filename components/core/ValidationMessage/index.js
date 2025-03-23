import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../ui";

const ValidationMessage = (props) => {
  let { message, type } = props;
  switch (type) {
    case "error":
      return (
        <View style={styles.validationContainer}>
          <Text style={styles.errorStyle}>{message}</Text>
        </View>
      );
    case "normal":
      return (
        <View style={styles.validationContainer}>
          <Text style={styles.normalStyle}>{message}</Text>
        </View>
      );
    default:
      return (
        <View style={[styles.validationContainer, styles.validationContainer]}>
          <Text style={styles.infoStyle}>{message}</Text>
        </View>
      );
  }
};

export default ValidationMessage;

const styles = StyleSheet.create({
  validationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  errorStyle: {
    color: Colors["red-48"],
    fontSize: 12,
    marginLeft: 8,
  },
  infoStyle: {
    color: Colors.primary,
    fontSize: 12,
    marginLeft: 8,
  },
  normalStyle: {
    color: Colors["gray-48"],
    fontSize: 12,
    marginLeft: 8,
  },
});
