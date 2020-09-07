import React from "react";
import { View, StyleSheet, BackHandler, AsyncStorage,ScrollView } from "react-native";
//import components
import ToleGateCard from "@components/ToleGateCard";
import Header from "@components/Header";

//import Api
const axios = require("axios");
import { QRListApi } from "@api/Url";

export default class ToleGate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: null,
      access_token: null,
      data:[]
    };
    this.BackHandler = null;
  }
  async componentDidMount() {
    const user_id = await AsyncStorage.getItem("userid");
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({ userid: user_id, access_token: access_token });
    this.setBackHandler();
    this.getQrList();
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
  getQrList() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };
    let bodyParam = {
        userId: this.state.userid,
    };
    // console.log(GetTownshipApi);
    axios
      .post(QRListApi, bodyParam, {
        headers,
      })
      .then(function (response) {
        console.log("Qr List",response.data);
        self.setState({data:response.data.list})
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.userid);
    return (
      <View style={styles.container}>
        <Header
          name="စစ်ဆေးရေးဂိတ်တွင်ပြရန်"
          Onpress={() => this.props.navigation.navigate("Home")}
        />
        <ScrollView>
        <ToleGateCard
          date="3.3.2020"
          name="hla hla"
          nrc="7/KhaThaKha(N)111111"
          phoneNo="09123434544"
          OnPressCard={() => this.props.navigation.navigate("ToleGate")}
        />
        </ScrollView>
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
