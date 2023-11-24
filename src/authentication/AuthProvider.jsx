import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import PropTypes from "prop-types";
  import { createContext, useEffect, useState } from "react";
  import auth from "../firebase/firebase.config";
  export const AuthContext = createContext({});
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // creating user
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    // signing in user
    const userSignIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    // google sign in
    const googleProvider = new GoogleAuthProvider();
    const googleUserAuth = () => {
      return signInWithPopup(auth, googleProvider);
    };
  
    // observing current user
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false);
        }
      });
  
      return () => unSubscribe();
    }, []);
  
    // user sign out
    const userSignOut = () => {
      return signOut(auth);
    };
  
    const value = {
      user,
      loading,
      setUser,
      setLoading,
      createUser,
      userSignIn,
      userSignOut,
      googleUserAuth,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  AuthProvider.propTypes = {
    children: PropTypes.node,
  };
  
  export default AuthProvider;
  