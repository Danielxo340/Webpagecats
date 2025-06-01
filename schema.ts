import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cats = pgTable("cats", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  breed: text("breed").notNull(),
  age: text("age").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
});

export const adoptionInquiries = pgTable("adoption_inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  interestedCatId: integer("interested_cat_id"),
  livingSituation: text("living_situation").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCatSchema = createInsertSchema(cats).omit({
  id: true,
});

export const insertAdoptionInquirySchema = createInsertSchema(adoptionInquiries).omit({
  id: true,
  createdAt: true,
});

export type InsertCat = z.infer<typeof insertCatSchema>;
export type Cat = typeof cats.$inferSelect;
export type InsertAdoptionInquiry = z.infer<typeof insertAdoptionInquirySchema>;
export type AdoptionInquiry = typeof adoptionInquiries.$inferSelect;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
