import { useMemo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, X } from "lucide-react";
import { SERVICE_CATEGORIES, serviceCategoryLabel } from "@/lib/serviceCategories";

interface Props {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}

export default function MultiServiceSelect({ value, onChange, placeholder = "Изберете услуги..." }: Props) {
  const grouped = useMemo(() => {
    const map = new Map<string, typeof SERVICE_CATEGORIES>();
    SERVICE_CATEGORIES.forEach((c) => {
      if (!map.has(c.group)) map.set(c.group, [] as any);
      (map.get(c.group) as any).push(c);
    });
    return Array.from(map.entries());
  }, []);

  const toggle = (v: string) => {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };

  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between font-normal">
            <span className="truncate">
              {value.length === 0 ? placeholder : `${value.length} избрани`}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-0 max-h-[400px] overflow-auto" align="start">
          {grouped.map(([group, items]) => (
            <div key={group} className="p-2 border-b last:border-0">
              <p className="text-xs font-semibold text-muted-foreground px-2 py-1">{group}</p>
              {items.map((c) => (
                <label key={c.value} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer text-sm">
                  <Checkbox checked={value.includes(c.value)} onCheckedChange={() => toggle(c.value)} />
                  <span>{c.label}</span>
                </label>
              ))}
            </div>
          ))}
        </PopoverContent>
      </Popover>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((v) => (
            <Badge key={v} variant="secondary" className="gap-1">
              {serviceCategoryLabel(v)}
              <button onClick={() => toggle(v)} className="hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
