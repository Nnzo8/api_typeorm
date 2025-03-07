export interface UserParams {
    id?: number;
    email: string;
    password?: string;
    title: string;
    firstName: string;
    lastName: string;
    role: string;
    passwordHash?: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}
