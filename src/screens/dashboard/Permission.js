import React from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  AsyncStorage,
} from "react-native";
import DatePicker from "react-native-datepicker";
import Moment from "moment";
//import components
import DropDown from "@components/DropDown";
import TravelPermissionCard from "@components/TravelPermissionCard";
import Header from "@components/Header";
import Loading from "@components/Loading";
import Checkbox from "@components/CancelCheckbox";
import SuccessModal from "@components/SuccessModal";
//import styles
import Style from "@styles/Styles";
const { width, height } = Dimensions.get("window");

//import api
const axios = require("axios");
import { RegisterHistoryApi, DelteApi } from "@api/Url";
import TravelNoteApi from "@api/TravelNoteApi";

//import services
import { t, getLang } from "@services/Localization";

var user_status = "all";
var qstatus = 0;
var arr = [];
export default class TravelNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: { value: null, label: null },
      isLoading: false,
      refreshing: false,
      isFooterLoading: false,
      data: [],
      tempData: [],
      searchTravel: [],
      isSearched: false,
      arrIndex: null,
      changestartDate: null,
      changeendDate: null,
      statusname: null,
      qStatus: 0,
      usertype: "",
      locale: null,
      user_id: null,
      access_token: null,
      check: false,
      deletealert: false,
      id: null,
      isOpenSuccessModel: false,
      array: [],
    };
    this.BackHandler = null;
    this.page = 1;
    this.TravelNoteApi = new TravelNoteApi();
  }
  async componentDidMount() {
    const { navigation } = this.props;
    const res = await getLang();
    this.setState({ locale: res });
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this._getNewDate();
    });
    const userid = await AsyncStorage.getItem("userid");
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({
      user_id: userid,
      access_token: access_token,
      // status: { value: 0, label:t("all",this.state.locale) },
    });
    this.setBackHandler();
    await this._getNewDate();
    await this.getAllTravelNote(this.page);
    // await this._hadleChangeUserType();
    // this.setState({isLoading:true})
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
  async _getNewDate() {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = dd + "-" + mm + "-" + yyyy;
    this.setState({
      changestartDate: today,
      changeendDate: today,
    });
  }

  getAllTravelNote = async (page) => {
    // alert(this.state.changestartDate);
    // console.log(getCustomersapi);
    if (this.state.isSearched) {
      this.setState({
        data: [],
        isSearched: false,
      });
    }
    var access_token = await AsyncStorage.getItem("access_token");
    var user_id = await AsyncStorage.getItem("userid");
    // console.log(user_id);
    var self = this;
    let bodyParam = {
      start_date: self.state.changestartDate,
      end_date: self.state.changeendDate,
      page: page,
      userId: user_id,
      status: "allow_disallow",
      q_status: 0,
      //   q_status: self.state.qStatus,
    };
    axios
      .post(RegisterHistoryApi, bodyParam, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then(function (response) {
        console.log(response.data.history.data);
        self.setState({
          data: [...self.state.data, ...response.data.history.data],
          refreshing: false,
          // statusname:response.data.history.data.status,
          // qStatus:response.data.history.data.q_status,
          isLoading: false,
          isFooterLoading: false,
          tempData: response.data.history.data,
        });
      })
      .catch(function (err) {
        // alert("Error");
        self.setState({
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
        });
        // console.log("Customer Error", err);
      });
  };

  _handleSearch(page, status, statusid, startdate, enddate) {
    // alert(status);
    this.state.data = [];
    const self = this;
    self.setState({ isSearched: true });
    let bodyParam = {
      userId: self.state.user_id,
      status: status,
      start_date: startdate,
      end_date: enddate,
      page: page,
      q_status: statusid,
    };
    // console.log("bodyParam", RegisterHistoryApi);
    axios
      .post(RegisterHistoryApi, bodyParam, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data.history.data);
        self.setState({
          data: [...self.state.data, ...response.data.history.data],
          // searchTravel: response.data.history.data,
        });
      })
      .catch(function (err) {
        // alert("Error");
        self.setState({
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
        });
        // console.log("Customer Error", err);
      });
  }
  _hadleChangeUserType(status) {
    // alert(status);
    if (status == 0) {
      user_status = "allow_disallow";
      qstatus = 0;
      // alert(status);
      // this.setState({
      //   usertype:status,
      //   qStatus: 0,
      // });
      this._handleSearch(
        this.page,
        "allow_disallow",
        0,
        this.state.changestartDate,
        this.state.changeendDate
      );
      // alert(this.state.usertype);
      //  this.getAllTravelNote(this.page)
    } else if (status == 2) {
      // this.setState({
      //   usertype: "1",
      //   qStatus: 0,
      // });
      user_status = 1;
      qstatus = 0;
      this._handleSearch(
        this.page,
        1,
        0,
        this.state.changestartDate,
        this.state.changeendDate
      );
      //  this.getAllTravelNote(this.page)
    } else if (status == 1) {
      // this.setState({
      //   usertype: "2",
      //   qStatus: 0,
      // });
      user_status = 0;
      qstatus = 0;
      this._handleSearch(
        this.page,
        0,
        0,
        this.state.changestartDate,
        this.state.changeendDate
      );
      //  this.getAllTravelNote(this.page)
    } else if (status == 3) {
      // this.setState({
      //   usertype: "3",
      //   qStatus: 0,
      // });
      user_status = 2;
      qstatus = 0;
      this._handleSearch(
        this.page,
        2,
        0,
        this.state.changestartDate,
        this.state.changeendDate
      );
      //  this.getAllTravelNote(this.page)
    } else if (status == 4) {
      // this.setState({
      //   usertype: "3",
      //   qStatus: 1,
      // });
      user_status = 4;
      qstatus = 1;
      this._handleSearch(
        this.page,
        4,
        0,
        this.state.changestartDate,
        this.state.changeendDate
      );
      //  this.getAllTravelNote(this.page)
    } else if (status == 5) {
      // this.setState({
      //   usertype: "4",
      //   qStatus: 0,
      // });
      user_status = 5;
      qstatus = 0;
      this._handleSearch(
        this.page,
        5,
        0,
        this.state.changestartDate,
        this.state.changeendDate
      );
      //  this.getAllTravelNote(this.page)
    }
    // alert("Status"+status+"qStatus"+this.state.qStatus)
  }

  _handleOnSelect(value, label) {
    // alert(value);
    this.setState({
      status: { value: value, label: label },
    });
    this._hadleChangeUserType(value);
  }
  onRefresh = () => {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = dd + "-" + mm + "-" + yyyy;
    this.setState({
      data: [],
      refreshing: true,
      status: { value: "0", label: t("all", this.state.locale) },
      changestartDate: today,
      changeendDate: today,
    });
    this.page = 1;
    this.getAllTravelNote(this.page);
  };
  _hadleChangeDate(date) {
    this._handleSearch(
      this.page,
      user_status,
      qstatus,
      date,
      this.state.changeendDate
    );
    this.setState({ changestartDate: date });

    //  this.getAllTravelNote(this.page)

    // alert(this.state.changestartDate)
  }
  _handleChangeEndDate(date) {
    this._handleSearch(
      this.page,
      user_status,
      qstatus,
      this.state.changestartDate,
      date
    );
    this.setState({ changeendDate: date });
  }

  _handleCheck(check, itemid) {
    // console.log(arr);

    //  console.log("Item Id",itemid);
    if (check == true) {
      arr.push(itemid);
      // console.log(arr);
      // this._handleDelete(arr);
      this.setState({ deletealert: true });
    } else {
      this.setState({ deletealert: false });
    }
  }

  _handleDelete() {
    // console.log(this.state.array);
    const array = this.state.array;
    // console.log(array);

    const self = this;
    let bodyParam = {
      formId: arr,
    };
    // console.log(bodyParam);
    axios
      .post(DelteApi, bodyParam, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        if (response.data.status == 1) {
          self.setState({ isOpenSuccessModel: true });
        }
        console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
    // console.log(this.state.id);
  }

  renderFilter() {
    const STATUS = [
      { value: 0, label: "အားလုံး" },
      { value: 1, label: "လျှောက်လွှာတင်ထားသည်" },
      { value: 2, label: "လာရောက်ခွင့်ပြုသည်" },
      { value: 3, label: "ပြင်ဆင်ရန်" },
      { value: 4, label: "လျှောက်လွှာပယ်ဖျက်သည်" },
      { value: 5, label: "လာရောက်ခွင့်မပြုပါ" },
    ];

    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Text style={{ flex: 1 }}>{t("startdate", this.state.locale)}</Text>
          <Text style={{ flex: 1, paddingLeft: 15 }}>
            {t("enddate", this.state.locale)}
          </Text>
        </View>
        <View style={styles.secondContainer}>
          <DatePicker
            date={this.state.changestartDate}
            mode="date"
            format="DD-MM-YYYY"
            // maxDate={Moment().endOf("day").toDate()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require("@images/calendar.png")}
            style={Style.datePickerContainer}
            customStyles={{
              dateIcon: Style.datePickerDateIcon,
              dateInput: Style.datePickerDateInput,
              dateText: Style.datePickerDateText,
            }}
            onDateChange={(date) => this._hadleChangeDate(date)}
          />
          <DatePicker
            date={this.state.changeendDate}
            mode="date"
            format="DD-MM-YYYY"
            maxDate={Moment().endOf("day").toDate()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require("@images/calendar.png")}
            style={Style.datePickerContainer}
            customStyles={{
              dateIcon: Style.datePickerDateIcon,
              dateInput: Style.datePickerDateInput,
              dateText: Style.datePickerDateText,
            }}
            onDateChange={(date) => this._handleChangeEndDate(date)}
          />
        </View>
        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "75%" }}>
            <DropDown
              value={this.state.status}
              options={STATUS}
              optionsContainerWidth="70%"
              onSelect={(value, label) => this._handleOnSelect(value, label)}
            />
          </View>
          <View
            style={{
              width: "25%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => this._handleDelete()}>
              <Image source={require("@images/delete.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading
    if (this.state.isFooterLoading) {
      return <ActivityIndicator size="large" style={{ color: "#000" }} />;
    } else {
      return null;
    }
  };

  //retrieve More data
  handleLoadMore = () => {
    this.setState({ isFooterLoading: true }); // Start Footer loading
    this.page = this.page + 1; // increase page by 1
    this.getAllTravelNote(this.page); // method for API call
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          // backgroundColor: "#607D8B",
        }}
      />
    );
  };
  _handleTravelNoteDetail(arrIndex, item) {
    // alert(item.status);
    // console.log(item);
    if (arrIndex == 1 && item.status == 2) {
      this.props.navigation.navigate("Edit", { userid: item.id });
    } else if (arrIndex == 1 && item.status == 1) {
      this.props.navigation.navigate("TravelQr", { data: item });
    } else if (arrIndex == 1) {
      this.props.navigation.navigate("TravelNoteDetail", {
        userid: item.id,
        backRoute: "Permission",
      });
    }
  }
  _handleClose() {
    this.setState({
      isOpenSuccessModel: false,
    });
    this.props.navigation.navigate("Home");
  }

  render() {
    // alert(this.state.check);
    if (this.state.isLoading) {
      return <Loading />;
    }
    var { isSearched, data } = this.state;
    // var dataList = isSearched ? searchTravel : data;
    var dataList = data;

    // console.log(data);

    return (
      <View style={styles.container}>
        <Header
          name="ခွင့်ပြု/မပြု"
          Onpress={() => this.props.navigation.navigate("Home")}
        />
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataList}
          // extraData={this.state}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => (
            // console.log(item),
            <View style={{ marginTop: 5 }}>
              <TravelPermissionCard
                name={item.name}
                date={Moment(item.created_at).format("DD-MM-YYYY")}
                phone={item.ph_no}
                passportNo={item.passport}
                nrcstatus={item.citizen_status}
                statusname={item.status}
                checkBox={
                  <Checkbox
                    isCheck={this.state.check}
                    langText="Checked"
                    onCheck={(isCheck) => this._handleCheck(isCheck, item.id)}
                  />
                }
                q_statusColor={item.q_status}
                nrc={
                  item.nrc_code +
                  "/" +
                  item.nrc_state +
                  "(" +
                  item.nrc_type +
                  ")" +
                  item.nrc_no
                }
                OnPress={() => this._handleTravelNoteDetail(1, item)}
                arrIndex={1}
                check={this.state.check}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={this.renderFilter.bind(this)}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          onEndReached={() => (!isSearched ? this.handleLoadMore() : {})}
        />
        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text={t("cancelsuccess",this.state.locale)}
          onClose={() => this._handleClose()}
          // OnPressNo={() => this._handleNo()}
          // OnPressYes={() => this._handleSave()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondContainer: {
    marginTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 10,
  },
  touchBtn: {
    backgroundColor: "#308DCC",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
  },
  text: {
    color: "white",
  },
});
