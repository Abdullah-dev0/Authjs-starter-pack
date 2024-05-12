//sent email logic here !
// you can follow the documentation to send email.
// https://resend.com/docs/send-with-nextjs

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sentResetPasswordEmail = async (email: string, token: string) => {
   try {
      const verifyLink = `http://localhost:3000/auth/reset-password?token=${token}`;

      const { data, error } = await resend.emails.send({
         from: "onboarding@resend.dev",
         to: email,
         subject: "password reset email",
         html: `<p>Click <a href="${verifyLink}">Here</a> To update your password </p>
         <p>Please don't replay to this email </p>
         `,
      });

      if (error) {
         console.log("this is email error :", error);
      }
   } catch (error) {
      console.log(error);
   }
};

export const sentVerificationEmail = async (email: string, token: string) => {
   try {
      const verifyLink = `http://localhost:3000/auth/new-verification?token=${token}`;

      const { data, error } = await resend.emails.send({
         from: "onboarding@resend.dev",
         to: email,
         subject: "Verifcation email",
         html: `<p>Click <a href="${verifyLink}">Here</a> To verify your email </p>
         <p>Please don't replay to this email </p>
         `,
      });

      if (error) {
         console.log(error);
      }
   } catch (error) {
      console.log(error);
   }
};
