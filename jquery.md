# JQuery

## Core
when the document is ready to be worked on:
```javascript
$(document).ready(function () {})

// shorthand
$(function () {})

$('a').addClass('red')

$('a').click(function (event) {
    event.preventDefault()
    $(this).hide('slow')
})
```

### attr
```javascript
$('a').attr('title', 'i am title)

$('a').attr('title')
```

### selection

refining & filtering selections:
* `$('ul li')`.first()
* `.has('p')`
* `.eq(5)` 
* `.not('.bar')`
* `.filter('.cur')`

form elements:
* :disabled
* :enabled
* :checked
* :selected
* :input

for input type:
* :text
* :password
* :radio

getter & setter:
```javascript
$('a').html('').addClass('')
$('a').html()
```

### Manipulating Elements
[Manipulation documentation on api.jquery.com.](http://api.jquery.com/category/manipulation/)  
  
get and set(会影响所有获取到的元素):
* html()
* text()
* attr()
* val()
* position()
* height(), width()

move elements:
* apend()
* appendTo()
* prepend()
* prependTo()
* insertAfter(), insertBefore()
* after(), before()

clone:
* clone(true).appendTo()

remove:
* remove()
* detach()
* empty()

create:
* $('html string')
* $('html string', { "class": xxx})

index:
* eq()
* get() -> HTMLElement
* []

### Traversing
[ API documentation on traversing](http://api.jquery.com/category/traversing/)  
Parents:
* parent(), parents()
* closet()
* parentsUtil()

Children:
* children()
* find()

Sliblings:
* prev(), next()
* prevAll(), nextAll()
* siblings()

### CSS & Dimensions
css style:
* .css('fontSize', '50px')
* .css({ fontSize: '50px'})

### Date
.data(key, value)

### Utility
http://api.jquery.com/category/utilities/  

$.:
* each()
* trim()
* proxy()
* inArray()
* extend()
* isArray()
* type()

### Iterate
* $.each(): for non-jquery collection
* .each(): jquery collection
* $.map()
* .map()

```javascript
$('input').val(function (index, val) {})

$.map(arr, function (value, index) {})
$('input').map(function (index, value) {})
```
```javascript
$('input').props("disabled", true)
$('select').text()
$('select').val()
```

### examples
* .get(0)
* $('input')[0]

## Events
```javascript
$('a').click(function () {})
$('a').on('click', function (event) {
    const elem = $(this)
    console.log(event.originEvent)
})
$('a').one('click', function () {})
```

### Effects
* show
* hide
* slideDown, slideUp
* fadeIn, fadeOut
* toggle
* slideToggle, fadeToggle
* slideToggle, fadeToggle
* stop, delay

### Ajax
```javascript
$.ajax({
    url: '/api/address',
    data: {
        a: 1,
    },
    type: 'GET',
    dataType: 'json',
}).done(function (json) {})
  . fail(function (xhr, status, error) {})
  .always(function (xhr, status) {})

$('#form').serialize()
$('#form').serializeArray()
$.ajaxPrefilter()

// ajax events
$(#loading).ajaxStart(function () {
    $(this).show()
}).ajaxStop(function () {
    $(this).hide()
})
```

### Plugins
```js
(function($) {
    $.fn.greenify = function () {
        this.css(...)
        return this

        return this.each(...)
    }
})(jQuery)

(function($){
    $.fn.getLinkLocation = function () {
        this.filter('a').each(function (){
            $(this).append($(this).attr('href'))
        })
        return this
    }
})(jQuery)
```

### Performance
减少在循环中的dom操作
```js
const html = ''
$.each(myArray, function (i, elem) {
    html += '<li>' + elem + '</li>'
})
xxx.html(html)
```
使用detach使节点脱离dom
```js
const node = $('xx')
const parent = node.parent()
node.detach()
// 对node进行一系列dom操作
parent.append(node)
```
更好的异常处理-doOnce:
```js
$.fn.doOnce = function(fn) {
    this.length && fn.apply(this)
    return this
}
```
