import { StyleSheet } from "react-native";
import Colors from "./colors";

const globalStyles = StyleSheet.create({
  rowCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  safeAreaViewStyle: {
    padding: 0,
    margin: 0,
    flex: 1,
    backgroundColor: "white",
  },
  //scrollView type
  scrollViewStyle: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  innerScrollViewStyle: {
    padding: 16,
    backgroundColor: Colors["gray-96"],
  },
  contentContainerStyle: {
    justifyContent: "center",
    flexGrow: 1,
  },

  //forms
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
  formHeading: {
    color: Colors.primary,
  },
  border: {
    borderWidth: 1,
    borderColor: "#d5d5d5",
    padding: 10,
    borderRadius: 8,
  },

  inputbutton: {
    backgroundColor: "green",
    borderRadius: 8,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Raleway_700Bold",
  },
});

export default globalStyles;
