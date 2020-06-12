import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    statusBar: {
      backgroundColor: "red",
      opacity:0
    },
    stretch: {
      width: 50,
      height: 100,
      resizeMode: 'stretch',
      zIndex:999,
    },
    egg:{
      width: 70,
      height: 100,
      zIndex:999,
      resizeMode:'stretch',
  
    },
    egglight:{
      width: 300,
      height: 300,
      zIndex:99,
      resizeMode:'stretch',
      opacity:1,
      bottom:95,
      left:3
    },  
    leftchar:{
      width: 50,
      height: 100,
      resizeMode: 'stretch',
      zIndex:999,
      position: 'absolute',
      left: 40,
      bottom:30,
      opacity:1
    },
    tokki_char:{
      width: 50,
      height: 100,
      resizeMode: 'stretch',
      zIndex:50,
    },
    burrito_char:{
      width: 50,
      height: 100,
      resizeMode: 'stretch',
      zIndex:50,
    },
    cat_char:{
      width: 100,
      height: 50,
      resizeMode: 'stretch',
      zIndex:50,
    },
    dang_char:{
        width: 60,
        height: 60,
        resizeMode: 'stretch',
        zIndex:50,
      },    
    tomb_char: {
      width: 30,
      height: 50,
      resizeMode: 'stretch',
      opacity: 0.7,
      zIndex:99,
    },
    kung_char: {
      width: 70,
      height: 50,
      resizeMode: 'stretch',
      zIndex:99,
    },    
    specialScroll:{
      width:'100%',
      // height:'100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    },
  
  });
  
  export default styles;