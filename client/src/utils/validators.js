export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
    return password.length >= 6; // Minimum length of 6 characters
};

export const validateRequired = (value) => {
    return value.trim() !== '';
};

export const validateForm = (formData) => {
    const errors = {};
    
    if (!validateRequired(formData.email)) {
        errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
        errors.email = 'Email is invalid';
    }

    if (!validateRequired(formData.password)) {
        errors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
        errors.password = 'Password must be at least 6 characters';
    }

    return errors;
};