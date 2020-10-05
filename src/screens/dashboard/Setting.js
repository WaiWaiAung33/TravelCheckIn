import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  AsyncStorage
} from "react-native";

//import components
import { t, getLang } from "@services/Localization";
import Header from "@components/Header";
import CreateFirstSuccessModal from "@components/CreateFirstSuccessModal";
import appjson from "@appjson";

export default class Setting extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isOpenFirstSuccessModal:false,
      locale:null
    }
  }
  async componentDidMount(){
    const res = await getLang();
    this.setState({ locale: res });
  }
   async _handleLogut(){
     await AsyncStorage.clear();
     this.props.navigation.navigate("Login");
    }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          name="Setting"
          //   number="1"
          Onpress={() => this.props.navigation.navigate("Home")}
        />
        <TouchableOpacity style={styles.touchBtn}>
          <Image
            source={require("@images/about.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={styles.touchBtn}
         onPress={()=>this.setState({isOpenFirstSuccessModal:true})}
         >
          <ImageBackground
            source={require("@images/circle.png")}
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("@images/logout.png")}
              style={{ width: 20, height: 20 }}
            />
          </ImageBackground>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchBtn}>
          <ImageBackground
            source={require("@images/circle.png")}
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("@images/version.png")}
              style={{ width: 23, height: 18 }}
            />
          </ImageBackground>
         
          <Text style={styles.text}>Version {appjson.expo.version}</Text>
         
        </TouchableOpacity>
        <CreateFirstSuccessModal
                isOpen={this.state.isOpenFirstSuccessModal}
                text={t("logout",this.state.locale)}
                handleEntry={() => this._handleLogut()}
                handleNoEntry={() => this.setState({isOpenFirstSuccessModal:false})}
                no="NO"
                yes="YES"
                confirm={t("confirm",this.state.locale)}
              />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  constiner: {
    flex: 1,
  },
  touchBtn: {
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    paddingLeft: 5,
  },
});
