import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Albums() {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/albums');
                if (!response.ok) throw new Error('Error loading albums');
                const data = await response.json();
                setAlbums(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbums();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', fontSize: '20px' }}>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

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
        title: {
            textAlign: 'center',
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
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Albums</h2>
            {albums.map((album) => (
                <Link key={album.id} to={`/albums/${album.id}`} style={styles.albumLink}>
                    {album.title}
                </Link>
            ))}
        </div>
    );
}
