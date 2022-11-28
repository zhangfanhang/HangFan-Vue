<template><div><h2 id="vite-环境变量" tabindex="-1"><a class="header-anchor" href="#vite-环境变量" aria-hidden="true">#</a> vite 环境变量</h2>
<p><a href="https://cn.vitejs.dev/guide/env-and-mode.html#env-variables" target="_blank" rel="noopener noreferrer">环境变量和模式<ExternalLinkIcon/></a></p>
<h2 id="axios-的使用" tabindex="-1"><a class="header-anchor" href="#axios-的使用" aria-hidden="true">#</a> axios 的使用</h2>
<h3 id="二次封装" tabindex="-1"><a class="header-anchor" href="#二次封装" aria-hidden="true">#</a> 二次封装</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * axios 二次封装
 */</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">'axios'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ElMessage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'element-plus'</span>
<span class="token comment">// 引入路由实例</span>
<span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">'../router'</span>
<span class="token keyword">import</span> config <span class="token keyword">from</span> <span class="token string">'../config/environmentConfig.js'</span>
<span class="token keyword">import</span> storage <span class="token keyword">from</span> <span class="token string">'@/utils/storage.js'</span>

<span class="token comment">// 错误消息</span>
<span class="token keyword">const</span> <span class="token constant">TOKEN_INVALID</span> <span class="token operator">=</span> <span class="token string">'Token认证失败，请重新登陆'</span>
<span class="token keyword">const</span> <span class="token constant">NETWORK_ERROR</span> <span class="token operator">=</span> <span class="token string">'网络请求异常，请稍后重试'</span>
<span class="token comment">// 创建axios对象</span>
<span class="token keyword">const</span> service <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">baseURL</span><span class="token operator">:</span> config<span class="token punctuation">.</span>baseApi<span class="token punctuation">,</span>
  <span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 请求拦截</span>
service<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">req</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// JWT</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>storage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'userInfo'</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> token <span class="token punctuation">}</span> <span class="token operator">=</span> storage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'userInfo'</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> headers <span class="token operator">=</span> req<span class="token punctuation">.</span>headers
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>headers<span class="token punctuation">.</span>Authorization<span class="token punctuation">)</span> headers<span class="token punctuation">.</span>Authorization <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Bearer </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>token<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> req
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 响应拦截</span>
service<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> code<span class="token punctuation">,</span> data<span class="token punctuation">,</span> msg <span class="token punctuation">}</span> <span class="token operator">=</span> res<span class="token punctuation">.</span>data
  <span class="token comment">// 状态码判断</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>code <span class="token operator">===</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 请求成功</span>
    <span class="token keyword">return</span> data
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>code <span class="token operator">===</span> <span class="token number">500001</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// token认证失败</span>
    ElMessage<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token constant">TOKEN_INVALID</span><span class="token punctuation">)</span>
    <span class="token comment">// 路由跳转到登陆页面</span>
    router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'/login'</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token constant">TOKEN_INVALID</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 网络异常(其他情况）</span>
    ElMessage<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>msg <span class="token operator">||</span> <span class="token constant">NETWORK_ERROR</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>msg <span class="token operator">||</span> <span class="token constant">NETWORK_ERROR</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * 请求核心函数
 * <span class="token keyword">@param</span> <span class="token parameter">options</span> 请求配置
 */</span>
<span class="token keyword">function</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 默认为get</span>
  options<span class="token punctuation">.</span>method <span class="token operator">=</span> options<span class="token punctuation">.</span>method <span class="token operator">||</span> <span class="token string">'get'</span>
  <span class="token comment">// 无论是get还是post 数据字段均为data</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>method<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'get'</span><span class="token punctuation">)</span> options<span class="token punctuation">.</span>params <span class="token operator">=</span> options<span class="token punctuation">.</span>data
  <span class="token comment">// 确保生产环境调取线上地址</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>env <span class="token operator">===</span> <span class="token string">'prod'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    service<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>baseURL <span class="token operator">=</span> config<span class="token punctuation">.</span>baseApi
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// mock 开关 控制 开发测试环境api地址切换</span>
    service<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>baseURL <span class="token operator">=</span> config<span class="token punctuation">.</span>mock <span class="token operator">?</span> config<span class="token punctuation">.</span>mockApi <span class="token operator">:</span> config<span class="token punctuation">.</span>baseApi
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token function">service</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> request
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="组件中使用" tabindex="-1"><a class="header-anchor" href="#组件中使用" aria-hidden="true">#</a> 组件中使用</h3>
<p>不同页面的 <code v-pre>api</code> 请求放在不同的<code v-pre> js</code> 文件中，如登陆相关的接口放在<code v-pre>/api/login.js</code>下,引入我们定义好的<code v-pre> axios</code> 实例</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> request <span class="token keyword">from</span> <span class="token string">'../utils/request.js'</span>

<span class="token doc-comment comment">/**
 * 登陆接口
 */</span>
<span class="token keyword">export</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'/users/login'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> params<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在组件中使用：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> login <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@/api/login.js'</span>
<span class="token comment">// other code ...</span>
<span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token operator">...</span>userInfo <span class="token punctuation">}</span><span class="token punctuation">)</span>
router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">)</span>
<span class="token comment">// 存储用户信息</span>
userStore<span class="token punctuation">.</span><span class="token function">saveUserInfo</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="storage-二次封装" tabindex="-1"><a class="header-anchor" href="#storage-二次封装" aria-hidden="true">#</a> storage 二次封装</h2>
<p><code v-pre>cookie</code>，<code v-pre>localStorage</code>，<code v-pre>sessionStorage</code> 的区别？</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * storage类封装
 */</span>
<span class="token keyword">import</span> config <span class="token keyword">from</span> <span class="token string">'../config/index.js'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取storage下项目命名空间的值</span>
  <span class="token function">getStorage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>namespace<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">'{}'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 设置数据</span>
  <span class="token function">setItem</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> storage <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getStorage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    storage<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value
    localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>namespace<span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>storage<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 获取数据</span>
  <span class="token function">getItem</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getStorage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 删除数据</span>
  <span class="token function">clearItem</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> storage <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getStorage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">delete</span> storage<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>namespace<span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>storage<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 清空所有数据</span>
  <span class="token function">clearAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    localStorage<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vite-项目index-html中使用变量" tabindex="-1"><a class="header-anchor" href="#vite-项目index-html中使用变量" aria-hidden="true">#</a> vite 项目<code v-pre>index.html</code>中使用变量</h2>
<p><a href="https://www.jianshu.com/p/77cceaaa4723" target="_blank" rel="noopener noreferrer">vite-plugin-html 插件<ExternalLinkIcon/></a></p>
<h2 id="响应式语法糖" tabindex="-1"><a class="header-anchor" href="#响应式语法糖" aria-hidden="true">#</a> $响应式语法糖</h2>
<p>一般的我们通过 <code v-pre>ref</code> 声明响应式数据，在 js 中访问需要加<code v-pre>.value</code></p>
<p>通过响应式语法糖，我们可以省去 <code v-pre>value</code></p>
<p>通过配置开启：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// vite.config.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">reactivityTransform</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://cn.vuejs.org/guide/extras/reactivity-transform.html" target="_blank" rel="noopener noreferrer">更多细节<ExternalLinkIcon/></a></p>
<h2 id="css-中绑定变量" tabindex="-1"><a class="header-anchor" href="#css-中绑定变量" aria-hidden="true">#</a> css 中绑定变量</h2>
<div class="custom-container warning">
<p class="custom-container-title">注意</p>
<p>如果需要动态变更，请创建响应式数据</p>
</div>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> leftNavWidth <span class="token operator">=</span> <span class="token function">$ref</span><span class="token punctuation">(</span><span class="token string">"220px"</span><span class="token punctuation">)</span>
 <span class="token punctuation">.</span>left<span class="token operator">-</span>nav <span class="token punctuation">{</span>
    <span class="token literal-property property">width</span><span class="token operator">:</span> v<span class="token operator">-</span><span class="token function">bind</span><span class="token punctuation">(</span>leftNavWidth<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token literal-property property">height</span><span class="token operator">:</span> 100vh<span class="token punctuation">;</span>
    background<span class="token operator">-</span>color<span class="token operator">:</span> #ffffff<span class="token punctuation">;</span>
    overflow<span class="token operator">-</span>y<span class="token operator">:</span> auto<span class="token punctuation">;</span>
    <span class="token literal-property property">transition</span><span class="token operator">:</span> width <span class="token punctuation">.</span>5s<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路径别名" tabindex="-1"><a class="header-anchor" href="#路径别名" aria-hidden="true">#</a> 路径别名</h2>
<p><a href="https://notes.zfhblog.top/%E5%BC%80%E5%8F%91%E8%AE%B0%E5%BD%95/Vue/vite3.0%E6%94%AF%E6%8C%81%E8%B7%AF%E5%BE%84%E5%88%AB%E5%90%8D.html" target="_blank" rel="noopener noreferrer">vite3.0 支持路径别名<ExternalLinkIcon/></a></p>
<h2 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> props</h2>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'menuList'</span><span class="token punctuation">,</span> <span class="token string">'isCollapse'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用 <code v-pre>&lt;script setup&gt;</code> 的单文件组件中，props 可以使用 <code v-pre>defineProps()</code> 来声明</p>
<p>模板中直接使用，无需<code v-pre>props.xxx</code></p>
<h2 id="动态组件" tabindex="-1"><a class="header-anchor" href="#动态组件" aria-hidden="true">#</a> 动态组件</h2>
<p><code v-pre>&lt;component is='string | Component'&gt;</code></p>
<ul>
<li>当 <code v-pre>is</code> 是字符串，它既可以是 <code v-pre>HTML</code> 标签名也可以是组件的注册名
<ul>
<li>或者，<code v-pre>is</code> 也可以直接绑定到组件的定义</li>
</ul>
</li>
</ul>
<h2 id="递归组件" tabindex="-1"><a class="header-anchor" href="#递归组件" aria-hidden="true">#</a> 递归组件</h2>
<p>项目中的菜单列表并不是静态数据，而是从接口取数据进行动态渲染。</p>
<p>那么此时就需要递归组件，即自己调用自己</p>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-menu</span> <span class="token attr-name">:collapse</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>isCollapse<span class="token punctuation">"</span></span> <span class="token attr-name">default-active</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/system/menu<span class="token punctuation">"</span></span> <span class="token attr-name">router</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>menu in menuList<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-sub-menu</span>
        <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>
          menu.children &amp;&amp;
          menu.children.length > 0 &amp;&amp;
          menu.children[0].menuType == 1
        <span class="token punctuation">"</span></span>
        <span class="token attr-name">:index</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>menu.path<span class="token punctuation">"</span></span>
      <span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#title</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-icon</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>menu.icon.split('-')[2]<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-icon</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>{{ menu.menuName }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--        递归组件--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>menu-tree</span> <span class="token attr-name">:menuList</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>menu.children<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-sub-menu</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-menu-item</span> <span class="token attr-name">v-else-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>menu.menuType == 1<span class="token punctuation">"</span></span> <span class="token attr-name">:index</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>menu.path<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span>{{ menu.menuName }}
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-menu-item</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-menu</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'menuList'</span><span class="token punctuation">,</span> <span class="token string">'isCollapse'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jwt" tabindex="-1"><a class="header-anchor" href="#jwt" aria-hidden="true">#</a> JWT</h2>
<p>登陆不需要携带<code v-pre>token</code>,其他接口需要<code v-pre>token</code></p>
<h2 id="面包屑导航" tabindex="-1"><a class="header-anchor" href="#面包屑导航" aria-hidden="true">#</a> 面包屑导航</h2>
<p>利用 vue router 的<code v-pre>match</code>路由匹配数组和路由元数据<code v-pre>title</code>进行渲染:</p>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-breadcrumb</span> <span class="token attr-name">:separator-icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ArrowRight<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-breadcrumb-item</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in matched<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span>
        <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/welcome<span class="token punctuation">"</span></span>
        <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index === 0<span class="token punctuation">"</span></span>
        <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">color</span><span class="token punctuation">:</span>#fff <span class="token important">!important</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span>
        <span class="token punctuation">></span></span>{{ item.meta.title }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span>
      <span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-else</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">color</span><span class="token punctuation">:</span>#fff</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>{{ item.meta.title }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-breadcrumb-item</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-breadcrumb</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> useRoute <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue-router'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ArrowRight <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@element-plus/icons-vue'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> computed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">useRoute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> matched <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> router<span class="token punctuation">.</span>matched
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重置-elementplus-颜色主题" tabindex="-1"><a class="header-anchor" href="#重置-elementplus-颜色主题" aria-hidden="true">#</a> 重置 elementPlus 颜色主题</h2>
<p>新建一个 scss 文件：</p>
<div class="language-scss line-numbers-mode" data-ext="scss"><pre v-pre class="language-scss"><code><span class="token comment">/*
* element样式重置
*/</span>
<span class="token comment">// 修改主题色</span>
<span class="token keyword">@forward</span> <span class="token string">'element-plus/theme-chalk/src/common/var.scss'</span> <span class="token module-modifier keyword">with</span> <span class="token punctuation">(</span>
  <span class="token property"><span class="token variable">$colors</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
    <span class="token string">'primary'</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
      <span class="token string">'base'</span><span class="token punctuation">:</span> #00cf74<span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 导入所有样式</span>
<span class="token keyword">@import</span> <span class="token string">'element-plus/theme-chalk/src/index.scss'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在<code v-pre>main.js</code>文件中引入：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">'./style/elementReset.scss'</span>
<span class="token comment">// import "element-plus/dist/index.css"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路由切换动画踩坑" tabindex="-1"><a class="header-anchor" href="#路由切换动画踩坑" aria-hidden="true">#</a> 路由切换动画踩坑</h2>
<p>想要给菜单切换(路由切换)时加一个动画，坑点很多记录下</p>
<p>vue-router 官网已经有示范代码：</p>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span> <span class="token attr-name">v-slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{ Component }<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Transition</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fade<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Component<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Transition</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger">
<p class="custom-container-title">特别注意</p>
<p>路由组件下必须只能有一个根节点，否则切换就会不正常，虽然 vue3 支持多个根节点的写法。</p>
</div>
<p>这里结合<code v-pre>animate.css</code>实现过渡动画：</p>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span> <span class="token attr-name">v-slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{ Component }<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Transition</span>
                <span class="token attr-name">mode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>out-in<span class="token punctuation">"</span></span>
                <span class="token attr-name">enter-active-class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>animate__animated animate__flipX animate__faster<span class="token punctuation">"</span></span>
                <span class="token attr-name">leave-active-class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>animate__animated animate__flipOutX animate__faster<span class="token punctuation">"</span></span>
            <span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>KeepAlive</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Component<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>KeepAlive</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Transition</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>mode</code>参数确保先执行离开动画，然后在其完成<strong>之后</strong>再执行元素的进入动画，这样使得切换显得更“正常”</p>
<p><figure><img src="https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/vue3admin-路由切换动画.gif" alt="vue3admin-路由切换动画" title="路由切换动画"><figcaption>路由切换动画</figcaption></figure></p>
<h2 id="按钮权限控制实现" tabindex="-1"><a class="header-anchor" href="#按钮权限控制实现" aria-hidden="true">#</a> 按钮权限控制实现</h2>
<div class="custom-container tip">
<p class="custom-container-title">前置知识</p>
<p><a href="https://cn.vuejs.org/guide/reusability/custom-directives.html" target="_blank" rel="noopener noreferrer">自定义指令<ExternalLinkIcon/></a></p>
</div>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// main.js</span>
<span class="token comment">// 按钮权限判断自定义指令</span>
app<span class="token punctuation">.</span><span class="token function">directive</span><span class="token punctuation">(</span><span class="token string">'permission'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// 在元素被插入到 DOM 前调用</span>
  <span class="token function">beforeMount</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> binding</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> userAction <span class="token operator">=</span> storage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'userAction'</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>userAction<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>binding<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 隐藏元素</span>
      el<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">'none'</span>
      <span class="token comment">// 变成宏任务 防止元素未插入 DOM 删除元素报错</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        el<span class="token punctuation">.</span>parentNode<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_404-页面开发" tabindex="-1"><a class="header-anchor" href="#_404-页面开发" aria-hidden="true">#</a> 404 页面开发</h2>
<div class="custom-container tip">
<p class="custom-container-title">前置知识</p>
<p><a href="https://router.vuejs.org/zh/guide/advanced/navigation-guards.html" target="_blank" rel="noopener noreferrer">导航守卫<ExternalLinkIcon/></a></p>
<p><code v-pre>Vue Router 3</code> 和<code v-pre> Vue Router 4</code>的处理逻辑稍有<a href="https://github.com/vuejs/rfcs/blob/master/active-rfcs/0037-router-return-guards.md#motivation" target="_blank" rel="noopener noreferrer">不同<ExternalLinkIcon/></a>。指的是<code v-pre>next</code></p>
</div>
<p>现在不使用<code v-pre>next</code>，只需要判断不符合条件的情况</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// router/index.js</span>
<span class="token comment">// 全局前置守卫</span>
<span class="token comment">// 判断访问路径是否正确 不正确跳转404页面</span>
<span class="token comment">// vue-router 4 建议不使用`next`写法</span>
router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> <span class="token keyword">from</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> hasPermission <span class="token operator">=</span>
    router<span class="token punctuation">.</span><span class="token function">getRoutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">route</span><span class="token punctuation">)</span> <span class="token operator">=></span> route<span class="token punctuation">.</span>path <span class="token operator">===</span> to<span class="token punctuation">.</span>path<span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>hasPermission<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'404'</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动态路由" tabindex="-1"><a class="header-anchor" href="#动态路由" aria-hidden="true">#</a> 动态路由</h2>
<p>动态路由的实现释放了前端路由，根据后端返回的菜单列表动态加载路由列表。</p>
<ol>
<li>根据接口返回的菜单列表生成路由表</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> 生成动态路由
 * <span class="token keyword">@param</span> <span class="token parameter">list</span>
 * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">generateRoute</span><span class="token punctuation">(</span><span class="token parameter">list</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">const</span> <span class="token function-variable function">deep</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">list</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        list<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>item<span class="token punctuation">.</span>action<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                routes<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                    <span class="token literal-property property">name</span><span class="token operator">:</span> item<span class="token punctuation">.</span>component<span class="token punctuation">,</span>
                    <span class="token literal-property property">path</span><span class="token operator">:</span> item<span class="token punctuation">.</span>path<span class="token punctuation">,</span>
                    <span class="token literal-property property">component</span><span class="token operator">:</span> item<span class="token punctuation">.</span>component<span class="token punctuation">,</span>
                    <span class="token literal-property property">meta</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token literal-property property">title</span><span class="token operator">:</span> item<span class="token punctuation">.</span>menuName
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>children<span class="token operator">&amp;&amp;</span><span class="token operator">!</span>item<span class="token punctuation">.</span>action<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token function">deep</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>children<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">deep</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span>
    <span class="token keyword">return</span> routes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>在全局前置守卫中加载路由(不同于<code v-pre>webpack</code>,<code v-pre>vite</code>使用<RouterLink to="/(https:/cn.vitejs.dev/guide/features.html#glob-import)">Glob</RouterLink>进行导入)</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> storage <span class="token keyword">from</span> <span class="token string">'@/utils/storage.js'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> getPermissionList <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@/api/home.js'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> generateRoute <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@/utils/generateRoute.js'</span>
<span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">'@/router/index.js'</span>

<span class="token doc-comment comment">/**
 *
 * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>Promise<span class="token punctuation">&lt;</span><span class="token keyword">void</span><span class="token punctuation">></span><span class="token punctuation">}</span></span>
 * <span class="token keyword">@description</span> 加载路由
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">loadAsyncRouter</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> userInfo <span class="token operator">=</span> storage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'userInfo'</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>userInfo<span class="token punctuation">.</span>token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> menuList <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getPermissionList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token function">generateRoute</span><span class="token punctuation">(</span>menuList<span class="token punctuation">)</span>
    <span class="token keyword">const</span> modules <span class="token operator">=</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span><span class="token function">glob</span><span class="token punctuation">(</span><span class="token string">'../views/*.vue'</span><span class="token punctuation">)</span>
    routes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">route</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">../views/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>route<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.vue</span><span class="token template-punctuation string">`</span></span>
      route<span class="token punctuation">.</span>component <span class="token operator">=</span> modules<span class="token punctuation">[</span>url<span class="token punctuation">]</span>
      router<span class="token punctuation">.</span><span class="token function">addRoute</span><span class="token punctuation">(</span><span class="token string">'home'</span><span class="token punctuation">,</span> route<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// route/index.js</span>
<span class="token doc-comment comment">/**
 *  全局前置守卫
 *  vue-router 4 建议不使用`next`写法
 */</span>
router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> <span class="token keyword">from</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'全局前置守卫被触发!'</span><span class="token punctuation">)</span>
  <span class="token comment">// 判断访问路径是否正确 不正确跳转404页面</span>
  <span class="token comment">// let hasPermission = router.getRoutes().filter(route => route.path === to.path).length > 0</span>
  <span class="token comment">// if (!hasPermission) return {name: '404'}</span>
  <span class="token comment">// 用户状态判断逻辑</span>
  <span class="token comment">// 检查用户是否已登录 ❗️避免无限重定向</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>storage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'isLogin'</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> to<span class="token punctuation">.</span>name <span class="token operator">!==</span> <span class="token string">'login'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'login'</span> <span class="token punctuation">}</span>
    <span class="token comment">// 登录状态不允许访问login</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>storage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'isLogin'</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> to<span class="token punctuation">.</span>name <span class="token operator">===</span> <span class="token string">'login'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> from<span class="token punctuation">.</span>name <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//    页面标题</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>router<span class="token punctuation">.</span><span class="token function">hasRoute</span><span class="token punctuation">(</span>to<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>to<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>title<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">|HangFan-Vue</span><span class="token template-punctuation string">`</span></span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token function">loadAsyncRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> curRoute <span class="token operator">=</span> router<span class="token punctuation">.</span><span class="token function">getRoutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> item<span class="token punctuation">.</span>path <span class="token operator">===</span> to<span class="token punctuation">.</span>path<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>curRoute<span class="token operator">?.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> curRoute<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'404'</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那为什么要在这里加载路由呢？全局前置守卫在每一次路由切换的时候都会被调用；当我们进行路由第一次切换(除了登录页、欢迎页)从线上进行菜单列表的拉取，那第二次就不需要从接口拉取了。还有一种特殊情况就是刷新页面，不加载路由就会找不到页面，因为我们的路由是动态生成的，所以必须要在全局前置守卫里加载路由。</p>
<h2 id="实现全局标签页" tabindex="-1"><a class="header-anchor" href="#实现全局标签页" aria-hidden="true">#</a> 实现全局标签页</h2>
<p><figure><img src="https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/vue3-admin-全局标签页.gif" alt="vue3-admin-全局标签页" title="全局标签页效果图"><figcaption>全局标签页效果图</figcaption></figure></p>
<p>监听路由变化，利用<code v-pre>Pinia</code>存储当前路由路径和页面标题</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 监听路由变化</span>
<span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> route<span class="token punctuation">.</span>path<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> route<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>title<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">newValue</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  tabsStore<span class="token punctuation">.</span><span class="token function">changeTab</span><span class="token punctuation">(</span>newValue<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  tabsStore<span class="token punctuation">.</span><span class="token function">saveTab</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> newValue<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token literal-property property">title</span><span class="token operator">:</span> newValue<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>路由变化时，改变当前路径，保存当前路数组(需要过滤，防止路径数组存在重复的路径)：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// store/tabs.js</span>
<span class="token doc-comment comment">/**
 * 路由tab信息
 */</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore<span class="token punctuation">,</span> acceptHMRUpdate <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'pinia'</span>

<span class="token comment">// 第一个参数是应用程序中 store 的唯一 id</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> useTabsStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">'tabs'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">tabs</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">currentTab</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
      <span class="token literal-property property">number</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">clearTabs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>tabs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">changeTab</span><span class="token punctuation">(</span><span class="token parameter">tab</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>currentTab <span class="token operator">=</span> tab
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">//保存</span>
    <span class="token function">saveTab</span><span class="token punctuation">(</span><span class="token parameter">tab</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token function-variable function">uniqueFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> uniId</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> arr<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>
          <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token operator">!</span>res<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>item<span class="token punctuation">[</span>uniId<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> res<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>item<span class="token punctuation">[</span>uniId<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>tab<span class="token punctuation">.</span>path <span class="token operator">!==</span> <span class="token string">'/login'</span><span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>tab<span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>tabs <span class="token operator">=</span> <span class="token function">uniqueFunc</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>tabs<span class="token punctuation">,</span> <span class="token string">'path'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">//  删除</span>
    <span class="token function">removeTab</span><span class="token punctuation">(</span><span class="token parameter">tabPath</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>tabPath <span class="token operator">===</span> item<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// 热更新支持</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>hot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>hot<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token function">acceptHMRUpdate</span><span class="token punctuation">(</span>useTabsStore<span class="token punctuation">,</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>hot<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用<code v-pre>elementUI</code>的<code v-pre>el-tabs</code>组件完成标签页组件：</p>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-tabs</span>
    <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>editableTabsValue<span class="token punctuation">"</span></span>
    <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card<span class="token punctuation">"</span></span>
    <span class="token attr-name">closable</span>
    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>demo-tabs<span class="token punctuation">"</span></span>
    <span class="token attr-name">@tab-remove</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>removeTab<span class="token punctuation">"</span></span>
    <span class="token attr-name">@tab-click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>clickTab<span class="token punctuation">"</span></span>
  <span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-tab-pane</span>
      <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item in tabs<span class="token punctuation">"</span></span>
      <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tab-pane<span class="token punctuation">"</span></span>
      <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item.path<span class="token punctuation">"</span></span>
      <span class="token attr-name">:label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item.title<span class="token punctuation">"</span></span>
      <span class="token attr-name">:name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item.path<span class="token punctuation">"</span></span>
    <span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-tab-pane</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-tabs</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!--路由tab切换组件--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> Sortable <span class="token keyword">from</span> <span class="token string">'sortablejs'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useTabsStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@/store/tabs.js'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> computed<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useRouter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue-router'</span>

<span class="token keyword">const</span> tabsStore <span class="token operator">=</span> <span class="token function">useTabsStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">useRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> editableTabsValue <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> tabsStore<span class="token punctuation">.</span>currentTab<span class="token punctuation">)</span>
<span class="token keyword">let</span> tabs <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> tabsStore<span class="token punctuation">.</span>tabs<span class="token punctuation">)</span>
<span class="token comment">// 实现拖拽</span>
<span class="token keyword">const</span> <span class="token function-variable function">rowDrop</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.el-tabs__nav'</span><span class="token punctuation">)</span>
  Sortable<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">onEnd</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> newIndex<span class="token punctuation">,</span> oldIndex <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//oldIIndex拖放前的位置， newIndex拖放后的位置</span>
      <span class="token keyword">const</span> currRow <span class="token operator">=</span> tabsStore<span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>oldIndex<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment">//鼠标拖拽当前的el-tabs-pane</span>
      tabsStore<span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>newIndex<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> currRow<span class="token punctuation">)</span> <span class="token comment">//tableData 是存放所以el-tabs-pane的数组</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token function">rowDrop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token function-variable function">removeTab</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">targetName</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>targetName <span class="token operator">===</span> <span class="token string">'/welcome'</span> <span class="token operator">&amp;&amp;</span> tabsStore<span class="token punctuation">.</span>tabs<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
  tabsStore<span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      item<span class="token punctuation">.</span>path <span class="token operator">===</span> targetName <span class="token operator">&amp;&amp;</span>
      tabsStore<span class="token punctuation">.</span>tabs<span class="token punctuation">[</span>index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span>
      tabsStore<span class="token punctuation">.</span>currentTab <span class="token operator">===</span> targetName
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>tabsStore<span class="token punctuation">.</span>tabs<span class="token punctuation">[</span>index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>path<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  tabsStore<span class="token punctuation">.</span><span class="token function">removeTab</span><span class="token punctuation">(</span>targetName<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>tabsStore<span class="token punctuation">.</span>tabs<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'/welcome'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token function-variable function">clickTab</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>props<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>scss<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token selector">.demo-tabs</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给<code v-pre>el-tab</code>绑定当前路径，点击标签 🏷️ 进行路径跳转。</p>
<p>删除需要进行判断：</p>
<ul>
<li>欢迎页(首页)不允许删除</li>
<li>不符合第一个条件，遍历当前路径数组，当遍历到要删除的数组时候进行判断：如果要删除的路径与当前路径相同且路径数组中它的上一个元素存在，删除当前路径，并跳转到它的上一个路径</li>
</ul>
<p>利用<code v-pre>sortablejs</code>实现标签页的位置调换功能。这部分需求是第一次做所以还是有瑕疵的，动画比较僵硬，拖拽的时候标签是透明的，好在完成了功能。开始使用<code v-pre>vuedraggable</code>没有实现，后面看看有没有其他拖拽库</p>
<h2 id="造轮子-vue3-admin-tempate" tabindex="-1"><a class="header-anchor" href="#造轮子-vue3-admin-tempate" aria-hidden="true">#</a> 造轮子: vue3-admin-tempate</h2>
<p><img src="https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/V3adminLogo.PNG" alt="V3adminLogo"></p>
<p><a href="https://v3admin.zfhblog.top" target="_blank" rel="noopener noreferrer">点我立即体验<ExternalLinkIcon/></a></p>
<p><code v-pre>react18-admin-template</code>计划开发中</p>
<p>这是一个 <code v-pre>vue3 </code>开发的后台管理系统模板</p>
<p>致敬 🫡<a href="https://panjiachen.github.io/vue-admin-template/#/dashboard" target="_blank" rel="noopener noreferrer">vue-admin-tempate<ExternalLinkIcon/></a>，本项目是对它的拙劣模仿</p>
<ul>
<li>公共组件：公共大表哥、公共搜索组件、公共表单组件</li>
</ul>
<h3 id="公共组件-公共大表哥" tabindex="-1"><a class="header-anchor" href="#公共组件-公共大表哥" aria-hidden="true">#</a> 公共组件：公共大表哥</h3>
<h4 id="props-1" tabindex="-1"><a class="header-anchor" href="#props-1" aria-hidden="true">#</a> props</h4>
<table>
<thead>
<tr>
<th>参数</th>
<th>含义</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>tableData</td>
<td>表格数据</td>
<td></td>
</tr>
<tr>
<td>columnData</td>
<td>表头数据</td>
<td></td>
</tr>
<tr>
<td>loading</td>
<td>加载状态</td>
<td>false</td>
</tr>
<tr>
<td>pagination</td>
<td>是否分页</td>
<td>false</td>
</tr>
<tr>
<td>checkedData</td>
<td>当前勾选项</td>
<td></td>
</tr>
<tr>
<td>selectable</td>
<td>复选框</td>
<td>true</td>
</tr>
<tr>
<td>total</td>
<td>数据个数</td>
<td></td>
</tr>
<tr>
<td>rowKey</td>
<td>列唯一 key</td>
<td>'id'</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h4 id="columndata" tabindex="-1"><a class="header-anchor" href="#columndata" aria-hidden="true">#</a> columnData</h4>
<h4 id="分页" tabindex="-1"><a class="header-anchor" href="#分页" aria-hidden="true">#</a> 分页</h4>
<h4 id="组件源码" tabindex="-1"><a class="header-anchor" href="#组件源码" aria-hidden="true">#</a> 组件源码</h4>
</div></template>


