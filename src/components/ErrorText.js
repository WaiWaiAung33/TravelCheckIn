import React from "react";
import { Text, StyleSheet } from "react-native";

export default class ErrorText extends React.Component {
  render() {
    return this.props.isShow ? (
      <Text style={styles.errText}>{this.props.errMessage}</Text>
    ) : null;
  }
}

const styles = StyleSheet.create({
  errText: {
    color: "red",
    // fontFamily: Fonts.primary,
    fontSize: 14
  }
});
