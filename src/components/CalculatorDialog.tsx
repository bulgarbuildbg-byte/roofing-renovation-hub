import { useState } from "react";
import { Calculator } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PriceCalculator from "@/components/PriceCalculator";
import SolarCalculator from "@/components/SolarCalculator";

interface CalculatorDialogProps {
  type?: "roof" | "solar";
}

const CalculatorDialog = ({ type = "roof" }: CalculatorDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-white/80 hover:text-white underline underline-offset-4 text-sm md:text-base transition-colors mt-2"
      >
        <Calculator className="w-4 h-4" />
        Изчисли цена
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 border-0">
          <DialogTitle className="sr-only">
            {type === "solar" ? "Соларен Калкулатор" : "Калкулатор за Покриви"}
          </DialogTitle>
          {type === "solar" ? (
            <SolarCalculator />
          ) : (
            <PriceCalculator variant="compact" />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalculatorDialog;
