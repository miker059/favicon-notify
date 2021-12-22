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
}, /* optional */ link = null )
/***
* link - is link to HTMLLinkElement with a favicon.
* You can specify the url to the favicon in the options
* object, or pass a link to a specific 'link' element
* with your favicon with the second parameter, or do not
* specify anything then the url will be used
* by default - /favicon.ico
*/

/***
 * Executes the passed callback when the Favicon Notify instance is initialized.
 * 
 * @param callback // Callback function
 * @return void
 */
faviconNotify.ready(callback)

/***
 * Add a notification to the favicon
 * If the WithCounter option is enabled (by default is disabled),
 * each subsequent call to this method will increment the counter by one.
 * If the WithCounter option is disabled (by default)
 * the value will not be displayed on the favicon instead,
 * an empty notification will be shown.
 * 
 * @param forceNotCount: boolean // Optional. Leaves the counter value unchanged.
 * @return faviconNotify context
 */
faviconNotify.add(forceNotCount = false)

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
faviconNotify.setCounter(value)

/***
 * Remove a notification from the favicon.
 * If the "WithСounter" option is enabled (by default is disabled),
 * the counter will be reset to zero.
 * 
 * @param forceNotCount: boolean // Optional. Leaves the counter value unchanged.
 * @return faviconNotify context
 */
faviconNotify.remove(forceNotCount = false)
```

### Options

| Option name       | Possible values | Description                                                                                                                  | Default value |
|-------------------|-----------------|------------------------------------------------------------------------------------------------------------------------------|---------------|
| faviconUrl        | string          | Specify url to a favicon.                                                                                                    | /favicon.ico  |
| labelColor        | string          | Label color                                                                                                                  | #FF0000       |
| labelSize         | number          | Label size as a percentage of favicon width.                                                                                 | 70            |
| labelOffset       | number          | Label offset as a percentage of favicon width.                                                                               | 5             |
| textColor         | string          | Text color on a label                                                                                                        | #ffffff       |
| fontSize          | number          | Font size as a percentage of **Label size**                                                                                  | 80            |
| fontFamily        | string          | Font for a text on label                                                                                                     | Arial         |
| fontWeight        | string          | One of the following values '100', '200', '300', '400' , '500', '600', '700', '800', '900', 'normal', 'bold'                 | bold          |
| fontStyle         | string          | One of the following values - 'normal', 'italic'                                                                             | normal        |
| fontVOffset       | number          | Offset to align different fonts vertically. Acceptable values are from -10 to 10. The default value for the Arial font is 4. | 4             |
| withCounter       | boolean         | With or without a counter                                                                                                    | true          |
| startCounterValue | number          | Initial value of a counter                                                                                                   | 0             |

