import { useEffect, useState } from "react";
import Header from "../components/Header";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import PreviewNoticia from "../components/PreviewNoticia";

export default function Home() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    async function getNoticias() {
      try {
        const q = query(collection(db, "noticias"));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
          setNoticias((prevState) => [...prevState, doc.data()]);
          console.log(doc.id, " => ", doc.data());
        });
      } catch (error) {
        console.error("Erro ao obter notícias:", error);
      }
    }
    getNoticias();
  }, []);

  console.log(noticias);
  return (
    <main className="overflow-x-hidden min-h-screen">
      <Header />
      <section className="mx-6 md:ml-24 mt-6 flex flex-col gap-4">
        {noticias.map(({ title, summary, bannerUrl } = noticias, index) => (
          <PreviewNoticia
            title={title}
            summary={summary}
            bannerUrl={bannerUrl}
            key={index}
          />
        ))}
      </section>
    </main>
  );
}
