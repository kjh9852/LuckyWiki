import emailjs from '@emailjs/browser';

interface SendMailParams {
  name: string;
  question: string;
  answer: string;
  email: string;
}

export const sendMail = ({ answer, email, name, question }: SendMailParams) => {
  emailjs.send(
    `${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_KEY}`,
    `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_KEY}`,
    {
      name,
      question,
      answer,
      email,
    },
    `${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}`,
  );
};
