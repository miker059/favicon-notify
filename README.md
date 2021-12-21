<p align="center" width="100%">
    <img src="https://raw.githubusercontent.com/miker059/favicon-notify/master/example/favicon-example.png" alt="Favicon Notify">
</p>
<h1 align="center">
    Favicon Notify JS
</h1>
<p align="center" width="100%">
    Plugin for displaying notifications on the favicon of the site.
</p>

### Installation

```shell
npm install favicon-notify
```

### Basic usage

```javascript
import FaviconNotify from 'favicon-notify'
// ...

const faviconNotify = new FaviconNotify({
  // Options
}, /* optional */ link ) 
// link - is link to HTMLLinkElement with a favicon. 
// You can specify the url to the favicon in the options 
// object, or pass a link to a specific 'link' element 
// with your favicon with the second parameter, or do not 
// specify anything then the url will be used 
// by default - /favicon.ico

faviconNotify.add() // for add a notification to the favicon
// If the "With counter" option is enabled (by default), 
// each subsequent call to this method will increment 
// the counter by one. 

faviconNotify.remove() // for remove a notification from the favicon
// If the "With counter" option is enabled (by default), 
// the counter will be reset to zero.

faviconNotify.ready(callback) // Call to callback when faviconNotify object 
// will be initialized
```

### Options

| Option name   | Possible values   | Description                                                                                                                    | Default value   |
|---------------|-------------------|--------------------------------------------------------------------------------------------------------------------------------|-----------------|
| faviconUrl    | string            | Specify url to a favicon.                                                                                                      | /favicon.ico    |
| labelColor    | string            | Label color                                                                                                                    | #FF0000         |
| labelSize     | number            | Label size as a percentage of favicon width.                                                                                   | 70              |
| labelOffset   | number            | Label offset as a percentage of favicon width.                                                                                 | 5               |
| textColor     | string            | Text color on a label                                                                                                          | #ffffff         |
| fontSize      | number            | Font size as a percentage of **Label size**                                                                                    | 80              |
| fontFamily    | string            | Font for a text on label                                                                                                       | Arial           |
| fontWeight    | string            | One of the following values '100', '200', '300', '400' , '500', '600', '700', '800', '900', 'normal', 'bold'                   | bold            |
| fontStyle     | string            | One of the following values - 'normal', 'italic'                                                                               | normal          |
| fontVOffset   | number            | Offset to align different fonts vertically. Acceptable values are from -10 to 10. The default value for the Arial font is 4.   | 4               |
| withCounter   | boolean           | With or without a counter                                                                                                      | true            |

