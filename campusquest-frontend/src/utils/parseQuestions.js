export function parseQuestionsFromText(text) {
  const lines = text.split("\n").map(line => line.trim()).filter(line => line !== "");
  const questions = [];

  for (let i = 0; i < lines.length; i += 6) {
    const question = lines[i];
    const options = [];

    for (let j = 1; j <= 4; j++) {
      const line = lines[i + j];
      const label = line?.[0]; // a, b, c, d
      const text = line?.slice(3)?.trim(); // ✅ skip "a. " (3 chars)
      if (label && text) {
        options.push({ label, text });
      }
    }

    const answerLine = lines[i + 5]?.trim();
    const answer = answerLine?.split(":")[1]?.trim()?.toLowerCase(); // accepts "Answer: b"

    if (question && options.length === 4 && answer) {
      questions.push({ question, options, answer });
    }
  }

  return questions;
}
