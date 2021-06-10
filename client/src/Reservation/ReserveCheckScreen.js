import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

class ReserveCheckScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      start_data,
      route_data,
      end_data,
      date,
      seat_number,
      uid,
      uname,
      dept,
      stdnum,
    } = this.props.route.params;

    return (
      <View style={styles.container}>
        <View style={styles.boxlist}>
          <View style={styles.header_area}>
            <Text style={styles.header_areaText}>승차권 예매</Text>
          </View>
          <View style={styles.topbox}>
            <View style={styles.leftstart_area}>
              <Text style={styles.topboxtexttiny}>출발</Text>
              <Text style={styles.topboxtext}>{start_data}</Text>
            </View>
            <View style={styles.rightend_area}>
              <Text style={styles.topboxtexttiny}>도착</Text>
              <Text style={styles.topboxtext}>{end_data}</Text>
            </View>
          </View>
          <View style={styles.middlebox}>
            <View style={styles.box_area}>
              <Text style={styles.middleboxtexttiny}>노선</Text>
              <Text style={styles.middleboxtext}>{route_data}</Text>
            </View>
            <View style={styles.box_area}>
              <Text style={styles.middleboxtexttiny}>좌석번호</Text>
              <Text style={styles.middleboxtext}>{seat_number}</Text>
            </View>
            <View style={styles.box_area}>
              <Text style={styles.middleboxtexttiny}>출발일</Text>
              <Text style={styles.middleboxtext}>{date}</Text>
            </View>
            <View style={styles.boxuser_area}>
              <Text style={styles.middleboxusertext}>{dept}</Text>
              <Text style={styles.middleboxusertext}>{stdnum}</Text>
              <Text style={styles.middleboxusertext}>{uname}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.reset({
              routes: [
                {
                  name: 'MainScreenView',
                  params: {
                    uid: uid,
                    uname: uname,
                    dept: dept,
                    stdnum: stdnum,
                  },
                },
              ],
            });
          }}
        >
          <View style={styles.checkbutton}>
            <Text style={styles.checktext}>확인</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  boxlist: {
    marginTop: '20%',
    width: '90%',
    height: '70%',
    borderRadius: 20,
    borderColor: '#dbdbdb',
    borderWidth: 3,
  },
  header_area: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '20%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B79ED',
  },
  header_areaText: {
    fontSize: 25,
    fontWeight: '600',
    color: 'white',
  },
  topbox: {
    flexDirection: 'row',
    height: '20%',
    width: '100%',
  },
  leftstart_area: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#dbdbdb',
  },
  rightend_area: {
    flex: 1,
    alignItems: 'center',
  },
  topboxtexttiny: {
    paddingTop: 10,
    paddingBottom: 20,
    fontSize: 15,
    fontWeight: '200',
  },
  topboxtext: {
    fontSize: 25,
    fontWeight: '500',
  },
  middlebox: {
    width: '100%',
    height: '50%',

    //marginBottom:'1%',
  },
  box_area: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
    flex: 1,
    paddingLeft: 25,
    justifyContent: 'center',
  },

  middleboxtext: {
    fontSize: 20,
    fontWeight: '500',
  },
  middleboxtexttiny: {
    fontSize: 15,
    fontWeight: '500',
  },
  boxuser_area: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
  },
  middleboxusertext: {
    flex: 1,
    textAlign: 'center',
  },
});

export default ReserveCheckScreen;
