import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  BackHandler,
  AsyncStorage,
} from "react-native";

//import components
import Header from "@components/Header";

const axios = require("axios");
import { RegisterHistoryDetailApi } from "@api/Url";
import { TouchableHighlight, BaseUrl } from "react-native-gesture-handler";

export default class ToleGateCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      name: "",
      nrc: "",
      phone: "",
      vehical: "",
      start_place: "",
      end_place: "",
      passport: "",
      citizenstatus: null,
      imagePath: "",
      nrcfrontName: "",
      nrcbackName: "",
      moName: "",
      approvephotoName: "",
      ministatystatus: null,
    };
    this.BackHandler = null;
  }
  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({ access_token: access_token });
    this.setBackHandler();
    this.getAllTravelNote();
  }

  getAllTravelNote() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };
    let bodyParam = {
      userId: self.props.navigation.getParam("userid"),
    };
    // console.log(GetTownshipApi);
    axios
      .post(RegisterHistoryDetailApi, bodyParam, {
        headers,
      })
      .then(function (response) {
        console.log("Register Detail", response.data);
        let data = response.data;
        self.setState({
          name: data.historyDetail.name,
          phone: data.historyDetail.ph_no,
          vehical: data.historyDetail.vehical_no,
          nrc:
            data.historyDetail.nrc_code +
            "/" +
            data.historyDetail.nrc_state +
            "(" +
            data.historyDetail.nrc_type +
            ")" +
            data.historyDetail.nrc_no,
          passport: data.historyDetail.passport,
          citizenstatus: data.historyDetail.citizen_status,
          start_place:
            data.historyDetail.start_place_city +" "+
            data.historyDetail.start_place_township +" "+
            data.historyDetail.start_place,
          end_place: data.historyDetail.township + " "+data.historyDetail.end_place,
          imagePath: data.historyDetail.path,
          nrcfrontName: data.historyDetail.nrc_front,
          nrcbackName: data.historyDetail.nrc_back,
          moName: data.historyDetail.mo_photo,
          approvephotoName: data.historyDetail.approve_photo,
          ministatystatus: data.historyDetail.ministry_status,
        });
        // self.setState({ isOpenSuccessModel: true });
      })
      .catch(function (err) {
        // console.log("TravelNoteDetail Error");
      });
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
    this.focusListener.remove();
  }
  _showName() {
    if (this.state.citizenstatus == 2) {
      return "သာသနာစိစစ်ရေးကဒ်ပြား";
    } else if (this.state.citizenstatus == 4) {
      return "နိုင်ငံကူးနံပါတ်";
    } else {
      return "မှတ်ပုံတင်နံပါတ်";
    }
  }
  render() {
    // console.log(this.props.navigation.getParam("userid"));
    return (
      <View>
        <Header
          name="အသေးစိတ်အချက်အလက်များ"
          Onpress={() => this.props.navigation.navigate("TravelNote")}
        />
        <ScrollView>
          <View style={styles.container}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>
                {this.state.citizenstatus == 2 ? "ရဟန်းရှင်" : "အမည်"}
              </Text>
              <Text style={styles.secondText}>{this.state.name}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>{this._showName()}</Text>
              <Text style={styles.secondText}>
                {this.state.nrc ? this.state.nrc : this.state.passport}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>ဖုန်းနံပါတ်</Text>
              <Text style={styles.secondText}>{this.state.phone}</Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.firstText}>ယာဉ်နံပါတ်</Text>
              <Text style={styles.secondText}>{this.state.vehical}</Text>
            </View>
          </View>
          <View
            style={{
              height: 2,
              borderWidth: 1,
              // flex: 1,
              marginTop: 10,
              borderColor: "#308DCC",
            }}
          />
          <View style={styles.container}>
            <Text>စတင်ထွက်ခွာသည့်မြို့</Text>
            <TextInput
              style={styles.textInput}
              value={this.state.start_place}
              // placeholder="ပဲခူးတိုင်း၊ကျောက်တံခါးမြို့နယ်၊ပဲနွယ်ကုန်းမြို့"
              // placeholderTextColor="black"
            />
            <Text style={{ marginTop: 5 }}>သွားရောက်လိုသည့်နေရာ</Text>
            <TextInput
              style={styles.textInput}
              value={this.state.end_place}
              // placeholder="ပျဉ်းမနား၊ပေါင်းလောင်း(၄)လမ်း။"
              // placeholderTextColor="black"
            />
          </View>
          <View
            style={{
              height: 2,
              borderWidth: 1,
              // flex: 1,
              marginTop: 15,
              borderColor: "#308DCC",
            }}
          />
          <View
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အရှေ့ဘက်</Text>
              <View
                style={{
                  height: 100,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#E3EEF5",
                  backgroundColor: "#E3EEF5",
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 3,
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 0.5,
                  marginTop: 5,
                }}
              >
                <Image
                  source={{
                    uri:
                      BaseUrl +
                      this.state.imagePath +
                      "/" +
                      this.state.nrcfrontName,
                  }}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            </View>
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အနောက်ဘက်</Text>
              <View
                style={{
                  height: 100,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#E3EEF5",
                  backgroundColor: "#E3EEF5",
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 3,
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 0.5,
                  marginTop: 5,
                }}
              >
                <Image
                  source={{
                    uri:
                      BaseUrl +
                      this.state.imagePath +
                      "/" +
                      this.state.nrcbackName,
                  }}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            </View>
          </View>
          {this.state.ministatystatus == 1 ? (
            <View style={{ width: "45%", marginLeft: 10 }}>
              <Text>Moထောက်ခံစာ</Text>
              <View
                style={{
                  height: 100,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#E3EEF5",
                  backgroundColor: "#E3EEF5",
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 3,
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 0.5,
                  marginTop: 5,
                }}
              >
                <Image
                  source={{
                    uri:
                      BaseUrl + this.state.imagePath + "/" + this.state.moName,
                  }}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            </View>
          ) : null}

          <View style={{ width: "45%", marginLeft: 10 }}>
            <Text>ထောက်ခံစာ</Text>
            <View
              style={{
                height: 100,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#E3EEF5",
                backgroundColor: "#E3EEF5",
                justifyContent: "center",
                alignItems: "center",
                elevation: 3,
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.5,
                marginTop: 5,
              }}
            >
              <Image
                source={{
                  uri:
                    BaseUrl +
                    this.state.imagePath +
                    "/" +
                    this.state.approvephotoName,
                }}
                style={{ width: 100, height: 100 }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  firstText: {
    width: "35%",
  },
  secondText: {
    width: "65%",
    paddingTop: 5,
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
