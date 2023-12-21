/* eslint-disable prettier/prettier */
import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, FlatList, Animated} from 'react-native';
import OnboardingItem from './OnboardingItem';
import slides from '../../components/slides';

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const slidesRef = useRef(null);
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({item}) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
      <View style={styles.wrapDot}>
        {slides.map(item => (
          <Text
            key={item.id}
            style={currentIndex == item.id - 1 ? styles.dotActive : styles.dot}>
            ⬤
          </Text>
        ))}
      </View>
    </View>
  );
};
export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: '#FF8C98',
  },
  dot: {
    margin: 3,
    color: '#28283A',
    opacity: 0.9,
  },
});
