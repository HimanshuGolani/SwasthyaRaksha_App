import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PrescriptionCard from '../Pages/Prescription/PrescriptionCard';
import axios from 'axios';

const UserPrescriptions = ({route}) => {
  const {userId} = route.params;
  const [prescriptions, setPrescriptions] = useState([]);
  console.log('====================================');
  console.log(userId);
  console.log('====================================');
  const getAllPrescriptions = async () => {
    try {
      const response = await axios.get(
        `http://192.168.29.132:4500/api/prescription/${userId}`,
      );
      const data = response.data.prescription;
      setPrescriptions(data.prescriptions);
    } catch (error) {
      console.log('Error fetching prescriptions:', error);
    }
  };

  useEffect(() => {
    getAllPrescriptions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {prescriptions.length > 0 ? (
          prescriptions.map((item, index) => (
            <PrescriptionCard
              key={index}
              prescUrl={item.image}
              DoctorName={item.DoctorName}
              HospitalName={item.HospitalName}
              DateOfReport={item.prescDate}
            />
          ))
        ) : (
          <View style={styles.noPrescriptionsContainer}>
            <Text style={styles.noPrescriptionsText}>
              No prescriptions added yet by the user.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  noPrescriptionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPrescriptionsText: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#38a169',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default UserPrescriptions;
