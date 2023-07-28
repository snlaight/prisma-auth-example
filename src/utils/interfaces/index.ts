export interface User {
  id:         number;
  email:      string
  firstname:  string
  lastname:   string
  role:      'ADMIN' | 'USER'
  password:   string
  isVerified: boolean
}

export interface ValidationRule {
  validator: (value: string) => boolean;
  message: string;
  required?: boolean;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface SelectItems {
  [key: string]: boolean;
}

export interface SignUpRequestDTO {
  token: string;
  user: {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
}

export interface RequestErrorDTO {
  error: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface IDeveloperIconProps {
  icon: string;
}
