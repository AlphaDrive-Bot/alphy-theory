// גרסה בסיסית – מדמה תשובה של GPT בעברית
export async function askOpenAI(prompt) {
  const fakePositive = "מעולה! תשובה נכונה. נמשיך לשאלה הבאה.";
  const fakeNegative = "נראה שטעית. בוא נלמד את זה שוב ונתרגל עוד.";
  return prompt.includes('טעה') ? fakeNegative : fakePositive;
}
