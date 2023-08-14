import { useNavigate } from "react-router-dom";
import { auth, enviarNoticiaParaFirebase, uploadImagem } from "../firebase";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import * as Dialog from "@radix-ui/react-dialog";
import Noticia from "../components/Noticia";

export default function AdminControl() {
  const [imagem, setImagem] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    summary: "",
  });
  const { title, body, summary } = formData;
  const navigate = useNavigate();

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  function handleChangeImagem(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setImagem(e.target.files[0]);
      setPreviewImageUrl(previewUrl);
    }
  }
  

  async function createNews(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const urlImagem = await uploadImagem(imagem);
      enviarNoticiaParaFirebase(
        title,
        summary,
        body,
        urlImagem,
        auth.currentUser?.email
      );
      console.log(formData);
      console.log("URL da imagem:", urlImagem);

      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
    }
  }

  function onSignOut() {
    auth.signOut();
    navigate("/");
  }
  // implementar preview da noticia no form

  return (
    <div className="flex flex-col items-center">
      <header className="w-full h-20 bg-cyan-700 px-4 py-2">
        <h1 className="text-white text-2xl font-semibold">AdminControl</h1>
        <p className="text-white">Olá {auth.currentUser?.email}</p>
      </header>

      <form
        className="bg-cyan-700 rounded-md mt-12 py-4 px-2 flex flex-col items-center w-[70%]"
        onSubmit={createNews}
      >
        <label className="text-white text-lg" htmlFor="title">
          Título da notícia
        </label>
        <input
          className="w-[90%] sm:w-[60%] mb-6 rounded text-black px-4 py-2"
          onChange={onChange}
          type="text"
          name="title"
          id="title"
        />
        <label className="text-white text-lg" htmlFor="summary">
          Resumo da notícia
        </label>
        <textarea
          className="w-[90%] sm:w-[60%] h-40 text-sm md:text-lg mb-6 min-h-[200px] rounded text-black px-4 py-2"
          onChange={onChange}
          name="summary"
          id="summary"
        />
        <label className="text-white text-lg" htmlFor="body">
          Corpo da notícia
        </label>
        <textarea
          className="w-[90%] sm:w-[60%] h-40 text-sm md:text-lg mb-6 min-h-[350px] rounded text-black px-4 py-2"
          onChange={onChange}
          name="body"
          id="body"
        />
        <input
          className="text-white mx-auto w-full md:w-[50%] px-4 whitespace-normal"
          type="file"
          onChange={handleChangeImagem}
          accept=".jpg,.png,.jpeg"
          required
        />
        <Dialog.Root>
          <Dialog.Trigger
            asChild
            className="text-white mx-auto w-full md:w-[50%] px-4 whitespace-normal"
          >
            <button>Preview</button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            <Dialog.Content className="fixed inset-0 flex items-center justify-center">
              <Noticia title={title} body={body} bannerUrl={previewImageUrl} />
              <Dialog.Close className="absolute top-0 right-0 m-4" />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <button
          className="flex items-center text-white font-semibold bg-cyan-800 py-2 px-4 rounded uppercase mt-6 mb-6"
          type="submit"
        >
          <AiOutlinePlus className="mr-2 font-semibold" />
          postar notícia
        </button>
        <button type="button" className="text-white" onClick={onSignOut}>
          Sair da conta de admin
        </button>
      </form>
    </div>
  );
}
