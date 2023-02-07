const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const hash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

exports.deterministicPartitionKey = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY;

  let candidate = event.partitionKey || JSON.stringify(event);
  candidate = typeof candidate === "string" ? candidate : JSON.stringify(candidate);

  return candidate.length > MAX_PARTITION_KEY_LENGTH ? hash(candidate) : candidate;
};
