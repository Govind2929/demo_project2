import React, {useState , useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity,
  FlatList,
  Dimensions,
//  Modal
} from 'react-native';

const { width, height } = Dimensions.get('window');
//import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome'; 

import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerItem } from '@react-navigation/drawer';

const DrawerContent = props => {
  const navigation = useNavigation();
  const [logoutAlertEnabled, setlogoutAlertEnabled] = useState(false);
  const sectionThreeData = [
    {id: 1, title: 'Home',
    icons:'home',
      color: '#6ECEA4',
    size :21,
    showIcon: true
    },
    {id: 2, title: 'Profile',
    icons:'user-alt',
     color: '#A59EDB',
     size :22,
     showIcon: true
    },
    {id: 4, title: 'Settings', 
    icons:'cog',
     color: '#F4CF55',
     size :22,
     showIcon: true
    },
   
 
  ];




const screenNavigation = (item) => {
  if (item.id == 1) {
    navigation.navigate('Home');
  } else
   if (item.id === 2) {
    navigation.navigate('Profile');
  } else if (item.id === 4) {

  } 

}


  const _renderFlatListItemFoSectionFour = ({item, index}) => {
    return (
      <View>

        <View style={styles.drawerSection}>
          <DrawerItem
            icon={() => (

            <View style={{height:30,width:40 , alignItems:'center',justifyContent:'center'}}>
              {sectionThreeData[index].showIcon === true ?
              <FontAwesome 
            name={sectionThreeData[index].icons}

             size={sectionThreeData[index].size} color= {'blue'}

             /> : null }
            </View>
             
             )}
            label={item.title}
            labelStyle={{
              color: 'grey',
              fontSize: 16,
              height: 27,
           //   fontFamily: Default.fontPoppins_medium,
             
            }}
            
            onPress={() => {
           screenNavigation(item)
            }}
          />
  
        </View>


       
      
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 0,
         backgroundColor: '#FFF',
        justifyContent:'center',
      }}>
          <View style={styles.headerContainer}>
           
          {/* <View style={{backgroundColor:'#fff',height:80,width:80,borderRadius:50 ,borderWidth:1,borderColor:Default.CLightBlue, alignItems:'center',justifyContent:'center'}} >
            {getdashboard.Picture ?<Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode:'cover',
            borderRadius:40
          }}
          
          source={{uri: getdashboard.Picture}}
        />
        :
        <Image
       style={{
         width: '80%',
         height: '80%',
         resizeMode:'cover',
         borderRadius:0
       }}
       source={IMAGES.avatar}
     />
      }
            </View> */}
          <TouchableOpacity onPress={()=>{
        //  navigation.dispatch(DrawerActions.closeDrawer());
      }} style={{}}>
       
      </TouchableOpacity>
      <View style={{
        // flexDirection: 'column',
      // backgroundColor:'red',
      marginTop:20
      }}>
      
        <Text
          allowFontScaling={false}
          numberOfLines={2}
          style={{
            fontSize: 20,
         //   fontFamily: Default.fontPoppins_semiBold,
            color: 'grey',
            textAlign: 'center',
            marginLeft: 0,
            marginTop: 1,
          }}>
         {/* {getdashboard.ProviderName} */}
           </Text>
      </View>

    
          </View>
   
<View style={{height:1 ,backgroundColor:'blue',opacity:.5,marginVertical:1,marginBottom:10}}>

</View>
    
      <FlatList
        // horizontal={true}
        numColumns={1}
        data={sectionThreeData}
        renderItem={_renderFlatListItemFoSectionFour}
         keyExtractor={item => item.title}
      />
    
      <View style = {{marginVertical:20}}>
     
      </View>
  
    </View>
  );
};

const styles = StyleSheet.create({
  drawerSection: {
    // marginTop: 15,
    // backgroundColor:'red',
    borderColor: '#F5F5F5',
    borderBottomWidth: 0.5,
    height: 65,
  },

  headerContainer: {
    // height: 220,
    justifyContent: 'center',
    alignItems:'center',
    // flex: .4,
    marginLeft: 0,
    marginTop:20,
    flexDirection:'column',
    backgroundColor:'#fff',
    paddingVertical:20
  },
  OverlayStyle: {
    width: width * 0.5,
    height: 170,
    borderRadius: 20,
    padding: 0,
  },
  Line: {
    height: 3,
    borderRadius: 20,
    backgroundColor: 'grey',
    width: '90%',
  },
  TitleC: {
    backgroundColor: 'blue',
    width: '100%',
    // borderRadius: 20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
   // flex: 0.32,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  TextS: {
   // fontFamily: Default.FontSemiBold,
    fontSize: 18,
    
  },
  TextP: {
   // fontFamily: Default.fontPoppins_semiBold,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default DrawerContent;
