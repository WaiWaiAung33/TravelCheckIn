import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { Updates } from "expo";

//import Api
import NetInfo from "@react-native-community/netinfo";
const axios = require("axios");
import { LoginApi } from "@api/Url";

//import LanguageModal
import LanguageModal from "@components/LanguageModal";
import { t, getLang } from "@services/Localization";

//import consts
import { LANGUAGE } from "@consts/Const";

import { setItem } from "@services/Storage";

const { height, width } = Dimensions.get("window");
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnline: false,
      userId: null,
      editable: true,
      mylang: "MM",
      isOpenErrorModal: false,
      isOpenLangModal: false,
      locale: null,
    };
  }

  async componentWillMount() {
    const reslocale = await getLang();
    if (reslocale == "MM") {
      this.setState({
        mylang: reslocale,
      });
    }
  }

  async componentDidMount() {
    NetInfo.addEventListener((state) => {
      this.setState({ isOnline: state.isConnected });
    });
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this.setState({ editable: true, userId: null });
    });
    const userid = await AsyncStorage.getItem("loginID");
    const routeName = userid != null ? "Home" : "Login";
    this.props.navigation.navigate(routeName);
    const res = await getLang();
    this.setState({ locale: res });
  }
  _handleLogin = async () => {
    var self = this;
    self.setState({
      editable: false,
    });
    if (this.state.isOnline) {
      if (this.state.userId == null) {
        alert("Phone Number is required!");
        self.setState({ editable: true });
      } else {
        let appuser = {
          mobile: this.state.userId,
        };

        axios
          .post(LoginApi, appuser)
          .then(function (response) {
            console.log(response.data);
            if (response.data.error == 0) {
              // console.log(response.data);
              // alert(response.data.message);

              self.props.navigation.navigate("OTPCode", {
                userId: self.state.userId,
                editable: true,
              });
            } else {
              alert(response.data.message);
              self.setState({ editable: true });
            }
          })
          .catch(function (error) {
            // console.log("Error:", error);
            alert("Something went wrong!");
            self.setState({ editable: true });
          });
      }
    } else {
      self.setState({ editable: true });
      alert("Please check your internet connection!");
    }
  };

  async handleGetLocale(locale) {
    await setItem(LANGUAGE, locale);
    this.setState({
      isOpenLangModal: false,
      mylang: locale,
    });

    Updates.reload();
  }

  _handleSetLocaleAsyncStorage = async () => {
    this.setState({ confirmLocaleModalOpen: false });
  };

  render() {
    // alert(this.state.locale);
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.secondContainer}>
          {this.state.locale == "MM" ? (
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginRight: 15,
                  marginTop:20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => this.setState({ isOpenLangModal: true })}
              >
              
                  <Image
                  source={require("@images/unnamed.png")}
                  style={{ width: 25, height: 25 }}
                /> 
            
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    paddingLeft:4,
                  }}
                >
                  {this.state.mylang == "MM" ? "မြန်မာ" : "Eng"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginRight: 15,
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => this.setState({ isOpenLangModal: true })}
              >
                <Image
                  source={require("@images/english.png")}
                  style={{ width: 25, height: 25 }}
                />
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    paddingLeft:4,
                  }}
                >
                  English
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{ alignItems: "center", flex: 1 }}>
            <View style={styles.imgContainer}>
              <Image
                source={require("@images/councillogo.png")}
                style={styles.img}
              />
            </View>
          </View>
        </View>

        <View style={styles.thirdContainer}>
          <Text style={styles.headerText}>
            {/* {" "} */}
            {t("title", this.state.locale)}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View style={styles.textinputImg}>
              <Image source={require("@images/phone.png")} />
            </View>

            <TextInput
              style={styles.textInput}
              value={this.state.userId}
              placeholder="09 XXX XXX XXX"
              keyboardType="number-pad"
              onChangeText={(value) => this.setState({ userId: value })}
            />
          </View>
          <TouchableOpacity
            style={styles.touchBtn}
            onPress={() => (this.state.editable ? this._handleLogin() : null)}
          >
            <Text style={styles.text}>{t("login", this.state.locale)}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: "absolute",
            width: "100%",
            marginTop: height / 1.1,
          }}
        >
          <Text style={{ textAlign: "center", color: "#308DCC" }}>
            How to use (Video) and (PDF)
          </Text>
          <Text
            style={{
              textAlign: "center",
              paddingTop: 5,
              color: "#308DCC",
              fontWeight: "bold",
            }}
          >
            Develop by LINN @2020
          </Text>
        </View>
        <LanguageModal
          isOpen={this.state.isOpenLangModal}
          getCheckLang={(locale) => this.handleGetLocale(locale)}
          onClose={() => this.setState({ isOpenLangModal: false })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondContainer: {
    height: 300,
    backgroundColor: "#308DCC",
    // alignItems: "center",
    // flexDirection:"row",
    // justifyContent:"space-between"
  },
  img: {
    width: 115,
    height: 115,
    // padding:2
  },
  imgContainer: {
    backgroundColor: "white",
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 95,
    // marginTop: "10%",
  },
  thirdContainer: {
    backgroundColor: "#E3EEF5",
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    position: "absolute",
    marginTop: "70%",
    borderColor: "#E3EEF5",
    width: "95%",
    elevation: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    paddingBottom: 40,
  },
  headerText: {
    textAlign: "center",
  },
  textInput: {
    // margin: 10,
    borderWidth: 1,
    padding: 8,
    // borderRadius: 5,
    backgroundColor: "white",
    borderColor: "white",
    width: "85%",
    height: 40,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    // shadowColor
  },
  textinputImg: {
    backgroundColor: "white",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 1,
    borderRightColor: "#308DCC",
    elevation: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  touchBtn: {
    //  margin:10,
    width: "100%",
    height: 40,
    backgroundColor: "#308DCC",
    marginTop: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
