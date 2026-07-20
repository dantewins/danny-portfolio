"use client";

import { CollageDialog } from "@/components/collage/collage-dialog";
import { CollageTrigger } from "@/components/collage/collage-trigger";
import { useCollageDialog } from "@/components/collage/use-collage-dialog";

export function AboutCollage() {
  const {
    state,
    isMounted,
    replayKey,
    closeButtonRef,
    triggerButtonRef,
    panelRef,
    open,
    replay,
    requestClose,
    finishClose,
  } = useCollageDialog();

  return (
    <>
      <CollageTrigger ref={triggerButtonRef} onOpen={open} />
      {isMounted ? (
        <CollageDialog
          state={state}
          replayKey={replayKey}
          closeButtonRef={closeButtonRef}
          panelRef={panelRef}
          onReplay={replay}
          onRequestClose={requestClose}
          onFinishClose={finishClose}
        />
      ) : null}
    </>
  );
}
