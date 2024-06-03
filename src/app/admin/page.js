import AdminDashboard from '@/pages/AdminDashboard';
import RootLayout from '../layout';

/**
 * Admin component serves as the entry point for rendering the MenuScreen component.
 * It wraps the AdminDashboard component within the RootLayout component to provide a consistent layout.
 * @returns {React.ReactNode} The rendered MenuScreen component within the RootLayout.
 */
export default function Admin() {
  return (
    <RootLayout>
      <AdminDashboard />
    </RootLayout>
  );
}
