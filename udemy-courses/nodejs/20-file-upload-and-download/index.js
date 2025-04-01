// Configuring Multer To Adjust Filename & Filepath
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store in 'uploads' directory
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension); // Add unique suffix to filenames
  },
});

const upload = multer({ storage: storage });

// Download File With Authentication
const authenticate = (req, res, next) => {
  if (!req.user) return res.status(401).send("Unauthorized");
  next();
};

app.get("/download/:filename", authenticate, (req, res) => {
  const filename = req.params.filename;
  res.download(`uploads/${filename}`);
});

// Set File Type Headers
app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  res.setHeader("Content-Type", "application/pdf");
  res.download(`uploads/${filename}`);
});

// Streaming Data
app.get("/stream/:filename", (req, res) => {
  const filename = req.params.filename;
  const fileStream = fs.createReadStream(`uploads/${filename}`);
  fileStream.pipe(res);
});

// Using Pdfkit For .Pdf Generation
const PDFDocument = require("pdfkit");

app.get("/generate-pdf", (req, res) => {
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  doc.pipe(res);

  doc.fontSize(25).text("Hello, world!", 100, 100);
  doc.end();
});
