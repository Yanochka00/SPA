import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';

export default function Album() {
    const { albumId } = useParams();
    const [photos, setPhotos] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingUser, setLoadingUser] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbumData = async () => {
            setLoading(true);
            try {
                const albumResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/albums/${albumId}`
                );
                if (!albumResponse.ok) {
                    throw new Error('Album not found');
                }
                const album = await albumResponse.json();

                const photosResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
                );
                if (!photosResponse.ok) {
                    throw new Error('Error loading photos');
                }
                const photosData = await photosResponse.json();

                const userResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${album.userId}`
                );
                if (!userResponse.ok) {
                    throw new Error('Error loading user');
                }
                const userData = await userResponse.json();

                setPhotos(photosData);
                setUser(userData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
                setLoadingUser(false);
            }
        };

        fetchAlbumData();
    }, [albumId]);

    if (loading) return <div style={{ textAlign: 'center', fontSize: '20px' }}>Loading...</div>;
    if (error) return <Navigate to="/404" />;

    if (loadingUser)
        return <div style={{ textAlign: 'center', fontSize: '20px' }}>Loading user...</div>;

    const styles = {
        container: {
            maxWidth: '900px',
            padding: '10px',
            fontFamily: 'Arial, sans-serif',
            margin: 'auto',
            border: '1px solid #ccc',
            borderRadius: '2px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        },
        title: {
            textAlign: 'center',
            marginBottom: '10px',
        },
        photo: {
            margin: '10px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        },
        userLink: {
            display: 'block',
            marginTop: '10px',
            textAlign: 'center',
            textDecoration: 'none',
            color: '#007tff',
            fontWeight: 'bold',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Album by {user ? user.name : 'Unknown User'}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {photos.map((photo) => (
                    <img
                        key={photo.id}
                        src={photo.thumbnailUrl}
                        alt={photo.title}
                        style={styles.photo}
                    />
                ))}
            </div>
            {user && (
                <Link to={`/users/${user.id}`} style={styles.userLink}>
                    {user.name}
                </Link>
            )}
        </div>
    );
}
