import type { ReactNode, Ref } from "react";
import type { UserEvent } from "@testing-library/user-event";
import type {
  Screen,
  within as testingLibraryWithin,
  waitFor as testingLibraryWaitFor,
} from "@testing-library/dom";

type ScreenshotOptions = {
  element?: HTMLElement;
  name?: string;
};
type Screenshot = (
  elementOrOptions?: HTMLElement | ScreenshotOptions,
  options?: ScreenshotOptions
) => Promise<void>;

/**
 * Any export that ends with `_test` will be picked up as a component test in Reflame.
 *
 * Component tests can live alongside your implementation in the same file (test exports will be dropped for non-testing builds), so adding a test can involve adding a one-liner like this:
 *
 * ```tsx
 * export const Example_test = <Example />
 * ```
 *
 * In this case, Reflame will deploy and render the `Example_test` element for you, take a screenshot, and compare it to the latest reference screenshots saved in your default branch.
 *
 * Here's a slightly more complex example:
 *
 * ```tsx
 * import { ComponentTest } from '@reflame/testing'
 *
 * export const Example2_test: ComponentTest = ({ rootRef }) => <Example divRef={rootRef} />
 * ```
 *
 * Passing through the `rootRef` like this allows you to declaratively control which element Reflame screenshots. This can be convenient for components that already accept custom refs.
 *
 * For more complex components, you may want to interact with the component and screenshot elements within it imperatively.
 *
 * This is where the `.run` function comes in:
 *
 * ```tsx
 * import { ComponentTest } from '@reflame/testing'
 *
 * export const Example_test: ComponentTest = <Example />
 * Example_test.run = ({ user, screen, screenshot }) => {
 *   const input = await screen.findByPlaceholderText("Type stuff here")
 *   await user.type(input, "stuff here")
 *   await screenshot(input)
 * }
 * ```
 *
 * TODO: step function
 */
export type ComponentTest = (
  | ReactNode
  | (({
      rootRef,
    }: //  initOutput
    {
      /**
       * Pass this as a ref to any element to focus screenshots on that element, instead of the default outermost root div that we create for you.
       */
      rootRef: Ref<HTMLElement>;
      // /**
      //  * This is the output of the `init` function you can define in `testConfig.(js/ts)`.
      //  *
      //  * We pass this through
      //  */
      // initOutput: any
    }) => ReactNode)
) & {
  run?: ({
    step,
    user,
    screen,
    screenshot,
    within,
    root,
    waitFor,
  }: // initOutput,
  {
    step: <Output>(
      name: string,
      run: ({
        user,
        screen,
        screenshot,
        within,
        waitFor,
        root,
      }: {
        user: UserEvent;
        screen: Screen;
        screenshot: Screenshot;
        within: typeof testingLibraryWithin;
        waitFor: typeof testingLibraryWaitFor;
        root: HTMLElement;
      }) => Output
    ) => Output;
    user: UserEvent;
    screen: Screen;
    screenshot: Screenshot;
    within: typeof testingLibraryWithin;
    waitFor: typeof testingLibraryWaitFor;
    root: HTMLElement;
    // initOutput;
  }) => any;
};
