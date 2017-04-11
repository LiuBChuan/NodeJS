;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-close" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M157.736316 156.273252c76.198518-76.198518 174.454978-125.621167 283.00707-141.212728 132.69806-19.048726 264.930107 14.757073 372.24311 95.135257 107.338291 80.407084 176.947605 197.791745 196.010781 330.515092 39.358216 274.073351-151.638411 528.967925-425.570874 568.347816-114.863134 16.48385-232.652395-7.586256-331.671093-67.701912-16.935412-10.302858-22.314429-32.360799-12.040471-49.274536 10.367883-16.808975 32.324674-22.339716 49.267311-12.044084 84.81795 51.554025 185.765724 72.166965 284.256996 58.016792 234.751259-33.668525 398.459042-252.199647 364.761617-487.149594-16.332124-113.754096-75.996218-214.351457-168.017498-283.245495-91.999605-68.92655-205.3202-97.859084-319.045396-81.505285C215.930121 119.83755 52.298201 338.39396 86.049813 573.286107c8.843406 61.49202 30.19691 118.9561 63.543922 170.759388 10.69662 16.693375 5.834192 38.953616-10.72552 49.577986-16.65725 10.72552-38.874141 5.902829-49.570761-10.729133-38.928329-60.581669-63.883497-127.622493-74.251379-199.410146-19.041501-132.701672 14.735398-264.969844 95.19667-372.308135C124.869766 191.574628 140.746716 173.262852 157.736316 156.273252L157.736316 156.273252 157.736316 156.273252zM157.736316 156.273252"  ></path>' +
    '' +
    '<path d="M566.155027 506.631821l155.063064-153.379637c14.08876-13.911748 14.197135-36.612714 0.285388-50.705087-13.91536-14.095985-36.652452-14.20436-50.7087-0.292613l-155.272589 153.563875L362.615791 302.438722c-14.027348-14.01651-36.688577-14.095985-50.712312-0.068638-14.020123 13.983998-14.05986 36.677739-0.068638 50.705087l152.689649 153.162887-153.954025 152.299499c-14.08876 13.955098-14.197135 36.616327-0.285388 50.712312 7.026318 7.10218 16.249037 10.646045 25.500656 10.646045 9.107119 0 18.214238-3.475228 25.208043-10.360658l154.167163-152.480124 155.417089 155.922839c6.993805 7.02993 16.173174 10.544895 25.388669 10.544895 9.179369 0 18.322613-3.514965 25.316419-10.472645 14.020123-13.980385 14.056248-36.652452 0.07225-50.705087L566.155027 506.631821 566.155027 506.631821 566.155027 506.631821zM566.155027 506.631821"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)