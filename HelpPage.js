import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import ViewPager from '@react-native-community/viewpager';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';

const EachScreen = styled.View`
    flex:1;
    height:100%;
    width:100%;
    font-size:40px;
    align-items:center;
    justify-content:center;
    color:black;
    padding-right:20px;
    padding-left:20px;
    text-align:left;
    background-color:white;
    `;

const ScreenText = styled.Text`
    marginBottom:10px;
`;

const Swipe = styled.View`
    width:50%;
    background:rgba(0,0,0,0.8);
    padding:20px;
    border-radius:15px;
    margin-top:50px;
`;
const SwipeText = styled.Text`
    color:white;
    font-size:20px;
    text-align:center;
`;

const ImageAni = styled.Image`
    margin-top:50px;
    resizeMode:stretch;
`;

const StartButton = styled.TouchableOpacity`
    margin-top:50px;
    width:50%;
    background:rgba(0,0,0,0.8);
    padding:20px;
    border-radius:15px;
`;
const StartButtonText = styled.Text`
    color:white;
    font-size:20px;
    text-align:center;
`;

   

// class App extends React.Component
class HelpPage extends React.Component {
    constructor(props){
        super(props);
    }
    
    
    componentDidMount = async() => {
        // GET FONT
        // Font.loadAsync({
        // //   'cabinsketch': require('./assets/fonts/CabinSketch-Regular.ttf'),
        // });
    } 

    render(){
        const {help} = this.props;
        return (
            <ViewPager style={styles.helpPager}>
                <EachScreen key="1">
                    <ScreenText>WELCOME TO SMILE LAND!</ScreenText>
                    <ScreenText>Smile change our life :)</ScreenText>
                    <ScreenText>287 muscles move when you smile.</ScreenText>
                    <ImageAni style={{width: 100, height: 200}} source={require('./image/tokki.png')} />
                    <Swipe><SwipeText>SWIPE   <Ionicons name="md-arrow-forward" size={20} /></SwipeText></Swipe>
                </EachScreen>
                <EachScreen key="2">
                    <ScreenText>We need your lovely smile</ScreenText>
                    <ScreenText>Show us your smile many as possible</ScreenText>
                    <ImageAni style={{width: 100, height: 150}} source={require('./image/tree.png')} />
                    <Swipe><SwipeText>SWIPE   <Ionicons name="md-arrow-forward" size={20} /></SwipeText></Swipe>
                </EachScreen>
                <EachScreen key="3">
                    <ScreenText>30 seconds of smile will hatch this egg!</ScreenText>
                    <ScreenText>Try to hatch many eggs as possible!</ScreenText>

                    <ImageAni style={{width: 150, height: 200}} source={require('./image/egg_smile.png')} />

                    <StartButton><StartButtonText onPress={()=>help()}>START   <Ionicons name="md-paw" size={20} /></StartButtonText></StartButton>
                </EachScreen>            
            </ViewPager>
        );

    }

}

const styles = StyleSheet.create({
    helpPager: {
      flex: 1,
      height:'100%',
      width:'100%',
      position:'absolute',
      top:0,
      left:0
    },
  });

export default HelpPage;