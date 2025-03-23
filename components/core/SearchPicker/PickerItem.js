import React from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { CheckIcon } from "react-native-heroicons/outline";
import { Colors } from "../../../ui";
import Title from "../Title";

export default function PickerItem(props) {
  let {
    option,
    itemSelected,
    selectedValue,
    labelIdentifier,
    valueIdentifier,
  } = props;

  let value = valueIdentifier ? option[valueIdentifier] : option.id;

  const isSelected = selectedValue === value;

  return (
    <TouchableHighlight
      style={[
        styles.innerContainer,
        isSelected && styles.selectedContainerStyle,
      ]}
      underlayColor={Colors["gray-96"]}
      onPress={() => itemSelected(option)}
    >
      <>
        <Title
          text={labelIdentifier ? option[labelIdentifier] : option.name}
          h3
          h3Style={isSelected ? styles.selectedTitleStyle : styles.titleStyle}
          typeface="interMedium"
        />
        {isSelected && <CheckIcon size={16} />}
      </>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
  },
  checkMarkStyle: {
    width: 16,
    height: 16,
  },
  titleStyle: {
    color: Colors["gray-16"],
  },
  selectedTitleStyle: {
    color: Colors.primary,
  },
  selectedContainerStyle: {
    backgroundColor: Colors["gray-96"],
  },
  innerContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  indicatorStyle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    marginRight: 16,
  },
});
