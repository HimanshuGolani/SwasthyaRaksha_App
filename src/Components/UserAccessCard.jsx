import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Button, Snackbar, Title, Paragraph} from 'react-native-paper';
import axios from 'axios';
import {useAppState} from '../Context/ContextContainer';

const UserAccessCard = ({user}) => {
  const {currentUserId} = useAppState();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const setUserAccess = async () => {
    try {
      const cardUserId = user._id;
      const response = await axios.post(
        `http://192.168.29.45:4500/api/user/addAccess?userId=${currentUserId}&accessTo=${cardUserId}`,
      );

      setSnackbarMessage('User added successfully');
      setSnackbarSeverity('success');
      setSnackbarVisible(true);
    } catch (error) {
      console.error('Error adding user:', error);
      setSnackbarMessage('Failed to add user');
      setSnackbarSeverity('error');
      setSnackbarVisible(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarVisible(false);
  };

  const {name, email} = user;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{name}</Title>
          <Paragraph style={styles.email}>{email}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button mode="contained" onPress={setUserAccess}>
            Add
          </Button>
        </Card.Actions>
      </Card>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleCloseSnackbar}
        duration={3000}
        style={styles[snackbarSeverity]}>
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  card: {
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
  },
  title: {
    color: 'white',
  },
  email: {
    color: '#AAA',
  },
  actions: {
    justifyContent: 'flex-end',
  },
  success: {
    backgroundColor: 'green',
  },
  error: {
    backgroundColor: 'red',
  },
});

export default UserAccessCard;
