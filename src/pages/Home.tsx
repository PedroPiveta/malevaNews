import { useEffect } from 'react'
import Header from '../components/Header';
import { db } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';


export default function Home() {
  // const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    async function getNoticias() {
      try {
        const noticiasRef = doc(collection(db, 'noticias'));
        const snapshot = await getDoc(noticiasRef);

        if (snapshot.exists()) {
          console.log("Document data:", snapshot.data);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }

        // const listaNoticias = snapshot.docs.map((doc) => ({
        //   id: doc.id,
        //   ...doc.data(),
        // }));
        // setNoticias(listaNoticias);
      } catch (error) {
        console.error('Erro ao obter notícias:', error);
      }
    }

    getNoticias();
    }, []);

  return (
    <div>
        <Header />
        <ul>
          {/* { noticias.map(noticia => (
            <li key={noticia.id}>
              <h3>{noticia.title}</h3>
              <p>{noticia.body}</p>
            </li>
          ))} */}
        </ul>
    </div>
  )
}