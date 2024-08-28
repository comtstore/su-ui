import { fn } from "@storybook/test";
import DraggleBar from "@/components/draggle-bar";
import React, { useCallback, useRef, useState } from "react";
import type { Meta, StoryContext, StoryObj } from "@storybook/react";
import "@/assets/theme/index.scss";
import { useObserver } from "mobx-react";
/// <reference types="vite-plugin-svgr/client" />
import MarkdownSvg from "@/assets/icons/markdown.svg?react";
import { v4 as uuid } from "uuid";
import { DraggleBarProps } from "@/components/draggle-bar/interface";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DraggleBar> = {
  title: "基础组件/DraggleBar",
  component: DraggleBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "DraggleBar组件用于表示一个可以被拖拽的位置，并在被拖拽时执行行为，比如改变其他元素的长度。",
      },
      source: {
        language: "tsx",
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    group: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DraggleBar>;

function PrimaryDemo(args: DraggleBarProps) {
  const leftBoxRef = useRef(null);
  const isDragging = useRef(false);
  const [leftWidth, setLeftWidth] = useState(50);

  const onDragging = useCallback(
    (e) => {
      if (isDragging.current) return;
      isDragging.current = true;
      const leftBoxRect = leftBoxRef.current?.getBoundingClientRect();
      if (!leftBoxRect) {
        isDragging.current = false;
        return;
      }
      const { x: leftDistance } = leftBoxRect;
      const width = Math.max(e.clientX - leftDistance, 50);
      setLeftWidth(width);
      isDragging.current = false;
    },
    [isDragging],
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        ...(args.styles?.demo ?? {}),
      }}
    >
      <div
        ref={leftBoxRef}
        style={{
          height: "100%",
          width: leftWidth,
          backgroundColor: "var(--su-theme-color)",
        }}
      />
      <DraggleBar {...args} onDragging={onDragging} />
      <div
        style={{
          height: "100%",
          width: 200,
          backgroundColor: "var(--su-theme-color__hover)",
        }}
      />
    </div>
  );
}

export const Primary: Story = {
  name: "基础使用",
  parameters: {
    docs: {
      description: {
        story: "DraggleBar组件的基础使用。",
      },
      source: {
        language: "tsx",
        code: `
function PrimaryDemo(args: DraggleBarProps) {
  const leftBoxRef = useRef(null);
  const isDragging = useRef(false);
  const [leftWidth, setLeftWidth] = useState(50);

  const onDragging = useCallback(
    (e) => {
      if (isDragging.current) return;
      isDragging.current = true;
      const leftBoxRect = leftBoxRef.current?.getBoundingClientRect();
      if (!leftBoxRect) {
        isDragging.current = false;
        return;
      }
      const { x: leftDistance } = leftBoxRect;
      const width = Math.max(e.clientX - leftDistance, 50);
      setLeftWidth(width);
      isDragging.current = false;
    },
    [isDragging],
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        ...(args.styles?.demo ?? {}),
      }}
    >
      <div
        ref={leftBoxRef}
        style={{
          height: "100%",
          width: leftWidth,
          backgroundColor: "var(--su-theme-color)",
        }}
      />
      <DraggleBar {...args} onDragging={onDragging} />
      <div
        style={{
          height: "100%",
          width: 200,
          backgroundColor: "var(--su-theme-color__hover)",
        }}
      />
    </div>
  );
}
        `,
      },
    },
  },
  render: function (args) {
    return <PrimaryDemo {...args} />;
  },
};

export const Group: Story = {
  name: "多DraggleBar成组",
  parameters: {
    docs: {
      description: {
        story: "DraggleBar组件可以通过成组而同时控制多个拖拽条。",
      },
      source: {
        language: "tsx",
      },
    },
  },
  render: function (args) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PrimaryDemo {...args} styles={{ demo: { marginBottom: 10 } }} />
        <PrimaryDemo {...args} />
      </div>
    );
  },
  args: {
    group: "group1",
  },
};
