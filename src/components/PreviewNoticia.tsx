type newsProps = {
  title: string;
  body: string;
  bannerUrl: string;
};

export default function PreviewNoticia({ title, body, bannerUrl }: newsProps) {
  return (
    <div>
      <h1 className="text-white">{title}</h1>
      <p className="text-white">{body}</p>
      <img className="w-full" src={bannerUrl} alt="Banner" />
    </div>
  );
}
