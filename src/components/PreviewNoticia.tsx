type newsProps = {
  title: string;
  body: string;
  bannerUrl: string;
};

export default function PreviewNoticia({ title, body, bannerUrl }: newsProps) {
  return (
    <article className="text-white max-w-[40rem] h-96 rounded bg-cyan-800 whitespace-nowrap text-ellipsis overflow-hidden">
      <img
        className="w-full h-60 object-cover bg-center"
        src={bannerUrl}
        alt="Banner"
      />
      <h1 className="text-lg text-center font-semibold mt-2">{title}</h1>
      <p className="mt-2 text-center">{body}</p>
    </article>
  );
}
