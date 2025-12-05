export interface User {
    id: string;
    name: string;
    email: string;
}

export const login = async (email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock validation
    if (!email || !password) {
        throw new Error('Invalid credentials');
    }

    const user = {
        id: '1',
        name: 'John Doe',
        email: email,
    };

    localStorage.setItem('venturemond_user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');

    return user;
};

export const signup = async (name: string, email: string, password: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = {
        id: '1',
        name: name || 'New User',
        email: email,
    };

    localStorage.setItem('venturemond_user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');

    return user;
};

export const logout = () => {
    localStorage.removeItem('venturemond_user');
    localStorage.removeItem('isAuthenticated');
};

export const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem('venturemond_user');
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    }
    return null;
};
