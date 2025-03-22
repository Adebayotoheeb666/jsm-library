import { ZodType } from "zod";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  video?: string;
  summary: string;
}

interface FormValues {
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  universityCard?: string; // Optional field for file upload
}

interface Props {
  session?: any; // Replace `any` with a proper type if possible
  schema: ZodType<FormValues>;
  defaultValues: FormValues;
  onSubmit: (data: FormValues) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}
