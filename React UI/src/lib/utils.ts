import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatAsMarkdown = (text: string): string => {
  let formatted = text
    
    .replace(/(?:^|\n)[\-\*\•]\s+/g, '\n- ')
    .replace(/(?:^|\n)\d+\.\s+/g, '\n- ')
    .replace(/\. +/g, '.\n');

  return formatted.trim();
};

export const generateMarkdownFromSections = (sections: { [heading: string]: string }) => {
  return Object.entries(sections)
    .map(([heading, content]) => `# ${heading}\n\n${content.trim()}`)
    .join('\n\n');
};
