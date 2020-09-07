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
  AsyncStorage,
} from "react-native";

//import components
import DropDown from "@components/DropDown";
import Header from "@components/Header";
import ImgUploadBtn from "@components/ImgUploadBtn";

//import api
const axios = require("axios");
import {
  GetCityApi,
  GetTownshipApi,
  GetNrcStateApi,
  CreateApi,
} from "@api/Url";

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
      TOWNSHIP: [],
      city: { value: null, label: null },
      CITY: [],
      nrccode: { value: null, label: null },
      NRCCODE: [],
      nrcstate: { value: null, label: null },
      NRCSTATE: [],
      nrcstatus: { value: null, label: null },
      NRCSTATUS: [],
      usertype: { value: 1, label: "ပြည်သူ" },
      endtownship: { value: null, label: null },
      ENDTOWNSHIP: [],
      education: { value: null, label: null },
      EDUCATION: [],
      showStepOne: true,
      showStepTwo: false,
      showcheckbox: false,
      access_token: null,
      address: "",
      addressText: "",
      loginID: "",
      imagePath: null,
      imagePathNrcBack: null,
      imagePathSupport: null,
      imagePathMo: null,
      user_id: null,
      name: "",
      nrcnumber: "",
      vehicle: "",
      startplace: "",
      City: [],
      tempData: [],
      qstatus: "",
      qstatusboolean: false,
      tempTownship: [],
      Township: [],
      qtownstatus: "",
      qtownstatusboolean: false,
      pass: "",
      startplaces: "",
    };
    this.BackHandler = null;
  }

  async componentDidMount() {
    const { navigation } = this.props;
    // this.focusListener = navigation.addListener("didFocus", async () => {
    //   await this.setState({ showcheckbox: false });
    // });
    this.setBackHandler();
    const access_token = await AsyncStorage.getItem("access_token");
    const loginID = await AsyncStorage.getItem("loginID");
    const userid = await AsyncStorage.getItem("userid");
    // console.log(userid);
    this.setState({
      access_token: access_token,
      loginID: loginID,
      user_id: userid,
    });
    this.getCityAll();
    this.getEndtownshipAll();
    this.getAllEducation();
    this.getAllNrcCode();
    this.getAllNrcStatus();
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

  getCityAll() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };
    // console.log(headers);
    axios
      .get(GetCityApi, {
        headers,
      })
      .then(function (response) {
        // console.log("City",response.data.city);
        let city = response.data.city;
        let arr = [];
        city.map((data, index) => {
          var obj = { value: data.id, label: data.city };
          arr.push(obj);
        });
        self.setState({ CITY: arr, City: response.data.city });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  getTownshipAll(city_id) {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };
    let bodyParam = {
      city_id: city_id,
    };
    // console.log(GetTownshipApi);
    axios
      .post(GetTownshipApi, bodyParam, {
        headers,
      })
      .then(function (response) {
        // console.log("Township",response.data);
        let city = response.data.townships;
        let arr = [];
        city.map((data, index) => {
          // console.log(response.data);
          var obj = { value: data.id, label: data.township };
          arr.push(obj);
        });
        self.setState({ TOWNSHIP: arr, Township: response.data.townships });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  getEndtownshipAll() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };

    // console.log(GetTownshipApi);
    axios
      .get(GetCityApi, {
        headers,
      })
      .then(function (response) {
        // console.log("Township",response.data);
        let endtownship = response.data.Township;
        let arr = [];
        endtownship.map((data, index) => {
          var obj = { value: data.id, label: data.township };
          arr.push(obj);
        });
        self.setState({ ENDTOWNSHIP: arr });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  getAllEducation() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };

    // console.log(GetTownshipApi);
    axios
      .get(GetCityApi, {
        headers,
      })
      .then(function (response) {
        // console.log("Township",response.data);
        let education = response.data.Ministry;
        let arr = [];
        education.map((data, index) => {
          var obj = { value: data.id, label: data.ministry };
          arr.push(obj);
        });
        self.setState({ EDUCATION: arr });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  getAllNrcCode() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };

    // console.log(GetTownshipApi);
    axios
      .get(GetCityApi, {
        headers,
      })
      .then(function (response) {
        // console.log("Township",response.data);
        let nrccode = response.data.NrcCode;
        let arr = [];
        nrccode.map((data, index) => {
          var obj = { value: data.id, label: data.nrc_code };
          arr.push(obj);
        });
        self.setState({ NRCCODE: arr });
      })
      .catch(function (err) {
        console.log("NRC Code Erro", err);
      });
  }

  getAllNrcStatus() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };

    // console.log(GetTownshipApi);
    axios
      .get(GetCityApi, {
        headers,
      })
      .then(function (response) {
        // console.log("Township",response.data);
        let nrcstatus = response.data.NrcType;
        let arr = [];
        nrcstatus.map((data, index) => {
          var obj = { value: data.id, label: data.nrc_type };
          arr.push(obj);
        });
        self.setState({ NRCSTATUS: arr });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  getAllNrcState(nrccode) {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };
    let bodyParam = {
      nrc_code: nrccode,
    };

    // console.log(GetTownshipApi);
    axios
      .post(GetNrcStateApi, bodyParam, {
        headers,
      })
      .then(function (response) {
        // console.log("Township",response.data);
        let nrcstate = response.data.townships;
        let arr = [];
        nrcstate.map((data, index) => {
          var obj = { value: data.id, label: data.nrc_state };
          arr.push(obj);
        });
        self.setState({ NRCSTATE: arr });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  //search
  searching(word) {
    // alert(word);
    return this.state.City.filter((data) => {
      // console.log(data.id);
      const city = data.id != null ? data.id : "";
      const citys = city.toString();
      return citys.toLowerCase().includes(word.toString().toLowerCase());
    });
  }

  _handleOnSelect(vlaue, label) {
    if (vlaue) {
      setTimeout(() => {
        var searchdata = this.searching(vlaue);
        this.setState({ tempData: searchdata });
        this.setState({ qstatus: this.state.tempData[0].status });
        if (this.state.qstatus == 1) {
          this.setState({ qstatusboolean: true });
        }
        // console.log(this.state.qstatusboolean);
      }, 100);
    }
    // alert(vlaue)
    this.setState({
      city: { vlaue: vlaue, label: label },
    });
    this.getTownshipAll(vlaue);
  }

  //search
  searchingTownship(word) {
    // alert(word);
    return this.state.Township.filter((data) => {
      // console.log("Township id",data.id);
      const city = data.id != null ? data.id : "";
      const citys = city.toString();
      return citys.toLowerCase().includes(word.toString().toLowerCase());
    });
  }

  _handleOnSelectTownShip(vlaue, label) {
    if (vlaue) {
      setTimeout(() => {
        var searchdata = this.searchingTownship(vlaue);
        this.setState({ tempTownship: searchdata });
        this.setState({ qtownstatus: this.state.tempTownship[0].status });
        if (this.state.qtownstatus == 1) {
          this.setState({ qtownstatusboolean: true });
        }
        // console.log("Q township",this.state.qtownstatusboolean);
      }, 100);
    }

    this.setState({
      township: { vlaue: vlaue, label: label },
    });
  }
  _handleOnSelectNRCCode(vlaue, label) {
    this.setState({
      nrccode: { vlaue: vlaue, label: label },
    });
    this.getAllNrcState(vlaue);
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
  _handleOnSelectEndTownship(value, label) {
    this.setState({
      endtownship: { value: value, label: label },
    });
  }
  _handleOnSelectEducation(value, label) {
    this.setState({
      education: { value: value, label: label },
      address: label,
    });
  }
  // _NrcFrontPhoto(){
  //   const {imagePath}=this.state;
  //   if (imagePath) {
  //     const uriPart = imagePath.split(".");
  //     const fileExtension = uriPart[uriPart.length - 1];
  //     const fileName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
  //   }
  // }

  _handleSave() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };

    let bodyParam = {
      citizen_status: this.state.usertype.value,
      userId: this.state.user_id,
      name: this.state.name,
      nrc_code_id: this.state.nrccode.vlaue,
      nrc_state_id: this.state.nrcstate.vlaue,
      nrc_type_id: this.state.nrcstatus.vlaue,
      nrc_no: this.state.nrcnumber,
      phone_no: this.state.loginID,
      vehicle_no: this.state.vehicle,
      startcity_id: this.state.city.vlaue,
      starttownship_id: this.state.township.vlaue,
      start_place: this.state.startplaces,
      ministry_status: this.state.showcheckbox ? 1 : 0,
      endPlace_id: this.state.endtownship.value,
      end_place: this.state.addressText
        ? this.state.addressText
        : this.state.address,
      nrc_back: this.state.imagePathNrcBack
        ? {
            uri: this.state.imagePathNrcBack,
            name: this.state.imagePathNrcBack.substr(
              this.state.imagePathNrcBack.lastIndexOf("/") + 1
            ),
            type: `image/${
              this.state.imagePathNrcBack.split(".")[
                this.state.imagePathNrcBack.split(".").length - 1
              ]
            }`,
          }
        : null,
      nrc_front: this.state.imagePath
        ? {
            uri: this.state.imagePath,
            name: this.state.imagePath.substr(
              this.state.imagePath.lastIndexOf("/") + 1
            ),
            type: `image/${
              this.state.imagePath.split(".")[
                this.state.imagePath.split(".").length - 1
              ]
            }`,
          }
        : null,
      approved_photo: this.state.imagePathSupport
        ? {
            uri: this.state.imagePathSupport,
            name: this.state.imagePathSupport.substr(
              this.state.imagePathSupport.lastIndexOf("/") + 1
            ),
            type: `image/${
              this.state.imagePathSupport.split(".")[
                this.state.imagePathSupport.split(".").length - 1
              ]
            }`,
          }
        : null,
      mo_photo: this.state.imagePathMo
        ? {
            uri: this.state.imagePathMo,
            name: this.state.imagePathMo.substr(
              this.state.imagePathMo.lastIndexOf("/") + 1
            ),
            type: `image/${
              this.state.imagePathMo.split(".")[
                this.state.imagePathMo.split(".").length - 1
              ]
            }`,
          }
        : null,
      passport: this.state.pass,
      q_status: this.state.qstatus
        ? this.state.qstatusboolean
        : this.state.qtownstatusboolean,
      ministry_id: this.state.education.value
        ? this.state.education.value
        : null,
    };
    console.log(bodyParam);
    axios
      .post(CreateApi, bodyParam, {
        headers,
      })
      .then(function (response) {
        if (response.data.status == 1) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (err) {
        console.log("Error", err);
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
      showcheckbox: !this.state.showcheckbox,
    });
  }

  _handleOnChooseImage(image) {
    this.setState({ imagePath: image.uri });
  }
  _handleOnChooseImageNrcBack(image) {
    this.setState({ imagePathNrcBack: image.uri });
  }
  _handleOnChooseImageSupport(image) {
    this.setState({ imagePathSupport: image.uri });
  }
  _handleOnChooseImageMo(image) {
    this.setState({ imagePathMo: image.uri });
  }

  _changeImage() {
    if (this.state.usertype.value == 5) {
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
              <ImgUploadBtn
                imagePath={this.state.imagePath}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text>ဗီဇာပုံ</Text>
              <ImgUploadBtn
                imagePath={this.state.imagePathNrcBack}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ထောက်ခံစာများ</Text>
            <ImgUploadBtn
              imagePath={this.state.imagePathSupport}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
            />
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
              <ImgUploadBtn
                imagePath={this.state.imagePath}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အနောက်ဘက်</Text>
              <ImgUploadBtn
                imagePath={this.state.imagePathNrcBack}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ခရီးသွားလာခွန့်အမိန့်MO</Text>
            <ImgUploadBtn
              imagePath={this.state.imagePathMo}
              onChooseImage={this._handleOnChooseImageMo.bind(this)}
            />
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ထောက်ခံစာများ</Text>
            <ImgUploadBtn
              imagePath={this.state.imagePathSupport}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
            />
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
              <ImgUploadBtn
                imagePath={this.state.imagePath}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text>သာသနာဝင်စိစစ်ရေးကဒ်ပြားအနောက်ဘက်</Text>
              <ImgUploadBtn
                imagePath={this.state.imagePathNrcBack}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ထောက်ခံစာများ</Text>
            <ImgUploadBtn
              imagePath={this.state.imagePathMo}
              onChooseImage={this._handleOnChooseImageMo.bind(this)}
            />
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
              <ImgUploadBtn
                imagePath={this.state.imagePath}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အနောက်ဘက်</Text>
              <ImgUploadBtn
                imagePath={this.state.imagePathNrcBack}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ထောက်ခံစာများ</Text>
            <ImgUploadBtn
              imagePath={this.state.imagePathMo}
              onChooseImage={this._handleOnChooseImageMo.bind(this)}
            />
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
              <Text>မှတ်ပုံတင်အရှေ့ဘက်</Text>
              <ImgUploadBtn
                imagePath={this.state.imagePath}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အနောက်ဘက်</Text>
              <ImgUploadBtn
                imagePath={this.state.imagePathNrcBack}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ထောက်ခံစာများ</Text>
            <ImgUploadBtn
              imagePath={this.state.imagePathSupport}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
            />
          </View>
        </View>
      );
    }
  }
  render() {
    console.log(this.state.user_id);
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
                        // placeholder="ပြည်သူ"
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
                      value={this.state.name}
                      style={styles.textInput}
                      placeholder="လှလှ"
                      onChangeText={(value) => this.setState({ name: value })}
                    />
                  </View>
                  {this.state.usertype.value == "5" ? (
                    <View style={styles.secondContainer}>
                      <Text style={styles.text}>နိုင်ငံကူးနံပါတ်</Text>
                      <TextInput
                        style={styles.textInput}
                        value={this.state.pass}
                        onChangeText={(value) => this.setState({ pass: value })}
                      />
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
                        <View style={{ width: "20%" }}>
                          <DropDown
                            placeholder="1"
                            value={this.state.nrccode}
                            optionsContainerWidth="33%"
                            options={this.state.NRCCODE}
                            onSelect={(value, label) =>
                              this._handleOnSelectNRCCode(value, label)
                            }
                          />
                        </View>
                        <View style={{ width: "50%" }}>
                          <DropDown
                            placeholder="Select NRC"
                            optionsContainerWidth="65%"
                            value={this.state.nrcstate}
                            options={this.state.NRCSTATE}
                            onSelect={(value, label) =>
                              this._handleOnSelectNRCState(value, label)
                            }
                          />
                        </View>
                        <View style={{ width: "20%" }}>
                          <DropDown
                            placeholder="N"
                            optionsContainerWidth="33%"
                            value={this.state.nrcstatus}
                            options={this.state.NRCSTATUS}
                            onSelect={(value, label) =>
                              this._handleOnSelectNRCStatus(value, label)
                            }
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                        }}
                      >
                        <View>
                          <TextInput
                            style={[styles.textInput]}
                            value={this.state.nrcnumber}
                            keyboardType="number-pad"
                            placeholder="111111"
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
                      value={this.state.loginID}
                      editable={false}
                    />
                  </View>
                  <View style={styles.secondContainer}>
                    <Text style={styles.text}>ယာဉ်နံပါတ်</Text>
                    <TextInput
                      value={this.state.vehicle}
                      style={styles.textInput}
                      placeholder="7K/1234"
                      onChangeText={(value) =>
                        this.setState({ vehicle: value })
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
                            placeholder="Select City"
                            optionsContainerWidth="45%"
                            value={this.state.city}
                            options={this.state.CITY}
                            onSelect={(value, label) =>
                              this._handleOnSelect(value, label)
                            }
                          />
                        </View>
                        <View style={{ width: "48%" }}>
                          <DropDown
                            placeholder="Select Township"
                            optionsContainerWidth="45%"
                            value={this.state.township}
                            options={this.state.TOWNSHIP}
                            onSelect={(value, label) =>
                              this._handleOnSelectTownShip(value, label)
                            }
                          />
                        </View>
                      </View>
                      <TextInput
                        style={[styles.textInput]}
                        placeholder="လိပ်စာ"
                        value={this.state.startplaces}
                        onChangeText={(value) =>
                          this.setState({ startplaces: value })
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
                                borderColor: "#308DCC",
                              }}
                            >
                              <Image
                                source={require("@images/true.png")}
                                style={{ width: 20, height: 20 }}
                              />
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
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View style={{ justifyContent: "center" }}>
                              <Text>ဝန်ကြီးဌာန</Text>
                            </View>
                            <View style={{ width: "70%", marginTop: 10 }}>
                              <DropDown
                                placeholder="ဝန်ကြီးဌာန"
                                optionsContainerWidth="55%"
                                value={this.state.education}
                                options={this.state.EDUCATION}
                                onSelect={(value, label) =>
                                  this._handleOnSelectEducation(value, label)
                                }
                              />
                            </View>
                          </View>
                        ) : null}
                      </View>

                      <View style={{ marginTop: 10 }}>
                        <DropDown
                          placeholder="Select Township"
                          optionsContainerWidth="95%"
                          value={this.state.endtownship}
                          options={this.state.ENDTOWNSHIP}
                          onSelect={(value, label) =>
                            this._handleOnSelectEndTownship(value, label)
                          }
                        />
                      </View>
                      {this.state.showcheckbox ? (
                        <TextInput
                          style={[styles.textInput]}
                          value={this.state.address}
                          placeholder="လိပ်စာ"
                          // onChangeText={(value) =>
                          //   this.setState({ endplace: value })
                          // }
                        />
                      ) : (
                        <TextInput
                          style={[styles.textInput]}
                          value={this.state.addressText}
                          placeholder="လိပ်စာ"
                          onChangeText={(value) =>
                            this.setState({ addressText: value })
                          }
                        />
                      )}
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
                      onPress={() => this._handleSave()}
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
