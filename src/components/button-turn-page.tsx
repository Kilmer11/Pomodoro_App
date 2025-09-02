import React from 'react';
import { HomeIcon, SettingsIcons } from '../assets/index';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  className?: string;
}

function ButtonTurnPage(props: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome: boolean = location.pathname === '/';

  return (
    <button
      className={props.className}
      onClick={() => navigate(isHome ? '/config' : '/')}
    >
      {isHome ? <HomeIcon /> : <SettingsIcons />}
    </button>
  );
}

export default ButtonTurnPage;
