import express, { json } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(json());

// Sample headlines
const seoHeadlines = [
  "Why Cake & Co is Mumbai's Sweetest Spot in 2025",
  "Discover Delicious Delights at Cake & Co in Mumbai",
  "Mumbai’s Top Dessert Destination: Cake & Co",
  "The Secret to Mumbai’s Best Cakes: Cake & Co"
];

// POST /business-data
app.post("/business-data", (req, res) => {
  const { name, location } = req.body;

  // You can optionally log the input for debugging
  console.log("Received business data:", name, location);

  res.json({
    rating: 4.3,
    reviews: 127,
    headline: seoHeadlines[0] // static or random
  });
});

// GET /regenerate-headline
app.get("/regenerate-headline", (req, res) => {
  const { name, location } = req.query;

  const randomIndex = Math.floor(Math.random() * seoHeadlines.length);
  const headline = seoHeadlines[randomIndex];

  // Log regeneration for debugging
  console.log(`Regenerating headline for ${name}, ${location}`);

  res.json({ headline });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
