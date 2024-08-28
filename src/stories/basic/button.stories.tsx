import { fn } from "@storybook/test";
import Button from "@/components/button";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "@/assets/theme/index.scss";
import { useObserver } from "mobx-react";
/// <reference types="vite-plugin-svgr/client" />
import MarkdownSvg from "@/assets/icons/markdown.svg?react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: "基础组件/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component: "Button按钮组件是页面中基础的行为触发组件。",
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    type: {
      table: {
        defaultValue: { summary: "contained" },
      },
      options: ["text", "outlined", "contained", "icon"],
      control: "select",
    },
    size: {
      table: {
        defaultValue: { summary: "medium" },
      },
      options: ["small", "medium", "large"],
      control: "select",
    },
    onlyShowContentOnHover: {
      table: {
        defaultValue: { summary: false },
      },
      control: "boolean",
    },
    block: {
      control: "boolean",
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: "boolean",
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    children: "按钮",
    type: "contained",
    size: "medium",
    onlyShowContentOnHover: false,
    block: false,
    disabled: false,
    onClick: fn(),
    onTouchStart: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  name: "基础使用",
  parameters: {
    docs: {
      description: {
        story: "button组件的基础使用。",
      },
    },
  },
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 300,
        }}
      >
        <Button {...args} />
      </div>
    );
  },
};

export const Types: Story = {
  name: "类型",
  parameters: {
    docs: {
      description: {
        story:
          "button组件支持4种类型，outlined、contained、text、icon，按照视觉强调来比较：contained > outlined > text，icon用于之需要图标即可判断按钮功能的场景。",
      },
    },
  },
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button {...args} type="outlined" style={{ marginRight: 10 }}>
          outlined
        </Button>
        <Button {...args} type="contained" style={{ marginRight: 10 }}>
          contained
        </Button>
        <Button {...args} type="text" style={{ marginRight: 10 }}>
          text
        </Button>
        <Button {...args} type="icon">
          <MarkdownSvg />
        </Button>
      </div>
    );
  },
};

export const Sizes: Story = {
  name: "尺寸",
  parameters: {
    docs: {
      description: {
        story: "button组件支持3种尺寸：small、medium、large。",
      },
    },
  },
  render: (args) => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Button
            {...args}
            type="outlined"
            size="small"
            style={{ marginRight: 10 }}
          >
            outlined
          </Button>
          <Button
            {...args}
            type="outlined"
            size="medium"
            style={{ marginRight: 10 }}
          >
            outlined
          </Button>
          <Button {...args} type="outlined" size="large">
            outlined
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Button
            {...args}
            type="contained"
            size="small"
            style={{ marginRight: 10 }}
          >
            contained
          </Button>
          <Button
            {...args}
            type="contained"
            size="medium"
            style={{ marginRight: 10 }}
          >
            contained
          </Button>
          <Button {...args} type="contained" size="large">
            contained
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Button
            {...args}
            type="text"
            size="small"
            style={{ marginRight: 10 }}
          >
            text
          </Button>
          <Button
            {...args}
            type="text"
            size="medium"
            style={{ marginRight: 10 }}
          >
            text
          </Button>
          <Button {...args} type="text" size="large">
            text
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Button
            {...args}
            type="icon"
            size="small"
            style={{ marginRight: 10 }}
          >
            <MarkdownSvg />
          </Button>
          <Button
            {...args}
            type="icon"
            size="medium"
            style={{ marginRight: 10 }}
          >
            <MarkdownSvg />
          </Button>
          <Button {...args} type="icon" size="large">
            <MarkdownSvg />
          </Button>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  name: "禁用状态",
  parameters: {
    docs: {
      description: {
        story: "button组件支持按钮切换到禁用状态。",
      },
    },
  },
  render: (args) => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Button
            {...args}
            type="outlined"
            style={{ marginRight: 10 }}
            disabled
          >
            outlined
          </Button>
          <Button
            {...args}
            type="contained"
            style={{ marginRight: 10 }}
            disabled
          >
            contained
          </Button>
          <Button {...args} type="text" style={{ marginRight: 10 }} disabled>
            text
          </Button>
          <Button {...args} type="icon" disabled>
            <MarkdownSvg />
          </Button>
        </div>
      </div>
    );
  },
};

export const Block: Story = {
  name: "占满全宽",
  parameters: {
    docs: {
      description: {
        story: "button组件支持直接占满全宽。",
      },
    },
  },
  render: (args) => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 300,
          }}
        >
          <Button {...args} type="outlined" block style={{ marginBottom: 10 }}>
            outlined
          </Button>
          <Button {...args} type="contained" block style={{ marginBottom: 10 }}>
            contained
          </Button>
          <Button {...args} type="text" block style={{ marginBottom: 10 }}>
            text
          </Button>
          <Button {...args} type="icon" block>
            <MarkdownSvg />
          </Button>
        </div>
      </div>
    );
  },
};

export const ShowOnHover: Story = {
  name: "只在hover时展示内容",
  parameters: {
    docs: {
      description: {
        story: "在某些情况下，我们会需要只在鼠标hover时展示按钮内容。",
      },
    },
  },
  render: (args) => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: 300,
          }}
        >
          <Button
            {...args}
            type="outlined"
            style={{ marginRight: 10 }}
            onlyShowContentOnHover
          >
            outlined
          </Button>
          <Button
            {...args}
            type="contained"
            style={{ marginRight: 10 }}
            onlyShowContentOnHover
          >
            contained
          </Button>
          <Button
            {...args}
            type="text"
            style={{ marginRight: 10 }}
            onlyShowContentOnHover
          >
            text
          </Button>
          <Button {...args} type="icon" onlyShowContentOnHover>
            <MarkdownSvg />
          </Button>
        </div>
      </div>
    );
  },
};
