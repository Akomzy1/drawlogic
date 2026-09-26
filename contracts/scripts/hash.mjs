// Prints the contract hash of a DDL or audit-record file; with --write, stores it in the file.
// usage: node scripts/hash.mjs [--write] <file>...
import fs from "node:fs";
import { auditHash, ddlHash } from "./jcs.mjs";

const write = process.argv.includes("--write");
for (const file of process.argv.slice(2).filter((a) => a !== "--write")) {
  const doc = JSON.parse(fs.readFileSync(file, "utf8"));
  if (doc.ddl_version) {
    const h = ddlHash(doc);
    if (write) doc.drawing.hash = h;
    console.log(`${file}\tdrawing.hash\t${h}`);
  } else if (doc.chain_id) {
    const h = auditHash(doc);
    if (write) doc.hash = h;
    console.log(`${file}\thash\t${h}`);
  } else {
    console.error(`${file}: not a DDL or audit record`);
    process.exitCode = 1;
    continue;
  }
  if (write) fs.writeFileSync(file, JSON.stringify(doc, null, 2) + "\n");
}
