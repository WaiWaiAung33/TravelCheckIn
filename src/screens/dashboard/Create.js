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
import CreateFirstSuccessModal from "@components/CreateFirstSuccessModal";
import CreateSuccessModal from "@components/CreateSuccessModal";
import ErrorText from "@components/ErrorText";
import { t, getLang } from "@services/Localization";
import LoadingModal from "@components/LoadingModal";
import Radio from "@components/Radio";
import CreateCheckbox from "@components/CreateCheckbox";

//import api
const axios = require("axios");
import FormData from "form-data";
import {
  GetCityApi,
  GetTownshipApi,
  GetNrcStateApi,
  CreateApi,
} from "@api/Url";

//import const
const USERTYPE = [
  { value: 0, label: "ပြည်သူ" },
  { value: 1, label: "နိုင်ငံဝန်ထမ်း" },
  { value: 2, label: "ရဟန်းရှင်" },
  { value: 3, label: "တပ်မတော်" },
  { value: 4, label: "နိုင်ငံခြားသား" },
];
const USERTYPEENG = [
  { value: 0, label: "People" },
  { value: 1, label: "Goverment Employee" },
  { value: 2, label: "Bhikkhu" },
  { value: 3, label: "Army" },
  { value: 4, label: "Foreigner" },
];

const GENDER = "GENDER";

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
      nrcstatus: { value: 1, label: "နိုင်" },
      NRCSTATUS: [],
      usertype: { value: 0, label: "ပြည်သူ" },
      endtownship: { value: null, label: null },
      ENDTOWNSHIP: [],
      education: { value: null, label: null },
      EDUCATION: [],
      showStepOne: true,
      showStepTwo: false,
      showcheckbox: false,
      access_token: null,
      address: null,
      addressText: null,
      loginID: null,
      imagePath: null,
      imagePathNrcBack: null,
      imagePathSupport: null,
      imagePathMo: null,
      user_id: null,
      name: null,
      nrcnumber: null,
      vehicle: null,
      startplace: null,
      City: [],
      tempData: [],
      qstatus: null,
      qstatusboolean: false,
      tempTownship: [],
      Township: [],
      MINISTRAY: [],
      tempMinistray: [],
      qtownstatus: null,
      qtownstatusboolean: false,
      pass: null,
      startplaces: null,
      ministrayTownship: null,
      // TOWNSHIPMINISTRAY:[],
      townshipministrayid: null,
      townshipministrayname: null,
      isOpenSuccessModel: false,

      ISERRORNAME: false,
      ISERRORNRCNUMBER: false,
      ISERRORVERICHAL: false,
      ISERRORPASSPORT: false,
      ISERRORSTARTPLACE: false,
      ISERRORENDPLACE: false,
      ISERRORNRCCODE: false,
      ISERRRORNRCSTATE: false,
      ISERRORSTARTCITY: false,
      ISERRORSTARTTOWNSHIP: false,
      ISERRRORENDTOWNSHIP: false,
      ISERRORNRCFRONT: false,
      ISERRORNRCBACK: false,
      // ISERRORSUPPORT: false,
      ISERRORMO: false,
      locale: null,
      modalVisible: false,
      isOpenCreateSuccessModel: false,
      designation: null,
      department: null,
      ministry_input: null,
      ISERRORDESIGNATION: false,
      ISERRORDEPARTMENT: false,
      ISERRORMINISTRYINPUT: false,
      selectedData: "0",
      isOpenCheckbox: false,
      to: 0,
      from: 0,
      isOpenCloseSuccessModel: false,
      isOpenFirstSuccessModal: false,
    };
    this.BackHandler = null;
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const res = await getLang();
    this.setState({ locale: res });
    this.setBackHandler();
    const access_token = await AsyncStorage.getItem("access_token");
    const loginID = await AsyncStorage.getItem("loginID");
    const userid = await AsyncStorage.getItem("userid");
    // this.focusListener = navigation.addListener("didFocus", async () => {
    //   await this._handleFirstCreat();
    // });
    // console.log(userid);
    this.setState({
      access_token: access_token,
      loginID: loginID,
      user_id: userid,
      usertype: { value: 0, label: t("people", this.state.locale) },
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

  //get city api
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
          var obj = { value: data.id.toString(), label: data.city };
          arr.push(obj);
        });
        self.setState({ CITY: arr, City: response.data.city });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  //get township api
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
          var obj = { value: data.id.toString(), label: data.township };
          arr.push(obj);
        });
        self.setState({
          TOWNSHIP: arr,
          Township: response.data.townships,
          township: {
            value: response.data.townships[0].id,
            label: response.data.townships[0].township,
          },
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  //get end township api
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
          var obj = { value: data.id.toString(), label: data.township };
          arr.push(obj);
        });
        self.setState({ ENDTOWNSHIP: arr });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  //get ministray api
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
          var obj = { value: data.id.toString(), label: data.ministry };
          arr.push(obj);
        });
        self.setState({ EDUCATION: arr, MINISTRAY: response.data.Ministry });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  //get nrc code api
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
          var obj = { value: data.id.toString(), label: data.nrc_code };
          arr.push(obj);
        });
        self.setState({ NRCCODE: arr });
      })
      .catch(function (err) {
        console.log("NRC Code Erro", err);
      });
  }

  //get nrc status api
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
          var obj = { value: data.id.toString(), label: data.nrc_type };
          arr.push(obj);
        });
        self.setState({ NRCSTATUS: arr });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  //get nrc state api
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
          var obj = { value: data.id.toString(), label: data.nrc_state };
          arr.push(obj);
        });
        self.setState({
          NRCSTATE: arr,
          nrcstate: {
            value: response.data.townships[0].id,
            label: response.data.townships[0].nrc_state,
          },
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  //handle township
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
            // console.log("Ministry", data);
            self.setState({
              townshipministrayname: data.township,
              townshipministrayid: data.id,
            });
          }
          // arr.push(obj);
        });
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

  //handle city
  _handleOnSelect(value, label) {
    if (value) {
      setTimeout(() => {
        var searchdata = this.searching(value);
        this.setState({ tempData: searchdata });
        this.setState({ qstatus: this.state.tempData[0].status });
        if (this.state.qstatus == 1) {
          this.setState({ qstatusboolean: true });
        }
        // console.log(this.state.qstatusboolean);
      }, 100);
    }
    // alert(value)
    this.setState({
      city: { value: value, label: label },
      ISERRORSTARTCITY: false,
    });
    this.getTownshipAll(value);
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

  //get handle end township api
  _handleOnSelectTownShip(value, label) {
    if (value) {
      setTimeout(() => {
        var searchdata = this.searchingTownship(value);
        this.setState({ tempTownship: searchdata });
        this.setState({ qtownstatus: this.state.tempTownship[0].status });
        if (this.state.qtownstatus == 1) {
          this.setState({ qtownstatusboolean: true });
        }
        // console.log("Q township",this.state.qtownstatusboolean);
      }, 100);
    }

    this.setState({
      township: { value: value, label: label },
      ISERRORSTARTTOWNSHIP: false,
    });
  }

  //handle nrc code
  _handleOnSelectNRCCode(value, label) {
    this.setState({
      nrccode: { value: value, label: label },
      ISERRORNRCCODE: false,
    });
    this.getAllNrcState(value);
  }

  //handle nrc state
  _handleOnSelectNRCState(value, label) {
    this.setState({
      nrcstate: { value: value, label: label },
      ISERRRORNRCSTATE: false,
    });
  }

  //handle nrc status
  _handleOnSelectNRCStatus(value, label) {
    this.setState({
      nrcstatus: { value: value, label: label },
    });
  }

  //handle usertype
  _handleOnSelectUserType(value, label) {
    this.setState({
      usertype: { value: value, label: label },
    });
  }

  //handle end township
  _handleOnSelectEndTownship(value, label) {
    this.setState({
      endtownship: { value: value, label: label },
      ISERRRORENDTOWNSHIP: false,
    });
  }

  searchingMinistray(word) {
    return this.state.MINISTRAY.filter((data) => {
      const ministry = data.id != null ? data.id : "";
      const ministrys = ministry.toString();
      return ministrys.toLowerCase().includes(word.toString().toLowerCase());
    });
  }

  //handle ministray
  _handleOnSelectEducation(value, label) {
    const self = this;
    if (value) {
      const searched = this.searchingMinistray(value);
      {
        searched.map((data, index) => {
          return this._handleMinistoryTownship(data.id);
        });
      }
    }
    self.setState({
      education: { value: value, label: label },
      address: label,
    });
  }

  //Create Api

  _handleSave() {
    let isError = false;
    if (this.state.startplaces == null) {
      // alert("Helo");
      this.setState({ ISERRORSTARTPLACE: true });
      isError = true;
    }
    if (this.state.showcheckbox == false) {
      if (this.state.addressText == null) {
        this.setState({ ISERRORENDPLACE: true });
        isError = true;
      }
    }

    if (this.state.township.value == null) {
      // alert("Helo");
      this.setState({ ISERRORSTARTTOWNSHIP: true });
      isError = true;
    }
    if (this.state.showcheckbox == false) {
      if (this.state.endtownship.value == null) {
        // alert("Helo");
        this.setState({ ISERRRORENDTOWNSHIP: true });
        isError = true;
      }
    }

    if (this.state.city.value == null) {
      // alert("Helo");
      this.setState({ ISERRORSTARTCITY: true });
      isError = true;
    }

    if (this.state.imagePath == null) {
      // alert("Helo");
      this.setState({ ISERRORNRCFRONT: true });
      isError = true;
    }

    if (this.state.imagePathNrcBack == null) {
      // alert("Helo");
      this.setState({ ISERRORNRCBACK: true });
      isError = true;
    }

    if (this.state.usertype.value == 1) {
      if (this.state.imagePathMo == null) {
        // alert("Helo");
        this.setState({ ISERRORMO: true });
        isError = true;
      }
    }

    if (!isError) {
      // alert("Hello");
      const self = this;
      self.setState({ modalVisible: true });
      const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + self.state.access_token,
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      const { imagePathNrcBack } = this.state;
      const { imagePath } = this.state;
      const { imagePathSupport } = this.state;
      const { imagePathMo } = this.state;

      formData.append("citizen_status", this.state.usertype.value);
      formData.append("userId", this.state.user_id);
      formData.append("name", this.state.name);
      formData.append("nrc_code_id", this.state.nrccode.value);
      formData.append("nrc_state_id", this.state.nrcstate.value);
      formData.append("nrc_type_id", this.state.nrcstatus.value);
      formData.append("nrc_no", this.state.nrcnumber);
      formData.append("phone_no", this.state.loginID);
      formData.append("vehicle_no", this.state.vehicle);
      formData.append("startcity_id", this.state.city.value);
      formData.append("starttownship_id", this.state.township.value);
      formData.append("start_place", this.state.startplaces);
      formData.append("designation", this.state.designation);
      formData.append("department", this.state.department);
      formData.append("ministry_input", this.state.ministry_input);
      formData.append("ministry_status", this.state.showcheckbox ? 1 : 0);
      formData.append("gender", this.state.selectedData);
      formData.append(
        "endPlace_id",
        this.state.endtownship.value
          ? this.state.endtownship.value
          : this.state.townshipministrayid
      );
      formData.append(
        "end_place",
        this.state.addressText ? this.state.addressText : this.state.address
      );
      if (imagePathNrcBack) {
        const uriPart = imagePathNrcBack.split(".");
        const fileExtension = uriPart[uriPart.length - 1];
        const fileName = imagePathNrcBack.substr(
          imagePathNrcBack.lastIndexOf("/") + 1
        );

        formData.append("nrc_back", {
          uri: imagePathNrcBack,
          name: fileName,
          type: `image/${fileExtension}`,
        });
      }
      if (imagePath) {
        const uriPart = imagePath.split(".");
        const fileExtension = uriPart[uriPart.length - 1];
        const fileName = imagePath.substr(imagePath.lastIndexOf("/") + 1);

        formData.append("nrc_front", {
          uri: imagePath,
          name: fileName,
          type: `image/${fileExtension}`,
        });
      }
      if (imagePathSupport) {
        const uriPart = imagePathSupport.split(".");
        const fileExtension = uriPart[uriPart.length - 1];
        const fileName = imagePathSupport.substr(
          imagePathSupport.lastIndexOf("/") + 1
        );

        formData.append("approved_photo", {
          uri: imagePathSupport,
          name: fileName,
          type: `image/${fileExtension}`,
        });
      }
      if (imagePathMo) {
        const uriPart = imagePathMo.split(".");
        const fileExtension = uriPart[uriPart.length - 1];
        const fileName = imagePathMo.substr(imagePathMo.lastIndexOf("/") + 1);

        formData.append("mo_photo", {
          uri: imagePathMo,
          name: fileName,
          type: `image/${fileExtension}`,
        });
      }
      formData.append("passport", this.state.pass);
      formData.append(
        "q_status",
        this.state.qstatus ? this.state.qstatus : this.state.qtownstatus
      );
      formData.append(
        "ministry_id",
        this.state.education.value ? this.state.education.value : null
      );
      console.log(formData);
      axios
        .post(CreateApi, formData, {
          headers,
        })
        .then(function (response) {
          console.log("Response", response.data);
          if (response.data.status == 1) {
            self.setState({
              // isOpenCheckbox: true,
              modalVisible: false,
              isOpenFirstSuccessModal: true,
            });
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (err) {
          console.log("Error", err);
          self.setState({ modalVisible: false });
        });
    }
  }


  _gotoStep(step) {
    let isError = false;
    if (this.state.name == null) {
      // alert("Helo");
      this.setState({ ISERRORNAME: true });
      isError = true;
    }
    if (this.state.usertype.value == 4) {
      if (this.state.pass == null) {
        this.setState({ ISERRORPASSPORT: true });
        isError = true;
      }
    }
    if (this.state.usertype.value == 0) {
      if (this.state.nrcnumber == null) {
        // alert("Helo");
        this.setState({ ISERRORNRCNUMBER: true });
        isError = true;
      }
    }
    if (this.state.usertype.value == 1) {
      if (this.state.nrcnumber == null) {
        // alert("Helo");
        this.setState({ ISERRORNRCNUMBER: true });
        isError = true;
      }
    }
    if (this.state.usertype.value == 2) {
      if (this.state.nrcnumber == null) {
        // alert("Helo");
        this.setState({ ISERRORNRCNUMBER: true });
        isError = true;
      }
    }
    if (this.state.usertype.value == 3) {
      if (this.state.nrcnumber == null) {
        // alert("Helo");
        this.setState({ ISERRORNRCNUMBER: true });
        isError = true;
      }
    }
    if (this.state.usertype.value == 1 || this.state.usertype.value == 3) {
      if (this.state.designation == null) {
        this.setState({ ISERRORDESIGNATION: true });
        isError = true;
      }
      // alert("Helo");
    }
    if (this.state.usertype.value == 1 || this.state.usertype.value == 3) {
      if (this.state.department == null) {
        this.setState({ ISERRORDEPARTMENT: true });
        isError = true;
      }
      // alert("Helo");
    }
    if (this.state.usertype.value == 1 || this.state.usertype.value == 3) {
      if (this.state.ministry_input == null) {
        this.setState({ ISERRORMINISTRYINPUT: true });
        isError = true;
      }
      // alert("Helo");
    }

    if (this.state.usertype.value == 0) {
      if (this.state.nrccode.value == null) {
        // alert("Helo");
        this.setState({ ISERRORNRCCODE: true });
        isError = true;
      }
    }
    if (this.state.usertype.value == 1) {
      if (this.state.nrccode.value == null) {
        // alert("Helo");
        this.setState({ ISERRORNRCCODE: true });
        isError = true;
      }
    }
    if (this.state.usertype.value == 2) {
      if (this.state.nrccode.value == null) {
        // alert("Helo");
        this.setState({ ISERRORNRCCODE: true });
        isError = true;
      }
    }
    if (this.state.usertype.value == 3) {
      if (this.state.nrccode.value == null) {
        // alert("Helo");
        this.setState({ ISERRORNRCCODE: true });
        isError = true;
      }
    }
    if (this.state.usertype.value == 0) {
      if (this.state.nrcstate.value == null) {
        // alert("Helo");
        this.setState({ ISERRRORNRCSTATE: true });
        isError = true;
      }
    }
    if (this.state.usertype.value == 1) {
      if (this.state.nrcstate.value == null) {
        // alert("Helo");
        this.setState({ ISERRRORNRCSTATE: true });
        isError = true;
      }
    }
    if (this.state.usertype.value == 2) {
      if (this.state.nrcstate.value == null) {
        // alert("Helo");
        this.setState({ ISERRRORNRCSTATE: true });
        isError = true;
      }
    }
    if (this.state.usertype.value == 3) {
      if (this.state.nrcstate.value == null) {
        // alert("Helo");
        this.setState({ ISERRRORNRCSTATE: true });
        isError = true;
      }
    }
    if (!isError) {
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
  }
  _onChangeCheckBox() {
    this.setState({
      showcheckbox: !this.state.showcheckbox,
    });
  }
  _handleCheck(samefrom, sameto) {
    // console.log("Same to",sameto,"Same from",samefrom);
    if (samefrom == 2 && sameto == null) {
      this.setState({
        name: null,
        nrccode: { value: null, label: null },
        // nrcstatus: { value: null, label: null },
        nrcstate: { value: null, label: null },
        // city: { value: null, label: null },
        // township: { value: null, label: null },
        endtownship: { value: null, label: null },
        townshipministrayid: null,
        showcheckbox: false,
        qstatusboolean: false,
        qtownstatusboolean: false,
        education: { value: null, label: null },
        nrcnumber: null,
        vehicle: null,
        // startplaces:null,
        address: null,
        addressText: null,
        imagePath: null,
        imagePathMo: null,
        imagePathNrcBack: null,
        passport: null,
        imagePathSupport: null,
        // isOpenSuccessModel: true,
        designation: null,
        department: null,
        ministry_input: null,
        isOpenCheckbox: false,
      });
      this._gotoStep(1);
    } else if (sameto == 1 && samefrom == null) {
      this.setState({
        name: null,
        nrccode: { value: null, label: null },
        // nrcstatus: { value: null, label: null },
        nrcstate: { value: null, label: null },
        city: { value: null, label: null },
        township: { value: null, label: null },
        // endtownship: { value: null, label: null },
        // townshipministrayid: null,
        // showcheckbox: false,
        qstatusboolean: false,
        qtownstatusboolean: false,
        // education: { value: null, label: null },
        nrcnumber: null,
        vehicle: null,
        startplaces: null,
        // address: null,
        // addressText: null,
        imagePath: null,
        imagePathMo: null,
        imagePathNrcBack: null,
        passport: null,
        imagePathSupport: null,
        // isOpenSuccessModel: true,
        designation: null,
        department: null,
        isOpenCheckbox: false,
        // ministry_input: null,
      });
      this._gotoStep(1);
    } else if (samefrom == 2 && sameto == 1) {
      this.setState({
        name: null,
        nrccode: { value: null, label: null },
        // nrcstatus: { value: null, label: null },
        nrcstate: { value: null, label: null },
        // city: { value: null, label: null },
        // township: { value: null, label: null },
        // endtownship: { value: null, label: null },
        // townshipministrayid: null,
        // showcheckbox: false,
        qstatusboolean: false,
        qtownstatusboolean: false,
        // education: { value: null, label: null },
        nrcnumber: null,
        vehicle: null,
        // startplaces:null,
        // address: null,
        // addressText: null,
        imagePath: null,
        imagePathMo: null,
        imagePathNrcBack: null,
        passport: null,
        imagePathSupport: null,
        // isOpenSuccessModel: true,
        designation: null,
        department: null,
        isOpenCheckbox: false,
        // ministry_input: null,
      });
      this._gotoStep(1);
    } else {
      this.setState({
        name: null,
        nrccode: { value: null, label: null },
        // nrcstatus: { value: null, label: null },
        nrcstate: { value: null, label: null },
        city: { value: null, label: null },
        township: { value: null, label: null },
        endtownship: { value: null, label: null },
        townshipministrayid: null,
        showcheckbox: false,
        qstatusboolean: false,
        qtownstatusboolean: false,
        education: { value: null, label: null },
        nrcnumber: null,
        vehicle: null,
        startplaces: null,
        address: null,
        addressText: null,
        imagePath: null,
        imagePathMo: null,
        imagePathNrcBack: null,
        passport: null,
        imagePathSupport: null,
        // isOpenSuccessModel: true,
        designation: null,
        department: null,
        isOpenCheckbox: false,
        ministry_input: null,
      });
      this._gotoStep(1);
    }
    //  this.props.navigation.navigate("CreateNew");
    // alert(samefrom);
    // this.props.navigation.navigate("CreateNew");
    // console.log("Sames to",this.state.to,"Same from",this.state.from);
    // this._handleClearState(samefrom,sameto);
    // alert(to);
  }
  // _handleClearState(samefrom,sameto){

  // }
  _handleOnChooseImage(image) {
    this.setState({ imagePath: image.uri, ISERRORNRCFRONT: false });
  }
  _handleOnChooseImageNrcBack(image) {
    this.setState({ imagePathNrcBack: image.uri, ISERRORNRCBACK: false });
  }
  _handleOnChooseImageSupport(image) {
    this.setState({ imagePathSupport: image.uri });
  }
  _handleOnChooseImageMo(image) {
    this.setState({ imagePathMo: image.uri, ISERRORMO: false });
  }

  handleOnChangeRadioValue(key, value) {
    // alert(value);
    switch (key) {
      case GENDER:
        this.setState({ selectedData: value });
        break;
    }
  }

  _changeImage() {
    if (this.state.usertype.value == 4) {
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
              <View style={{ flexDirection: "row" }}>
                <Text>{t("forising", this.state.locale)}</Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <ImgUploadBtn
                imagePath={this.state.imagePath}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
              <ErrorText
                errMessage={t("errorforigenphoto", this.state.locale)}
                isShow={this.state.ISERRORNRCFRONT}
                errText="required"
              />
            </View>
            <View style={{ width: "45%" }}>
              <View style={{ flexDirection: "row" }}>
                <Text>{t("visa", this.state.locale)}</Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <ImgUploadBtn
                imagePath={this.state.imagePathNrcBack}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
              <ErrorText
                errMessage={t("errorforigenvisaphoto", this.state.locale)}
                isShow={this.state.ISERRORNRCBACK}
                errText="required"
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>{t("support", this.state.locale)}</Text>
            <ImgUploadBtn
              imagePath={this.state.imagePathSupport}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
            />
            {/* <ErrorText
              errMessage={t("errorapprovephoto", this.state.locale)}
              isShow={this.state.ISERRORSUPPORT}
            /> */}
          </View>
        </View>
      );
    } else if (this.state.usertype.value == 1) {
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
              <View style={{ flexDirection: "row" }}>
                <Text>{t("nrcfront", this.state.locale)}</Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <ImgUploadBtn
                imagePath={this.state.imagePath}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
              <ErrorText
                errMessage={t("errornrcfrontphot", this.state.locale)}
                isShow={this.state.ISERRORNRCFRONT}
                errText="required"
              />
            </View>
            <View style={{ width: "45%" }}>
              <View style={{ flexDirection: "row" }}>
                <Text>{t("nrcback", this.state.locale)}</Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <ImgUploadBtn
                imagePath={this.state.imagePathNrcBack}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
              <ErrorText
                errMessage={t("errornrcbackphoto", this.state.locale)}
                isShow={this.state.ISERRORNRCBACK}
                errText="required"
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Text>{t("mo", this.state.locale)}</Text>
              <Text style={{ color: "red" }}>*</Text>
            </View>
            <ImgUploadBtn
              imagePath={this.state.imagePathMo}
              onChooseImage={this._handleOnChooseImageMo.bind(this)}
            />
            <ErrorText
              errMessage={t("errormohpoto", this.state.locale)}
              isShow={this.state.ISERRORMO}
              errText="required"
            />
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>{t("support", this.state.locale)}</Text>
            <ImgUploadBtn
              imagePath={this.state.imagePathSupport}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
            />
            {/* <ErrorText
              errMessage={t("errorapprovephoto", this.state.locale)}
              isShow={this.state.ISERRORSUPPORT}
            /> */}
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
              <View style={{ flexDirection: "row" }}>
                <Text>{t("religion", this.state.locale)}</Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <ImgUploadBtn
                imagePath={this.state.imagePath}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
              <ErrorText
                errMessage={t("errorbhikkhufrontphoto", this.state.locale)}
                isShow={this.state.ISERRORNRCFRONT}
                errText="required"
              />
            </View>
            <View style={{ width: "45%" }}>
              <View style={{ flexDirection: "row" }}>
                <Text>{t("retligionback", this.state.locale)}</Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <ImgUploadBtn
                imagePath={this.state.imagePathNrcBack}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
              <ErrorText
                errMessage={t("errorbhikkhubackphoto", this.state.locale)}
                isShow={this.state.ISERRORNRCBACK}
                errText="required"
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>{t("support", this.state.locale)}</Text>
            <ImgUploadBtn
              imagePath={this.state.imagePathSupport}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
            />
            {/* <ErrorText
              errMessage={t("errorapprovephoto", this.state.locale)}
              isShow={this.state.ISERRORSUPPORT}
            /> */}
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
              <View style={{ flexDirection: "row" }}>
                <Text>{t("nrcfront", this.state.locale)}</Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <ImgUploadBtn
                imagePath={this.state.imagePath}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
              <ErrorText
                errMessage={t("errornrcfrontphot", this.state.locale)}
                isShow={this.state.ISERRORNRCFRONT}
                errText="required"
              />
            </View>
            <View style={{ width: "45%" }}>
              <View style={{ flexDirection: "row" }}>
                <Text>{t("nrcback", this.state.locale)}</Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <ImgUploadBtn
                imagePath={this.state.imagePathNrcBack}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
              <ErrorText
                errMessage={t("errornrcbackphoto", this.state.locale)}
                isShow={this.state.ISERRORNRCBACK}
                errText="required"
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>{t("support", this.state.locale)}</Text>
            <ImgUploadBtn
              imagePath={this.state.imagePathSupport}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
            />
            {/* <ErrorText
              errMessage={t("errorapprovephoto", this.state.locale)}
              isShow={this.state.ISERRORSUPPORT}
            /> */}
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
              <View style={{ flexDirection: "row" }}>
                <Text>{t("nrcfront", this.state.locale)}</Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <ImgUploadBtn
                imagePath={this.state.imagePath}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
              <ErrorText
                errMessage={t("errornrcfrontphot", this.state.locale)}
                isShow={this.state.ISERRORNRCFRONT}
                errText="required"
              />
            </View>
            <View style={{ width: "45%" }}>
              <View style={{ flexDirection: "row" }}>
                <Text>{t("nrcback", this.state.locale)}</Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <ImgUploadBtn
                imagePath={this.state.imagePathNrcBack}
                onChooseImage={this._handleOnChooseImageNrcBack.bind(this)}
              />
              <ErrorText
                errMessage={t("errornrcbackphoto", this.state.locale)}
                isShow={this.state.ISERRORNRCBACK}
                errText="required"
              />
            </View>
          </View>
          <View style={{ width: "45%", marginTop: 10 }}>
            <Text>{t("support", this.state.locale)}</Text>
            <ImgUploadBtn
              imagePath={this.state.imagePathSupport}
              onChooseImage={this._handleOnChooseImageSupport.bind(this)}
            />
            {/* <ErrorText
              errMessage={t("errorapprovephoto", this.state.locale)}
              isShow={this.state.ISERRORSUPPORT}
            /> */}
          </View>
        </View>
      );
    }
  }

  _handleFirstCreat() {
    this.setState({
      isOpenCheckbox: true,
      isOpenFirstSuccessModal: false,
    });
    // alert(this.state.isOpenCheckbox);
  }
  render() {
    const gender = "";
    // console.log("Create", this.state.imagePath);
    // console.log("Ministray Township Name", this.state.townshipministrayname);
    // const USERTYPE = [
    //   { value: 0, label: t("people", this.state.locale) },
    //   { value: 1, label: t("goverment", this.state.locale) },
    //   { value: 2, label: t("bhikkhu", this.state.locale) },
    //   { value: 3, label: t("army", this.state.locale) },
    //   { value: 4, label: t("forigner", this.state.locale) },
    // ];
    return (
      <View style={{ flex: 1 }}>
        {this.state.showStepOne ? (
          <View style={{ flex: 1 }}>
            <Header
              name={t("createtitle", this.state.locale)}
              number="1"
              Onpress={() => this.props.navigation.navigate("Home")}
            />
            <View style={styles.constiner}>
              <KeyboardAvoidingView
                // behavior="padding"
                behavior={Platform.OS == "ios" ? "padding" : null}
                enabled
                // keyboardVerticalOffset={100}
                style={{ flex: 1 }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.text}>
                        {t("usertype", this.state.locale)}
                      </Text>
                      <Text style={{ color: "red" }}>*</Text>
                    </View>

                    <View style={{ marginTop: 10 }}>
                      <DropDown
                        // placeholder="ပြည်သူ"
                        optionsContainerWidth="95%"
                        value={this.state.usertype}
                        options={
                          this.state.locale == "MM" ? USERTYPE : USERTYPEENG
                        }
                        onSelect={(value, label) =>
                          this._handleOnSelectUserType(value, label)
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.secondContainer}>
                    {this.state.usertype.value == 2 ? (
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text}>
                          {t("Bhikkhuname", this.state.locale)}
                        </Text>
                        <Text style={{ color: "red" }}>*</Text>
                      </View>
                    ) : (
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text}>
                          {t("name", this.state.locale)}
                        </Text>
                        <Text style={{ color: "red" }}>*</Text>
                      </View>
                    )}

                    <TextInput
                      value={this.state.name}
                      style={styles.textInput}
                      placeholder={t("placeholdername", this.state.locale)}
                      onChangeText={(value) =>
                        this.setState({ name: value, ISERRORNAME: false })
                      }
                    />
                    <ErrorText
                      errMessage={t("errorname", this.state.locale)}
                      isShow={this.state.ISERRORNAME}
                      errText="required"
                    />
                  </View>

                  <View style={styles.secondContainer}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ paddingRight: 15 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.text}>
                            {t("gender", this.state.locale)}
                          </Text>
                          <Text style={{ color: "red" }}>*</Text>
                        </View>
                      </View>
                      <View>
                        <Radio
                          label={t("male", this.state.locale)}
                          active={this.state.selectedData == "0" ? true : false}
                          onPress={() =>
                            this.handleOnChangeRadioValue(GENDER, "0")
                          }
                        />
                      </View>
                      <View>
                        <Radio
                          label={t("female", this.state.locale)}
                          active={this.state.selectedData == "1" ? true : false}
                          onPress={() =>
                            this.handleOnChangeRadioValue(GENDER, "1")
                          }
                        />
                      </View>
                    </View>
                  </View>

                  {this.state.usertype.value == 4 ? (
                    <View style={styles.secondContainer}>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text}>
                          {t("forino", this.state.locale)}
                        </Text>
                        <Text style={{ color: "red" }}>*</Text>
                      </View>

                      <TextInput
                        style={styles.textInput}
                        value={this.state.pass}
                        onChangeText={(value) =>
                          this.setState({ pass: value, ISERRORPASSPORT: false })
                        }
                      />
                      <ErrorText
                        errMessage={t("errorforigenno", this.state.locale)}
                        isShow={this.state.ISERRORPASSPORT}
                        errText="required"
                      />
                    </View>
                  ) : (
                    <View style={styles.secondContainer}>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text}>
                          {t("nrcno", this.state.locale)}
                        </Text>
                        <Text style={{ color: "red" }}>*</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                        }}
                      >
                        <View style={{ width: "20%" }}>
                          <DropDown
                            placeholder={t(
                              "placeholdernrccode",
                              this.state.locale
                            )}
                            value={this.state.nrccode}
                            optionsContainerWidth="33%"
                            options={this.state.NRCCODE}
                            onSelect={(value, label) =>
                              this._handleOnSelectNRCCode(value, label)
                            }
                          />
                          <ErrorText
                            errMessage={t("errornrccode", this.state.locale)}
                            isShow={this.state.ISERRORNRCCODE}
                            errText="required"
                          />
                        </View>
                        <View style={{ width: "50%" }}>
                          <DropDown
                            placeholder="NRC State"
                            optionsContainerWidth="65%"
                            value={this.state.nrcstate}
                            options={this.state.NRCSTATE}
                            onSelect={(value, label) =>
                              this._handleOnSelectNRCState(value, label)
                            }
                          />
                          <ErrorText
                            errMessage={t("errornrcstate", this.state.locale)}
                            isShow={this.state.ISERRRORNRCSTATE}
                            errText="required"
                          />
                        </View>
                        <View style={{ width: "25%" }}>
                          <DropDown
                            placeholder="နိုင်"
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
                            placeholder={t(
                              "placeholdernrcnumber",
                              this.state.locale
                            )}
                            onChangeText={(value) =>
                              this.setState({
                                nrcnumber: value,
                                ISERRORNRCNUMBER: false,
                              })
                            }
                          />
                          <ErrorText
                            errMessage={t("errornrcnumber", this.state.locale)}
                            isShow={this.state.ISERRORNRCNUMBER}
                            errText="required"
                          />
                        </View>
                      </View>
                    </View>
                  )}

                  {this.state.usertype.value == 1 ||
                  this.state.usertype.value == 3 ? (
                    <View>
                      <View style={styles.secondContainer}>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.text}>
                            {t("designation", this.state.locale)}
                          </Text>
                          <Text style={{ color: "red" }}>*</Text>
                        </View>
                        <TextInput
                          style={styles.textInput}
                          value={this.state.designation}
                          onChangeText={(value) =>
                            this.setState({
                              designation: value,
                              ISERRORDESIGNATION: false,
                            })
                          }
                        />
                        <ErrorText
                          errMessage={t("errordesignation", this.state.locale)}
                          isShow={this.state.ISERRORDESIGNATION}
                          errText="required"
                        />
                      </View>
                      <View style={styles.secondContainer}>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.text}>
                            {t("department", this.state.locale)}
                          </Text>
                          <Text style={{ color: "red" }}>*</Text>
                        </View>
                        <TextInput
                          style={styles.textInput}
                          value={this.state.department}
                          onChangeText={(value) =>
                            this.setState({
                              department: value,
                              ISERRORDEPARTMENT: false,
                            })
                          }
                        />
                        <ErrorText
                          errMessage={t("errordepartment", this.state.locale)}
                          isShow={this.state.ISERRORDEPARTMENT}
                          errText="required"
                        />
                      </View>
                      <View style={styles.secondContainer}>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.text}>
                            {t("ministry_name", this.state.locale)}
                          </Text>
                          <Text style={{ color: "red" }}>*</Text>
                        </View>
                        <TextInput
                          style={styles.textInput}
                          value={this.state.ministry_input}
                          onChangeText={(value) =>
                            this.setState({
                              ministry_input: value,
                              ISERRORMINISTRYINPUT: false,
                            })
                          }
                        />
                        <ErrorText
                          errMessage={t(
                            "errorministryinput",
                            this.state.locale
                          )}
                          isShow={this.state.ISERRORMINISTRYINPUT}
                          errText="required"
                        />
                      </View>
                    </View>
                  ) : null}

                  <View style={styles.secondContainer}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.text}>
                        {t("phone", this.state.locale)}
                      </Text>
                      <Text style={{ color: "red" }}>*</Text>
                    </View>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.loginID}
                      editable={false}
                    />
                  </View>
                  <View style={styles.secondContainer}>
                    {/* <View style={{ flexDirection: "row" }}> */}
                    <Text style={styles.text}>
                      {t("vehical", this.state.locale)}
                    </Text>
                    {/* <Text style={{ color: "red" }}>*</Text>
                    </View> */}
                    <TextInput
                      value={this.state.vehicle}
                      style={styles.textInput}
                      placeholder="7K/1234"
                      onChangeText={(value) =>
                        this.setState({
                          vehicle: value,
                          // ISERRORVERICHAL: false,
                        })
                      }
                    />
                    {/* <ErrorText
                      errMessage="ယာဉ်နံပါတ်ထည့်ပေးပါရန်"
                      isShow={this.state.ISERRORVERICHAL}
                    /> */}
                  </View>
                  <TouchableOpacity
                    style={styles.touchBtn}
                    onPress={() => this._gotoStep(2)}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {t("gotostep", this.state.locale)}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.footer}>
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                      1 of 2
                    </Text>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
              {/* </KeyboardAvoidingView>
              </ScrollView> */}
            </View>
          </View>
        ) : null}

        {this.state.showStepTwo ? (
          <View style={{ flex: 1 }}>
            <Header
              name={t("createtitle", this.state.locale)}
              number="2"
              Onpress={() => this._gotoStep(1)}
            />
            <View style={styles.constiner}>
              <KeyboardAvoidingView
                // behavior="padding"
                behavior={Platform.OS == "ios" ? "padding" : null}
                enabled
                // keyboardVerticalOffset={100}
                style={{ flex: 1 }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View>
                    <View tyle={styles.secondContainer}>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text}>
                          {t("startcity", this.state.locale)}
                        </Text>
                        <Text style={{ color: "red" }}>*</Text>
                      </View>
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
                          <ErrorText
                            errMessage={t("errorcity", this.state.locale)}
                            isShow={this.state.ISERRORSTARTCITY}
                            errText="required"
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
                          <ErrorText
                            errMessage={t("errortownship", this.state.locale)}
                            isShow={this.state.ISERRORSTARTTOWNSHIP}
                            errText="required"
                          />
                        </View>
                      </View>
                      <TextInput
                        style={[styles.textInput]}
                        placeholder={t("placeholderaddress", this.state.locale)}
                        value={this.state.startplaces}
                        onChangeText={(value) =>
                          this.setState({
                            startplaces: value,
                            ISERRORSTARTPLACE: false,
                          })
                        }
                      />
                      <ErrorText
                        errMessage={t("erroraddress", this.state.locale)}
                        isShow={this.state.ISERRORSTARTPLACE}
                        errText="required"
                      />
                    </View>
                    <View tyle={styles.secondContainer}>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text}>
                          {t("endplace", this.state.locale)}
                        </Text>
                        <Text style={{ color: "red" }}>*</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        {this.state.showcheckbox ? (
                          <View style={{ flexDirection: "row" }}>
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
                                  // flexDirection:"row"
                                }}
                              >
                                <Image
                                  source={require("@images/true.png")}
                                  style={{ width: 20, height: 20 }}
                                />
                              </View>
                              {/* <View style={{ justifyContent: "center" }}>
                              <Text>{t("ministray", this.state.locale)}</Text>
                            </View> */}
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                              onPress={() => this._onChangeCheckBox()}
                              style={{ marginTop: 5 }}
                            >
                              <View
                                style={{
                                  width: 25,
                                  height: 25,
                                  borderWidth: 1,
                                }}
                              />
                            </TouchableOpacity>
                            <View style={{ justifyContent: "center" }}>
                              <Text style={{ paddingLeft: 10 }}>
                                {t("ministray", this.state.locale)}
                              </Text>
                            </View>
                          </View>
                        )}

                        {this.state.showcheckbox ? (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View style={{ justifyContent: "center" }}>
                              <Text>{t("ministray", this.state.locale)}</Text>
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
                      {this.state.showcheckbox ? (
                        <View style={{ marginTop: 10 }}>
                          <TextInput
                            style={[styles.textInput]}
                            value={this.state.townshipministrayname}
                          />
                        </View>
                      ) : (
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
                          <ErrorText
                            errMessage={t("errortownship", this.state.locale)}
                            isShow={this.state.ISERRRORENDTOWNSHIP}
                            errText="required"
                          />
                        </View>
                      )}

                      {this.state.showcheckbox ? (
                        <TextInput
                          style={[styles.textInput]}
                          value={this.state.address}
                          placeholder={t(
                            "placeholderaddress",
                            this.state.locale
                          )}
                          // onChangeText={(value) =>
                          //   this.setState({ endplace: value })
                          // }
                        />
                      ) : (
                        <View>
                          <TextInput
                            style={[styles.textInput]}
                            value={this.state.addressText}
                            placeholder={t(
                              "placeholderaddress",
                              this.state.locale
                            )}
                            onChangeText={(value) =>
                              this.setState({
                                addressText: value,
                                ISERRORENDPLACE: false,
                              })
                            }
                          />
                          <ErrorText
                            errMessage={t("erroraddress", this.state.locale)}
                            isShow={this.state.ISERRORENDPLACE}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                  {this._changeImage()}

                  <View
                    style={{
                      // flexDirection: "row",
                      // justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
          
                    <TouchableOpacity
                      style={[styles.touchBtn]}
                      onPress={() => this._handleSave()}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        {t("save", this.state.locale)}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.footer}>
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                      2 of 2
                    </Text>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
              <View>
                <LoadingModal isOpenModal={this.state.modalVisible} />
              </View>
              {/* <CreateSuccessModal
                isOpen={this.state.isOpenSuccessModel}
                text="အသစ်ထပ်ထည့်လိုပါသလား ?"
                OnPressNo={() => this._handleNo()}
                OnPressYes={() => this._handleSave()}
              /> */}
              <CreateFirstSuccessModal
                isOpen={this.state.isOpenFirstSuccessModal}
                text="လူအသစ်ထည့်လိုပါသလား?"
                handleEntry={() => this._handleFirstCreat()}
                handleNoEntry={() => this.props.navigation.navigate("Home")}
              />
              <CreateCheckbox
                isOpen={this.state.isOpenCheckbox}
                onClose={() => this.props.navigation.navigate("Home")}
                handleCheck={(samefromcount, tocount) =>
                  this._handleCheck(samefromcount, tocount)
                }
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
    flex: 1,
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
