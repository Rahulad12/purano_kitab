// app/_layout.tsx
import { Slot } from 'expo-router';
import Layout from './Layout';

export default function RootLayout() {
    return (
        <Layout>
            <Slot />
        </Layout>
    );
}
