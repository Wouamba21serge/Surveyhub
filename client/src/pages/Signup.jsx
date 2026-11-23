import SignupForm from '../components/organisms/SignupForm';
import AuthLayout from '../templates/AuthLayout';

export default function Signup() {
  return (
    <AuthLayout title={<>Create surveys<br />in minutes.</>}>
      <SignupForm />
    </AuthLayout>
  );
}
