import { parse } from "csv-parse/sync";

export type ResidentCsvRow = {
  full_name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  mobile: string;
};

const REQUIRED_COLUMNS = ["full_name", "address_line1", "zip", "email", "mobile"];

/** Parses and lightly validates a resident CSV. Never trust client-side
 * parsing for this table — this always runs server-side. */
export function parseResidentCsv(csvText: string): { rows: ResidentCsvRow[]; errors: string[] } {
  const errors: string[] = [];
  let records: Record<string, string>[];

  try {
    records = parse(csvText, { columns: true, skip_empty_lines: true, trim: true });
  } catch (err) {
    return { rows: [], errors: [`Couldn't parse the file: ${err instanceof Error ? err.message : "unknown error"}`] };
  }

  if (records.length === 0) {
    return { rows: [], errors: ["The file has no data rows."] };
  }

  const columns = Object.keys(records[0]);
  const missing = REQUIRED_COLUMNS.filter((c) => !columns.includes(c));
  if (missing.length > 0) {
    return { rows: [], errors: [`Missing required column(s): ${missing.join(", ")}`] };
  }

  const rows: ResidentCsvRow[] = [];
  records.forEach((record, i) => {
    if (!record.full_name || !record.address_line1 || !record.zip || !record.email || !record.mobile) {
      errors.push(`Row ${i + 2}: missing a required field, skipped.`);
      return;
    }
    rows.push({
      full_name: record.full_name,
      address_line1: record.address_line1,
      address_line2: record.address_line2 ?? "",
      city: record.city || "Dallas",
      state: record.state || "TX",
      zip: record.zip,
      email: record.email,
      mobile: record.mobile,
    });
  });

  return { rows, errors };
}
