import React from "react";
import { StyleSheet } from "react-native";
import { Button as RNEButton } from "@rneui/base";
import { Colors } from "../../../ui";
import colors from "../../../ui/colors";

function Button(props) {
  let { buttonStyle, titleStyle, containerStyle, type } = props;
  let buttonStyles = styles.buttonStyle;
  switch (type) {
    case "bordered":
      buttonStyles = [buttonStyles, styles.borderedStyle, buttonStyle];
      break;
    default:
      buttonStyles = [buttonStyles, buttonStyle];
  }

  return (
    <RNEButton
      {...props}
      containerStyle={[styles.containerStyle, containerStyle]}
      buttonStyle={buttonStyles}
      titleStyle={[styles.titleStyle, titleStyle]}
      disabledStyle={{ backgroundColor: buttonStyle?.backgroundColor + "64" }}
      disabledTitleStyle={styles.disabledTitle}
      activeOpacity={0.9}
    />
  );
}

const styles = StyleSheet.create({
  containerStyle: {},

  buttonStyle: {
    paddingHorizontal: 32,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  borderedStyle: {
    borderColor: Colors["gray-10"],
    borderWidth: 1,
  },
  titleStyle: {
    fontSize: 16,
    lineHeight: 17,
    color: Colors.white,
  },
  disabledButton: {
    backgroundColor: Colors.primary + "64",
  },
  disabledTitle: {
    color: Colors.white,
  },
});

export default Button;
