
function printReport(dict) {
	if(dict){
		try{
			const list = Object.entries(dict);
			const finalList = sort(list).reverse();
			console.log('Report Starting.....');
			for(const [url, count] of finalList){
				console.log(`Found ${count} internal links to ${url}`);
			}
		} catch (error){
			console.log(`dictionary error: ${error}`);
			return {};
		}
	} else{
		console.log('No data available to generate a report');
		return {};
	}

}

function sort(lst) {
	let end = lst.length;
	let swapping = true;
	while (swapping) {
		swapping = false;
		for(let i=1; i < end; i++){
			if(lst[i-1][1] > lst[i][1]){
				let temp = lst[i-1];
				lst[i-1] = lst[i];
				lst[i] = temp;
				swapping = true;
			}
		}
		end -= 1;
	}
	return lst;
}

const object00 = {'a':11,'b':3,'c':7,'d':15};
printReport(object00)

export {printReport};
