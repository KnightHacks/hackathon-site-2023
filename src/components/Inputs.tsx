export function Input({ label }: { label: string }) {
  return (
    <div className="mb-4 flex flex-col">
      <label className="mb-1" htmlFor={label}>
        {label}
      </label>
      <input
        className="border px-4 py-3"
        placeholder={label}
        id={label}
        type="text"
      />
    </div>
  );
}

export function Select({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <div className="mb-4 flex flex-col">
      <label className="mb-1" htmlFor={label}>
        {label}
      </label>
      <select className="border px-4 py-3" placeholder={label} id={label}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
