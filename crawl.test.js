import {test, expect} from "@jest/globals";

import {normURL, getUrlFromHtml} from "./crawl.js";

test('boot.dev/path', ()=>{
	expect(normURL("https://boot.dev/path/")).toBe("boot.dev/path");
});

test('boot.dev', ()=>{
	expect(normURL("http://boot.dev/")).toBe("boot.dev");
});

const htmlTest = `<html>
<body>
    <div>
        <a href="/a">Link 1</a>
        <div>
            <a href="/b">Sub-link 1-1</a>
            <a href="/c">Sub-link 1-2</a>
        </div>
    </div>
    <div>
        <a href="/d">Link 2</a>
        <div>
            <a href="/e">Sub-link 2-1</a>
            <a href="/f">Sub-link 2-2</a>
        </div>
    </div>
    <div>
        <a href="/g">Link 3</a>
        <div>
            <a href="/h">Sub-link 3-1</a>
            <a href="/i">Sub-link 3-2</a>
        </div>
    </div>
</body>
</html>`;

test('url list a-h',()=>{
	expect(getUrlFromHtml(htmlTest,"https://boot.dev")).toBe([
        'https:://boot.dev/a','https:://boot.dev/b','https:://boot.dev/c',
        'https:://boot.dev/d','https:://boot.dev/e','https:://boot.dev/f',
        'https:://boot.dev/g','https:://boot.dev/h','https:://boot.dev/i']);
});
