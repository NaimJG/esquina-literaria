import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProfileSettings.css';
import { useAuth } from '../../context/useAuth';
import userService from '../../service/userService';

export default function ProfileSettings() {
  const location = useLocation();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // Refs para hacer scroll hacia las secciones
  const colorRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  // Estados
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el =
        id === 'color'
          ? colorRef.current
          : id === 'icon'
          ? iconRef.current
          : id === 'name'
          ? nameRef.current
          : id === 'password'
          ? passwordRef.current
          : id === 'email'
          ? emailRef.current
          : null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash]);

  const handleBack = () => navigate('/profile');

  const handleEmailChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newEmail.trim()) return alert("Ingresá un nuevo email");

    try {
      const updatedUser = await userService.updateEmail(user._id, newEmail);
      setUser(updatedUser);
      alert("Email actualizado correctamente ✅");
      setNewEmail('');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Error al actualizar el email:', message);
      alert(message);
      setNewEmail('');
    }
  };

  const handleUsernameChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newUsername.trim()) return alert("Ingresá un nuevo nombre de usuario");

    try {
      const updatedUser = await userService.updateUsername(user._id, newUsername);
      setUser(updatedUser);
      alert("Nombre de usuario actualizado correctamente ✅");
      setNewUsername('');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Error al actualizar el nombre de usuario:', message);
      alert(message);
      setNewUsername('');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      return alert("Completá ambos campos de contraseña");
    }

    try {
      const updatedUser = await userService.updatePassword(user._id, currentPassword, newPassword);
      setUser(updatedUser);
      setPasswordMessage('Contraseña actualizada correctamente ✅');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Error al actualizar la contraseña:', message);
      alert(message);
      setCurrentPassword('');
      setNewPassword('');
    }
  };


  return (
    <section className="profile-settings-container">
      <button className="back-button" onClick={handleBack}>← Volver</button>
      <h2>Ajustes de cuenta</h2>

      {/* --- Datos actuales del usuario --- */}
      <div className="user-info">
        <h3>Datos actuales del usuario</h3>
        <div className="user-info-content">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Nombre de usuario:</strong> {user?.username}</p>
          <p><strong>Rol:</strong> {user?.role === 'admin' ? 'Administrador' : 'Usuario'}</p>
          <p><strong>Estado:</strong> {user?.active ? 'Activo ✅' : 'Inactivo ❌'}</p>
        </div>
      </div>

      {/* --- Cambiar email --- */}
      <div id="email" ref={emailRef} className="settings-section">
        <h3>Cambiar email</h3>
        <form onSubmit={handleEmailChange}>
          <label htmlFor="emailInput">Nuevo email:</label>
          <input
            id="emailInput"
            type="email"
            name="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button type="submit">Guardar email</button>
        </form>
      </div>

      {/* --- Cambiar nombre --- */}
      <div id="name" ref={nameRef} className="settings-section">
        <h3>Cambiar nombre de usuario</h3>
        <form onSubmit={handleUsernameChange}>
          <label htmlFor="nameInput">Nuevo nombre:</label>
          <input
            id="nameInput"
            type="text"
            name="name"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button type="submit">Guardar nombre</button>
        </form>
      </div>

      {/* --- Cambiar contraseña --- */}
      <div id="password" ref={passwordRef} className="settings-section">
        <h3>Cambiar contraseña</h3>
        <form onSubmit={handlePasswordChange}>
          <label htmlFor="currentPassword">Contraseña actual:</label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <label htmlFor="newPassword">Nueva contraseña:</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">Guardar contraseña</button>
          {passwordMessage && <p>{passwordMessage}</p>}
        </form>
      </div>

      <h2>Ajustes de tu página</h2>
      {/* --- Cambiar color --- */}
      <div id="color" ref={colorRef} className="settings-section">
        <h3>Cambiar color de la página</h3>
        <form>
          <label htmlFor="colorInput">Color principal:</label>
          <input id="colorInput" type="color" name="color" defaultValue="#916f5b" />
          <button type="submit">Guardar color</button>
        </form>
      </div>

      {/* --- Cambiar icono --- */}
      <div id="icon" ref={iconRef} className="settings-section">
        <h3>Cambiar icono del perfil</h3>
        <form>
          <label htmlFor="iconInput">URL del icono:</label>
          <input id="iconInput" type="text" name="icon" placeholder="https://..." />
          <button type="submit">Guardar icono</button>
        </form>
      </div>
    </section>
  );
}