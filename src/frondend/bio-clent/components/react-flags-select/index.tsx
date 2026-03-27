import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";

interface CountryDropdownProps {
  className?: string;
  value?: string;
  onChange?: (countryCode: string) => void;
}

export default function CountryDropdown({ className, value, onChange }: CountryDropdownProps) {
  const [countryCode, setCountryCode] = useState<string>(value ?? "");
  const { t } = useTranslation();

  
  
  const handleSelect = (code: string) => {
    setCountryCode(code);
    if (onChange) {
      onChange(code);
    }
  };

  return (
    <ReactFlagsSelect
      selected={countryCode}
      onSelect={handleSelect}
      searchable={true}
      searchPlaceholder={t("custom.locationPlaceholder") || "Tìm quốc gia..."}
      
      selectButtonClassName={className}
      
      // Bùa chú mới đã tiêu diệt vùng trắng 
      className="
        /* 1. Ép toàn bộ khung menu xổ xuống thành màu tối */
        [&_[class*='selectOptions']]:!bg-[#12161d] [&_[class*='selectOptions']]:!border [&_[class*='selectOptions']]:!border-white/10 [&_[class*='selectOptions']]:!rounded-lg [&_[class*='selectOptions']]:!overflow-y-auto
        
        [&_[class*='filterBox']]:!bg-[#12161d] [&_[class*='filterBox']]:!p-2
        
        /* 3. Style cho ô input tìm kiếm */
        [&_input]:!bg-[#1a202c] [&_input]:!border [&_input]:!border-white/10 [&_input]:!text-white [&_input]:!rounded-lg [&_input:focus]:!border-blue-500/50 [&_input:focus]:!outline-none
        
        /* 4. Style cho từng dòng quốc gia (bo góc nhẹ để hover nhìn mượt hơn) */
        [&_li]:!text-gray-200 [&_li:hover]:!bg-blue-600/20 [&_li:hover]:!rounded-md [&_li]:!transition-colors [&_li]:!mx-1
      "
    />
  );
}
