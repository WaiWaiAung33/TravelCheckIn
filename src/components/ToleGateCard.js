import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class ToleGateCard extends React.Component {
  _OnPress() {
    if (this.props.OnPressCard) {
      this.props.OnPressCard();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this._OnPress()} activeOpacity={0.8}>
          <View>
            <Text style={{ textAlign: "right", fontWeight: "bold" }}>
              1.1.2020
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>အမည်</Text>
              <Text style={styles.secondText}>လှလှ</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>မှတ်ပုံတင်နံပါတ်</Text>
              <Text style={styles.secondText}>၇/ကတခ(နိုင်)၁၂၃၄၅၆</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>ဖုန်းနံပါတ်</Text>
              <Text style={styles.secondText}>09123456789</Text>
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
    borderColor: "#308DCC",
    borderRadius: 5,
  },
  firstText: {
    width: "35%",
  },
  secondText: {
    width: "65%",
  },
});
