declare module "@pages/login-view" {
  import React = require("react");
  interface MyComponentProps {
    history?: any,
    location?: any,
    match?: any,
    staticContext?: any
  }
  const MyComponent: React.FC<MyComponentProps>;
  export default MyComponent
}

declare module "@pages/index-view" {
  import React = require("react");
  interface MyComponentProps {
    history?: any,
    location?: any,
    match?: any,
    staticContext?: any
  }
  const MyComponent: React.FC<MyComponentProps>;
  export default MyComponent
}

declare module "*.svg" {
  import React = require("react");
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare const IS_PROD: boolean;
declare const IS_DEV: boolean;
declare const IS_DEV_SERVER: boolean;
