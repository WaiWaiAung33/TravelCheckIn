import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class ToleGateCard extends React.Component {
  _OnPress() {
    if (this.props.OnPressCard) {
      this.props.OnPressCard();
    }
  }
  NrcFilter() {
    if (this.props.cityzien == 2) {
      return "သာသနာဝင်စိစစ်ရေးကဒ်ပြားနံပါတ်";
    } else if (this.props.cityzien == 4) {
      return "နိုင်ငံကူးနံပါတ်";
    } else {
      return "မှတ်ပုံတင်နံပါတ်";
    }
  }
  render() {
    console.log(this.props.cityzien);
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this._OnPress()} activeOpacity={0.8}>
          <View>
            <Text style={{ textAlign: "right", fontWeight: "bold" }}>
              {this.props.date}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>
                {this.props.cityzien == 2 ? "ဘွဲ့တော်" : "အမည်"}
              </Text>
              <Text style={styles.secondText}>{this.props.name}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>{this.NrcFilter()}</Text>
              <Text style={styles.secondText}>
                {this.props.nrc ? this.props.nrc : this.props.passportNo}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>ဖုန်းနံပါတ်</Text>
              <Text style={styles.secondText}>{this.props.phoneNo}</Text>
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
    // borderColor: "#308DCC",
    borderRadius: 5,
  },
  firstText: {
    width: "35%",
  },
  secondText: {
    width: "65%",
  },
});
