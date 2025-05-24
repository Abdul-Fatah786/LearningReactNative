import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ParallaxScrollView = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: 'https://placekitten.com/800/400' }} // Sample image
        style={[styles.header, { transform: [{ translateY: headerTranslate }] }]}
        resizeMode="cover"
      />
      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.content}>
          <Text style={styles.text}>This is your parallax scroll view content.</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    width: '100%',
    height: HEADER_MAX_HEIGHT,
    top: 0,
    left: 0,
    right: 0,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  content: {
    height: 1000, // For demonstration, long scrollable content
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 18,
  },
});

export default ParallaxScrollView;