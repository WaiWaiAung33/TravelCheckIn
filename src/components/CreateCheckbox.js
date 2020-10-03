import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";

import Checkbox from "@components/Checkbox";

export default class LanguageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smaeto: false,
      samefrom: false,
      sametocount:null,
      samefromcount:null
    };
  }
  // async componentWillMount() {
  //       const res = await getLang();
  //       if(res=="MM"){
  //           this.setState({
  //             mmCheck:true
  //           })
  //       }else{
  //         this.setState({
  //             enCheck:true
  //         })
  //       }
  // }

  handleModalCheck(value,isCheck) {
      if(value == "sametoaddress"){
        //   alert(isCheck);
        if(isCheck == true){
            this.setState({sametocount:1});
        }else{
            this.setState({sametocount:null})
        }
          
      }
      if(value == "samefromaddress"){
          if(isCheck == true){
            this.setState({samefromcount:2});
          }else{
            this.setState({samefromcount:null})
          }
          
      }
    // alert(value);

    //   if(value==""){
    //       this.setState({
    //           mmCheck:value,
    //           enCheck:this.state.enCheck
    //       })
    //   }

    //   if(locale==="EN" && value==true){
    //       this.setState({
    //           mmCheck:false,
    //           enCheck:true
    //       })
    //   }

    //   if(this.props.getCheckLang){
    //       this.props.getCheckLang(value,locale);
    //   }
  }
  close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  _handleWork(samefromcount,sametocount){
    //   alert(sametocount);
    // if(this.state.smaeto == true){
    //     this.setState({sametocount : 0})
    // }
    // if(this.state.samefrom == true){
    //     this.setState({samefromcount : 1})
    // }
    if(this.props.handleCheck){
        this.props.handleCheck(samefromcount,sametocount);
    }

  }
  // async componentDidMount() {
  //   const res = await getLang();
  //   this.setState({ locale: res });
  // }
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpen}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                paddingBottom: 10,
                backgroundColor: "#308DCC",
                borderBottomColor: "#308DCC",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text style={{color:"white"}}>ရွေးချယ်ပါ</Text>
                {/* <Image
                  source={require("@images/adress.png")}
                  style={styles.modalimg}
                /> */}
              </View>
              {/* <TouchableOpacity
                onPress={() => this.close()}
                style={styles.closeBtn}
              >
                <Image
                  source={require("@images/closeimage.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity> */}
            </View>
            <View style={styles.chooseLangContainer}>
              <View style={styles.myanmarCheck}>
                <Checkbox
                  isCheck={this.state.smaeto}
                  onCheck={(isCheck) => this.handleModalCheck("sametoaddress",isCheck)}
                  langText="ထွက်ခွာလာသသည့်မြို့တူသည်"
                />
              </View>

              <View style={styles.englishCheck}>
                <Checkbox
                  isCheck={this.state.samefrom}
                  onCheck={(isCheck) => this.handleModalCheck("samefromaddress",isCheck)}
                  langText="သွားရောက်လိုသည့်မြို့တူသည်"
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: 3,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#308DCC",
                    backgroundColor: "#308DCC",
                    justifyContent: "center",
                    flex: 1,
                    alignItems: "center",
                  }}
                  onPress={()=>this.close()}
                >
                  <Text style={{ color: "white" }}>မလုပ်ပါ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 3,
                    borderWidth: 1,
                    borderRadius: 5,
                    marginLeft: 5,
                    borderColor: "#308DCC",
                    backgroundColor: "#308DCC",
                    justifyContent: "center",
                    flex: 1,
                    alignItems: "center",
                  }}
                  onPress={(samefromcount,sametocount)=>this._handleWork(this.state.samefromcount,this.state.sametocount)}
                >
                  <Text style={{ color: "white" }}>လုပ်ဆောင်မည်</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    backgroundColor: "#fff",
    width: 300,
    height: null,
    borderRadius: 10,
    overflow: "hidden",
  },
  modalimg: {
    width: 35,
    height: 35,
    marginTop: 10,
  },
  chooseLangContainer: {
    margin: 10,
    padding: 10,
  },
  myanmarCheck: {
    flexDirection: "row",
    padding: 10,
  },
  englishCheck: {
    flexDirection: "row",
    padding: 10,
  },
  closeBtn: {
    position: "absolute",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    right: 0,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
});
