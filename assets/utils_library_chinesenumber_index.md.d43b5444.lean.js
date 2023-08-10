import{_ as s,v as n,b as a,R as e}from"./chunks/framework.b8b3e2fc.js";const u=JSON.parse('{"title":"number2chinesenumber","description":"","frontmatter":{},"headers":[],"relativePath":"utils/library/chinesenumber/index.md","filePath":"utils/library/chinesenumber/index.md","lastUpdated":1691679290000}'),l={name:"utils/library/chinesenumber/index.md"},p=e(`<h1 id="number2chinesenumber" tabindex="-1">number2chinesenumber <a class="header-anchor" href="#number2chinesenumber" aria-label="Permalink to &quot;number2chinesenumber&quot;">​</a></h1><p>将阿拉伯数字转换为中文数字的TS库。支持中文大小写数字，支持中文金额数字模式，最多支持16位整数的转换。代码测试覆盖率达到100%。</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">number2chinesenumber</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># or</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">number2chinesenumber</span></span></code></pre></div><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> number2chinesenumber </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">number2chinesenumber</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">number2chinesenumber</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1234567890</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 一十二亿三千四百五十六万七千八百九十</span></span>
<span class="line"><span style="color:#82AAFF;">number2chinesenumber</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1234567890</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">max</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾</span></span></code></pre></div><h2 id="进阶用法" tabindex="-1">进阶用法 <a class="header-anchor" href="#进阶用法" aria-label="Permalink to &quot;进阶用法&quot;">​</a></h2><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> number2chinesenumber </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">number2chinesenumber</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> num </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100.7007</span></span>
<span class="line"><span style="color:#82AAFF;">number2chinesenumber</span><span style="color:#A6ACCD;">(num</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">maxAmount</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 壹佰元零柒角整</span></span>
<span class="line"><span style="color:#82AAFF;">number2chinesenumber</span><span style="color:#A6ACCD;">(num</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">amount</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 一百元零七角</span></span></code></pre></div><h2 id="更多" tabindex="-1">更多 <a class="header-anchor" href="#更多" aria-label="Permalink to &quot;更多&quot;">​</a></h2><p>npm 地址：<a href="https://www.npmjs.com/package/number2chinesenumber" target="_blank" rel="noreferrer">https://www.npmjs.com/package/number2chinesenumber</a>.</p>`,10),o=[p];function t(r,c,i,y,D,m){return n(),a("div",null,o)}const h=s(l,[["render",t]]);export{u as __pageData,h as default};
