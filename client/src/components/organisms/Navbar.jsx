import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../atoms/Avatar';
import Logo from '../atoms/Logo';

// ORGANISM: logo + language switch + account menu (with Logout)
export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Logo />
      <div className="right">
        <span className="lang">FR | EN</span>
        <div style={{ position: 'relative' }}>
          <Avatar name={user?.name} onClick={() => setOpen(!open)} />
          {open && (
            <div className="menu">
              <div className="who">{user?.name}<br />{user?.email}</div>
              <button className="btn btn-neutral btn-sm" style={{ width: '100%' }} onClick={onLogout}>Log out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
