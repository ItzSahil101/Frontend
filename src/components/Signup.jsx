import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const history = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const validateEmail = (email) => {
        // Regular expression for validating an email address
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      };

    const submit = async (e) => {
        e.preventDefault();

        //check if user had missed something
        if (!userName || !email || !pass) {
            alert("Please fulfill the information");
            return;
        }

        // Check if userName, email, and pass have length greater than 5
    if (userName.length < 5 || email.length < 5 || pass.length < 5) {
        alert("Name, email, and password length must be greater than 5");
        return;
    }

      // Validate email format
      if (!validateEmail(email)) {
        alert("Please enter a valid email address");
        return;
    }

        try {

            await axios.post("https://news-boy-backend.vercel.app/api/auth/", {
                userName,
                email,
                pass
            }).then(async(res) => {
                // if success
               alert(res.data.msg);
               document.cookie = `Auth=${res.data.token}`;
               localStorage.setItem("auth", res.data.token);
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
        container: {
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
        socialIcons: {
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '15px',
        },
        icon: {
            fontSize: '1.5rem',
            color: '#333',
            transition: 'color 0.3s ease',
            cursor: 'pointer',
        },
        iconHover: {
            color: '#3498db',
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
                container: {
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
                icon: {
                    fontSize: '1.3rem',
                },
            },
        },
    };

    return (
        <div style={styles.main}>
            <div style={styles.container}>
                <form action="POST" style={styles.form}>
                    <h1 style={styles.h1}>Create Account</h1>
                    {/* <div style={styles.socialIcons}>
                        <i className="fa-brands fa-google" style={styles.icon}></i>
                        <i className="fa-brands fa-facebook-f" style={styles.icon}></i>
                        <i className="fa-brands fa-youtube" style={styles.icon}></i>
                        <i className="fa-brands fa-x-twitter" style={styles.icon}></i>
                    </div> */}
                    <input
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => { setUserName(e.target.value); }}
                        style={styles.input}
                    />
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
                        className="btn"
                        placeholder="Sign Up"
                        onClick={submit}
                        style={styles.btn}
                    />
                    <p style={styles.p}>Already have an account? <Link to="/login" style={styles.a}>Sign In</Link></p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
