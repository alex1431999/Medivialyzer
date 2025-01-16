export function singularize(word: string): string {
  const irregularPlurals: Record<string, string> = {
    Onyxes: 'Onyx',
  }

  // Check for irregular plurals
  if (irregularPlurals[word.toLowerCase()]) {
    return irregularPlurals[word.toLowerCase()]
  }

  // Regular pluralization rules
  const rules: { regex: RegExp; replacement: string }[] = [
    { regex: /ves$/, replacement: 'fe' }, // e.g., "leaves" -> "leaf"
    { regex: /ies$/, replacement: 'y' }, // e.g., "parties" -> "party"
    { regex: /oes$/, replacement: 'o' }, // e.g., "heroes" -> "hero"
    { regex: /i$/, replacement: 'us' }, // e.g., "cacti" -> "cactus"
    { regex: /zes$/, replacement: 'ze' }, // e.g., "buzzes" -> "buzz"
    { regex: /ses$/, replacement: 's' }, // e.g., "buses" -> "bus"
    { regex: /xes$/, replacement: 'x' }, // e.g., "boxes" -> "box"
    { regex: /es$/, replacement: 'e' }, // e.g., "arches" -> "arch"
    { regex: /s$/, replacement: '' }, // e.g., "cats" -> "cat"
  ]

  // Apply rules
  for (const rule of rules) {
    if (rule.regex.test(word)) {
      return word.replace(rule.regex, rule.replacement)
    }
  }

  // Return the word as is if no rules match
  return word
}
