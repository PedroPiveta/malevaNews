import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-screen h-20 bg-red-700 px-6 flex items-center justify-between">
      <Link to={"/"}>
        <h1 className="text-zinc-100 text-2xl font-semibold font-sans">
          Maleva News
        </h1>
      </Link>
      <nav>
        <Link to={"/noticia/1"} className="text-zinc-100 text-sm md:text-lg">
          Notícias Recentes
        </Link>
      </nav>
    </header>
  );
}
