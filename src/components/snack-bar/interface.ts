import { ReactNode } from "react";

export type SnackBarType = "success" | "error" | "warning" | "info";

export interface InfoConfig {
  id?: string;
  replaceId?: string;
  type?: SnackBarType;
  duration?: number;
  isOpen?: boolean;
  content: string | ReactNode;
}
