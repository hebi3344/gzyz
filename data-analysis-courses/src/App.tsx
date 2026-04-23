import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import courses from './data/courses';
import CourseDetail from './components/CourseDetail';

function App() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {!selectedCourse ? (
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold text-center mb-12">数据分析课程平台</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setSelectedCourse(course.id)}
                    className="w-full"
                  >
                    查看课程
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <CourseDetail 
          course={courses.find(c => c.id === selectedCourse)!} 
          onBack={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}

export default App;