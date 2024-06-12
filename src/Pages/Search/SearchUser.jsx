import React, {useState} from 'react';
import {View, StyleSheet, Keyboard, FlatList} from 'react-native';
import {Button, TextInput, Text, Card, IconButton} from 'react-native-paper';
import axios from 'axios';
import {useAppState} from '../../Context/ContextContainer';

const SearchUser = () => {
  const {currentUserId} = useAppState();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [expanded, setExpanded] = useState({});

  const searchUser = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://192.168.29.132:4500/api/user/searchUser/?search=${search}&userId=${currentUserId}`,
      );
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setResult([]);
    } finally {
      setLoading(false);
      Keyboard.dismiss();
    }
  };

  const fetchHealthProfile = async userId => {
    try {
      const response = await axios.get(
        `http://192.168.29.45:4500/api/healthprofiles/${userId}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching health profile:', error);
      return null;
    }
  };

  const toggleExpand = async userId => {
    if (expanded[userId]) {
      setExpanded(prev => ({...prev, [userId]: !prev[userId]}));
    } else {
      const healthProfile = await fetchHealthProfile(userId);
      setExpanded(prev => ({
        ...prev,
        [userId]: {expanded: true, healthProfile},
      }));
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
        renderItem={({item, index}) => (
          <Card key={index} style={styles.card}>
            <Card.Title
              title={item.name}
              subtitle={item.email}
              titleStyle={styles.cardTitle}
              subtitleStyle={styles.cardSubtitle}
              right={props => (
                <IconButton
                  {...props}
                  icon={
                    expanded[item._id]?.expanded
                      ? 'arrow-up'
                      : 'menu-down-outline'
                  }
                  onPress={() => toggleExpand(item._id)}
                />
              )}
            />
            {expanded[item._id]?.expanded && (
              <Card.Content>
                {expanded[item._id].healthProfile ? (
                  <>
                    <Text style={styles.cardContent}>
                      Age: {expanded[item._id].healthProfile.age}
                    </Text>
                    <Text style={styles.cardContent}>
                      Gender: {expanded[item._id].healthProfile.gender}
                    </Text>
                    <Text style={styles.cardContent}>
                      Heart Disease:{' '}
                      {expanded[item._id].healthProfile.heartDisease
                        ? 'Yes'
                        : 'No'}
                    </Text>
                    <Text style={styles.cardContent}>
                      Hypertension:{' '}
                      {expanded[item._id].healthProfile.hypertension
                        ? 'Yes'
                        : 'No'}
                    </Text>
                    <Text style={styles.cardContent}>
                      Allergies:{' '}
                      {expanded[item._id].healthProfile.allergies.join(', ')}
                    </Text>
                    <Text style={styles.cardContent}>
                      Diabetes:{' '}
                      {expanded[item._id].healthProfile.diabetes ? 'Yes' : 'No'}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.cardContent}>
                    Not filled the health profile
                  </Text>
                )}
              </Card.Content>
            )}
          </Card>
        )}
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
    color: 'black',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#FFF',
  },
  buttonLabel: {
    color: '#000',
  },
  noResultsText: {
    color: '#AAA',
    textAlign: 'center',
    marginTop: 16,
  },
  resultsContainer: {
    marginTop: 16,
  },
  card: {
    backgroundColor: '#1C1C1C',
    color: 'white',
    marginBottom: 16,
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
    color: 'white',
  },
  cardSubtitle: {
    color: 'white',
  },
  cardContent: {
    color: 'white',
  },
});

export default SearchUser;
