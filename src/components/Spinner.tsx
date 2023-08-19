export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black opacity-50">
      <div className="h-24 w-24 border-y-4 border-red-500 rounded-[50%] animate-spin duration-500"></div>
    </div>
  );
}
