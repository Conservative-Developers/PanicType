export const typingTexts: string[] = [
  "The quick brown fox jumps over the lazy dog. This classic pangram has been used by typists and designers for decades. It tests every letter in the English alphabet at least once, making it one of the most well-known sentences in the world.",

  "Programming is the art of telling a computer what to do. Every line of code is a carefully crafted instruction. Through logic and creativity, developers build software that powers the modern world, from simple websites to complex artificial intelligence systems.",

  "In the depth of winter, I finally learned that within me there lay an invincible summer. Sometimes the things that challenge us the most reveal our greatest strengths. Every obstacle is an opportunity in disguise, waiting for us to discover it.",

  "Technology continues to evolve at an unprecedented pace. What seemed like science fiction a decade ago is now everyday reality. From smartphones to cloud computing, the digital revolution has transformed how we live, work, and communicate with each other.",

  "The ocean stretches endlessly before me, its waves crashing against the shore in a rhythmic dance as old as time itself. Seagulls circle overhead, their cries mixing with the sound of the surf. The salty breeze carries the promise of adventure.",

  "A well-designed keyboard is a gateway to productivity. Each key press should feel satisfying and precise. Mechanical switches, ergonomic layouts, and customizable keycaps all contribute to the perfect typing experience that every enthusiast dreams about.",

  "Coffee is more than just a beverage. It is a ritual, a moment of peace before the chaos of the day begins. The aroma of freshly ground beans fills the kitchen as hot water transforms them into liquid gold. Each sip brings warmth and focus.",

  "The history of computing spans centuries, from ancient abacuses to modern quantum processors. Each breakthrough built upon the last, creating an ever-accelerating cycle of innovation. Today, a single smartphone holds more power than early room-sized computers.",

  "Music has the remarkable ability to transport us through time and space. A familiar melody can unlock forgotten memories, evoke powerful emotions, and connect strangers in shared experience. It is the universal language that transcends all barriers.",

  "Learning to type quickly is a valuable skill in the digital age. It requires practice, patience, and persistence. Start with proper finger placement on the home row. Focus on accuracy first, and speed will follow naturally over time with consistent practice.",

  "The night sky has inspired humanity since the dawn of civilization. Ancient peoples mapped the stars, creating stories and navigating vast oceans by their light. Today, we continue to look upward with wonder, searching for answers among the cosmos.",

  "Great software is built one line at a time. Each function, variable, and comment serves a purpose. Clean code reads like a well-written book, telling a story that other developers can follow and extend. Quality code is a gift to the future."
];

export function getRandomText(): string {
  const index = Math.floor(Math.random() * typingTexts.length);
  return typingTexts[index];
}
