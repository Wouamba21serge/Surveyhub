import Navbar from '../components/organisms/Navbar';

// TEMPLATE: navbar on top, page content below
export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="page">{children}</main>
    </>
  );
}
