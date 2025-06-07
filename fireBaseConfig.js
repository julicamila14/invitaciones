import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";   // <--- importa getAuth

const firebaseConfig = {
  apiKey: "AIzaSyCeGJY1odD_srFk3c8xyAjHbA79ppRUg9k",
  authDomain: "casamiento-book.firebaseapp.com",
  databaseURL: "https://casamiento-book-default-rtdb.firebaseio.com",
  projectId: "casamiento-book",
  storageBucket: "casamiento-book.firebasestorage.app",
  messagingSenderId: "614673774986",
  appId: "1:614673774986:web:7c349ad341bd0269a43073",
  measurementId: "G-PL50F8FCHY"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Funciones para usar en tu app:
export const agregarInvitado = (invitado) =>
  addDoc(collection(db, "invitados"), invitado);

export const agregarCancion = (cancion) =>
  addDoc(collection(db, "canciones"), cancion);

export const subirFoto = async (file) => {
  const storageRef = ref(storage, `fotos/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export const obtenerFotos = async () => {
  // ...
};