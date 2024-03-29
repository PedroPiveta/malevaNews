// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const apiKey = import.meta.env.VITE_API_KEY;
const authDomain = import.meta.env.VITE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_APP_ID;
const measurementId = import.meta.env.VITE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

const enviarNoticiaParaFirebase = async (title: string, summary: string, body: string, bannerUrl: string, createdBy: string) => {
  try {
    const noticiasRef = collection(db, 'noticias');
    await addDoc(noticiasRef, {
      title: title,
      summary: summary,
      body: body,
      bannerUrl: bannerUrl,
      createdBy: createdBy,
    });
    console.log("Notícia enviada com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar notícia:", error);
  }
};

const uploadImagem = async (image: File) => {
  try {
    // Gera um nome único para o arquivo usando a data atual
    const nomeArquivo = Date.now() + '-' + image.name;

    // Referência para o arquivo no Firebase Storage
    const storageRef = ref(storage, '/fotos/' + nomeArquivo);

    // Faz o upload da imagem para o Firebase Storage
    await uploadBytes(storageRef, image);

    // Obtém a URL de download da imagem após o upload
    const downloadURL = await getDownloadURL(storageRef);

    // Retorna a URL da imagem para ser usada no seu aplicativo
    return downloadURL;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw error;
  }
}

export { auth, db, analytics, storage, enviarNoticiaParaFirebase, uploadImagem };