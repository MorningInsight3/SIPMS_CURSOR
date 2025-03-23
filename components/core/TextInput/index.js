import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "@rneui/base";

import ValidationMessage from "../ValidationMessage";
import Icon from "../Icon";
import Title from "../Title";
import { Colors, Spacing } from "../../ui";
import tw from "twrnc";

export function TextInput(props) {
  let {
    inputContainerStyle,
    errorStyle,
    inputStyle,
    containerStyle,
    errors,
    name,
    touched,
    rounded,
    height,
    label,
    onFocus,
    searchinput,
    disabled = false,
    required = true,
    mainContainerStyle,
    keyboardType,
    ...restProps
  } = props;
  const hasError = name && errors && touched && errors[name] && touched[name];
  let [focus, setFocus] = useState(false);

  const handleBlur = (e) => {
    setFocus(false);
    if (props.onBlur) {
      const onBlurFunction = props.onBlur;
      onBlurFunction(e);
    }
  };

  return (
    <View style={tw`w-full`}>
      {label && (
        <Title
          text={!required ? label + " (opt)" : label}
          style={{
            ...tw`text-[12px] pb-[8px]`,
            fontFamily: "Inter_600SemiBold",
          }}
        />
      )}
   <Input
  {...restProps}
  renderErrorMessage={false}
  placeholderTextColor={Colors["gray-56"]}
  leftIcon={
    typeof props.leftIcon === "number" ? (
      <View style={[Spacing.pl3]}>
        <Icon
          tintColor={hasError ? Colors["red-48"] : Colors["gray-56"]}
          source={props.leftIcon}
        />
      </View>
    ) : (
      props.leftIcon
    )
  }
  containerStyle={[styles.containerStyle, containerStyle]}
  inputContainerStyle={[
    styles.inputContainerStyle,
    { borderBottomWidth: 0 }, // Removes the bottom border
    rounded && styles.roundedInputContainerStyle,
  ]}
  inputStyle={[
    styles.inputStyle,
    inputStyle,
    disabled && styles.disabledTextStyle,
    height && styles.normalheight,
  ]}
  onBlur={(e) => handleBlur(e)}
  onFocus={() => {
    setFocus(true);
    onFocus && onFocus();
  }}
  labelStyle={label && styles.labelStyle}
  errorStyle={[styles.errorStyle, errorStyle]}
  disabled={disabled}
  keyboardType={keyboardType}
/>


      {touched && touched[name] && errors && name && errors[name] && (
        <ValidationMessage type="error" message={errors[name]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    width: "100%",
borderRadius: 999,
    borderColor: "#999",
    borderWidth:1
  },

  roundedInputContainerStyle: {
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingHorizontal: 24,
    borderColor: "#999"

  },
  inputContainerStyle: {
    borderRadius: 8,
    backgroundColor: Colors.white,
    marginHorizontal: 0,
    backgroundColor: Colors.white,
    width: "100%",
    borderColor: "#999"

  },

  searchInputStyle: {
    borderRadius: 8,
    backgroundColor: "Colors.white",
    borderWidth: 1,
    marginHorizontal: 0,
    backgroundColor: Colors.white,
    width: "100%",
    borderColor: "#999"

  },

  inputStyle: {
    fontSize: 14,
    paddingHorizontal: 12,
    borderColor: "#999"

  },
  validationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  errorStyle: {
    color: Colors["red-48"],
    fontSize: 10,
    marginLeft: 8,
  },

  validationErrorStyle: {
    borderColor: Colors["red-48"],
    borderWidth: 1,
  },
  focusStyle: {
    borderColor: "",
    borderWidth: 1,
    borderColor: "#999"

  },
  searchfocusStyle: {
    borderColor: "#000",
  },
  labelStyle: {
    marginBottom: 4,
    fontSize: 14,
    color: Colors["gray-32"],

  },
  disabledStyle: {
    backgroundColor: Colors["gray-88"],
  },
  disabledTextStyle: {
    color: Colors["black"],
  },
});
