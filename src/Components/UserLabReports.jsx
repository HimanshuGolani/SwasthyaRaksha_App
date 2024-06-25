import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import LabReportCard from '../Pages/LabReports/LabReportCard';
import {useAppState} from '../Context/ContextContainer';

const UserLabReports = ({route}) => {
  const {userId} = route.params;
  const {ipv4} = useAppState();

  const [labReports, setLabReports] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('====================================');
  console.log(userId);
  console.log('====================================');
  const getAllLabReports = async () => {
    try {
      const response = await axios.get(
        `http://${ipv4}:4500/api/labR/${userId}`,
      );

      const data = response.data.labReport;

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

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#38a169" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {labReports.length > 0 ? (
        labReports.map((report, index) => (
          <LabReportCard
            key={index}
            ReportImage={report.image}
            ReportType={report.ReportName}
            ReportDate={report.ReportDate}
          />
        ))
      ) : (
        <View style={styles.noLabReportsContainer}>
          <Text style={styles.noLabReportsText}>No lab reports found.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  noLabReportsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noLabReportsText: {
    fontSize: 20,
    color: '#eee',
  },
});

export default UserLabReports;
