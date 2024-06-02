import MenuScreen from '@/pages/MenuScreen';
import { MenuProvider } from '../contexts/createContext';
import RootLayout from '../layout';

/**
 * Menu component serves as the entry point for rendering the MenuScreen component.
 * It wraps the MenuScreen component within the RootLayout component to provide a consistent layout.
 * @returns {React.ReactNode} The rendered MenuScreen component within the RootLayout.
 */
export default function Menu() {
  return (
    <RootLayout>
      <MenuProvider>
        <MenuScreen />
      </MenuProvider>
    </RootLayout>
  );
}
