import { cats, adoptionInquiries, type Cat, type InsertCat, type AdoptionInquiry, type InsertAdoptionInquiry, users, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Cat methods
  getAllCats(): Promise<Cat[]>;
  getAvailableCats(): Promise<Cat[]>;
  getCat(id: number): Promise<Cat | undefined>;
  createCat(cat: InsertCat): Promise<Cat>;
  
  // Adoption inquiry methods
  createAdoptionInquiry(inquiry: InsertAdoptionInquiry): Promise<AdoptionInquiry>;
  getAllAdoptionInquiries(): Promise<AdoptionInquiry[]>;
  
  // User methods (existing)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private cats: Map<number, Cat>;
  private adoptionInquiries: Map<number, AdoptionInquiry>;
  private users: Map<number, User>;
  private currentCatId: number;
  private currentInquiryId: number;
  private currentUserId: number;

  constructor() {
    this.cats = new Map();
    this.adoptionInquiries = new Map();
    this.users = new Map();
    this.currentCatId = 1;
    this.currentInquiryId = 1;
    this.currentUserId = 1;
    
    // Initialize with some sample cats
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleCats: InsertCat[] = [
      {
        name: "Milo",
        breed: "Orange Tabby",
        age: "6 months old",
        description: "A playful and energetic kitten who loves to chase toys and explore. Milo is great with children and other pets.",
        imageUrl: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isAvailable: true,
      },
      {
        name: "Luna",
        breed: "Domestic Shorthair",
        age: "2 years old",
        description: "A gentle and affectionate cat who enjoys quiet moments and gentle pets. Luna is perfect for a calm household.",
        imageUrl: "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isAvailable: true,
      },
      {
        name: "Whiskers",
        breed: "Persian Mix",
        age: "4 years old",
        description: "A regal and calm cat with beautiful long fur. Whiskers enjoys lounging in sunny spots and gentle brushing.",
        imageUrl: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isAvailable: true,
      },
      {
        name: "Patches",
        breed: "Calico",
        age: "3 years old",
        description: "A friendly and social cat with beautiful markings. Patches loves attention and is great with families.",
        imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isAvailable: true,
      },
    ];

    sampleCats.forEach(cat => {
      const id = this.currentCatId++;
      const newCat: Cat = { ...cat, id, isAvailable: cat.isAvailable ?? true };
      this.cats.set(id, newCat);
    });
  }

  async getAllCats(): Promise<Cat[]> {
    return Array.from(this.cats.values());
  }

  async getAvailableCats(): Promise<Cat[]> {
    return Array.from(this.cats.values()).filter(cat => cat.isAvailable);
  }

  async getCat(id: number): Promise<Cat | undefined> {
    return this.cats.get(id);
  }

  async createCat(insertCat: InsertCat): Promise<Cat> {
    const id = this.currentCatId++;
    const cat: Cat = { ...insertCat, id, isAvailable: insertCat.isAvailable ?? true };
    this.cats.set(id, cat);
    return cat;
  }

  async createAdoptionInquiry(insertInquiry: InsertAdoptionInquiry): Promise<AdoptionInquiry> {
    const id = this.currentInquiryId++;
    const inquiry: AdoptionInquiry = { 
      ...insertInquiry, 
      id, 
      interestedCatId: insertInquiry.interestedCatId ?? null,
      createdAt: new Date() 
    };
    this.adoptionInquiries.set(id, inquiry);
    return inquiry;
  }

  async getAllAdoptionInquiries(): Promise<AdoptionInquiry[]> {
    return Array.from(this.adoptionInquiries.values());
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllCats(): Promise<Cat[]> {
    return await db.select().from(cats);
  }

  async getAvailableCats(): Promise<Cat[]> {
    return await db.select().from(cats).where(eq(cats.isAvailable, true));
  }

  async getCat(id: number): Promise<Cat | undefined> {
    const [cat] = await db.select().from(cats).where(eq(cats.id, id));
    return cat || undefined;
  }

  async createCat(insertCat: InsertCat): Promise<Cat> {
    const [cat] = await db
      .insert(cats)
      .values(insertCat)
      .returning();
    return cat;
  }

  async createAdoptionInquiry(insertInquiry: InsertAdoptionInquiry): Promise<AdoptionInquiry> {
    const [inquiry] = await db
      .insert(adoptionInquiries)
      .values(insertInquiry)
      .returning();
    return inquiry;
  }

  async getAllAdoptionInquiries(): Promise<AdoptionInquiry[]> {
    return await db.select().from(adoptionInquiries);
  }
}

export const storage = new DatabaseStorage();
