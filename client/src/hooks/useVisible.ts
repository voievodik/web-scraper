import { useCallback, useState } from "react";

const useVisible = (initialValue: boolean | undefined = false) => {
  const [visible, setVisible] = useState<boolean>(initialValue);

  const toggle = useCallback(() => setVisible((prev) => !prev), []);
  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);
  const set = useCallback((value: boolean) => setVisible(value), []);

  return {
    show,
    hide,
    visible,
    toggle,
    set,
  };
};

export default useVisible;
