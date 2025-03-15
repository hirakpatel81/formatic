import React, { useState, useEffect } from "react";
import Modal from "../../common/Modal";
import { Form } from "../../../models/form/Form";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../../common/Form/FormInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formRenameSchema = z.object({
  title: z.string().min(1, "Form title is required"),
});

type FormRenameInput = z.infer<typeof formRenameSchema>;

interface FormRenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: Form | null;
  onSuccess: (data: { title: string }) => void;
}

const FormRenameModal: React.FC<FormRenameModalProps> = ({
  isOpen,
  onClose,
  form,
  onSuccess,
}) => {
  const methods = useForm<FormRenameInput>({
    resolver: zodResolver(formRenameSchema),
    defaultValues: {
      title: form?.title || "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  // Reset form when modal opens with new form
  useEffect(() => {
    if (form) {
      reset({
        title: form.title,
      });
    }
  }, [form, reset]);

  const onSubmit = async (data: FormRenameInput) => {
    try {
      await onSuccess({
        title: data.title,
      });
      onClose();
    } catch (error) {
      console.error("Failed to rename form:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rename form"
      primaryButtonText="Save"
      onPrimaryAction={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="title"
            label="Form Title"
            placeholder="Enter form title"
            autoFocus
          />
        </form>
      </FormProvider>
    </Modal>
  );
};

export default FormRenameModal;
