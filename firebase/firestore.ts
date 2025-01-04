// FILE: src/services/firestore.ts (or firestore.js if you're not using TypeScript)

import {
  getDocs,
  collection,
  query,
  where,
  type Query,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  type DocumentData,
} from "firebase/firestore";

import { db } from "."; // Adjust if needed
import { Question } from "../data/interfaces/Test";
import { Deck, LeaderboardItem } from "../data/interfaces/Deck";
import { User } from "../data/interfaces/User";
// If you have TypeScript interfaces, import them:

//---------------------------------------------------------------------
// 1. QUESTIONS
//---------------------------------------------------------------------

/**
 * Retrieve *all* questions from the "questions" collection.
 */
export const getAllQuestions = async (): Promise<Question[]> => {
  const querySnapshot = await getDocs(collection(db, "questions"));
  const questions: Question[] = [];

  querySnapshot.forEach((docSnap) => {
    // docSnap.data() is a plain object
    const qData = docSnap.data() as Question;
    // If you like, you can attach the doc ID:
    // qData.id = docSnap.id;
    questions.push(qData);
  });

  return questions;
};

/**
 * Retrieve questions by a particular deckId.
 * This is useful because your new schema has "deckIds" in each question.
 */
export const getQuestionsByDeckId = async (
  deckId: string,
): Promise<Question[]> => {
  const questionsRef = collection(db, "questions");
  // We look for questions that have "deckIds" array containing this deckId.
  const q = query(questionsRef, where("deckIds", "array-contains", deckId));
  const snapshot = await getDocs(q);

  const results: Question[] = [];
  snapshot.forEach((docSnap) => {
    results.push(docSnap.data() as Question);
  });
  return results;
};

/**
 * Example of adding a new question.
 * If you already have a doc ID you want to use, switch to `setDoc(doc(...), data)`.
 * Make sure you supply the new question object with required fields (deckIds, etc.).
 */
export const createQuestion = async (questionData: Question) => {
  const questionsRef = collection(db, "questions");
  const docRef = await addDoc(questionsRef, questionData);
  return docRef.id;
};

/**
 * Update an existing question. You could pass partial fields if needed.
 */
export const updateQuestion = async (
  questionId: string,
  data: Partial<Question>,
) => {
  const questionRef = doc(db, "questions", questionId);
  await updateDoc(questionRef, data);
};

/**
 * Delete a question.
 */
export const deleteQuestion = async (questionId: string) => {
  const questionRef = doc(db, "questions", questionId);
  await questionRef.delete();
};

/**
 * (OPTIONAL) Example: get all questions that match some old fields
 * If you still want to filter by subject/year/etc. from old schema
 */
export const getFilteredQuestions = async (
  subject?: string,
  year?: string,
  source?: string,
): Promise<Question[]> => {
  let qRef: Query<DocumentData> = collection(db, "questions");
  // Combine filters as needed:
  if (subject) {
    qRef = query(qRef, where("courseId", "==", subject));
  }
  if (year) {
    qRef = query(qRef, where("year", "==", year));
  }
  if (source) {
    qRef = query(qRef, where("source", "==", source));
  }

  const snapshot = await getDocs(qRef);
  const questions: Question[] = [];
  snapshot.forEach((docSnap) => {
    questions.push(docSnap.data() as Question);
  });
  return questions;
};

//---------------------------------------------------------------------
// 2. DECKS
//---------------------------------------------------------------------

/**
 * Retrieve all Decks from the "decks" collection.
 */
export const getAllDecks = async (): Promise<Deck[]> => {
  const decksSnapshot = await getDocs(collection(db, "decks"));
  const decks: Deck[] = [];
  decksSnapshot.forEach((docSnap) => {
    // same pattern:
    const dData = docSnap.data() as Deck;
    // attach docSnap.id if you like:
    dData.id = docSnap.id;
    decks.push(dData);
  });
  return decks;
};

/**
 * Create a new Deck in the "decks" collection.
 * For example, pass { title: "Python Exam 2024", timer: 1800, ... } or similar
 */
export const createDeck = async (deckData: Partial<Deck>): Promise<string> => {
  const decksRef = collection(db, "decks");
  // Some default fields if not provided:
  const newDeck: Deck = {
    id: "", // Firestore will generate
    title: deckData.title || "Untitled Deck",
    questionIds: deckData.questionIds || [],
    leaderboard: deckData.leaderboard || [],
    timer: deckData.timer,
    creatorId: deckData.creatorId || "unknown",
  };
  const docRef = await addDoc(decksRef, newDeck);
  return docRef.id;
};

/**
 * Get a single Deck doc by ID.
 */
export const getDeck = async (deckId: string): Promise<Deck | null> => {
  const deckRef = doc(db, "decks", deckId);
  const snap = await getDoc(deckRef);
  if (!snap.exists()) return null;
  return snap.data() as Deck;
};

/**
 * Update a Deck (e.g. to add a questionId, update timer, etc.)
 */
export const updateDeck = async (deckId: string, data: Partial<Deck>) => {
  const deckRef = doc(db, "decks", deckId);
  await updateDoc(deckRef, data);
};

/**
 * Add a question to a deck’s questionIds list, and also
 * add that deckId to the question’s deckIds array.
 */
export const linkQuestionToDeck = async (
  deckId: string,
  questionId: string,
) => {
  const deckRef = doc(db, "decks", deckId);
  const questionRef = doc(db, "questions", questionId);

  // 1) Add questionId to deck’s questionIds
  await updateDoc(deckRef, {
    questionIds: arrayUnion(questionId),
  });
  // 2) Add deckId to question’s deckIds
  await updateDoc(questionRef, {
    deckIds: arrayUnion(deckId),
  });
};

/**
 * Remove a question from a deck’s questionIds, etc.
 */
export const unlinkQuestionFromDeck = async (
  deckId: string,
  questionId: string,
) => {
  const deckRef = doc(db, "decks", deckId);
  const questionRef = doc(db, "questions", questionId);

  await updateDoc(deckRef, {
    questionIds: arrayRemove(questionId),
  });
  await updateDoc(questionRef, {
    deckIds: arrayRemove(deckId),
  });
};

/**
 * Example: add or update a user’s leaderboard entry in a deck.
 */
export const updateDeckLeaderboard = async (
  deckId: string,
  userId: string,
  xp: number,
  score?: number,
) => {
  const deck = await getDeck(deckId);
  if (!deck) return;

  const existingLeaderboard = deck.leaderboard || [];
  // Check if user already on the leaderboard
  const idx = existingLeaderboard.findIndex((item) => item.userId === userId);

  if (idx === -1) {
    // not found, push a new item
    existingLeaderboard.push({ userId, xp, score });
  } else {
    // update existing
    existingLeaderboard[idx].xp = xp;
    if (score !== undefined) existingLeaderboard[idx].score = score;
  }

  // Now update Firestore doc
  await updateDeck(deckId, {
    leaderboard: existingLeaderboard,
  });
};

//---------------------------------------------------------------------
// 3. USERS
//---------------------------------------------------------------------

/**
 * Because you're using Firebase Auth, typically your user docs
 * might be keyed by the same UID. This is an example snippet.
 */
export const getUser = async (userId: string): Promise<User | null> => {
  const userRef = doc(db, "users", userId);
  const snap = await getDoc(userRef);
  if (!snap.exists()) return null;
  return snap.data() as User;
};

/**
 * Create (or overwrite) a user doc.
 * You might call this once the user signs up or logs in for first time.
 */
export const createOrUpdateUser = async (
  userId: string,
  userData: Partial<User>,
) => {
  const userRef = doc(db, "users", userId);
  // setDoc overwrites by default; pass {merge:true} if partial
  await setDoc(userRef, userData, { merge: true });
};

/**
 * Example: increment user’s XP by some amount
 */
export const addUserXP = async (userId: string, amount: number) => {
  const userRef = doc(db, "users", userId);
  const currentUser = await getUser(userId);
  if (!currentUser) {
    // If user doc doesn’t exist yet, create one
    await setDoc(userRef, { xp: amount });
  } else {
    const newXP = (currentUser.xp || 0) + amount;
    await updateDoc(userRef, { xp: newXP });
  }
};
