document.addEventListener('DOMContentLoaded', () => {
  const options = {
    withCounter: true,
    labelSize: 60,
    labelOffset: 5,
    fontSize: 80,
    fontVOffset: 4,
    fontStyle: 'normal',
    fontWeight: 'bold',
    startCounterValue: 1
  }
  const link = document.getElementsByTagName('link')[0]
  const addButton = document.getElementById('add')
  const removeButton = document.getElementById('remove')
  const themeSwitcher = document.getElementById('themeSwitcher')
  const counterSwitcher = document.getElementById('counterSwitcher')
  const counterSetter = document.getElementById('counterSetter')
  const setCounter = document.getElementById('setCounter')
  const sizeRange = document.getElementById('sizeRange')
  const offsetRange = document.getElementById('offsetRange')
  const fontSize = document.getElementById('fontSize')
  const fontVOffset = document.getElementById('fontVOffset')
  const fontStyle = document.getElementById('fontStyle')
  const fontWeight = document.getElementById('fontWeight')

  counterSwitcher.checked = options.withCounter
  counterSetter.value = options.startCounterValue
  sizeRange.value = options.labelSize
  sizeRange.parentNode.getElementsByTagName('span')[0].innerText = `Label size: ${options.labelSize}`
  offsetRange.value = options.labelOffset
  offsetRange.parentNode.getElementsByTagName('span')[0].innerText = `Label offset: ${options.labelOffset}`
  fontSize.value = options.fontSize
  fontSize.parentNode.getElementsByTagName('span')[0].innerText = `Font size: ${options.fontSize}`
  fontVOffset.value = options.fontVOffset
  fontVOffset.parentNode.getElementsByTagName('span')[0].innerText = `Font vertical offset: ${options.fontVOffset}`
  fontStyle.value = options.fontStyle
  fontWeight.value = options.fontWeight

  const faviconNotify = new FaviconNotify(options, link)
  const img = document.getElementById('img')

  faviconNotify.ready(() => {
    faviconNotify.setCounter(options.startCounterValue)
    imageUpdate()
  })

  addButton.addEventListener('click', () => {
    faviconNotify.add()
    imageUpdate()
  })
  removeButton.addEventListener('click', () => {
    faviconNotify.remove()
    imageUpdate()
  })
  themeSwitcher.addEventListener('change', ({ target }) => {
    target.checked ? document.body.classList.add('black') : document.body.classList.remove('black')
  })
  counterSwitcher.addEventListener('change', ({ target }) => {
    faviconNotify.options.withCounter = target.checked
    faviconNotify.remove(true).add(true)
    imageUpdate()
  })
  counterSetter.addEventListener('keyup', ({ keyCode, target }) => {
    if (keyCode === 13) {
      faviconNotify.setCounter(target.value)
      imageUpdate()
    }
  })
  setCounter.addEventListener('click', () => {
    faviconNotify.setCounter(counterSetter.value)
    imageUpdate()
  })
  sizeRange.addEventListener('input', ({ target }) => {
    const value = target.value
    target.parentNode.getElementsByTagName('span')[0].innerText = `Label size: ${value}`
    faviconNotify.options.labelSize = +value
    faviconNotify.remove(true).add(true)
    imageUpdate()
  })
  offsetRange.addEventListener('input', ({ target }) => {
    const value = target.value
    target.parentNode.getElementsByTagName('span')[0].innerText = `Label offset: ${value}`
    faviconNotify.options.labelOffset = +value
    faviconNotify.remove(true).add(true)
    imageUpdate()
  })
  fontSize.addEventListener('input', ({ target }) => {
    const value = target.value
    target.parentNode.getElementsByTagName('span')[0].innerText = `Font size: ${value}`
    faviconNotify.options.fontSize = +value
    faviconNotify.remove(true).add(true)
    imageUpdate()
  })
  fontVOffset.addEventListener('input', ({ target }) => {
    const value = target.value
    target.parentNode.getElementsByTagName('span')[0].innerText = `Font vertical offset: ${value}`
    faviconNotify.options.fontVOffset = +value
    faviconNotify.remove(true).add(true)
    imageUpdate()
  })
  fontStyle.addEventListener('change', ({ target }) => {
    faviconNotify.options.fontStyle = target.value
    faviconNotify.remove(true).add(true)
    imageUpdate()
  })
  fontWeight.addEventListener('change', ({ target}) => {
    faviconNotify.options.fontWeight = target.value
    faviconNotify.remove(true).add(true)
    imageUpdate()
  })


  function imageUpdate() {
    img.src = link.href
  }
})
