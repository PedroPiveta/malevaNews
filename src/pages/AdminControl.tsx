import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"

export default function AdminControl() {
    const navigate = useNavigate();

    function onSignOut() {
        auth.signOut();
        navigate("/");
    }
    return (
        <>
            <div className="text-white">AdminControl</div>
            <button className="text-white" onClick={onSignOut}>Sair da conta de admin</button>
        </>
    )
}