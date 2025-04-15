export const Button = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="rounded-lg p-2 text-2xl border-black  shadow-lg bg-indigo-500 hover:bg-indigo-600">
      {title}
    </button>
  );
};
