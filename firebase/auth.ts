import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./index";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./index";

async function ensureUserDoc(user: User) {
  // user.uid, user.email, etc.
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      xp: 0,
      createdAt: new Date(),
      username: "",
    });
  }
}

export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
  await ensureUserDoc(user);
  return user;
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
  await ensureUserDoc(user);
  return user;
};
