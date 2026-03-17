/* eslint-disable no-unused-vars */

import '@styles/react/libs/editor/editor.scss'

import { Form, Modal } from 'reactstrap'
import { useState } from 'react'

import { HslColorPicker } from 'react-colorful'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'

interface ColorPickerModalProps {
  isOpen: boolean
  toggle: () => void
  initialColor?: string
  title?: string
  description?: string
  onSave: (color: string) => void | Promise<void>
  onCancel?: () => void
  onClosed?: () => void
  isLoading?: boolean
  windowHeight?: number
  typeModal?: string
}

const ColorPickerModal = ({
  toggle,
  initialColor = '#A25652',
  description,
  onClosed,
}: ColorPickerModalProps) => {
  const { t } = useTranslation()

  const initialHsl = initialColor
  const [color, setColor] = useState(initialHsl)
function hslToHex(h: number, s: number, l: number): string {
  // Chuẩn hóa input
  h = ((h % 360) + 360) % 360 // đảm bảo 0 <= h < 360
  s = Math.min(Math.max(s, 0), 100) / 100
  l = Math.min(Math.max(l, 0), 100) / 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
  const hexColor = hslToHex(color.h, color.s, color.l)

  const handleColorChange = (newHsl: { h: number; s: number; l: number }) => {
    setColor(newHsl)
    
    // GỢI Ý: Vì đã bỏ nút Save, nếu bạn muốn màu tự động lưu/cập nhật ra ngoài form 
    // ngay khi người dùng kéo thanh màu, bạn có thể gọi hàm onSave ở đây:
    // onSave(hslToHex(newHsl.h, newHsl.s, newHsl.l));
  }
 function getContrastTextColor(hexColor: string): string {
  if (!/^#([0-9A-Fa-f]{6})$/.test(hexColor)) {
    throw new Error('Invalid HEX color. Must be in format #RRGGBB')
  }

  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)

  // Công thức tính luminance theo chuẩn W3C
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Nếu sáng > 0.5 thì dùng chữ đen, ngược lại dùng chữ trắng
  return luminance > 0.5 ? '#000000' : '#ffffff'
}
 
 const handleClose = () => {
    toggle()
    if (onClosed) onClosed()
  }
  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
      
      // Khối Modal chính (Dark Mode)
      <div className="relative w-full max-w-sm bg-[#12161d] border border-white/10 rounded-2xl shadow-2xl p-6 mx-4">
        
        {/* Nút X để đóng */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="size-5" />
        </button>

        {/* <h3 className="text-lg font-semibold text-white mb-2">{title}</h3> */}
        
        <p className="text-sm text-slate-400 mb-6">
          {description || 'Chọn màu nền cho phần này. Màu văn bản sẽ được điều chỉnh tự động.'}
        </p>

        {/* Bảng chọn màu react-colorful */}
        <div className="mb-6">
          <HslColorPicker 
            color={color} 
            onChange={handleColorChange} 
            // Ép bảng màu full width của modal
            style={{ width: '100%', height: '200px' }} 
          />
        </div>

        {/* Khu vực hiển thị kết quả */}
        <div className="flex items-center gap-3">
          {/* Hình tròn hiển thị màu */}
          <div
            className="size-10 rounded-full flex items-center justify-center font-bold text-sm shadow-inner shrink-0"
            style={{
              backgroundColor: hexColor,
              color: getContrastTextColor(hexColor),
            }}
          >
            A
          </div>

          {/* Ô input hiện mã HEX */}
          <input
            type="text"
            value={hexColor.toUpperCase()}
            readOnly
            className="w-full bg-[#1a202c] border border-white/10 rounded-xl py-2.5 px-4 text-sm font-mono text-white focus:outline-none"
          />
        </div>
      </div>
      
    </div>
  )
}

export default ColorPickerModal