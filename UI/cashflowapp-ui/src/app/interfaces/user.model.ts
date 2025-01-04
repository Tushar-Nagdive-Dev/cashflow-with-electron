export interface User {
    id?: number; // Optional because it is generated by the database
    name: string; // User's full name
    email: string; // User's email address
    password: string; // User's password
  }
  