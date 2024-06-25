import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import axios from 'axios';
import PrescriptionCard from './PrescriptionCard';
import {useAppState} from '../../Context/ContextContainer';
import {useNavigation} from '@react-navigation/native';
const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const {ipv4, currentUserId} = useAppState();
  const navigation = useNavigation();

  const getAllPrescriptions = async () => {
    try {
      let response = await axios.get(
        `http://${ipv4}:4500/api/prescription/${currentUserId}`,
      );

      const data = response.data.prescription;
      console.log(data);
      setPrescriptions(data.prescriptions);
    } catch (error) {
      console.log('The error is : ', error);
    }
  };

  useEffect(() => {
    getAllPrescriptions();
    console.log(prescriptions);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.addPrescriptionContainer}>
          <View style={styles.addPrescriptionTextContainer}>
            <Text style={styles.addPrescriptionTitle}>Add Prescription</Text>
            <Text style={styles.addPrescriptionDescription}>
              You can add a prescription from your camera roll or take a picture
              of it.
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('UploadePrescription')}
            style={styles.addButton}>
            Add Prescription
          </Button>
        </View>
        <View style={styles.prescriptionsContainer}>
          {prescriptions.length > 0 ? (
            prescriptions.map((item, index) => (
              <PrescriptionCard
                prescUrl={item.image}
                DoctorName={item.DoctorName}
                HospitalName={item.HospitalName}
                DateOfReport={item.prescDate}
                key={index}
              />
            ))
          ) : (
            <View style={styles.noPrescriptionsContainer}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                No prescriptions added yet, please add one.
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    paddingBottom: 20,
  },
  header: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 20,
    width: '100%',
  },

  content: {
    marginTop: 30,
    flex: 1,
    paddingHorizontal: 16,
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
  },
  addPrescriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#1a202c', // Dark background
    borderRadius: 12,
    borderColor: '#38a169', // Green border
    borderWidth: 1,
    alignItems: 'center',
  },
  addPrescriptionTextContainer: {
    flex: 1,
    marginRight: 10,
    flexDirection: 'column',
  },
  addPrescriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#38a169', // Green text
  },
  addPrescriptionDescription: {
    marginTop: 4,
    color: '#a0aec0', // Light grey text
  },
  addButton: {
    justifyContent: 'center',
    backgroundColor: '#38a169', // Green button
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  prescriptionsContainer: {
    marginTop: 32,
    width: '100%',
  },
  noPrescriptionsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  noPrescriptionsText: {
    color: '#a0aec0', // Light grey text
  },
});

export default Prescription;
