import { useEffect, useRef, useState } from "react";

const Drawer = ({ children, className = "", style, open, onClose, icon = true }) => {
  const [mount, setMount] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (open) setMount(true);
    else if (mount) {
      ref.current.removeAttribute('style');
      ref.current.querySelector('div').removeAttribute('style');
      setTimeout(() => {
        const oe = document.querySelector("head").querySelectorAll("#overlayEffect");
        oe[oe.length - 1]?.remove();
        setMount(false);
      }, 300);
    }
  }, [open]);

  useEffect(() => {
    if (!mount) return;
    requestAnimationFrame(() => {
      ref.current.style.opacity = 1;
      ref.current.querySelector('div').style.transform = 'none';
    });
    document.addEventListener('keydown', handleKeyEvent);
    document.querySelectorAll('head').innerHTML += `
        <style id="overlayEffect"> body { padding-right: ${window.innerWidth - document.body.clientWidth}px; overflow: hidden; }</style>
    `;
    return () => document.removeEventListener('keydown', handleKeyEvent);
  }, [mount]);

  const handleClose = () => onClose && onClose();

  const handleKeyEvent = e => e.key === 'Escape' && handleClose();

  if (!open && !mount) return null;

  return (<section className="fixed inset-0 bg-black/50 dark:bg-white/50 transition-all duration-300 opacity-0 z-20" ref={ref} onClick={handleClose}>
    <div className={`drawer ${className}`} style={style} onClick={e => e.stopPropagation()}>
      {icon && <span className="flex justify-center items-center rounded-full hover:bg-gray-400 hover:text-white absolute top-2 right-2 w-8 h-8 cursor-pointer font-bold" onClick={handleClose}>✕</span>}
      {children}
    </div>
  </section>);
}

export default Drawer;