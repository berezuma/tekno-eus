export function formatNumber(n, decimals = 2) {
  return Number(n).toFixed(decimals).replace('.', ',');
}
