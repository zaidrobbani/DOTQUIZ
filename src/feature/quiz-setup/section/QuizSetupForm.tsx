"use client";

import { useState } from "react";
import { Button, Form, Select } from "antd";
import {
  AppstoreOutlined,
  ThunderboltOutlined,
  UnorderedListOutlined,
  FieldTimeOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import CategoryCountHint from "../components/CategoryCountHint";
import SliderWithNumber from "@/shared/ui/SliderWithNumber";
import {
  DEFAULT_SETUP_VALUES,
  quizSetupSchema,
  type QuizSetupFormValues,
} from "../util/quizSetupSchema";
import type { TriviaCategory } from "@/repository/trivia/dto";
import { DIFFICULTY_LABEL, TYPE_LABEL } from "@/shared/util/constants";

export default function QuizSetupForm({
  categories,
  loadingCategories,
  submitting,
  onSubmit,
}: {
  categories: TriviaCategory[];
  loadingCategories: boolean;
  submitting: boolean;
  onSubmit: (values: QuizSetupFormValues) => void;
}) {
  const [form] = Form.useForm<QuizSetupFormValues>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const handleFinish = (values: QuizSetupFormValues) => {
    const result = quizSetupSchema.safeParse(values);
    if (!result.success) return;
    onSubmit(result.data);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={DEFAULT_SETUP_VALUES}
      onFinish={handleFinish}
      requiredMark={false}
      className="flex flex-col gap-1"
    >
      <Form.Item
        label={
          <span className="flex items-center gap-1.5 font-semibold text-slate-800">
            <AppstoreOutlined className="text-indigo-600" />
            <span>Kategori Soal</span>
          </span>
        }
        name="categoryId"
        className="!mb-4"
      >
        <Select
          allowClear
          placeholder="Semua kategori (Campuran)"
          loading={loadingCategories}
          showSearch
          optionFilterProp="label"
          onChange={(value: number | undefined) =>
            setSelectedCategoryId(value ?? null)
          }
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
          className="!h-11"
        />
      </Form.Item>

      {selectedCategoryId !== null ? (
        <div className="-mt-1 mb-5">
          <CategoryCountHint categoryId={selectedCategoryId} />
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Form.Item
          label={
            <span className="flex items-center gap-1.5 font-semibold text-slate-800">
              <ThunderboltOutlined className="text-amber-500" />
              <span>Tingkat Kesulitan</span>
            </span>
          }
          name="difficulty"
          className="!mb-4"
        >
          <Select
            allowClear
            placeholder="Semua tingkat (Acak)"
            options={Object.entries(DIFFICULTY_LABEL).map(([value, label]) => ({
              value,
              label,
            }))}
            className="!h-11"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="flex items-center gap-1.5 font-semibold text-slate-800">
              <UnorderedListOutlined className="text-indigo-600" />
              <span>Tipe Pertanyaan</span>
            </span>
          }
          name="type"
          className="!mb-4"
        >
          <Select
            allowClear
            placeholder="Semua tipe (Pilihan & Benar/Salah)"
            options={Object.entries(TYPE_LABEL).map(([value, label]) => ({
              value,
              label,
            }))}
            className="!h-11"
          />
        </Form.Item>
      </div>

      <div className="my-2 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5 flex flex-col gap-5">
        <Form.Item
          label={
            <span className="flex items-center gap-1.5 font-semibold text-slate-800">
              <CheckOutlined className="text-emerald-600" />
              <span>Jumlah Pertanyaan</span>
            </span>
          }
          name="amount"
          className="!mb-0"
        >
          <SliderWithNumber
            min={5}
            max={50}
            step={5}
            presets={[5, 10, 15, 20, 25, 30]}
            unit="soal"
          />
        </Form.Item>

        <div className="border-t border-slate-200/60" />

        <Form.Item
          label={
            <span className="flex items-center gap-1.5 font-semibold text-slate-800">
              <FieldTimeOutlined className="text-indigo-600" />
              <span>Durasi Pengerjaan</span>
            </span>
          }
          name="durationMinutes"
          className="!mb-0"
        >
          <SliderWithNumber
            min={1}
            max={30}
            presets={[3, 5, 10, 15, 20]}
            unit="menit"
          />
        </Form.Item>
      </div>

      <div className="mt-6">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={submitting}
          block
          icon={<ThunderboltOutlined />}
          className="!h-13 !rounded-xl !text-base !font-semibold !shadow-lg !shadow-indigo-500/25 hover:!scale-[1.01] active:!scale-[0.99] transition-transform"
        >
          Mulai Mengerjakan Kuis
        </Button>
      </div>
    </Form>
  );
}
