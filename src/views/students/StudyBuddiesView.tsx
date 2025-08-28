import { BuddyFinder } from "@/components/BuddyFinder";
import QuickActions from "@/components/QuickActions";
import QuickStats from "@/components/QuickStats";
import WelcomeBanner from "@/components/WelcomeBanner";
import CurrentStudyBuddies from "@/sections/students/studyBuddies/CurrentStudyBuddies";
import FindNewStudyBuddies from "@/sections/students/studyBuddies/FindNewStudyBuddies";
import { useState } from "react";

const StudyBuddiesView = () => {
  const [learningStats] = useState({
    currentModule: "Neural Networks",
    overallProgress: 67,
    learningEfficiency: "Optimal",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showBuddyFinder, setShowBuddyFinder] = useState(false);
  const [studyBuddies] = useState([
    {
      id: 1,
      name: "Amina Al-Zahra",
      course: "Machine Learning",
      avatar: "/avatars/amina.jpg",
      status: "online" as const,
      skills: ["Python", "ML", "Statistics"],
      lastActive: "2 minutes ago",
      progress: 80,
    },
    {
      id: 2,
      name: "Carlos Rodriguez",
      course: "Data Science",
      avatar: "/avatars/carlos.jpg",
      status: "offline" as const,
      skills: ["R", "SQL", "Data Visualization"],
      lastActive: "1 hour ago",
      progress: 70,
    },
    
  ]);

  const [pendingRequests] = useState([
    {
      id: 1,
      name: "David Kim",
      course: "Deep Learning",
      message:
        "Hi! I'm also studying deep learning and would love to form a study group.",
      avatar: "/avatars/david.jpg",
      skills: ["Python", "PyTorch", "Neural Networks"],
    },
  ]);

  const filteredBuddies = studyBuddies.filter((buddy) => {
    const matchesSearch =
      buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buddy.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buddy.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "online" && buddy.status === "online") ||
      (selectedFilter === "offline" && buddy.status === "offline");

    return matchesSearch && matchesFilter;
  });

  const handleAddBuddy = (buddy: any) => {
    console.log("Adding new buddy:", buddy);
    setShowBuddyFinder(false);
  };

  const handleAcceptRequest = (requestId: number) => {
    console.log("Accepting request:", requestId);
  };

  const handleDeclineRequest = (requestId: number) => {
    console.log("Declining request:", requestId);
  };

  const handleRescheduleSession = (sessionId: number) => {
    console.log("Rescheduling session:", sessionId);
  };

  const handleJoinSession = (sessionId: number) => {
    console.log("Joining session:", sessionId);
  };

  const handleScheduleNew = () => {
    console.log("Scheduling new session");
  };

  return (
    <div className="space-y-6">
      <WelcomeBanner
        userName="Ahmad"
        currentGoal="AI Researcher"
        overallProgress={34}
      />
      <QuickStats
        variant="adaptive"
        data={{
          currentModule: learningStats.currentModule,
          overallProgress: learningStats.overallProgress,
          learningEfficiency: learningStats.learningEfficiency,
        }}
      />

      <QuickActions currentCourses={[]} setActiveCourse={() => {}} />

      <FindNewStudyBuddies
        onClickFindBuddies={() => setShowBuddyFinder(true)}
      />

      {/* Current Study Buddies */}
      <CurrentStudyBuddies
        studyBuddies={studyBuddies}
      />


      {/* Buddy Finder Modal */}
      {showBuddyFinder && (
        <BuddyFinder
          onClose={() => setShowBuddyFinder(false)}
          onAddBuddy={handleAddBuddy}
        />
      )}
    </div>
  );
};

export default StudyBuddiesView;
