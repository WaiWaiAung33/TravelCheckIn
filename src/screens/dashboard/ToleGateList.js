import React from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  AsyncStorage,
  ScrollView,
} from "react-native";
//import components
import ToleGateCard from "@components/ToleGateCard";
import Header from "@components/Header";
import Moment from "moment";

//import Api
const axios = require("axios");
import { QRListApi } from "@api/Url";

export default class ToleGate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: null,
      access_token: null,
      data: [],
      nrccode: "",
      nrcstate: "",
      nrcstaus: "",
      nrcnumber: "",
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
        const list = response.data.list[0];
        console.log("Qr List", response.data.list[0].nrc_type);
        self.setState({
          data: response.data.list,
          nrccode: list.nrc_code,
          nrcstate: list.nrc_state,
          nrcstaus: list.nrc_type,
          nrcnumber: list.nrc_no,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    // const nrcnumber =this.state.nrccode+"/"+this.state.nrcstate+"("+this.state.nrcstaus+")"+this.state.nrcnumber;
    // console.log(this.state.data);
    return (
      <View style={styles.container}>
        <Header
          name="စစ်ဆေးရေးဂိတ်တွင်ပြရန်"
          Onpress={() => this.props.navigation.navigate("Home")}
        />
        <ScrollView>
          {this.state.data.map((item, index) => {
            return (
              <View key={index}>
                <ToleGateCard
                  date={Moment(item.created_at).format("DD-MM-YYYY")}
                  name={item.name}
                  nrc={item.nrc_code+"/"+item.nrc_state+"("+item.nrc_type+")"+item.nrc_no}
                  phoneNo={item.ph_no}
                  OnPressCard={() => this.props.navigation.navigate("ToleGate",{datas:item})}
                />
              </View>
            );
          })}

          {/* {this.state.data.map((item, index) => {
            //   console.log(item.name);
            return (
              <View key={index}>
                <ToleGateCard
                  date={Moment(item.created_at).format("DD-MM-YYYY")}
                  name={item.name}
                  nrc={
                    item.nrc_code +
                    "/" +
                    item.nrc_state +
                    "(" +
                    item.nrc_type +
                    ")" +
                    item.nrc_no
                  }
                  phoneNo={item.ph_no}
                  OnPressCard={() => this.props.navigation.navigate("ToleGate")}
                />
                ;
              </View>
            );
          })} */}
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
