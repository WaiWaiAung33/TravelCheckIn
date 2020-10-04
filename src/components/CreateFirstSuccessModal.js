import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

export default class CustomModal extends React.Component {
  close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  _handleEntry() {
    if (this.props.handleEntry) {
        // alert("Hello");
      this.props.handleEntry();
    }
  }
  _handleNoEntry() {
    if (this.props.handleNoEntry) {
        // alert("Hello");
      this.props.handleNoEntry();
    }
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpen}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  backgroundColor: "#308DCC",
                  padding: 8,
                  borderWidth: 1,
                  borderColor: "#308DCC",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  //   marginTop: 20,
                }}
              >
                <Text style={{ color: "#ffffff" }}>အတည်ပြုပါ</Text>
                {/* <Image
                  source={
                    this.props.headerIcon
                      ? this.props.headerIcon
                      : require("@images/success.png")
                  }
                  style={styles.modalimg}
                /> */}
              </View>

              {/* <TouchableOpacity
                onPress={() => this.close()}
                style={styles.closeBtn}
                activeOpacity={0.7}
              >
                <Image
                  source={require("@images/cross.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity> */}
            </View>
            <View style={styles.messageWrapper}>
              <Text style={styles.showText}>{this.props.text}</Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <TouchableOpacity
                style={styles.touchBtn}
                onPress={() => this._handleNoEntry()}
              >
                <Text style={styles.text}>မထည့်ပါ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchBtn}
                onPress={() => this._handleEntry()}
              >
                <Text style={styles.text}>ထည့်မည်</Text>
              </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  modalBody: {
    backgroundColor: "#fff",
    width: 300,
    height: null,
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 10,
  },
  modalimg: {
    width: 55,
    height: 55,
    marginTop: 15,
  },
  showText: {
    // textAlign: "center",
    fontSize: 14,
  },
  messageWrapper: {
    padding: 10,
    // justifyContent: "center",
    minHeight: 70,
  },
  closeBtn: {
    padding: 10,
    position: "absolute",
    right: 5,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  touchBtn: {
    backgroundColor: "#308DCC",
    flex: 1,
    padding: 3,
    borderWidth: 1,
    borderColor: "#308DCC",
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
  },
});
