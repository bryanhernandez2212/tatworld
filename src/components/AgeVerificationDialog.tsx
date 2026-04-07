import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ShieldCheck, ShieldAlert } from "lucide-react";

interface Props {
  open: boolean;
  onConfirm: (isMinor: boolean) => void;
}

const AgeVerificationDialog = ({ open, onConfirm }: Props) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-md bg-background border-border">
        <AlertDialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-7 w-7 text-primary" />
          </div>
          <AlertDialogTitle className="text-xl">Verificación de Edad</AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            Para ofrecerte la mejor experiencia necesitamos confirmar tu edad.
            ¿Eres mayor de 18 años?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col gap-3 sm:flex-col sm:space-x-0">
          <AlertDialogAction
            onClick={() => onConfirm(false)}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            Sí, soy mayor de 18 años
          </AlertDialogAction>
          <AlertDialogAction
            onClick={() => onConfirm(true)}
            className="w-full bg-secondary text-foreground hover:bg-secondary/80 border border-border"
          >
            <ShieldAlert className="w-4 h-4 mr-2" />
            No, soy menor de 18 años
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AgeVerificationDialog;
