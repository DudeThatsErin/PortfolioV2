export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type SubmitStatus = 'success' | 'error' | null;