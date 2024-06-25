import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

import {Snackbar} from 'react-native-paper';

import {useAppState} from '../../Context/ContextContainer';

import axios from 'axios';

const Login = () => {
  // states for login
  const [email, setLEmail] = useState('');
  const [password, setPassword] = useState('');

  // message for login fail
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // auth state
  const {
    ipv4,
    setRole,
    setAuth,
    setName,
    setEmail,
    setCurrentUserId,
    setHealthProfile,
  } = useAppState();

  const handelSubmit = async () => {
    try {
      const response = await axios.post(`http://${ipv4}:4500/api/user/login`, {
        email: email,
        password: password,
      });
      console.log(response.data.userData);

      const {id} = response.data;
      const {role, name, healthProfile} = response.data.userData;

      setAuth(true);
      setCurrentUserId(id);
      setRole(role);
      setName(name);
      setEmail(email);
      setHealthProfile(healthProfile);
      setLEmail('');
      setPassword('');
    } catch (error) {
      console.log('error');
      console.log('error', error.message);
      setSnackbarMessage('Login failed. Please check your credentials.');
      setSnackbarVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.loginText}>Login</Text>
          <Text style={styles.loginText}>to</Text>
          <Text style={styles.appName}>SwasthyaRaksha</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={setLEmail}
              placeholder="health@example.com"
              placeholderTextColor="#6b7280"
              style={styles.input}
              value={email}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={setPassword}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.input}
              secureTextEntry={true}
              value={password}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handelSubmit}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}>
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  innerContainer: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 0,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },

  loginText: {
    fontSize: 31,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  appName: {
    fontSize: 31,
    color: '#00FF00',
  },
  formContainer: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 0,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#222',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  buttonContainer: {
    marginTop: 4,
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#075eec',
    borderWidth: 1,
    borderColor: '#075eec',
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: 'white',
  },
});

export default Login;
