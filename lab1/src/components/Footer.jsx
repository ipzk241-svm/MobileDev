import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>Сергійко Василь, ІПЗк-24-1</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: 'gray',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        color: '#333',
        fontSize: 16,
    },
});

export default Footer;