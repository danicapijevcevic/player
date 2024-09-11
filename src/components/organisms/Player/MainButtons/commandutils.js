export const useCommandsUpdate = (props, setButtons, effect) => (command) =>
  effect(() => {
    setButtons((prev) =>
      prev.map((item) =>
        item.name === command ? { ...item, active: props[command] } : item
      )
    );
  }, [props[command]]);
