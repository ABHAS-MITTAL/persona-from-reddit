import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  User, 
  Download, 
  ExternalLink, 
  Loader2, 
  Brain,
  Target,
  Heart,
  AlertTriangle,
  Quote,
  FileText
} from 'lucide-react';

interface RedditData {
  posts: Array<{
    title: string;
    content: string;
    subreddit: string;
    score: number;
    url: string;
  }>;
  comments: Array<{
    content: string;
    subreddit: string;
    score: number;
    url: string;
  }>;
}

interface PersonaData {
  name: string;
  demographics: {
    age: string;
    occupation: string;
    location: string;
    status: string;
  };
  personality: {
    introvert_extrovert: number;
    intuition_sensing: number;
    feeling_thinking: number;
    perceiving_judging: number;
  };
  motivations: {
    convenience: number;
    wellness: number;
    speed: number;
    preferences: number;
    comfort: number;
    needs: number;
  };
  behaviors: string[];
  goals: string[];
  frustrations: string[];
  quote: string;
  citations: Record<string, string[]>;
}

export default function PersonaGenerator() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [redditData, setRedditData] = useState<RedditData | null>(null);
  const [persona, setPersona] = useState<PersonaData | null>(null);

  const extractUsername = (url: string): string => {
    const match = url.match(/reddit\.com\/user\/([^\/]+)/);
    return match ? match[1] : 'Anonymous User';
  };

  const simulateRedditScraping = async (username: string): Promise<RedditData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock Reddit data for demonstration
    return {
      posts: [
        {
          title: "Finally got my dream job in tech!",
          content: "After months of studying and applying, I landed a software engineering role at a startup. The work-life balance is amazing and I love the collaborative culture.",
          subreddit: "careerguidance",
          score: 245,
          url: `https://reddit.com/r/careerguidance/post1`
        },
        {
          title: "Best coffee shops for remote work?",
          content: "I work remotely most days and looking for good spots with reliable wifi and comfortable seating. Prefer places that aren't too noisy.",
          subreddit: "digitalnomad",
          score: 89,
          url: `https://reddit.com/r/digitalnomad/post2`
        }
      ],
      comments: [
        {
          content: "I prefer working from home because I can control my environment better. Less distractions and I can set up my workspace exactly how I like it.",
          subreddit: "productivity",
          score: 156,
          url: `https://reddit.com/r/productivity/comment1`
        },
        {
          content: "As an introvert, I find large team meetings exhausting. I much prefer one-on-one discussions or async communication.",
          subreddit: "introvert",
          score: 78,
          url: `https://reddit.com/r/introvert/comment2`
        }
      ]
    };
  };

  const generatePersona = (data: RedditData, username: string): PersonaData => {
    // AI-powered analysis would happen here
    // For now, using mock data based on the Reddit content
    return {
      name: username.charAt(0).toUpperCase() + username.slice(1),
      demographics: {
        age: "26-30",
        occupation: "Software Engineer",
        location: "Urban Area",
        status: "Single"
      },
      personality: {
        introvert_extrovert: 25, // More introverted
        intuition_sensing: 70,   // More intuitive
        feeling_thinking: 45,    // Balanced
        perceiving_judging: 60   // More judging
      },
      motivations: {
        convenience: 85,
        wellness: 70,
        speed: 60,
        preferences: 90,
        comfort: 95,
        needs: 75
      },
      behaviors: [
        "Prefers remote work environments for better focus and control",
        "Values work-life balance and collaborative company culture",
        "Seeks out quiet, comfortable spaces for productivity",
        "Actively researches and plans career development"
      ],
      goals: [
        "Maintain a healthy work-life balance while advancing career",
        "Find optimal work environments that support productivity",
        "Build professional network in the tech industry",
        "Continuously learn and grow technical skills"
      ],
      frustrations: [
        "Large group meetings and noisy work environments",
        "Unclear communication and lack of structure",
        "Limited control over work environment in traditional offices",
        "Difficulty finding suitable remote work locations"
      ],
      quote: "I work best when I can control my environment and have the flexibility to work in a way that suits my personality.",
      citations: {
        "Prefers remote work": [`r/productivity comment: "${data.comments[0].content}"`],
        "Values work-life balance": [`r/careerguidance post: "${data.posts[0].content}"`],
        "Introverted personality": [`r/introvert comment: "${data.comments[1].content}"`],
        "Seeks quiet environments": [`r/digitalnomad post: "${data.posts[1].content}"`]
      }
    };
  };

  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast.error('Please enter a Reddit profile URL');
      return;
    }

    if (!url.includes('reddit.com/user/')) {
      toast.error('Please enter a valid Reddit user profile URL');
      return;
    }

    setLoading(true);
    try {
      const username = extractUsername(url);
      toast.success(`Analyzing profile: ${username}`);
      
      const data = await simulateRedditScraping(username);
      setRedditData(data);
      
      const personaData = generatePersona(data, username);
      setPersona(personaData);
      
      toast.success('Persona generated successfully!');
    } catch (error) {
      toast.error('Failed to analyze profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPersona = () => {
    if (!persona) return;

    const text = generatePersonaText(persona);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${persona.name}_persona.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Persona downloaded successfully!');
  };

  const generatePersonaText = (persona: PersonaData): string => {
    return `
REDDIT USER PERSONA: ${persona.name}

=== DEMOGRAPHICS ===
Age: ${persona.demographics.age}
Occupation: ${persona.demographics.occupation}
Location: ${persona.demographics.location}
Status: ${persona.demographics.status}

=== PERSONALITY TRAITS ===
Introvert ←→ Extrovert: ${persona.personality.introvert_extrovert}%
Intuition ←→ Sensing: ${persona.personality.intuition_sensing}%
Feeling ←→ Thinking: ${persona.personality.feeling_thinking}%
Perceiving ←→ Judging: ${persona.personality.perceiving_judging}%

=== MOTIVATIONS ===
Convenience: ${persona.motivations.convenience}%
Wellness: ${persona.motivations.wellness}%
Speed: ${persona.motivations.speed}%
Preferences: ${persona.motivations.preferences}%
Comfort: ${persona.motivations.comfort}%
Needs: ${persona.motivations.needs}%

=== BEHAVIORS & HABITS ===
${persona.behaviors.map(behavior => `• ${behavior}`).join('\n')}

=== GOALS & NEEDS ===
${persona.goals.map(goal => `• ${goal}`).join('\n')}

=== FRUSTRATIONS ===
${persona.frustrations.map(frustration => `• ${frustration}`).join('\n')}

=== KEY QUOTE ===
"${persona.quote}"

=== CITATIONS ===
${Object.entries(persona.citations).map(([key, sources]) => 
  `${key}:\n${sources.map(source => `  - ${source}`).join('\n')}`
).join('\n\n')}

Generated by Reddit Persona Generator
    `.trim();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-hero rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Reddit Persona Generator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze Reddit profiles to generate detailed user personas with behavioral insights and citations
          </p>
        </div>

        {/* Input Section */}
        <Card className="max-w-2xl mx-auto mb-8 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Analysis
            </CardTitle>
            <CardDescription>
              Enter a Reddit user profile URL to generate a comprehensive persona
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="https://www.reddit.com/user/username/"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleAnalyze}
                disabled={loading}
                className="bg-gradient-hero text-white hover:opacity-90"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Profile'
                )}
              </Button>
            </div>
            
            {loading && (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Analyzing Reddit activity...</div>
                <Progress value={60} className="w-full" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {persona && (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header with Download */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Persona: {persona.name}</h2>
              <Button onClick={downloadPersona} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download Persona
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Demographics & Quote */}
              <div className="space-y-6">
                <Card className="bg-gradient-card shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Demographics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Age</div>
                      <div className="font-semibold">{persona.demographics.age}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Occupation</div>
                      <div className="font-semibold">{persona.demographics.occupation}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Location</div>
                      <div className="font-semibold">{persona.demographics.location}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Status</div>
                      <div className="font-semibold">{persona.demographics.status}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-reddit-orange/5 border-reddit-orange/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-reddit-orange">
                      <Quote className="h-5 w-5" />
                      Key Quote
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="italic text-lg">
                      "{persona.quote}"
                    </blockquote>
                  </CardContent>
                </Card>
              </div>

              {/* Middle Column - Personality & Motivations */}
              <div className="space-y-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-accent" />
                      Personality
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(persona.personality).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{key.replace('_', ' ← → ')}</span>
                          <span>{value}%</span>
                        </div>
                        <Progress value={value} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-reddit-blue" />
                      Motivations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(persona.motivations).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{key}</span>
                          <span>{value}%</span>
                        </div>
                        <Progress value={value} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Behaviors, Goals, Frustrations */}
              <div className="space-y-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-green-600" />
                      Behaviors & Habits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {persona.behaviors.map((behavior, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{behavior}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Goals & Needs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {persona.goals.map((goal, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      Frustrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {persona.frustrations.map((frustration, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{frustration}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Citations Section */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  Citations & Sources
                </CardTitle>
                <CardDescription>
                  Evidence from Reddit posts and comments used to build this persona
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(persona.citations).map(([insight, sources]) => (
                  <div key={insight} className="border-l-4 border-primary/20 pl-4">
                    <div className="font-semibold text-sm mb-2">{insight}</div>
                    <div className="space-y-1">
                      {sources.map((source, index) => (
                        <div key={index} className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                          {source}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}