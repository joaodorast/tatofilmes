
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircle, Building, CreditCard, QrCode, ShoppingBag } from 'lucide-react';
import { formatCardNumber, validateCardNumber, validateCVV, validateExpiryDate } from './CardValidation';

interface CardFormState {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  installments: string;
}

interface FormErrors {
  [key: string]: string;
}

interface PaymentMethodsProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  cardForm: CardFormState;
  setCardForm: React.Dispatch<React.SetStateAction<CardFormState>>;
  formErrors: FormErrors;
  totalPrice: number;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ 
  paymentMethod, 
  setPaymentMethod, 
  cardForm, 
  setCardForm, 
  formErrors, 
  totalPrice 
}) => {
  // Handle card number input with formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardForm({...cardForm, cardNumber: formatCardNumber(value)});
  };

  // Format expiry date as MM/YY
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 2) {
      setCardForm({...cardForm, expiryDate: value});
    } else {
      const month = value.slice(0, 2);
      const year = value.slice(2, 4);
      setCardForm({...cardForm, expiryDate: `${month}/${year}`});
    }
  };

  // Limit CVV to 3-4 digits
  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardForm({...cardForm, cvv: value});
  };

  return (
    <Tabs defaultValue="credit" onValueChange={setPaymentMethod}>
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="credit" className="flex items-center">
          <CreditCard className="h-4 w-4 mr-2" /> Crédito
        </TabsTrigger>
        <TabsTrigger value="debit" className="flex items-center">
          <ShoppingBag className="h-4 w-4 mr-2" /> Débito
        </TabsTrigger>
        <TabsTrigger value="bank" className="flex items-center">
          <Building className="h-4 w-4 mr-2" /> Boleto
        </TabsTrigger>
        <TabsTrigger value="pix" className="flex items-center">
          <QrCode className="h-4 w-4 mr-2" /> Pix
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="credit" className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Número do cartão</Label>
            <Input
              id="cardNumber"
              placeholder="0000 0000 0000 0000"
              value={cardForm.cardNumber}
              onChange={handleCardNumberChange}
              className={formErrors.cardNumber ? "border-red-500" : ""}
              required
            />
            {formErrors.cardNumber && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" /> {formErrors.cardNumber}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardName">Nome no cartão</Label>
            <Input
              id="cardName"
              placeholder="Nome como aparece no cartão"
              value={cardForm.cardName}
              onChange={(e) => setCardForm({...cardForm, cardName: e.target.value})}
              className={formErrors.cardName ? "border-red-500" : ""}
              required
            />
            {formErrors.cardName && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" /> {formErrors.cardName}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Validade</Label>
              <Input
                id="expiryDate"
                placeholder="MM/AA"
                value={cardForm.expiryDate}
                onChange={handleExpiryDateChange}
                className={formErrors.expiryDate ? "border-red-500" : ""}
                required
              />
              {formErrors.expiryDate && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" /> {formErrors.expiryDate}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cardForm.cvv}
                onChange={handleCVVChange}
                className={formErrors.cvv ? "border-red-500" : ""}
                required
              />
              {formErrors.cvv && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" /> {formErrors.cvv}
                </p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="installments">Parcelamento</Label>
            <RadioGroup 
              id="installments" 
              value={cardForm.installments}
              onValueChange={(value) => setCardForm({...cardForm, installments: value})}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="installment-1" />
                <Label htmlFor="installment-1">1x de R$ {(totalPrice * 1.10).toFixed(2).replace('.', ',')} sem juros</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="installment-2" />
                <Label htmlFor="installment-2">2x de R$ {((totalPrice * 1.10) / 2).toFixed(2).replace('.', ',')} sem juros</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="installment-3" />
                <Label htmlFor="installment-3">3x de R$ {((totalPrice * 1.10) / 3).toFixed(2).replace('.', ',')} sem juros</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="debit" className="space-y-4">
        <p className="text-cinema-600 dark:text-cinema-300 mb-4">
          Você será redirecionado para o ambiente seguro do seu banco para finalizar o pagamento.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {['Banco do Brasil', 'Itaú', 'Bradesco', 'Caixa', 'Santander', 'Nubank'].map((bank) => (
            <div key={bank} className="border rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-cinema-900 cursor-pointer">
              {bank}
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="bank">
        <div className="text-center py-6">
          <div className="mb-4 p-4 bg-gray-100 dark:bg-cinema-900 rounded-lg inline-block">
            <Building className="h-12 w-12 mx-auto text-cinema-600 dark:text-cinema-300" />
          </div>
          <h3 className="text-lg font-medium mb-2">Boleto Bancário</h3>
          <p className="text-cinema-600 dark:text-cinema-300 mb-4">
            Após a confirmação, você receberá um boleto para pagamento em até 3 dias úteis.
          </p>
          <p className="font-medium">Valor do boleto: R$ {(totalPrice * 1.10).toFixed(2).replace('.', ',')}</p>
        </div>
      </TabsContent>
      
      <TabsContent value="pix">
        <div className="text-center py-6">
          <div className="mb-4 p-4 bg-gray-100 dark:bg-cinema-900 rounded-lg inline-block">
            <QrCode className="h-12 w-12 mx-auto text-cinema-600 dark:text-cinema-300" />
          </div>
          <h3 className="text-lg font-medium mb-2">Pagamento via Pix</h3>
          <p className="text-cinema-600 dark:text-cinema-300 mb-4">
            Após a confirmação, um QR Code será gerado para pagamento imediato.
          </p>
          <p className="font-medium">Valor do Pix: R$ {(totalPrice * 1.10 * 0.95).toFixed(2).replace('.', ',')} (5% de desconto)</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PaymentMethods;
