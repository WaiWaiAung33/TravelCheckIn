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
} from "react-native";
const { height, width } = Dimensions.get("window");
export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.secondContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={require("@images/councillogo.png")}
              style={styles.img}
            />
          </View>
        </View>

        <View style={styles.thirdContainer}>
          <Text style={styles.headerText}>နေပြည်တော်ဝင်ခွင့်လျှောက်လွှာမှ</Text>
          <Text style={styles.headerText}>ကြိုဆိုပါ၏</Text>
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

            <TextInput style={styles.textInput} placeholder="09 XXX XXX XXX" keyboardType="number-pad" />
          </View>
          <TouchableOpacity
            style={styles.touchBtn}
            onPress={() => this.props.navigation.navigate("OTPCode")}
          >
            <Text style={styles.text}>လျှောက်လွှာတင်မည်</Text>
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
    alignItems: "center",
  },
  img: {
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
