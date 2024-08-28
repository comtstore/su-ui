import React from "react";
import { Preview } from "@storybook/react";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Typeset,
  Stories,
  Controls,
} from "@storybook/blocks";
import { ArgTypes } from "@storybook/blocks";

const preview = {
  tags: ["autodocs"],
  argTypes: {
    classes: {
      control: "object",
      description:
        "为组件中的各个层级组件添加className，如为button组件设置className`{styles: { button: 'hello-button'}}`",
    },
    styles: {
      control: "none",
      description:
        "为组件中的各个层级组件添加样式，如为button组件设置样式`{styles: { button: { color: 'red' }}}`",
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      exclude: ["className", "style"],
    },
    options: {
      storySort: {
        order: ["全局配置", "基础组件"],
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },
  },
};

export default preview;
