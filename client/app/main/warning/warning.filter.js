'use strict';

export function warningLevelFilter() {
  return num => {
    return ['黄色预警', '红色预警'][num];
  };
}

export function warningStatusFilter() {
  return num => {
    return ['未处理', '处理中', '已处理'][num];
  };
}

