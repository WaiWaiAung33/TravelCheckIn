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
  AsyncStorage,
} from "react-native";

const axios = require("axios");
import {
  RegisterHistoryDetailApi,
  GetCityApi,
  GetNrcStateApi,
  GetTownshipApi,
  BaseUrl,
  EditApi,
} from "@api/Url";

//import components
import DropDown from "@components/DropDown";
import Header from "@components/Header";
import ImgUploadBtn from "@components/ImgUploadBtn";
import SuccessModal from "@components/SuccessModal";

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
      access_token: null,
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
      usertype: { value: null, label: null },
      education: { value: null, label: null },
      EDUCATION: [],
      endtownship: { value: null, label: null },
      ENDTOWNSHIP: [],
      endtownshipone: { value: null, label: null },
      ENDTOWNSHIPONE: [],
      showStepOne: true,
      showStepTwo: false,
      showcheckbox: false,
      name: "",
      nrcnumber: "",
      phone: "09451875247",
      carnumber: "7K/1234",
      startplace: "ပဲနွယ်ကုန်းမြို့။",
      endplace: "",
      passport: null,
      ministraystatus: null,
      MINISTRAY: [],
      tempMinistray: [],
      endtownshipid: null,
      endtownshipname: "",
      imagePath: "",
      nrcfrontName: "",
      nrcbackName: "",
      moName: "",
      approvephotoName: "",
      isOpenSuccessModel: false,
    };
  }
  async componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this.setState({ showcheckbox: false });
    });
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({ access_token: access_token });
    await this.getAllTravelNote();
    this.getAllNrcCode();
    this.getAllNrcStatus();
    this.getAllCity();
    this.getAllTownshipOne();
    this.getAllEducation();
  }

  async getAllTravelNote() {
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
        // console.log("Register Detail", response.data.historyDetail.citizen_status);
        const citizen = response.data.historyDetail.citizen_status;
        const datas = response.data.historyDetail;
        const endtown = response.data.endplace_township;
        // console.log(datas);
        console.log(response.data);
        if (citizen == 1) {
          self.setState({
            usertype: { value: citizen, label: "ပြည်သူ" },
          });
        }
        if (citizen == 2) {
          self.setState({
            usertype: { value: citizen, label: "နိုင်ငံဝန်ထမ်း" },
          });
        }
        if (citizen == 3) {
          self.setState({
            usertype: { value: citizen, label: "ရဟန်းရှင်" },
          });
        }
        if (citizen == 4) {
          self.setState({
            usertype: { value: citizen, label: "တပ်မတော်" },
          });
        }
        if (citizen == 5) {
          self.setState({
            usertype: { value: citizen, label: "နိုင်ငံခြားသား" },
          });
        }
        self.setState({
          name: datas.name,
          nrccode: { value: datas.nrc_code_id, label: datas.nrc_code },
          nrcstate: { value: datas.nrc_status_id, label: datas.nrc_state },
          nrcstatus: { value: datas.nrc_type_id, label: datas.nrc_type },
          nrcnumber: datas.nrc_no,
          phone: datas.ph_no,
          carnumber: datas.vehical_no,
          passport: datas.passport,
          ministraystatus: datas.ministry_status,
          city: { value: datas.start_place_city, label: datas.city },
          township: {
            value: datas.start_place_township,
            label: datas.township,
          },
          startplace: datas.start_place,
          education: { value: datas.ministry_id, label: datas.ministry },
          endtownship: { value: datas.end_place_township, label: endtown },
          endtownshipone: { value: datas.end_place_township, label: endtown },
          endplace: datas.end_place,
          imagePath: datas.path,
          nrcfrontName: datas.nrc_front,
          nrcbackName: datas.nrc_back,
          moName: datas.mo_photo,
          approvephotoName: datas.approve_photo,
        });
        // console.log(citizen);
      })
      .catch(function (err) {
        // console.log("TravelNoteDetail Error");
      });
  }

  _handleSave() {
    const self = this;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
    };
    let bodyParam = {
      citizen_status: self.state.usertype.value,
      userId: self.props.navigation.getParam("userid"),
      name: self.state.name,
      nrc_code_id: self.state.nrccode.value,
      nrc_state_id: self.state.nrcstate.value,
      nrc_type_id: self.state.nrcstatus.value,
      nrc_no: self.state.nrcnumber,
      phone_no: self.state.phone,
      vehicle_no: self.state.carnumber,
      startcity_id: self.state.city.value,
      starttownship_id: self.state.township.value,
      start_place: self.state.startplace,
      ministry_status: self.state.ministraystatus,
      endPlace_id: self.state.endtownship.value,
      end_place: self.state.endplace,
      nrc_back: null,
      nrc_front: null,
      approved_photo: null,
      mo_photo: null,
      passport: self.state.passport ? self.state.passport : null,
      ministry_id: self.state.education.value
        ? self.state.education.value
        : null,
    };
    // console.log(bodyParam);
    axios
      .post(EditApi, bodyParam, {
        headers,
      })
      .then(function (response) {
        if (response.data.status == 1) {
          self.setState({
            isOpenSuccessModel: true,
          });
        }
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
        // console.log("Township",response.data.city);
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

  getAllCity() {
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
        // console.log("Township",response.data.city);
        let city = response.data.city;
        let arr = [];
        city.map((data, index) => {
          var obj = { value: data.id, label: data.city };
          arr.push(obj);
        });
        self.setState({ CITY: arr });
      })
      .catch(function (err) {
        console.log("NRC Code Erro", err);
      });
  }

  getAllTownshipOne() {
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
        // console.log("Township",response.data.city);
        let township = response.data.Township;
        let arr = [];
        township.map((data, index) => {
          var obj = { value: data.id, label: data.township };
          arr.push(obj);
        });
        self.setState({ ENDTOWNSHIPONE: arr });
      })
      .catch(function (err) {
        console.log("NRC Code Erro", err);
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
        // console.log("Ministray",response.data);
        let education = response.data.Ministry;
        let arr = [];
        education.map((data, index) => {
          var obj = { value: data.id, label: data.ministry };
          arr.push(obj);
        });
        self.setState({ EDUCATION: arr, MINISTRAY: response.data.Ministry });
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

  _handleOnSelect(value, label) {
    this.setState({
      township: { value: value, label: label },
    });
  }
  _handleOnSelectCity(value, label) {
    this.setState({
      city: { value: value, label: label },
    });
    this.getTownshipAll(value);
  }
  _handleOnSelectEndTownshipOne(value, label) {
    this.setState({
      endtownshipone: { value: value, label: label },
    });
  }
  _handleOnSelectNRCCode(value, label) {
    this.setState({
      nrccode: { value: value, label: label },
    });
    this.getAllNrcState(value);
  }
  _handleOnSelectNRCState(value, label) {
    this.setState({
      nrcstate: { value: value, label: label },
    });
  }
  _handleOnSelectNRCStatus(value, label) {
    this.setState({
      nrcstatus: { value: value, label: label },
    });
  }
  _handleOnSelectUserType(value, label) {
    this.setState({
      usertype: { value: value, label: label },
    });
  }

  _handleMinistoryTownship(value) {
    // alert(value);
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
          // console.log("Ministray",data);
          if (value == data.id) {
            console.log("Ministry", data);
            self.setState({
              endtownshipname: data.township,
              endtownshipid: data.id,
            });
          }
          // arr.push(obj);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  searchingMinistray(word) {
    return this.state.MINISTRAY.filter((data) => {
      const ministry = data.id != null ? data.id : "";
      const ministrys = ministry.toString();
      return ministrys.toLowerCase().includes(word.toString().toLowerCase());
    });
  }
  _handleOnSelectEducation(value, label) {
    if (value) {
      setTimeout(() => {
        const searched = this.searchingMinistray(value);
        this.setState({ tempMinistray: searched });
        this.setState({
          ministrayTownship: this.state.tempMinistray[0].township_id,
        });
        // console.log("TempMinistray",this.state.tempMinistray);
      }, 100);
    }
    this.setState({
      education: { value: value, label: label },
    });
  }
  _handleOnChooseImage(image) {
    this.setState({ nrcfrontName: image.uri });
  }
  _handleOnChooseImageNrcBack(image) {
    this.setState({ nrcbackName: image.uri });
  }
  _handleOnChooseImageSupport(image) {
    this.setState({ approvephotoName: image.uri });
  }
  _handleOnChooseImageMo(image) {
    this.setState({ moName: image.uri });
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
    const nrcfront =
      BaseUrl + this.state.imagePath + "/" + this.state.nrcfrontName;
    const nrcback =
      BaseUrl + this.state.imagePath + "/" + this.state.nrcbackName;
    const mophoto = BaseUrl + this.state.imagePath + "/" + this.state.moName;
    const support =
      BaseUrl + this.state.imagePath + "/" + this.state.approvephotoName;
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
              <ImgUploadBtn
                imagePath={nrcfront}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အနောက်ဘက်</Text>
              <ImgUploadBtn
                imagePath={nrcback}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ထောက်ခံစာများ</Text>
            <ImgUploadBtn
              imagePath={support}
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
                imagePath={nrcfront}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အနောက်ဘက်</Text>
              <ImgUploadBtn
                imagePath={nrcback}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ခရီးသွားလာခွန့်အမိန့်MO</Text>
            <ImgUploadBtn
              imagePath={mophoto}
              onChooseImage={this._handleOnChooseImageMo.bind(this)}
            />
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ထောက်ခံစာများ</Text>
            <ImgUploadBtn
              imagePath={support}
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
                imagePath={nrcfront}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text>သာသနာဝင်စိစစ်ရေးကဒ်ပြားအနောက်ဘက်</Text>
              <ImgUploadBtn
                imagePath={nrcback}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ထောက်ခံစာများ</Text>
            <ImgUploadBtn
              imagePath={support}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
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
                imagePath={nrcfront}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text>မှတ်ပုံတင်အနောက်ဘက်</Text>
              <ImgUploadBtn
                imagePath={nrcback}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ထောက်ခံစာများ</Text>
            <ImgUploadBtn
              imagePath={support}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
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
              <Text>နိုင်ငံကူးလက်မှတ်</Text>
              <ImgUploadBtn
                imagePath={nrcfront}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text>ဗီဇာပုံ</Text>
              <ImgUploadBtn
                imagePath={nrcback}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>ထောက်ခံစာများ</Text>
            <ImgUploadBtn
              imagePath={support}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
            />
          </View>
        </View>
      );
    }
  }
  _onChangeCheckBox() {
    this.setState({
      showcheckbox: !this.state.showcheckbox,
    });
  }
  _handleOnClose() {
    this.setState({ isOpenSuccessModel: false });
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
                      <TextInput
                        style={styles.textInput}
                        value={this.state.passport}
                        onChangeText={(value) =>
                          this.setState({
                            passport: value,
                          })
                        }
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
                        <View style={{ width: "35%" }}>
                          <DropDown
                            placeholder="1"
                            optionsContainerWidth="33%"
                            value={this.state.nrccode}
                            options={this.state.NRCCODE}
                            onSelect={(value, label) =>
                              this._handleOnSelectNRCCode(value, label)
                            }
                          />
                        </View>
                        <View style={{ width: "60%" }}>
                          <DropDown
                            optionsContainerWidth="55%"
                            value={this.state.nrcstate}
                            options={this.state.NRCSTATE}
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
                            options={this.state.NRCSTATUS}
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
                      editable={false}
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
              name="အချက်အလက်များပြင်ရန်"
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
                            value={this.state.city}
                            options={this.state.CITY}
                            onSelect={(value, label) =>
                              this._handleOnSelectCity(value, label)
                            }
                            optionsContainerWidth="45%"
                          />
                        </View>
                        <View style={{ width: "48%" }}>
                          <DropDown
                            placeholder="ပဲနွယ်ကုန်း"
                            optionsContainerWidth="45%"
                            value={this.state.township}
                            options={this.state.TOWNSHIP}
                            onSelect={(value, label) =>
                              this._handleOnSelect(value, label)
                            }
                          />
                        </View>
                      </View>
                      <TextInput
                        style={[styles.textInput]}
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
                        {this.state.showcheckbox ||
                        !this.state.ministraystatus == 1 ? (
                          <TouchableOpacity
                            onPress={() => this._onChangeCheckBox()}
                            style={{ marginTop: 5 }}
                          >
                            <View
                              style={{ width: 25, height: 25, borderWidth: 1 }}
                            />
                          </TouchableOpacity>
                        ) : (
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
                        )}

                        {this.state.showcheckbox ||
                        this.state.ministraystatus == 1 ? (
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
                      {this.state.showcheckbox ||
                      this.state.ministraystatus == 1 ? (
                        <View style={{ marginTop: 10 }}>
                          {/* <TextInput
                            style={[styles.textInput]}
                            value={
                              this.state.endtownshipname
                                ? this.state.endtownshipname
                                : this.state.endtownship
                            }
                          /> */}
                          <DropDown
                            placeholder="Select Township"
                            optionsContainerWidth="95%"
                            value={this.state.endtownship}
                            options={this.state.ENDTOWNSHIP}
                            // onSelect={(value, label) =>
                            //   this._handleOnSelectEndTownship(value, label)
                            // }
                          />
                        </View>
                      ) : (
                        <View style={{ marginTop: 10 }}>
                          <DropDown
                            placeholder="Select Township"
                            optionsContainerWidth="95%"
                            value={this.state.endtownshipone}
                            options={this.state.ENDTOWNSHIPONE}
                            onSelect={(value, label) =>
                              this._handleOnSelectEndTownshipOne(value, label)
                            }
                          />
                        </View>
                      )}

                      {this.state.showcheckbox ||
                      this.state.ministraystatus == 1 ? (
                        <TextInput
                          style={[styles.textInput]}
                          value={this.state.endplace}
                          onChangeText={(value) =>
                            this.setState({ endplace: value })
                          }
                        />
                      ) : (
                        <TextInput
                          style={[styles.textInput]}
                          value={this.state.endplace}
                          onChangeText={(value) =>
                            this.setState({ endplace: value })
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
                    {/* <TouchableOpacity
                      style={[styles.touchBtn, { width: "45%" }]}
                      onPress={() => this._gotoStep(1)}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        အသစ်ထည့်မည်
                      </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={[styles.touchBtn, { flex: 1 }]}
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
              <SuccessModal
                isOpen={this.state.isOpenSuccessModel}
                text="အချက်အလက်ပြင်ဆင်မူအောင်မြင်ပါသည်"
                onClose={() => this._handleOnClose()}
              />
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
