declare class FaviconNotify {
    private readonly options;
    private readonly favicon;
    private readonly ico;
    private appleFavicon;
    private counter;
    private icoLoaded;
    private forceNotCount;
    private readyCallback;
    constructor(options?: {}, favicon?: HTMLLinkElement);
    private init;
    ready(cb: () => any): void;
    private drawIcon;
    private addFavicon;
    add(forceNotCount?: boolean): FaviconNotify;
    remove(forceNotCount?: boolean): FaviconNotify;
}
export default FaviconNotify;
