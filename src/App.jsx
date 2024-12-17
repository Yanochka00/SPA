import { Routes, Route, Link } from 'react-router-dom';
import Users from './Users';
import User from './User';
import Albums from './Albums';
import Album from './Album';
import NotFound from './NotFound';

export default function App() {
    const styles = {
        header: {
            maxWidth: '900px',
            display: 'flex',
            gap: '3rem',
            backgroundColor: '#f8f6fa',
            fontFamily: 'Arial, sans-serif',
            padding: '10px',
            marginBottom: '10px',
            margin: 'auto',
            border: '1px solid #ccc',
            borderRadius: '2px',
            borderBottom: '1px solid #ccc',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        },
        link: {
            textDecoration: 'none',
            color: '#007bgs',
            fontWeight: 'bold',
        },
        container: {
            padding: '20px',
        },
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <Link to="/users" style={styles.link}>
                    Users
                </Link>
                <Link to="/albums" style={styles.link}>
                    Albums
                </Link>
            </header>
            <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/albums/:albumId" element={<Album />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}
