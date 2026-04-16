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
        className="inline-flex items-center gap-1.5 bg-[#F3F6FA] hover:bg-[#E8EDF4] text-slate-700 border border-blue-300/60 hover:border-blue-400 rounded-full text-xs md:text-sm font-medium h-8 md:h-9 px-3 md:px-3.5 transition-colors cursor-pointer"
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
