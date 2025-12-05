import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { 
  Target, 
  Users, 
  Code2, 
  Trophy, 
  GraduationCap, 
  Lightbulb,
  Heart,
  Star,
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  ArrowRight,
  Sparkles,
  Menu,
  TrendingUp
} from "lucide-react";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 1000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);


  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16); // 60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count.toLocaleString()}+</span>;
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const activities = [
    {
      icon: Code2,
      title: "Workshops",
      description: "Regular sessions on modern programming languages, frameworks, and development practices.",
      color: "from-blue-500 to-cyan-500",
      delay: "100"
    },
    {
      icon: Trophy,
      title: "Hackathons",
      description: "24-hour coding marathons where students collaborate to build innovative projects.",
      color: "from-green-500 to-emerald-500",
      delay: "200"
    },
    {
      icon: Users,
      title: "Competitions",
      description: "Coding contests and challenges to test skills and compete with peers.",
      color: "from-purple-500 to-pink-500",
      delay: "300"
    },
    {
      icon: GraduationCap,
      title: "Guest Talks",
      description: "Industry experts share insights and career guidance with our community.",
      color: "from-orange-500 to-red-500",
      delay: "400"
    },
    {
      icon: Lightbulb,
      title: "Projects",
      description: "Collaborative initiatives to build real-world applications and open-source contributions.",
      color: "from-yellow-500 to-amber-500",
      delay: "500"
    },
    {
      icon: Heart,
      title: "Mentorship",
      description: "One-on-one guidance from experienced developers to help beginners grow.",
      color: "from-rose-500 to-pink-500",
      delay: "600"
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of teamwork and collective learning.",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      delay: "100"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We encourage creative thinking and pushing technological boundaries.",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      delay: "200"
    },
    {
      icon: Heart,
      title: "Inclusivity",
      description: "Everyone is welcome, regardless of experience level or background.",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      delay: "300"
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We strive for quality in all our projects and activities.",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      delay: "400"
    }
  ];

  const stats = [
    { number: 100, label: "Active Members", delay: "100", icon: Users },
    { number: 100, label: "Events Conducted", delay: "300", icon: Calendar },
    { number: 100, label: "Projects Completed", delay: "500", icon: Code2 },
    { number: 100, label: "Workshops Held", delay: "700", icon: GraduationCap }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <img 
                  src="/assets/images/culogo.png" 
                  alt="College Logo" 
                  className="h-12 w-12 object-contain transition-transform group-hover:scale-105"
                />
              </div>
              <div>
                <span className="font-bold text-xl text-gray-800 block leading-tight">Coding Club</span>
                <span className="text-sm text-red-600 font-medium block leading-tight">Chandigarh University</span>
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

      {/* Enhanced Page Hero */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-100 rounded-full blur-xl opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-100 rounded-full blur-xl opacity-50"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-red-200 animate-pulse">
            <Sparkles className="h-4 w-4" />
            About Our Community
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight animate-fade-in">
            About <span className="text-red-600 bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Coding Club</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-100">
            Discover the passion, purpose, and people behind Chandigarh University's premier tech community. 
            Where innovation meets collaboration.
          </p>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-green-200">
              <TrendingUp className="h-4 w-4" />
              Growing Stronger Every Day
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact in Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Witness our journey through these live statistics that showcase our community's growth
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-105 transition-all duration-500 p-6 rounded-2xl hover:bg-gradient-to-br hover:from-white hover:to-gray-50 hover:shadow-xl border border-transparent hover:border-gray-200"
                style={{ animationDelay: `${stat.delay}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter end={stat.number} duration={2500} />
                </div>
                <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center gap-4 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-slow">
                <Target className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              To create a vibrant community of developers and tech enthusiasts at Chandigarh University 
              who collaborate, innovate, and contribute to the tech ecosystem through quality projects 
              and knowledge sharing. We envision a future where every student has the opportunity to 
              explore, learn, and excel in technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-red-100/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-red-200 animate-pulse">
              <Star className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              We aim to empower students with practical skills and create opportunities for growth in technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Provide a platform for students to learn and practice coding skills",
              "Organize workshops, competitions, and hackathons",
              "Mentor new developers and foster peer learning",
              "Build collaborative projects that solve real-world problems",
              "Connect students with industry professionals",
              "Promote open-source contribution and community participation"
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 group hover:translate-x-2 transition-all duration-500 p-6 rounded-2xl hover:bg-white/80 hover:shadow-lg border border-transparent hover:border-red-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce-slow">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Activities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Engaging events and programs designed to enhance your technical skills and career growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden animate-fade-in"
                style={{ animationDelay: activity.delay + 'ms' }}
              >
                <div className={`h-2 bg-gradient-to-r ${activity.color}`}></div>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${activity.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:rotate-12`}>
                    <activity.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{activity.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Coding Club CU
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-fade-in"
                style={{ animationDelay: value.delay + 'ms' }}
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border group-hover:rotate-12`}>
                    <value.icon className={`h-8 w-8 ${value.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-400/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Become part of our growing community and start your journey in technology with like-minded peers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                Explore Events
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                Meet Our Team
              </Button>
            </Link>
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
                at Chandigarh University. Together, we learn, build, and grow.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:scale-125 transition-transform"></div>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:scale-125 transition-transform"></div>
                    Events & Workshops
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:scale-125 transition-transform"></div>
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:scale-125 transition-transform"></div>
                    Projects
                  </Link>
                </li>
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
              &copy; 2025 Coding Club CU. All rights reserved. | Built with ❤️ by our amazing team
            </p>
          </div>
        </div>
      </footer>

      {/* Add custom animations to tailwind config */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .delay-100 { animation-delay: 100ms; }
      `}</style>
    </div>
  );
};

export default About;