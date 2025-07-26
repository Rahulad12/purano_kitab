import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MenuItem {
    title: string;
    icon: string;
    link: string;
}

const menuList: MenuItem[] = [
    { title: 'Home', icon: 'home', link: '/protected' },
    { title: 'Sell', icon: 'add', link: '/sell' },
    { title: 'Chat', icon: 'chat-bubble-outline', link: '/chat' },
    { title: 'Profile', icon: 'person-outline', link: 'protected/profile' },
];

const Footer = () => {
    const router = useRouter();

    return (
        <View style={styles.footer}>
            {menuList.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={() => router.push(item.link as any)}
                >
                    <MaterialIcons name={item.icon as any} size={24} color={'#333'} />
                    <Text style={styles.menuText}>{item.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    menuItem: {
        alignItems: 'center',
    },
    menuText: {
        marginTop: 4,
        fontSize: 12,
        color: '#333',
    },
});
