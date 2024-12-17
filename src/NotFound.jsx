import { Link } from 'react-router-dom';

export default function NotFound() {
    const styles = {
        container: {
            textAlign: 'center',
            padding: '50px',
            fontFamily: 'Arial, sans-serif',
        },
        heading: {
            fontSize: '38px',
        },
        link: {
            display: 'inline-block',
            marginTop: '20px',
            padding: '10px 20px',
            border: '1px solid #007bff',
            borderRadius: '5px',
            textDecoration: 'none',
            color: '#007tff',
            backgroundColor: '#f0f0f0',
            transition: 'background-color 0.3s',
        },
        linkHover: {
            backgroundColor: '#e0e0e0',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>404 - Page not found</h1>
            <Link
                to="/"
                style={styles.link}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor)
                }
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
            >
                Users
            </Link>
        </div>
    );
}
