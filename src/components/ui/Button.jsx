
export default function Button({ children, className = "", type = "button", ...props }) {
  return (
    <button className={`btn btn-primary ${className}`} type={type} {...props}>
      {children}
    </button>
  );
}