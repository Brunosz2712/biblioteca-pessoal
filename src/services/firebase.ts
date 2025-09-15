// src/services/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
};

// Evita múltiplas inicializações em hot reload
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// ⚠️ Use fbAuth (evita colisão com JSX <auth />)
export const fbAuth = getAuth(app);
export const db = getFirestore(app);

// Exponha helpers de Auth
export const AuthAPI = {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
};

// Tipos e CRUD
export type Book = {
  id?: string;
  userId: string;
  title: string;
  author: string;
  genre?: string;
  status?: "quero ler" | "lendo" | "lido";
  favorite?: boolean;
  createdAt: number;
};

export const BooksAPI = {
  add: async (book: Omit<Book, "id">) => {
    const ref = await addDoc(collection(db, "books"), book as any);
    return { ...book, id: ref.id };
  },

  getPageByUser: async (userId: string, pageSize = 15, cursor?: any) => {
    let qRef = query(
      collection(db, "books"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );
    if (cursor) qRef = query(qRef, startAfter(cursor));

    const snap = await getDocs(qRef);
    const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Book) }));
    const last = snap.docs[snap.docs.length - 1];
    return { items, cursor: last };
  },

  getById: async (id: string) => {
    const d = await getDoc(doc(db, "books", id));
    return d.exists() ? { id: d.id, ...(d.data() as Book) } : null;
  },

  update: async (id: string, data: Partial<Book>) => {
    await updateDoc(doc(db, "books", id), data as any);
  },

  remove: async (id: string) => {
    await deleteDoc(doc(db, "books", id));
  },

  now: () => Date.now(),
};
