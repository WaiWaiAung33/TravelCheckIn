import React from "react";
import { StyleSheet } from "react-native";

import RootNavigator from "@navigators/RootNavigator";
import { MenuProvider } from "react-native-popup-menu";

export default class App extends React.Component {
  render() {
    return (
      <MenuProvider>
        <RootNavigator />
      </MenuProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
