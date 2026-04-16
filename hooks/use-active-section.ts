import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      // Find the section that is currently in view
      // We look for the one that is closest to the top but not past it minus the offset
      const currentSection = sectionIds.reduce((acc, id) => {
        const element = document.getElementById(id);
        if (!element) return acc;

        const rect = element.getBoundingClientRect();
        // If the top of the element is within the offset from the top of the viewport
        if (rect.top <= offset) {
          // If this is the furthest one down (the one currently being viewed)
          if (!acc || rect.top > document.getElementById(acc)!.getBoundingClientRect().top) {
            return id;
          }
        }
        return acc;
      }, '');

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset, activeSection]);

  return activeSection;
}
