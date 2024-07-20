import { crawlPage, fetchHTML } from './crawl.js';
import { printReport } from './report.js';

async function main(){
    if (process.argv.length !== 3) {
        console.log('Invalid amount of arguments');
        return;
    }
    
    const res = await crawlPage(process.argv[2]);  // Await keyword added here
    printReport(res);
}

main();
