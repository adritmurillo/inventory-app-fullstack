import React, { useState, useEffect } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import FieldError from '../components/FieldError';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [countdown, setCountdown] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        if (countdown > 0) return;
        
        try {
            await login(formData.username, formData.password);
            navigate('/dashboard'); 
        } catch (err) {
            if (err.status === 429) {
                setCountdown(err.retryAfterSeconds || 60);
                setError(err.message || 'Too many attempts. Please wait.');
            } else if (err.status === 400 && err.fieldErrors) {
                setFieldErrors(err.fieldErrors);
                setError(err.message || 'Please correct the errors below.');
            } else if (err.status === 401) {
                setError('Invalid username or password');
            } else {
                setError(err.message || 'An error occurred. Please try again.');
            }
        }
    };

    const isLocked = countdown > 0;

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">Inventory System</h3>
                
                {error && !isLocked && <div className="alert alert-danger">{error}</div>}

                {isLocked && (
                    <div className="alert alert-warning d-flex align-items-center">
                        <i className="bi bi-hourglass-split me-2 fs-5"></i>
                        <div>
                            <strong>Too many attempts.</strong>
                            <div>Please wait <span className="badge bg-warning text-dark">{countdown}s</span> before trying again.</div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            className={`form-control ${fieldErrors.username ? 'is-invalid' : ''}`}
                            value={formData.username}
                            onChange={handleChange}
                            required
                            disabled={isLocked}
                        />
                        <FieldError error={fieldErrors.username} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className={`form-control ${fieldErrors.password ? 'is-invalid' : ''}`}
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={isLocked}
                        />
                        <FieldError error={fieldErrors.password} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isLocked}>
                        {isLocked ? `Wait ${countdown}s...` : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;