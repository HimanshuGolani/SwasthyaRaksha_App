import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ViewCard = ({doctor}) => {
  console.log('The data to view:', doctor);
  return (
    <View style={styles.card}>
      {doctor.map((item, index) => (
        <>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
          <Text key={index} style={styles.viewedDate}>
            {item.viewedDates.map((date, index) => (
              <>
                <Text key={index} style={styles.viewedDate}>
                  {new Date(date).toLocaleString()}
                </Text>
              </>
            ))}
          </Text>
        </>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#fff', // Shadow color set to white
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 1,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Text color set to white
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#fff', // Text color set to white
    marginBottom: 5,
  },
  userId: {
    fontSize: 14,
    color: '#fff', // Text color set to white
    marginBottom: 10,
  },
  viewedDatesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00ff00', // Text color set to green
    marginBottom: 5,
  },
  viewedDate: {
    fontSize: 14,
    color: '#fff', // Text color set to white
  },
});

export default ViewCard;
