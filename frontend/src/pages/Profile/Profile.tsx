import RightSidebar from '../../components/RightSidebar/RightSidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <>
      <RightSidebar width="300px" topOffset="80px" fixed={true} className="right-sidebar">
          <div style={{ padding: '8px' }}>
            <h4 style={{ fontSize: '20px', textAlign: 'left', color: '#916f5b'}}>Ajustes</h4>
            <ul className='profileSettingsList'>
              <li><Link to="#">Cambiar color de mi página</Link></li>
              <li><Link to="#">Cambiar icono del perfil</Link></li>
              <li><Link to="#">Cambiar nombre de usuario</Link></li>
              <li><Link to="#">Cambiar constraseña</Link></li>
              <li>
                <button onClick={handleLogout} className="logoutButton" style={{ background: 'transparent', border: 'none', color: 'red', fontWeight: 'bold', cursor: 'pointer' }}>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
      </RightSidebar>
    </>
  );
}

export default Profile;