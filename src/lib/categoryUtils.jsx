import React from 'react';
    import { ListChecks, BookOpen, Globe, Briefcase, Brain, Zap, BarChart3 } from 'lucide-react';

    export const getCategoryIcon = (categoryKey) => {
        switch (categoryKey) {
          case 'general': return <BookOpen className="mr-2 h-5 w-5 text-primary" />;
          case 'situations': return <Globe className="mr-2 h-5 w-5 text-primary" />;
          case 'level': return <Brain className="mr-2 h-5 w-5 text-primary" />;
          case 'professional': return <Briefcase className="mr-2 h-5 w-5 text-primary" />;
          case 'phrasalVerbs': return <Zap className="mr-2 h-5 w-5 text-primary" />;
          case 'entrepreneurshipCategory': return <BarChart3 className="mr-2 h-5 w-5 text-primary" />;
          default: return <ListChecks className="mr-2 h-5 w-5 text-primary" />;
        }
      };