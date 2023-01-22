import * as SecureStore from 'expo-secure-store';


// add a new search to the list
export async function newSearch(search:string | null | undefined) {
    if(!search) return await getSearches()
    if(search === '') return await getSearches()
    await SecureStore.getItemAsync('search').then(async (value) => {
        if (value) {
            const searches = JSON.parse(value);
            const newSearches = formatNewSearch(searches, search);

            await updateSearches(newSearches);
        } else {
            await updateSearches([search]);
        }
    })
    return await getSearches()
}

// clear all searches
export async function clearSearches() {
    await SecureStore.deleteItemAsync('search');
    return await getSearches()
}

// function that updates the list of searches
export async function updateSearches(searches:string[]) {
    await SecureStore.setItemAsync('search', JSON.stringify(searches));
    return await getSearches()
}

// function that formats the list of searches
function formatNewSearch(searches:Array<string>, search:string) {
    if(searches.length === 0) return [search];

    const index = searches.findIndex((item) => item.toLowerCase() === search.toLowerCase());
    
    if(index === -1) {
        searches.unshift(search);
    }
    
    else {
        searches.splice(index, 1);
        searches.unshift(search);
    }

    return searches;
}

// get the list of searches
export async function getSearches() {
    return await SecureStore.getItemAsync('search');
}