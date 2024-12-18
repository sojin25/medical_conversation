export const analyzeMessage = (
  message: string,
  goodQuestions: string[]
): boolean => {
  return goodQuestions.some(question => 
    message.toLowerCase().includes(question.toLowerCase())
  );
};