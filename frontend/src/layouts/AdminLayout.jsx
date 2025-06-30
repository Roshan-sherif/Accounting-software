import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/Sidebar/AdminSidebar';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import './AdminLayout.css';

function MainLayout({ children }) {
  return (
    <div className="app-container">
      <AdminSidebar />
      <div className="main-content">
        <AdminNavbar />
        <main className="content-area">
          {children || <Outlet />}
      </main>
      </div>
    </div>
  );
}

export default MainLayout;
