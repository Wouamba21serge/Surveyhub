export default function Avatar({ name = '?', ...rest }) {
  return <button className="avatar" aria-label="Account menu" {...rest}>{name.charAt(0).toUpperCase()}</button>;
}
