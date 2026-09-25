import { Spin } from "antd";

export default function LoadingScreen({ label }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <Spin size="large" />
      {label ? <p className="text-sm text-gray-500">{label}</p> : null}
    </div>
  );
}
