import { OptionsI } from './types'

class FaviconNotify {
  private readonly options: OptionsI
  private readonly favicon: HTMLLinkElement
  private readonly ico: HTMLImageElement
  private counter: number
  private icoLoaded: boolean
  private forceNotCount: boolean
  private readyCallback: (() => any) | null

  constructor(options = {}, favicon?: HTMLLinkElement) {
    const defaultOptions: OptionsI = {
      faviconUrl: '/favicon.ico',
      labelColor: '#ff0000',
      labelSize: 70, // In percents
      labelOffset: 5, // In percents
      textColor: '#ffffff',
      fontSize: 80, // In percents of labelSize
      fontFamily: 'Arial',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontVOffset: 4,
      withCounter: false,
      startCounterValue: 0,
    }
    this.options = { ...defaultOptions, ...options }
    this.forceNotCount = false
    this.readyCallback = null
    this.icoLoaded = false
    this.counter = this.options.startCounterValue

    if (favicon) {
      this.favicon = favicon
      this.options.faviconUrl = this.favicon.href
    } else {
      this.favicon = document.createElement('link')
      this.favicon.rel = 'icon'
      this.favicon.type = 'image/x-icon'
    }

    this.ico = new Image()
    this.ico.crossOrigin = 'Anonymous'
    this.ico.src = this.options.faviconUrl

    this.init()
  }

  private init() {
    this.ico.addEventListener('load', () => {
      this.icoLoaded = true
      this.favicon.href = this.ico.src
      const head = document.getElementsByTagName('head')[0]
      head.appendChild(this.favicon)
      this.readyCallback !== null && this.readyCallback()
    })
  }

  private drawIcon() {
    if (!this.icoLoaded) {
      throw new Error('Favicon not loaded')
    }
    if (!this.counter && this.forceNotCount) {
      return this.ico.src
    }
    const cnv = document.createElement('canvas')
    cnv.width = this.ico.width
    cnv.height = this.ico.height
    const ctx = cnv.getContext('2d')
    const width = cnv.width
    const height = cnv.height
    const labelSize = (width * this.options.labelSize) / 100
    const labelOffset = (width * this.options.labelOffset) / 100
    const labelCenterX = width - labelSize / 2 + labelOffset
    const labelCenterY = height - labelSize / 2 + labelOffset
    const labelRadius = labelSize / 2 - labelOffset
    const fontSize = (labelRadius * 2 * this.options.fontSize) / 100
    if (ctx) {
      ctx.clearRect(0, 0, width, height)
      ctx.beginPath()
      ctx.fillStyle = this.options.labelColor
      ctx.arc(labelCenterX, labelCenterY, labelRadius, 0, Math.PI * 2)
      ctx.fill()
      ctx.closePath()
      if (this.options.withCounter) {
        !this.forceNotCount && this.counter++
        const value = this.counter < 100 ? this.counter.toString() : '99+'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.font = `${this.options.fontWeight} ${this.options.fontStyle} ${fontSize}px ${this.options.fontFamily}`
        ctx.fillStyle = this.options.textColor
        ctx.fillText(value, labelCenterX, labelCenterY + this.options.fontVOffset, fontSize)
      }
      const mask = new Path2D()
      mask.moveTo(0, 0)
      mask.lineTo(width, 0)
      mask.lineTo(width, labelCenterY)
      mask.arc(labelCenterX, labelCenterY, labelSize / 2, 0, Math.PI / 2, true)
      mask.lineTo(0, height)
      ctx.clip(mask)
      ctx.drawImage(this.ico, 0, 0)
    } else {
      throw new Error('<canvas> not supported!')
    }
    return cnv.toDataURL()
  }

  private addFavicon(url: string): void {
    this.favicon && (this.favicon.href = url)
  }

  /***
   * Executes the passed callback when the Favicon Notify instance is initialized.
   *
   * @param cb // Callback function
   * @return void
   */
  public ready(cb: () => any): void {
    this.readyCallback = cb
  }

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
  public add(forceNotCount: boolean = false): FaviconNotify {
    this.forceNotCount = forceNotCount
    this.addFavicon(this.drawIcon())
    return this
  }

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
  public setCounter(value: number): FaviconNotify {
    this.counter = value
    this.add(true)
    return this
  }

  /***
   * Remove a notification from the favicon.
   * If the "With counter" option is enabled (by default),
   * the counter will be reset to zero.
   *
   * @param forceNotCount: Boolean // Optional. Leaves the counter value unchanged.
   * @return faviconNotify context
   */
  public remove(forceNotCount: boolean = false): FaviconNotify {
    this.forceNotCount = forceNotCount
    !forceNotCount && (this.counter = 0)
    this.addFavicon(this.ico.src)
    return this
  }
}

export default FaviconNotify
