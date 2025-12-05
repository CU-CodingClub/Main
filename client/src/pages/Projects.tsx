import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  Code2,
  ExternalLink,
  Github,
  Globe,
  Smartphone,
  Cpu,
  Database,
  Bot,
  Cloud,
  Wifi,
  BarChart3,
  Users,
  Calendar,
  Mail,
  MapPin
} from "lucide-react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Campus Connect",
      type: "Web App",
      description: "A social platform for students to connect, share notes, and collaborate on projects across campus with real-time messaging and file sharing.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      lead: "Priya Sharma",
      githubUrl: "https://github.com/codingclubcu/campus-connect",
      websiteUrl: "https://campusconnect.cu.edu",
      icon: Users,
      status: "Live",
      contributors: 8,
      stars: 45
    },
    {
      id: 2,
      title: "Code Analyzer",
      type: "Developer Tool",
      description: "An intelligent code review tool that detects bugs, security vulnerabilities, and suggests code quality improvements with detailed reports.",
      technologies: ["Python", "AST", "Flask", "Docker"],
      lead: "Arjun Patel",
      githubUrl: "https://github.com/codingclubcu/code-analyzer",
      websiteUrl: "https://code-analyzer.cu.edu",
      icon: Code2,
      status: "Beta",
      contributors: 6,
      stars: 32
    },
    {
      id: 3,
      title: "StudyHub",
      type: "Mobile App",
      description: "Comprehensive mobile application for students to manage schedules, track assignments, and receive smart academic reminders with AI-powered insights.",
      technologies: ["Flutter", "Firebase", "Dart", "AI"],
      lead: "Isha Gupta",
      githubUrl: "https://github.com/codingclubcu/studyhub",
      websiteUrl: "https://studyhub.cu.edu",
      icon: Smartphone,
      status: "Live",
      contributors: 5,
      stars: 28
    },
    {
      id: 4,
      title: "Data Visualizer",
      type: "Web Tool",
      description: "Advanced interactive tool for visualizing complex datasets with multiple chart types, real-time updates, and collaborative features.",
      technologies: ["Vue.js", "D3.js", "Python", "WebSockets"],
      lead: "Rajesh Kumar",
      githubUrl: "https://github.com/codingclubcu/data-visualizer",
      websiteUrl: "https://dataviz.cu.edu",
      icon: BarChart3,
      status: "Live",
      contributors: 7,
      stars: 51
    },
    {
      id: 5,
      title: "IoT Weather Station",
      type: "Hardware Project",
      description: "Smart weather monitoring system using IoT sensors with real-time data collection, cloud storage, and predictive analytics.",
      technologies: ["Arduino", "IoT", "AWS", "Python"],
      lead: "Aditya Singh",
      githubUrl: "https://github.com/codingclubcu/iot-weather",
      websiteUrl: "https://weather.cu.edu",
      icon: Cloud,
      status: "Prototype",
      contributors: 4,
      stars: 23
    },
    {
      id: 6,
      title: "AI Chatbot",
      type: "AI/ML Project",
      description: "Intelligent chatbot using advanced NLP and machine learning for customer support, information queries, and personalized assistance.",
      technologies: ["Python", "TensorFlow", "NLP", "FastAPI"],
      lead: "Neha Verma",
      githubUrl: "https://github.com/codingclubcu/ai-chatbot",
      websiteUrl: "https://chatbot.cu.edu",
      icon: Bot,
      status: "Live",
      contributors: 9,
      stars: 67
    }
  ];

  const [activeFilter, setActiveFilter] = useState("all");

  const projectTypes = ["all", "web app", "mobile app", "developer tool", "hardware project", "ai/ml project"];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => 
        project.type.toLowerCase().includes(activeFilter.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <img 
                src="/assets/images/culogo.png" 
                alt="College Logo" 
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-transform group-hover:scale-105"
              />
              <div>
                <span className="font-bold text-lg sm:text-xl text-gray-800 block leading-tight">Coding Club</span>
                <span className="text-xs sm:text-sm text-red-600 font-medium block leading-tight">Chandigarh University</span>
              </div>
            </div>
          </Link>

{/* Desktop Navigation */}
<center>
  <nav className="hidden md:flex items-center gap-8">
    <Link 
      href="/" 
      className="text-gray-600 font-medium hover:text-red-600 transition-colors duration-300 relative group"
      onClick={() => window.scrollTo(0, 0)}
    >
      Home
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
    
    <Link 
      href="/about" 
      className="text-gray-600 font-medium hover:text-red-600 transition-colors duration-300 relative group"
      onClick={() => window.scrollTo(0, 0)}
    >
      About
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
    
    <Link 
      href="/events" 
      className="text-gray-600 font-medium hover:text-red-600 transition-colors duration-300 relative group"
      onClick={() => window.scrollTo(0, 0)}
    >
      Events
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
    
    <Link 
      href="/projects" 
      className="text-gray-600 font-medium hover:text-red-600 transition-colors duration-300 relative group"
      onClick={() => window.scrollTo(0, 0)}
    >
      Projects
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
    
    <Link 
      href="/team" 
      className="text-gray-600 font-medium hover:text-red-600 transition-colors duration-300 relative group"
      onClick={() => window.scrollTo(0, 0)}
    >
      Team
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  </nav>
</center>
        </div>
      </header>

      {/* Page Hero */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-100 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-50 rounded-full blur-xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Code2 className="h-5 w-5" />
            Innovation Showcase
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Our <span className="text-red-600">Projects</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Discover innovative projects built by our talented community of developers, 
            designers, and creators at Chandigarh University.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-red-600">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Open Source</span>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live Demos</span>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Community Built</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Filter */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {projectTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                  activeFilter === type
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {type === "all" ? "All Projects" : type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card 
                key={project.id}
                className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 shadow-lg overflow-hidden bg-white"
              >
                <CardContent className="p-0">
                  {/* Project Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                          <project.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                          <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold mt-1">
                            {project.type}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        project.status === "Live" 
                          ? "bg-green-100 text-green-600" 
                          : project.status === "Beta"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-blue-100 text-blue-600"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Project Stats */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{project.contributors} contributors</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span>{project.stars} stars</span>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="p-6 border-b border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Info & Actions */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          <strong className="text-gray-800">Project Lead:</strong> {project.lead}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        asChild
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      >
                        <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button 
                        variant="outline"
                        asChild
                        className="flex-1"
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <Code2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
              <p className="text-gray-500">Try selecting a different filter to see more projects.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Want to Showcase Your Project?</h2>
          <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join our community and get your project featured here. Collaborate with other developers 
            and build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Submit Project
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold">
              Join Community
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <Code2 className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Coding Club CU</h4>
                  <p className="text-red-400 text-sm">Chandigarh University</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                Building a vibrant community of developers, innovators, and tech enthusiasts 
                at Chandigarh University.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
                <li><Link href="/team" className="hover:text-white transition-colors">Team</Link></li>
                <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Contact Info</h4>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-red-500" />
                  <span>codingclub@culko.in</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <span>Chandigarh University, Lucknow Campus</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-500">
              &copy; 2025 Coding Club CU. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Projects;