const PAGE_SIZE = 10
const MAX_PAGE = 113

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

export class FetchAPI {    
    remainder = []
    nextPage = 0     
    
    fetch(n) {
        let res = []
        if (this.remainder.length === 0) {
            let newFetch = fetchPage(this.nextPage)
            let i=0
            while (i < n){
                res.push(newFetch.results.shift())
                i++
            }
            this.remainder = newFetch.results
            this.nextPage = newFetch.nextPage
            return res
        }

        if (this.remainder.length > 0 && n <= this.remainder.length) {
            for (let i=0; i < n; i++) {
                let page = this.remainder.shift()
                res.push(page)

            }
            
            return res
        } 
        
        res = res.concat(this.remainder)
        this.remainder = []
        let nextPage = res[res.length-1]+1
        const destPage = res[0]+n

        for (let i = Math.floor(nextPage/10); i < Math.floor(destPage/10)+1;i++) {
            let newFetch = fetchPage(i)
            this.remainder = this.remainder.concat(newFetch.results)
            this.nextPage = newFetch.nextPage 
        }

        let i= res.length
        while (i < n){
            res.push(this.remainder.shift())
            i++
        }
        
        return res
    };
}


//Write test cases
const fetching = new FetchAPI();
console.log(fetching.fetch(1))
console.log(fetching.fetch(1))
console.log(fetching.fetch(5))
console.log(fetching.fetch(7))
console.log(fetching.fetch(9))
