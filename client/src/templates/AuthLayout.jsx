import BrandPanel from '../components/organisms/BrandPanel';

// TEMPLATE: brand panel on the left, a slot for the form on the right
export default function AuthLayout({ title, children }) {
  return (
    <div className="auth-layout">
      <BrandPanel title={title} />
      <main className="auth-main">{children}</main>
    </div>
  );
}
