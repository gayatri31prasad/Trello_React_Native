import React, {createContext, useState, useContext, useRef, useEffect} from 'react';
import { ActivityIndicator, Animated, BackHandler, Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';

const AuthContext = createContext();

const AuthContainer = ({children}) => {

  const [alertModal,setAlertModal]=React.useState({
    message:'',
    type:'',
    isVisiable:false,
    isWarning:false,
  })
  
  const setAlert=(message)=>{
    setAlertModal({
      message,
      type:'alert',
      isVisiable:true,
      isWarning:false
    })
  }
  const setWarning=(message)=>{
    setAlertModal(()=>({
      message,
      type:'warning',
      isVisiable:true,
      isWarning:true
    }))
  }
  const closeAlertModal=()=>{
    setAlertModal(()=>({
      message:'',
      isVisiable:false,
      isWarning:false
    }))
  }

  return (
    <AuthContext.Provider
      value={{setAlert,setWarning,closeAlertModal}}>
          {children}
      <Modal 
        animationType="fade"  
        visible={alertModal?.isVisiable} 
        transparent={true} 
      >
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff99'}} >
          <View style={{minWidth:'75%',minHeight:200,padding:20,backgroundColor:applicationTheam == 'dark' ? '#292929' : '#fff',alignItems:'center',borderRadius:12,borderWidth:1,borderColor:'#cccccc50',margin:20}}>
            {(alertModal?.type == 'alert' || alertModal?.type == 'warning') &&<Image source={alertModal?.isWarning ? require('../Images/error.png') : require('../Images/success.png') } style={{height:120,width:120}}/>}
            {typeof(alertModal.message) == 'string' ? 
              <Text style={{fontSize:16,fontWeight:500,marginTop:10,marginBottom:20,textAlign:'center',textTransform:'capitalize'}}>
                {alertModal?.message}
              </Text>
              : alertModal.message}
            {(alertModal?.type == 'alert' || alertModal?.type == 'warning') && <TouchableOpacity style={{width:140,alignItems:'center',backgroundColor:'#F88379',borderRadius:4}} onPress={closeAlertModal}>
              <Text style={{fontSize:18,color:'#fff',fontWeight:500,padding:5}}>OK</Text>
            </TouchableOpacity>}
          </View>
        </View>
      </Modal>
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export {AuthContext, AuthContainer, useAuthContext};
