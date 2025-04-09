import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext'; // Adjust the path as needed
import Header from './Header';

export default function Layout() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <main>
          <Outlet />
        </main>
      </AuthProvider>
    </div>
  );
}
