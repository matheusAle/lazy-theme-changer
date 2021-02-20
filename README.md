# lazy-theme-changer

Load and swich between css themes files easily.

## Install

```
npm i lazy-theme-changer
```
or
```
yarn add lazy-theme-changer
```

## examples

 - React: [demo](https://lazy-theme-changer-react-example.netlify.app) [repo](https://github.com/matheusAle/theme-change-react-example)
 - Vue: [demo](https://lazy-theme-changer-vue-example.netlify.app) [repo](https://github.com/matheusAle/theme-change-vue-example)
 - Angular: [demo](https://lazy-theme-changer-angular-example.netlify.app) [repo](https://github.com/matheusAle/theme-change-angular-example)

## Use
 
Fisrt of all you have to identify your theme file by one of this way:

### Identify by data attribute 

You are using webpack and style-loader, use webpack's inline loader systax to add an atribute `data-theme` in style tag when the file is loaded.
By doing something like:
```ts
const theme = () => 
  import(
    /* webpackChunkName: "theme-dark" */
    /* webpackMode: "lazy" */
    "style-loader?{'injectType':'styleTag','attributes':{'data-theme':'theme-dark'}}!./theme-dark.scss"
  )
```

> *Explanation*:  
> We are using the style-loader with inline loader syntax to parse the file with some helpful arguments: 
> `injectType: 'styleTag'` it will make Webpack insert the generated CSS into a style tag inside the HTML head. 
> This attributes:{'data-theme':''} is to insert an attribute in a style tag that will be used to identify the theme.

### Identify by link href
The library will also search for `link[href*=theme-${theme}]:not([rel="prefetch"])`, link tag that have on href theme-* who isen't a prefetch link. 
For use this will can use the webpack magic comment `/* webpackChunkName: "theme-dark" */`.

### Identify by style comment
you need the add a comment in your theme file like:
```scss
/**@theme:dark*/
```
Imediataly after load an theme, the library will find the inserted style tag that contains this comment pattern and insert the attribute `data-theme`. 

### Activate a theme

```ts
import lazyThemeChanger from 'lazy-theme-changer';

const themes = {
    dark: () => import(
        /* webpackChunkName: "theme-dark" */
        /* webpackMode: "lazy" */
        './theme-dark.scss'
        ),
    light: () => import(
        /* webpackChunkName: "theme-light" */
        /* webpackMode: "lazy" */
        './theme-light.scss'
        ),
};

const changeTheme = lazyThemeChanger(themes)
changeTheme('dark')
```
