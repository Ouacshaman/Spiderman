import {JSDOM} from 'jsdom';

function normURL(url){
	try {
		const myURL = new URL(url);
		const host = myURL.hostname.toString();
		const path = myURL.pathname.toString();
		const full = host.concat(path);
		if(full[full.length-1]=="/"){
			return full.slice(0,full.length-1);
		}else{
			return full;
		}
	} catch {
		return "invalid url";
	}
}

function getUrlFromHtml(html, base){
	try {
		const dom = new JSDOM(html);
		const rel = dom.window.document.querySelectorAll('a');
		const list = [];
		for(let a of rel){
			const temp = new URL(a.href,base);
			const proto = temp.protocol.concat('//');	
			const rel = normURL(temp.href);
			const abs = proto.concat(rel);
			list.push(abs);
		}
		return list;
	} catch {
		return "failed"
	}
}

async function crawlPage(url) {
	try {
		const content = await fetch(url,{
			method: 'GET',
			mode: 'cors'
		});
		if(content.status >= 400){
			console.log(`error: ${content.status}`);
			return
		}
		if(!content.headers.get('Content-Type').includes('text/html')){
			console.log(`incorrect content: ${content.headers.get('Content-Type')}`);
			return
		}else{
			const html = await content.text();
			console.log(html);
		}

	} catch (error) {
		console.log(`error: ${error}`);
	}
}

crawlPage('https://wagslane.dev');

export{normURL, getUrlFromHtml, crawlPage};
