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
  AsyncStorage
} from "react-native";
const { height, width } = Dimensions.get("window");
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.BackHandler = null;
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
    BackHandler.exitApp();
    return true;
  };
  UNSAFE_componentWillUnmount() {
    this.focusListener.remove();
  }
async _handleLogout(){
    await AsyncStorage.clear();
    this.props.navigation.navigate("Login");
    return true;
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.secondContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              marginRight: 15,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginRight: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("@images/unnamed.png")}
                style={styles.touchImg}
              />
              <Text style={{ color: "white", fontWeight: "bold" }}>My</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._handleLogout()}
              style={{width:50,alignItems:"flex-end"}}
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
              fontWeight: "bold",
            }}
          >
            WELCOME
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
            <Text style={styles.text}>အချက်အလက်များဖြည့်ရန်</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.touchBtn, { backgroundColor: "#E99944" }]}
            onPress={() => this.props.navigation.navigate("ToleGateList")}
          >
            <Text style={styles.text}>စစ်ဆေးရေးဂိတ်တွင်ပြရန်</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.touchBtn, { backgroundColor: "#C716F1" }]}
            onPress={() => this.props.navigation.navigate("TravelNote")}
          >
            <Text style={styles.text}>ခရီးသွားမှတ်တမ်းများ</Text>
          </TouchableOpacity>
        </View>
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
    padding: 30,
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
    width: 100,
    height: 100,
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
