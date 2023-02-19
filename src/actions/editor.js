import { COPY_TEXT, TEXT_COPIED, COPY_BUTTON_HOVERED, RENDERURL_CHANGED, DIAGRAM_CHANGED, DIAGRAM_TYPE_CHANGED, DIAGRAM_CHANGED_UPDATE, IMPORT_URL, CLOSE_IMPORT_URL, OPEN_IMPORT_URL, UPDATE_IMPORT_URL, DIAGRAM_HAS_ERROR, ZEN_MODE_CHANGED, WINDOW_RESIZED, KEY_PRESSED, PAN_ZOOM_CHANGE_TOOL, PAN_ZOOM_CHANGE_VALUE, PAN_ZOOM_USE, PAN_ZOOM_TOGGLE, SET_TEXT_HEIGHT } from "../constants/editor";
import delay from "./utils/delay";
import copy from 'copy-to-clipboard';


/**
 * Copy the text associated to the scope
 * 
 * @param {string} scope 
 * @param {string} text
 */
export const copyText = (scope, text) => async (dispatch, getState) => {
    dispatch({ type: COPY_TEXT, scope, text });
    copy(text);
    dispatch({ type: TEXT_COPIED, scope, isCopied: true });
    await delay(1000);
    dispatch({ type: TEXT_COPIED, scope, isCopied: false });
};

/**
 * Indicate that the Copy button from the scope is hovered or not.
 * 
 * @param {string} scope 
 * @param {boolean} isHover 
 */
export const copyButtonHovered = (scope, isHover) => ({ type: COPY_BUTTON_HOVERED, scope, isHover });

/**
 * Called when the renderUrl has changed.
 * 
 * @param {string} renderUrl
 * @returns 
 */
export const renderUrlChanged = (renderUrl) => ({ type: RENDERURL_CHANGED, renderUrl })

let lastChange = null;

/**
 * Called when the diagramText has changed.
 * 
 * @param {string} diagramText 
 * @returns 
 */
export const diagramChanged = (diagramText) => async (dispatch, getState) => {
    dispatch({ type: DIAGRAM_CHANGED, diagramText });
    const currentChange = (new Date()).getTime();
    lastChange = currentChange;
    await delay(750);
    if (lastChange === currentChange) {
        dispatch({ type: DIAGRAM_CHANGED_UPDATE });
    }
}

/**
 * Called when diagramType changed
 * 
 * @param {string} diagramType 
 * @returns 
 */
export const diagramTypeChanged = (diagramType) => ({ type: DIAGRAM_TYPE_CHANGED, diagramType });

/**
 * Called when a new diagram URL has been imported
 * @param {string} url The diagram url to import
 * @returns 
 */
export const importUrl = (url) => ({ type: IMPORT_URL, url });

/**
 * Called when the new digram url window is closed without importing new URL
 * @returns
 */
export const closeImportUrl = () => ({ type: CLOSE_IMPORT_URL });

/**
 * Called when the new digram url window should be shown
 * @returns
 */
export const openImportUrl = () => ({ type: OPEN_IMPORT_URL });

/**
 * Called when the new digram url window update the url
 * @returns
 */
export const updateUrl = (url) => ({ type: UPDATE_IMPORT_URL, url })

/**
 * Called when the digram url resolve an error
 * @returns
 */
export const diagramHasError = (url) => ({ type: DIAGRAM_HAS_ERROR, url })

/**
 * Change zen Mode
 * @param {boolean} zenMode The change mode to set
 * @returns 
 */
export const changeZenMode = (zenMode) => ({ type: ZEN_MODE_CHANGED, zenMode })

/**
 * Called when a key is pressed
 * @param {Object} obj
 * @param {string} obj.code
 * @param {string} obj.key
 * @param {boolean} obj.ctrlKey
 * @param {boolean} obj.shiftKey
 * @param {boolean} obj.altKey
 * @param {boolean} obj.metaKey
 * @returns 
 */
export const keyPressed = ({ code, key, ctrlKey, shiftKey, altKey, metaKey }) => ({ type: KEY_PRESSED, code, key, ctrlKey, shiftKey, altKey, metaKey })

/**
 * Called when the size of the inner window has changed
 * @param {number} width The new width of the inner browser window
 * @param number} height The new height of the inner browser window
 * @returns 
 */
export const onWindowResized = (width, height) => ({ type: WINDOW_RESIZED, width, height })

export const usePanZoom = (use) => ({ type: PAN_ZOOM_USE, use })
export const togglePanZoom = (use) => ({ type: PAN_ZOOM_TOGGLE })
export const changeTool = (tool) => ({ type: PAN_ZOOM_CHANGE_TOOL, tool })
export const changeValue = (value) => ({ type: PAN_ZOOM_CHANGE_VALUE, value })
export const setTextHeight = (height) => ({ type: SET_TEXT_HEIGHT, height })