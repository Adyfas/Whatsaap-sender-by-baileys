const express = require("express");
const cors = require("cors");
const makeWASocket = require("@whiskeysockets/baileys").default;
const {
  useMultiFileAuthState,
  DisconnectReason,
} = require("@whiskeysockets/baileys");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { isUtf8 } = require("buffer");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3330;
const corseOpt = {
  origin: "https://yetimsnack.com",
  origin: "http://localhost:3000",
  origin: "http://localhost:5173",
};

const APIKEY = "abdcefg";

const middapikey = (req, res, next) => {
  const userAPIKey = req.headers["abcd"] || req.get("abc");
  if (userAPIKey !== APIKEY) {
    return res.status(403).json({ error: "Unauthorized - Invalid API Key" });
  }

  next();
};

app.use(express.json());
app.use(cors());
// app.use(cors(corseOpt));
let sockInstance;

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    console.log("Connection Update:", update);

    if (connection === "open") {
      console.log("✅ Bot terhubung ke WhatsApp!");
    } else if (connection === "close") {
      console.log("⚠️ Koneksi terputus...");

      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !==
        DisconnectReason.loggedOut;

      if (shouldReconnect) {
        console.log("🔄 Mencoba reconnect dalam 5 detik...");
        setTimeout(() => {
          startBot().catch((err) => console.error("Error reconnecting:", err));
        }, 5000);
      } else {
        console.log("❌ Sesi tidak valid atau logout. Menghapus sesi...");
        fs.rmSync("./session", { recursive: true, force: true });
      }
    }
  });

  sock.ev.on("messages.upsert", (m) => {
    console.log("Pesan masuk:", JSON.stringify(m, null, 2));
  });

  sockInstance = sock;
  return sock;
}

startBot().catch((err) => {
  console.error("Error saat memulai bot:", err);
});

app.post("/message", async (req, res) => {
  try {
    const { wa } = req.body;
    if (!sockInstance) {
      return res.status(500).json({ error: "Bot tidak terhubung ke WhatsApp" });
    }
    const number = `${wa}@s.whatsapp.net`;
    const pesan = `Hallo gessss`;

    await sockInstance.sendMessage(number, { text: pesan }); // pesan disini......

    res.status(200).json({ message: "Pesan WhatsApp terkirim." });
  } catch (error) {
    console.error("❌ Error saat mengirim pesan:", error);
    res.status(500).json({
      error: "Gagal mengirim pesan WhatsApp.",
      detail: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
