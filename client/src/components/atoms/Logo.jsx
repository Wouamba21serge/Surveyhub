export default function Logo({ light = false }) {
  return (
    <div className={`logo ${light ? 'light' : ''}`}>
      <span className="logo-mark">S</span>
      SurveyHub
    </div>
  );
}
