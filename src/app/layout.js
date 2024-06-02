import './globals.css'
import { Inter } from 'next/font/google'
import ThemeRegistry from '@/utils/ThemeRegistry'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

const inter = Inter({ subsets: ['latin'] })

/**
 * RootLayout is the root layout component of the entire application. 
 * It wraps the application with a theme using the ThemeRegistry component 
 * and provides a common structure for the HTML document, including metadata and font settings.
 * @param {object} props - Props passed to the component.
 * @param {React.ReactNode} props.children - The children components to be wrapped by the layout.
 * @returns {React.ReactNode} The root layout of the entire application.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeRegistry options={{ key: 'mui-theme' }}>{children}</ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}