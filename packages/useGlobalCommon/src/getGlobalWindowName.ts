export type GetGlobalWindowName = (
  type: string,
  path: string,
  prefix: string,
) => string;

const getMicroUIWindowName: GetGlobalWindowName = (type, path, prefix) =>
  `__${prefix}_${path}_${type}__`;

export default getMicroUIWindowName;
