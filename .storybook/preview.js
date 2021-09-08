import { Global } from '@emotion/react'
import globalStyle from "../src/styles/global";
import "./style.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
      <div className="mdxWrapper">
        <Global
            styles={globalStyle}
        />
        <Story />
      </div>
  ),
];