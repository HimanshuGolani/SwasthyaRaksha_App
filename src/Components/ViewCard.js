import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ViewCard = ({doctor}) => {
  console.log('The data to view:', doctor);
  return (
    <View style={styles.container}>
      {doctor.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.details}>
            <Text style={styles.name}>{`Name : ${item.name}`}</Text>
            <Text style={styles.email}>{`Email : ${item.email}`}</Text>
          </View>
          <View style={styles.viewedDatesContainer}>
            <Text style={styles.viewedDatesTitle}>Viewed Dates:</Text>
            {item.viewedDates
              .sort((a, b) => new Date(b) - new Date(a))
              .map((date, idx) => (
                <Text key={idx} style={styles.viewedDate}>
                  {`${idx + 1} : ${new Date(date).toLocaleString()}`}
                </Text>
              ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: '#333', // Dark background for better contrast
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000', // Shadow color set to black for consistency
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 1,
    marginBottom: 15,
  },
  details: {
    marginBottom: 15, // Added margin to separate sections
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Text color set to white
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#ccc', // Slightly lighter color for email for distinction
    marginBottom: 10,
  },
  viewedDatesContainer: {
    backgroundColor: '#444', // Slightly different background for viewed dates section
    padding: 10,
    borderRadius: 5,
  },
  viewedDatesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00ff00', // Text color set to green
    marginBottom: 5,
  },
  viewedDate: {
    fontSize: 16,
    color: '#f2f2f2', // Text color set to white
    marginBottom: 2, // Slight margin between dates for readability
  },
});

export default ViewCard;
