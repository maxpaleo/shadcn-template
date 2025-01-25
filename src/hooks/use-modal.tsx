"use client";
import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

/* -------------------------------------------------------------------------- */
/*                                Layout Styles                               */
/* -------------------------------------------------------------------------- */

type ModalProps = {
  title: string;
  hideTitle?: boolean;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  strict?: boolean;
  actionFn?: () => void;
  description?: string;
  onOpen?: () => void;
  onClose?: () => void;
};

type ModalContextType = {
  modal: (props: ModalProps) => void;
  open: () => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * ### Function to show a modal
 * - You can use the modal function to show a modal anywhere in the app.
 * - The modal already has a close icon in the top right, but if you want to control the close, you can use the `open` and `close` functions.
 *
 * #### Functions
 * - `modal`: Shows a modal with the provided props
 * - `open`: Closes the modal and clears the URL parameters
 * - `close`: Closes the modal and clears the URL parameters
 * ---
 * #### Modal example
 * ```jsx
 * const { modal } = useModal();
 *
 * const openModal = () => {
 *   modal({
 *     title: "Create organization",
 *     body: <div>Content</div>,
 *   });
 * };
 * ```
 *  ---
 * #### Manual close example
 * ```jsx
 * const { modal, close } = useModal();
 *
 * const openModal = () => {
 *   modal({
 *     title: "Create organization",
 *     body: <div>Content</div>,
 *   });
 * };
 *
 * const handleClose = () => {
 *   close();
 * };
 * ```
 */
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

/**
 * Provider
 */
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [props, setProps] = useState<ModalProps | null>(null);

  /**
   * Function to close the modal
   */
  const closeModal = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  /**
   *
   */
  useEffect(() => {
    if (!props) return;

    if (isDialogOpen) {
      if (props.onOpen) props.onOpen();
    } else {
      if (props.onClose) props.onClose();
    }
  }, [isDialogOpen, props]);

  /* -------------------------------------------------------------------------- */
  /*                                Common modal                                */
  /* -------------------------------------------------------------------------- */

  /**
   * Function to open a customizable modal
   * - Pass in a custom body
   */
  const modal = (props: ModalProps) => {
    setProps(props);
    /** Show the dialog */
    setIsDialogOpen(true);
  };

  const open = () => {
    setIsDialogOpen(true);
  };

  const close = () => {
    closeModal();
  };

  const strict = (props && props.strict) ?? false;

  /* -------------------------------------------------------------------------- */
  /*                               Rendered Modal                               */
  /* -------------------------------------------------------------------------- */

  return (
    <ModalContext.Provider value={{ modal, open, close }}>
      {children}
      {isDialogOpen && props && (
        <Modal strict={strict} onOpenChange={setIsDialogOpen} open={isDialogOpen}>
          <ModalContent strict={strict} className={cn("md:max-h-[96%] max-h-[90%] overflow-y-scroll")}>
            {!props.header && props.hideTitle ? (
              <ModalHeader strict={strict} className="grid">
                <ModalTitle strict={strict} hidden={true}>
                  {props.title}
                </ModalTitle>
                <ModalDescription strict={strict} hidden={true} className="text-md">
                  {props.description}
                </ModalDescription>
              </ModalHeader>
            ) : (
              <ModalHeader strict={strict} className="grid">
                <ModalTitle strict={strict} hidden={props.hideTitle}>
                  {props.title}
                </ModalTitle>

                <ModalDescription strict={strict} className="text-md">
                  {props.description}
                </ModalDescription>

                {props.header}
              </ModalHeader>
            )}

            {props.body && <div className="mt-2">{props.body}</div>}

            {props.footer && <ModalFooter strict={strict}>{props.footer}</ModalFooter>}
          </ModalContent>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

/**
 *
 */
function Modal({
  strict,
  children,
  ...props
}: {
  strict: boolean;
} & Parameters<typeof Dialog>[0]) {
  return strict ? <AlertDialog {...props}>{children}</AlertDialog> : <Dialog {...props}>{children}</Dialog>;
}

function ModalContent({
  strict,
  children,
  ...props
}: {
  strict: boolean;
  children: React.ReactNode;
} & Parameters<typeof DialogContent>[0]) {
  return strict ? <AlertDialogContent {...props}>{children}</AlertDialogContent> : <DialogContent {...props}>{children}</DialogContent>;
}

function ModalTitle({
  strict,
  children,
  ...props
}: {
  strict: boolean;
  children: React.ReactNode;
} & Parameters<typeof DialogTitle>[0]) {
  return strict ? <AlertDialogTitle {...props}>{children}</AlertDialogTitle> : <DialogTitle {...props}>{children}</DialogTitle>;
}

function ModalDescription({
  strict,
  children,
  ...props
}: {
  strict: boolean;
  children: React.ReactNode;
} & Parameters<typeof DialogDescription>[0]) {
  return strict ? <AlertDialogDescription {...props}>{children}</AlertDialogDescription> : <DialogDescription {...props}>{children}</DialogDescription>;
}

function ModalHeader({
  strict,
  children,
  ...props
}: {
  strict: boolean;
  children: React.ReactNode;
} & Parameters<typeof DialogHeader>[0]) {
  return strict ? <AlertDialogHeader {...props}>{children}</AlertDialogHeader> : <DialogHeader {...props}>{children}</DialogHeader>;
}

function ModalFooter({
  strict,
  children,
  ...props
}: {
  strict: boolean;
  children: React.ReactNode;
} & Parameters<typeof DialogFooter>[0]) {
  return strict ? <AlertDialogFooter {...props}>{children}</AlertDialogFooter> : <DialogFooter {...props}>{children}</DialogFooter>;
}
