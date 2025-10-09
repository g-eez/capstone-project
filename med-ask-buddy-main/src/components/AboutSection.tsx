import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Brain, Database, AlertCircle } from "lucide-react";

const AboutSection = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-medium border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="w-6 h-6 text-primary" />
            About MedAssist AI
          </CardTitle>
          <CardDescription className="text-base">
            An intelligent symptom analysis system powered by advanced AI technology
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            MedAssist AI is an intelligent chatbot designed to help you understand potential 
            medical conditions based on the symptoms you're experiencing. Using advanced 
            retrieval-augmented generation (RAG) technology, our system analyzes your input 
            against a comprehensive medical database to provide relevant information about 
            possible conditions and treatments.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-medium border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-secondary" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">1. Symptom Input</h3>
            <p className="text-muted-foreground">
              Describe your symptoms in natural language. Be as detailed as possible about 
              what you're experiencing.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">2. AI Analysis</h3>
            <p className="text-muted-foreground">
              Our system uses vector embeddings to search through a medical knowledge base, 
              finding the most relevant information for your symptoms.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">3. Response Generation</h3>
            <p className="text-muted-foreground">
              An AI model generates a comprehensive response listing potential conditions 
              and available treatment information.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-medium border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Guidelines for Use
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul className="list-disc list-inside space-y-2 text-foreground">
            <li>Be specific and detailed when describing your symptoms</li>
            <li>Include information about symptom duration and severity</li>
            <li>Mention any relevant medical history if applicable</li>
            <li>Use the information as a starting point for discussion with healthcare professionals</li>
            <li>Don't use this tool for emergency medical situations</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="shadow-medium border-border bg-destructive/10 border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="w-5 h-5" />
            Important Medical Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-foreground">
          <p className="font-semibold">
            This tool is NOT a replacement for professional medical care.
          </p>
          <p>
            MedAssist AI provides educational information based on symptom analysis, but it 
            cannot diagnose medical conditions or prescribe treatments. Always consult with 
            qualified healthcare professionals for:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Accurate medical diagnosis</li>
            <li>Treatment recommendations</li>
            <li>Prescription medications</li>
            <li>Emergency medical situations</li>
          </ul>
          <p className="mt-4 font-semibold">
            If you're experiencing a medical emergency, call your local emergency services 
            immediately (911 in the US, 999 in the UK, 112 in the EU).
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-medium border-border">
        <CardHeader>
          <CardTitle>Technical Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
          <p>
            <strong className="text-foreground">Technology:</strong> Retrieval-Augmented Generation (RAG)
          </p>
          <p>
            <strong className="text-foreground">Data Source:</strong> Curated medical symptom and treatment database
          </p>
          <p>
            <strong className="text-foreground">Processing:</strong> Vector embeddings with semantic search
          </p>
          <p>
            <strong className="text-foreground">Backend:</strong> n8n workflow automation
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutSection;
