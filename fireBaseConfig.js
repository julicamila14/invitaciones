import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
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


export const subirFoto = async (file, album) => {
  const storageRef = ref(storage, `fotos/${album}/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export const eliminarFoto = async (album, fileName) => {
  const fotoRef = ref(storage, `fotos/${album}/${fileName}`);
  await deleteObject(fotoRef);
};

export const listarFotosAlbum = async (album) => {
  const albumRef = ref(storage, `fotos/${album}`);
  const items = await listAll(albumRef);
  return await Promise.all(
    items.items.map(async (itemRef) => ({
      id: itemRef.fullPath,
      nombre: itemRef.name,
      src: await getDownloadURL(itemRef),
      album,
    }))
  );
};

 export const registrarAcceso = async (email) => {
  try {
    await addDoc(collection(db, "registrosAccesos"), {
      email,
      fechaHora: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error al registrar el acceso en Firestore:", error);
  }
};

export const obtenerFotos = async () => {
  // ...
};