import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileData } from '../types';

type TaskStatus = 'not-started' | 'in-progress' | 'completed';

interface Task {
  id: string;
  text: string;
  status: TaskStatus;
}

interface Milestone {
  id: string;
  title: string;
  date: string;
  tasks: Task[];
}

interface RoadmapProgress {
  [milestoneId: string]: {
    [taskId: string]: TaskStatus;
  };
}

const getProfileValue = (profile: ProfileData | null, newKey: string, oldKey?: string, defaultValue: any = null): any => {
  if (!profile) return defaultValue;
  
  if (profile[newKey] !== undefined && profile[newKey] !== null) {
    return profile[newKey];
  }
  
  if (oldKey && profile[oldKey] !== undefined && profile[oldKey] !== null) {
    return profile[oldKey];
  }
  
  return defaultValue;
};

const ROADMAP_STORAGE_KEY = 'pathpilot_roadmap_progress';

export const RoadmapPage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [progress, setProgress] = useState<RoadmapProgress>({});

  useEffect(() => {
    const storedProfile = localStorage.getItem('pathpilot_profile');
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile) as ProfileData;
        setProfile(parsedProfile);
        const roadmap = generatePersonalizedRoadmap(parsedProfile);
        setMilestones(roadmap);
        
        const storedProgress = localStorage.getItem(ROADMAP_STORAGE_KEY);
        if (storedProgress) {
          setProgress(JSON.parse(storedProgress));
        }
      } catch (error) {
        console.error('Failed to parse profile:', error);
        const roadmap = generateDefaultRoadmap();
        setMilestones(roadmap);
      }
    } else {
      const roadmap = generateDefaultRoadmap();
      setMilestones(roadmap);
    }
  }, []);

  const cycleTaskStatus = (milestoneId: string, taskId: string) => {
    setProgress((prev) => {
      const currentStatus = prev[milestoneId]?.[taskId] || 'not-started';
      let nextStatus: TaskStatus;
      
      if (currentStatus === 'not-started') {
        nextStatus = 'in-progress';
      } else if (currentStatus === 'in-progress') {
        nextStatus = 'completed';
      } else {
        nextStatus = 'not-started';
      }

      const newProgress = {
        ...prev,
        [milestoneId]: {
          ...(prev[milestoneId] || {}),
          [taskId]: nextStatus,
        },
      };

      localStorage.setItem(ROADMAP_STORAGE_KEY, JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const getTaskStatus = (milestoneId: string, taskId: string): TaskStatus => {
    return progress[milestoneId]?.[taskId] || 'not-started';
  };

  const calculateProgress = () => {
    let totalTasks = 0;
    let completedTasks = 0;

    milestones.forEach((milestone) => {
      milestone.tasks.forEach((task) => {
        totalTasks++;
        if (getTaskStatus(milestone.id, task.id) === 'completed') {
          completedTasks++;
        }
      });
    });

    return {
      completedTasks,
      totalTasks,
      percentage: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    };
  };

  const getNextRecommendedTask = () => {
    for (const milestone of milestones) {
      for (const task of milestone.tasks) {
        const status = getTaskStatus(milestone.id, task.id);
        if (status !== 'completed') {
          return {
            milestoneTitle: milestone.title,
            taskText: task.text,
            taskStatus: status,
          };
        }
      }
    }
    return null;
  };

  const { completedTasks, totalTasks, percentage } = calculateProgress();
  const nextTask = getNextRecommendedTask();

  const generatePersonalizedRoadmap = (profileData: ProfileData | null): Milestone[] => {
    // Keeping business logic as-is
    return generateDefaultRoadmap();
  };

  const generateDefaultRoadmap = (): Milestone[] => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextYear = currentYear + 1;

    return [
      {
        id: 'default-1',
        title: 'Complete High School with Excellence',
        date: `${currentYear} - ${nextYear}`,
        tasks: [
          { id: 'def-1-1', text: 'Maintain strong academic performance in all subjects', status: 'not-started' },
          { id: 'def-1-2', text: 'Participate in extracurricular activities and clubs', status: 'not-started' },
          { id: 'def-1-3', text: 'Develop leadership and teamwork skills', status: 'not-started' },
          { id: 'def-1-4', text: 'Explore different career interests through projects', status: 'not-started' },
          { id: 'def-1-5', text: 'Build a strong foundation in core subjects', status: 'not-started' },
        ],
      },
      {
        id: 'default-2',
        title: 'Career Exploration & Planning',
        date: `${currentYear} - ${nextYear}`,
        tasks: [
          { id: 'def-2-1', text: 'Take career aptitude tests to identify strengths', status: 'not-started' },
          { id: 'def-2-2', text: 'Research different career paths and opportunities', status: 'not-started' },
          { id: 'def-2-3', text: 'Talk to professionals in fields of interest', status: 'not-started' },
          { id: 'def-2-4', text: 'Attend college fairs and information sessions', status: 'not-started' },
          { id: 'def-2-5', text: 'Complete your profile on PathPilot for personalized guidance', status: 'not-started' },
        ],
      },
      {
        id: 'default-3',
        title: 'Entrance Exam Preparation',
        date: `${nextYear}`,
        tasks: [
          { id: 'def-3-1', text: 'Identify required entrance exams for your career path', status: 'not-started' },
          { id: 'def-3-2', text: 'Register for relevant entrance examinations', status: 'not-started' },
          { id: 'def-3-3', text: 'Create study schedule and follow it consistently', status: 'not-started' },
          { id: 'def-3-4', text: 'Take practice tests and mock exams', status: 'not-started' },
          { id: 'def-3-5', text: 'Join coaching or online courses if needed', status: 'not-started' },
        ],
      },
    ];
  };

  const getStatusBadge = (status: TaskStatus) => {
    if (status === 'completed') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          Completed
        </span>
      );
    } else if (status === 'in-progress') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          In Progress
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
          Not Started
        </span>
      );
    }
  };

  const safeMilestones = Array.isArray(milestones) ? milestones : [];
  const careerInterestsRaw = profile ? getProfileValue(profile, 'careerInterests', 'career', []) : [];
  const safeCareerInterests = Array.isArray(careerInterestsRaw) ? careerInterestsRaw : [];
  const firstCareer = safeCareerInterests.length > 0 ? safeCareerInterests[0] : 'success';
  const profileCountry = profile ? getProfileValue(profile, 'preferredCountry', 'country', 'N/A') : 'N/A';
  const allTasksCompleted = totalTasks > 0 && completedTasks === totalTasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Header */}
        <div className="mb-10 animate-fadeInUp">
          <div className="flex items-center gap-5 mb-2">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-5xl shadow-xl">
              🗺️
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">My Roadmap</h1>
              <p className="text-gray-600 text-lg mt-2">Your personalized path to {firstCareer}</p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-10 animate-fadeInUp animation-delay-200">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Overall Progress</h3>
              <div className="text-right">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {percentage}%
                </div>
                <p className="text-sm text-gray-500 mt-1">Complete</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-5 mb-5 shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 h-5 rounded-full transition-all duration-700 shadow-lg"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-base text-gray-600 text-center font-medium">
              <span className="font-bold text-blue-600 text-lg">{completedTasks}</span> of <span className="font-bold text-gray-900 text-lg">{totalTasks}</span> tasks completed
            </p>
          </div>
        </div>

        {/* Next Task */}
        {!allTasksCompleted && nextTask && (
          <div className="mb-10 animate-fadeInUp animation-delay-400">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300/50 rounded-3xl p-8 shadow-lg">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0 text-3xl shadow-lg">
                  📌
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🎯 Next Recommended Task</h3>
                  <p className="text-base text-gray-600 font-semibold mb-2">{nextTask.milestoneTitle}</p>
                  <p className="text-gray-800 mb-4 font-medium text-base">{nextTask.taskText}</p>
                  {getStatusBadge(nextTask.taskStatus)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completion Celebration */}
        {allTasksCompleted && (
          <div className="mb-10 animate-fadeInUp animation-delay-400">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300/50 rounded-3xl p-12 text-center shadow-xl">
              <div className="text-8xl mb-6 animate-bounce">🎉</div>
              <h3 className="text-4xl font-bold text-gray-900 mb-4">Congratulations!</h3>
              <p className="text-gray-700 text-xl max-w-xl mx-auto">
                You've completed your roadmap. Time to set new goals and continue your amazing journey!
              </p>
            </div>
          </div>
        )}

        {/* Profile Info */}
        {profile && (
          <div className="mb-10 animate-fadeInUp animation-delay-600">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-2xl p-6 text-center shadow-sm">
              <p className="text-gray-700 text-base">
                <span className="font-semibold text-blue-700">📍 Pathway:</span> {firstCareer} • 
                <span className="font-semibold text-purple-700 ml-3">🌍 Country:</span> {profileCountry}
              </p>
            </div>
          </div>
        )}

        {/* Milestones */}
        <div className="space-y-8 animate-fadeInUp animation-delay-800">
          {safeMilestones.length > 0 ? (
            safeMilestones.map((milestone, index) => {
              const safeTasks = Array.isArray(milestone.tasks) ? milestone.tasks : [];
              
              return (
                <div
                  key={milestone.id}
                  className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Milestone Header */}
                  <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 border-l-4 border-blue-500 p-8">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white border-2 border-blue-500 flex items-center justify-center text-blue-700 font-bold flex-shrink-0 shadow-sm text-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                        <p className="text-base text-gray-600 font-medium flex items-center gap-2">
                          <span className="text-blue-600 text-xl">📅</span>
                          {milestone.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="p-8 space-y-4">
                    {safeTasks.map((task: Task) => {
                      const taskStatus = getTaskStatus(milestone.id, task.id);
                      return (
                        <div
                          key={task.id}
                          onClick={() => cycleTaskStatus(milestone.id, task.id)}
                          className="flex items-start gap-5 p-6 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-blue-200 group"
                        >
                          <div className="flex-shrink-0 mt-1">
                            {taskStatus === 'completed' && (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-base font-bold shadow-lg">
                                ✓
                              </div>
                            )}
                            {taskStatus === 'in-progress' && (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-base font-bold shadow-lg animate-pulse">
                                ⟳
                              </div>
                            )}
                            {taskStatus === 'not-started' && (
                              <div className="w-8 h-8 rounded-full bg-white border-3 border-gray-400 group-hover:border-blue-500 group-hover:shadow-md transition-all"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-base leading-relaxed mb-3 ${
                              taskStatus === 'completed' 
                                ? 'line-through text-gray-500' 
                                : 'text-gray-800 font-medium'
                            }`}>
                              {task.text}
                            </p>
                            {getStatusBadge(taskStatus)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <div className="text-7xl mb-6 opacity-50">🗺️</div>
              <p className="text-gray-500 text-xl font-semibold">No roadmap available yet</p>
              <p className="text-gray-400 text-base mt-2">Complete your profile to get started</p>
            </div>
          )}
        </div>

        {/* Tip */}
        <div className="mt-12 animate-fadeInUp animation-delay-1000">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-2xl p-6 text-center shadow-sm">
            <p className="text-gray-700 text-base">
              <span className="font-semibold text-blue-700">💡 Pro Tip:</span> Click any task to cycle through its status. 
              Your progress is automatically saved in real-time!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
