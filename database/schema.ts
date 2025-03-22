import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"; // Adjust based on your ORM
import { z } from "zod";

// Define the examinations schema
export const examinations = pgTable("examinations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
});

// Define the books schema
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  publishedDate: timestamp("published_date").notNull(),
});

// Define the users schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // Added password field
});

// Define the borrowRecords schema
export const borrowRecords = pgTable("borrow_records", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").notNull(),
  bookId: serial("book_id").notNull(),
  borrowDate: timestamp("borrow_date").notNull(),
  returnDate: timestamp("return_date"),
});

// Zod schemas for validation
export const ExaminationSchema = z.object({
  title: z.string().min(1),
  date: z.string(), // Consider using a date type if applicable
  time: z.string(), // Consider using a time type if applicable
});

export const BookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  publishedDate: z.string(), // Consider using a date type if applicable
});

export const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const BorrowRecordSchema = z.object({
  userId: z.number(),
  bookId: z.number(),
  borrowDate: z.string(), // Consider using a date type if applicable
  returnDate: z.string().nullable(),
});

// Export the schemas for use in the database operations
export type Examination = z.infer<typeof ExaminationSchema>;
export type Book = z.infer<typeof BookSchema>;
export type User = z.infer<typeof UserSchema>;
export type BorrowRecord = z.infer<typeof BorrowRecordSchema>;
