const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/ticket");
const screenRoutes = require("./routes/screens");
const webhookRoutes = require("./routes/webhook");
const { verifyJWT } = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tickets", verifyJWT, ticketRoutes);
app.use("/api/me", verifyJWT, screenRoutes);
app.use("/webhook", webhookRoutes);

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((err) => console.error(err));
