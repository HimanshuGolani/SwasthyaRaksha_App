import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Title, Paragraph, Divider} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useAppState} from '../../Context/ContextContainer';

const UploadeLabReport = () => {
  const navigation = useNavigation();

  const [reportData, setReportData] = useState({
    reportName: '',
    reportDate: new Date(),
    reportImage: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const {currentUserId} = useAppState();

  const handleInputChange = (name, value) => {
    setReportData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || reportData.reportDate;
    setShowDatePicker(false);
    setReportData(prevData => ({
      ...prevData,
      reportDate: currentDate,
    }));
  };

  const handleSubmit = async () => {
    console.log('Form submitted:', reportData);
    await addLabReports();
    navigation.navigate('LabReport');
  };

  const addLabReports = async () => {
    const response = await axios.post(
      `http://192.168.29.132:4500/api/labR/add`,
      {
        ReportName: reportData.reportName,
        ReportDate: reportData.reportDate.toLocaleDateString('en-GB'),
        image: reportData.reportImage,
        user: currentUserId,
      },
    );
    const data = response.data;
    setReportData(data);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.heading}>Report Upload Page</Title>
      <View style={styles.form}>
        <TextInput
          label="Report Name"
          value={reportData.reportName}
          onChangeText={text => handleInputChange('reportName', text)}
          placeholder="Enter the name of the report"
          style={styles.input}
        />
        <Divider style={styles.divider} />
        <Paragraph>Select the date of the report</Paragraph>
        <Button onPress={() => setShowDatePicker(true)}>Select Date</Button>
        {showDatePicker && (
          <DateTimePicker
            value={reportData.reportDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <Divider style={styles.divider} />
        <Paragraph>Select the image from your files.</Paragraph>
        <TextInput
          label="Report Image"
          value={reportData.reportImage}
          onChangeText={text => handleInputChange('reportImage', text)}
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

export default UploadeLabReport;
