import { useState } from "react";

export default function useSendEmail() {
  const [status, setStatus] = useState<string>("Send email");

  const sendEmail = async (emailData: {
    name: string;
    email: string;
    message: string;
  }) => {
    setStatus("Sending...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const data = await response.json();
      setStatus(data.message || "Email sent!");
      return { data, status: "Email sent!" };
    } catch (error: any) {
      setStatus(error.message || "Error sending email");
    }
  };

  return { sendEmail, status };
}
