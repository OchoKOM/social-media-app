"use client"

import { useEffect, useState } from 'react';
import { TimeFormatter } from "@/lib/formatters";

interface TimeProps{
    time: Date;
}

export default function Time({time}: TimeProps) {
    const [language, setLanguage] = useState<string>('en-US');
    
      useEffect(() => {
          setLanguage(navigator.language || 'en-US');
      }, []);
    const currentDate = new Date();
    const difference = Math.abs(currentDate.getTime() - time.getTime());
    
    
    const timeFormatter = new  TimeFormatter(time, language, true, false);

    const formattedTime = timeFormatter.formatRelativeTime();
    
    return <time>{formattedTime}</time>
};
