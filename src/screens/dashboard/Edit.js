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
} from "react-native";

//import components
import DropDown from "@components/DropDown";
import Header from "@components/Header";
import ImgUploadBtn from "@components/ImgUploadBtn";

const TOWNSHIP = [
  { value: "1", label: "ရန်ကုန်တိုင်း" },
  { value: "2", label: "မန္တလေးတိုင်း" },
  { value: "3", label: "ပဲခူးတိုင်" },
];
const CITY = [
  { value: "1", label: "ပဲနွယ်ကုန်း" },
  { value: "2", label: "ကျောက်တံခါး" },
  { value: "3", label: "ညောင်လေးပင်" },
];
const NRCCODE = [
  { value: "2", label: "1" },
  { value: "3", label: "2" },
  { value: "1", label: "3" },
];
const NRCSTATE = [
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
      showStepOne: true,
      showStepTwo: false,
      showcheckbox: false,
      name: "လှလှ",
      nrcnumber: "125432",
      phone: "09451875247",
      carnumber: "7K/1234",
      startplace: "ပဲနွယ်ကုန်းမြို့။",
      endplace: "ပေါင်းလောင်(၄)လမ်း။",
    };
  }
  async componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this.setState({ showcheckbox: false });
    });
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
              name="အချက်အလက်များပြင်ရန်"
              number="1"
              Onpress={() => this.props.navigation.navigate("TravelNote")}
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
                    <TextInput
                      style={styles.textInput}
                      value={this.state.name}
                      onChangeText={(value) => this.setState({ name: value })}
                    />
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
                            optionsContainerWidth="33%"
                            value={this.state.nrccode}
                            options={NRCCODE}
                            onSelect={(value, label) =>
                              this._handleOnSelectNRCCode(value, label)
                            }
                          />
                        </View>
                        <View style={{ width: "60%" }}>
                          <DropDown
                            optionsContainerWidth="55%"
                            placeholder="Kha Tha Kha"
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
                            optionsContainerWidth="32%"
                            value={this.state.nrcstatus}
                            options={NRCSTATUS}
                            onSelect={(value, label) =>
                              this._handleOnSelectNRCStatus(value, label)
                            }
                          />
                        </View>
                        <View style={{ width: "60%" }}>
                          <TextInput
                            keyboardType="number-pad"
                            style={[styles.textInput]}
                            value={this.state.nrcnumber}
                            onChangeText={(value) =>
                              this.setState({ nrcnumber: value })
                            }
                          />
                        </View>
                      </View>
                    </View>
                  )}

                  <View style={styles.secondContainer}>
                    <Text style={styles.text}>ဖုန်းနံပါတ်</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.phone}
                      onChangeText={(value) => this.setState({ phone: value })}
                    />
                  </View>
                  <View style={styles.secondContainer}>
                    <Text style={styles.text}>ယာဉ်နံပါတ်</Text>
                    <TextInput
                      value={this.state.carnumber}
                      style={styles.textInput}
                      onChangeText={(value) =>
                        this.setState({ carnumber: value })
                      }
                    />
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
                            placeholder="ပဲခူတိုင်း"
                            value={this.state.township}
                            options={TOWNSHIP}
                            onSelect={(value, label) =>
                              this._handleOnSelect(value, label)
                            }
                            optionsContainerWidth="45%"
                          />
                        </View>
                        <View style={{ width: "48%" }}>
                          <DropDown
                            placeholder="ပဲနွယ်ကုန်း"
                            optionsContainerWidth="45%"
                            value={this.state.city}
                            options={CITY}
                            onSelect={(value, label) =>
                              this._handleOnSelectCity(value, label)
                            }
                          />
                        </View>
                      </View>
                      <TextInput
                        style={[styles.textInput, { height: 80 }]}
                        value={this.state.startplace}
                        onChangeText={(value) =>
                          this.setState({ startplace: value })
                        }
                      />
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
                        <TouchableOpacity
                          onPress={() => this._onChangeCheckBox()}
                          style={{ marginTop: 5 }}
                        >
                          <View
                            style={{ width: 25, height: 25, borderWidth: 1 }}
                          />
                        </TouchableOpacity>
                        {this.state.showcheckbox ? (
                          <View style={{ width: "48%" }}>
                            <DropDown
                              placeholder="ဝန်ကြီးဌာန"
                              optionsContainerWidth="45%"
                              value={this.state.city}
                              options={CITY}
                              onSelect={(value, label) =>
                                this._handleOnSelectCity(value, label)
                              }
                            />
                          </View>
                        ) : null}
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <DropDown
                          placeholder="ပျဉ်းမနား"
                          optionsContainerWidth="95%"
                          value={this.state.township}
                          options={TOWNSHIP}
                          onSelect={(value, label) =>
                            this._handleOnSelect(value, label)
                          }
                        />
                      </View>

                      <TextInput
                        style={[styles.textInput, { height: 80 }]}
                        value={this.state.endplace}
                        onChangeText={(value) =>
                          this.setState({ endplace: value })
                        }
                      />
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
