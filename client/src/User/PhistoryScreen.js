/* eslint-disable no-alert */
import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import {config} from '../config';
class PhistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.penaltyfetchdata();
  }
  state = {
    data: [],
  };

  dateParse = notice_date => {
    // 날짜 파싱하는 함수
    let ndate = moment(notice_date).format('YYYY-MM-DD');
    return ndate;
  };

  penaltyfetchdata = async () => {
    try {
      const { uid } = this.props.route.params;
      //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
      await fetch(`http://${config.api}/api/penaltylist`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          inputvalue: uid,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            this.setState({ data: res.penalty });
          } else {
            Alert.alert('조회결과', res.message);
          }
        })
        .done();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleheader}>
          <View style={styles.textbox1}>
            <Text style={styles.titleheadertext}>벌점</Text>
          </View>
          <View style={styles.textbox2}>
            <Text style={styles.titleheadertext}>내용</Text>
          </View>
          <View style={styles.textbox3}>
            <Text style={styles.titleheadertext}>일시</Text>
          </View>
        </View>
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <View style={styles.textbox1}>
                <Text style={styles.contenttext}>{item.penalty}</Text>
              </View>
              <View style={styles.textbox2}>
                <Text style={styles.contenttext}>{item.reason}</Text>
              </View>
              <View style={styles.textbox3}>
                <Text style={styles.contenttext}>
                  {this.dateParse(item.pdate)}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  titleheader: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    borderBottomWidth: 2,
  },
  textbox1: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textbox2: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
  },
  textbox3: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  titleheadertext: {
    fontSize: 15,
    fontWeight: '700',
  },
  box: {
    flex: 1,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  contenttext: {
    fontSize: 15,
  },
});

export default PhistoryScreen;
