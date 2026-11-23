import Logo from '../atoms/Logo';

export default function BrandPanel({ title }) {
  return (
    <aside className="brand-panel">
      <div className="blob" />
      <Logo light />
      <h1>{title}</h1>
      <p>Build quizzes, polls and job forms, share one link, and collect answers from anyone.</p>
      <ul>
        <li>Quizzes, checkbox surveys, job interview forms</li>
        <li>Share by WhatsApp, email, SMS or QR code</li>
        <li>Charts and CSV export of every answer</li>
      </ul>
    </aside>
  );
}
