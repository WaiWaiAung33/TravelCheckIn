import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class ToleGateCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      backcolor: "",
      text: "",
      namecolor: "",
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
    if (this.props.nrcstatus == 4) {
      return this.props.passportNo;
    }
    if (this.props.nrcstatus == 1) {
      return this.props.nrc;
    }
    if (this.props.nrcstatus == 2) {
      return this.props.nrc;
    }
    if (this.props.nrcstatus == 3) {
      return this.props.nrc;
    }
    if (this.props.nrcstatus == 0) {
      return this.props.nrc;
    }
  }
  _showTextStatus() {
    if (this.props.statusname == 3 && this.props.q_statusColor == 1) {
      return this.setState({
        color: "#ffffff",
        backcolor: "#FF0000",
        text: "စောင့်ကြည့်ခံရမည်",
        namecolor: "#ffffff",
      });
    } else if (this.props.statusname == 3 && this.props.q_statusColor == 0) {
      return this.setState({
        color: "#00FF00",
        backcolor: "#ffffff",
        text: "လက်ခံသည်",
        namecolor: "#000",
      });
    } else if (this.props.statusname == 1 && this.props.q_statusColor == 1) {
      return this.setState({
        color: "#FF0000",
        backcolor: "#ffffff",
        text: "လာရောက်ခွင့်ပြုသည်Qဝင်ရမည်",
        namecolor: "#000",
      });
    } else if (this.props.statusname == 1 && this.props.q_statusColor == 0) {
      return this.setState({
        color: "#0000FF",
        backcolor: "#ffffff",
        text: "လာရောက်ခွင့်ပြုသည်",
        namecolor: "#000",
      });
    } else if (this.props.statusname == 4) {
      return this.setState({
        color: "#000",
        backcolor: "#ffffff",
        text: "လျှောက်လွှာပယ်ဖျက်မည်",
        namecolor: "#000",
      });
    } else if (this.props.statusname == 0) {
      return this.setState({
        text: "လျှောက်လွှာတင်ထားသည်",
        color: "#000",
        backcolor: "#ffffff",
        namecolor: "#000",
      });
    } else if (this.props.statusname == 2) {
      return this.setState({
        text: "ပြင်ဆင်ရန်",
        color: "#FFA500",
        backcolor: "#ffffff",
        namecolor: "#000",
      });
    }
  }
  _showName() {
    if (this.props.nrcstatus == 4) {
      return this.props.passportNo;
    } else {
      return this.props.nrc;
    }
  }
  render() {
    const { color } = this.state;
    const { backcolor } = this.state;
    const { namecolor } = this.state;
    // console.log("Passport No",this.props.passportNo)
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
              <Text
                style={[
                  styles.firstText,
                  { color: namecolor ? namecolor : null },
                ]}
              >
                {this.props.name}
              </Text>
              <Text
                style={[
                  styles.secondText,
                  { color: namecolor ? namecolor : null },
                ]}
              >
                {this.props.date}
              </Text>
            </View>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.firstText,
                    { width: 150, color: namecolor ? namecolor : null },
                  ]}
                >
                  {this.props.phone}
                </Text>

                {/* <Text>{this.NrcFilter()}</Text> */}
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={[
                    styles.secondText,
                    {
                      fontSize: 12,
                      color: color,
                      textAlign: "right",
                      width: 150,
                      color: color ? color : null,

                      // backgroundColor:"red"
                    },
                  ]}
                >
                  {this.state.text}
                </Text>
              </View>
            </View>
            <View>
              <Text style={{ color: namecolor ? namecolor : null }}>
                {this._showName()}
                {/* {this.props.passportNo != null
                    ? this.props.passportNo
                    : this.state.nrc} */}
                {/* {this.props.passportNo == null
                    ? this.props.nrc
                    : this.props.passportNo} */}
              </Text>
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
