import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class ToleGateCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      backcolor: "",
      text: "",
    };
  }
  componentDidMount() {
    this._showTextStatus();
  }
  _OnPress() {
    if (this.props.OnPress) {
      this.props.OnPress();
    }
  }
  NrcFilter() {
    if (this.props.nrcstatus == 5) {
      return this.props.passportNo;
    } else {
      return this.props.nrc;
    }
  }
  _showTextStatus() {
    if (this.props.statusname == 3 && this.props.q_statusColor == 1) {
      return this.setState({
        color: "white",
        backcolor: "red",
        text: "စောင့်ကြည့်ခံရမည်",
      });
    } else if (this.props.statusname == 3 && this.props.q_statusColor == 0) {
      return this.setState({
        color: "green",
        backcolor: "white",
        text: "လက်ခံသည်",
      });
    } else if (this.props.statusname == 1 && this.props.q_statusColor == 1) {
      return this.setState({
        color: "red",
        backcolor: "white",
        text: "လာရောက်ခွင့်ပြုသည်Qဝင်ရမည်",
      });
    } else if (this.props.statusname == 1 && this.props.q_statusColor == 0) {
      return this.setState({
        color: "blue",
        backcolor: "white",
        text: "လာရောက်ခွင့်ပြုသည်",
      });
    } else if (this.props.statusname == 4) {
      return this.setState({
        color: "#000",
        backcolor: "white",
        text: "လျှောက်လွှာပယ်ဖျက်မည်",
      });
    } else if (this.props.statusname == 0) {
      return this.setState({
        text: "လျှောက်လွှာတင်ထားသည်",
        color: "#000",
        backcolor: "white",
      });
    } else if (this.props.statusname == 2) {
      return this.setState({
        text: "ပြင်ဆင်ရန်",
        color: "orange",
        backcolor: "white",
      });
    }
  }
  render() {
    const { color } = this.state;
    const { backcolor } = this.state;
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: backcolor,
            borderColor: backcolor,
          },
        ]}
      >
        <TouchableOpacity onPress={() => this._OnPress()} activeOpacity={0.8}>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[styles.firstText]}>{this.props.name}</Text>
              <Text style={[styles.secondText]}>{this.props.date}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{width:"50%"}}>
              <Text>{this.NrcFilter()}</Text>
              </View>
              <View style={{width:"50%",alignItems:"flex-end"}}>
              <Text
                style={[
                  styles.secondText,
                  {
                    fontSize: 12,
                    color: color,
                    textAlign:"right",
                    // backgroundColor:"red"
                  },
                ]}
              >
                {this.state.text}
              </Text>
              </View>
            </View>
            <View>
              <Text style={[styles.firstText]}>{this.props.phone}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    // backgroundColor:this.state.backcolor,
    // borderColor: "#ffffff",
  },
  firstText: {
    width: "35%",
    paddingTop: 5,
  },
  secondText: {
    width: "65%",
    textAlign: "right",
    paddingTop: 5,
  },
});
