// src/custom.d.ts
declare module "*.svg" {
  import * as React from "react";

  // For using SVG as a component
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;

  // For using SVG as an image source
  const content: string;
  export default content;
}
