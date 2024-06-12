import React from 'react';
import {Button, Card, Paragraph, Title} from 'react-native-paper';
import {Alert, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LabReportCard = ({ReportImage, ReportType, ReportDate}) => {
  const navigation = useNavigation();

  return (
    <Card style={styles.card}>
      <Card.Cover source={{uri: ReportImage}} style={styles.cover} />
      <Card.Content>
        <Title style={styles.title}>Report Type: {ReportType}</Title>
        <Paragraph style={styles.paragraph}>
          Date of Report: {ReportDate}
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() =>
            navigation.navigate('FullImageView', {imageUrl: ReportImage})
          }>
          View the image
        </Button>
        <Button
          onPress={() =>
            Alert.alert('Download', 'Image downloaded successfully.')
          }>
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
    backgroundColor: '#1a202c', // Dark background
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

export default LabReportCard;
