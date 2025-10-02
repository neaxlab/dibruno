import React from 'react';
import type { z } from 'zod';
import type { MoneyV2Result } from '@/utils/schemas';

interface Props {
  price: z.infer<typeof MoneyV2Result> | null | undefined;
  showCurrency?: boolean;
  className?: string;
}

const Money: React.FC<Props> = ({ price, showCurrency = false, className }) => {
  if (!price || !price.currencyCode || !price.amount) {
    return <span className={`text-base leading-4 font-normal ${className || ''}`}>Precio no disponible</span>;
  }

  const formatPrice = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(price.amount));

  const currencySymbol = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currencyCode,
    currencyDisplay: showCurrency ? 'symbol' : 'narrowSymbol',
  }).formatToParts(0).find(part => part.type === 'currency')?.value || price.currencyCode;

  return <span className={`${className || ''}`}>{currencySymbol}{formatPrice} </span>;
};

export default Money;
