import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../templates/DashboardLayout';

// Placeholder protected page: proves that authentication works.
// The real survey dashboard comes in the next task.
export default function Dashboard() {
  const { user } = useAuth();
  return (
    <DashboardLayout>
      <div className="page-head">
        <div>
          <h1>Welcome, {user.name}</h1>
          <p>You are logged in as {user.email}. This page is only visible to authenticated users.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
