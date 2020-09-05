import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";

//import components
import DropDown from "@components/DropDown";
import Header from "@components/Header";
import ImgUploadBtn from "@components/ImgUploadBtn";

const TOWNSHIP = [
  { vlaue: "0", label: "Select Township" },
  { value: "2", label: "ရန်ကုန်တိုင်း" },
  { value: "3", label: "မန္တလေးတိုင်း" },
  { value: "1", label: "ပဲခူးတိုင်" },
];
const CITY = [
  { vlaue: "0", label: "Select Township" },
  { value: "2", label: "ပဲနွယ်ကုန်း" },
  { value: "3", label: "ကျောက်တံခါး" },
  { value: "1", label: "ညောင်လေးပင်" },
];
const NRCCODE = [
  { vlaue: "0", label: "1" },
  { value: "2", label: "1" },
  { value: "3", label: "2" },
  { value: "1", label: "3" },
];
const NRCSTATE = [
  { vlaue: "0", label: "NRC State" },
  { value: "2", label: "khtthakha" },
  { value: "3", label: "Mathana" },
  { value: "1", label: "KaKa" },
];
const NRCSTATUS = [
  { value: "1", label: "N" },
  { value: "2", label: "P" },
];
const USERTYPE = [
  { value: "1", label: "ပြည်သူ" },
  { value: "2", label: "နိုင်ငံဝန်ထမ်း" },
  { value: "3", label: "ရဟန်းရှင်" },
  { value: "4", label: "တပ်မတော်" },
  { value: "5", label: "နိုင်ငံခြားသား" },
];

const ENDCITY = [
  { value: "1", label: "ပျဉ်းမနား" },
  { value: "2", label: "ဇေယျာသီရိ" },
  { value: "3", label: "ပုပ္ဗသီရိ" },
];

const EDUCATION = [
  { value: "1", label: "ပညာရေးဝန်ကြီးဌာန" },
  { value: "2", label: "ပြန်ကြားရေးဝန်ကြီးဌာန" },
  { value: "3", label: "ဆက်သွယ်ရေးဝန်ကြီးဌာန" },
];


export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      township: { value: null, label: null },
      city: { value: null, label: null },
      nrccode: { value: null, label: null },
      nrcstate: { value: null, label: null },
      nrcstatus: { value: null, label: null },
      usertype: { value: null, label: null },
      endcity: { value: null, label: null },
      education:{ value: null, label: null },
      showStepOne: true,
      showStepTwo: false,
      showcheckbox: false,
    
    };
    this.BackHandler = null;
  }

  async componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this.setState({ showcheckbox: false });
    });
    this.setBackHandler();
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

  _handleOnSelect(vlaue, label) {
    this.setState({
      township: { vlaue: vlaue, label: label },
    });
  }
  _handleOnSelectCity(vlaue, label) {
    this.setState({
      city: { vlaue: vlaue, label: label },
    });
  }
  _handleOnSelectNRCCode(vlaue, label) {
    this.setState({
      nrccode: { vlaue: vlaue, label: label },
    });
  }
  _handleOnSelectNRCState(vlaue, label) {
    this.setState({
      nrcstate: { vlaue: vlaue, label: label },
    });
  }
  _handleOnSelectNRCStatus(vlaue, label) {
    this.setState({
      nrcstatus: { vlaue: vlaue, label: label },
    });
  }
  _handleOnSelectUserType(value, label) {
    this.setState({
      usertype: { value: value, label: label },
    });
  }
  _handleOnSelectEndCity(value, label) {
    this.setState({
      endcity: { value: value, label: label },
    });
  }
  _handleOnSelectEducation(value, label) {
    this.setState({
      education: { value: value, label: label },
    });
  }
  _gotoStep(step) {
    if (step == 1) {
      this.setState({
        showStepOne: true,
        showStepTwo: false,
      });
    } else if (step == 2) {
      this.setState({
        showStepOne: false,
        showStepTwo: true,
      });
    }
  }
  _onChangeCheckBox() {
    this.setState({
      showcheckbox: true,
    });
  }
  _changeImage() {
    if (this.state.usertype.value == 1) {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              flex: 1,
            }}
          >
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အရှေ့ဘက်</Text>
              <ImgUploadBtn />
            </View>
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အနောက်ဘက်</Text>
              <ImgUploadBtn />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ထောက်ခံစာများ</Text>
            <ImgUploadBtn />
          </View>
        </View>
      );
    } else if (this.state.usertype.value == 2) {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              flex: 1,
            }}
          >
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အရှေ့ဘက်</Text>
              <ImgUploadBtn />
            </View>
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အနောက်ဘက်</Text>
              <ImgUploadBtn />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ခရီးသွားလာခွန့်အမိန့်MO</Text>
            <ImgUploadBtn />
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ထောက်ခံစာများ</Text>
            <ImgUploadBtn />
          </View>
        </View>
      );
    } else if (this.state.usertype.value == 3) {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              flex: 1,
            }}
          >
            <View style={{ width: "45%" }}>
              <Text>သာသနာဝင်စိစစ်ရေးကဒ်ပြားအရှေ့ဘက်</Text>
              <ImgUploadBtn />
            </View>
            <View style={{ width: "45%" }}>
              <Text>သာသနာဝင်စိစစ်ရေးကဒ်ပြားအနောက်ဘက်</Text>
              <ImgUploadBtn />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ထောက်ခံစာများ</Text>
            <ImgUploadBtn />
          </View>
        </View>
      );
    } else if (this.state.usertype.value == 4) {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              flex: 1,
            }}
          >
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အရှေ့ဘက်</Text>
              <ImgUploadBtn />
            </View>
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အနောက်ဘက်</Text>
              <ImgUploadBtn />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ထောက်ခံစာများ</Text>
            <ImgUploadBtn />
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              flex: 1,
            }}
          >
            <View style={{ width: "45%" }}>
              <Text>နိုင်ငံကူးလက်မှတ်</Text>
              <ImgUploadBtn />
            </View>
            <View style={{ width: "45%" }}>
              <Text>ဗီဇာပုံ</Text>
              <ImgUploadBtn />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ထောက်ခံစာများ</Text>
            <ImgUploadBtn />
          </View>
        </View>
      );
    }
  }
  render() {
    // alert(this.state.showcheckbox);
    return (
      <View style={{ flex: 1 }}>
        {this.state.showStepOne ? (
          <View style={{ flex: 1 }}>
            <Header
              name="အချက်အလက်များဖြည့်ရန်"
              number="1"
              Onpress={() => this.props.navigation.navigate("Home")}
            />
            <View style={styles.constiner}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                  // behavior="position"
                  enabled
                  behavior={Platform.OS == "ios" ? "position" : null}

                  // keyboardVerticalOffset={100}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.text}>
                      အသုံးပြုသူအမျိုးအစားရွေးချယ်ရန်
                    </Text>
                    <View style={{ marginTop: 10 }}>
                      <DropDown
                        placeholder="ပြည်သူ"
                        optionsContainerWidth="95%"
                        value={this.state.usertype}
                        options={USERTYPE}
                        onSelect={(value, label) =>
                          this._handleOnSelectUserType(value, label)
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.secondContainer}>
                    <Text style={styles.text}>အမည်</Text>
                    <TextInput style={styles.textInput} placeholder="လှလှ" />
                  </View>
                  {this.state.usertype.value == "5" ? (
                    <View style={styles.secondContainer}>
                      <Text style={styles.text}>နိုင်ငံကူးနံပါတ်</Text>
                      <TextInput style={styles.textInput} />
                    </View>
                  ) : (
                    <View style={styles.secondContainer}>
                      <Text style={styles.text}>
                        နိုင်းငံသားစီစစ်ရေးကဒ်ပြားနံပါတ်
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                        }}
                      >
                        <View style={{ width: "35%" }}>
                          <DropDown
                            placeholder="1"
                            value={this.state.nrccode}
                            optionsContainerWidth="33%"
                            options={NRCCODE}
                            onSelect={(value, label) =>
                              this._handleOnSelectNRCCode(value, label)
                            }
                          />
                        </View>
                        <View style={{ width: "60%" }}>
                          <DropDown
                            placeholder="Select NRC"
                            optionsContainerWidth="65%"
                            value={this.state.nrcstate}
                            options={NRCSTATE}
                            onSelect={(value, label) =>
                              this._handleOnSelectNRCState(value, label)
                            }
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                        }}
                      >
                        <View style={{ width: "35%" }}>
                          <DropDown
                            placeholder="N"
                            optionsContainerWidth="33%"
                            value={this.state.nrcstatus}
                            options={NRCSTATUS}
                            onSelect={(value, label) =>
                              this._handleOnSelectNRCStatus(value, label)
                            }
                          />
                        </View>
                        <View style={{ width: "60%" }}>
                          <TextInput style={[styles.textInput]} placeholder="111111"/>
                        </View>
                      </View>
                    </View>
                  )}

                  <View style={styles.secondContainer}>
                    <Text style={styles.text}>ဖုန်းနံပါတ်</Text>
                    <TextInput style={styles.textInput} placeholder="09457537353" keyboardType="number-pad" placeholderTextColor="black" editable={false}/>
                  </View>
                  <View style={styles.secondContainer}>
                    <Text style={styles.text}>ယာဉ်နံပါတ်</Text>
                    <TextInput style={styles.textInput} placeholder="7K/1234"/>
                  </View>
                  <TouchableOpacity
                    style={styles.touchBtn}
                    onPress={() => this._gotoStep(2)}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      အဆင့်(၂)သို့
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.footer}>
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                      1 of 2
                    </Text>
                  </View>
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
          </View>
        ) : null}

        {this.state.showStepTwo ? (
          <View style={{ flex: 1 }}>
            <Header
              name="အချက်အလက်များဖြည့်ရန်"
              number="2"
              Onpress={() => this._gotoStep(1)}
            />
            <View style={styles.constiner}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                  // behavior="position"
                  enabled
                  behavior={Platform.OS == "ios" ? "position" : null}

                  // keyboardVerticalOffset={100}
                >
                  <View>
                    <View tyle={styles.secondContainer}>
                      <Text style={styles.text}>စတင်ထွက်ခွာသည့်မြို့</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                        }}
                      >
                        <View style={{ width: "48%" }}>
                          <DropDown
                            placeholder="Select Township"
                            optionsContainerWidth="45%"
                            value={this.state.township}
                            options={TOWNSHIP}
                            onSelect={(value, label) =>
                              this._handleOnSelect(value, label)
                            }
                          />
                        </View>
                        <View style={{ width: "48%" }}>
                          <DropDown
                            placeholder="Select City"
                            optionsContainerWidth="45%"
                            value={this.state.city}
                            options={CITY}
                            onSelect={(value, label) =>
                              this._handleOnSelectCity(value, label)
                            }
                          />
                        </View>
                      </View>
                      <TextInput style={[styles.textInput]} placeholder="လိပ်စာ" placeholderTextColor="black"/>
                    </View>
                    <View tyle={styles.secondContainer}>
                      <Text style={styles.text}>သွားရောက်လိုသည့်နေရာ</Text>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        {this.state.showcheckbox ? (
                          <TouchableOpacity
                            onPress={() => this._onChangeCheckBox()}
                            style={{ marginTop: 5 }}
                          >
                            <View
                              style={{
                                width: 25,
                                height: 25,
                                borderWidth: 1,
                                backgroundColor: "#308DCC",
                                borderColor:"#308DCC",
                              }}
                            >
                              <Image source={require("@images/true.png")} style={{width:20,height:20}}/>
                              </View>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => this._onChangeCheckBox()}
                            style={{ marginTop: 5 }}
                          >
                            <View
                              style={{ width: 25, height: 25, borderWidth: 1 }}
                            />
                          </TouchableOpacity>
                        )}

                        {this.state.showcheckbox ? (
                          <View style={{ width: "60%" ,marginTop:10}}>
                            <DropDown
                              placeholder="ဝန်ကြီးဌာန"
                              optionsContainerWidth="55%"
                              value={this.state.education}
                              options={EDUCATION}
                              onSelect={(value, label) =>
                                this._handleOnSelectEducation(value, label)
                              }
                            />
                          </View>
                        ) : null}
                      </View>
              
                        <View style={{marginTop:10 }}>
                          <DropDown
                            placeholder="Select Township"
                            optionsContainerWidth="95%"
                            value={this.state.endcity}
                            options={ENDCITY}
                            onSelect={(value, label) =>
                              this._handleOnSelectEndCity(value, label)
                            }
                          />
                        </View>
                        
                      <TextInput style={[styles.textInput]} placeholder="လိပ်စာ" placeholderTextColor="black"/>
                    </View>
                  </View>
                  {this._changeImage()}

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <TouchableOpacity
                      style={[styles.touchBtn, { width: "45%" }]}
                      onPress={() => this._gotoStep(1)}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        အသစ်ထည့်မည်
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.touchBtn, { width: "45%" }]}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        သိမ်းမည်
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.footer}>
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                      2 of 2
                    </Text>
                  </View>
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  constiner: {
    flex: 1,
    margin: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  textInput: {
    marginTop: 5,
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    borderColor: "#707070",
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  secondContainer: {
    marginTop: 10,
    // flex: 1,
  },

  touchBtn: {
    padding: 10,
    backgroundColor: "#308DCC",
    marginTop: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    marginTop: 20,
    // backgroundColor:"red",
    flex: 1,
  },
  imgContainer: {
    width: "45%",
    height: 100,
    backgroundColor: "#E3EEF5",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.5,
  },
});
