import { useState } from 'react'
import { HexColorPicker } from 'react-colorful' // ĐỔI SANG DÙNG HEX CHO NHÀN
import { X } from 'lucide-react'

interface ColorPickerModalProps {
  initialColor?: string
  onSave: (color: string) => void // Thêm prop này để đẩy màu ra
  onClosed?: () => void
}

const ColorPickerModal = ({
  initialColor = '#A25652',
  onSave,
  onClosed,
}: ColorPickerModalProps) => {
  

  // Dùng tempColor cho UI, chỉ save khi mouse up
  const [tempColor, setTempColor] = useState(initialColor)

  const handleColorChange = (newHex: string) => {
    setTempColor(newHex) // chỉ update UI
  }

  const handleMouseUp = () => {
    onSave(tempColor) // chỉ gọi 1 lần khi thả chuột
  }

  // Hàm tính màu chữ tương phản (Giữ nguyên của bạn)
  function getContrastTextColor(hexColor: string): string {
    if (!/^#([0-9A-Fa-f]{6})$/.test(hexColor)) return '#ffffff'
    const r = parseInt(hexColor.slice(1, 3), 16)
    const g = parseInt(hexColor.slice(3, 5), 16)
    const b = parseInt(hexColor.slice(5, 7), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5 ? '#000000' : '#ffffff'
  }

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="relative w-full max-w-sm bg-[#12161d] border border-white/10 rounded-2xl shadow-2xl p-6 mx-4">
        <button 
          onClick={onClosed}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="size-5" />
        </button>

        <div className="mb-6 pt-4" onMouseUp={handleMouseUp}>
          {/* DÙNG HEX COLOR PICKER */}
          <HexColorPicker 
            color={tempColor} 
            onChange={handleColorChange} 
            style={{ width: '100%', height: '200px' }} 
          />
        </div>

        {/* Khu vực hiển thị kết quả */}
        <div className="flex items-center gap-3">
          <div
            className="size-10 rounded-full flex items-center justify-center font-bold text-sm shadow-inner shrink-0"
            style={{
              backgroundColor: tempColor,
              color: getContrastTextColor(tempColor),
            }}
          >
            A
          </div>

          <input
            type="text"
            value={tempColor.toUpperCase()}
            readOnly
            className="w-full bg-[#1a202c] border border-white/10 rounded-xl py-2.5 px-4 text-sm font-mono text-white focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}

export default ColorPickerModal