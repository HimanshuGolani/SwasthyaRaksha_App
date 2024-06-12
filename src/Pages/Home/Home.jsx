import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import {Surface, Card, Title, Paragraph} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import cardImage from '../../assets/Images/Card-image.jpg';
import cardImage2 from '../../assets/Images/AppointmentReminderImg.jpg';

const Home = () => {
  const {width} = useWindowDimensions();

  const cardData = [
    {
      url: 'https://blogimages.softwaresuggest.com/blog/wp-content/uploads/2023/02/08161311/Top-15-Hospital-Information-Systems-You-Must-Look-Into-1.jpg',
      contentH: 'Access Health Documents anytime anywhere.',
      contentD:
        'You can store and review all the health related data in just one click.',
    },
    {
      url: Image.resolveAssetSource(cardImage).uri,
      contentH: 'See your health data over time',
      contentD:
        'Easily view your health data over time with daily, weekly, monthly, and yearly views.',
    },
    {
      url: Image.resolveAssetSource(cardImage2).uri,
      contentH: 'Forgetting your appointments? No worries!',
      contentD:
        'Our app will remind you about upcoming appointments. Get reminded before 24hr and 3hr before the appointment. You can also add or remove them at any time.',
    },
  ];

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView>
        <View style={styles.container}>
          <Surface style={styles.surface}>
            <Title style={[styles.title, {fontSize: width < 400 ? 20 : 24}]}>
              Welcome to SwasthyaRaksha
            </Title>
          </Surface>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>
                What is SwasthyaRaksha ..?!
              </Title>
              <Paragraph style={styles.paragraph}>
                • Health Tracker is a platform where users can store all the
                health related data.
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                • Share data with other users like doctors or friends in case of
                emergency.
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                • During an emergency, the doctor can search the user and view
                their health profile.
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                • The health profile includes important information required for
                emergency treatment.
              </Paragraph>
            </Card.Content>
          </Card>
          {cardData.map((data, index) => (
            <Card key={index} style={styles.imageCard}>
              <Card.Cover source={{uri: data.url}} style={styles.cardImage} />
              <Card.Content>
                <Title
                  style={[
                    styles.imageCardTitle,
                    {fontSize: width < 400 ? 20 : 21},
                  ]}>
                  {data.contentH}
                </Title>
                <Paragraph
                  style={[
                    styles.imageCardParagraph,
                    {fontSize: width < 400 ? 17 : 18},
                  ]}>
                  {data.contentD}
                </Paragraph>
              </Card.Content>
            </Card>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#000',
    flex: 1,
    paddingBottom: 20,
  },
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  surface: {
    backgroundColor: '#1C1C1C',
    margin: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1C1C1C',
    margin: 20,
    borderRadius: 10,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 10,
    fontSize: 24,
  },
  paragraph: {
    color: '#AAA',
    fontSize: 20,
    marginBottom: 10,
  },
  imageCard: {
    backgroundColor: '#1C1C1C',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageCardTitle: {
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
  },
  imageCardParagraph: {
    color: '#AAA',
    marginTop: 5,
  },
});

export default Home;
