export const runCode = async (code: string): Promise<{ success: boolean; output: string; error: string }> => {
  try {
    const response = await fetch('/api/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Failed to connect to server');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error running code:', error);
    return {
      success: false,
      output: '',
      error: 'Error connecting to server',
    };
  }
};