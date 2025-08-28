import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Star } from "lucide-react";
import { RecommendedCourse } from "@/types/student/ai-educational-counselor";

interface RecommendedCoursesProps {
  courses: RecommendedCourse[];
}

const RecommendedCourses = ({ courses }: RecommendedCoursesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-ai-accent" />
          Recommended Courses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {courses.map((course, index) => (
          <div key={index} className="p-3 border rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-sm">{course.title}</h4>
              <Badge variant="outline" className="text-xs">
                {course.relevance}
              </Badge>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  {course.rating}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>{course.difficulty}</span>
                <span>{course.students} students</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecommendedCourses;
