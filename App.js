import React from 'react';
import { Text, View, Dimensions, Image, Animated, Easing, AsyncStorage, ScrollView, StatusBar } from 'react-native';
import styled from 'styled-components';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

import {Asset} from 'expo-asset';

import * as Font from 'expo-font';
import styles from "./styles";

import tokki_img from "./image/png/tokki_front2.png";
import tokki_ani from "./image/png/tokki_ani.gif";
import tokki_hungry from "./image/png/tokki_hungry2.png";

import burrito_img from "./image/png/burrito_front2.png";
import burrito_ani from "./image/png/burrito.gif";
import burrito_hungry from "./image/png/burrito_hungry2.png";

import cat_img from "./image/png/cat_front2.png";
import cat_ani from "./image/png/cat_ani.gif";
import cat_hungry from "./image/png/cat_hungry.png";

import dang_img from "./image/png/ori_front.png";
import dang_ani from "./image/png/ori_ani.gif";
import dang_hungry from "./image/png/ori_hungry.png";

import egg from "./image/egg_smile.png";
import egg_sun from "./image/egg_smile_sun.png";
import egg_crying from "./image/png/egg_crying.png";

import baby_egg from "./image/baby_egg.png";

import light_img from './image/light.png';

import {Ionicons} from '@expo/vector-icons';
import HelpPage from './HelpPage';
import HistoryPage from './HistoryPage';

import back_down_img from "./image/png/back_use.png";
import tomb from "./image/png/tomb.png";

import kung from "./image/png/kung.gif";

const Container = styled.View`
  flex:1;
  background-color:white;
  justify-content:center; align-items:center;
  position:relative;
`;


const Gagewrap = styled.View`
  position:absolute;
  top:45%;
  left:20%;
  width:60%;
  height:60px;
  z-index:999;
  background-color:rgba(0,0,0, 0.4);
  display:flex;
  justify-content:center;
  border-radius:10px;
`;

const Gage = styled.View`
  z-index:99;
  position:absolute;
  top:0px; left:0;
  background-color:rgba(0,0,0,.7);
  height:60px;
  border-radius:10px;
`;
const GageText = styled.Text`
  width:100%;
  text-align:center;
  color:white;
  z-index:999;
`;

const ImageWrap = styled.View`
  z-index:999;
  position:absolute;
  bottom:80px; left:0;
  width:100%;
  height:100px;
  align-items:center;
`;
const ImageWrap2 = styled.View`
  z-index:99;
  position:absolute;
  bottom:80px; left:0;
  width:100%;
  height:100px;
  align-items:center;
  transform:scale(0.8);
`;

const InfoButton = styled.TouchableOpacity`
  z-index:9999;
  position:absolute;
  top:120px;
  right:0px;
  background-color:rgba(0,0,0,.5);
  padding:10px;

  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

  align-items:center;
  justify-content:center;
  width:90px;
`;

const HistoryButton = styled.TouchableOpacity`
  z-index:9999;
  position:absolute;
  top:185px;
  right:0px;
  background-color:rgba(0,0,0,.5);
  padding:10px;

  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

  align-items:center;
  justify-content:center;
  width:90px;
  `;

const EggStatus = styled.View`
  z-index:50;
  position:absolute;
  top:250px;
  right:0px;
  flex-direction: row;
  flex:1;
  background-color:rgba(0,0,0,.5);
  padding:10px;

  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

  width:90px;
`;

const StatusInside=styled.Image`
  z-index:99;
  width:30px;
  height:40px;
  resizeMode: stretch;

`;
const StatusInsideText = styled.View`
  z-index:99;
  height:40px;
  align-items:center;
  justify-content:center;
`;
const TimeText = styled.Text`
  z-index:99;
  font-size:20px;
  color:white;
`;

const TokkiWrap = styled.View`
  width:50px;
  height:100px;
  position:absolute;
  left:20px;
  bottom:100px;
`;

const TokkiTomb = styled.View`
  width:30px;
  height:30px;
  position:absolute;
  left:50px;
  bottom:130px;
`;

const BurritoWrap = styled.View`
  width:50px;
  height:100px;
  position:absolute;
  right:20px;
  bottom:100px;
`;
const BurritoTomb = styled.View`
  width:30px;
  height:30px;
  position:absolute;
  right:50px;
  bottom:125px;
`;

const CatWrap = styled.View`
  width:100px;
  height:50px;
  position:absolute;
  right:50px;
  bottom:50px;
`;
const CatTomb = styled.View`
  width:30px;
  height:30px;
  position:absolute;
  right:60px;
  bottom:70px;
`;

const DangWrap = styled.View`
  width:60px;
  height:60px;
  position:absolute;
  left:50px;
  bottom:50px;
`;
const DangTomb = styled.View`
  width:30px;
  height:30px;
  position:absolute;
  left:95px;
  bottom:70px;
`;

const KungLeft = styled.View`
  position:absolute;
  left:20px;
  bottom:190px;  
`;

const KungRight = styled.View`
  position:absolute;
  right:20px;
  bottom:210px;  
`;

const KungCat = styled.View`
  position:absolute;
  left:60px;
  bottom:100px;  
  z-index:50;
`;

const KungDang = styled.View`
  width:60px;
  height:30px;
  position:absolute;
  right:80px;
  bottom:120px;  
  z-index:50;
`;

const PermissionWrap = styled.View`
  flex:1;
  display:flex;
  justify-content:center;
  align-items:center;
`;


const BackDown = styled.Image`
  height:200px;
  width:100%;
  position:absolute;
  left:0; bottom:0;
  resizeMode: cover;
`;


export default class App extends React.Component {

  state = {
    hasPermission: null,
    smileDetected: false,
    gage: 0,
    breakEgg: false,
    rotateValue: new Animated.Value(0),
    rotateValue2: new Animated.Value(0),
    count: null,
    onHistory: false,
    data:null,
    onHelp:true,
    hungry: false,
    death: false,
  };    

  theCount = 0;

  // running = false;
  detect = false;
  success = false; // i know its confusing. breakEgg&success has same role. but we need breakEgg State for the rendering.
  data_temp = [];

  componentDidMount = async() => {
    // await Font.loadAsync({
    //   'bangers': require('./assets/fonts/Bangers-Regular.ttf'),
    // });
    
    await Asset.loadAsync([require("./image/png/back_use.png")]);
    await Asset.loadAsync([require("./image/png/burrito.gif")]);
    await Asset.loadAsync([require("./image/png/burrito_front2.png")]);
    await Asset.loadAsync([require("./image/png/cat_ani.gif")]);
    await Asset.loadAsync([require("./image/png/cat_front2.png")]);
    await Asset.loadAsync([require("./image/png/ori_ani.gif")]);
    await Asset.loadAsync([require("./image/png/ori_front.png")]);
    await Asset.loadAsync([require("./image/png/tokki_ani.gif")]);
    await Asset.loadAsync([require("./image/png/tokki_front2.png")]);

    await Asset.loadAsync([require("./image/png/ori_hungry.png")]);
    await Asset.loadAsync([require("./image/png/tokki_hungry2.png")]);
    await Asset.loadAsync([require("./image/png/cat_hungry.png")]);
    await Asset.loadAsync([require("./image/png/burrito_hungry2.png")]);

    await Asset.loadAsync([require("./image/png/tomb.png")]);
    await Asset.loadAsync([require("./image/png/kung.gif")]);

    await Asset.loadAsync([require("./image/png/egg_crying.png")]);

    // GET DB STORAGE
    try {
      const value = await AsyncStorage.getItem('SMILELAND_DB');
      if (value !== null) {
        // We have data!!
        // GET DATA
        this.checkIfToday(value); // Actual Data, send value as argm
        console.log('yes data');
      }else{
        // NO DATA
        this.initDB();        
      }
    } catch (error) {
      // Error retrieving data
    } finally {

    }

    let currentTime = this.getCurrentHour();
    if(currentTime >= 13 && currentTime < 18 && theCount < 5){
      this.setState({hungry: true});
    } else if(currentTime >= 18 && currentTime < 21 && theCount < 6) {
      this.setState({hungry: true});
    }else if(currentTime >= 21 && currentTime < 24 && theCount < 9) {
      this.setState({hungry: true});
    }

    if(currentTime >= 18 && theCount == 0) {
      this.setState({hungry: true, death: true});
    }




    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    console.log('next');
    if(status === "granted"){
        this.setState({hasPermission:true})
    }else{
        this.setState({hasPermission:false})            
    }
    this._rotateAnimation();
    this._rotateAnimation2();

  }

  // DB MANAGEMENT
  checkIfToday = (value) => {
    let todayDateCode = this.getDateCode();
    let theDate = this.getDate();
    
    let theData = JSON.parse(value);

    if(theData[theData.length - 1].datecode == todayDateCode){
      // Today's Data Exist. So, do Nothing.
      console.log('Today EXIST, GET COUnt');
      this.data_temp = theData;
      this.setState({count: theData[theData.length - 1].count, data: this.data_temp, onHelp:false});
      theCount = theData[theData.length - 1].count;
    }else{
      // NEED TO CREATE DATA FOR TODAY
      console.log('CREATE NEW DATA FOR TodAY!');
      let row = {datecode: todayDateCode, date: theDate, count: 0};
      console.log('hehe');
      this.data_temp = theData;
      this.data_temp.push(row);
      console.log('CC', this.data_temp);
      this.setState({count: 0, data: this.data_temp, onHelp:false});
      theCount = 0;
      this.save_storage();
    }

  }

  initDB = () => {
    // FIRST TIME, CREATE DB
    let dateCode = this.getDateCode();
    let theDate = this.getDate();
    let row = {datecode: dateCode, date: theDate, count: 0};
    let theData = [];
    theData.push(row);
    this.data_temp = theData;
    // NEED SAVE TO STORAGE
    this.save_storage();
    this.setState({count: 0, data:this.data_temp, onHelp:true });
    theCount = 0;
    console.log('NEW DB CREATED', this.data_temp);

  }

  save_storage = async () => {
    try {
      await AsyncStorage.setItem('SMILELAND_DB', JSON.stringify(this.data_temp));
    } catch (error) {
      // Error saving data
    }
  }


  getDate = () => {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    let day = new Date();
    let mm = monthNames[day.getMonth()];
    let d = day.getDate();
    let y = day.getFullYear();

    return mm+" "+d+", "+y;
  }

  getCurrentHour = () => {
    let today = new Date();
    return today.getHours();
  }

  getDateCode = () => {
    let day = new Date();
    let m = day.getMonth();
    if(parseInt(m) < 10){
      m = "0" + m;
    }
    let d = day.getDate();
    if(parseInt(d) < 10){
      d = "0" + d;
    }
    let y = day.getFullYear();
    let dateCode = y+ "" + m + "" +d;
    return dateCode;
  }





  // FACE DETECTION
  onFacesDetected = ({faces}) => {
    const face=faces[0];
    if(face){

        if(face.smilingProbability > 0.07){
            this.setState({smileDetected: true});
          if(this.detect == false){
            // this.runTime();
            this.detect = true;
          }
        }else{

          this.setState({smileDetected: false});
          if(this.detect == true){
            this.detect = false;
            this.stop();
          }

        }
    }
  }

  gg = 0;

  runTime = setInterval(() => {
    if(this.detect == true && this.success == false){
      if(this.gg < 100){
        this.gg += 4;
        this.setState({gage: this.state.gage += 4});
      }else{
        if(this.success == false){
          this.success = true;
          this.runSuccess();
        }
      }
    }
  }, 1000);

  runSuccess = () => {
    // Excute functiosn for the SUCCESS

    if(this.state.count == 9){
      this.setState({breakEgg:true});  
    }else{
      this.setState({breakEgg:true, count: this.state.count += 1});
      theCount += 1;
    }
    // // run function to SAVE(); // save to DB



    if(this.data_temp){
      this.data_temp[this.data_temp.length - 1].count = this.state.count;
      this.setState({data: this.data_temp});
      this.save_storage();
    }

    if(this.state.hungry){
      this.setState({hungry: false});
    }

    if(this.state.death){
      this.setState({death: false});
    }
        

    setTimeout(() => {
      //Excute Functions for After Success, GOING BACK TO NORMAL
      this.stop();
      this.setState({breakEgg:false});
      this.success = false;
    }, 5000);
  }

  stop = () => {
    // clearInterval(runTime);
    console.log('stopping');
    this.setState({gage: 0});
    this.gg = 0;
  }

  _rotateAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.rotateValue, {
        toValue: 100,
        duration: 3000,
        easing: Easing.linear
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 0,
        duration: 0,
      })
   
      ]).start(() => {
        this._rotateAnimation();
      })
  }

  _rotateAnimation2 = () => {
    Animated.sequence([
      Animated.timing(this.state.rotateValue2, {
        toValue: 100,
        duration: 20000,
        easing: Easing.linear
      }),
      Animated.timing(this.state.rotateValue2, {
        toValue: 0,
        duration: 0,
      })
   
      ]).start(() => {
        this._rotateAnimation2();
      })
  }


  onPress = () => {
    if(this.state.onHistory == true){
      this.setState({onHistory:false});
    }else{
      this.setState({onHistory:true});      
    }
  }

  onHelp = () => {
    this.setState({onHelp:true});
  }


  render() {
    const {hasPermission, smileDetected, gage, breakEgg, count, onHistory, data, onHelp, hungry, death} = this.state;
    const {width, height} = Dimensions.get('screen');
    const interpolateRotateAnimation = this.state.rotateValue.interpolate({
      inputRange: [0, 25, 50, 75, 100],
      outputRange: ['-2deg', '0deg', '2deg', '0deg', '-2deg'],
    });

    const interpolateRotateAnimation2 = this.state.rotateValue.interpolate({
      inputRange: [0, 25, 50, 75, 100],
      outputRange: ['-10deg', '0deg', '10deg', '0deg', '-10deg'],
    });    

    const eggAnimation = this.state.rotateValue2.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg'],
    });

    const helpDone = () => {
      this.setState({onHelp:false});
    }

    
    if(hasPermission === true){
      return (
        
        <>
        <StatusBar hidden={true} />
        <Container>

        {
          onHelp ? <HelpPage help={helpDone} /> : 
        (
          <>
          <HistoryButton onPress={()=> this.onPress()}>
            {onHistory ? <Ionicons name="md-home" size={26} color='white' /> : <Ionicons name="md-stats" size={26} color='white' />}  
          </HistoryButton>
          <InfoButton onPress={()=> this.onHelp()}><Ionicons name="md-information-circle-outline" size={26} color='white' /></InfoButton>
        {
          onHistory ? (
            <HistoryPage data={data} />
          ) //onHistory Done
          :(
          <>

          <Gagewrap>
            <Gage style={{width:`${gage}%`}}></Gage>
            
            {
              breakEgg ?
                <>
                <GageText style={{fontSize:14}}>HOORAY!</GageText>                
                <GageText style={{fontSize:11}}>Good job!</GageText>                
                <GageText style={{fontSize:11}}>Try hatch more eggs</GageText>                
                </>
                :
                  smileDetected ?
                  <>
                  <GageText style={{fontSize:14}}>WHAT A BEAUTIFUL SMILE!</GageText>
                  <GageText style={{fontSize:11}}>Hold your smile until new life born</GageText>
                  </>
                  :
                  death ? 
                  <>
                    <GageText style={{fontSize:14}}>DEATH WARNING!</GageText>
                    <GageText style={{fontSize:11}}>Animals are starving!</GageText>                  
                  </>
                  :
                    hungry ?
                    <>
                    <GageText style={{fontSize:14}}>HUNGRY!</GageText>
                    <GageText style={{fontSize:11}}>Animals are starving!</GageText>
                    <GageText style={{fontSize:11}}>Show them your smile asap</GageText>
                    </>
                    :
                    <>
                    <GageText style={{fontSize:14}}>SHOW ME YOUR SMILE</GageText>              
                    <GageText style={{fontSize:11}}>You can feed animals with a smile</GageText>
                    </>
            }

          </Gagewrap>     

            <EggStatus>
              <StatusInside source={baby_egg}></StatusInside>
              <StatusInsideText><TimeText> X {count}</TimeText></StatusInsideText>
            </EggStatus>

          <Camera style={{
              width: width,
              height: height,
          }} 
          type={Camera.Constants.Type.front}          
          onFacesDetected={this.onFacesDetected}
          faceDetectorSettings={{
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Landmarks.all
            }}
          />
          <ImageWrap>
            <Animated.Image 
              style={[
                styles.egg,
                {
                  transform: [{ rotate: interpolateRotateAnimation2 }]
                }
              ]}
              source={breakEgg ? 
                      baby_egg 
                      : 
                        smileDetected ?
                        egg_sun
                        :
                        death ?
                          egg_crying
                          :
                          egg
                      }>

            </Animated.Image>
          </ImageWrap>

          <ImageWrap2>
            {
              smileDetected ? 
              <Animated.Image            
              style={[styles.egglight,
                {
                  transform: [{ rotate: eggAnimation }]
                }
              ]}
              source={light_img}></Animated.Image>                  
              : null
            }
        
          </ImageWrap2>

          <BurritoWrap>
            <Animated.Image
              style={[
                styles.burrito_char,
                {
                  transform: [{ rotate: interpolateRotateAnimation }]
                }
              ]}
              source={smileDetected ? burrito_ani : 
                hungry ? 
                burrito_hungry
                :
                burrito_img}
            ></Animated.Image>
          </BurritoWrap>

          <TokkiWrap>
            <Animated.Image
              style={[
                styles.tokki_char,
                {
                  transform: [{ rotate: interpolateRotateAnimation }]
                }
              ]}
              source={smileDetected ? tokki_ani : 
                hungry ?
                tokki_hungry
                :
                tokki_img}
            ></Animated.Image>
          </TokkiWrap>

          <CatWrap>
            <Animated.Image
              style={[
                styles.cat_char,
                {
                  transform: [{ rotate: interpolateRotateAnimation }]
                }
              ]}
              source={smileDetected ? cat_ani : 
                hungry ?
                cat_hungry
                :
                cat_img}
            ></Animated.Image>
          </CatWrap>

          <DangWrap>
            <Animated.Image
              style={[
                styles.dang_char,
                {
                  transform: [{ rotate: interpolateRotateAnimation }]
                }
              ]}
              source={smileDetected ? dang_ani : 
                hungry ? 
                dang_hungry
                :
                dang_img}
            ></Animated.Image>
          </DangWrap>
          {
            smileDetected ? null
            :
            death ?
            <>
            <BurritoTomb>
              <Image style={[styles.tomb_char]} source={tomb} />
            </BurritoTomb>            
            <TokkiTomb>
              <Image style={[styles.tomb_char]} source={tomb} />
            </TokkiTomb>
            <CatTomb>
              <Image style={[styles.tomb_char]} source={tomb} />
            </CatTomb>
            <DangTomb>
              <Image style={[styles.tomb_char]} source={tomb} />
            </DangTomb>
            </>
            :null
          }

          {
            smileDetected ?
            <>
              <KungLeft>
                <Image style={[styles.kung_char]} source={kung} />
              </KungLeft>
              <KungRight>
                <Image style={[styles.kung_char]} source={kung} />
              </KungRight>
              <KungCat>
                <Image style={[styles.kung_char]} source={kung} />
              </KungCat>
              <KungDang>
                <Image style={[styles.kung_char]} source={kung} />
              </KungDang>
            </>
            : null
          }

          </>
          ) // History Park END
          
        }
        </>
        
        ) //onHelpPage End
      }

        <BackDown source={back_down_img} />

        </Container>
        </>
      );
    }else if(hasPermission === false) {
      return <PermissionWrap><Text>NO PERMISSION</Text></PermissionWrap>;
    }else {
      return (<PermissionWrap>
        <Text>Loading...</Text>
        {/* <Image style={[styles.egg]} source={baby_egg} /> */}
      </PermissionWrap>);
    }
    

  };

}
