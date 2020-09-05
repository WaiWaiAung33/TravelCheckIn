import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class ToleGateCard extends React.Component {
  _OnPress() {
    if (this.props.OnPress) {
      this.props.OnPress();
    }
  }
  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: this.props.backColor
              ? this.props.backColor
              : "#ffffff",
            borderColor: this.props.borderColor
              ? this.props.borderColor
              : "#ffffff",
          },
        ]}
      >
        <TouchableOpacity onPress={() => this._OnPress()} activeOpacity={0.8}>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={[
                  styles.firstText,
                  { color: this.props.textColor ? this.props.textColor : null },
                ]}
              >
                {this.props.name}
              </Text>
              <Text
                style={[
                  styles.secondText,
                  { color: this.props.textColor ? this.props.textColor : null },
                ]}
              >
                {this.props.date}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={[
                  styles.firstText,
                  { color: this.props.textColor ? this.props.textColor : null },
                ]}
              >
                {this.props.phone}
              </Text>
              <Text
                style={[
                  styles.secondText,
                  {
                    color: this.props.colors ? this.props.colors : textColor,
                    fontSize: 12,
                  },
                ]}
              >
                {this.props.status}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: this.props.textColor ? this.props.textColor : null,
                }}
              >
                1/KhaThaKha(N)123456
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  firstText: {
    width: "35%",
  },
  secondText: {
    width: "65%",
    textAlign: "right",
  },
});
