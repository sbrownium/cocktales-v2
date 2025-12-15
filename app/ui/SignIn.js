import React, { useContext , useState} from 'react';
import { googleLogout } from '@react-oauth/google';
import { getAuth, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { ref, child, push, update } from "firebase/database";
import { db, app } from "./firebase.js";
import { UserContext } from './app/UserContext.js';
import GoogleSignInButton from './GoogleSignInButton.js';
import GoogleSignOutButton from './GoogleSignOutButton.js';

export default function SignIn({
  users,
  setBeingEditted,
  finishFlowFunction,
  onSignInSuccess
}) {
  const [user, setUser] = useContext(UserContext);
  const provider = new GoogleAuthProvider();

  function findPreferredName(name) {
    const space = name.indexOf(' ');
    return space !== -1 ? name.substring(0, space) : name;
  }

  function handleLogOut(e) {
    e.preventDefault();
    googleLogout();
    setUser('');
  }

  async function handleClick(e) {
    e.preventDefault();
    const success = await handleLogIn();
    await handleAddUser(success);
    const userSet = await handleSetUser(success);
    if (userSet && onSignInSuccess) {
        await onSignInSuccess(userSet);
      }
  }

  async function handleSetUser(params) {
    setUser({
      preferredName: findPreferredName(params.user.displayName),
      userID: params.user.uid
  });
  return params.user.uid;
  }
  
  async function handleAddUser (result) {
      // Check if user already exists in the database
      const usersArray = Object.values(users);
      const existingUser = usersArray.find((u) => u.userID === result.user.uid);
     
      const currentUser = {
        preferredName: findPreferredName(result.user.displayName),
        userID: result.user.uid,
      }
      const newUserPrivate = {
        email: result.user.email,
        userID: result.user.uid,
        userName: result.user.displayName
      }    
  
    try {
      if (!existingUser) {
        const newUserPublicKey = push(child(ref(db), '/usersPublic/')).key;
        const newUserPrivateKey = push(child(ref(db), '/usersPrivate/')).key;
      
        const updates = {};
        updates['/usersPublic/' + newUserPublicKey] = currentUser;
        updates['/usersPrivate/' + newUserPrivateKey] = newUserPrivate;
      
        // Ensure the database update is fully awaited
        await update(ref(db), updates);
        console.log('Data saved successfully!');
      }
      return true
    }
      catch (error) {
            console.error('Error saving data:', error);
            throw error; // Ensure errors are propagated up to handleClick
          }

  }

  async function handleLogIn() {
    const auth = getAuth(app);
  
    try {
      // const result = await signInWithPopup(auth, provider);
      const result = await signInWithRedirect(auth, provider);
      return result;
      } 
      catch (error) {
      console.error('Error signing in:', error);
      throw error; // Ensure errors are propagated up to handleClick
    }
  
  }
  
  // Conditional rendering based on whether the user is signed in
  return user ? (
    <GoogleSignOutButton handleClick={handleLogOut} />
  ) : (
    <GoogleSignInButton handleClick={handleClick} />
  );
}
