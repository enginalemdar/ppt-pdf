const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(morgan('combined'));

app.post('/convert', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const inputPath = req.file.path;
  const outputName = `${path.parse(req.file.originalname).name}.pdf`;
  const outputPath = path.join('uploads', outputName);

  const unoconv = spawn('unoconv', ['-f', 'pdf', '-o', outputPath, inputPath]);

  unoconv.on('error', (err) => {
    console.error('Conversion error:', err);
    res.status(500).send('Conversion failed.');
  });

  unoconv.on('exit', (code) => {
    if (code !== 0) {
      return res.status(500).send('Conversion failed with code ' + code);
    }
    res.download(outputPath, outputName, (err) => {
      fs.unlink(inputPath, () => {});
      fs.unlink(outputPath, () => {});
      if (err) console.error('Download error:', err);
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
