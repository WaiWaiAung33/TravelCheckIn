import React from "react";
import { Modal,View,Image,TouchableOpacity,StyleSheet} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { SafeAreaView } from "react-navigation";
 
export default class Card extends React.Component {
  _handleClose(){
    if(this.props.onClose){
      this.props.onClose();
    }
  }
    render(){
      const photo = this.props.photo;
      const images = [{
        // Simplest usage.
        url:photo,
    }]
    // console.log(this.props.photo);

        return (
            <Modal visible={this.props.isOpen} transparent={true}>
                <ImageViewer 
                enableSwipeDown
                imageUrls={images}
                renderIndicator={() => null}
                saveToLocalByLongPress={false}
                renderHeader={()=>
                  <View style={{padding: 10}} >
                    <TouchableOpacity onPress={()=>this._handleClose()} style={styles.touchBtn}>
                     <Image source={require("@images/closeimage.png")}/>
                     </TouchableOpacity>
                  </View>
              }
                >
               </ImageViewer>
            </Modal>
        )
    }
}
const styles=StyleSheet.create({
  touchBtn:{
    alignItems:"flex-end",
    marginTop:10
  }
})
