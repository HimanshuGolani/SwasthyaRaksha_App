import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, Pressable} from 'react-native';
import {Text, Button} from 'react-native-paper';
import axios from 'axios';
import LabReportCard from './LabReportCard';
import {useAppState} from '../../Context/ContextContainer';
import {useNavigation} from '@react-navigation/native';

const LabReports = () => {
  const [labReports, setLabReports] = useState([]);
  const {currentUserId} = useAppState();
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const getAllLabReports = async () => {
    try {
      const response = await axios.get(
        `http://192.168.29.45:4500/api/labR/${currentUserId}`,
      );

      const data = response.data.labReport;

      console.log(data);
      setLabReports(data.labReports);
    } catch (error) {
      console.error('Error fetching lab reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllLabReports();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.addLabReportContainer}>
          <View style={styles.addLabReportTextContainer}>
            <Text style={styles.addLabReportTitle}>Add Lab Report</Text>
            <Text style={styles.addLabReportDescription}>
              You can add a lab report from your camera roll or take a picture
              of it.
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('UploadeLabReport')}
            style={styles.addButton}>
            <Text> Add Lab Report</Text>
          </Pressable>
        </View>
        <View style={styles.labReportsContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : labReports.length > 0 ? (
            labReports.map((item, index) => (
              <LabReportCard
                key={index}
                ReportImage={item.image}
                ReportType={item.ReportName}
                ReportDate={item.ReportDate}
              />
            ))
          ) : (
            <View style={styles.noLabReportsContainer}>
              <Text>No lab reports added yet, please add one.</Text>
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
    backgroundColor: '#000',
    paddingBottom: 20,
  },
  content: {
    marginTop: 30,
    flex: 1,
    paddingHorizontal: 16,
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
  },
  addLabReportContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#1a202c',
    borderRadius: 12,
    borderColor: '#38a169',
    borderWidth: 1,
    alignItems: 'center',
  },
  addLabReportTextContainer: {
    flex: 1,
    marginRight: 10,
    flexDirection: 'column',
  },
  addLabReportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#38a169',
  },
  addLabReportDescription: {
    marginTop: 4,
    color: '#a0aec0',
  },
  addButton: {
    justifyContent: 'center',
    backgroundColor: '#38a169',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  labReportsContainer: {
    marginTop: 32,
    width: '100%',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  loadingText: {
    color: '#a0aec0',
  },
  noLabReportsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  noLabReportsText: {
    color: '#a0aec0',
  },
});

export default LabReports;
