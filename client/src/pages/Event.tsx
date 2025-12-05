import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  Trophy,
  Code2,
  GraduationCap,
  X,
  Sparkles,
  ExternalLink,
  Satellite,
  Cpu,
  Mail,
  BookOpen,
  Target,
  Award,
  Briefcase,
  CheckCircle,
  Menu
} from "lucide-react";

// Event Modal Component
const EventModal = ({ event, isOpen, onClose }: { event: any; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-h-[95vh] overflow-y-auto transform animate-scale-in border border-gray-200">
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-4 sm:p-6 flex justify-between items-start gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              {event.icon === 'satellite' ? (
                <Satellite className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              ) : (
                <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">{event.title}</h3>
              <p className="text-red-600 text-sm font-medium mt-1">By {event.speaker}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 flex-shrink-0"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
        
        <div className="p-4 sm:p-6">
          {/* Event Header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-gray-600">Date</div>
                <div className="font-semibold text-gray-800 text-sm sm:text-base truncate">{event.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-gray-600">Time</div>
                <div className="font-semibold text-gray-800 text-sm sm:text-base truncate">{event.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100 sm:col-span-2 lg:col-span-1">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-gray-600">Venue</div>
                <div className="font-semibold text-gray-800 text-sm sm:text-base truncate">{event.location}</div>
              </div>
            </div>
          </div>

          {/* Event Type Badge */}
          <div className="mb-4">
            <span className="px-3 py-1.5 bg-red-600 text-white rounded-full text-xs sm:text-sm font-semibold inline-block">
              {event.type} • {event.level}
            </span>
          </div>

          {/* Event Description */}
          <div className="prose max-w-none mb-6">
            <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
              Workshop Overview
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{event.fullDescription}</p>
          </div>

          {/* Key Topics */}
          <div className="mb-6">
            <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
              Key Topics Covered
            </h4>
            <div className="grid gap-2">
              {event.topics.map((topic: string, index: number) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <CheckCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="mb-6">
            <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
              Learning Outcomes
            </h4>
            <div className="grid gap-3">
              {event.benefits.map((benefit: any, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 sm:p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-800 text-sm sm:text-base mb-1">{benefit.title}</div>
                    <div className="text-gray-600 text-xs sm:text-sm">{benefit.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Speaker Info */}
          <div className="mb-6">
            <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
              About the Instructor
            </h4>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-gray-800 text-base sm:text-lg">{event.speaker}</div>
                  <div className="text-red-600 font-semibold text-sm sm:text-base">{event.speakerTitle}</div>
                  <div className="text-gray-600 text-xs sm:text-sm mt-1">{event.speakerBio}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Prerequisites */}
          <div className="mb-6">
            <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
              Prerequisites
            </h4>
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
              <p className="text-gray-700 text-sm sm:text-base">{event.prerequisites}</p>
              {event.requirements && (
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 text-sm sm:text-base">
                  {event.requirements.map((req: string, index: number) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Registration Info */}
          <div className="bg-red-50 rounded-xl p-4 sm:p-6 mb-4 border border-red-200">
            <h4 className="font-bold text-gray-800 mb-2 text-base sm:text-lg">📝 Registration Details</h4>
            <p className="text-gray-700 mb-3 text-sm sm:text-base">{event.registrationInfo}</p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-red-700">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Certificate of Participation included</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6 border-t border-gray-200">
            <Button className="bg-red-600 hover:bg-red-700 text-white py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base">
              Register Now
            </Button>
            <Button variant="outline" className="py-3 font-semibold border-2 border-gray-300 hover:border-red-600 text-base">
              Add to Calendar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const events = [
    {
      id: 1,
      day: "16",
      month: "JAN",
      title: "Satellite Data Processing & Analysis",
      type: "Advanced Workshop",
      level: "Intermediate/Advanced",
      description: "Master satellite data processing techniques with hands-on experience in remote sensing and GIS applications.",
      date: "January 16, 2026",
      time: "2:00 PM - 5:00 PM",
      location: "Advanced Computing Lab, Block A",
      speaker: "Dr. Vikas Mishra",
      speakerTitle: "Associate Professor, SoCE",
      speakerBio: "Expert in remote sensing with 10+ years of experience in satellite data analysis and geospatial applications.",
      icon: "satellite",
      fullDescription: "This comprehensive workshop will take you through the entire pipeline of satellite data processing - from data acquisition to advanced analysis. Dr. Vikas Mishra will guide you through practical applications using real satellite data, focusing on industry-relevant techniques and tools.",
      topics: [
        "Satellite Data Acquisition Methods",
        "Image Pre-processing & Enhancement",
        "Multispectral & Hyperspectral Analysis",
        "GIS Integration & Spatial Analysis",
        "Change Detection Algorithms",
        "Real-world Case Studies"
      ],
      benefits: [
        {
          title: "Hands-on Experience",
          description: "Work with real satellite datasets and processing tools"
        },
        {
          title: "Industry Skills",
          description: "Learn techniques used in environmental monitoring and urban planning"
        },
        {
          title: "Career Advancement",
          description: "Gain skills highly valued in geospatial industry"
        },
        {
          title: "Networking",
          description: "Connect with professionals and like-minded peers"
        }
      ],
      prerequisites: "Basic programming knowledge (Python recommended) and understanding of data analysis concepts. Prior experience with GIS tools is beneficial but not required.",
      requirements: [
        "Laptop with Python installed",
        "Basic understanding of data structures",
        "Interest in geospatial technology"
      ],
      registrationInfo: "Limited to 30 participants. Registration closes on January 14, 2026. Early registration recommended."
    },
    {
      id: 2,
      day: "23",
      month: "JAN",
      title: "Robotic Process Automation (RPA) Masterclass",
      type: "Hands-on Workshop",
      level: "Beginner/Intermediate",
      description: "Learn to automate business processes using cutting-edge RPA tools and build your first automation workflow.",
      date: "January 23, 2026",
      time: "3:00 PM - 6:00 PM",
      location: "Innovation Lab, Tech Center",
      speaker: "Dr. Amit Mishra",
      speakerTitle: "Associate Professor, IT Department",
      speakerBio: "RPA specialist with extensive industry experience in process automation and digital transformation.",
      icon: "robot",
      fullDescription: "Discover the power of Robotic Process Automation in this intensive masterclass. Dr. Amit Mishra will demonstrate how to identify automation opportunities, design efficient workflows, and implement RPA solutions that can save hundreds of hours of manual work.",
      topics: [
        "RPA Fundamentals & Architecture",
        "Process Discovery & Analysis",
        "Workflow Design & Development",
        "Popular RPA Tools Overview",
        "Error Handling & Debugging",
        "Deployment & Maintenance"
      ],
      benefits: [
        {
          title: "Practical Skills",
          description: "Build complete automation workflows from scratch"
        },
        {
          title: "Industry Exposure",
          description: "Learn tools used by Fortune 500 companies"
        },
        {
          title: "Cost Efficiency",
          description: "Understand how to save operational costs through automation"
        },
        {
          title: "Career Opportunities",
          description: "Enter the high-demand field of process automation"
        }
      ],
      prerequisites: "No prior RPA experience required. Basic computer skills and logical thinking are sufficient. Bring your curiosity and willingness to learn!",
      requirements: [
        "Windows laptop (for tool compatibility)",
        "Administrator access for software installation",
        "Stable internet connection"
      ],
      registrationInfo: "Open to all students. Hands-on session with real business processes. Register by January 21, 2026."
    }
  ];

  const openEventModal = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeEventModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Close mobile menu when clicking on a link
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-600 font-medium hover:text-red-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 font-medium hover:text-red-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/events" 
                className="text-red-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                href="/projects" 
                className="text-gray-600 font-medium hover:text-red-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link 
                href="/team" 
                className="text-gray-600 font-medium hover:text-red-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Team
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Notice Bar */}
      {showNotice && (
        <div className="bg-red-600 py-2 px-3 sm:py-3 sm:px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-semibold flex-1 min-w-0">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm truncate">
                🚀 Exclusive Workshops: Satellite Data Processing & RPA Masterclass - Limited Seats!
              </span>
            </div>
            <button 
              onClick={() => setShowNotice(false)}
              className="text-white hover:text-gray-200 transition-colors flex-shrink-0 ml-2"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Page Hero */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-white border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        <div className="absolute top-5 left-5 sm:top-10 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-red-100 rounded-full blur-xl"></div>
        <div className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 w-16 h-16 sm:w-32 sm:h-32 bg-red-50 rounded-full blur-xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Calendar className="h-3 w-3 sm:h-5 sm:w-5" />
            Expert Workshops 2026
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
            Premium <span className="text-red-600">Workshops</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
            Join our exclusive workshops led by industry experts and gain cutting-edge skills 
            that will propel your career forward.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-red-600">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium">Limited Seats Available</span>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium">Certificate of Participation</span>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium">Hands-on Training</span>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid gap-6 sm:gap-8">
            {events.map((event, index) => (
              <Card 
                key={event.id}
                className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-200 shadow-lg overflow-hidden bg-white animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Date Section */}
                  <div className="sm:w-28 bg-red-600 text-white p-4 sm:p-6 flex flex-row sm:flex-col items-center justify-center sm:justify-center gap-2 sm:gap-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <span className="text-2xl sm:text-3xl font-bold relative z-10">{event.day}</span>
                    <span className="text-base sm:text-lg font-semibold relative z-10">{event.month}</span>
                    <span className="text-xs opacity-90 relative z-10 hidden sm:block mt-1">2026</span>
                  </div>
                  
                  {/* Content Section */}
                  <CardContent className="p-4 sm:p-6 flex-1">
                    <div className="flex flex-col gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            {event.icon === 'satellite' ? (
                              <Satellite className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                            ) : (
                              <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 break-words">{event.title}</h3>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-red-600 text-white rounded-full text-xs font-semibold">
                                {event.type}
                              </span>
                              <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
                                {event.level}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">{event.description}</p>

                        <div className="grid grid-cols-1 gap-3 mb-4">
                          <div className="flex items-center gap-3 text-gray-600">
                            <Clock className="h-4 w-4 text-red-600 flex-shrink-0" />
                            <span className="font-medium text-sm sm:text-base">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                            <MapPin className="h-4 w-4 text-red-600 flex-shrink-0" />
                            <span className="font-medium text-sm sm:text-base">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                            <Users className="h-4 w-4 text-red-600 flex-shrink-0" />
                            <span className="font-medium text-sm sm:text-base">{event.speaker}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                            <Trophy className="h-4 w-4 text-red-600 flex-shrink-0" />
                            <span className="font-medium text-sm sm:text-base">Certificate Included</span>
                          </div>
                        </div>
                      </div>

                      <div className="sm:w-full">
                        <Button 
                          onClick={() => openEventModal(event)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 sm:py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group/btn text-sm sm:text-base"
                        >
                          View Details
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-1.5 sm:ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Button>
                        <div className="mt-2 text-center">
                          <div className="text-xs text-gray-500 mb-1">Limited Seats</div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-red-600 h-1.5 rounded-full transition-all duration-1000"
                              style={{ width: '75%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Transform Your Skills?</h2>
          <p className="text-base sm:text-lg text-red-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Don't miss this opportunity to learn from industry experts and gain valuable skills 
            that will set you apart in your career.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-white text-red-600 hover:bg-gray-100 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Register for Workshops
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold">
              Contact Coordinator
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <Code2 className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold">Coding Club CU</h4>
                  <p className="text-red-400 text-xs sm:text-sm">Chandigarh University</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed text-xs sm:text-sm">
                Building a vibrant community of developers, innovators, and tech enthusiasts 
                at Chandigarh University.
              </p>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors text-sm sm:text-base">About</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors text-sm sm:text-base">Events</Link></li>
                <li><Link href="/team" className="hover:text-white transition-colors text-sm sm:text-base">Team</Link></li>
                <li><Link href="/projects" className="hover:text-white transition-colors text-sm sm:text-base">Projects</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Contact Info</h4>
              <div className="space-y-3 sm:space-y-4 text-gray-400">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base">codingclub@culko.in</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Chandigarh University, Lucknow Campus</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-6 sm:pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-500 text-xs sm:text-sm">
              &copy; 2025 Coding Club CU. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Event Modal */}
      <EventModal 
        event={selectedEvent} 
        isOpen={isModalOpen} 
        onClose={closeEventModal} 
      />

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Events;