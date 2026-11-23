import Button from '../atoms/Button';

// MOLECULE: third-party sign-in buttons. Google/Facebook OAuth is the next step,
// so for now they only tell the user that it is coming.
export default function SocialButtons({ onClick }) {
  return (
    <div className="social">
      <Button type="button" variant="neutral" onClick={() => onClick('Google')}>Google</Button>
      <Button type="button" variant="neutral" onClick={() => onClick('Facebook')}>Facebook</Button>
    </div>
  );
}
