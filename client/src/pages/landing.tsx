import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/lib/auth";
import { useState, useEffect, useRef } from "react";

import {
  Code2,
  Users,
  Calendar,
  Trophy,
  ArrowRight,
  Laptop,
  Zap,
  CheckCircle,
  GraduationCap,
  Mail,
  TrendingUp,
  MapPin,
  FlipHorizontal,
  FlipVertical,
} from "lucide-react";

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState([false, false, false]);

    const [isAboutVisible, setIsAboutVisible] = useState(false);
  const aboutSectionRef = useRef(null);

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

  // Scroll detection for about section
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsAboutVisible(true);
        observer.unobserve(entry.target);
      }
    },
    {
      threshold: 0.3, // 30% visible होने पर trigger
      rootMargin: '0px 0px -100px 0px'
    }
  );

  if (aboutSectionRef.current) {
    observer.observe(aboutSectionRef.current);
  }

  return () => {
    if (aboutSectionRef.current) {
      observer.unobserve(aboutSectionRef.current);
    }
  };
}, []);

  const stats = [
    { number: 100, label: "Active Members", delay: "100", icon: Users },
    { number: 100, label: "Events Conducted", delay: "300", icon: Calendar },
    { number: 100, label: "Projects Completed", delay: "500", icon: Code2 },
    { number: 100, label: "Workshops Held", delay: "700", icon: GraduationCap }
  ];

  // Flip card handler
  const handleCardFlip = (index: number) => {
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedCards(newFlippedCards);
  };

  // Flip card data
  const flipCardsData = [
    {
      front: {
        icon: Users,
        title: "Our Mission",
        description: "We foster a community of passionate developers at Chandigarh University, dedicated to learning modern programming practices, sharing knowledge, and building innovative solutions together.",
        buttonText: "Learn More"
      },
      back: {
        title: "Our Vision",
        description: "To become the premier student-led coding community that bridges the gap between academic learning and industry requirements, producing world-class developers and innovators.",
        features: [
          "Industry-aligned curriculum",
          "Real-world project experience",
          "Mentorship from experts",
          "Career development support"
        ]
      }
    },
    {
      front: {
        icon: Laptop,
        title: "What We Offer",
        description: "Workshops, coding competitions, hackathons, mentorship programs, and collaborative projects. We believe in hands-on learning and peer-to-peer knowledge sharing.",
        buttonText: "See Activities"
      },
      back: {
        title: "Our Activities",
        description: "Comprehensive learning and development programs designed to enhance your technical skills and professional growth.",
        features: [
          "Weekly coding workshops",
          "Monthly hackathons",
          "Industry guest lectures",
          "Project showcase events",
          "Interview preparation",
          "Resume building sessions"
        ]
      }
    },
    {
      front: {
        icon: Code2,
        title: "Join Us",
        description: "Whether you're a beginner or an experienced developer, there's a place for you in our community. Together, we grow, learn, and achieve more.",
        buttonText: "Get Involved"
      },
      back: {
        title: "Membership Benefits",
        description: "Join our vibrant community and unlock numerous opportunities for personal and professional growth.",
        features: [
          "Access to exclusive events",
          "Networking opportunities",
          "Project collaboration",
          "Mentorship programs",
          "Certificate of participation",
          "Internship referrals"
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
     <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 navbar">
  <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
    <Link href="/">
      <div className="flex items-center gap-3 cursor-pointer">
<img 
  src="/assets/images/culogo.png" 
  alt="College Logo" 
  className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 object-contain"
/>
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

    {/* Desktop Auth Buttons (Desktop पर) */}
    <div className="hidden md:flex items-center gap-3">
      {isAuthenticated ? (
        <Link href="/dashboard">
          <Button className="bg-red-600 hover:bg-red-700 text-white">Dashboard</Button>
        </Link>
      ) : (
        <>
          <Link href="/login">
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-red-600 hover:bg-red-700 text-white">Sign Up</Button>
          </Link>
        </>
      )}
    </div>

    {/* MOBILE MENU BUTTON (Mobile पर सिर्फ यही दिखेगा) */}
    <button
      id="mobileMenuButton"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
      aria-label="Toggle mobile menu"
      aria-expanded={isMobileMenuOpen}
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isMobileMenuOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  </div>

  {/* Mobile Navigation Menu (Mobile पर ही दिखेगा) */}
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
          className="text-gray-600 font-medium hover:text-red-600 transition-colors py-2"
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
        
        {/* Mobile पर Auth Buttons */}
        <div className="pt-4 mt-4 border-t border-gray-100 space-y-2">
          {isAuthenticated ? (
            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">
                  Login
                </Button>
              </Link><hr></hr>
              <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  )}
</header>

      {/* Hero Section */}
      {/* Hero Section */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">

  {/* Background Animations */}
  <div className="absolute inset-0 overflow-hidden">
    
    {/* Animated Grid Pattern */}
    <div 
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(90deg, #dc2626 1px, transparent 1px),
          linear-gradient(180deg, #dc2626 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'gridMove 20s linear infinite'
      }}
    ></div>

    {/* Floating Code Elements */}
    {[...Array(20)].map((_, i) => {
      const size = 14 + Math.random() * 25; // 🔥 reduced for mobile responsiveness
      const duration = 20 + Math.random() * 20;
      const delay = Math.random() * 5;
      const symbols = ['</>', '{ }', '[ ]', '()', '=>', '===', '!==', '&&', '||'];
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];

      return (
        <div
          key={i}
          className="absolute font-mono font-bold opacity-[0.02] pointer-events-none select-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${size}px`,
            color: `rgba(220, 38, 38, ${0.02 + Math.random() * 0.03})`,
            animation: `codeFloat ${duration}s linear infinite`,
            animationDelay: `${delay}s`
          }}
        >
          {symbol}
        </div>
      );
    })}

    {/* Pulsing Orbs */}
    <div 
      className="absolute top-1/4 left-1/4 w-52 h-52 md:w-64 md:h-64 rounded-full opacity-[0.02]"
      style={{ backgroundColor: "#dc2626", animation: "pulseOrb 8s ease-in-out infinite" }}
    ></div>

    <div 
      className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full opacity-[0.015]"
      style={{ backgroundColor: "#dc2626", animation: "pulseOrb 12s ease-in-out infinite 2s" }}
    ></div>

    {/* Animated Lines */}
    <div 
      className="absolute top-0 left-0 w-full h-0.5"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.5), transparent)",
        animation: "lineFlow 4s linear infinite",
      }}
    ></div>

    <div 
      className="absolute bottom-0 left-0 w-full h-0.5"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.5), transparent)",
        animation: "lineFlow 4s linear infinite 2s",
      }}
    ></div>
  </div>

  {/* Header Title */}
  <div 
    className="absolute top-6 md:top-8 left-1/2 transform -translate-x-1/2 text-center opacity-0 px-2"
    style={{ animation: "slideDownFade 0.8s ease-out 0.3s forwards" }}
  >
    <div className="flex items-center gap-2 justify-center">
      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#dc2626" }}></div>
      <div className="text-xs md:text-sm font-medium tracking-widest" style={{ color: "#dc2626" }}>
        OFFICIAL CODING COMMUNITY
      </div>
    </div>
  </div>

  <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto py-24">

    {/* Badge */}
    <div className="mb-10 opacity-0" style={{ animation: "scaleFade 0.8s ease-out 0.5s forwards" }}>
      <div className="inline-block">
        <div 
          className="px-4 py-2 md:px-6 md:py-3 rounded-xl border flex items-center gap-2 md:gap-3"
          style={{
            backgroundColor: "#fef2f2",
            borderColor: "#fecaca",
            boxShadow: '0 4px 20px rgba(220, 38, 38, 0.1)'
          }}
        >
          <span className="text-lg md:text-xl font-bold" style={{ color: "#dc2626" }}>
            {"{ }"}
          </span>
          <span className="text-xs md:text-sm font-medium tracking-wider" style={{ color: "#991b1b" }}>
            CODE • BUILD • INNOVATE
          </span>
        </div>
      </div>
    </div>

    {/* Heading */}
    <h1 
      className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight opacity-0"
      style={{ animation: "fadeUp 0.8s ease-out 0.7s forwards" }}
    >
      <div className="mb-3 md:mb-4 text-gray-800 font-normal text-2xl md:text-4xl">
        Chandigarh University
      </div>

      <div className="relative inline-block">
        <span 
          className="relative z-10 font-bold bg-clip-text text-4xl md:text-6xl"
          style={{ color: "#dc2626" }}
        >
          Coding Club
        </span>
        <div 
          className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-1 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, #dc2626, transparent)",
            animation: "underlineGlow 3s ease-in-out infinite"
          }}
        ></div>
      </div>
    </h1>

    {/* Subtitle */}
    <div 
      className="text-base md:text-xl mb-10 max-w-2xl mx-auto opacity-0 px-2"
      style={{ animation: "fadeUp 0.8s ease-out 0.9s forwards", color: "#4b5563" }}
    >
      Join India's premier student-run developer community. Master cutting-edge technologies, 
      build real-world projects, and accelerate your career in software development.
    </div>

    {/* CTA Buttons */}
    <div 
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 opacity-0 w-full"
      style={{ animation: "fadeUp 0.8s ease-out 1.3s forwards" }}
    >
      <Link href="/login" className="w-full sm:w-auto">
        <button
          className="group w-full sm:w-auto px-10 py-4 font-semibold text-lg rounded-xl relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
            color: "white",
            boxShadow: "0 6px 25px rgba(220, 38, 38, 0.25)"
          }}
        >
          <div className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100"
            style={{
              background: "linear-gradient(45deg, #dc2626, #ef4444, #dc2626)",
              animation: "borderSpin 2s linear infinite",
              zIndex: -1
            }}>
          </div>

          <span className="relative flex items-center gap-3 justify-center">
            Join Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </span>
        </button>
      </Link>

      <Link href="/events" className="w-full sm:w-auto">
        <button
          className="group w-full sm:w-auto px-10 py-4 font-semibold text-lg rounded-xl border relative overflow-hidden"
          style={{
            backgroundColor: "white",
            color: "#dc2626",
            borderColor: "#dc2626",
          }}
        >
          <span className="relative flex items-center gap-2 justify-center">
            Explore Programs
            <span className="transition-transform duration-300 group-hover:rotate-45">↗</span>
          </span>
        </button>
      </Link>
    </div>

  </div>

  {/* Scroll Indicator */}
  <div 
    className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer opacity-0"
    style={{ animation: "fadeUp 0.8s ease-out 1.8s forwards" }}
    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
  >
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <div className="w-4 h-8 md:w-5 md:h-10 border rounded-full flex justify-center items-start">
          <div 
            className="w-1 h-2 md:h-3 rounded-full mt-2"
            style={{
              backgroundColor: "#dc2626",
              animation: "scrollReveal 2s ease-in-out infinite"
            }}
          ></div>
        </div>
      </div>
    </div>
  </div>

  {/* Animations */}
  <style jsx>{`
    @keyframes gridMove {
      0% { transform: translate(0, 0); }
      100% { transform: translate(50px, 50px); }
    }
    @keyframes codeFloat {
      0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.02; }
      50% { transform: translate(-20px, 30px) rotate(180deg) scale(0.9); opacity: 0.03; }
    }
    @keyframes pulseOrb {
      0%, 100% { transform: scale(1); opacity: 0.02; }
      50% { transform: scale(1.2); opacity: 0.04; }
    }
    @keyframes lineFlow {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    @keyframes slideDownFade {
      from { opacity: 0; transform: translate(-50%, -20px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }
    @keyframes scaleFade {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes underlineGlow {
      0%,100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    @keyframes scrollReveal {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(12px); opacity: 0; }
    }
  `}</style>

</section>

      {/* About Preview Section with Flip Cards */}
      <section id="about" className="py-20 bg-white about-preview">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-red-600 mb-4">About Our Club</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Click on the cards to discover more about what we offer
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 about-content">
            {flipCardsData.map((card, index) => (
              <div 
                key={index}
                className="flip-card h-96 cursor-pointer"
                onClick={() => handleCardFlip(index)}
              >
                <div className={`flip-card-inner w-full h-full transition-transform duration-700 ${flippedCards[index] ? 'flip-card-flipped' : ''}`}>
                  {/* Front of Card */}
                  <Card className="flip-card-front absolute inset-0 text-center p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-600 w-full h-full backface-hidden">
                    <CardContent className="p-0 h-full flex flex-col justify-center">
                      <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                        <card.front.icon className="h-8 w-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">{card.front.title}</h3>
                      <p className="text-gray-600 mb-6 flex-grow">
                        {card.front.description}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-red-600 font-medium">
                        <span>{card.front.buttonText}</span>
                        <FlipHorizontal className="h-4 w-4" />
                      </div>
                      <p className="text-xs text-gray-500 mt-2 font-medium">Click to flip</p>
                    </CardContent>
                  </Card>

                  {/* Back of Card */}
                  <Card className="flip-card-back absolute inset-0 p-6 bg-gradient-to-br from-red-600 to-red-700 text-white w-full h-full backface-hidden rotate-y-180">
                    <CardContent className="p-0 h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-center">{card.back.title}</h3>
                        <p className="text-red-100 mb-4 text-sm text-center">
                          {card.back.description}
                        </p>
                        <ul className="space-y-2">
                          {card.back.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-300 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 text-red-100 font-medium text-sm">
                          <span>Click to return</span>
                          <FlipVertical className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .flip-card {
            perspective: 1000px;
          }
          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.7s;
            transform-style: preserve-3d;
          }
          .flip-card-flipped {
            transform: rotateY(180deg);
          }
          .flip-card-front,
          .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 0.75rem;
          }
          .backface-hidden {
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>
      </section>

      {/* Animated Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
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

      {/* Events Section */}
      <section id="events" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-red-600 mb-4">Our Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our exciting events designed to enhance your skills and connect with the tech community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Hackathon Card */}
            <Card className="overflow-hidden border-2 border-red-100 hover:border-red-300 transition-all duration-300">
              <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 text-white">
                <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Hackathon 2025</h3>
                <p>48-hour coding marathon to build innovative solutions</p>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>March 15-17, 2025</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>Teams of 2-5 members</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Trophy className="h-4 w-4" />
                    <span>$5,000 Grand Prize</span>
                  </div>
                </div>
                
                <ul className="space-y-2 pt-4 border-t border-gray-200">
                  {[
                    "Build real-world solutions",
                    "Industry mentorship",
                    "Networking opportunities",
                    "Exciting prizes & swag",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>

                {isAuthenticated ? (
                  <Link href="/hackathon/register">
                    <Button className="w-full bg-red-600 hover:bg-red-700 gap-2 mt-4">
                      Register Your Team
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button className="w-full bg-red-600 hover:bg-red-700 gap-2 mt-4">
                      Login to Register
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Workshop Card */}
            <Card className="overflow-hidden border-2 border-red-100 hover:border-red-300 transition-all duration-300">
              <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 text-white">
                <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  <Laptop className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Python Workshop</h3>
                <p>Hands-on learning experience for beginners to advanced</p>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>April 5-6, 2025</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>Individual Registration</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <GraduationCap className="h-4 w-4" />
                    <span>Certificate Provided</span>
                  </div>
                </div>
                
                <ul className="space-y-2 pt-4 border-t border-gray-200">
                  {[
                    "Beginner to advanced tracks",
                    "Hands-on projects",
                    "Industry experts",
                    "Free resources & materials",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>

                {isAuthenticated ? (
                  <Link href="/workshop/register">
                    <Button className="w-full bg-red-600 hover:bg-red-700 gap-2 mt-4">
                      Register Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button className="w-full bg-red-600 hover:bg-red-700 gap-2 mt-4">
                      Login to Register
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

{/* Additional About Section */}
<section ref={aboutSectionRef} className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">
          Why Join Our Coding Club?
        </h2>
        <p className="text-gray-600 mb-6">
          Our coding club brings together passionate developers from Chandigarh University. 
          Whether you're looking to compete in hackathons or learn new skills through workshops, 
          we have something for every tech enthusiast.
        </p>
        
        <div className="space-y-4">
          {[
            {
              icon: Users,
              title: "Network with Peers",
              desc: "Connect with like-minded students and industry professionals",
            },
            {
              icon: Trophy,
              title: "Win Exciting Prizes",
              desc: "Cash prizes, internship opportunities, and more",
            },
            {
              icon: GraduationCap,
              title: "Learn from Experts",
              desc: "Get mentored by industry leaders and experts",
            },
          ].map((item, index) => (
            <div 
              key={item.title} 
              className={`flex gap-4 transition-all duration-700 ease-out transform ${
                isAboutVisible 
                  ? 'translate-x-0 opacity-100' 
                  : '-translate-x-20 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${index * 250}ms`
              }}
            >
              <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                <item.icon className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
<Card className="p-6 text-center relative overflow-hidden">
  {/* Green indicator badge */}
  <div className="absolute top-3 right-3">
    <div className="relative">
      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
      <div className="relative flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
        <svg 
          className="w-3 h-3 text-green-700" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" 
            clipRule="evenodd" 
          />
        </svg>
        <span className="text-xs font-medium text-green-800">12%</span>
      </div>
    </div>
  </div>
  
  <div className="text-4xl font-bold text-red-600 mb-2">100+</div>
  <div className="text-sm text-gray-600">Total Visitors</div>
</Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">100+</div>
                <div className="text-sm text-gray-600">Projects Built</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Industry Partners</div>
              </Card>
      </div>
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join the Action?
          </h2>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">
            Don't miss out on this incredible opportunity to learn, compete, and grow. 
            Register now and be part of something amazing!
          </p>
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button className="bg-white text-red-600 hover:bg-gray-100 gap-2 text-lg px-8 py-3 h-auto">
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Link href="/signup">
              <Button className="bg-white text-red-600 hover:bg-gray-100 gap-2 text-lg px-8 py-3 h-auto">
                Create Your Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 footer">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8 footer-content">
            <div className="footer-section">
              <h4 className="text-xl font-semibold mb-4">Coding Club CU</h4>
              <p className="text-gray-300">
                Building a community of developers at Chandigarh University
              </p>
            </div>
            <div className="footer-section">
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#events" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">Team</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>codingclub@culko.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Campus: Chandigarh University</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-700 text-center text-gray-300 footer-bottom">
            <p>&copy; 2025 Coding Club CU. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}








