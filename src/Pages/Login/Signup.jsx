import axios from 'axios';
import React, {useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Chip, Snackbar} from 'react-native-paper';
import {useAppState} from '../../Context/ContextContainer';

const Signup = () => {
  const {setAuth, setCurrentUserId} = useAppState();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Normal-User',
    name: '',
    phoneNumber: '',
    address: '',
    city: '',
    pincode: '',
    heartDisease: false,
    hypertension: false,
    allergies: [],
    newAllergy: '',
    diabetes: 'No',
    gender: '',
    age: '',
  });

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleAddAllergy = () => {
    if (formData.newAllergy.trim() !== '') {
      setFormData(prevFormData => ({
        ...prevFormData,
        allergies: [...prevFormData.allergies, prevFormData.newAllergy],
        newAllergy: '',
      }));
    }
  };

  const handleRemoveAllergy = allergyToRemove => {
    setFormData(prevFormData => ({
      ...prevFormData,
      allergies: prevFormData.allergies.filter(
        allergy => allergy !== allergyToRemove,
      ),
    }));
  };

  const handleChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = name => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: !prevFormData[name],
    }));
  };

  const checkPasswordCorrectness = () => {
    return formData.password === formData.confirmPassword;
  };

  const createHealthProfile = async userId => {
    try {
      await axios.post('http://192.168.29.45:4500/api/healthprofiles/create', {
        userId: userId,
        name: formData.name,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        heartDisease: formData.heartDisease,
        hypertension: formData.hypertension,
        allergies: formData.allergies,
        diabetes: formData.diabetes,
      });
    } catch (error) {
      setSnackbarMessage('Signup failed. Please check your input data.');
      setSnackbarVisible(true);
    }
  };

  const handleSubmit = async () => {
    if (checkPasswordCorrectness()) {
      try {
        const response = await axios.post(
          'http://192.168.29.45:4500/api/user/signup',
          {
            role: formData.role,
            name: formData.name,
            email: formData.email,
            password: formData.password,
          },
        );
        const {_id} = response.data;
        await createHealthProfile(_id);
        setCurrentUserId(_id);
        setAuth(true);
      } catch (error) {
        console.log(`error`, error);
        setSnackbarMessage('Signup failed. Please check your input data.');
        setSnackbarVisible(true);
      }
    } else {
      setSnackbarMessage(
        'Signup failed. Password and confirm password do not match.',
      );
      setSnackbarVisible(true);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Sign-Up</Text>
            <Text style={styles.headerText}>into</Text>
            <Text style={styles.headerHighlight}>SwasthyaRaksha</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={value => handleChange('email', value)}
                placeholder="health@example.com"
                placeholderTextColor="#6b7280"
                style={styles.input}
                value={formData.email}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={value => handleChange('password', value)}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.input}
                secureTextEntry={true}
                value={formData.password}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={value => handleChange('confirmPassword', value)}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.input}
                secureTextEntry={true}
                value={formData.confirmPassword}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.sectionTitle}>Select User Type</Text>
              <View style={styles.checkboxContainer}>
                <Text style={styles.checkboxLabel}>Normal User</Text>
                <TouchableOpacity
                  onPress={() => handleChange('role', 'Normal-User')}
                  style={styles.checkboxWrapper}>
                  <View
                    style={[
                      styles.checkbox,
                      formData.role === 'Normal-User' &&
                        styles.checkboxSelected,
                    ]}
                  />
                </TouchableOpacity>
                <Text
                  style={[styles.checkboxLabel, styles.checkboxLabelMargin]}>
                  Doctor
                </Text>
                <TouchableOpacity
                  onPress={() => handleChange('role', 'Doctor')}
                  style={styles.checkboxWrapper}>
                  <View
                    style={[
                      styles.checkbox,
                      formData.role === 'Doctor' && styles.checkboxSelected,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={value => handleChange('name', value)}
                placeholder="Enter Name"
                placeholderTextColor="#6b7280"
                style={styles.input}
                value={formData.name}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={value => handleChange('phoneNumber', value)}
                placeholder="Enter Phone Number"
                placeholderTextColor="#6b7280"
                style={styles.input}
                value={formData.phoneNumber}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={value => handleChange('address', value)}
                placeholder="Enter Address"
                placeholderTextColor="#6b7280"
                style={styles.input}
                value={formData.address}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>City</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={value => handleChange('city', value)}
                placeholder="Enter City"
                placeholderTextColor="#6b7280"
                style={styles.input}
                value={formData.city}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Pincode</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={value => handleChange('pincode', value)}
                placeholder="Enter Pincode"
                placeholderTextColor="#6b7280"
                style={styles.input}
                value={formData.pincode}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.sectionTitle}>Gender</Text>
              <View style={styles.checkboxContainer}>
                <Text style={styles.checkboxLabel}>Male</Text>
                <TouchableOpacity
                  onPress={() => handleChange('gender', 'Male')}
                  style={styles.checkboxWrapper}>
                  <View
                    style={[
                      styles.checkbox,
                      formData.gender === 'Male' && styles.checkboxSelected,
                    ]}
                  />
                </TouchableOpacity>
                <Text
                  style={[styles.checkboxLabel, styles.checkboxLabelMargin]}>
                  Female
                </Text>
                <TouchableOpacity
                  onPress={() => handleChange('gender', 'Female')}
                  style={styles.checkboxWrapper}>
                  <View
                    style={[
                      styles.checkbox,
                      formData.gender === 'Female' && styles.checkboxSelected,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                keyboardType="numeric"
                clearButtonMode="while-editing"
                onChangeText={value => handleChange('age', value)}
                placeholder="Enter Age"
                placeholderTextColor="#6b7280"
                style={styles.input}
                value={formData.age}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.sectionTitle}>Health Information</Text>
              <View style={styles.checkboxContainer}>
                <Text style={styles.checkboxLabel}>Heart Disease</Text>
                <TouchableOpacity
                  onPress={() => handleCheckboxChange('heartDisease')}
                  style={styles.checkboxWrapper}>
                  <View
                    style={[
                      styles.checkbox,
                      formData.heartDisease && styles.checkboxSelected,
                    ]}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.checkboxContainer}>
                <Text style={styles.checkboxLabel}>Hypertension</Text>
                <TouchableOpacity
                  onPress={() => handleCheckboxChange('hypertension')}
                  style={styles.checkboxWrapper}>
                  <View
                    style={[
                      styles.checkbox,
                      formData.hypertension && styles.checkboxSelected,
                    ]}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.sectionTitle}>Allergies</Text>
                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={value =>
                    setFormData(prevFormData => ({
                      ...prevFormData,
                      newAllergy: value,
                    }))
                  }
                  onSubmitEditing={handleAddAllergy}
                  placeholder="Enter Allergies"
                  placeholderTextColor="#eee"
                  style={styles.input}
                  value={formData.newAllergy}
                />
                <TouchableOpacity
                  onPress={handleAddAllergy}
                  style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add Allergy</Text>
                </TouchableOpacity>
                <View style={styles.chipContainer}>
                  {formData.allergies.map((allergy, index) => (
                    <Chip
                      key={index}
                      onPress={() => handleRemoveAllergy(allergy)}
                      style={styles.chip}
                      textStyle={styles.chipText}>
                      {allergy}
                    </Chip>
                  ))}
                </View>
              </View>
              <Text style={[styles.sectionTitle, styles.diabetesLabel]}>
                Diabetes
              </Text>
              <View style={styles.checkboxContainer}>
                <Text style={styles.checkboxLabel}>Yes</Text>
                <TouchableOpacity
                  onPress={() => handleChange('diabetes', 'Yes')}
                  style={styles.checkboxWrapper}>
                  <View
                    style={[
                      styles.checkbox,
                      formData.diabetes === 'Yes' && styles.checkboxSelected,
                    ]}
                  />
                </TouchableOpacity>
                <Text
                  style={[styles.checkboxLabel, styles.checkboxLabelMargin]}>
                  No
                </Text>
                <TouchableOpacity
                  onPress={() => handleChange('diabetes', 'No')}
                  style={styles.checkboxWrapper}>
                  <View
                    style={[
                      styles.checkbox,
                      formData.diabetes === 'No' && styles.checkboxSelected,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.submitContainer}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT}>
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flexGrow: 1,
    flexShrink: 0,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerText: {
    fontSize: 31,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  headerHighlight: {
    fontSize: 31,
    color: '#00FF00',
  },
  formContainer: {
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 0,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 19,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxLabel: {
    fontSize: 17,
    color: 'white',
  },
  checkboxWrapper: {
    marginLeft: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#4B5563',
    borderRadius: 3,
  },
  checkboxSelected: {
    backgroundColor: '#00FF00',
  },
  checkboxLabelMargin: {
    marginLeft: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  chipContainer: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  chipText: {
    color: 'white',
  },
  diabetesLabel: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  submitContainer: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});

export default Signup;
