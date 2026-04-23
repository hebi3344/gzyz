import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import type { Course } from '../types';
import ExerciseEditor from './ExerciseEditor';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack }) => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  return (
    <div className="container mx-auto py-8 px-4">
      <Button onClick={onBack} className="mb-6">
        返回课程列表
      </Button>
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-muted-foreground mb-6">{course.description}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <span className="text-sm font-medium">章节数: </span>
                <span className="ml-2">{course.chapters.length}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">例题数: </span>
                <span className="ml-2">{course.chapters.reduce((sum, chapter) => sum + chapter.examples.length, 0)}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">练习题数: </span>
                <span className="ml-2">{course.chapters.reduce((sum, chapter) => sum + chapter.exercises.length, 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">课程章节</h2>
        <Accordion type="single" collapsible className="w-full">
          {course.chapters.map((chapter) => (
            <AccordionItem key={chapter.id} value={chapter.id}>
              <AccordionTrigger>{chapter.title}</AccordionTrigger>
              <AccordionContent>
                <div className="prose max-w-none mb-4">
                  <p>{chapter.content}</p>
                </div>
                
                {chapter.examples.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">例题</h3>
                    {chapter.examples.map((example) => (
                      <Card key={example.id} className="mb-3">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">{example.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-3">{example.content}</p>
                          {example.code && (
                            <div className="mb-3">
                              <pre className="bg-muted p-3 rounded-md overflow-x-auto">
                                <code>{example.code}</code>
                              </pre>
                            </div>
                          )}
                          {example.output && (
                            <div>
                              <p className="font-medium mb-1">输出:</p>
                              <pre className="bg-muted p-3 rounded-md">{example.output}</pre>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                
                {chapter.exercises.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">练习题</h3>
                    {chapter.exercises.map((exercise) => (
                      <Card key={exercise.id} className="mb-3">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-md">{exercise.title}</CardTitle>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              exercise.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                              exercise.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {exercise.difficulty === 'easy' ? '简单' :
                               exercise.difficulty === 'medium' ? '中等' :
                               '困难'}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-3">{exercise.description}</p>
                          <div className="mb-3">
                            <pre className="bg-muted p-3 rounded-md overflow-x-auto">
                              <code>{exercise.codeTemplate}</code>
                            </pre>
                          </div>
                          <Button 
                            onClick={() => setSelectedExercise(exercise.id)}
                            className="w-full"
                          >
                            开始练习
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {selectedExercise && (
        <ExerciseEditor 
          exercise={course.chapters
            .flatMap(chapter => chapter.exercises)
            .find(ex => ex.id === selectedExercise)!}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
};

export default CourseDetail;