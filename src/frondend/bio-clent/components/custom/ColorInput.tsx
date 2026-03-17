import React, { useRef } from "react";
import { Pipette } from "lucide-react";
import { useState } from 'react';
interface ColorInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => {
  // Dùng useRef để "giấu" cái thẻ input bảng màu mặc định
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const [isPickingColor, setIsPickingColor] = useState(false);
  

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
        {label}
      </label>
      
      <div className="relative flex items-center group">
        
        {/* SỰ KIỆN 2: Bấm vào Vòng tròn màu để MỞ BẢNG CHỌN MÀU */}
        <div
          onClick={() => colorPickerRef.current?.click()} // Kích hoạt input ẩn
          className="absolute left-3 w-5 h-5 rounded-full border border-white/20 shadow-inner cursor-pointer z-10"
          style={{ backgroundColor: value }}
          title="Mở bảng chọn màu"
        />

        {/* Đây là input bảng màu của HTML, bị ẩn đi (hidden) */}
        <input
          type="color"
          ref={colorPickerRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="hidden" 
        />

        {/* Ô nhập Text mã HEX */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#12161d] border border-white/10 rounded-xl py-3 pl-11 pr-10 text-[11px] font-mono text-white focus:outline-none focus:border-blue-500/50 transition-all"
        />
        
        {/* Icon Pipette hút màu */}
        <Pipette 
          onClick={() => setIsPickingColor(true)} // Gắn sự kiện hút màu vào đây
          className="absolute right-3 size-4 text-slate-500 group-hover:text-white transition-colors cursor-pointer z-10" 
          title="Hút màu ngoài màn hình"
        />
        
      </div>
    </div>
  );
};

export default ColorInput;