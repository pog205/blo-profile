import React, { useState } from "react";
import { Pipette } from "lucide-react";
import ColorPickerModal from "../Module";

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => {
  const [isPickingColor, setIsPickingColor] = useState(false);

  // Sự kiện hút màu bằng Pipette
  const handlePipetteClick = async () => {
    if ('EyeDropper' in window) {
      const eyeDropper = new (window as any).EyeDropper();
      try {
        const result = await eyeDropper.open();
        onChange(result.sRGBHex);
      } catch (e) {
        console.log("Hủy hút màu");
      }
    } else {
      alert("Trình duyệt không hỗ trợ hút màu ngoài màn hình!");
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
        {label}
      </label>
      
      <div className="relative flex items-center group">
        
        {/* Bấm vào Vòng tròn màu để BẬT isPickingColor = true */}
        <div
          onClick={() => setIsPickingColor(true)}
          className="absolute left-3 w-5 h-5 rounded-full border border-white/20 shadow-inner cursor-pointer z-10"
          style={{ backgroundColor: value }}
          title="Mở bảng chọn màu"
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
          onClick={handlePipetteClick}
          className="absolute right-3 size-4 text-slate-500 group-hover:text-white transition-colors cursor-pointer z-10" 
          title="Hút màu ngoài màn hình"
        />
      </div>

      {/* GỌI MODAL RA ĐÂY: Nếu isPickingColor là true thì mới hiển thị */}
      {isPickingColor && (
        <ColorPickerModal
          initialColor={value}
          onSave={(newColor) => onChange(newColor)} // Truyền màu mới ra ngoài form
          onClosed={() => setIsPickingColor(false)} // Tắt modal
        />
      )}

    </div>
  );
};

export default ColorInput;