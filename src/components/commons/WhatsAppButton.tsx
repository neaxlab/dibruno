import React from 'react';

interface WhatsAppButtonProps {
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ className }) => {
  return (
    <div id="wespeak-whatsapp-button" className={className}>
      <div
        id="wapp-button"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          height: 'auto',
          overflow: 'hidden',
          visibility: 'visible',
          zIndex: 99999999,
          background: 'transparent',
          border: '0px',
          transition: 'transform 0.2s ease-in-out',
          backfaceVisibility: 'hidden',
        }}
      >
        <a 
          id="whatsapp-message" 
          target="_blank" 
          href="https://wa.me/573144583693?text=*Hola!%20Me%20interesa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20de*"
          style={{
            borderRadius: '100px',
            background: 'linear-gradient(0deg, #1FAF38 -9900%, #60D669 100%)',
            display: 'flex',
            padding: '12px',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            textDecoration: 'none'
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_2640_6254)">
              <path d="M0.597762 13.8324C0.597105 16.185 1.21659 18.4821 2.39454 20.5067L0.485107 27.4245L7.61973 25.5682C9.59308 26.6342 11.8041 27.1927 14.0509 27.1929H14.0568C21.4739 27.1929 27.5116 21.204 27.5148 13.843C27.5162 10.276 26.1176 6.92185 23.5764 4.39838C21.0357 1.87512 17.6566 0.484782 14.0562 0.483154C6.63822 0.483154 0.600934 6.47168 0.597871 13.8324" fill="url(#paint0_linear_2640_6254)"/>
              <path d="M0.117456 13.8281C0.116691 16.2653 0.758382 18.6445 1.97833 20.7417L0.000427246 27.9074L7.39087 25.9846C9.42718 27.0863 11.7199 27.6671 14.0528 27.668H14.0588C21.742 27.668 27.9967 21.4637 27.9999 13.8392C28.0012 10.144 26.5523 6.66932 23.9203 4.05544C21.288 1.44189 17.7881 0.00151938 14.0588 0C6.37425 0 0.120519 6.20341 0.117456 13.8281ZM4.51874 20.3805L4.24279 19.9459C3.08278 18.1157 2.47051 16.0007 2.47138 13.829C2.47379 7.49152 7.67164 2.3355 14.0632 2.3355C17.1584 2.33681 20.0673 3.53408 22.2552 5.70636C24.443 7.87885 25.6469 10.7668 25.6461 13.8383C25.6433 20.1757 20.4453 25.3324 14.0588 25.3324H14.0542C11.9747 25.3313 9.93522 24.7772 8.1566 23.73L7.73332 23.4809L3.34768 24.6219L4.51874 20.3805Z" fill="url(#paint1_linear_2640_6254)"/>
              <path d="M10.5742 8.0471C10.3133 7.47158 10.0386 7.45997 9.79046 7.44988C9.58725 7.44119 9.35494 7.44184 9.12285 7.44184C8.89054 7.44184 8.51309 7.52856 8.19405 7.87422C7.87468 8.2202 6.97476 9.05629 6.97476 10.7568C6.97476 12.4573 8.22304 14.1009 8.39705 14.3317C8.57128 14.5621 10.8069 18.1635 14.3475 19.5489C17.2901 20.7003 17.8889 20.4713 18.5275 20.4135C19.1662 20.356 20.5885 19.5777 20.8787 18.7706C21.1691 17.9635 21.1691 17.2718 21.082 17.1272C20.995 16.9832 20.7627 16.8967 20.4143 16.724C20.0659 16.5512 18.3533 15.7149 18.034 15.5995C17.7146 15.4842 17.4824 15.4267 17.2501 15.7728C17.0178 16.1184 16.3508 16.8967 16.1474 17.1272C15.9443 17.3583 15.741 17.3871 15.3928 17.2142C15.0442 17.0407 13.9224 16.6762 12.5914 15.4988C11.5559 14.5826 10.8567 13.4512 10.6535 13.1051C10.4503 12.7596 10.6318 12.5722 10.8064 12.4C10.9629 12.2451 11.1549 11.9964 11.3292 11.7947C11.5029 11.5928 11.5609 11.4488 11.677 11.2183C11.7933 10.9875 11.7351 10.7857 11.6482 10.6128C11.5609 10.4399 10.884 8.7305 10.5742 8.0471Z" fill="white"/>
            </g>
            <defs>
              <linearGradient id="paint0_linear_2640_6254" x1="1351.97" y1="2694.62" x2="1351.97" y2="0.483154" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1FAF38"/>
                <stop offset="1" stopColor="#60D669"/>
              </linearGradient>
              <linearGradient id="paint1_linear_2640_6254" x1="1399.98" y1="2790.74" x2="1399.98" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F9F9F9"/>
                <stop offset="1" stopColor="white"/>
              </linearGradient>
              <clipPath id="clip0_2640_6254">
                <rect width="28" height="28" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </a>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Default desktop size */
          #wapp-button svg {
            width: 48px !important;
            height: 48px !important;
            flex-shrink: 0;
          }
          
          /* Mobile sizes */
          @media screen and (max-width: 480px) {
            #wapp-button {
              bottom: 118px !important;
            }
            #wapp-button svg {
              width: 28px !important;
              height: 28px !important;
              flex-shrink: 0;
            }
          }
        `
      }} />
    </div>
  );
};

export default WhatsAppButton;
