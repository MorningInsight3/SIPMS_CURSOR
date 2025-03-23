import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@rneui/base";

function Title(props) {
  let { h1Style, h2Style, h3Style, h4Style, typeface } = props;

  return (
    <Text
      {...props}
      h1Style={
        typeface ? [styles.h1Style, , h1Style] : [styles.h1Style, h1Style]
      }
      h2Style={
        typeface ? [styles.h2Style, , h2Style] : [styles.h2Style, h2Style]
      }
      h3Style={
        typeface ? [styles.h3Style, , h3Style] : [styles.h3Style, h3Style]
      }
      h4Style={
        typeface ? [styles.h4Style, , h4Style] : [styles.h4Style, h4Style]
      }
    >
      {props.text}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1Style: {
    fontSize: 24,
  },
  h2Style: {
    fontSize: 16,
    lineHeight: 16,
  },
  h3Style: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "normal",
  },
  h4Style: {
    fontSize: 12,
  },
});
export default Title;
