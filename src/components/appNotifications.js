/* eslint-disable prettier/prettier */
import React from 'react';
import { Animated, Text } from 'react-native';
import { useEffect, useRef } from 'react';

export const AppNotification = ({ type, text }) => {
    const height = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(height, {
            toValue: 40,
            duration: 500,
            useNativeDriver: false
        }).start()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const backgroundColor = type === 'error' ? 'rgba(255,0,0,0.7)' : 'rgba(0,255,0,0.7)'

    return <Animated.View style={{ fontFamily: 'Poppins-Regular', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, height, backgroundColor }} >
        <Text style={{ color: "#fff", fontSize: 16 }}>{text}</Text>
    </Animated.View>
}


export const updateNotification = (updater, text, type = 'error') => {
    updater({ text, type });
    setTimeout(() => {
        updater({ text: '', type: '' });
    }, 2500)
}