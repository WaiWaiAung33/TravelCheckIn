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
  Dimensions
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
const {width,height} = Dimensions.get("window");

const STATUS = [
  { value: "1", label: "လာရောက်ခွင့်ပြုသည်" },
  { value: "2", label: "လာရောက်ခွင့်ပြုသည်သို့သော်Qဝင်ရမည်" },
  { value: "3", label: "စောင့်ကြည့်ခံရမည်" },
  { value: "4", label: "လက်ခံသည်" },
  { value: "5", label: "ပြင်ဆင်ရန်" },
];
const DATA = [
  {
    name: "လှလှ",
    nrc: "7/KhaThaKha(N)123456",
    phone: "09451237884",
    status: "လာရောက်ခွင့်ပြုသည်",
    colors: "#308DCC",
  },
  {
    name: "မြမြ",
    nrc: "7/KhaThaKha(N)111111",
    phone: "094512414141",
    status: "လာရောက်ခွင့်ပြုသည်သို့သော်Qဝင်ရမည်",
    colors: "#EB4D4D",
  },
  {
    name: "ထွန်းထွန်း",
    nrc: "7/KhaThaKha(N)222222",
    phone: "09684554545",
    status: "လက်ခံသည်",
    colors: "#25DF31",
  },
  {
    name: "ထွန်းထွန်း",
    nrc: "7/KhaThaKha(N)222222",
    phone: "09684554545",
    status: "ပြင်ဆင်ရန်",
    colors: "#FFC65D",
  },
  {
    name: "ထွန်းထွန်း",
    nrc: "7/KhaThaKha(N)222222",
    phone: "09684554545",
    status: "စောင့်ကြည့်ခံရမည်",
    colors: "#EB4D4D",
    backColor:"#EB4D4D",
    borderColor:"#EB4D4D",
    textColor:"white"
  },
];
export default class TravelNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: { value: null, label: null },
      isLoading: false,
      refreshing: false,
      isFooterLoading: false,
    };
    this.BackHandler = null;
  }
  async componentDidMount() {
    this.setBackHandler();
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
  _handleOnSelect(value, label) {
    this.setState({
      status: { value: value, label: label },
    });
  }
  onRefresh = () => {
    this.setState({
      refreshing: true, // start top loading
    });
  };

  renderFilter() {
    return (
      <View>
        <View style={styles.secondContainer}>
          <DatePicker
            date="1/1/2020"
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
            // onDateChange={(date) => this.setState({ changeDate: date })}
          />
          <DatePicker
            date="1/1/2020"
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
            // onDateChange={(date) => this.setState({ changeDate: date })}
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

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <View style={styles.container}>
        <Header
          name="ခရီးသွားမှတ်တမ်းများ"
          Onpress={() => this.props.navigation.navigate("Home")}
        />
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA}
          // extraData={this.state}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => (
            <View style={{ marginTop: 5 }}>
              <TravelNoteCard
                name={item.name}
                date="1/1/2020"
                phone={item.phone}
                status={item.status}
                nrc={item.nrc}
                colors={item.colors}
                backColor={item.backColor ? item.backColor :null}
                borderColor={item.borderColor ? item.borderColor :null}
                textColor={item.textColor ? item.textColor :null}
                OnPress={() => this.props.navigation.navigate("ToleGate")}
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
          // onEndReached={() => (!isSearched ? this.handleLoadMore() : {})}
        />

        {/* <TravelNoteCard
            name="လှလှ"
            date="1/1/2020"
            phone="0912345678"
            status="လာရောက်ခွင့်ပြုသည်"
            nrc="1/1/2020"
            colors="#308DCC"
            OnPress={() => this.props.navigation.navigate("ToleGate")}
          />
          <TravelNoteCard
            name="လှလှ"
            date="1/1/2020"
            phone="0912345678"
            status="လာရောက်ခွင့်ပြုသည်သို့သော်Qဝင်ရမည်"
            nrc="1/1/2020"
            colors="#EB4D4D"
            OnPress={() => this.props.navigation.navigate("ToleGate")}
          />
         
          <TravelNoteCard
            name="လှလှ"
            date="1/1/2020"
            phone="0912345678"
            status="လက်ခံသည်"
            nrc="1/1/2020"
            colors="#25DF31"
            OnPress={() => this.props.navigation.navigate("TravelNoteDetail")}
          />
          <TravelNoteCard
            name="လှလှ"
            date="1/1/2020"
            phone="0912345678"
            status="ပြင်ဆင်ရန်"
            nrc="1/1/2020"
            colors="#FFC65D"
            OnPress={() => this.props.navigation.navigate("Edit")}
          />
           <TravelNoteCard
            name="လှလှ"
            date="1/1/2020"
            phone="0912345678"
            status="စောင့်ကြည့်ခံရမည်"
            nrc="1/1/2020"
            backColor="#EB4D4D"
            borderColor="#EB4D4D"
            colors="white"
            textColor="white"
            OnPress={() => this.props.navigation.navigate("TravelNoteDetail")}
          /> */}
        {/* </ScrollView> */}
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
