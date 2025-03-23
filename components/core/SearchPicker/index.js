import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchBar } from "@rneui/base";
import {
  ChevronLeftIcon,
  PlusIcon,
  XCircleIcon,
  ChevronDownIcon,
} from "react-native-heroicons/outline";
import { Colors, GlobalStyles, Spacing } from "../../../ui";
import colors from "../../../ui/colors";

import Title from "../Title";
import ValidationMessage from "../ValidationMessage";
import PickerItem from "./PickerItem";

export default function SearchPicker(props) {
  const {
    onValueChange,
    options,
    label,
    name,
    selectedValue,
    errors,
    touched,
    containerStyle,
    placeholder,
    labelIdentifier,
    valueIdentifier,
    setFieldTouched,
    enableAdd = false,
    action,
    disabled = false,
    required = true,
    inputContainerStyle,
  } = props;
  const [optionSelection, setOptionSelection] = useState(false);

  const [optionLabel, setOptionLabel] = useState(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const handleBack = () => {
    setOptionSelection(false);
    setFieldTouched(name, true);
  };

  useEffect(() => {
    if (selectedValue && options) {
      let temp;
      let selected;
      if (options && options?.length > 0) {
        temp = options.find((item) =>
          valueIdentifier
            ? item[valueIdentifier] === selectedValue
            : item.id === selectedValue,
        );
        selected = labelIdentifier && temp ? temp[labelIdentifier] : temp?.name;
      } else if (options && Array.isArray(options) && options?.length > 0) {
        temp = options.find((item) =>
          valueIdentifier
            ? item[valueIdentifier] === selectedValue
            : item.id === selectedValue,
        );
        selected = labelIdentifier && temp ? temp[labelIdentifier] : temp?.name;
      } else {
        selected = selectedValue;
      }

      setOptionLabel(selected);
    } else {
      setOptionLabel(selectedValue);
    }
  }, [selectedValue, options]);

  const handleItemSelected = (option) => {
    let label = option?.name;
    let value = option?.id;
    onValueChange(name, value);
    setOptionLabel(label);
    setOptionSelection(false);
  };

  const handleAdd = () => {
    onValueChange(name, searchValue);
    setOptionLabel(searchValue);
    setOptionSelection(false);
  };

  const filterData = (list, { text }) => {
    if (list?.length > 0) {
      return list.filter((listItem) => {
        let label = labelIdentifier
          ? listItem[labelIdentifier]
          : listItem?.name;
        return label?.toLowerCase().includes(text.toLowerCase());
      });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <PickerItem
        option={item}
        itemSelected={handleItemSelected}
        selectedValue={selectedValue}
        labelIdentifier={labelIdentifier}
        valueIdentifier={valueIdentifier}
      />
    );
  };

  const handleSearch = async (text) => {
    setSearchValue(text);
    if (action) {
      if (text?.length > 3) {
        await action.method(...action.params, text);
      }
    }
  };

  return (
    <>
      <View style={[styles.containerStyle, containerStyle]}>
        {label && (
          <Title
            text={!required ? label + " (opt)" : label}
            h4
            h4Style={styles.labelStyle}
          />
        )}

        <TouchableOpacity
          onPress={() => !disabled && setOptionSelection(true)}
          style={[
            styles.inputContainer,
            disabled && styles.disabledStyle,
            touched[name] && errors[name] && styles.inputErrorStyles,
            inputContainerStyle,
          ]}
          disabled={disabled}
        >
          <Title
            numberOfLines={1}
            ellipsizeMode="tail"
            h3
            text={optionLabel ? optionLabel : placeholder}
            h3Style={optionLabel ? styles.valueStyle : styles.placeholderStyle}
          />
          <ChevronDownIcon size={12} color={Colors.black} />
          {/* <Image source={ChevronDownIcon} style={{ width: 12, height: 12 }} /> */}
        </TouchableOpacity>
        {touched[name] && errors[name] && (
          <ValidationMessage type="error" message={errors[name]} />
        )}
      </View>

      <Modal
        animationType="slide"
        visible={optionSelection}
        onRequestClose={() => setOptionSelection(false)}
      >
        <SafeAreaView style={styles.searchPickerContainer}>
          <View style={styles.searchHeaderContainer}>
            <TouchableOpacity
              onPress={handleBack}
              style={{ alignItems: "center", marginRight: 12 }}
            >
              <ChevronLeftIcon size={24} color={colors.black} />
            </TouchableOpacity>
            <SearchBar
              placeholder={placeholder ? placeholder : "Search"}
              onChangeText={(text) => handleSearch(text)}
              placeholderTextColor={Colors["gray-56"]}
              value={searchValue}
              containerStyle={styles.searchContainer}
              inputContainerStyle={styles.searchInputContainerStyle}
              searchIcon={null}
              inputStyle={styles.searchInputStyle}
              clearIcon={
                <TouchableOpacity onPress={() => setSearchValue("")}>
                  {/* <Icon source={CloseIcon} style={[styles.closeIconStyle]} /> */}
                  <XCircleIcon size={24} color={colors.black} />
                </TouchableOpacity>
              }
              autoFocus
              cancelIcon={
                <TouchableOpacity onPress={() => setSearchValue("")}>
                  {/* <Icon source={CloseIcon} style={[styles.closeIconStyle]} /> */}
                  <XCircleIcon size={24} color={colors.black} />
                </TouchableOpacity>
              }
            />
          </View>
          {options && (options > 0 || options?.length > 0) ? (
            <FlatList
              data={
                !action ? filterData(options, { text: searchValue }) : options
              }
              keyExtractor={(item) =>
                valueIdentifier ? item[valueIdentifier] : item.id
              }
              renderItem={renderItem}
            />
          ) : enableAdd && (options || options) ? (
            <TouchableHighlight
              underlayColor={Colors["gray-96"]}
              onPress={() => {
                handleAdd();
              }}
              style={styles.addButtonStyle}
            >
              <>
                <PlusIcon color={Colors.primary} size={24} />
                <Title
                  h3
                  h3Style={[{ color: Colors.primary }, Spacing.ml2]}
                  text={`Add ${searchValue}`}
                  typeface="interMedium"
                />
              </>
            </TouchableHighlight>
          ) : (
            <View style={[Spacing.px3, Spacing.py2]}>
              <Title
                h3
                text={
                  searchValue?.length > 3
                    ? "No data found"
                    : "Please enter text to search."
                }
                h3Style={GlobalStyles.textCenter}
              />
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "transparent",
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: Colors["gray-10"],
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  labelStyle: {
    marginBottom: 4,
    fontSize: 14,
    color: Colors["gray-32"],
  },
  placeholderStyle: {
    color: Colors["gray-56"],
  },
  valueStyle: {
    color: Colors["gray-16"],
  },
  loaderStyle: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 16,
  },

  scrollViewContainer: {},

  //search component
  searchHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: Colors["gray-92"],
  },
  searchPickerContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    padding: 0,
    flexGrow: 1,
  },
  searchInputContainerStyle: {
    backgroundColor: "transparent",
  },
  searchInputStyle: {
    backgroundColor: "transparent",
    fontSize: 16,
  },
  closeIconStyle: {
    width: 20,
    height: 20,
  },
  iconStyle: {
    width: 20,
    height: 16,
  },

  addButtonStyle: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledStyle: {
    backgroundColor: Colors["gray-88"],
  },
  inputErrorStyles: {
    borderColor: Colors["red-48"],
  },
});
