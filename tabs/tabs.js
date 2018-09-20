class Tabs {
  constructor(option) {
    const defaultOption = {
      active: 0,
      event: 'click',
      heightStyle: 'content',
      element: document.getElementsByTagName('body'),
    } 
    option = Object.assign({},defaultOption,option)
    this.option = option

    this._processTabs()
    
    this.option.active = this._initActive()

    this._refresh()
  }

  _isLocal(anchor) {
    const hashPattern = /#.*$/i
    anchorUrl = anchor.href.replace(hashPattern,'')
    currentUrl = location.href.replace(hashPattern,'')
    
    try {
      anchorUrl = decodeURIComponent(anchorUrl)
    } catch (error) {}
    try {
      currentUrl = decodeURIComponent(currentUrl)
    } catch (error) {}

    return currentUrl === anchorUrl
  }

  _initActive() {
    const active = this.option.active
    
    if (active === null) {
      return 2
    }

    return active
  }

  _processTabs() {
    const {element} = this.option
    const that = this

    this.tabs = $(element).find('li')
    this.anchors = this.tabs.find('a')
    this.panels = $()
    this.anchors.each(function(index, anchor) {
      that.panels = that.panels.add($(element).find('#' + $(this).attr('href').substr(1)))
    })  

    this.tabs.on(this.option.event, 'a',this._eventHandler.bind(this))
  }

  _eventHandler(event) {
    const target = event.target
    const prevActive = this.option.active
    const curActive = this.anchors.index($(target))

    if (curActive === prevActive) {
      return
    }

    this.option.active = curActive
    this._toggleTab(curActive)
    this._toggleTab(prevActive)
  }

  _toggleTab(index) {
    const tab = this.tabs.eq(index)
    const panel = this.panels.eq(index)

    if (index === this.option.active) {
      tab.addClass('ui-state-active')
      panel.show()
    } else {
      tab.removeClass('ui-state-active')
      panel.hide()
    }
  }

  _refresh() {
    this.tabs.removeClass('ui-state-active')
    this.panels.hide()
    this._toggleTab(this.option.active)
  }
}