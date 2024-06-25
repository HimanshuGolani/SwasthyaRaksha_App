import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Title,
  Paragraph,
  Divider,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useAppState} from '../../Context/ContextContainer';

const UploadePrescription = () => {
  const navigation = useNavigation();
  const {ipv4, currentUserId} = useAppState();

  const [prescriptionData, setPrescriptionData] = useState({
    prescriptionImg: '',
    doctorName: '',
    dateOfPrescription: new Date(),
    hospitalName: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const addPrescription = async () => {
    const response = await axios.post(
      `http://${ipv4}:4500/api/prescription/add`,
      {
        DoctorName: prescriptionData.doctorName,
        HospitalName: prescriptionData.hospitalName,
        image: prescriptionData.prescriptionImg,
        prescDate:
          prescriptionData.dateOfPrescription.toLocaleDateString('en-GB'),
        user: currentUserId,
      },
    );

    console.log(response);
  };

  const handleInputChange = (name, value) => {
    setPrescriptionData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || prescriptionData.dateOfPrescription;
    setShowDatePicker(false);
    setPrescriptionData(prevData => ({
      ...prevData,
      dateOfPrescription: currentDate,
    }));
  };

  const handleFileChange = value => {
    setPrescriptionData(prevData => ({
      ...prevData,
      prescriptionImg: value,
    }));
  };

  const handleSubmit = async () => {
    await addPrescription();
    console.log('Form submitted:', prescriptionData);
    navigation.navigate('Prescription');
  };

  return (
    <View style={styles.container}>
      <Title style={styles.heading}>Prescription Upload Page</Title>
      <View style={styles.form}>
        <TextInput
          label="Doctor's Name"
          value={prescriptionData.doctorName}
          onChangeText={text => handleInputChange('doctorName', text)}
          placeholder="Enter the doctor's name"
          style={styles.input}
        />
        <Divider style={styles.divider} />
        <Paragraph>Select the date of the prescription</Paragraph>
        <Button onPress={() => setShowDatePicker(true)}>Select Date</Button>
        {showDatePicker && (
          <DateTimePicker
            value={prescriptionData.dateOfPrescription}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <Divider style={styles.divider} />
        <TextInput
          label="Hospital Name"
          value={prescriptionData.hospitalName}
          onChangeText={text => handleInputChange('hospitalName', text)}
          placeholder="Enter the hospital name"
          style={styles.input}
        />
        <Divider style={styles.divider} />
        <Paragraph>Select the prescription image from your files.</Paragraph>
        <TextInput
          label="Prescription Image"
          value={prescriptionData.prescriptionImg}
          onChangeText={text => handleFileChange(text)}
          placeholder="Enter image URL"
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Submit
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  input: {
    marginBottom: 12,
  },
  divider: {
    marginVertical: 12,
  },
  button: {
    marginTop: 20,
  },
});

export default UploadePrescription;
