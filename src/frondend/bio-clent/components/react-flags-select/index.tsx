import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";

export default function CountryDropdown({ className, onChange }) {
  const [countryCode, setCountryCode] = useState("");
  const { t } = useTranslation();

  const handleSelect = (code) => {
    setCountryCode(code);
    const translator = new Intl.DisplayNames(['en'], { type: 'region' });
    const fullTextName = translator.of(code);
    if (onChange) {
      onChange(fullTextName);
    }
  };

  return (
    <ReactFlagsSelect
      selected={countryCode}
      onSelect={handleSelect}
      searchable={true}
      searchPlaceholder={t("custom.locationPlaceholder") || "Tìm quốc gia..."}
      selectButtonClassName={
        `${className} rounded-lg bg-[#12161d] border border-white/10 !py-3 !pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50` // nút chọn
      }
      // Custom style cho dropdown list
      menuClassName="rounded-xl bg-[#12161d] border border-white/10 text-white shadow-lg"
      optionClassName="hover:bg-blue-600/20 text-white px-4 py-2 cursor-pointer"
    />
  );
}