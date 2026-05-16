export type CustomerUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt?: string;
};

export type AuthSession = {
  accessToken: string;
  user: CustomerUser;
};

export type ApiErrorBody = {
  error?: string;
  message?: string;
};
