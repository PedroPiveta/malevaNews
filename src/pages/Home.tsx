import { useEffect } from 'react'
import Header from '../components/Header';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';


export default function Home() {
  // const [noticias, setNoticias] = useState(null);

  useEffect(() => {
    async function getNoticias() {
      try {
        const q = query(collection(db, "noticias"));
        const snapshot = await getDocs(q);
        snapshot.forEach(doc => {
          console.log(doc.id, " => ", doc.data());
        })
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