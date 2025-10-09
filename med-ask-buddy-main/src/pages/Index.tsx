import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatInterface from "@/components/ChatInterface";
import AboutSection from "@/components/AboutSection";
import { Activity } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle dark">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-3 bg-primary rounded-xl shadow-medium">
              <Activity className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-medical bg-clip-text text-transparent">
              MedAssist AI
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Your AI-powered symptom analysis assistant
          </p>
        </header>

        <Tabs defaultValue="chat" className="w-full animate-slide-up">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="chat" className="text-lg">
              Chat
            </TabsTrigger>
            <TabsTrigger value="about" className="text-lg">
              About
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-0">
            <ChatInterface />
          </TabsContent>
          
          <TabsContent value="about" className="mt-0">
            <AboutSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
