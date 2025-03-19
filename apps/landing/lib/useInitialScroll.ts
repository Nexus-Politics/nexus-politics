import { useEffect } from "react";

/**
 * A hook that ensures the page starts at the top on initial load
 * and prevents unwanted scrolling during page initialization
 */
export default function useInitialScroll() {
  useEffect(() => {
    // Force scroll to top initially
    window.scrollTo(0, 0);

    // Create a temporary listener to prevent scrolling during initialization
    const preventScroll = (e: Event) => {
      window.scrollTo(0, 0);
    };

    // Add event listener
    window.addEventListener("scroll", preventScroll);

    // Remove event listener after a short delay
    const timeoutId = setTimeout(() => {
      window.removeEventListener("scroll", preventScroll);
    }, 1000); // Remove after 1 second

    return () => {
      // Clean up
      window.removeEventListener("scroll", preventScroll);
      clearTimeout(timeoutId);
    };
  }, []);
}
