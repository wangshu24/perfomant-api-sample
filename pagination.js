const PAGE_SIZE = 10
const MAX_PAGE = 113

function fetchPages(n) {
    let results = []
    for (let i = n * PAGE_SIZE; i < MAX_PAGE ; i++) {
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
    
    pageBasedFetch(n) {
        let result = []
        if (this.remainder.length === 0) {
            let newFetch = fetchPages(this.nextPage)
            let i=0
            while (i < n){
                result.push(newFetch.results.shift())
                i++
            }
            this.remainder = newFetch.results
            this.nextPage = newFetch.nextPage
            return result
        }

        if (this.remainder.length > 0 && n <= this.remainder.length) {
            for (let i=0; i < n; i++) {
                let page = this.remainder.shift()
                result.push(page)

            }
            
            return result
        } 
        
        result = result.concat(this.remainder)
        this.remainder = []
        let nextPage = result[result.length-1]+1
        const destPage = result[0]+n

        for (let i = Math.floor(nextPage/10); i < Math.floor(destPage/10)+1;i++) {
            let newFetch = fetchPages(i)
            this.remainder = this.remainder.concat(newFetch.results)
            this.nextPage = newFetch.nextPage 
        }

        let i= result.length
        while (i < n){
            result.push(this.remainder.shift())
            i++
        }
        return result
    };

    offsetFecthing(offset){
        //Assuming API returns the remainder pages 
        //from the point of the offset within the pageset

        let pageSetQuery = fetchPages(Math.floor(offset/PAGE_SIZE))
        let res = []
        pageSetQuery.results.map((p) => {
            if (p > offset){res.push(p)}
        })

        return res
    }
}

//Write test cases: Page-Based Fetching
const pageBasedFetch = new FetchAPI();
console.log(pageBasedFetch.pageBasedFetch(1))
console.log(pageBasedFetch.pageBasedFetch(1))
console.log(pageBasedFetch.pageBasedFetch(5))
console.log(pageBasedFetch.pageBasedFetch(7))
console.log(pageBasedFetch.pageBasedFetch(9))

//Write test cases: Offset Fetching 
const offsetFetching = new FetchAPI()
console.log(offsetFetching.offsetFecthing(87))
