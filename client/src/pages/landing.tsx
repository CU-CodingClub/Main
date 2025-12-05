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
                className="h-24 w-24 object-contain"
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

          <div className="flex items-center gap-3">
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
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] flex items-center justify-center hero"
        style={{
          backgroundImage: "url('/assets/images/CUCodingClubBgBanner.jpeg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center text-white max-w-4xl mx-auto px-4 hero-content">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Coding Club</h2>
          <p className="text-xl md:text-2xl mb-4">Chandigarh University's Premier Community for Developers</p>
          <p className="text-lg md:text-xl mb-8 opacity-90">Learn, Build, and Collaborate</p>
<Link href="/login">
  <Button 
    variant="outline"
    className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 text-lg px-8 py-3 h-auto font-medium transition-all duration-200"
  >
    Get Started
  </Button>
</Link>
        </div>
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
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">5+</div>
                <div className="text-sm text-gray-600">Years Running</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">2K+</div>
                <div className="text-sm text-gray-600">Past Participants</div>
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