const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export function formatMoney(value: number): string {
  return formatter.format(value);
}
