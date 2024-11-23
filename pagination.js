PAGE_SIZE = 10
MAX_PAGE = 113

function fetchPage(n) {
    let results = []
    for (let i = n * PAGE_SIZE; i < MAX_PAGE - (n * PAGE_SIZE); i++) {
        if (results.length === 10) { break }
        results.push(i)
    }

    return {
        results: results,
        nextPage: n+1
    }
}

class FetchAPI {
    constructor() {
        this.remainder = 0
        this.startFrom = 0 
    }

    fetch(n) {
        let res = fetchPage(n).results
        return res
    };
}


//Write test cases
const fetching = new FetchAPI();
console.log(fetching.fetch(0))
console.log(fetching.fetch(1))
console.log(fetching.fetch(2))