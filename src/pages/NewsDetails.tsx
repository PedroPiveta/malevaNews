import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import Header from "../components/Header";

export default function NewsDetails() {
  type Noticia = {
    title: string;
    body: string;
    bannerUrl: string;
  };

  const { id } = useParams();
  const [noticia, setNoticia] = useState({} as Noticia);

  useEffect(() => {
    async function getNoticia() {
      try {
        const docRef = doc(db, "noticias", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setNoticia(docSnap.data() as Noticia);
        } else {
          console.log("Noticia não encontrada!");
        }
      } catch (error) {
        console.error("Erro ao obter notícia:", error);
      }
    }
    getNoticia();
  }, [id]);

  return (
    <div className="overflow-x-hidden">
      <Header />
      <main className="min-h-screen">
        <section className="mt-6 flex flex-col items-center w-[75%] mx-auto py-6 px-4 bg-gray-700 shadow-md rounded-sm">
          {noticia.title ? (
            <article className="text-gray-100">
              <img
                className="mx-auto max-w-full max-h-96 rounded aspect-video"
                src={noticia.bannerUrl}
                alt="banner"
              />
              <h1 className="text-2xl md:text-4xl font-bold mt-6">
                {noticia.title}
              </h1>
              <p className="mt-6 text-justify text-base">{noticia.body}</p>
            </article>
          ) : (
            <Spinner />
          )}
        </section>
      </main>
    </div>
  );
}
