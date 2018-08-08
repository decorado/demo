export interface DialogAction {
    label?: string;
    i18nLabel?: string;
    callback: Function;
}
export interface OpenConfiguration {
    width?: any;
    heigth?: any;
    title?: any;
    actions?: any;
    context?: any;
}
