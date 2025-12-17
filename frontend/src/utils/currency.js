// Currency formatting utility for Indian Rupees
export const formatCurrency = (amount) => {
  const numAmount = Number(amount);
  
  // Format in Indian numbering system (lakhs, crores)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(numAmount);
};
