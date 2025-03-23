import React from "react";
import { Image } from "react-native";

export default function Icon(props) {
  const sizes = {
    xs: 8,
    sm: 12,
    md: 16,
    mdl: 20,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 60,
  };
  let { size = "lg", tintColor } = props;
  return (
    <Image
      {...props}
      style={
        tintColor
          ? [
              {
                width: sizes[size],
                height: sizes[size],
                tintColor,
              },
              props.style,
            ]
          : [{ width: sizes[size], height: sizes[size] }, props.style]
      }
    />
  );
}
