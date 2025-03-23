import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

let { width, height } = Dimensions.get("screen");

function BottomSheet(props) {
  const { children, closeBottomSheet, isVisible } = props;

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      transparent
      onRequestClose={closeBottomSheet}
    >
      <View style={{ flex: 1, position: "relative" }}>
        <TouchableWithoutFeedback onPress={closeBottomSheet}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainerStyle}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(49,49,49,0.32)",
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width,
    height,
  },
  modalContainerStyle: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 32,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default BottomSheet;
