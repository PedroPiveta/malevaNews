import { useNavigate } from "react-router-dom";
import { auth, enviarNoticiaParaFirebase } from "../firebase"
import { useState } from "react";

export default function AdminControl() {
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

    async function createNews(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try  {
            enviarNoticiaParaFirebase(title, body);
        } catch (err) {
            console.error(err);
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
            <form onSubmit={createNews}>
                <label htmlFor="title">Titulo da noticia</label>
                <input onChange={onChange} type="text" name="title" id="title" />

                <label htmlFor="content">corpo da noticia</label>
                <input onChange={onChange} type="text" name="body" id="body" />
                <button>postar noticia</button>
            </form>
            <button className="text-white" onClick={onSignOut}>Sair da conta de admin</button>
        </>
    )
}