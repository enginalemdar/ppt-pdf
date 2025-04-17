# PPT to PDF Service

## Overview
Dockerized Node.js service to convert PPT/PPTX files to PDF using LibreOffice's unoconv.

## Endpoints
- **POST /convert**: Accepts multipart/form-data with `file` field (PPT or PPTX), returns PDF.

## Usage
```bash
docker build -t ppt-to-pdf-service .
docker run -p 3000:3000 ppt-to-pdf-service
