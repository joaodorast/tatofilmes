
// Card validation helpers
export const validateCardNumber = (number: string) => {
  // Remove spaces and non-digit characters
  const digits = number.replace(/\D/g, '');
  
  // Check if the length is valid (most cards are 16 digits)
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }
  
  // Luhn algorithm (mod 10) for credit card validation
  let sum = 0;
  let shouldDouble = false;
  
  // Loop through digits in reverse
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};

export const validateExpiryDate = (date: string) => {
  // Check format (MM/YY)
  if (!/^\d{2}\/\d{2}$/.test(date)) {
    return false;
  }
  
  const [month, year] = date.split('/').map(part => parseInt(part));
  
  // Check if month is valid
  if (month < 1 || month > 12) {
    return false;
  }
  
  // Get current date
  const now = new Date();
  const currentYear = now.getFullYear() % 100; // Get last two digits of year
  const currentMonth = now.getMonth() + 1; // January is 0
  
  // Check if card is expired
  return (year > currentYear) || (year === currentYear && month >= currentMonth);
};

export const validateCVV = (cvv: string) => {
  // CVV is typically 3 or 4 digits
  return /^\d{3,4}$/.test(cvv);
};

export const formatCardNumber = (number: string) => {
  // Remove non-digit characters
  const digits = number.replace(/\D/g, '');
  
  // Add space every 4 digits
  const groups = [];
  for (let i = 0; i < digits.length; i += 4) {
    groups.push(digits.slice(i, i + 4));
  }
  
  return groups.join(' ');
};
