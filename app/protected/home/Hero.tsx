import globalStyles from '@/app/style/global'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

const Hero = () => {
    const buttonText = [
        { text: 'Academic', onPress: () => alert('Academic pressed') },
        { text: 'Fiction', onPress: () => alert('Fiction pressed') },
        { text: 'Non-Fiction', onPress: () => alert('Non-Fiction pressed') },
        { text: 'Entrance Exam', onPress: () => alert('Entrance Exam pressed') },
        { text: 'Others', onPress: () => alert('Others pressed') },
    ]

    return (
        <View style={{ ...globalStyles.container }}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search Books..."
                    style={styles.searchInput}
                    placeholderTextColor="#666"
                />
            </View>

            {/* Horizontal Scroll Buttons */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.buttonScrollContainer}
            >
                {buttonText.map((button, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={button.onPress}
                        style={globalStyles.button}
                    >
                        <Text style={globalStyles.paragraph}>{button.text}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSpacing: {
        marginLeft: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 8,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 60,
        fontSize: 16,
        color: '#000',
    },
    buttonScrollContainer: {
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
})

export default Hero
