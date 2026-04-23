export const gradeCode = async (code: string, testCases: Array<{ input: string; expectedOutput: string }>): Promise<{ success: boolean; score: number; feedback: string[]; correct: boolean; error?: string }> => {
  try {
    const response = await fetch('/api/grade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, testCases }),
    });

    if (!response.ok) {
      throw new Error('Failed to connect to server');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error grading code:', error);
    return {
      success: false,
      score: 0,
      feedback: ['Error connecting to server'],
      correct: false,
      error: 'Error connecting to server',
    };
  }
};