import React from 'react';
import { ScrollView } from 'react-native';
import FeaturedBooks from './home/FeaturedBooks';
import Hero from './home/Hero';
import RecentlyListed from './home/RecentlyListed';
const Home = () => {
    return (
        <ScrollView>
            <Hero />
            <FeaturedBooks />
            <RecentlyListed />
        </ScrollView>

    );
};

export default Home;
