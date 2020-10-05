import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  AsyncStorage,
} from "react-native";
import { QRCode } from "react-native-custom-qr-codes";
import * as Permissions from "expo-permissions";
//import components

import Header from "@components/Header";
import Moment from "moment";

//import api
import { QRCodeApi } from "@api/Url";
const axios = require("axios");

//import services
import { t, getLang } from "@services/Localization";

export default class ToleGate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: null,
      access_token: null,
      isOpenSuccessModel: false,
      locale: null,
      loginid: null,
      id: "",
      date: null,
      data: [],
    };
    this.BackHandler = null;
  }
  async componentDidMount() {
    const res = await getLang();
    this.setState({ locale: res });
    const user_id = await AsyncStorage.getItem("userid");
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({ userid: user_id, access_token: access_token });
    this.getQRCode();
    this.setBackHandler();
  }
  setBackHandler() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackButton.bind(this)
    );
  }
  _handleBackButton = () => {
    this.props.navigation.navigate("TravelNote");
    return true;
  };
  UNSAFE_componentWillUnmount() {
    this.BackHandler.remove();
    // this.focusListener.remove();
  }
  getQRCode() {
    const self = this;
    let bodyParam = {
      userId: self.state.userid,
    };
    axios
      .post(QRCodeApi, bodyParam, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data);
        self.setState({
          data: response.data,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          name={t("qrlist", this.state.locale)}
          Onpress={() => this.props.navigation.navigate("Home")}
        />
        {/* <ScrollView> */}
        <TouchableOpacity style={styles.qrcodeBox}>
          {
            this.state.data.status == 0 ? <Text>{t("nodata",this.state.locale)}</Text> :
            <QRCode
            content={this.state.data.userId}
            codeStyle="square"
            size={150}
          />
          }
         
        </TouchableOpacity>
        {
          this.state.data.status == 0 ? null :
          <Text style={styles.text}>
          {Moment(this.state.data.created_at).format("DD-MM-YYYY")}
        </Text>
        }
      
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
  text: {
    paddingTop: 10,
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 18,
  },
});
