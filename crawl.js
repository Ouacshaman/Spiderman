import {JSDOM} from 'jsdom';

function normURL(url) {
    try {
        const myURL = new URL(url);
        return `${myURL.protocol}//${myURL.hostname}${myURL.pathname.replace(/\/$/, "")}`;
    } catch (e) {
        console.log(`Invalid URL: ${url}`);
        return null;
    }
}

function getUrlFromHtml(html, base){
	try {
		const dom = new JSDOM(html);
		const rel = dom.window.document.querySelectorAll('a');
		const list = [];
		for(let a of rel){
			const temp = new URL(a.href,base);
			const rel = normURL(temp.href);
			if (rel){
				list.push(rel);
			}
		}
		return list;
	} catch {
		console.log(`Error getting URLs from HTML: ${error}`);
		return [];
	}
}

async function crawlPage(base, current = base, pages = {}) {
	try {
		console.log(`Processing: ${current}`);
		const normBase = normURL(base);
		const normCurr = normURL(current);
		if(!normBase || !normCurr){
			return pages
		}
		if(new URL(current).hostname !== new URL(base).hostname){
			return pages;
		} 
		if(pages[normCurr]){
			pages[normCurr] += 1;
			return pages
		}else{
			pages[normCurr] = 1;
		}
		const htmlBody = await fetchHTML(current);
		if(!htmlBody){
			return pages;
		}
		const htmlList = await getUrlFromHtml(htmlBody, normCurr);
		console.log(`${current}: ${htmlList}`);
		for(let url of htmlList){
			await crawlPage(base, normURL(url), pages);
		}
		console.log(pages);
		return pages;
	} catch (error) {
		console.log(`error: ${error}`);
		return pages;
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
		return;
	}


}

export{normURL, getUrlFromHtml, crawlPage, fetchHTML};
