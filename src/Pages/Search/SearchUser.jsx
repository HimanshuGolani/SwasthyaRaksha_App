import React, {useState} from 'react';
import {View, StyleSheet, Keyboard, FlatList} from 'react-native';
import {Button, TextInput, Text, Card, IconButton} from 'react-native-paper';
import axios from 'axios';
import {useAppState} from '../../Context/ContextContainer';

const SearchUser = () => {
  const {currentUserId, name, email} = useAppState();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [expanded, setExpanded] = useState({});

  const addUserDateTime = async healthProfileId => {
    try {
      const response = await axios.post(
        `http://192.168.29.45:4500/api/healthprofiles/whoViewdProfile/?userId=${currentUserId}&name=${name}&email=${email}&healthProfileId=${healthProfileId}`,
      );

      console.log(response.data);
    } catch (error) {
      console.error('Error logging profile view:', error);
    }
  };

  const searchUser = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://192.168.29.45:4500/api/user/searchUser/?search=${search}&userId=${currentUserId}`,
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching health profile:', error);
      return null;
    }
  };

  const toggleExpand = async userId => {
    if (expanded[userId]?.expanded) {
      setExpanded(prev => ({...prev, [userId]: {expanded: false}}));
    } else {
      const healthProfile = await fetchHealthProfile(userId);
      setExpanded(prev => ({
        ...prev,
        [userId]: {expanded: true, healthProfile},
      }));

      addUserDateTime(healthProfile._id);
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
        renderItem={({item}) => (
          <Card key={item._id} style={styles.card}>
            <Card.Title
              title={`Name : ${item.name}`}
              subtitle={`Email : ${item.email}`}
              titleStyle={styles.cardTitle}
              subtitleStyle={styles.cardSubtitle}
              right={props => (
                <IconButton
                  {...props}
                  icon={
                    expanded[item._id]?.expanded ? 'chevron-up' : 'chevron-down'
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
        keyExtractor={item => item._id}
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
    borderRadius: 4,
    paddingHorizontal: 10,
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
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#1C1C1C',
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
    padding: 10,
  },
  cardTitle: {
    color: 'white',
  },
  cardSubtitle: {
    color: 'white',
  },
  cardContent: {
    color: 'white',
    paddingTop: 8,
    paddingBottom: 8,
  },
  expandButton: {
    marginRight: 7,
  },
  expandButtonLabel: {
    color: 'white',
    textTransform: 'capitalize',
  },
});

export default SearchUser;
