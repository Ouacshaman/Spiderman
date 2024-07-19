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

function crawlPage(base, current = base, pages = {}) {
	try {
		if(normURL(current)!=normURL(base)){
			return pages;
		}
		const normalUrl = normURL(current);
		if(pages[normalUrl]){
			pages[normalUrl] += 1;
		}else{
			pages[normalUrl] = 1;
		}
		const htmlBody = fetchHTML(current);
		const htmlList = getUrlFromHtml(htmlBody, normalUrl);
		for(let url of htmlList){
			crawlPage(base, url, pages);
		}
		return pages
	} catch (error) {
		console.log(`error: ${error}`);
	}
}

async function fetchHTML(url) {
	try{
		const rep = await fetch(url, {
			method: 'GET',
			mode: 'cors'
		});
		if(rep.status >= 400){
			console.log(`error: ${rep.status}`);
			return;
		}
		if(!rep.headers.get('Content-Type').includes('text/html')){
			console.log(`incorrect content: ${rep.headers.get('Content-Type')}`);
			return
		}else{
			const html = await rep.text();
			return html;
		}
	} catch(error){
		console.log(`error: ${error}`);
	}


}

export{normURL, getUrlFromHtml, crawlPage, fetchHTML};
