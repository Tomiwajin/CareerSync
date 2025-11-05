"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Brain,
  TrendingUp,
  FolderUp,
  Menu,
  Rocket,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Type declarations for Rive
declare global {
  interface Window {
    rive?: {
      Rive: any;
      Layout: any;
      Fit: any;
      Alignment: any;
    };
  }
}

const RiveRocket = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const riveInstanceRef = useRef<any>(null);

  useEffect(() => {
    const loadRive = async () => {
      // Load Rive runtime
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@rive-app/canvas@2.7.0";
      script.async = true;

      script.onload = () => {
        if (canvasRef.current && window.rive) {
          riveInstanceRef.current = new window.rive.Rive({
            src: "/rocket.riv",
            canvas: canvasRef.current,
            autoplay: true,
            stateMachines: "State Machine 1",
            layout: new window.rive.Layout({
              fit: window.rive.Fit.Contain,
              alignment: window.rive.Alignment.Center,
            }),
            onLoad: () => {
              riveInstanceRef.current?.resizeDrawingSurfaceToCanvas();
            },
          });
        }
      };

      document.body.appendChild(script);
    };

    loadRive();

    return () => {
      if (riveInstanceRef.current) {
        riveInstanceRef.current.cleanup();
      }
    };
  }, []);

  return (
    <motion.div
      className="absolute pointer-events-none z-0"
      initial={{ x: "-20%", y: "50%" }}
      animate={{
        x: ["120%"],
        y: ["50%", "30%", "50%"],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
        y: {
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={{
        width: "150px",
        height: "150px",
        transform: "rotate(-45deg)",
      }}
    >
      <canvas
        ref={canvasRef}
        width="150"
        height="150"
        style={{ width: "100%", height: "100%" }}
      />
    </motion.div>
  );
};

const MobileSidebar = () => {
  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2 rounded-md hover:bg-gray-800">
            <Menu className="w-6 h-6 text-white" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="bg-black text-white border-gray-800"
        >
          <SheetHeader>
            <SheetTitle className="text-lg font-bold mb-4">
              CareerSync
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-6 mt-6 p-4">
            <Link
              href="#features"
              className="flex items-center gap-3 hover:text-gray-300 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              <span>Features</span>
            </Link>

            <Link
              href="#how-it-works"
              className="flex items-center gap-3 hover:text-gray-300 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>How It Works</span>
            </Link>

            <Link
              href="https://github.com/Tomiwajin/Gmail-Job-Tracking-tool.git"
              target="_blank"
              className="flex items-center gap-3 hover:text-gray-300 transition-colors"
            >
              <Brain className="w-5 h-5" />
              <span>GitHub</span>
            </Link>

            <Link
              href="/updates"
              className="flex items-center gap-3 hover:text-gray-300 transition-colors"
            >
              <Rocket className="w-5 h-5" />
              <span>Get Started</span>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white w-screen">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="/favicon-32x32.png"
                  alt="Logo"
                  width={32}
                  height={32}
                />
              </motion.div>
              <h1 className="text-xl font-bold gradient-text">CareerSync</h1>
            </motion.div>

            {/* Desktop Links */}
            <div className="hidden sm:flex items-center space-x-6">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                href="#features"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Features
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                href="#how-it-works"
                className="text-gray-400 hover:text-white transition-colors"
              >
                How It Works
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                href="https://github.com/Tomiwajin/Gmail-Job-Tracking-tool.git"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
              >
                GitHub
              </motion.a>
            </div>

            {/* Mobile Sidebar */}
            <MobileSidebar />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="heroGrid relative overflow-hidden">
        <RiveRocket />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-400 mb-4"
            >
              Tired of manually tracking job updates?
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              <span className="gradientText">Let AI Handle</span>
              <br />
              <span className="text-white">Your Job Search</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Automatically track and organize your job applications using
              AI-powered email analysis. Connect your Gmail and let CareerSync
              do the heavy lifting.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10"
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="px-8 py-3 bg-gray-200 text-black font-semibold rounded-lg hover:bg-gray-300 hover:-translate-y-0.5 transition-all duration-300 glowEffect">
                  Watch Demo
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  className="px-8 py-3 bg-transparent text-white border border-gray-600 font-semibold rounded-lg hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Link href="/updates">Get Started for Free</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        <ShootingStars />
        <StarsBackground />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold gradientText mb-4">
              Smart Job Application Tracking
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              AI-powered email classification automatically organizes your job
              search communications into actionable insights
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Brain,
                color: "blue",
                bgClass: "bg-blue-500/20",
                iconClass: "bg-blue-400",
                title: "AI Email Classification",
                desc: "Automatically identifies and categorizes job-related emails: applications, rejections, interviews, offers",
              },
              {
                icon: TrendingUp,
                color: "green",
                bgClass: "bg-green-500/20",
                iconClass: "bg-green-400",
                title: "Visual Analytics",
                desc: "Track your job search progress with detailed charts showing application rates, interview conversion, and success metrics",
              },
              {
                icon: FolderUp,
                color: "purple",
                bgClass: "bg-purple-500/20",
                iconClass: "bg-purple-400",
                title: "Export & Organize",
                desc: "Export your application data to CSV, Excel, or PDF. Filter by company, status, or date range for better organization",
              },
              {
                icon: Sparkles,
                color: "orange",
                bgClass: "bg-orange-500/20",
                iconClass: "bg-orange-400",
                title: "Privacy First",
                desc: "Completely stateless - no data stored on our servers. Open source and transparent. Your privacy is guaranteed.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={featureVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="featureCard p-6 rounded-xl"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-12 h-12 ${feature.bgClass} rounded-lg flex items-center justify-center mb-4`}
                >
                  <feature.icon
                    className={`w-6 h-6 ${feature.iconClass} rounded`}
                  />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 lg:py-32 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold gradientText mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get started in minutes with our simple 3-step process
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                num: "1",
                color: "blue",
                bgClass: "bg-blue-500/20",
                textClass: "text-blue-400",
                title: "Connect Gmail",
                desc: "Securely connect your Gmail account to access your job-related emails",
              },
              {
                num: "2",
                color: "green",
                bgClass: "bg-green-500/20",
                textClass: "text-green-400",
                title: "AI Processing",
                desc: "Our AI scans and classifies your emails, extracting company names, roles, and application status",
              },
              {
                num: "3",
                color: "purple",
                bgClass: "bg-purple-500/20",
                textClass: "text-purple-400",
                title: "Track & Analyze",
                desc: "View your organized job applications, track progress, and export data for further analysis",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 ${step.bgClass} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <span className={`text-2xl font-bold ${step.textClass}`}>
                    {step.num}
                  </span>
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-auto bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2025 CareerSync. All rights reserved.
            </div>
            <div className="text-sm text-muted-foreground">
              🚀 Built by Tomiwa Jinadu | Made to elevate your experience
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <a
                href="https://github.com/Tomiwajin/job-app-tracker-gmail"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
