import React, { useState } from "react";
export const SwitchButton = () => {
    const [isOn, setIsOn] = useState(false);
    const toggleSwitch = () => {
        setIsOn(!isOn);
    };
    return (<div className="flex items-center mr-[-6rem]">
      <button className={`${isOn ? "bg-sky-950" : "bg-gray-400"} relative inline-flex flex-shrink-0 h-4 w-9 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`} onClick={toggleSwitch} aria-pressed={isOn ? "true" : "false"} aria-labelledby="toggleLabel">
        <span className="sr-only">Toggle</span>
        <span aria-hidden="true" className={`${isOn ? "translate-x-5" : "translate-x-0"} pointer-events-none inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
      </button>
      <span id="toggleLabel" className="ml-2 text-xs font-medium text-gray-700 w-[15rem]">
        {isOn ? "Production Mode" : "Test Mode"}
      </span>
    </div>);
};
//# sourceMappingURL=SwitchButton.jsx.map