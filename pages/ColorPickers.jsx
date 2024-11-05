import React, { useState } from 'react';

const colors = [
  { name: 'None', value: '' },
  { name: 'Nobel Grey', value: '#8e8e8e' },
  { name: 'Oxford Blue', value: '#002147' },
  { name: 'Electric Lilac', value: '#b19cd9' },
  { name: 'Olympic Blue', value: '#0094c6' },
  { name: 'Turquoise', value: '#00b5ad' },
  { name: 'Jungle Green', value: '#029e73' },
  { name: 'Indian Red', value: '#cd5c5c' },
  { name: 'Tuscan Yellow', value: '#f7c52b' },
];

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleColorSelect = (color) => {
    onChange(color);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative flex items-center m-2 z-10 ">
      <button
        onClick={handleToggleDropdown}
        className="rounded-lg border-2 border-blue-800 px-8 p-1 font-bold  bg-white text-blue-800"
        style={{ backgroundColor: selectedColor || 'transparent' }}
      >
        Background Color
      </button>
      {isOpen && (
        <div className="absolute top-10 mt-2  bg-white border rounded-3xl shadow-lg">
          <div className="flex  p-5 space-x-4 bg-white rounded-3xl">
            {colors.map((color, index) => {
              const isSelected = selectedColor === color.value;
              const hoverStyle = {
                backgroundColor: color.value,
                borderColor: isSelected ? 'black' : 'gray',
              };

              return (
                <div
                  key={index}
                  onClick={() => handleColorSelect(color.value)}
                  className={`w-6 h-6 rounded-full cursor-pointer border transition-all duration-300 ease-in-out ${
                    isSelected ? 'border-blue-80 shadow-lg shadow-blue-500' : 'border-gray-300'
                  } hover:border-black`}
                  style={hoverStyle}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;