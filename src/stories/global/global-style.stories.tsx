import { fn } from "@storybook/test";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "@/assets/theme/index.scss";
import Button from "@/components/button";
import { useObserver } from "mobx-react";
/// <reference types="vite-plugin-svgr/client" />
import MarkdownSvg from "@/assets/icons/markdown.svg?react";
import { Title, Subtitle, Description, Controls } from "@storybook/blocks";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: "全局配置/Styles",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    controls: {
      include: ["className", "classes", "style", "styles"],
      exclude: ["children", ""],
    },
    docs: {
      description: {
        component: "每一个组件都支持配置以下基础的样式属性。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "为组件添加className，会配置到组件的跟节点或触发节点",
    },
    style: {
      control: "object",
      description: "为组件添加style，会配置到组件的跟节点或触发节点",
    },
  },
  args: {
    className: "",
    style: {},
    styles: {},
    classes: {},
    children: "按钮",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  name: "基础使用",
};
