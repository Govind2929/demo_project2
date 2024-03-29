import React, { useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
  Image
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Edit from 'react-native-vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/native';




const Header = ({
  title,
  isBackbtnAvailable = false,
  onDrawerPressed,
  onBackPressed,
  dashboardImage = false,
  isTimer = false,
  isWallet = false,
  isMessage = false,
  onPress,
  isProfile = false,
  isBackdisabled = false,
  isMicrophone = false,
  isCountdown = false,
  until,
  onFinish,
  backgroundColor = '#fff',
  isForDashboard = true
}) => {
  //const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState('');
  const [breakAlert, setbreakAlert] = useState(false);
  const [newAlert, setnewAlert] = useState(false);
  const navigation = useNavigation();


  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderBottomColor: isForDashboard === true ? '#fff' : '#ECEBEB',
        borderBottomWidth: .8,
        justifyContent: 'space-between'
      }}>
      {isBackdisabled == false ? (
        <TouchableOpacity
          style={{ flex: 0.13, justifyContent: 'center' }}
          onPress={
            isBackbtnAvailable == true ? onBackPressed : null
          }>
          {isBackbtnAvailable == true ? (
            <View style={{ backgroundColor: '#fff', paddingHorizontal: 1, paddingVertical: 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center', width: 36, left: -1 }}>
              <Feather name="arrow-left" size={30} color={isForDashboard === true ? '#000' : '#000'} />
              {/* <Image style={{  width: 20,height: 20,resizeMode: 'contain',borderRadius: 24,tintColor:'#FFF'}} source={IMAGES.leftarrow}/> */}
            </View>
          ) : null

          }

        </TouchableOpacity>
      ) : null}
      {isForDashboard !== true ?
        <View style={{ flex: 0.82, justifyContent: 'center', marginHorizontal: 10, }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 18,
              marginLeft: 0,
              marginRight: 25,
              // fontFamily: Default.fontPoppins_semiBold,
              // color: Default.bidonBlue,
            }}>
            {title}
          </Text>
        </View>
        :
        <View style={{ flex: 0.82, marginHorizontal: 19, backgroundColor: 'grey', right: 90 }}>
          <Image style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
            source={require('../assets/samplelogo.jpg')}
          />
        </View>
      }
  {isForDashboard === true ?
      <TouchableOpacity 
      onPress={()=>{
        navigation.navigate('LoginScreen')
      }}
      style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center', marginHorizontal: 19,left:20 }}>
        <MaterialCommunityIcons name="power-standby" size={30} color="#000" />
      </TouchableOpacity>
:null}
    </View>
  );
};
export default Header;
const stylesC = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  ContainerView: {
    flex: 0.9,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnCard: {
    height: height * 0.07,
    paddingHorizontal: 10,
    marginTop: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Card: {
    height: height * 0.07,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
  CardView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ModalContainer: {
    backgroundColor: '#FFF',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.3,
    height: 30,
    backgroundColor: 'orange',
    marginTop: 5,
    borderRadius: 10,
  },
});
