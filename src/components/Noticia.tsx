type Props = {
  title: string,
  body: string,
  bannerUrl: string,
}

export default function Noticia({ title, body, bannerUrl }: Props) {
  return (
    <div>
      <h1 className="text-white">{ title }</h1>
      <p className="text-white">{ body }</p>
      <img src={bannerUrl} alt="Banner" />
    </div>
  )
}