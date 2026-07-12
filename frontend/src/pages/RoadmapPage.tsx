import React, { useEffect, useState } from 'react';
import type { ProfileData } from '../types';
import { getProfile } from '../utils/profileStorage';
import { getUserStorageKey } from '../utils/authSession';
import { getAchievements } from '../utils/achievementsStorage';

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

const getProfileValue = (profile: ProfileData | null, newKey: keyof ProfileData, oldKey?: keyof ProfileData, defaultValue: any = null): any => {
  if (!profile) return defaultValue;
  
  if (profile[newKey] !== undefined && profile[newKey] !== null) {
    return profile[newKey];
  }
  
  if (oldKey && profile[oldKey] !== undefined && profile[oldKey] !== null) {
    return profile[oldKey];
  }
  
  return defaultValue;
};

export const RoadmapPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [progress, setProgress] = useState<RoadmapProgress>({});

  useEffect(() => {
    const parsedProfile = getProfile();
    if (parsedProfile) {
      try {
        setProfile(parsedProfile);
        const roadmap = generatePersonalizedRoadmap(parsedProfile);
        setMilestones(roadmap);
        
        const progressKey = getUserStorageKey('roadmap_progress');
        const storedProgress = progressKey ? localStorage.getItem(progressKey) : null;
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

      const progressKey = getUserStorageKey('roadmap_progress');
      if (progressKey) localStorage.setItem(progressKey, JSON.stringify(newProgress));
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

  const generatePersonalizedRoadmap = (profileData: ProfileData): Milestone[] => {
    const stream = (profileData.stream || 'Other').toLowerCase();
    const grade = profileData.grade || profileData.gradeClass || 'Current grade';
    const favouriteSubjects = profileData.favouriteSubjects || [];
    const weakSubjects = profileData.weakSubjects || [];
    const careerInterests = profileData.careerInterests || [];
    const primaryCareer = careerInterests[0] || `${profileData.stream} career`;
    const dreamUniversity = profileData.dreamUniversity || 'your shortlisted universities';
    const destination = profileData.studyAbroad
      ? profileData.preferredCountry || 'your preferred study-abroad destination'
      : 'India';
    const lowBudget = profileData.budget === 'LOW' || profileData.budget === 'MEDIUM';
    const achievements = getAchievements();
    const achievementCategories = new Set(achievements.map((achievement) => achievement.category));
    const achievementSuggestion = achievementCategories.has('Research')
      ? 'Develop your existing research work into a polished report or presentation'
      : achievementCategories.has('Projects') || achievementCategories.has('Hackathons')
        ? 'Improve your strongest existing project and document measurable outcomes'
        : achievementCategories.has('Leadership') || achievementCategories.has('Volunteering')
          ? 'Connect your leadership or service experience to your intended course'
          : 'Ask a teacher or mentor to review your work and suggest improvements';

    const plans: Record<string, {
      courses: string[];
      exams: string[];
      skills: string[];
      projects: string[];
      application: string;
    }> = {
      engineering: {
        courses: ['Strengthen Mathematics and Physics fundamentals', 'Complete an introductory programming course', 'Practice problem solving and quantitative reasoning'],
        exams: ['JEE Main', 'JEE Advanced'],
        skills: ['Coding', 'Logical problem solving', 'Engineering design'],
        projects: ['Build one coding or engineering project', 'Document the project on a portfolio or GitHub', 'Join a science, robotics, or coding challenge'],
        application: 'Prepare for JoSAA counselling and engineering applications',
      },
      medical: {
        courses: ['Master NCERT Biology', 'Revise Chemistry concepts and reactions', 'Practice Physics numericals for medical entrances'],
        exams: ['NEET'],
        skills: ['Biology recall', 'Clinical reasoning foundations', 'Time-managed question solving'],
        projects: ['Complete a biology research or health-awareness project', 'Explore medical careers through verified talks or shadowing where permitted', 'Maintain a Biology mistake and revision journal'],
        application: 'Prepare for medical counselling and AIIMS or other medical-college choices',
      },
      commerce: {
        courses: ['Strengthen Accountancy and Economics', 'Complete an Excel or financial-analysis course', 'Study business communication and statistics'],
        exams: ['CUET', 'CA Foundation'],
        skills: ['Accounting', 'Financial analysis', 'Business communication'],
        projects: ['Analyse a company or small-business case', 'Build a basic budget or financial model', 'Pursue a commerce, finance, or accounting internship'],
        application: 'Prepare BCom, BBA, CA, CFA-foundation, or related applications',
      },
      law: {
        courses: ['Build legal reasoning and reading comprehension', 'Study current affairs and constitutional basics', 'Practice structured writing and argumentation'],
        exams: ['CLAT', 'AILET'],
        skills: ['Legal reading', 'Critical reasoning', 'Clear written argument'],
        projects: ['Maintain a current-affairs and case-reading journal', 'Join debate, Model UN, or a legal-awareness activity', 'Complete a legal research or policy writing sample'],
        application: 'Prepare NLU preferences, counselling, and law-school applications',
      },
      design: {
        courses: ['Practice observation drawing and visual communication', 'Learn design fundamentals and creative problem solving', 'Explore digital design tools relevant to your interests'],
        exams: ['NID DAT', 'UCEED', 'NIFT Entrance'],
        skills: ['Portfolio storytelling', 'Sketching', 'Design thinking'],
        projects: ['Create 3–5 original portfolio projects', 'Document process, iterations, and final outcomes', 'Practice studio-test and portfolio presentation skills'],
        application: 'Prepare portfolio submissions and design-school interviews',
      },
      arts: {
        courses: ['Strengthen academic writing and reading', 'Study core humanities and social-science concepts', 'Complete a research and communication course'],
        exams: ['CUET'],
        skills: ['Research', 'Writing', 'Critical analysis'],
        projects: ['Produce an essay, publication, or humanities research project', 'Join a relevant club, competition, or community initiative', 'Build a small writing or creative portfolio'],
        application: 'Prepare humanities programme applications and writing samples',
      },
      other: {
        courses: ['Strengthen the subjects most relevant to your goals', 'Complete a foundational course in your chosen field', 'Build communication and analytical skills'],
        exams: ['CUET or programme-specific entrance exam'],
        skills: ['Research', 'Communication', 'Project execution'],
        projects: ['Complete one project related to your primary career interest', 'Document what you learned and the outcome', 'Seek a relevant competition, volunteer role, or internship'],
        application: 'Prepare programme-specific university applications',
      },
    };

    const plan = plans[stream] || plans.other;
    const preferredExam = profileData.examPreference && profileData.examPreference !== 'None'
      ? profileData.examPreference
      : plan.exams[0];
    const recommendedExams = Array.from(new Set([
      preferredExam,
      ...plan.exams,
      ...(profileData.studyAbroad ? ['SAT/ACT', 'IELTS/TOEFL'] : []),
    ])).filter(Boolean);
    const subjectFocus = favouriteSubjects.length
      ? `Use your strength in ${favouriteSubjects.slice(0, 2).join(' and ')} to support ${primaryCareer}`
      : `Identify the strongest subjects for ${primaryCareer}`;
    const improvementFocus = weakSubjects.length
      ? `Create a weekly improvement plan for ${weakSubjects.slice(0, 2).join(' and ')}`
      : 'Review performance monthly and identify subjects that need support';

    const task = (id: string, text: string): Task => ({ id, text, status: 'not-started' });
    const milestone = (id: string, title: string, date: string, tasks: Array<[string, string]>): Milestone => ({
      id: `${stream}-${id}`,
      title,
      date,
      tasks: tasks.map(([taskId, text]) => task(`${stream}-${id}-${taskId}`, text)),
    });

    const roadmap: Milestone[] = [
      milestone('foundation', `${grade}: Build Your ${profileData.stream} Foundation`, 'Next 8–12 weeks', [
        ['subjects', subjectFocus],
        ['improvement', improvementFocus],
        ['course-1', plan.courses[0]],
        ['course-2', plan.courses[1]],
      ]),
      milestone('skills', `Courses & Skills for ${primaryCareer}`, 'Next 3–6 months', [
        ['course-3', plan.courses[2]],
        ['skill-1', `Develop ${plan.skills[0]} through weekly practice`],
        ['skill-2', `Build evidence of ${plan.skills[1]} and ${plan.skills[2]}`],
        ['career', `Research the education path and daily work of ${primaryCareer}`],
      ]),
      milestone('projects', `${profileData.stream} Projects & Experience`, 'Next 4–8 months', [
        ['project-1', plan.projects[0]],
        ['project-2', plan.projects[1]],
        ['project-3', plan.projects[2]],
        ['review', achievementSuggestion],
      ]),
      milestone('exams', `Entrance Exam Plan: ${recommendedExams.join(' • ')}`, '6–12 months before applications', [
        ['syllabus', `Review the latest official syllabus and format for ${recommendedExams.join(', ')}`],
        ['schedule', `Create a weekly preparation schedule for ${preferredExam}`],
        ['mock', 'Take timed mock tests and maintain an error log'],
        ['register', 'Track official registration windows and required documents'],
      ]),
      milestone('funding', 'Scholarships & Financial Planning', '4–10 months before applications', [
        ['budget', `Compare tuition and living costs against your ${profileData.budget || 'selected'} budget`],
        ['scholarships', profileData.needScholarships || lowBudget ? `Shortlist need-based and merit scholarships matched to your profile${achievements.length ? ' and achievements' : ''}` : 'Review merit scholarships and institutional funding options'],
        ['documents', 'Prepare income, academic, identity, and achievement documents early'],
        ['deadlines', `Track scholarship deadlines for ${destination}`],
      ]),
      milestone('applications', `University Application Phase: ${dreamUniversity}`, 'Application year', [
        ['shortlist', `Build a Dream, Very Good, Good, and Reasonable shortlist for ${destination}`],
        ['requirements', `Verify eligibility, required subjects, and exams for ${dreamUniversity}`],
        ['materials', profileData.studyAbroad ? 'Draft essays, statement of purpose, recommendations, and activity records' : plan.application],
        ['submit', 'Submit applications before official deadlines and track each application status'],
      ]),
    ];

    if (profileData.studyAbroad) {
      roadmap.push(milestone('departure', `Study Abroad Preparation for ${destination}`, 'After receiving an offer', [
        ['offer', 'Compare offers, funding conditions, and total cost before accepting'],
        ['visa', `Review the official student visa process for ${destination}`],
        ['finance', 'Arrange proof of funds, insurance, accommodation, and travel documents'],
        ['departure', 'Complete pre-departure planning and university enrolment steps'],
      ]));
    } else {
      roadmap.push(milestone('admission', 'Counselling, Admission & Transition', 'After entrance results', [
        ['counselling', 'Register for the relevant counselling or admission process'],
        ['compare', 'Compare programme curriculum, cost, location, and career outcomes'],
        ['documents', 'Complete document verification and admission formalities'],
        ['transition', 'Plan first-semester courses, skills, and campus opportunities'],
      ]));
    }

    return roadmap;
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
