const Button = ({ children, onClick, className = '', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
