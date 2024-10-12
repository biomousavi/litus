import type { Meta, StoryObj } from "@storybook/react";
import TodoItem from "./index";
import { TODO } from "@/lib/types";

const meta: Meta<typeof TodoItem> = {
  title: "Components/TodoItem",
  component: TodoItem,
  tags: ["autodocs"],
  argTypes: {
    todo: {
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TodoItem>;

const mockTodo: TODO = {
  _id: "1",
  title: "Sample Todo",
  estimated_time: 30,
  creation_time: new Date("2023-05-20").toISOString(),
};

export const Default: Story = {
  args: {
    todo: mockTodo,
  },
};

export const LongTitle: Story = {
  args: {
    todo: {
      ...mockTodo,
      title: "This is a very long todo title that might wrap to the next line",
    },
  },
};

export const ShortEstimatedTime: Story = {
  args: {
    todo: {
      ...mockTodo,
      estimated_time: 5,
    },
  },
};

export const LongEstimatedTime: Story = {
  args: {
    todo: {
      ...mockTodo,
      estimated_time: 120,
    },
  },
};
