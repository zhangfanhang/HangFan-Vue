<template><div><div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>本阶段将介绍一些常见常考的 html、css 面试题。但请注意 html 并不是面试考察的重点</p>
</div>
<h2 id="如何理解-html-语义化" tabindex="-1"><a class="header-anchor" href="#如何理解-html-语义化" aria-hidden="true">#</a> 如何理解 HTML 语义化？</h2>
<details class="custom-container details"><summary>答案</summary>
<ol>
<li>代码结构清晰，方便阅读，有利于团队合作开发</li>
<li>方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以语义的方式来渲染网页</li>
<li>有利于搜索引擎优化（SEO）</li>
</ol>
</details>
<h2 id="默认情况下-哪些-html-元素是块级元素-哪些是内联元素-行内元素" tabindex="-1"><a class="header-anchor" href="#默认情况下-哪些-html-元素是块级元素-哪些是内联元素-行内元素" aria-hidden="true">#</a> 默认情况下，哪些 HTML 元素是块级元素，哪些是内联元素（行内元素）？</h2>
<details class="custom-container details"><summary>答案</summary>
<h3 id="内联-行内-元素-display-inline" tabindex="-1"><a class="header-anchor" href="#内联-行内-元素-display-inline" aria-hidden="true">#</a> 内联（行内）元素（display:inline）</h3>
<ol>
<li>可以和其他元素处于一行，不用必须另起一行</li>
<li>元素的高度、宽度及顶部和底部边距属性设置无效。(行内元素的 <code v-pre>margin-top</code>、<code v-pre>margin-bottom</code> 和 <code v-pre>padding-top</code>、<code v-pre>padding-bottom</code> 属性设置是无效的，但是必须注意的是，对于 <code v-pre>padding-top</code> 和 <code v-pre>padding-bottom</code> 的设置，从显示效果上来看是增加的，但其实设置是无效的，并不会对周围的元素产生影响)</li>
</ol>
<CodePen
  link="https://codepen.io/zhangfanhang/pen/WNyGWGM"
  :theme="$isDarkMode? 'dark': 'light'"
/>
<ol start="3">
<li>元素的宽度就是它包含的文字、图片的宽度</li>
</ol>
<p>常见的行级元素有：<code v-pre>a</code>、<code v-pre>input</code>、<code v-pre>span</code>、<code v-pre>img</code>、<code v-pre>button</code></p>
<p><code v-pre>img</code>和表单元素是行内块<code v-pre>display:inline-block</code>，他们既可以设置宽度高度，也能并排显示</p>
<h3 id="块级元素-display-block" tabindex="-1"><a class="header-anchor" href="#块级元素-display-block" aria-hidden="true">#</a> 块级元素（display:block）</h3>
<ol>
<li>每个块级元素都是独自占一行，其后的元素也只能另起一行，两个元素不能共用一行。</li>
<li>元素的高度、宽度、行高和顶底边距都是可以设置的。</li>
<li>元素的宽度如果不设置的话，默认为父元素的宽度。</li>
</ol>
<p>常见的块级元素有 <code v-pre>div</code>、<code v-pre>p</code>、<code v-pre>h1...h6</code>、<code v-pre>ol</code>、<code v-pre>ul</code>、<code v-pre>dl</code>、<code v-pre>dt</code>、<code v-pre>li</code>、<code v-pre>table</code>、<code v-pre>form</code></p>
</details>
<h2 id="盒模型宽度的计算" tabindex="-1"><a class="header-anchor" href="#盒模型宽度的计算" aria-hidden="true">#</a> 盒模型宽度的计算</h2>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">#div1</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 1px solid red<span class="token punctuation">;</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>div1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请问 div1 的<strong>offsetWidth</strong>是多大？</p>
<details class="custom-container details"><summary>答案</summary>
<p>122px</p>
</details>
<p>如果要让<strong>offsetWidth</strong>的值等于 100px,怎么做？</p>
<details class="custom-container details"><summary>答案</summary>
<p><strong>box-sizing:border-box</strong>,此时盒子的 width=内容的宽度+左右 padding+左右 border=offsetWidth。所以<strong>内容的宽度会变小</strong></p>
</details>
<h2 id="margin-纵向重叠问题" tabindex="-1"><a class="header-anchor" href="#margin-纵向重叠问题" aria-hidden="true">#</a> margin 纵向重叠问题</h2>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code>   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">p</span><span class="token punctuation">{</span>
            <span class="token property">font-size</span><span class="token punctuation">:</span>16px<span class="token punctuation">;</span>
            <span class="token property">line-height</span><span class="token punctuation">:</span>16px<span class="token punctuation">;</span>
            <span class="token property">margin-top</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
            <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 15px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>aaa<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>bbb<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>aaa 和 bbb 之间的距离？</p>
<details class="custom-container details"><summary>答案</summary>
<ul>
<li>相邻元素的 margin-top 和 margin-bottom 会发生重叠</li>
<li>空白内容的 p 也会重叠</li>
<li>所以答案为<strong>15px</strong></li>
</ul>
</details>
<h2 id="margin-负值问题" tabindex="-1"><a class="header-anchor" href="#margin-负值问题" aria-hidden="true">#</a> margin 负值问题</h2>
<ul>
<li>top，left 为负值，元素向上、向左移动</li>
<li>right 负值 右侧元素左移，自身不受影响</li>
<li>bottom 负值，下方元素上移，自身不受影响</li>
</ul>
<h2 id="bfc-理解与应用" tabindex="-1"><a class="header-anchor" href="#bfc-理解与应用" aria-hidden="true">#</a> BFC 理解与应用</h2>
<ul>
<li>块级格式化上下文</li>
<li>一块独立渲染区域，内部元素的渲染不会影响边界以外的元素。</li>
<li>形成 BFC 的条件？</li>
</ul>
<ol>
<li>
<p>float 的值不是 none</p>
</li>
<li>
<p>positon 的值不是 static 或者 relative</p>
</li>
<li>
<p>display 的值是 inline-block,flex,或者 inline-flex</p>
</li>
<li>
<p><strong>overflow:hidden</strong></p>
</li>
</ol>
<h2 id="float-布局-实现圣杯和双飞翼布局" tabindex="-1"><a class="header-anchor" href="#float-布局-实现圣杯和双飞翼布局" aria-hidden="true">#</a> float 布局：实现圣杯和双飞翼布局</h2>
<blockquote>
<p><a href="https://www.zhihu.com/question/21504052" target="_blank" rel="noopener noreferrer">CSS 布局中圣杯布局与双飞翼布局的实现思路差异在哪里？<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="圣杯和双飞翼布局的目的" tabindex="-1"><a class="header-anchor" href="#圣杯和双飞翼布局的目的" aria-hidden="true">#</a> 圣杯和双飞翼布局的目的</h3>
<ul>
<li>三栏布局，中间一栏最先加载和渲染（内容最重要）</li>
<li>两侧内容固定，中间内容随着宽度自适应</li>
<li>一般用于 PC 网页</li>
</ul>
<h3 id="技术总结" tabindex="-1"><a class="header-anchor" href="#技术总结" aria-hidden="true">#</a> 技术总结</h3>
<ul>
<li>使用 float 布局</li>
<li>两侧使用 margin 负值，以便和中间内容横向重叠</li>
<li>防止中间内容被两侧覆盖，一个用 padding 一个用 margin</li>
</ul>
<h3 id="圣杯布局" tabindex="-1"><a class="header-anchor" href="#圣杯布局" aria-hidden="true">#</a> 圣杯布局</h3>
<div class="custom-container warning">
<p class="custom-container-title">特别注意</p>
<p>min-width 就是页面的最小宽度：要想保证该布局效果正常显示，由于两侧都具有固定的宽度，所以需要给定页面一个最小的宽度，但这并不只是简单的 200+150=350px。回想之前 left 使用了 position: relative，所以就意味着在 center 开始的区域，还存在着一个 left 的宽度。所以页面的最小宽度应该设置为 200+150+200=550px</p>
<p>css 中，min-width 是用来限制元素的最小宽度，max-width 用来限制元素的最大宽度，也就是说当元素的 width 大于 max-width,或者小于 min-width。就被它们的值所代替，尤其适用于网站的自适应。</p>
<p><a href="https://www.cnblogs.com/ypppt/p/13111087.html" target="_blank" rel="noopener noreferrer">理解 css 中 min-width 和 max-width，width 与它们之间的区别联系<ExternalLinkIcon/></a></p>
</div>
<CodePen
  link="https://codepen.io/zhangfanhang/pen/WNdXamY"
  :theme="$isDarkMode? 'dark': 'light'"
/>
<h3 id="双飞翼布局" tabindex="-1"><a class="header-anchor" href="#双飞翼布局" aria-hidden="true">#</a> 双飞翼布局</h3>
<div class="custom-container warning">
<p class="custom-container-title">注意</p>
<p>由于双飞翼布局没有用到 position:relative 进行定位，所以最小页面宽度应该为 200+150=350px。但是当页面宽度缩小到 350px 附近时，会挤占中间栏的宽度，使得其内容被右侧栏覆盖，因此在设置最小页面宽度时，应该适当增加一些宽度以供中间栏使用</p>
</div>
<CodePen
  link="https://codepen.io/zhangfanhang/pen/mdpqvqW"
  :theme="$isDarkMode? 'dark': 'light'"
/>
<h3 id="两者区别" tabindex="-1"><a class="header-anchor" href="#两者区别" aria-hidden="true">#</a> 两者区别</h3>
<p>双飞翼布局比圣杯布局多创建了一个 div，但不用相对布局了,终究还是 flex 布局舒服！（<strong>flex 实现,代码见 flex 布局</strong>）</p>
<h2 id="float-布局-手写-clearfix" tabindex="-1"><a class="header-anchor" href="#float-布局-手写-clearfix" aria-hidden="true">#</a> float 布局：手写 clearfix</h2>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">.clearfix:after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">''</span><span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> table<span class="token punctuation">;</span>
  <span class="token property">clear</span><span class="token punctuation">:</span> both<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 兼容ie低版本 */</span>
<span class="token selector">.clearfix</span> <span class="token punctuation">{</span>
  *<span class="token property">zoom</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="flex-布局" tabindex="-1"><a class="header-anchor" href="#flex-布局" aria-hidden="true">#</a> flex 布局</h2>
<h3 id="实现一个三点的色子" tabindex="-1"><a class="header-anchor" href="#实现一个三点的色子" aria-hidden="true">#</a> 实现一个三点的色子</h3>
<CodePen
  link="https://codepen.io/zhangfanhang/pen/JjMOxmG"
  :theme="$isDarkMode? 'dark': 'light'"
/>
<h2 id="display-none、visibility-hidden-和-opacity-0-之间的区别" tabindex="-1"><a class="header-anchor" href="#display-none、visibility-hidden-和-opacity-0-之间的区别" aria-hidden="true">#</a> display:none、visibility:hidden 和 opacity:0 之间的区别？</h2>
<p><img src="https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/dis区别.png" alt="dis区别"></p>
<div class="custom-container tip">
<p class="custom-container-title">扩展：visibility 还有哪些其他的属性值？</p>
<p><img src="https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/visibility可能的值.png" alt="visibility可能的值"></p>
</div>
<h2 id="居中的实现方式" tabindex="-1"><a class="header-anchor" href="#居中的实现方式" aria-hidden="true">#</a> 居中的实现方式</h2>
<p><a href="https://blog.csdn.net/qq_38164763/article/details/91360196" target="_blank" rel="noopener noreferrer">绝对定位+margin auto 垂直居中引发的思考<ExternalLinkIcon/></a></p>
<h3 id="水平居中" tabindex="-1"><a class="header-anchor" href="#水平居中" aria-hidden="true">#</a> 水平居中</h3>
<ul>
<li>inline 元素:text-align:center</li>
<li>block 元素：margin: 0 auto（margin:auto）</li>
<li>absolute 元素：left:50%+margin-left:-宽度的一半</li>
<li>absolute 元素：各个方向为 0，margin:0 auto</li>
</ul>
<h3 id="垂直居中" tabindex="-1"><a class="header-anchor" href="#垂直居中" aria-hidden="true">#</a> 垂直居中</h3>
<ul>
<li>inline 元素:line-height 的值等于 height 值</li>
<li>absolute 元素：top:50%+margin-top:-高度的一半</li>
<li></li>
</ul>
<h3 id="垂直水平居中" tabindex="-1"><a class="header-anchor" href="#垂直水平居中" aria-hidden="true">#</a> 垂直水平居中</h3>
<ul>
<li>
<p>absolute 元素：利用 top:50%,left:50%和 margin-top,margin-left (元素尺寸已知可用)</p>
</li>
<li>
<p>absolute 元素：利用 top:50%,left:50%和利用 transfrom:translate(-50%,-50%)(元素尺寸不知道也可以用)</p>
</li>
<li>
<p>absolute 元素： top,left,bottom,right=0+margin:auto(元素尺寸不知道也可以用)</p>
</li>
<li>
<p>flex：align-items:center;justify-content:center;</p>
</li>
</ul>
<h2 id="line-height-如何继承" tabindex="-1"><a class="header-anchor" href="#line-height-如何继承" aria-hidden="true">#</a> line-height 如何继承</h2>
<p><img src="https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/line-height如何继承.png" alt="line-height 如何继承"></p>
<ul>
<li>写具体数值，如 30px，则继承该值（比较好理解），</li>
<li>写比例，如 2/1.5，则继承该比例（比较好理解），</li>
<li>写百分比，如 200%，则继承计算出来的值（考点）</li>
</ul>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height" target="_blank" rel="noopener noreferrer">line-height<ExternalLinkIcon/></a></p>
<h2 id="rem" tabindex="-1"><a class="header-anchor" href="#rem" aria-hidden="true">#</a> rem</h2>
<p>rem 是一个长度单位，</p>
<ul>
<li>px，绝对长度单位，最常用</li>
<li>em,相对长度单位，相对于父元素，不常用</li>
<li>rem,相对长度单位，相对根元素，常用于<strong>响应式布局</strong></li>
</ul>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">html</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span> // 1rem等于html元素上字体设置的大小
<span class="token punctuation">}</span>
<span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 0.16rem<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="用-css-画个三角形" tabindex="-1"><a class="header-anchor" href="#用-css-画个三角形" aria-hidden="true">#</a> 用 css 画个三角形</h2>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">#box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-left</span><span class="token punctuation">:</span> 50px solid transparent<span class="token punctuation">;</span>
  <span class="token property">border-right</span><span class="token punctuation">:</span> 50px solid transparent<span class="token punctuation">;</span>
  <span class="token property">border-bottom</span><span class="token punctuation">:</span> 100px solid red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="谈谈你对-css-盒模型的认识" tabindex="-1"><a class="header-anchor" href="#谈谈你对-css-盒模型的认识" aria-hidden="true">#</a> 谈谈你对 CSS 盒模型的认识</h2>
<p>标准盒子模型，即 box-sizing content-box，浏览器默认模型，我们所写的 width 和 height 并不是最终盒子的宽高，而是 content 的，盒子的宽高由我们的 content+padding+border 来组成的，但是这样在做项目时可能会遇到小问题，假如我想构建一个 100x100 的盒子大小，但是我发现我写的是 width 和 height 是 100，于是我需要加上 padding 及 border，但是加上去之后，盒子也会相应变大，这就造成改动麻烦。</p>
<p>后面 css3 中提供了 IE 盒子模型，能够直接控制盒子的大小。于是项目中大多数用上了 IE 盒子模型，以及我看过 bootstrap 以及 element-ui 源码中大部分也是用的 IE 盒子模型</p>
</div></template>


