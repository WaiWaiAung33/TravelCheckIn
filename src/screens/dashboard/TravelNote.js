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
import TravelNoteCard from "@components/TravelNoteCard";
import Header from "@components/Header";
import Loading from "@components/Loading";
//import styles
import Style from "@styles/Styles";
const { width, height } = Dimensions.get("window");

//import api
const axios = require("axios");
import { RegisterHistoryApi } from "@api/Url";
import TravelNoteApi from "@api/TravelNoteApi";

const STATUS = [
  { value: "1", label: "လာရောက်ခွင့်ပြုသည်" },
  { value: "2", label: "လာရောက်ခွင့်ပြုသည်သို့သော်Qဝင်ရမည်" },
  { value: "3", label: "စောင့်ကြည့်ခံရမည်" },
  { value: "4", label: "လက်ခံသည်" },
  { value: "5", label: "ပြင်ဆင်ရန်" },
];
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
      qstatus: null,
    };
    this.BackHandler = null;
    this.page = 1;
    this.TravelNoteApi = new TravelNoteApi();
  }
  async componentDidMount() {
    const { navigation } = this.props;
    // this.focusListener = navigation.addListener("didFocus", async () => {
    //   await this.getAllTravelNote(this.page);
    // });
    this.setBackHandler();
    this._getNewDate();
    await this.getAllTravelNote(this.page);
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
  _getNewDate(){
    var today = new Date();
    var dd = today.getDate();
    
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = dd+'-'+mm+'-'+yyyy;
    this.setState({
      changestartDate:today,
      changeendDate:today
    })
  }

  getAllTravelNote = async (page) => {
    // console.log(getCustomersapi);
    if (this.state.isSearched) {
      this.setState({
        data: [],
        isSearched: false,
      });
    }
    var access_token = await AsyncStorage.getItem("access_token");
    var user_id = await AsyncStorage.getItem("userid");
    var self = this;
    let bodyParam = {
      start_date:self.state.changestartDate,
      end_date:self.state.changeendDate,
      page: page,
      userId: user_id,
      status: "all",
    };
    axios
      .post(RegisterHistoryApi, bodyParam, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data.history.data);
        self.setState({
          data: [...self.state.data, ...response.data.history.data],
          refreshing: false,
          // statusname:response.data.history.data.status,
          // qstatus:response.data.history.data.q_status,
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

  _handleOnSelect(value, label) {
    this.setState({
      status: { value: value, label: label },
    });
  }
  onRefresh = () => {
    this.setState({
      data: [],
      refreshing: false, // start top loading
    });
    this.page = 1;
    this.getAllTravelNote(this.page);
  };

  renderFilter() {
    return (
      <View>
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
            onDateChange={(date) => this.setState({ changestartDate: date })}
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
            onDateChange={(date) => this.setState({ changeendDate: date })}
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
          <View style={{ width: "65%" }}>
            <DropDown
              value={this.state.status}
              options={STATUS}
              optionsContainerWidth="60%"
              onSelect={(value, label) => this._handleOnSelect(value, label)}
            />
          </View>
          <View style={{ width: "30%" }}>
            <TouchableOpacity style={styles.touchBtn}>
              <Image source={require("@images/search.png")} />
              <Text style={styles.text}>Search</Text>
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
    // console.log(item);
    if (arrIndex == 1 && item.status == 2) {
      this.props.navigation.navigate("Edit",{userid:item.id});
    } 
    else if (arrIndex == 1 && item.status == 1) {
      this.props.navigation.navigate("TravelQr",{data:item});
    }
    else if(arrIndex == 1) {
       this.props.navigation.navigate("TravelNoteDetail", { userid: item.id });
    }
  }

  render() {
    // console.log(this.state.changeendDate);
 
    // console.log(today);
    if (this.state.isLoading) {
      return <Loading />;
    }
    const { isSearched, data, searchTravel } = this.state;
    const dataList = isSearched ? searchTravel : data;
    // console.log(data);

    return (
      <View style={styles.container}>
        <Header
          name="ခရီးသွားမှတ်တမ်းများ"
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
              <TravelNoteCard
                name={item.name}
                date={Moment(item.created_at).format("DD-MM-YYYY")}
                phone={item.ph_no}
                passportNo={item.passport}
                nrcstatus={item.citizen_status}
                statusname={item.status}
                q_statusColor={item.q_status}
                nrc={
                  (item.nrc_code +
                  "/" +
                  item.nrc_state +
                  "(" +
                  item.nrc_type +
                  ")" +
                  item.nrc_no)
                }
                OnPress={() => this._handleTravelNoteDetail(1, item)}
                arrIndex={1}
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
