import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FeedbackSystemProps {
  show: boolean;
  type: "success" | "error";
  feedbackMode: "visual" | "audio" | "both";
}

export const FeedbackSystem = ({ show, type, feedbackMode }: FeedbackSystemProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (show && (feedbackMode === "audio" || feedbackMode === "both")) {
      playSound(type);
    }
  }, [show, type, feedbackMode]);

  const playSound = (soundType: "success" | "error") => {
    // Create audio context for simple beep sounds
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (soundType === "success") {
      // Happy ascending notes
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    } else {
      // Lower descending note
      oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(250, audioContext.currentTime + 0.1);
    }

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  if (!show || feedbackMode === "audio") return null;

  return (
    <div
      className={cn(
        "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50",
        "animate-scale-in pointer-events-none"
      )}
    >
      <div
        className={cn(
          "text-8xl drop-shadow-2xl",
          type === "success" && "animate-bounce"
        )}
      >
        {type === "success" ? "🎉" : "❌"}
      </div>
    </div>
  );
};
