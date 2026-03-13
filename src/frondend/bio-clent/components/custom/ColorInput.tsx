import React from "react";
import { Pipette } from "lucide-react";

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative flex items-center group">
      <div
        className="absolute left-3 w-5 h-5 rounded-full border border-white/20 shadow-inner cursor-pointer"
        style={{ backgroundColor: value }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#12161d] border border-white/10 rounded-xl py-3 pl-11 pr-10 text-[11px] font-mono text-white focus:outline-none focus:border-blue-500/50 transition-all"
      />
      <Pipette className="absolute right-3 size-4 text-slate-500 group-hover:text-white transition-colors cursor-pointer" />
    </div>
  </div>
);

export default ColorInput;

