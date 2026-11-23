import LoginForm from '../components/organisms/LoginForm';
import AuthLayout from '../templates/AuthLayout';

export default function Login() {
  return (
    <AuthLayout title={<>Welcome<br />back.</>}>
      <LoginForm />
    </AuthLayout>
  );
}
