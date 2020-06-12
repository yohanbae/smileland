import React from 'react';
import {StyleSheet, ScrollView, Button, AsyncStorage, View, Text, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import ViewPager from '@react-native-community/viewpager';
import * as Font from 'expo-font';
import PropTypes from 'prop-types';
import PercentageCircle from 'react-native-percentage-circle';
import { reset } from 'expo/build/AR';

const EachScreen = styled.View`
    flex:1;
    height:100%;
    width:100%;
    font-size:40px;
    color:black;
    text-align:left;

`;

  const Item = styled.View`
    height:60px;
    min-width:80px;
    margin: 5px;
    margin-right:15px;
    position:relative;
    margin-bottom:50px;
    background-color:rgba(255,255,255,0.6);
    display:flex;
    align-items:center;
    justify-content:center;
    `;
  
  const ItemDate = styled.Text`
    position:absolute;
    bottom:-20px; right:0;
    width:100%;
    text-align:center;
    font-size:10px;
    z-index:99;
  `;
  
  const ItemTime = styled.Text`
    width:100%; height:80px;
    text-align:center;
    padding-top:25px;
    position:absolute;
    font-size:20px;
    z-index:99;
   `;
  const ItemGage = styled.View`
    background-color:#8da5ff;
    opacity:0.6;
    bottom:0; right:0;
    width:40%;
    height:10px;
    position:absolute;
    z-index:9;
  `;
  
  const HistoryTitle = styled.View`
    padding-top:40px;
    padding-bottom:10px;
    padding-left:30px;
    font-size:14px;
    color:#3498db;
  `;
  

const HistoryPage = ({data}) => {

const reset = () => {
  AsyncStorage.removeItem('SMILELAND_DB');
  console.log('reset');
}  
    return (
        <EachScreen>
            <HistoryTitle><Text style={{ fontSize:14}}>SMILE HISTORY</Text></HistoryTitle>
            <Button title="RESET" onPress={()=> reset()} />

            <ScrollView contentContainerStyle={styles.specialScroll}>
            {
             data.slice(0).reverse().map(val => (
                val.count == 9 ?
                <Item key={val.datecode}>
                  <PercentageCircle
                    radius={25} 
                    percent={Math.floor(val.count / 9 * 100)} color={"#f03316"}>
                  </PercentageCircle>  
                  <ItemDate>{val.date}</ItemDate>                  
                 </Item>
                :
                <Item key={val.datecode}>
                  <PercentageCircle
                    radius={25} 
                    percent={Math.floor(val.count / 9 * 100)} color={"#3498db"}>
                  </PercentageCircle>  
                  <ItemDate>{val.date}</ItemDate>                  
                 </Item>
                 ))

               }
            </ScrollView>
        </EachScreen>
    );
}


const styles = StyleSheet.create({
    specialScroll:{
      width:'100%',
      // height:'100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      paddingLeft:30,
      paddingRight:30,
      paddingBottom:30,
      paddingTop:20
    }  
});


HistoryPage.propTypes = {
    data: PropTypes.array.isRequired
}


export default HistoryPage;
