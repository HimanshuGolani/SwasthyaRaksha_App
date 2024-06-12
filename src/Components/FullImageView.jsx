import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageZoomViewer from 'react-native-image-zoom-viewer';

const FullImageView = ({route}) => {
  const images = [{url: route.params.imageUrl}];

  return (
    <SafeAreaView style={styles.container}>
      {route.params.imageUrl ? (
        <ImageZoomViewer imageUrls={images} style={styles.imageZoom} />
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Something went wrong</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageZoom: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default FullImageView;
