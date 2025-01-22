const express = require('express');
const connectDatabase = require('./database/db.js');
const talentRoutes = require('./routes/talentRoutes.js');
const dotenv = require('dotenv')
const path = require('path');
const cors = require('cors');


dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files locally

connectDatabase(process.env.MONGO_URL);
app.use(cors({
  origin: [
    'http://localhost:5173',  // Frontend
    'http://localhost:5174'   // Admin Panel
  ],
  credentials: true
}));

app.use('/api/talent', talentRoutes);


app.get("/",(req,res)=>{
  res.send("Welcome to Talent API")
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
