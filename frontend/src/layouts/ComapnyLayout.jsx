import { Outlet } from 'react-router-dom';
import CompanySidebar from '../components/Sidebar/CompanySidebar';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import './AdminLayout.css';

function ComapnyLayout({ children }) {
  return (
    <div className="app-container">
      < CompanySidebar/>
      <div className="main-content">
        <AdminNavbar />
        <main className="content-area">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}

export default ComapnyLayout;
