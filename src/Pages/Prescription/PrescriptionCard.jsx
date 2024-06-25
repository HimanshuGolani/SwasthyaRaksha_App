import React from 'react';
import {Button, Card, Paragraph, Title} from 'react-native-paper';
import {Alert, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PrescriptionCard = ({
  prescUrl,
  DoctorName,
  HospitalName,
  DateOfReport,
}) => {
  const navigation = useNavigation();

  return (
    <Card style={styles.card}>
      <Card.Cover source={{uri: prescUrl}} style={styles.cover} />
      <Card.Content>
        <Title style={styles.title}>Doctor name: {DoctorName}</Title>
        <Paragraph style={styles.paragraph}>
          Hospital Name: {HospitalName}
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          Date of Report: {DateOfReport}
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() =>
            navigation.navigate('FullImageView', {imageUrl: prescUrl})
          }>
          View the image
        </Button>
        <Button onPress={() => Alert.alert('Image Downloaded Succesfully')}>
          Download the image
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#000',
  },
  cover: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  paragraph: {
    fontSize: 18,
    color: 'white',
  },
});

export default PrescriptionCard;
