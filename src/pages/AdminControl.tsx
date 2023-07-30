import { useNavigate } from "react-router-dom";
import { auth, enviarNoticiaParaFirebase, uploadImagem } from "../firebase"
import { useState } from "react";

export default function AdminControl() {
    const [imagem, setImagem] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        body: "",
    });
    const { title, body } = formData;
    const navigate = useNavigate();

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }
    function handleChangeImagem(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setImagem(e.target.files[0]);
          }
      }

    async function createNews(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try  {
            enviarNoticiaParaFirebase(title, body);
        } catch (err) {
            console.error(err);
        }

        if (imagem) {
            try {
              const urlImagem = await uploadImagem(imagem);
              console.log('URL da imagem:', urlImagem);
              // Aqui você pode fazer o que quiser com a URL da imagem, como exibi-la no seu aplicativo.
            } catch (error) {
              console.error('Erro ao fazer upload da imagem:', error);
            }
          }
    }

    function onSignOut() {
        auth.signOut();
        navigate("/");
    }

    return (
        <>
            <div className="text-white">AdminControl</div>
            <p className="text-white">Olá { auth.currentUser?.email }</p>
            <form className="text-white" onSubmit={createNews}>
                <label htmlFor="title">Titulo da noticia</label>
                <input className="text-black" onChange={onChange} type="text" name="title" id="title" />

                <label htmlFor="content">corpo da noticia</label>
                <input className="text-black" onChange={onChange} type="text" name="body" id="body" />
                <input type="file" onChange={handleChangeImagem} />
                <button>postar noticia</button>
            </form>
            <button className="text-white" onClick={onSignOut}>Sair da conta de admin</button>
        </>
    )
}