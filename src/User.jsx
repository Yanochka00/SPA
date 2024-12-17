import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';

export default function User() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const userResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${id}`
                );
                if (!userResponse.ok) throw new Error('User not found');

                const albumsResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${id}/albums`
                );
                if (!albumsResponse.ok) throw new Error('Error fetching albums');

                const userData = await userResponse.json();
                const albumsData = await albumsResponse.json();

                setUser(userData);
                setAlbums(albumsData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div style={{ textAlign: 'center', fontSize: '20px' }}>Loading...</div>;
    if (error) return <Navigate to="/404" />;

    const styles = {
        container: {
            maxWidth: '900px',
            backgroundColor: '#f8f6fa',
            fontFamily: 'Arial, sans-serif',
            padding: '10px',
            margin: 'auto',
            border: '1px solid #ccc',
            borderRadius: '2px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        },
        userInfo: {
            marginBottom: '20px',
        },
        albumLink: {
            display: 'block',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '4px',
            textDecoration: 'none',
            color: '#007tff',
            transition: 'background-color 0.3s',
        },
        albumLinkHover: {
            backgroundColor: '#f0f0f0',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.userInfo}>
                <div>
                    <strong>Name:</strong> {user.name}
                </div>
                <div>
                    <strong>Username:</strong> {user.username}
                </div>
                <div>
                    <strong>Phone:</strong> {user.phone}
                </div>
                <div>
                    <strong>Website:</strong> {user.website}
                </div>
                <div>
                    <strong>Email:</strong> {user.email}
                </div>
            </div>
            <h3>Albums:</h3>
            {albums.map((album) => (
                <Link key={album.id} to={`/albums/${album.id}`} style={styles.albumLink}>
                    {album.title}
                </Link>
            ))}
        </div>
    );
}
