"use client";

import clsx from "clsx";

import Portal from "@/components/Portal";
import RenderIf from "@/components/RenderIf";
import SignInModal from "./SignIn";
import SignUpModal from "./SignUp";

import { SIGN_UP_MODAL } from "@/constants/modal";
import useModalStore from "@/hooks/useModal";

import styles from "./AuthModal.module.scss";

function AuthModal() {
  const { visible, id, isClose } = useModalStore((state) => state);

  return (
    <Portal>
      <RenderIf condition={visible}>
        <div
          className={clsx(
            `fixed inset-0 bg-black/25 z-10 ${styles.overlay} ${
              isClose && styles["overlay-close"]
            }`
          )}
        ></div>
        <div
          className={clsx(
            `fixed inset-0 ${styles.modal} ${isClose && styles["modal-close"]}`
          )}
        >
          <div className="w-[420px] max-w-[calc(100%-32px)] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl">
            {id === SIGN_UP_MODAL ? <SignUpModal /> : <SignInModal />}
          </div>
        </div>
      </RenderIf>
    </Portal>
  );
}

export default AuthModal;
