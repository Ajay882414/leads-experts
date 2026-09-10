const XLSX = require("xlsx");

const parseFile = (buffer) => {
  if (!buffer) {
    throw new Error("File buffer is required");
  }

  const workbook = XLSX.read(buffer, {
    type: "buffer",
    cellDates: true,
  });

  if (!workbook.SheetNames.length) {
    throw new Error("CSV file does not contain any sheet");
  }

  const sheetName = workbook.SheetNames[0];

  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error("Unable to read CSV sheet");
  }

  const rows = XLSX.utils.sheet_to_json(sheet, {
    defval: "",
    raw: false,
  });

  return rows;
};

module.exports = parseFile;