import {ElMessageBox} from "element-plus"

/**
 * @param message
 * @param title
 * @returns {Promise<MessageBoxData>}
 * @description ElMessageBox Hook
 */
export function useMessageBox(message, title) {
    return ElMessageBox.confirm(
        message,
        title,
        {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
        }
    )
}