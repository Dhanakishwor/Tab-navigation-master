import React from 'react';
import { Text, TextInput, View } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import *as Permissions from 'expo-permissions'; 

export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state={

      hasCameraPermissions:null,
      scanned:false,
      scannedbookId:"",
      scannedStudentId:"",
      buttonState:"normal"
    }
  }

  getCameraPermissions=async(id)=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions: status==="granted",
      buttonState:id,
      scanned:false
    })
  }

  handleBarCodeScan=async({type,data})=>{
    const {buttonState}=this.state
    if(buttonState==="bookId"){
      this.setState({
        scanned:true,
        scannedbookId:data,
        buttonState:"normal"
      });
    }
    else if(buttonState==="studentId"){
      this.setState({
        scanned:true,
        scannedStudentId:data,
        buttonState:"normal"
      })
    }
  }
    render() {
      const hasCameraPermissions=this.state.hasCameraPermissions;
      constScanned=this.state.scanned;
      constButton=this.state.buttonState;
      if(buttonState!=="normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
          onBarCodeScanned={scan ? undefined:this.handleBarCodeScan}
          style={StyleSheet.absoluteFillObject}/>

        )
      }
      else if(buttonState==="normal"){

      
      return (
        <View style={styles.container }>
          <View>
            <Image
            source={require("../assets/booklogo.jpg")}
            style={{width:200,height:200}}
            
            />

            <Text style={{textAlign:"center",fontSize:30}}>
              wily
            </Text>
          </View>
          <View
          style={styles.inputView}>
          <TextInput
          style={styles.inputBox}
          placeholder="book id"
          value={this.state.scannedBookId}
          />
          <TouchableOpacity 
          onPress={()=>{
            {this.getCameraPermissions("bookId")}
          }}

          style={styles.scanButton}>
          <Text style={styles.buttonText}>
          scan 
          </Text>
          </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInput
            style={styles.inputBox}
              placeholder="student id"
              value={this.state.scannedStudentId}
              />
              <TouchableOpacity
              onPress={()=>{
                {this.getCameraPermissions("studentId")}
              }}
              style={styles.scanButton}>
                <Text style={styles.buttonText}>
                  scan
                </Text>
                </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  }
  const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"center",
      alignItem:"center"

    
  },
  displayText:{
    fontSize:15,
    textDecorationLine:"underline"
  },

  scanButton:{
    backgroundColor:"White",
    padding:10,
    margin:10
  },
  buttonText:{
    fontSize:20,

  },

  inputBox:{
    width:200,
    height:40,
    borderWidth:1.5,
    borderRightWidth:0,
    fontSize:20

  },

  inputView:{
    flexDirection:"row",
    margin:20
  }

  });