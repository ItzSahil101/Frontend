import { React, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("https://news-boy-backend.vercel.app/api/auth/login", {
                email,
                pass
            }).then((res) => {
                // if success
                alert(res.data.msg);
                document.cookie = `Auth=${res.data.token}`;
                history('/home');
            });
        } catch (err) {
            // handling error
            if (err.response && err.response.status === 400) {
                alert(err.response.data.msg); // Show the error message from backend
            } else {
                console.log(err.message);
            }
        }
    };

    // Inline styles
    const styles = {
        main: {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            fontFamily: "'Poppins', sans-serif",
            background: 'linear-gradient(135deg, #1abc9c, #3498db)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        },
        formContainer: {
            width: '400px',
            padding: '40px',
            backgroundColor: '#fff',
            boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
        },
        h1: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '2rem',
            color: '#333',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },
        input: {
            height: '45px',
            padding: '0 15px',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '25px',
            backgroundColor: '#f0f0f0',
            transition: 'background-color 0.3s ease',
        },
        inputFocus: {
            backgroundColor: '#e2e2e2',
            outline: 'none',
        },
        btn: {
            height: '50px',
            backgroundColor: '#1abc9c',
            border: 'none',
            color: 'white',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        btnHover: {
            backgroundColor: '#16a085',
        },
        p: {
            textAlign: 'center',
            fontSize: '0.9rem',
            color: '#333',
        },
        a: {
            color: '#1abc9c',
            textDecoration: 'none',
            fontWeight: 'bold',
        },
        aHover: {
            textDecoration: 'underline',
        },
        responsive: {
            '@media (max-width: 500px)': {
                formContainer: {
                    width: '90%',
                    padding: '20px',
                },
                h1: {
                    fontSize: '1.5rem',
                },
                input: {
                    height: '40px',
                    fontSize: '0.9rem',
                },
                btn: {
                    height: '45px',
                    fontSize: '0.9rem',
                },
            },
        },
    };

    return (
        <div style={styles.main}>
            <div style={styles.formContainer}>
                <form action="POST" style={styles.form}>
                    <h1 style={styles.h1}>Sign In</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => { setEmail(e.target.value); }}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => { setPass(e.target.value); }}
                        style={styles.input}
                    />
                    <input
                        type="submit"
                        placeholder="Sign In"
                        className="btn"
                        onClick={submit}
                        style={styles.btn}
                    />
                    <p style={styles.p}>Don't have an account? <Link to="/signup" style={styles.a}>Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
