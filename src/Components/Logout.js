import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useAppState} from '../Context/ContextContainer';

const Logout = () => {
  const {setAuth, setCurrentUserId, setRole} = useAppState();
  const handelLogout = () => {
    setAuth(false);
    setCurrentUserId('');
    setRole('');
  };

  return (
    <View style={[style.card]}>
      <View style={style.center}>
        <Text style={style.message}>Visit back, it was good to have you!</Text>
        <Button title="Log-Out" onPress={handelLogout} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginTop: 230,
  },

  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default Logout;
