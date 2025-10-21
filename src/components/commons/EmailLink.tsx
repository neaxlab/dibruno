import React, { useState } from 'react';

interface EmailLinkProps {
  email: string;
  className?: string;
}

const EmailLink: React.FC<EmailLinkProps> = ({ email, className = '' }) => {
  const [showFallback, setShowFallback] = useState(false);

  const handleMailtoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Intentar abrir mailto:
    // Si el usuario no tiene cliente de correo, mostrar alternativa después de un momento
    setTimeout(() => {
      setShowFallback(true);
      // Ocultar el mensaje después de 5 segundos
      setTimeout(() => setShowFallback(false), 5000);
    }, 1000);
  };

  const handleGmailClick = () => {
    setShowFallback(false);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative">
      <a 
        href={`mailto:${email}`} 
        onClick={handleMailtoClick}
        className={className}
      >
        <li className="text-nowrap">
          {email}
        </li>
      </a>
      
      {showFallback && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-primary-olive shadow-lg rounded-lg p-4 z-50 min-w-[280px]">
          <p className="text-sm text-primary-granite mb-2">
            Don't have an email client?
          </p>
          <button
            onClick={handleGmailClick}
            className="text-sm text-primary-olive hover:text-primary-granite underline"
          >
            Click here to use Gmail Web
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailLink;

