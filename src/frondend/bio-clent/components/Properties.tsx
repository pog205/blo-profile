
import React from 'react';
import { 
  Palette, 
  Type, 
  Image as ImageIcon, 
  MapPin, 
  Lock, 
  Sparkles, 
  HelpCircle, 
  Droplets,
  Pipette
} from 'lucide-react';
import { ProfileState } from '../types';
import AssetUploader from './AssetUploader';

interface PropertiesProps {
  profile: ProfileState;
  setProfile: (p: ProfileState) => void;
}

const Properties: React.FC<PropertiesProps> = ({ profile, setProfile }) => {
  const updateProfile = (key: keyof ProfileState, value: any) => {
    setProfile({ ...profile, [key]: value });
  };

  return (
    <div className="w-[420px] flex flex-col border-l border-white/5 bg-[#0a0a0a] overflow-y-auto p-6 gap-8">
      {/* Section: Assets */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="size-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Assets Uploader</h3>
        </div>
        <AssetUploader />
      </section>

      {/* Section: General */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Palette className="size-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">General Customization</h3>
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Description</label>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 italic font-serif text-sm">A</div>
            <input 
              type="text" 
              value={profile.description}
              onChange={(e) => updateProfile('description', e.target.value)}
              className="w-full bg-[#121212] border border-white/5 rounded-lg py-2 pl-8 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
              placeholder="this is my description"
            />
          </div>
        </div>

        {/* Effect Selector */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Background Effects</label>
          <div className="relative">
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
            <select 
              value={profile.backgroundEffect}
              onChange={(e) => updateProfile('backgroundEffect', e.target.value)}
              className="w-full bg-[#121212] border border-white/5 rounded-lg py-2 pl-9 pr-4 text-sm appearance-none focus:outline-none focus:border-blue-500/50"
            >
              <option>Choose an option</option>
              <option>Rain</option>
              <option>Stars</option>
              <option>Confetti</option>
            </select>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-400">Profile Opacity</label>
              <HelpCircle className="size-3 text-slate-600" />
            </div>
            <input 
              type="range" 
              min="0"   
              max="100"
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              value={profile.profileOpacity}
              onChange={(e) => updateProfile('profileOpacity', Number(e.target.value))}
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-mono">
              <span>20%</span>
              <span>50%</span>
              <span>80%</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-400">Profile Blur</label>
              <HelpCircle className="size-3 text-slate-600" />
            </div>
            <input 
              type="range" 
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              value={profile.profileBlur}
              onChange={(e) => updateProfile('profileBlur', Number(e.target.value))}
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-mono">
              <span>20px</span>
              <span>50px</span>
              <span>80px</span>
            </div>
          </div>
        </div>

        {/* Discord/Location Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400">Discord Presence</label>
            <button className="w-full flex items-center gap-2 bg-[#121212] border border-white/5 rounded-lg p-3 text-[10px] text-slate-400 hover:bg-white/5 transition-colors text-left leading-tight">
              <Lock className="size-3 shrink-0" />
              <span>Connect <span className="underline text-blue-400">Discord</span> to unlock</span>
            </button>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-500" />
              <input 
                type="text" 
                value={profile.location}
                onChange={(e) => updateProfile('location', e.target.value)}
                className="w-full bg-[#121212] border border-white/5 rounded-lg py-2 pl-8 pr-4 text-xs focus:outline-none focus:border-blue-500/50"
                placeholder="My Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section: Colors */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Droplets className="size-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Color Customization</h3>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <ColorInput 
            label="Accent Color" 
            value={profile.accentColor} 
            onChange={(v) => updateProfile('accentColor', v)} 
          />
          <ColorInput 
            label="Text Color" 
            value={profile.textColor} 
            onChange={(v) => updateProfile('textColor', v)} 
          />
          <ColorInput 
            label="Background Color" 
            value={profile.backgroundColor} 
            onChange={(v) => updateProfile('backgroundColor', v)} 
          />
          <ColorInput 
            label="Icon Color" 
            value={profile.iconColor} 
            onChange={(v) => updateProfile('iconColor', v)} 
          />
        </div>

        <button className="w-full mt-4 py-3 bg-gradient-to-r from-red-950/40 to-red-900/20 border border-red-900/50 rounded-xl text-sm font-medium text-red-200 hover:from-red-900/40 transition-all shadow-lg shadow-red-950/20">
          Enable Profile Gradient
        </button>
      </section>
    </div>
  );
};

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-xs font-medium text-slate-400">{label}</label>
    <div className="relative flex items-center">
      <div 
        className="absolute left-3 w-4 h-4 rounded-full border border-white/10" 
        style={{ backgroundColor: value }}
      />
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#121212] border border-white/5 rounded-lg py-2.5 pl-9 pr-8 text-[11px] font-mono text-white focus:outline-none focus:border-blue-500/50"
      />
      <Pipette className="absolute right-3 size-3.5 text-slate-500 cursor-pointer hover:text-white" />
    </div>
  </div>
);

export default Properties;
