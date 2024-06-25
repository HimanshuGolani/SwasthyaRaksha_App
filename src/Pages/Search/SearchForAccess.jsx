import React, {useState} from 'react';
import {View, StyleSheet, Keyboard, FlatList} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  Card,
  ActivityIndicator,
} from 'react-native-paper';
import axios from 'axios';
import {useAppState} from '../../Context/ContextContainer';
import UserAccessCard from '../../Components/UserAccessCard';

const SetUserAccess = () => {
  const {ipv4, currentUserId} = useAppState();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const searchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://${ipv4}:4500/api/user/searchUser/?search=${search}&userId=${currentUserId}`,
      );
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setResult([]);
    } finally {
      setLoading(false);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search user by name or email"
          placeholderTextColor="#AAA"
          style={styles.input}
          onChangeText={text => setSearch(text)}
          onSubmitEditing={searchUser}
        />
        <Button
          mode="contained"
          onPress={searchUser}
          loading={loading}
          style={styles.button}
          labelStyle={styles.buttonLabel}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </View>

      {result.length === 0 && !loading && (
        <Text style={styles.noResultsText}>No users found.</Text>
      )}
      <FlatList
        data={result}
        keyExtractor={item => item._id}
        renderItem={({item}) => <UserAccessCard key={item._id} user={item} />}
        contentContainerStyle={styles.resultsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    backgroundColor: '#FFF',
  },
  buttonLabel: {
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
  noResultsText: {
    color: '#AAA',
    textAlign: 'center',
    marginTop: 16,
  },
  resultsContainer: {
    marginTop: 16,
  },
});

export default SetUserAccess;
