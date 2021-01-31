import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  TextInput,  StyleSheet,  View,  Text,  Image,  Button,  Linking
} from 'react-native';
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { useState } from 'react';



class NoticeScreen extends Component{
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.contentbox}>
          <View style={styles.contentlist_imagebox}>
            <Image style={styles.contentlist_image} source={require('./images/testimage2.png')}/>
          </View>
          <View style={styles.contentlist_titlebox}>
            <TouchableOpacity>
              <Text style={styles.contentlist_titletext}>글 제목 출력 1</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentbox}>
          <View style={styles.contentlist_imagebox}>
            <Image style={styles.contentlist_image} source={require('./images/testimage2.png')}/>
          </View>
          <View style={styles.contentlist_titlebox}>
            <TouchableOpacity>
              <Text style={styles.contentlist_titletext}>글 제목 출력 1</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentbox}>
          <View style={styles.contentlist_imagebox}>
            <Image style={styles.contentlist_image} source={require('./images/testimage2.png')}/>
          </View>
          <View style={styles.contentlist_titlebox}>
            <TouchableOpacity>
              <Text style={styles.contentlist_titletext}>글 제목 출력 1</Text>
            </TouchableOpacity>
          </View>
        </View>

  
      </View>
    );
  }

}

const styles =StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10,
    marginBottom: 10,
    backgroundColor: 'white',
    paddingLeft: '3%',
    paddingRight: '3%',
    flexDirection: 'column',
  },

  contentbox: {
    borderRadius: 5,
    marginTop:'2%',
    width:'100%',
    height:'10%',
    flexDirection:'row',
    backgroundColor:'yellow'
  },

  contentlist_imagebox: {
   flex:1,
   backgroundColor:'red'
  },

  contentlist_image: {
    height:'100%', 
    width:'100%',
    justifyContent: 'center',
    alignItems:'center'
  },

  contentlist_titlebox: {
    marginRight:15,
    flex:5,
    justifyContent: 'center',
  },

  contentlist_titletext: {
    fontSize:20,
    fontWeight: 'bold',
    paddingLeft:'5%',
    justifyContent: 'center',
    color:'black'
  }

})


export default NoticeScreen;