import React, { useState } from 'react';
import ButtonSlide from '../ui/buttons/ButtonSlide';

const SubscribeForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Limpiar mensajes previos
    setMessage('');
    
    // Validar email
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    // Iniciar proceso de suscripción
    setStatus('loading');

    try {
      // TODO: Aquí irá la llamada a la API cuando esté definida
      // Ejemplo de cómo se vería:
      /*
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Error al suscribirse');
      }

      const data = await response.json();
      */

      // Simulación de llamada API (remover cuando tengas la API real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Si todo va bien
      setStatus('success');
      setMessage('Thank you for subscribing! You will hear from us soon.');
      setEmail(''); // Limpiar el input
      
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);

    } catch (error) {
      setStatus('error');
      setMessage('An error occurred while processing your subscription. Please try again.');
      console.error('Subscription error:', error);
      
      // Limpiar mensaje de error después de 5 segundos
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email" 
          className="text-d-secondary text-transparent w-full h-10 border-0 border-b border-b-olive p-2 bg-[#FAFAFA] focus:outline-none focus:ring-0 focus:border-b-olive"
          disabled={status === 'loading'}
          aria-label="Email for subscription"
        />
        
        {/* Mensaje de estado */}
        {message && (
          <p 
            className={`text-sm ${
              status === 'success' ? 'text-green-600' : 
              status === 'error' ? 'text-red-600' : 
              'text-gray-600'
            }`}
            role="alert"
          >
            {message}
          </p>
        )}
      </div>

      <ButtonSlide
        text={status === 'loading' ? 'SENDING...' : 'SUBSCRIBE'}
        type="submit"
        normalBackground="transparent"
        normalColor="#3B3B3B"
        hoverBackground="#3B3B3B"
        hoverColor="#FAFAFA"
        borderColor="#3B3B3B"
        hoverBorderColor="#FAFAFA"
        transitionDuration="0.5s"
        className="w-full flex justify-center rounded-none"
        disabled={status === 'loading'}
      />
    </form>
  );
};

export default SubscribeForm;

