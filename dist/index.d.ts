declare class FaviconNotify {
    private readonly options;
    private readonly favicon;
    private readonly ico;
    private counter;
    private icoLoaded;
    private forceNotCount;
    private readyCallback;
    constructor(options?: {}, favicon?: HTMLLinkElement);
    private init;
    private drawIcon;
    private addFavicon;
    /***
     * Executes the passed callback when the Favicon Notify instance is initialized.
     *
     * @param cb // Callback function
     * @return void
     */
    ready(cb: () => any): void;
    /***
     * Add a notification to the favicon.
     * If the WithCounter option is enabled (by default is disabled),
     * each subsequent call to this method will increment the counter by one.
     * If the WithCounter option is disabled (by default)
     * the value will not be displayed on the favicon instead,
     * an empty notification will be shown.
     *
     * @param forceNotCount: Boolean // Optional. Leaves the counter value unchanged.
     * @return faviconNotify context
     */
    add(forceNotCount?: boolean): FaviconNotify;
    /***
     * Sets the counter value and add notification from the favicon.
     * If the WithCounter option is enabled (by default is disabled),
     * this action will overwrite the counter current value.
     * If the WithCounter option is disabled (by default)
     * the value will not be displayed on the favicon instead,
     * an empty notification will be shown.
     *
     * @param value: Number
     * @return faviconNotify context
     */
    setCounter(value: number): FaviconNotify;
    /***
     * Remove a notification from the favicon.
     * If the "With counter" option is enabled (by default),
     * the counter will be reset to zero.
     *
     * @param forceNotCount: Boolean // Optional. Leaves the counter value unchanged.
     * @return faviconNotify context
     */
    remove(forceNotCount?: boolean): FaviconNotify;
}
export default FaviconNotify;
