type newsProps = {
  title: string;
  summary: string;
  bannerUrl: string;
};

export default function PreviewNoticia({
  title,
  summary,
  bannerUrl,
}: newsProps) {
  return (
    <article className="aspect-video relative text-white w-full h-40 sm:w-[30rem] sm:h-64 rounded whitespace-normal text-ellipsis overflow-hidden [&>*:nth-child(1)]:hover:scale-105">
      <img
        className="absolute -z-10 inset-0 brightness-75 transition duration-200 ease-in-out overflow-hidden"
        src={bannerUrl}
        alt="Banner"
      />
      <div className="absolute bottom-5">
        <h1 className="text-lg sm:text-2xl font-semibold mt-2 ml-4">{title}</h1>
        <p className="text-xs sm:text-sm mt-2 ml-4">{summary}</p>
      </div>
    </article>
  );
}
