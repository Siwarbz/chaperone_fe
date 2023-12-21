/* eslint-disable prettier/prettier */
import React from 'react';
import Animated from 'react-native-reanimated';
export const HeartbeatAnimation = (value, minValue, maxValue) =>
  Animated.loop(
    Animated.sequence([
      Animated.timing(value, {
        toValue: maxValue,
        duration: 100,
      }),
      Animated.timing(value, {
        toValue: minValue,
        duration: 100,
      }),
      Animated.timing(value, {
        toValue: maxValue,
        duration: 100,
      }),
      Animated.timing(value, {
        toValue: minValue,
        duration: 2000,
      }),
    ]),
  );
