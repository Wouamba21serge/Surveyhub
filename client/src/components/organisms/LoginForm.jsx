import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../atoms/Button';
import Checkbox from '../atoms/Checkbox';
import FormField from '../molecules/FormField';
import SocialButtons from '../molecules/SocialButtons';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [v, setV] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setFormError('');
    const errs = {};
    if (!/^\S+@\S+\.\S+$/.test(v.email)) errs.email = 'Enter a valid email address';
    if (!v.password) errs.password = 'Password is required';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      await login(v);
      navigate('/dashboard');
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Log in to SurveyHub</h2>
      <p className="sub">Manage your surveys and see the results.</p>
      {formError && <div className="alert">{formError}</div>}
      <form onSubmit={submit} noValidate>
        <FormField label="Email address" id="email" type="email" placeholder="aline@mail.com" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
        <FormField label="Password" id="password" type="password" value={v.password} onChange={set('password')} error={errors.password} autoComplete="current-password" />
        <div className="row-between">
          <Checkbox label="Remember me" defaultChecked />
          <a href="#forgot" onClick={(e) => { e.preventDefault(); setFormError('Password reset is coming in a next step.'); }}>Forgot password?</a>
        </div>
        <Button type="submit" block loading={loading}>Log in</Button>
      </form>
      <div className="divider">or continue with</div>
      <SocialButtons onClick={(p) => setFormError(`${p} sign-in is coming in the next step (OAuth 2.0).`)} />
      <p className="switch">New here? <Link to="/signup">Create an account</Link></p>
    </div>
  );
}
