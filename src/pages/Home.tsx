import { useEffect, useState } from 'react'
import Header from '../components/Header';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import PreviewNoticia from '../components/PreviewNoticia';


export default function Home() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    async function getNoticias() {
      try {
        const q = query(collection(db, "noticias"));
        const snapshot = await getDocs(q);
        snapshot.forEach(doc => {
          setNoticias(
            (prevState) => [...prevState, doc.data()]
          )
          console.log(doc.id, " => ", doc.data());
        })
      } catch (error) {
        console.error('Erro ao obter notícias:', error);
      }
    }
    getNoticias();
  }, []);
  
  console.log(noticias);
  return (
    <div>
        <Header />
        <ul>
          {
            noticias.map(({title, body, bannerUrl} = noticias, index) => (
              <PreviewNoticia title={title} body={body} bannerUrl={bannerUrl} key={index} />
            ))
          }
        </ul>
    </div>
  )
}