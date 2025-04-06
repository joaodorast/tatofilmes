
interface EmailParams {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

// Mock email service
export const sendEmail = async (params: EmailParams): Promise<boolean> => {
  console.log('Sending email:', params);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

// Mock newsletter subscription
export const subscribeToNewsletter = async (email: string, name: string): Promise<boolean> => {
  console.log('Subscribing to newsletter:', { email, name });
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};
