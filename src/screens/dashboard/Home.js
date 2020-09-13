import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  BackHandler,
  AsyncStorage,
} from "react-native";
import { Updates } from "expo";
import appjson from "@appjson";
//import LanguageModal
import LanguageModal from "@components/LanguageModal";
import { t, getLang } from "@services/Localization";

//import consts
import { LANGUAGE } from "@consts/Const";

import { setItem } from "@services/Storage";

const { height, width } = Dimensions.get("window");
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: null,
      mylang: "MM",
      isOpenErrorModal: false,
      isOpenLangModal: false,
      locale: null,
    };
    this.BackHandler = null;
  }
  async componentDidMount() {
    await this.setBackHandler();
    const res = await getLang();
    this.setState({ locale: res });
  }
  async setBackHandler() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackButton.bind(this)
    );
    const res = await getLang();
    this.setState({ locale: res });
  }

  _handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  UNSAFE_componentWillUnmount() {
    this.removeBackHandler();
    // Remove the event listener before removing the screen from the stack
    this.focusListener.remove();
  }
  async _handleLogout() {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Login");
    return true;
  }

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
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.secondContainer}>
          <View style={{  flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              marginRight: 15,
              marginTop: 10,}}>
            {this.state.locale == "MM" ? (
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginRight: 5,
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => this.setState({ isOpenLangModal: true })}
                >
                  <Image
                    source={require("@images/unnamed.png")}
                    style={{ width: 30, height: 30 }}
                  />

                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      paddingLeft: 4,
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
                    marginRight: 5,
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => this.setState({ isOpenLangModal: true })}
                >
                  <Image
                    source={require("@images/english.png")}
                    style={{ width: 30, height: 30 }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      paddingLeft: 4,
                    }}
                  >
                    English
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              onPress={() => this._handleLogout()}
              style={{ width: 50, alignItems: "flex-end" ,marginTop:10}}
            >
              <Image
                source={require("@images/logout.png")}
                style={styles.touchImg}
              />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center" }}>
            <View style={styles.imgContainer}>
              <Image
                source={require("@images/councillogo.png")}
                style={styles.imgHeader}
              />
            </View>
          </View>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              paddingTop: 20,
              fontSize: 18,
              // fontWeight: "bold",
            }}
          >
            Welcome To Naypyidaw Traveller
          </Text>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              paddingTop:5,
              fontSize: 18,
              // fontWeight: "bold",
            }}
          >
           Check-in
          </Text>
        </View>

        {/* <ImageBackground
          source={require("@images/path.png")}
          style={styles.img}
        >
          <Image source={require("@images/logo.png")} />
        </ImageBackground> */}
        <View style={{ marginTop: 15 }}>
          <TouchableOpacity
            style={styles.touchBtn}
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate("Create")}
          >
            <Text style={styles.text}>
              {t("createform", this.state.locale)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.touchBtn, { backgroundColor: "#E99944" }]}
            onPress={() => this.props.navigation.navigate("ToleGateList")}
          >
            <Text style={styles.text}>
              {t("tolegatelist", this.state.locale)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.touchBtn, { backgroundColor: "#C716F1" }]}
            onPress={() => this.props.navigation.navigate("TravelNote")}
          >
            <Text style={styles.text}>
              {t("travelnote", this.state.locale)}
            </Text>
          </TouchableOpacity>
        
        </View>
        <View style={{alignItems:"center",flex:1,justifyContent:"flex-end",marginBottom:10}}>
          <Text>Version {appjson.expo.version}</Text>
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
    backgroundColor: "#E4E4E4",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  img: {
    height: height / 5,
    width: width,
    justifyContent: "center",
    // alignItems: "center"
  },
  touchImg: {
    width: 20,
    height: 20,
  },
  touchBtn: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 25,
    backgroundColor: "#308DCC",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  secondContainer: {
    height: 300,
    backgroundColor: "#308DCC",
    // alignItems: "center",
  },
  imgHeader: {
    width: 110,
    height: 110,
  },
  imgContainer: {
    backgroundColor: "white",
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 65,
    marginTop: "10%",
  },
});
