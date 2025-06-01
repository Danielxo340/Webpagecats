import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAdoptionInquirySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all available cats
  app.get("/api/cats", async (req, res) => {
    try {
      const cats = await storage.getAvailableCats();
      res.json(cats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cats" });
    }
  });

  // Get a specific cat by ID
  app.get("/api/cats/:id", async (req, res) => {
    try {
      const catId = parseInt(req.params.id);
      if (isNaN(catId)) {
        return res.status(400).json({ message: "Invalid cat ID" });
      }

      const cat = await storage.getCat(catId);
      if (!cat) {
        return res.status(404).json({ message: "Cat not found" });
      }

      res.json(cat);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cat" });
    }
  });

  // Submit adoption inquiry
  app.post("/api/adoption-inquiries", async (req, res) => {
    try {
      const validatedData = insertAdoptionInquirySchema.parse(req.body);
      const inquiry = await storage.createAdoptionInquiry(validatedData);
      res.status(201).json({ 
        message: "Adoption inquiry submitted successfully",
        inquiry 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to submit adoption inquiry" });
    }
  });

  // Get all adoption inquiries (for admin use)
  app.get("/api/adoption-inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllAdoptionInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch adoption inquiries" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
