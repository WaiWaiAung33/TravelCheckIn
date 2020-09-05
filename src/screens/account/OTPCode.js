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
} from "react-native";
const { height, width } = Dimensions.get("window");
export default class OTPCode extends React.Component {
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
    this.props.navigation.navigate("Login");
    return true;
  };
  UNSAFE_componentWillUnmount() {
    this.focusListener.remove();
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.secondContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={require("@images/councillogo.png")}
              style={styles.imgHeader}
            />
          </View>
          <View style={{ marginTop: 25 }}>
            <Text style={styles.headerText}>
              09123456789 သို့ပို့ဆောင်လိုက်သောနံပါတ်
            </Text>
            <Text style={styles.headerText}>၆လုံးကို ရိုက်ထည့်ပါ</Text>
          </View>
        </View>
        {/* <View style={styles.thirdContainer}>
          <Text>09123456789 သို့ပို့ဆောင်လိုက်သောနံပါတ်</Text>
          <Text>၆လုံးကို ရိုက်ထည့်ပါ</Text>
        </View> */}
        <View style={styles.thirdContainer}>
          <TextInput style={styles.textInput} keyboardType="number-pad" />
          <TextInput style={styles.textInput} keyboardType="number-pad"/>
          <TextInput style={styles.textInput} keyboardType="number-pad"/>
          <TextInput style={styles.textInput} keyboardType="number-pad"/>
          <TextInput style={styles.textInput} keyboardType="number-pad"/>
          <TextInput style={styles.textInput} keyboardType="number-pad"/>
        </View>
        <TouchableOpacity
          style={styles.touchBtn}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Text style={styles.text}>အတည်ပြုမည်</Text>
        </TouchableOpacity>
        <View style={styles.textfooter}>
          <Text style={{ color: "#308DCC", fontWeight: "bold" }}>
            ကုဒ်ပြန်ပို့ပေးပါရန်
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  img: {
    height: height / 5,
    width: width,
    justifyContent: "center",
    // alignItems: "center"
  },
  secondContainer: {
    height: 300,
    backgroundColor: "#308DCC",
    alignItems: "center",
  },
  imgHeader: {
    width: 100,
    height: 100,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20%",
  },
  textInput: {
    height: 40,
    width: width / 9,
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 5,
    borderColor: "#308DCC",
    elevation: 5,
    backgroundColor: "white",
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "white",
    shadowOpacity: 0.5,
    textAlign:"center"
  },
  thirdContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  touchBtn: {
    height: 40,
    borderWidth: 1,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#308DCC",
    borderColor: "#308DCC",
    borderRadius: 5,
    elevation: 5,
    //   backgroundColor:"white",
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "white",
    shadowOpacity: 0.5,
    marginTop: 20,
  },
  text: {
    color: "white",
  },
  textfooter: {
    alignItems: "flex-end",
    //   marginTop:"15%",
    margin: 20,
  },
});
