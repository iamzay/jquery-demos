class DatePicker {
  constructor(option) {
    const defaultOption = {
      weekDays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      currentDate: new Date(),
      selected: null,
    }
    this.option = $.extend({}, defaultOption, option)
    this.template = `
    <main class="ui-datepicker">
      <header class="ui-datepicker-header">
          <button>
            <
          </button> 
          <div>
            <span class="ui-datepicker-month">
              month
            </span>
            <span class="ui-datepicker-year">
              year
            </span>
          </div>
          <button>
            >
          </button>
      </header>
      <section class="ui-datepicker-body">
        <table>
          <thead></thead>
          <tbody></tbody>
        </table>
      </section>
    </main>
        `.trim()
    
    this._init()
  }

  _init() {
    const {element,weekDays} = this.option
    this.datePicker = $(this.template).insertAfter($(element))
    this.table = this.datePicker.find('.ui-datepicker-body table')

    this.weekDays = $('<tr></tr>')
    $.each(weekDays, (index, day) => {
      this.weekDays.append($(`<th>${day}</th>`))
    })
    this.datePicker.find('table thead').append(this.weekDays)

    this._setPosition()

    this._renderHeader()
    this._renderBody()

    this._bindEvents()
  }

  _setPosition() {
    const {element} = this.option
    const inputOffset = $(element).offset()
    const inputHeight = $(element).outerHeight(true)

    this.datePicker.offset( {
      left: inputOffset.left,
      top: inputOffset.top + inputHeight,
    })
  }

  _bindEvents() {
    const {currentDate,element} = this.option
    const header = this.datePicker.find('header>button')
    header.click(event => {
      let month
      if(header.index(event.target) === 0) {
        month = currentDate.getMonth() - 1
      } else {
        month = currentDate.getMonth() + 1 
      }
      this.option.currentDate.setMonth(month)
      
      this._renderHeader()
      this._renderBody()
    })

    const body = this.datePicker.find('.ui-datepicker-body tbody')
    body.on('click','td',event => {
      const target = $(event.target)
      if(!(target.text())) {
        return
      }

      const d = new Date(currentDate.getTime())
      d.setDate(parseInt(target.text()))
      this._changeSelected(d)

      this.datePicker.hide()
      $(element).val(this.option.selected.toDateString())
    })

    $(element).focus(() => this.datePicker.show())
  }

  _changeSelected(date) {
    const {selected} = this.option

    const getDayCell = day => {
      return this.table.find('tbody td').filter((index,element) => {
        return parseInt(element.textContent) === day
      })
    }

    if(selected) {
      const day = selected.getDate()
      getDayCell(day).removeClass('ui-datepicker-selected')
    }
    
    getDayCell(date.getDate()).addClass('ui-datepicker-selected')

    this.option.selected = date
  }

  _renderHeader() {
    const {currentDate} = this.option
    this.datePicker.find('.ui-datepicker-month').text(currentDate.getMonth() + 1)
    this.datePicker.find('.ui-datepicker-year').text(currentDate.getFullYear())
  }

  _renderBody() {
    const {currentDate,selected} = this.option
    const monthArray = []
    const monthDays = DatePicker.getMonthDays(currentDate)
    const firstDayIndex = DatePicker.getFirstDayIndex(currentDate)

    let n = firstDayIndex
    while(n--) {
      monthArray.push(0)
    }
    
    for(let i = 1; i <= monthDays; ++i) {
      monthArray.push(i)
    }

    const rows = Math.ceil(monthArray.length / 7)
    n = rows * 7 - monthArray.length
    while(n--) {
      monthArray.push(0)
    }

    const table = this.datePicker.find('.ui-datepicker-body tbody')
    table.empty()
    let row,cell;
    for(let i = 0; i < monthArray.length; ++i) {
      if(!(i % 7)) {
        row = $('<tr></tr>')
      }
      cell = $('<td></td>')
      cell.text(monthArray[i] ? monthArray[i] : '')
      if(selected && selected.getFullYear() === currentDate.getFullYear() &&
         selected.getMonth() === currentDate.getMonth() &&
         selected.getDate() === monthArray[i]
        ) {
        cell.addClass('ui-datepicker-selected')
      }
      row.append(cell)
      if(i % 7 === 6 ) {
        table.append(row)
      }
    }
  }

  static getFirstDayIndex(date) {
    const d = new Date(date.getTime())
    d.setDate(1)
    return d.getDay()
  }

  static getMonthDays(date) {
    const d = new Date(date.getTime())
    d.setDate(1)
    d.setMonth(d.getMonth() + 1)
    d.setDate(d.getDate() - 1)
    return d.getDate()
  }
} 
