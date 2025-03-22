import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "@/lib/config"; // Corrected import path
import { db } from "@/database/drizzle"; // Import the database connection
import { examinations } from "@/database/schema"; // Import the examinations schema

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const createExamination = async ({
  title,
  date,
  time,
}: {
  title: string;
  date: string;
  time: string;
}) => {
  // Logic to save examination to the database
  await db.insert(examinations).values({ title, date: new Date(date), time }); // Save examination to the database
  
  // Schedule notification logic
  const notificationDate = new Date(date);
  notificationDate.setHours(notificationDate.getHours() - 1); // Example: Notify 1 hour before

  await sendEmail({
    email: "user@example.com", // Replace with actual user email
    subject: "Examination Reminder",
    message: `Reminder: Your examination "${title}" is scheduled for ${date} at ${time}.`,
  });
};

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "JS Mastery <contact@adrianjsmastery.com>",
      to: [email],
      subject,
      html: message,
    },
  });
};
