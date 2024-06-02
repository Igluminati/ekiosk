import HomeScreen from '@/pages/HomeScreen';
import RootLayout from './layout';

/**
 * Entry point of the web application.
 * @returns {JSX.Element} JSX representation of the entry point.
 */
export default function Home() {
  return (
    <RootLayout>
      <HomeScreen/>
    </RootLayout>
  );
}
