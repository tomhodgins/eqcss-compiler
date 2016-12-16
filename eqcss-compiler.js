/* EQCSS to JavaScript Compiler */

// Create the compiler object
compiler = {
  data: []
}

compiler.load = function(){

  // Currently this function is hard-coded to the demo page
  // TODO: Make this accept EQCSS code as input, or file(s)

  var input = document.querySelector('#input')

  if (0 < input.value.length){
    compiler.parse(input.value)
  }

}

compiler.parse = function(code){

  // Formatting the EQCSS input
  code = code.replace(/\s+/g,' ') // remove extra whitespace
  code = code.replace(/\/\*[\w\W]*?\*\//g,'') // remove comments
  code = code.replace(/@element/g,'\n@element') // one @lement query per line
  code = code.replace(/(@element.*?\{([^}]*?\{[^}]*?\}[^}]*?)*\}).*/g,'$1') // extract the query

  compiler.data = []

  // for each query
  code.replace(/(@element.*(?!@element))/g,function(string,query){

    dataEntry = {}

    // Extract the selector(s)
    query.replace(/@element ?["']([^"']*)["']/g,function(string,selector){
      dataEntry.selector = selector
    })

    dataEntry.conditions = []

    // Extract reponsive condition & value if present
    query.replace(/and ?\( ?([^:]*) ?: ?([^)]*) ?\)/g,function(string,condition,value){

      var unit = null
      unit = value.replace(/^\d*\.?\d+(\D+)$/,'$1')
      if (unit == value){
        unit = null
      }

      value = value.replace(/^(\d*\.?\d+)\D+$/,'$1')

      dataEntry.conditions.push({condition:condition,value:value,unit:unit})
    })

    query.replace(/{(.*)}/g,function(string,styles){
      dataEntry.styles = styles
    })

    // Add one entry for each scoped style
    compiler.data.push(dataEntry)

  })

  // Transform queries
  compiler.transform(compiler.data)

}

compiler.transform = function(queries){

  // Currently this function is hard-coded to the demo page
  // TODO: return EQCSS code when transformation is complete

  var output = document.querySelector('#output')

  var template = "\
var eqr = (function(){\n\
\n\
  function render(){\n\
\n\
    if (!document.querySelector('[data-eqr]')){\n\
      var element = document.createElement('style')\n\
      element.setAttribute('data-eqr','')\n\
      document.body.appendChild(element)\n\
    }\n\
    var style = document.querySelector('[data-eqr]')\n\
\n\
    var css = ''\n\
\n\
$$selector-list$$\n\
$$selector-rules$$\n\
    style.innerHTML = css\n\
  }\n\
  \n\
  var throttle_available = true\n\
  var throttle_queued = false\n\
  var mouse_down = false\n\
  var timeout = 200\n\
  \n\
  throttle = function(){\n\
    if(throttle_available){\n\
      render()\n\
      throttle_available = false\n\
      setTimeout(function(){\n\
        throttle_available = true\n\
        if(throttle_queued){\n\
          throttle_queued = false\n\
          render()\n\
        }\n\
      }, timeout)\n\
    }\n\
    else{\n\
      throttle_queued = true;\n\
    }\n\
  }\n\
  \n\
  window.addEventListener('resize',throttle)\n\
  window.addEventListener('input',throttle)\n\
  window.addEventListener('click',throttle)\n\
  window.addEventListener('mousedown',function(){\n\
    mouse_down = true;\n\
  });\n\
  window.addEventListener('mouseup',function(){\n\
    mouse_down = false;\n\
    throttle();\n\
  });\n\
  window.addEventListener('mousemove',function(){\n\
    if(mouse_down){\n\
      throttle();\n\
    }\n\
  });\n\
\n\
})()\n"

  var selectorList = ''
  var selectorRules = ''
  var selCount = 0

  for (q in queries){

    // Output 1 selector list per query
    selectorList += "    var sel_"+selCount+" = document.querySelectorAll('"+queries[q].selector+"')\n"

    // Output 1 for() loop with styles for each query
    selectorRules += "    for (tag in sel_"+selCount+"){\n"

    var conditionList = ''
    var elementCount = 0

    // Output responsive conditions (if present)
    if (queries[q].conditions !== undefined){

      var conCount = 0,
          comma = ''

      for (c in queries[q].conditions){

        if (0 < conCount){
          comma = ', '
        }

        switch (queries[q].conditions[c].condition){

          case 'min-width':
            conditionList += comma+'(sel_'+selCount+'[tag].offsetWidth >= '+queries[q].conditions[c].value+')'
            break

          case 'max-width':
            conditionList += comma+'(sel_'+selCount+'[tag].offsetWidth <= '+queries[q].conditions[c].value+')'
            break

          case 'min-height':
            conditionList += comma+'(sel_'+selCount+'[tag].offsetHeight >= '+queries[q].conditions[c].value+')'
            break

          case 'max-height':
            conditionList += comma+'(sel_'+selCount+'[tag].offsetHeight <= '+queries[q].conditions[c].value+')'
            break

        }
      }
    }

    // Add conditions to output code (if present)
    if (conditionList !== ''){
      selectorRules += "      if ("+conditionList+") {\n"
    }

    selectorRules += "      css += '"+queries[q].styles+"'\n\
      }\n"

    if (conditionList !== ''){
      selectorRules += "    }\n"
    }

    selCount++

  }

  template = template.replace(/(\$\$selector-list\$\$)/,selectorList)
  template = template.replace(/(\$\$selector-rules\$\$)/,selectorRules)
  template = template.replace(/(\$\$condition-list\$\$)/,conditionList)

  if (queries){
    output.value = template
  }

}