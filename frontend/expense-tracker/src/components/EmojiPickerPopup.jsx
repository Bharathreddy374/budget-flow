import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6 relative">
      <div onClick={() => setIsOpen(true)} className="cursor-pointer text-center">
        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-primary overflow-hidden">
          {icon ? (
            <img src={icon} alt="icon" className="w-full h-full object-cover" />
          ) : (
            <LuImage className="text-2xl" />
          )}
        </div>
        <p className="text-sm mt-1">{icon ? 'Change Icon' : 'Pick Icon'}</p>
      </div>

      {isOpen && (
        <div className="absolute top-0 left-20 z-50 bg-white shadow-lg p-2 rounded-md border">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              <LuX />
            </button>
          </div>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => {
              onSelect(emoji?.imageUrl||"");
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
