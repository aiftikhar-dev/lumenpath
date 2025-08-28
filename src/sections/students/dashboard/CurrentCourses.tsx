import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Play } from "lucide-react";
import { useState } from "react";
import CoursePreview from "./CoursePreview";

interface Course {
  id: number;
  title: string;
  progress: number;
  nextLesson: string;
  timeRemaining: string;
  difficulty: string;
  instructor: string;
  modules?: any[];
}

const CurrentCourses = ({ currentCourses }: { currentCourses: Course[] }) => {
 

  const [showCourseRecommendations, setShowCourseRecommendations] =
    useState(false);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  const handleStartCourse = (courseId: string | number) => {
    console.log("Starting course:", courseId);
    setShowCourseRecommendations(false);

    // Find the course by ID and set it as active
    const course = currentCourses.find(
      (c) => c.id.toString() === courseId.toString()
    );
    if (course) {
      setActiveCourse(course);
    }
  };
  if (activeCourse) {
    return (
      <CoursePreview
        course={activeCourse}
        onClose={() => setActiveCourse(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentCourses.map((course) => (
          <Card
            key={course.id}
            className="hover:shadow-lg transition-shadow flex flex-col min-h-[320px]"
          >
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center justify-between">
                {course.title}
                <Badge variant="secondary">{course.difficulty}</Badge>
              </CardTitle>
              <CardDescription>by {course.instructor}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col space-y-4">
              <div className="flex-shrink-0">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>

              <div className="space-y-2 flex-shrink-0">
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                  {course.timeRemaining} remaining
                </div>
                <div className="flex items-center text-sm">
                  <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                  Next: {course.nextLesson}
                </div>
              </div>

              <div className="mt-auto pt-4">
                <Button
                  variant="ai"
                  className="w-full"
                  onClick={() => handleStartCourse(course.id)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Continue Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="border-dashed border-2 flex items-center justify-center min-h-[320px]">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-ai-primary/10 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6 text-ai-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Discover New Courses</h3>
              <p className="text-sm text-muted-foreground">
                Explore AI-recommended courses based on your goals
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowCourseRecommendations(true)}
            >
              Browse Catalog
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CurrentCourses;
