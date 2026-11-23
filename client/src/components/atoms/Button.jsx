// ATOM: one button, four looks (variant) and a loading state
export default function Button({ variant = 'primary', block = false, small = false, loading = false, children, ...rest }) {
  const cls = `btn btn-${variant} ${block ? 'btn-block' : ''} ${small ? 'btn-sm' : ''}`;
  return (
    <button className={cls} disabled={loading || rest.disabled} {...rest}>
      {loading ? 'Please wait...' : children}
    </button>
  );
}
