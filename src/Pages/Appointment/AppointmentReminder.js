import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useAppState} from '../../Context/ContextContainer';

const AppointmentReminder = () => {
  const [formData, setFormData] = useState({
    email: '',
    hospitalName: '',
    doctorName: '',
    reasonForVisit: '',
    appointmentDate: new Date(),
  });
  const {currentUserId} = useAppState();
  console.log('====================================');
  console.log(`The current user id is : ${currentUserId}`);
  console.log('====================================');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [currentStep, setCurrentStep] = useState(null);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleChange = (name, value) => {
    setFormData(prevData => ({...prevData, [name]: value}));
  };

  const handleSetReminder = () => {
    setCurrentStep('setReminder');
    setMessage('');
  };

  const fetchAppointments = async () => {
    setLoadingAppointments(true);
    try {
      const response = await axios.get(
        `http://192.168.29.45:4500/api/appointments/${currentUserId}`,
      );
      console.log('====================================');
      console.log(`The appoinments are : ${response.data.Appointments}`);
      console.log('====================================');
      setAppointments(response.data.Appointments);
      setError('');
    } catch (error) {
      console.error('Error occurred while fetching appointments:', error);
      setError('Failed to fetch appointments. Please try again later.');
    } finally {
      setLoadingAppointments(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        'http://192.168.29.45:4500/api/appointments/create',
        formData,
      );
      setMessage('Reminder set successfully!');
      await fetchAppointments();
      setCurrentStep('viewAppointments');
    } catch (error) {
      setMessage('Error occurred while setting reminder.');
      console.error('Error occurred while setting reminder:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToChoices = () => {
    setMessage('');
    setCurrentStep(null);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today;
  };

  return (
    <View style={styles.container}>
      {currentStep === null && (
        <>
          <Text style={styles.title}>Choose an Action</Text>
          <TouchableOpacity style={styles.button} onPress={handleSetReminder}>
            <Text style={styles.buttonText}>Set Appointment Reminder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              fetchAppointments();
              setCurrentStep('viewAppointments');
            }}>
            <Text style={styles.buttonText}>View Appointments</Text>
          </TouchableOpacity>
        </>
      )}
      {currentStep === 'setReminder' && (
        <>
          <Text style={styles.title}>Set Appointment Reminder</Text>
          <View style={styles.form}>
            {[
              {label: 'Enter your Email', name: 'email', type: 'email'},
              {label: 'Hospital Name', name: 'hospitalName', type: 'text'},
              {label: 'Doctor Name', name: 'doctorName', type: 'text'},
              {label: 'Reason for Visit', name: 'reasonForVisit', type: 'text'},
            ].map(({label, name, type}) => (
              <View key={name} style={styles.inputContainer}>
                <Text>{label}</Text>
                <TextInput
                  style={styles.input}
                  value={formData[name]}
                  onChangeText={text => handleChange(name, text)}
                  placeholder={label}
                  keyboardType={type === 'email' ? 'email-address' : 'default'}
                />
              </View>
            ))}
            <View style={styles.inputContainer}>
              <Text>Appointment Date</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.dateInput}>
                <Text>{formData.appointmentDate.toLocaleString()}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={formData.appointmentDate}
                  mode="datetime"
                  minimumDate={getCurrentDate()}
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate =
                      selectedDate || formData.appointmentDate;
                    setShowDatePicker(false);
                    handleChange('appointmentDate', currentDate);
                  }}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={isSubmitting}>
              <Text style={styles.buttonText}>
                {isSubmitting ? 'Setting Reminder...' : 'Set Reminder'}
              </Text>
            </TouchableOpacity>
            {message && (
              <Text
                style={[
                  styles.message,
                  message.includes('successfully')
                    ? styles.successMessage
                    : styles.errorMessage,
                ]}>
                {message}
              </Text>
            )}
            <TouchableOpacity
              style={[styles.button, styles.backButton]}
              onPress={handleBackToChoices}>
              <Text style={styles.buttonText}>Back to Choices</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {currentStep === 'viewAppointments' && (
        <>
          <Text style={styles.title}>View Appointments</Text>
          {loadingAppointments ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : appointments.length > 0 ? (
            <FlatList
              data={appointments}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                <View style={styles.appointmentCard}>
                  <Text>
                    <Text style={styles.bold}>Email:</Text>

                    <Text style={styles.subBold}>{item.email}</Text>
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Hospital:</Text>
                    <Text style={styles.subBold}>{item.hospitalName}</Text>
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Doctor:</Text>{' '}
                    <Text style={styles.subBold}> {item.doctorName}</Text>
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Reason:</Text>
                    <Text style={styles.subBold}>{item.reasonForVisit}</Text>
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Date:</Text>
                    <Text style={styles.subBold}>
                      {new Date(item.appointmentDate).toLocaleString()}
                    </Text>
                  </Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noAppointmentsText}>
              No appointments found.
            </Text>
          )}
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={handleBackToChoices}>
            <Text style={styles.buttonText}>Back to Choices</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1E90FF',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 1,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  dateInput: {
    height: 40,
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  message: {
    textAlign: 'center',
    marginTop: 10,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 1,
    marginBottom: 15,
  },
  bold: {
    textDecorationColorL: '#000',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dashed',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
  subBold: {
    fontSize: 17,
    color: '#000',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
  noAppointmentsText: {
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
  },
});

export default AppointmentReminder;
