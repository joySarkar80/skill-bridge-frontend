import React from 'react';
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Users, BookOpen, ShieldCheck, GraduationCap, CheckCircle2 } from "lucide-react";

const AboutUs = () => {
  const stats = [
    { label: "Active Students", value: "10k+", icon: Users },
    { label: "Expert Tutors", value: "500+", icon: GraduationCap },
    { label: "Total Sessions", value: "25k+", icon: BookOpen },
    { label: "Satisfaction Rate", value: "99%", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-primary">
            ProMentor 🎓
          </h1>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground mb-4 italic">
            "Connect with Expert Tutors, Learn Anything"
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            ProMentor is a premier full-stack platform designed to bridge the gap between ambitious learners and world-class educators. We simplify the process of finding the right mentor so you can focus on what matters most: mastering new skills.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
            <p className="text-muted-foreground text-lg">
              At ProMentor, we aim to democratize education by providing a seamless, transparent, and efficient marketplace for tutoring. Whether you're a student looking to ace an exam or a professional aiming to level up, we provide the tools to make it happen.
            </p>
            <div className="space-y-4">
              {[
                "Instant booking with real-time availability",
                "Verified profiles and transparent review systems",
                "Integrated dashboard for tracking progress",
                "Diverse range of subjects and categories"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="border-none shadow-md bg-card hover:bg-primary/5 transition-colors">
                <CardContent className="p-8 text-center">
                  <stat.icon className="mx-auto mb-4 text-primary" size={40} />
                  <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our platform is built to cater to three distinct roles, ensuring a smooth experience for everyone involved in the learning ecosystem.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            <Card className="p-6 bg-card">
              <h3 className="text-xl font-bold mb-3 text-primary">Students</h3>
              <p className="text-muted-foreground">
                Browse through expert profiles, book sessions instantly, and manage your learning schedule through a personalized dashboard.
              </p>
            </Card>
            <Card className="p-6 bg-card">
              <h3 className="text-xl font-bold mb-3 text-primary">Tutors</h3>
              <p className="text-muted-foreground">
                Share your expertise, set your own availability slots, track your earnings, and grow your professional teaching brand.
              </p>
            </Card>
            <Card className="p-6 bg-card">
              <h3 className="text-xl font-bold mb-3 text-primary">Admins</h3>
              <p className="text-muted-foreground">
                Ensuring platform integrity by moderating content, managing user statuses, and overseeing all booking analytics.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold">Ready to Start Your Journey?</h2>
          <p className="text-lg opacity-90">
            Join thousands of users who are already learning and teaching on ProMentor. Sign up today and take the first step towards excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="secondary" className="px-10 font-bold">
              Join as a Student
            </Button>
            <Button size="lg" variant="outline" className="px-10 font-bold bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Become a Tutor
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;