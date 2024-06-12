import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useAppState} from '../../Context/ContextContainer';
import {Button} from 'react-native-paper';

const LoadingSpinner = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
);

const Profile = () => {
  const {currentUserId} = useAppState();
  const [profileData, setProfileData] = useState(null);
  const [accessTo, setAccessTo] = useState([]);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  // gets health profile of the user
  const getUserData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.29.132:4500/api/healthprofiles/${currentUserId}`,
      );
      console.log(response.data);
      setProfileData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // gets the list of the users that the current user has given access to.
  const getAccessTo = async () => {
    try {
      const response = await axios.get(
        `http://192.168.29.132:4500/api/user/getAccessUsersInfo?userId=${currentUserId}`,
      );
      setAccessTo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // gets the individual data of the users that the current user can access
  const getForData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.29.132:4500/api/user/getAccessForData?userId=${currentUserId}`,
      );
      setListData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccessTo();
    getUserData();
    getForData();
  }, []);

  const removeAccess = async removeFromId => {
    try {
      const response = await axios.put(
        `http://192.168.29.132:4500/api/user/removeAccess?userId=${currentUserId}&accessTo=${removeFromId}`,
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Your Health Profile</Text>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {profileData ? profileData.name[0] : ''}
                </Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{profileData?.name}</Text>
                <Text style={styles.profileEmail}>{profileData?.email}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.profileDetail}>
                <Text style={styles.boldText}>Age:</Text> {profileData?.age}
              </Text>
              <Text style={styles.profileDetail}>
                <Text style={styles.boldText}>Gender:</Text>{' '}
                {profileData?.gender}
              </Text>
              <Text style={styles.profileDetail}>
                <Text style={styles.boldText}>Diabetes:</Text>{' '}
                {profileData?.diabetes ? 'Yes' : 'No'}
              </Text>
              <Text style={styles.profileDetail}>
                <Text style={styles.boldText}>Phone Number:</Text>{' '}
                {profileData?.phoneNumber}
              </Text>
              <Text style={styles.profileDetail}>
                <Text style={styles.boldText}>Allergies:</Text>
              </Text>
              {profileData?.allergies && profileData.allergies.length > 0 ? (
                <View>
                  {profileData.allergies.map((allergy, index) => (
                    <Text key={index} style={styles.allergyText}>
                      {allergy}
                    </Text>
                  ))}
                </View>
              ) : (
                <Text style={styles.allergyText}>None</Text>
              )}
            </View>
          </View>
        )}

        {!loading && (
          <View style={styles.card}>
            <Text style={styles.header}>Users with Access to Your Data</Text>
            {accessTo.length === 0 ? (
              <>
                <Text
                  style={{
                    fontSize: 23,
                    color: 'white',
                    textAlign: 'center',
                    borderColor: 'white',
                    borderWidth: 1,
                  }}>
                  No Access Given
                </Text>
              </>
            ) : (
              accessTo.map((user, index) => (
                <View key={index} style={styles.userCard}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  <Button
                    onPress={() => removeAccess(user._id)}
                    style={{
                      marginTop: 8,
                      backgroundColor: 'white',
                    }}>
                    Remove access
                  </Button>
                </View>
              ))
            )}
          </View>
        )}

        {!loading && (
          <View style={styles.card}>
            <Text style={styles.header}>Users Data You Can Access</Text>
            {listData.length > 0 ? (
              listData.map(item => (
                <View key={item._id} style={styles.userCard}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.userEmail}>{item.email}</Text>
                  {/* Add more details as needed */}
                </View>
              ))
            ) : (
              <Text style={styles.noAccessText}>
                You don't have access to any user's data.
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#1C1C1C',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  profileEmail: {
    color: '#AAA',
  },
  profileDetail: {
    color: '#FFF',
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
  },
  allergyText: {
    color: '#FFF',
  },
  card: {
    backgroundColor: '#1C1C1C',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    flex: 1,
    justifyContent: 'center',
  },
  userCard: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  userEmail: {
    color: '#AAA',
  },
  noAccessText: {
    color: '#AAA',
    textAlign: 'center',
  },
});

export default Profile;
