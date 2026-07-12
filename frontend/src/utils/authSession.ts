export interface LocalAuthUser {
  email: string;
  name: string;
}

interface LocalAccount extends LocalAuthUser {
  password: string;
}

const ACCOUNTS_KEY = 'pathpilot_accounts';
const SESSION_KEY = 'pathpilot_session';

const getAccounts = (): LocalAccount[] => {
  try {
    const stored = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const saveAccounts = (accounts: LocalAccount[]) => localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));

export const getCurrentUser = (): LocalAuthUser | null => {
  try {
    const user = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    return user?.email ? user as LocalAuthUser : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => getCurrentUser() !== null;

export const createAccount = (name: string, email: string, password: string): LocalAuthUser => {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getAccounts();
  if (accounts.some((account) => account.email === normalizedEmail)) throw new Error('An account already exists for this email.');
  const user = { name: name.trim() || normalizedEmail.split('@')[0], email: normalizedEmail };
  saveAccounts([...accounts, { ...user, password }]);
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
};

export const signIn = (email: string, password: string): LocalAuthUser => {
  const account = getAccounts().find((item) => item.email === email.trim().toLowerCase() && item.password === password);
  if (!account) throw new Error('Incorrect email or password.');
  const user = { name: account.name, email: account.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
};

export const resetPassword = (email: string, password: string): void => {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getAccounts();
  const index = accounts.findIndex((account) => account.email === normalizedEmail);
  if (index < 0) throw new Error('No local PathPilot account was found for this email.');
  accounts[index] = { ...accounts[index], password };
  saveAccounts(accounts);
};

export const signOut = (): void => localStorage.removeItem(SESSION_KEY);
