import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useAppState} from '../../Context/ContextContainer';
import ViewCard from '../../Components/ViewCard';

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
  const [viewedData, setViewedData] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  // Fetch user's health profile
  const getUserData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.29.45:4500/api/healthprofiles/${currentUserId}`,
      );
      setProfileData(response.data);
    } catch (error) {
      console.log('Error fetching profile data:', error);
    }
  };
  // Fetch users who viewed current user's health profile
  const getViewedData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://192.168.29.45:4500/api/healthprofiles/getProfileViewLogs?userId=${currentUserId}`,
      );

      if (response.data.logs) {
        const logsArray = Object.entries(response.data.logs).map(
          ([userId, log]) => ({
            userId,
            name: log.name,
            email: log.email,
            viewedDates: log.viewedDate,
          }),
        );

        console.log('====================================');
        console.log('The array we want : ', logsArray);
        console.log('====================================');
        setViewedData(logsArray);
      } else {
        console.error('No logs found in the response');
      }
    } catch (error) {
      console.error('Error fetching viewed data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users that have access to current user's data
  const getAccessTo = async () => {
    try {
      const response = await axios.get(
        `http://192.168.29.45:4500/api/user/getAccessUsersInfo?userId=${currentUserId}`,
      );
      setAccessTo(response.data);
    } catch (error) {
      console.log('Error fetching access users:', error);
    }
  };

  // Fetch users data that current user can access
  const getForData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.29.45:4500/api/user/getAccessForData?userId=${currentUserId}`,
      );
      setListData(response.data);
    } catch (error) {
      console.log('Error fetching access data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Remove access from a user
  const removeAccess = async removeFromId => {
    try {
      await axios.put(
        `http://192.168.29.45:4500/api/user/removeAccess?userId=${currentUserId}&accessTo=${removeFromId}`,
      );
      // After removing access, refresh the list of users with access
      getAccessTo();
    } catch (error) {
      console.log('Error removing access:', error);
    }
  };

  useEffect(() => {
    // Fetch initial data on component mount
    getUserData();
    getAccessTo();
    getForData();
    getViewedData();
  }, []);

  const ProfileDetail = ({label, value}) => (
    <Text style={styles.profileDetail}>
      <Text style={styles.boldText}>{label}:</Text> {value}
    </Text>
  );

  const ProfileSection = ({
    title,
    data,
    emptyMessage,
    actionButtonLabel,
    onActionPress,
    showLabReportsButton,
    onLabReportsPress,
  }) => (
    <View style={styles.card}>
      <Text style={styles.header}>{title}</Text>
      {data.length === 0 ? (
        <Text style={styles.noAccessText}>{emptyMessage}</Text>
      ) : (
        data.map(user => (
          <View key={user._id} style={styles.userCard}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Button
              onPress={() => onActionPress(user._id)}
              style={styles.actionButton}
              mode="contained">
              {actionButtonLabel}
            </Button>
            {showLabReportsButton && (
              <Button
                onPress={() => onLabReportsPress(user._id)}
                style={styles.actionButton}
                mode="contained">
                See Lab Reports
              </Button>
            )}
          </View>
        ))
      )}
    </View>
  );

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
              <ProfileDetail label="Age" value={profileData?.age} />
              <ProfileDetail label="Gender" value={profileData?.gender} />
              <ProfileDetail
                label="Diabetes"
                value={profileData?.diabetes ? 'Yes' : 'No'}
              />
              <ProfileDetail
                label="Phone Number"
                value={profileData?.phoneNumber}
              />
              <ProfileDetail
                label="Allergies"
                value={
                  profileData?.allergies?.length > 0
                    ? profileData?.allergies?.join(', ')
                    : 'None'
                }
              />
            </View>
          </View>
        )}

        <ProfileSection
          title="Users with Access to Your Data"
          data={accessTo}
          emptyMessage="No Access Given"
          actionButtonLabel="Remove Access"
          onActionPress={userId => removeAccess(userId)}
        />

        <ProfileSection
          title="Users Data You Can Access"
          data={listData}
          emptyMessage="You don't have access to any user's data."
          actionButtonLabel="See Prescriptions"
          onActionPress={userId =>
            navigation.navigate('UserPrescriptions', {userId})
          }
          showLabReportsButton
          onLabReportsPress={userId =>
            navigation.navigate('UserLabReports', {userId})
          }
        />
        {/*see who Viewed your healthCard  */}
        <View>
          <ViewCard doctor={viewedData} />
        </View>
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
  card: {
    backgroundColor: '#1C1C1C',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
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
  actionButton: {
    marginTop: 8,
    backgroundColor: '#4CAF50',
  },
  labReportsButton: {
    marginTop: 8,
    backgroundColor: '#2196F3',
  },
});

export default Profile;
