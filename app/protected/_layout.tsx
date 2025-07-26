// app/_layout.tsx
import { Slot } from 'expo-router';
import Protected from '../components/Protected';
import Layout from './Layout';

export default function RootLayout() {
    return (
        <Protected>
            <Layout>
                <Slot />
            </Layout>
        </Protected>

    );
}
