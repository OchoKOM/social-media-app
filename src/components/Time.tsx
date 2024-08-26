"use client"

import { useEffect, useState } from 'react';
import { TimeFormatter } from "@/lib/formatters";

interface TimeProps{
    time: Date;
    relative?: boolean;
    full?: boolean;
}

export default function Time({time, relative, full}: TimeProps) {
    const [language, setLanguage] = useState<string>('fr-FR');
    
      useEffect(() => {
          setLanguage(navigator.language || 'fr-FR');
      }, []);
    
    const timeFormatter = new  TimeFormatter(time, language, true, full);

    const formattedTime = relative ? timeFormatter.formatRelativeTime() : timeFormatter.formatTime() ;
    
    return <time>{formattedTime}</time>
};
