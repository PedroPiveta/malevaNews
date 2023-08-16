import { useNavigate } from "react-router-dom";
import { auth, enviarNoticiaParaFirebase, uploadImagem } from "../firebase";
import { useState } from "react";
import { AiFillEye, AiOutlinePlus } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import * as Dialog from "@radix-ui/react-dialog";
import PreviewNoticia from "../components/PreviewNoticia";

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
      console.error("Erro ao fazer upload da noticia:", error);
    }
  }

  function onSignOut() {
    auth.signOut();
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center">
      <header className="w-full h-20 bg-red-700 px-4 py-2">
        <h1 className="text-white text-2xl font-semibold">AdminControl</h1>
        <p className="text-white">Olá {auth.currentUser?.email}</p>
      </header>

      <form
        className="bg-red-700 rounded-md mt-16 mb-12 py-8 px-2 flex flex-col items-center md:w-[70%]"
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
          required
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
          required
        />
        <input
          className="text-white mx-auto w-full md:w-[50%] px-4 whitespace-normal"
          type="file"
          onChange={handleChangeImagem}
          accept=".jpg,.png,.jpeg"
          required
        />
        <div className="flex items-center justify-center space-x-2 md:space-x-8">
          <Dialog.Root>
            <Dialog.Trigger
              asChild
              className="mx-auto w-full md:w-[50%] px-4 whitespace-normal"
            >
              <button className="flex items-center justify-center flex-1 h-16 rounded uppercase font-semibold bg-gray-200 text-gray-800 hover:brightness-90 focus:brightness-90 transition duration-150 ease-in-out">
                Preview
                <AiFillEye className="ml-4" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
              <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center rounded">
                {previewImageUrl ? (
                  <PreviewNoticia
                    title={title}
                    summary={summary}
                    bannerUrl={previewImageUrl}
                  />
                ) : (
                  <p className="text-white">Nenhuma imagem selecionada</p>
                )}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <button
            className="flex items-center justify-center flex-1 text-white font-semibold bg-red-800 h-16 rounded uppercase mt-6 mb-6 hover:bg-red-200 hover:text-red-700 focus:bg-red-200 focus:text-red-700 transition duration-150 ease-in-out"
            type="submit"
          >
            postar notícia
            <AiOutlinePlus className="mr-4 font-bold" />
          </button>
        </div>
        <button
          type="button"
          className="text-white bg-red-600 border-2 border-red-600 hover:brightness-90 transition duration-150 ease-in-out  px-4 rounded uppercase font-semibold py-2 flex items-center gap-2"
          onClick={onSignOut}
        >
          Sair da conta de admin <ImExit />
        </button>
      </form>
    </div>
  );
}
