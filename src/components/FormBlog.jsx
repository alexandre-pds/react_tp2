import React, { useState } from 'react';
import "../styles/FormBlog.css";

const FormBlog = ({ onNameChange }) => {
  const [name, setname] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setname(newName);
    onNameChange(newName); // Appel de la fonction de rappel passée depuis le composant parent
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      alert('L\'e-mail doit contenir un "@"');
      return;
    }

    // Utilisation des valeurs de name, content et email pour effectuer des actions, par exemple, l'envoi des données au serveur
    alert(`name : ${name}\nContenu : ${content}\nE-mail : ${email}`);
  };

  return (
    <div className="form-container">
      <h2>Créer un nouveau post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">name :</label>
          <input
            type="text"
            id="name"
            defaultValue={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Contenu :</label>
          <textarea
            id="content"
            defaultValue={content}
            onChange={handleContentChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail :</label>
          <input
            type="text"
            id="email"
            defaultValue={email}
            onChange={handleEmailChange}
          />
          {!email.includes('@') && (
            <p className="error-message">L'e-mail doit contenir un "@"</p>
          )}
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default FormBlog;
