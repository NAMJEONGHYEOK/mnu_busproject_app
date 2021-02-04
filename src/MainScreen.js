/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  Linking,
} from 'react-native';
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class MainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.list}>
            <View style={styles.list_iconbox}> 
                
            </View>
            <View style={styles.list_titlebox}> 
                <Text style={styles.list_title_text}>스쿨버스 예매</Text>
            </View>
            <View style={styles.list_arrowbox}>
               
            </View>
          </View>
        
          <View style={styles.list}>
            <View style={styles.list_iconbox}> 
                
            </View>
            <View style={styles.list_titlebox}> 
                <Text style={styles.list_title_text}>예매확인 / 변경</Text>
            </View>
            <View style={styles.list_arrowbox}>
                
            </View>
          </View>

          <View style={styles.list}>
            <View style={styles.list_iconbox}> 
                
            </View>
            <View style={styles.list_titlebox}> 
                <Text style={styles.list_title_text}>노선운행 / 정보</Text>
            </View>
            <View style={styles.list_arrowbox}>
                
            </View>
          </View>

          <View style={styles.footermenu}>
            <View style={styles.footerleft}>
                
            </View>
            <View style={styles.footercenter}>

            </View>
            <View style={styles.footerright}>

            </View>
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection:'column'
  },

  list: {
    backgroundColor:'blue',
    marginTop:10,
    width:'100%',
    height:'25%',
    flexDirection:'row'
  },

  list_iconbox: {
      flex:2,
      height:'100%',
      backgroundColor:'red'
  },
  
  list_icon:{
    height:'100%', 
    width:'100%',
    justifyContent: 'center',
    alignItems:'center'
  },

  list_titlebox: {
    justifyContent:'center',
    alignItems:'center',
    flex:5,
    height:'100%',
  },

  list_title_text: {
      
      fontSize:30,
      fontWeight:'bold',
      color:'white'
  },

  list_arrowbox: {
      flex:1,
      height:'100%',
      backgroundColor:'green'
  },

  footermenu: {
      borderTopWidth:10,
      borderTopColor:'#dbdbdb',
      flexDirection:'row',
      height:'20%'
  },

  footerleft: {
    flex:1,
    backgroundColor:'green'
  },

  footercenter: {
    flex:1,
    backgroundColor:'red'
  },

  footerright: {
    flex:1,
    backgroundColor:'yellow'
  }




});

export default MainScreen;
