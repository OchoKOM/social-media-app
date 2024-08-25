import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { TimeFormatter } from "./formatters";
import { useEffect, useState } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}