/**
 * lib/csv.js
 * RFC 4180 compliant CSV export generator.
 *
 * Rules:
 * 1. Fields containing commas, quotation marks, or line breaks must be enclosed in double quotes.
 * 2. Quotation marks appearing inside a field must be escaped by prefixing them with another quotation mark (" -> "").
 */

export function escapeCsvField(val) {
  if (val === null || val === undefined) return "";
  const str = String(val);
  // Check if field contains awkward values: comma, quotation mark, or newlines
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function ordersToCsv(orders = []) {
  const headers = [
    "Order ID",
    "Customer Name",
    "Phone",
    "Delivery Address",
    "Payment Method",
    "Items Summary",
    "Total (ETB)",
    "Status",
    "Created At",
  ];

  const rows = orders.map((order) => {
    const itemsSummary = (order.items || [])
      .map((it) => `${it.quantity}x ${it.name}`)
      .join("; ");

    return [
      escapeCsvField(order.id),
      escapeCsvField(order.name),
      escapeCsvField(order.phone),
      escapeCsvField(order.address),
      escapeCsvField(order.paymentMethod),
      escapeCsvField(itemsSummary),
      escapeCsvField(order.total),
      escapeCsvField(order.status),
      escapeCsvField(order.createdAt),
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\r\n");
}
