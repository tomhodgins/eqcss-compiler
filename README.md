![](http://i.imgur.com/7s5H1SB.png)

# EQCSS Compiler

**A compiler to turn [CSS Element Queries](https://github.com/tomhodgins/element-queries-spec) using the [EQCSS syntax](https://github.com/eqcss/eqcss) into equivalent (vanilla) JavaScript**

## What is EQCSS?

[EQCSS](http://elementqueries.com) is a non-standard syntax for writing CSS, but unlike other CSS dialects like SASS, Less, and Stylus which are all preprocessed languages, EQCSS is a CSS dialect intended to be interpreted. Because of the dynamic nature of EQCSS code it cannot be compiled or 'flattened' to CSS alone, but it can be output as JavaScript that can run on a web page beside the elements it styles.

## Why would I compile EQCSS?

Currently the only way to use EQCSS on a website is by including EQCSS syntax inside CSS styles, or by loading a separate EQCSS file as a script. In both cases, the EQCSS syntax is parsed in realtime by a JavaScript plugin and styles are applied as needed to the page. This compiler attempts to parse your EQCSS in advance and output all the necessary JavaScript code to apply the same styles.

Maybe you want to do this because you want to use EQCSS as an abstraction layer for writing Javascript to solve element-query related problems.

There could be a performance benefit to compiling EQCSS to JavaScript, at this point it's too early to say.

It could be that a compiler built for EQCSS that was aware of other information, like what HTML the styles were applying to, could make smarter choices for performance than the realtime plugin as well.

## How do you use this plugin?

Eventually the plan for this plugin is to create a command-line tool that can consume EQCSS input, or file(s) and output JavaScript code.

In the meantime while research is just starting the prototype is being built in index.html using JavaScript and two `textarea` elements. You can enter EQCSS code into the left and every keyup the output on the right will update with the equivalent JavaScript code.

## Status

**Work in Progress: Do not use for serious work**

This tool is in the planning stages and all code is expected to change form and content many times. Feel free to experiment, fork, comment, or even use this, but do not rely on it for anything serious!

### Support

Currently supporting:

- [`min-width`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#min-width)
- [`max-width`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#max-width)
- [`min-height`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#min-height)
- [`max-height`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#max-height)

Not currently supporting:

- [`min-lines`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#min-lines)
- [`max-lines`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#max-lines)
- [`min-characters`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#min-characters)
- [`max-characters`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#max-characters)
- [`min-children`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#min-children)
- [`max-children`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#max-children)
- [`min-scroll-x`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#min-scroll-x)
- [`max-scroll-x`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#max-scroll-x)
- [`min-scroll-y`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#min-scroll-y)
- [`max-scroll-y`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#max-scroll-y)
- [`orientation`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#orientation)
- [`min-aspect-ratio`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#min-aspect-ratio)
- [`max-aspect-ratio`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#max-aspect-ratio)
- [`eval("")`](https://tomhodgins.github.io/element-queries-spec/element-queries.html#eval)
- [`ew` units](https://tomhodgins.github.io/element-queries-spec/element-queries.html#ew)
- [`eh` units](https://tomhodgins.github.io/element-queries-spec/element-queries.html#eh)
- [`emin` units](https://tomhodgins.github.io/element-queries-spec/element-queries.html#emin)
- [`emax` units](https://tomhodgins.github.io/element-queries-spec/element-queries.html#emax)
- [`$this` meta-selector](https://tomhodgins.github.io/element-queries-spec/element-queries.html#selectordef-meta-selectors-this)
- [`$parent` meta-selector](https://tomhodgins.github.io/element-queries-spec/element-queries.html#selectordef-meta-selectors-parent)
- [`$prev` meta-selector](https://tomhodgins.github.io/element-queries-spec/element-queries.html#selectordef-meta-selectors-prev)
- [`$next` meta-selector](https://tomhodgins.github.io/element-queries-spec/element-queries.html#selectordef-meta-selectors-next)
- [`$it` meta-selector](https://tomhodgins.github.io/element-queries-spec/element-queries.html#selectordef-meta-selectors-it)

## More links

If you're looking for more information about EQCSS, scoped styles, or want to read more about how this all works, follow the links below:

- [EQCSS Project](https://github.com/eqcss/eqcss)
- [Element Queries Spec](https://github.com/tomhodgins/element-queries-spec)
- [EQCSS Technical Documentation](https://github.com/eqcss/eqcss/wiki/EQCSS-1.0.0-~-Technical-documentation)
- [How Style Scoping Works with Element Queries](http://codepen.io/tomhodgins/post/how-style-scoping-works-with-element-queries)- [The Search For The Holy Grail: How I Ended Up With Element Queries, And How You Can Use Them Today](https://www.smashingmagazine.com/2016/07/how-i-ended-up-with-element-queries-and-how-you-can-use-them-today/)
