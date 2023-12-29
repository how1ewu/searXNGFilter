// ==UserScript==
// @name         HowieSearchFilter
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @author       Howie
// @match        https://search.wush.cc/*
// @match        https://search.iswsh.com/*
// @icon         https://docs.searxng.org/_static/searxng-wordmark.svg
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// ==/UserScript==
(function () {
    "use strict";

    const rsts = document.querySelector("#results");
    rsts ? (rsts.style.marginTop = 0) : null;
    const results = document.querySelectorAll(".result-default");
    // 垃圾站点过滤
    const keywordsFilter = /title/小.(百科|知识)网//;
        /2345|\w+\d+\.com|天极|(绿色|软件|单机|游戏|资源|东坡|极速|极光)下载|游民星空|林志忆|全本小说网|UU看书|汉化|补丁|破解版|游侠网|(?:下载|软件)(?:中心|联盟|之家|大全|站)|(?:迴|回)向|痞客邦|偈|佛(?:学|學|經|理)|趣历史|(?:下载|导航|知识|百科)网|码农书籍网|系统之家|程序员大本营|小白|医疗国际|推广|凤楼|红灯区|桑拿|按摩|楼凤|葡京|牛牛|德州扑克|彩金|大额无忧|(?:真|成)人|完整资源|影院|在线播放|挖矿|矿机|链游|代币|吴师兄|五分钟学算法|的博客-程序员|程序员ITS.*|程序员信息|cxy(?:xiaowu|mm)/i;
    const urlFilter = /direct.com/*/;
        /csdn\.net|(?:(?<!fanyi|naotu|wenku|pan|baike|tieba)\.baidu|2345|\w+01|d\d+-vision|developer\.aliyun|1024sou)\.(?:com|today)|(linkedin|duote|waerfa|zditect)\.com|wanghi\.cn|zol\.com\.cn|pchome\.net|pc6|downxia|yesky|downza|firefox.*cn|alixixi/;
    let count = 0;
    results.forEach((item) => {
        const itemText = item.querySelector("h3").innerText;
        const link = item.querySelector(".url_i1");
        link.style = "color:#31708f;font-weight:bold";
        if (
            /^http:/.test(link.innerText.trim()) &&
            !/\.gov\.cn$/.test(link.innerText.trim())
        ) {
            const warning = document.createElement("span");
            warning.innerText = "危";
            warning.style =
                "padding:1px 3px;border: 1px solid;border-radius: 4px;color: yellow;background: red";
            item.querySelector("h3").appendChild(warning);
        }
        if (
            item.contains(item.querySelector(".content.empty_element")) || //空白描述结果
            keywordsFilter.test(itemText) ||
            urlFilter.test(link.innerText) ||
            item.hasAttribute("blocknotice")
        ) {
            count++;
            item.style.display = "none";
            console.log(item.textContent);
            if (count === results.length) {
                const msg = document.createElement("p");
                msg.innerText = "没有搜索到有价值的结果!";
                msg.style = "text-align:center;line-height:40px;height:40px";
                rsts.appendChild(msg);
            }
            return;
        }
        item.querySelector(".url_o2").style = "overflow: unset";
    });
})();