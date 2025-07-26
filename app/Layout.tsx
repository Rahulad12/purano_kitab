// app/Layout.tsx (or wherever it's saved)
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Footer from './components/Footer';
import Header from './components/Header';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={{ flex: 1 }}>
                {children}
            </View>
            <Footer />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
