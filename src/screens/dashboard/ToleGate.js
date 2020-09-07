import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity,BackHandler} from "react-native";
import { QRCode } from "react-native-custom-qr-codes";
import * as Permissions from "expo-permissions";
//import components
import ToleGateCard from "@components/ToleGateCard";
import Header from "@components/Header";

export default class ToleGate extends React.Component {
  constructor(props){
    super(props);
    this.BackHandler=null;
  }
  async componentDidMount() {
    this.setBackHandler();
  }
  setBackHandler() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackButton.bind(this)
    );
  }
  _handleBackButton = () => {
    this.props.navigation.navigate("Home");
    return true;
  };
  UNSAFE_componentWillUnmount() {
    this.focusListener.remove();
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
        name="QR Code ဖတ်ရန်"
        Onpress={()=>this.props.navigation.navigate("ToleGateList")}
        />
        <TouchableOpacity style={styles.qrcodeBox}>
          <QRCode codeStyle="square" size={100} />
        </TouchableOpacity>
        <View
          style={{
            height: 2,
            borderWidth: 1,
            // flex: 1,
            marginTop: 10,
            borderColor: "#308DCC",
          }}
        />
        <View
          style={{
            alignItems: "flex-end",
            marginRight: 10,
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: 160,
              height: 40,
              backgroundColor: "#EB4D4D",
              borderWidth: 1,
              borderColor: "#EB4D4D",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white" }}>လျှောက်လွှာပယ်ဖျက်မည်</Text>
          </TouchableOpacity>
        </View>
        <ToleGateCard
          OnPressCard={() =>this.props.navigation.navigate("Detail")}
        />
        <ToleGateCard />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  qrcodeBox: {
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    // marginRight: 15,
  },
});
