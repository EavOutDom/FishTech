const Button = ({ children, className, style, onClick }) => {
  return <button onClick={onClick} style={style} className={`${className} enabled:active:scale-90 transition-transform font-medium px-5 py-2.5 rounded-sm text-lg uppercase whitespace-nowrap`}>{children}</button>;
}

export default Button;