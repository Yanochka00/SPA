import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Users() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Ошибка:', error));
    }, []);

    const styles = {
        container: {
            maxWidth: '880px',
            backgroundColor: '#f8f6fa',
            fontFamily: 'Arial, sans-serif',
            padding: '10px',
            marginBottom: '10px',
            margin: 'auto',
            border: '1px solid #ccc',
            borderRadius: '2px',
            borderBottom: '1px solid #ccc',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        userCard: {
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        userCardHover: {
            backgroundColor: '#f0f0f0',
        },
    };

    return (
        <div style={styles.container}>
            {users.map((user) => (
                <div
                    key={user.id}
                    style={styles.userCard}
                    onClick={() => navigate(`/users/${user.id}`)}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                            styles.userCardHover.backgroundColor)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                    {user.name}
                </div>
            ))}
        </div>
    );
}
