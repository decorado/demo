export interface DialogAction {
  label?: string;
  i18nLabel?: string;
  callback: Function;
}

export interface OpenConfiguration {
  width?;
  heigth?;
  title?;
  actions?;
  context?;
}
