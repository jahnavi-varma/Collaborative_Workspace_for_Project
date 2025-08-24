import React, { useState, useEffect } from "react";
import { Project, Task, Meeting, TaskUpdate, User } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Plus, 
  Clock, 
  CheckCircle, 
  Users, 
  Calendar,
  TrendingUp,
  ArrowRight,
  FolderOpen
} from "lucide-react";
import { format } from "date-fns";

import StatCard from "../components/dashboard/StatCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import ProjectOverview from "../components/dashboard/ProjectOverview";
import UpcomingMeetings from "../components/dashboard/UpcomingMeetings";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const user = await User.me();
      setCurrentUser(user);

      const [projectData, taskData, meetingData, updateData] = await Promise.all([
        Project.list('-updated_date', 10),
        Task.filter({ assigned_to: user.email }, '-updated_date', 20),
        Meeting.list('-scheduled_date', 5),
        TaskUpdate.list('-created_date', 10)
      ]);

      setProjects(projectData);
      setTasks(taskData);
      setMeetings(meetingData);
      setRecentUpdates(updateData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    const inProgress = tasks.filter(task => task.status === 'in_progress').length;
    const overdue = tasks.filter(task => 
      new Date(task.due_date) < new Date() && task.status !== 'completed'
    ).length;

    return { total, completed, inProgress, overdue };
  };

  const taskStats = getTaskStats();
  const completionRate = taskStats.total > 0 ? Math.round((taskStats.completed / taskStats.total) * 100) : 0;

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome back, {currentUser?.full_name?.split(' ')[0] || 'there'}! 👋
            </h1>
            <p className="text-slate-600 mt-2">Here's what's happening with your projects today.</p>
          </div>
          <div className="flex gap-3">
            <Link to={createPageUrl("Tasks")}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
            </Link>
            <Link to={createPageUrl("Projects")}>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                <FolderOpen className="w-4 h-4 mr-2" />
                View Projects
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Tasks"
            value={taskStats.total}
            icon={CheckCircle}
            color="blue"
            trend={`${completionRate}% completed`}
          />
          <StatCard
            title="In Progress"
            value={taskStats.inProgress}
            icon={Clock}
            color="amber"
            trend="Active work"
          />
          <StatCard
            title="Projects"
            value={projects.length}
            icon={FolderOpen}
            color="emerald"
            trend="Team projects"
          />
          <StatCard
            title="Meetings"
            value={meetings.filter(m => 
              new Date(m.scheduled_date) >= new Date() && 
              new Date(m.scheduled_date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            ).length}
            icon={Calendar}
            color="purple"
            trend="This week"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Projects & Tasks */}
          <div className="lg:col-span-2 space-y-8">
            <ProjectOverview 
              projects={projects}
              tasks={tasks}
              isLoading={isLoading}
            />
            
            <RecentActivity 
              updates={recentUpdates}
              tasks={tasks}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column - Meetings & Progress */}
          <div className="space-y-8">
            <UpcomingMeetings 
              meetings={meetings}
              isLoading={isLoading}
            />

            {/* Progress Overview */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900">
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Task Completion</span>
                    <span className="font-semibold text-slate-900">{completionRate}%</span>
                  </div>
                  <Progress value={completionRate} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{taskStats.completed}</div>
                    <div className="text-xs text-slate-500">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">{taskStats.inProgress}</div>
                    <div className="text-xs text-slate-500">In Progress</div>
                  </div>
                </div>

                <Link to={createPageUrl("Reports")}>
                  <Button variant="outline" className="w-full mt-4 border-blue-200 hover:bg-blue-50">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Reports
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}