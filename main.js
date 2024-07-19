import {crawlPage} from './crawl.js';

function main(){
	if (process.argv.length > 2 || process.argv.length < 2){
		console.log(`baseURL: ${process.argv[2]}`);
		crawlPage(process.argv[2]);
	}else{
		console.log('invalid amount of arguments');
	}
}

main();
