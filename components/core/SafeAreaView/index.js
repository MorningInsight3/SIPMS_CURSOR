import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import {
  SafeAreaView as RNSafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import colors from "../../../ui/colors";

export default function SafeAreaView({
  children,
  variant = "primary",
  bottomTab = false,
  ...props
}) {
  const insets = useSafeAreaInsets();

  const mainStyle = useMemo(() => {
    let mainStyle = styles.primaryStyle;

    switch (variant) {
      case "primary":
        mainStyle = styles.primaryStyle;
        break;
      case "dark":
        mainStyle = styles.darkStyle;
        break;
      default:
        mainStyle = styles.primaryStyle;
    }
    return mainStyle;
  }, [variant]);

  return (
    <RNSafeAreaView
      {...props}
      style={[mainStyle, bottomTab && { paddingBottom: insets.bottom }]}
    >
      {children}
    </RNSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  primaryStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  darkStyle: {
    flex: 1,
    backgroundColor: colors.dark,
  },
});
