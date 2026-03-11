import { Check } from "lucide-react";

interface Props {
  steps: string[];
  current: number;
}

const BookingStepIndicator = ({ steps, current }: Props) => {
  return (
    <div className="flex items-center gap-1 mt-4 mb-2 overflow-x-auto">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;

        return (
          <div key={label} className="flex items-center gap-1 flex-shrink-0">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                isDone
                  ? "bg-primary text-primary-foreground"
                  : isActive
                  ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isDone ? <Check className="w-3.5 h-3.5" /> : stepNum}
            </div>
            <span
              className={`text-xs hidden sm:inline ${
                isActive ? "text-foreground font-semibold" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`w-4 h-0.5 mx-0.5 ${
                  isDone ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookingStepIndicator;
