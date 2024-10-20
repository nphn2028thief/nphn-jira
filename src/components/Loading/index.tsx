import clsx from "clsx";

import styles from "./Loading.module.scss";

function Loading() {
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-[9997]"></div>
      <div className="w-40 max-w-[calc(100%-32px)] h-24 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg z-[9998]"></div>
      <div className={clsx(styles.loader)}>
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index}></span>
        ))}
      </div>
    </>
  );
}

export default Loading;
