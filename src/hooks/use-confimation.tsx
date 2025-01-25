import React from "react";
import { Button } from "@workspace/ui/components/ui/button";
import { useModal } from "@workspace/ui/hooks/use-modal";

type ConfirmationAction = {
  action: () => void;

  title: string;
  description: string;
  body?: React.ReactNode;
  /**  */
  onConfirm?: () => void;
  confirmLabel?: string;
  closeOnConfirm?: boolean;
  /**  */
  onCancel?: () => void;
  cancelLabel?: string;
};

/**
 * Hook to handle confirmation modals
 * - It shows a confirmation modal to the user and presents a cancel and confirm button
 * - If the user confirms, the action function is called otherwise the modal is closeModal
 * - Optionall pass in `onConfirm` and `onCancel` functions to perform more actions after the user confirms or cancels
 *
 * @example
 * const { confirmAction } = useConfirmation();
 *
  const handleConfirm = () => {
    confirmAction({
      action: () => console.log("REMOVE"),
      title: "Are you sure?",
      description:
        "This will delete your account and remove your data from our servers.",
      onConfirm: () => console.log("CONFIRM"),
      onCancel: () => console.log("CANCEL"),
    });
  };
 */
const useConfirmation = () => {
  const { modal, close } = useModal();

  const confirmAction = (options: ConfirmationAction) => {
    const {
      action,
      title = "Are you sure?",
      description = null,
      body,
      /**  */
      onConfirm,
      confirmLabel = "Confirm",
      closeOnConfirm = true,
      /**  */
      onCancel,
      cancelLabel = "Cancel"
    } = options;

    const handleConfirm = () => {
      action();
      onConfirm?.();
      if (closeOnConfirm) close();
    };

    const handleCancel = () => {
      close();
      onCancel?.();
    };

    modal({
      title: title,
      description: description ?? undefined,
      strict: true,
      body,
      footer: (
        <div className="flex gap-2 items-center w-full justify-end">
          <Button variant="secondary" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button variant="secondary" onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </div>
      )
    });
  };
  return { confirmAction };
};
export default useConfirmation;
