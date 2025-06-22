// app/admin/layout.js
import { AdminAuthProvider } from "../contexts/AdminAuthContext";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <AdminAuthProvider>
      <AdminNavbar />
      <main>{children}</main>
    </AdminAuthProvider>
  );
}
