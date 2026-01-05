
import { User } from '../types';

/**
 * Mock Backend Service
 * Mimics an Express/MongoDB backend using localStorage.
 */
class MockBackend {
  private USERS_KEY = 'auth_master_users';
  private SESSION_KEY = 'auth_master_session';

  private getUsers(): any[] {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveUsers(users: any[]) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Simulated Signup
  async signup(name: string, email: string, password: string): Promise<{ success: boolean; message: string }> {
    await new Promise(r => setTimeout(r, 800)); // Latency simulation
    const users = this.getUsers();

    if (users.find(u => u.email === email)) {
      return { success: false, message: "Email already registered." };
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password: btoa(password), // MOCK HASHING (In real app, use bcrypt)
      role: 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);
    return { success: true, message: "User created successfully!" };
  }

  // Simulated Login
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; token?: string; message: string }> {
    await new Promise(r => setTimeout(r, 1000));
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === btoa(password));

    if (!user) {
      return { success: false, message: "Invalid email or password." };
    }

    const token = `mock_jwt_token_${Math.random().toString(36).substr(2)}`;
    localStorage.setItem(this.SESSION_KEY, JSON.stringify({ token, user: { ...user, password: undefined } }));

    return { 
      success: true, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt }, 
      token, 
      message: "Login successful!" 
    };
  }

  // Simulated Session Check
  async checkSession(): Promise<{ user: User; token: string } | null> {
    const session = localStorage.getItem(this.SESSION_KEY);
    if (!session) return null;
    return JSON.parse(session);
  }

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  }
}

export const mockBackend = new MockBackend();
