"use client"

import { useEffect, useState } from 'react';
import { TimeFormatter } from "@/lib/formatters";

interface TimeProps{
    time: Date;
    relative: boolean;
}

export default function Time({time, relative}: TimeProps) {
    const [language, setLanguage] = useState<string>('en-US');
    
      useEffect(() => {
          setLanguage(navigator.language || 'en-US');
      }, []);
    
    const timeFormatter = new  TimeFormatter(time, language, true, false);

    const formattedTime = relative ? timeFormatter.formatRelativeTime() : timeFormatter.formatFullTime() ;
    
    return <time>{formattedTime}</time>
};
