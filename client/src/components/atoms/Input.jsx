// ATOM: a text input. "error" turns the border red.
export default function Input({ error, ...rest }) {
  return <input className={`input ${error ? 'has-error' : ''}`} {...rest} />;
}
