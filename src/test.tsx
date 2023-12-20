import { Ref } from "react";
import type { ComponentTest } from "./index.ts";

export const Example = ({ divRef }: { divRef: Ref<HTMLDivElement> }) => (
  <div ref={divRef}>1</div>
);

export const Example_test: ComponentTest = ({ rootRef }) => (
  <Example divRef={rootRef} />
);

Example_test.run = async ({ user, screen, step }) => {
  const input = await step("test", async () => {
    const input = await screen.findByPlaceholderText("test1234");
    await user.type(input, "stuff");
    return input;
  });

  console.log(input);
};
