export function formatUah(value: number) {
  return new Intl.NumberFormat("uk-UA").format(value) + " ₴";
}

export function safeJsonArray(input: string): string[] {
  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) return parsed.map(String);
    return [];
  } catch {
    return [];
  }
}
