import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Card,
  Avatar,
  IconButton,
  Paragraph,
  Text,
  Button,
} from 'react-native-paper';
import axios from 'axios';
import {useAppState} from '../../Context/ContextContainer';

const UserCard = ({user}) => {
  const {currentUserId} = useAppState();
  const {_id} = user;
  const [expanded, setExpanded] = useState(false);
  const [healthProfile, setHealthProfile] = useState(null);
  const [error, setError] = useState(null);

  const getHealthProfileData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.29.45:4500/api/healthprofiles/${_id}`,
      );
      setHealthProfile(response.data);
    } catch (error) {
      setError('Error fetching health profile data');
    }
  };

  useEffect(() => {
    getHealthProfileData();
  }, [_id]);

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title
          title={user.name}
          subtitle={user.email}
          left={props => <Avatar.Text {...props} label={user.name.charAt(0)} />}
          right={props => (
            <IconButton
              {...props}
              icon={expanded ? 'chevron-up' : 'chevron-down'}
              onPress={() => setExpanded(!expanded)}
            />
          )}
        />
        <Card.Content>
          <Paragraph>
            {healthProfile ? (
              <>Phone Number: {healthProfile.phoneNumber}</>
            ) : (
              <>Loading...</>
            )}
          </Paragraph>
        </Card.Content>
        {expanded && (
          <Card.Content>
            <Text>Health Profile:</Text>
            {healthProfile ? (
              <>
                <Paragraph>Age: {healthProfile.age}</Paragraph>
                <Paragraph>Gender: {healthProfile.gender}</Paragraph>
                <Paragraph>
                  Heart Disease: {healthProfile.heartDisease ? 'Yes' : 'No'}
                </Paragraph>
                <Paragraph>
                  Hypertension: {healthProfile.hypertension ? 'Yes' : 'No'}
                </Paragraph>
                <Paragraph>
                  Allergies: {healthProfile.allergies.join(', ')}
                </Paragraph>
                <Paragraph>
                  Diabetes: {healthProfile.diabetes ? 'Yes' : 'No'}
                </Paragraph>
              </>
            ) : (
              <Paragraph>Not filled the health profile</Paragraph>
            )}
          </Card.Content>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default UserCard;
