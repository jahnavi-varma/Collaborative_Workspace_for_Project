import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Calendar, 
  FileText, 
  MessageCircle,
  Menu,
  X,
  Users,
  Bell,
  LogOut,
  Settings,
  User as UserIcon
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/entities/User";

import UserProfile from "../components/layout/UserProfile";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
    description: "Overview & activity"
  },
  {
    title: "Projects",
    url: createPageUrl("Projects"),
    icon: FolderOpen,
    description: "Team projects"
  },
  {
    title: "Tasks",
    url: createPageUrl("Tasks"),
    icon: CheckSquare,
    description: "Task management"
  },
  {
    title: "Calendar",
    url: createPageUrl("Calendar"),
    icon: Calendar,
    description: "Meetings & deadlines"
  },
  {
    title: "Reports",
    url: createPageUrl("Reports"),
    icon: FileText,
    description: "Weekly timesheets"
  },
  {
    title: "Feedback",
    url: createPageUrl("Feedback"),
    icon: MessageCircle,
    description: "Peer & mentor reviews"
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await User.me();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await User.logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --color-primary: #1e293b;
            --color-primary-light: #334155;
            --color-secondary: #3b82f6;
            --color-accent: #8b5cf6;
            --color-success: #10b981;
            --color-warning: #f59e0b;
            --color-surface: #f8fafc;
            --color-surface-alt: #f1f5f9;
          }
          
          .workspace-gradient {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
          }
          
          .glass-effect {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.9);
          }
          
          .nav-item-hover {
            transition: all 0.2s ease;
          }
          
          .nav-item-hover:hover {
            background: var(--color-surface);
            transform: translateX(4px);
          }
        `}
      </style>
      
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r-0 shadow-lg">
          <SidebarHeader className="workspace-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-slate-700" />
              </div>
              <div className="text-white">
                <h2 className="font-bold text-lg">Workspace</h2>
                <p className="text-xs text-blue-100">Collaborative Platform</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4 bg-white">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link 
                          to={item.url} 
                          className={`nav-item-hover flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium ${
                            location.pathname === item.url 
                              ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' 
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <div className="flex-1">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-slate-400">{item.description}</div>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-8">
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Quick Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Active Tasks</span>
                      <Badge className="bg-blue-100 text-blue-700">12</Badge>
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">This Week</span>
                      <Badge className="bg-emerald-100 text-emerald-700">32h</Badge>
                    </div>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4 bg-white">
            {currentUser && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 glass-effect rounded-xl">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-sm">
                      {currentUser.full_name?.[0] || currentUser.email?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 text-sm truncate">
                      {currentUser.full_name || 'User'}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                  </div>
                  <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                    <DialogTrigger asChild>
                      <Button size="icon" variant="ghost" className="w-8 h-8">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>User Profile</DialogTitle>
                      </DialogHeader>
                      <UserProfile user={currentUser} onClose={() => setIsProfileOpen(false)} />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="w-8 h-8 flex-1">
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="w-8 h-8 flex-1" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-center pt-2 border-t">
                  <p className="text-xs text-slate-400">© 2024 CodeHustlers</p>
                </div>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b px-6 py-4 md:hidden glass-effect">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-slate-900">Workspace</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto bg-gray-50">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}