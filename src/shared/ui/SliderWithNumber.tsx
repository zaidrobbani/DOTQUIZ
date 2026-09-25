"use client";

import { InputNumber, Slider } from "antd";

export default function SliderWithNumber({
  value = 10,
  onChange,
  min,
  max,
  step = 1,
  presets,
  unit = "",
}: {
  value?: number;
  onChange?: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  presets?: number[];
  unit?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Slider
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className="flex-1 !my-1"
        />
        <div className="flex items-center gap-1.5">
          <InputNumber
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(next) => {
              if (typeof next === "number") onChange?.(next);
            }}
            className="!w-20 !rounded-xl !text-center !font-bold"
          />
          {unit ? (
            <span className="text-xs font-medium text-slate-500">{unit}</span>
          ) : null}
        </div>
      </div>

      {presets && presets.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-slate-400 mr-1">Pilihan Cepat:</span>
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChange?.(preset)}
              className={`rounded-lg px-2.5 py-0.5 text-xs font-medium transition-all ${
                value === preset
                  ? "bg-indigo-600 text-white shadow-2xs font-semibold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {preset} {unit}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
