export default function themeChanger(themes: { [s: string]: () => Promise<any> }) {
    const getStyle = (theme: string): HTMLStyleElement | null => {
        return document.querySelector<HTMLStyleElement>(`style[data-theme*=theme-${theme}],link[href*=theme-${theme}]:not([rel="prefetch"])`);
    };

    const toggleStyle = (style: HTMLStyleElement, state: boolean) => {
        if (state) {
            style.removeAttribute('media');
        } else {
            style.setAttribute('media', 'max-width: 1px');
        }
    };

    const disableOthersStyles = (theme: string) => {
        const styles = document.querySelectorAll<HTMLStyleElement>(`
            style[data-theme*=theme]:not([data-theme*=theme-${theme}]),
            link[href*=theme]:not([href*=theme-${theme}]):not([rel="prefetch"])
        `);
        styles.forEach(style => toggleStyle(style, false));
    };

    const fetch = async (theme: string) => {
        const styles = new Set(document.querySelectorAll('style:not([url~=""])'));
        await themes[theme]();
        let themeStyle = Array.from(document.querySelectorAll('style')).filter(s => !styles.has(s))
            .find(s => s.innerText.includes(`/**@theme:${theme}*/`))
        if (themeStyle) {
            themeStyle.dataset.theme = `theme-${theme}`;
        }
    }

    return async (theme: string) => {
        const themeStyle = getStyle(theme);
        if (themeStyle) {
            toggleStyle(themeStyle, true);
            disableOthersStyles(theme);
            return;
        }
        await fetch(theme);
        disableOthersStyles(theme);
    };
}