import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../atoms/Button';
import Checkbox from '../atoms/Checkbox';
import FormField from '../molecules/FormField';
import SocialButtons from '../molecules/SocialButtons';

// ORGANISM: the whole signup form. Checks the input in the browser first,
// then asks the server (which checks everything again: never trust the browser).
export default function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [v, setV] = useState({ name: '', email: '', password: '', confirm: '' });
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setFormError('');
    const errs = {};
    if (v.name.trim().length < 2) errs.name = 'Name must have at least 2 characters';
    if (!/^\S+@\S+\.\S+$/.test(v.email)) errs.email = 'Enter a valid email address';
    if (v.password.length < 8 || !/[A-Za-z]/.test(v.password) || !/[0-9]/.test(v.password)) errs.password = 'At least 8 characters, with letters and digits';
    if (v.confirm !== v.password) errs.confirm = 'Passwords do not match';
    if (!accepted) errs.terms = 'Please accept the terms';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      await signup({ name: v.name, email: v.email, password: v.password });
      navigate('/dashboard');
    } catch (err) {
      setErrors(err.fields || {});
      setFormError(err.fields && Object.keys(err.fields).length ? '' : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Create your account</h2>
      <p className="sub">It takes less than a minute.</p>
      {formError && <div className="alert">{formError}</div>}
      <form onSubmit={submit} noValidate>
        <FormField label="Full name" id="name" placeholder="Aline Ngo" value={v.name} onChange={set('name')} error={errors.name} autoComplete="name" />
        <FormField label="Email address" id="email" type="email" placeholder="aline@mail.com" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
        <FormField label="Password" id="password" type="password" value={v.password} onChange={set('password')} error={errors.password} hint="At least 8 characters, with letters and digits" autoComplete="new-password" />
        <FormField label="Confirm password" id="confirm" type="password" value={v.confirm} onChange={set('confirm')} error={errors.confirm} autoComplete="new-password" />
        <div className="field">
          <Checkbox label="I accept the Terms of Use and Privacy Policy" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
          {errors.terms && <div className="error">{errors.terms}</div>}
        </div>
        <Button type="submit" block loading={loading}>Sign up</Button>
      </form>
      <div className="divider">or continue with</div>
      <SocialButtons onClick={(p) => setFormError(`${p} sign-in is coming in the next step (OAuth 2.0).`)} />
      <p className="switch">Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}
