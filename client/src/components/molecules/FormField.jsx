import { useState } from 'react';
import Input from '../atoms/Input';

// MOLECULE: label + input + hint + error message. "Show" link for passwords.
export default function FormField({ label, id, error, hint, type = 'text', ...rest }) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="wrap">
        <Input id={id} name={id} type={isPassword && show ? 'text' : type} error={error} {...rest} />
        {isPassword && (
          <button type="button" className="toggle" onClick={() => setShow(!show)}>
            {show ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {error ? <div className="error">{error}</div> : hint ? <div className="hint">{hint}</div> : null}
    </div>
  );
}
