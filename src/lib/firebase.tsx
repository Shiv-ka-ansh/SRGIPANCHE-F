import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Timestamp;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signIn: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch or create user profile
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          setProfile(userSnap.data() as UserProfile);
        } else {
          // Default admin check
          const isAdmin = currentUser.email === 'varunpironiya@gmail.com' && currentUser.emailVerified;
          const newProfile: UserProfile = {
            uid: currentUser.uid,
            name: currentUser.displayName || 'User',
            email: currentUser.email || '',
            role: isAdmin ? 'admin' : 'user',
            createdAt: Timestamp.now(),
          };
          await setDoc(userRef, newProfile);
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Sign-in popup closed by user.');
      } else {
        console.error('Error signing in:', error);
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
