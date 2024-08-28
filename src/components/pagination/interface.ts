import { Component } from "react";
import { ComponentProps } from "../../common/common.interface";

export interface PaginationProps extends ComponentProps {
  /**
   * 总共的条目数量
   */
  num: number;
  /**
   * 第几页
   */
  page: number;
  /**
   * 页宽
   */
  limit: number;
  /**
   * 可见的页码数量
   */
  pageLimit: number;
  /**
   * 当对page进行改变时
   */
  onChange: (e, newPage) => void;
}
