import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Users, Crown, Star, Menu, Award } from "lucide-react";
import { useEffect, useState } from "react";

const Team = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mentors = [
    {
      name: "Prof.(Dr.) Ajay Kumar Singh",
      role: "H.O.D., SoCE",
      bio: "Chairman",
      email: "Chairman001@culko.in",
      image: "/assets/images/Dr_AjayKumarSingh.jpeg"
    },
    {
      name: "Dr. Amit Kumar Mishra",
      role: "Associate Professor",
      bio: "Coordinator",
      email: "amit.l100264@culko.in",
      image: "/assets/images/AmitKumarMishra.jpeg"
    },
    {
      name: "Dr. Vikash Mishra",
      role: "Associate Professor",
      bio: "Co-Coordinator",
      email: "vikash.l100357@culko.in",
      image: "/assets/images/Dr_VikashMishra.jpeg"
    },
    {
      name: "Dr. Manisha Jain",
      role: "Assistant Professor",
      bio: "Co-Coordinator",
      email: "manisha.l100409@culko.in",
      image: "/assets/images/Dr_ManishaJain.png"
    }
  ];

  const leadership = [
    {
      name: "Aaradhya Gupta",
      role: "President",
      bio: "BTech CSE Core",
      email: "Aaradhyagupta2108@gmail.com",
      image: "/assets/images/Aradhya.jpeg"
    },
    {
      name: "Mayank Gautam",
      role: "Vice President",
      bio: "BTech IT",
      email: "onlycash419@gmail.com",
      image: "/assets/images/MayankGautam.jpeg"
    },
        {
      name: "Shashank Pandey",
      role: "Technical Head",
      bio: "BCA HONS",
      email: "pandeyshashank039@gmail.com",
      image: "/assets/images/Shashank Pandey.jpeg"
    },
    {
      name: "Akshra Bajpai",
      role: "Technical Co-Coordinator",
      bio: "BTech IT",
      email: "aksharabajpai2@gmail.com",
      image: "/assets/images/AkshraBajpai.jpeg"
    }
  ];

  const coordinators = [
    {
      name: "Sampoorn Tripathi",
      role: "Technical Co-Coordinator",
      bio: "BTech CSE Sec D",
      email: "tripathisampoorn1@gmail.com",
      image: "/assets/images/SampoornTripathi.jpeg"
    },
    {
      name: "Paras Tiwari",
      role: "Technical Co-Coordinator",
      bio: "BTech CSE CORE",
      email: "Parastiwari264@gmail.com",
      image: "/assets/images/ParasTiwari.jpeg"
    },
    {
      name: "Kishan Verma",
      role: "Social Media Manager",
      bio: "Btech CSE AIML Sec-2",
      email: "vermakishan478@gmail.com",
      image: "/assets/images/KishanVerma.jpg"
    },
    {
      name: "Aadya Gupta",
      role: "Core Member",
      bio: "Btech CSE CORE Sec-E",
      email: "aadyagupta1408@gmail.com",
      image: "/assets/images/AadyaGupta.jpeg"
    },
    {
      name: "Mohd humza",
      role: "Core Member",
      bio: "Btech CSE CORE Sec-E",
      email: "25LBCS1305@culkomail.in",
      image: "/assets/images/MohdHumza.jpeg"
    },
    {
      name: "Mantra Shukla",
      role: "Core Member",
      bio: "Btech CSE CORE Sec-B",
      email: "Mantrashukla15@gmail.com",
      image: "/assets/images/MantraShukla.jpeg"
    },
    {
      name: "Ayan Ahmad Khan",
      role: "Social Media Coordinator",
      bio: "Btech CSE Sec-5",
      email: "25LBCS1294@culkomail.in",
      image: "/assets/images/AyanAhmadKhan.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/30 to-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <img 
                  src="/assets/images/culogo.png" 
                  alt="College Logo" 
                  className="h-14 w-14 object-contain transition-transform group-hover:scale-105"
                />
                <div className="absolute -inset-1 bg-red-100 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
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

      {/* Page Hero */}
      <section className="relative py-20 bg-gradient-to-br from-red-600 via-red-500 to-red-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-400/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Users className="h-4 w-4" />
            Meet Our Amazing Team
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Our <span className="text-red-100">Team</span>
          </h1>
          
          <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
            Meet the passionate minds behind Coding Club CU - dedicated mentors, visionary leaders, 
            and talented coordinators working together to build an exceptional tech community.
          </p>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <Crown className="h-8 w-8 text-red-600" />
              <h2 className="text-4xl font-bold text-gray-800">Faculty Mentors</h2>
              <Crown className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced faculty guiding and inspiring the next generation of developers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mentors.map((mentor, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-red-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-6 text-center relative z-10">
                  <div className="relative mx-auto mb-6">
                    <div className="w-28 h-28 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-1 shadow-lg">
                      <div className="w-full h-full bg-white rounded-xl overflow-hidden">
                        <img 
                          src={mentor.image} 
                          alt={mentor.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">{mentor.name}</h3>
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold inline-block mb-3 shadow-md">
                    {mentor.role}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{mentor.bio}</p>
                  <div className="flex items-center justify-center gap-2 text-red-600 text-sm">
                    <Mail className="h-4 w-4" />
                    <span className="break-all">{mentor.email}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <Star className="h-8 w-8 text-red-600" />
              <h2 className="text-4xl font-bold text-gray-800">Leadership Team</h2>
              <Star className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visionary students leading the club towards innovation and excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-red-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-6 text-center relative z-10">
                  <div className="relative mx-auto mb-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-400 to-red-500 rounded-2xl p-1 shadow-lg">
                      <div className="w-full h-full bg-white rounded-xl overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">{member.name}</h3>
                  <div className="bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold inline-block mb-3 shadow-md">
                    {member.role}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                  <div className="flex items-center justify-center gap-2 text-red-600 text-sm">
                    <Mail className="h-4 w-4" />
                    <span className="break-all">{member.email}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coordinators Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <Users className="h-8 w-8 text-red-600" />
              <h2 className="text-4xl font-bold text-gray-800">Coordinators</h2>
              <Users className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Talented individuals driving various initiatives and ensuring smooth operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coordinators.map((coordinator, index) => (
              <Card key={index} className="group relative overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/3 to-red-400/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-5 text-center relative z-10">
                  <div className="mx-auto mb-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-300 to-red-400 rounded-xl p-0.5 shadow-md">
                      <div className="w-full h-full bg-white rounded-lg overflow-hidden">
                        <img 
                          src={coordinator.image} 
                          alt={coordinator.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-base font-semibold text-gray-800 mb-2 leading-tight">{coordinator.name}</h3>
                  <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold inline-block mb-2">
                    {coordinator.role}
                  </div>
                  <p className="text-gray-600 text-xs mb-3 leading-relaxed">{coordinator.bio}</p>
                  <div className="flex items-center justify-center gap-1 text-red-600 text-xs">
                    <Mail className="h-3 w-3" />
                    <span className="break-all">{coordinator.email}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-400/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-300/10 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join our passionate team of developers and innovators. Together, we can build amazing 
            projects, learn new technologies, and create a lasting impact in the tech community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Join Our Team
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold backdrop-blur-sm">
                View Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="footer-section">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Coding Club CU</h4>
                  <p className="text-red-400 text-sm">Chandigarh University</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Building a vibrant community of developers, innovators, and tech enthusiasts 
                at Chandigarh University. Together, we learn, build, and grow.
              </p>
            </div>
            
            <div className="footer-section">
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
            
            <div className="footer-section">
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
          
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500">
              &copy; 2025 Coding Club CU. All rights reserved. | Built with ❤️ by our amazing team
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Team;





