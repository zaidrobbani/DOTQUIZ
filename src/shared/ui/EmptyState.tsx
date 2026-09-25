import Link from "next/link";
import { Button } from "antd";
import { InboxOutlined, ArrowRightOutlined } from "@ant-design/icons";

export default function EmptyState({
  title,
  description,
  actionText,
  actionHref,
  onAction,
}: {
  title: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex min-h-[36vh] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/70 p-8 text-center backdrop-blur-xs">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl text-indigo-500 shadow-xs">
        <InboxOutlined />
      </div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      {description ? (
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-500">
          {description}
        </p>
      ) : null}
      {actionText && actionHref ? (
        <Link href={actionHref} className="mt-5">
          <Button
            type="primary"
            size="large"
            className="!h-11 !rounded-xl !bg-indigo-600 !font-semibold hover:!bg-indigo-700"
          >
            {actionText} <ArrowRightOutlined className="!ml-1" />
          </Button>
        </Link>
      ) : actionText && onAction ? (
        <Button
          type="primary"
          size="large"
          onClick={onAction}
          className="mt-5 !h-11 !rounded-xl !bg-indigo-600 !font-semibold hover:!bg-indigo-700"
        >
          {actionText}
        </Button>
      ) : null}
    </div>
  );
}
