import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import globalStyles from '../style/global'

const Header = () => {
    const buttonText = [
        { text: 'Academic', onPress: () => alert('Academic pressed') },
        { text: 'Fiction', onPress: () => alert('Fiction pressed') },
        { text: 'Non-Fiction', onPress: () => alert('Non-Fiction pressed') },
        { text: 'Entrance Exam', onPress: () => alert('Entrance Exam pressed') },
        { text: 'Others', onPress: () => alert('Others pressed') },
    ]

    return (
        <View style={{ ...globalStyles.container, marginTop: 25 }}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <Text style={globalStyles.heading}>PuranoKitab</Text>

                <View style={styles.iconRow}>
                    <TouchableOpacity onPress={() => alert('Notification pressed')}>
                        <Ionicons name="notifications-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert('Favorites pressed')} style={styles.iconSpacing}>
                        <Ionicons name="heart-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSpacing: {
        marginLeft: 16,
    },

})

export default Header
