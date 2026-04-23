export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  examples: Example[];
  exercises: Exercise[];
}

export interface Example {
  id: string;
  title: string;
  content: string;
  code?: string;
  output?: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  codeTemplate: string;
  testCases: TestCase[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface Submission {
  id: string;
  exerciseId: string;
  code: string;
  status: 'pending' | 'success' | 'error';
  errorMessage?: string;
  score: number;
  timestamp: number;
}