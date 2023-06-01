
import React, { useState, useEffect } from 'react';
import "../styles/UserCard.css";
import Rating from './Rating.jsx';

const UserCard = () => {
    const [users, setUser] = useState([
        { name: 'Thomas', commentaire: 'étudiant', email: 'thomas@example.com', connaissance: false, star: 1, ratingType: 'smileys' },
        { name: 'Alice', commentaire: 'designer', email: 'Alice@example.com', connaissance: true, star: 2, ratingType: 'stars' },
        { name: 'Bob', commentaire: 'développeur', email: 'Bob@example.com', connaissance: true, star: 3, ratingType: 'smileys' },
        { name: 'Charlie', commentaire: 'manager', email: 'Charlie@example.com', connaissance: false, star: 4, ratingType: 'stars' },
        { name: 'David', commentaire: 'entrepreneur', email: 'David@example.com', connaissance: true, star: 5, ratingType: 'smileys' },
      ]);

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('Nombre d\'utilisateurs :', users.length);
        setCount(users.length);
    }, [users]);

    const handleAddUser = () => {
        const newUser = { name: `User ${count + 1}`, commentaire: 'nouvel utilisateur', email: 'azerty@example.com', connaissance: false, star: 1, ratingType: 'smileys' };
        console.log(newUser);
        setUser(prevUser => [...prevUser, newUser]);
        setCount(count + 1);
    };

    return (
        <>
        <ul className="user_card_container">
        {users.map((user, index) => (
            <li key={index} className={index % 2 === 0 ? "blue_card" : "white_card"}>
            <p>{user.name}</p>
            <p>Commentaire: {user.commentaire}</p>
            <p className="suivi">
                {user.connaissance ? "Suivi" : "Suivez-le"}
                <Rating type={user.ratingType} value={user.star} />
            </p>
            </li>
        ))}
        </ul>
        <button onClick={handleAddUser}>Ajouter un utilisateur</button>
    </>
    );
};

export default UserCard;
