"use client";

import { useActionState } from "react";
import { Alert, Button, Input } from "antd";
import { ArrowRightOutlined, UserOutlined } from "@ant-design/icons";
import { loginAction } from "@/repository/auth/server-actions";
import type { LoginActionState } from "@/repository/auth/dto";

const initialState: LoginActionState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="username"
          className="text-sm font-semibold text-slate-700"
        >
          Nama Panggilan
        </label>
        <Input
          id="username"
          name="username"
          size="large"
          placeholder="Masukkan nama panggilanmu (cth. Zaid)"
          prefix={<UserOutlined className="text-slate-400 mr-1.5" />}
          autoFocus
          disabled={pending}
          status={state.error ? "error" : undefined}
          maxLength={20}
          className="!h-12 !rounded-xl !text-base"
        />
      </div>

      {state.error ? (
        <Alert
          type="error"
          showIcon
          description={state.error}
          className="!rounded-xl"
        />
      ) : null}

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        loading={pending}
        block
        icon={<ArrowRightOutlined />}
        iconPlacement="end"
        className="!h-12 !rounded-xl !text-base !font-semibold !shadow-md !shadow-indigo-500/30 hover:!scale-[1.01] active:!scale-[0.99] transition-transform"
      >
        Masuk &amp; Mulai Kuis
      </Button>

      <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-center text-xs text-slate-500">
        🔒 Sesi otomatis tersimpan di peramban selama 2 jam tanpa perlu
        password.
      </div>
    </form>
  );
}
