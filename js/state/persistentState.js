export class persistentState {
    // The artworks, artists, and categories are private variables caching the responses from the 
    // API to avoid fetching duplicates. 
    // The PreviousRoutes variable tracks which pages the user has seen before and which data
    // they have requested.
    // The private fields can only be accessed by the apropraite getter and setter methods.
  
    static ArtOdysseyIDs = [{"ID":"869"},{"ID":"2189"},{"ID":"2816"},{"ID":"4081"},{"ID":"4428"},{"ID":"4575"},{"ID":"4758"},{"ID":"4773"},{"ID":"4788"},{"ID":"4796"},{"ID":"4884"},{"ID":"5357"},{"ID":"5848"},{"ID":"6565"},{"ID":"7021"},{"ID":"7124"},{"ID":"8624"},{"ID":"8633"},{"ID":"8958"},{"ID":"8991"},{"ID":"9010"},{"ID":"9503"},{"ID":"9512"},{"ID":"11272"},{"ID":"11320"},{"ID":"11393"},{"ID":"11434"},{"ID":"11723"},{"ID":"13720"},{"ID":"13853"},{"ID":"14572"},{"ID":"14574"},{"ID":"14591"},{"ID":"14598"},{"ID":"14655"},{"ID":"14968"},{"ID":"15401"},{"ID":"15468"},{"ID":"15563"},{"ID":"16146"},{"ID":"16169"},{"ID":"16231"},{"ID":"16298"},{"ID":"16327"},{"ID":"16362"},{"ID":"16487"},{"ID":"16488"},{"ID":"16499"},{"ID":"16551"},{"ID":"16568"},{"ID":"16571"},{"ID":"16776"},{"ID":"16964"},{"ID":"18709"},{"ID":"18757"},{"ID":"19339"},{"ID":"20432"},{"ID":"20579"},{"ID":"20684"},{"ID":"21023"},{"ID":"23333"},{"ID":"23506"},{"ID":"23684"},{"ID":"23700"},{"ID":"23972"},{"ID":"24306"},{"ID":"24548"},{"ID":"24836"},{"ID":"25332"},{"ID":"25853"},{"ID":"25865"},{"ID":"27307"},{"ID":"27310"},{"ID":"27984"},{"ID":"27987"},{"ID":"27992"},{"ID":"28067"},{"ID":"28560"},{"ID":"28849"},{"ID":"30709"},{"ID":"30839"},{"ID":"31285"},{"ID":"34116"},{"ID":"34181"},{"ID":"34286"},{"ID":"34299"},{"ID":"35198"},{"ID":"35376"},{"ID":"36132"},{"ID":"36161"},{"ID":"37368"},{"ID":"37761"},{"ID":"38930"},{"ID":"40619"},{"ID":"42566"},{"ID":"43060"},{"ID":"43145"},{"ID":"43714"},{"ID":"44018"},{"ID":"44741"},{"ID":"44892"},{"ID":"46230"},{"ID":"46327"},{"ID":"47149"},{"ID":"49195"},{"ID":"49686"},{"ID":"49691"},{"ID":"49702"},{"ID":"49714"},{"ID":"50148"},{"ID":"50157"},{"ID":"50276"},{"ID":"50330"},{"ID":"50909"},{"ID":"51185"},{"ID":"52560"},{"ID":"52679"},{"ID":"52736"},{"ID":"53001"},{"ID":"55249"},{"ID":"55384"},{"ID":"55706"},{"ID":"56682"},{"ID":"56731"},{"ID":"56905"},{"ID":"57051"},{"ID":"57819"},{"ID":"58540"},{"ID":"59426"},{"ID":"59787"},{"ID":"59847"},{"ID":"60031"},{"ID":"60755"},{"ID":"60812"},{"ID":"61128"},{"ID":"61428"},{"ID":"61603"},{"ID":"61608"},{"ID":"62042"},{"ID":"62371"},{"ID":"63178"},{"ID":"63234"},{"ID":"63554"},{"ID":"64276"},{"ID":"64339"},{"ID":"64724"},{"ID":"64729"},{"ID":"64818"},{"ID":"64884"},{"ID":"65290"},{"ID":"65868"},{"ID":"65916"},{"ID":"66039"},{"ID":"66434"},{"ID":"66683"},{"ID":"68769"},{"ID":"68823"},{"ID":"69109"},{"ID":"69780"},{"ID":"70003"},{"ID":"70202"},{"ID":"70207"},{"ID":"70443"},{"ID":"70739"},{"ID":"71396"},{"ID":"71829"},{"ID":"72726"},{"ID":"72728"},{"ID":"72801"},{"ID":"73216"},{"ID":"73413"},{"ID":"73417"},{"ID":"75644"},{"ID":"76054"},{"ID":"76240"},{"ID":"76244"},{"ID":"76279"},{"ID":"76295"},{"ID":"76395"},{"ID":"76571"},{"ID":"76779"},{"ID":"76816"},{"ID":"76869"},{"ID":"79307"},{"ID":"79379"},{"ID":"79507"},{"ID":"79600"},{"ID":"80062"},{"ID":"80084"},{"ID":"80479"},{"ID":"80607"},{"ID":"81512"},{"ID":"81558"},{"ID":"81564"},{"ID":"83642"},{"ID":"83889"},{"ID":"83905"},{"ID":"84241"},{"ID":"84709"},{"ID":"85533"},{"ID":"86340"},{"ID":"86385"},{"ID":"86421"},{"ID":"87045"},{"ID":"87163"},{"ID":"87479"},{"ID":"87643"},{"ID":"88724"},{"ID":"88793"},{"ID":"88977"},{"ID":"89403"},{"ID":"89503"},{"ID":"89856"},{"ID":"90048"},{"ID":"90300"},{"ID":"90443"},{"ID":"90536"},{"ID":"90583"},{"ID":"91194"},{"ID":"91620"},{"ID":"93345"},{"ID":"93811"},{"ID":"93900"},{"ID":"95998"},{"ID":"97402"},{"ID":"97910"},{"ID":"97916"},{"ID":"99539"},{"ID":"99602"},{"ID":"99766"},{"ID":"100079"},{"ID":"100089"},{"ID":"100250"},{"ID":"100472"},{"ID":"100829"},{"ID":"100858"},{"ID":"102131"},{"ID":"102234"},{"ID":"102295"},{"ID":"102591"},{"ID":"102611"},{"ID":"102963"},{"ID":"103347"},{"ID":"103887"},{"ID":"103943"},{"ID":"104031"},{"ID":"104043"},{"ID":"104094"},{"ID":"105073"},{"ID":"105105"},{"ID":"105203"},{"ID":"105466"},{"ID":"105800"},{"ID":"106538"},{"ID":"107069"},{"ID":"107300"},{"ID":"109275"},{"ID":"109330"},{"ID":"109439"},{"ID":"109686"},{"ID":"109780"},{"ID":"109819"},{"ID":"109926"},{"ID":"110507"},{"ID":"110634"},{"ID":"110663"},{"ID":"110881"},{"ID":"111060"},{"ID":"111164"},{"ID":"111317"},{"ID":"111377"},{"ID":"111380"},{"ID":"111400"},{"ID":"111401"},{"ID":"111436"},{"ID":"111442"},{"ID":"111559"},{"ID":"111610"},{"ID":"111617"},{"ID":"111628"},{"ID":"111642"},{"ID":"111654"},{"ID":"111810"},{"ID":"112092"},{"ID":"117188"},{"ID":"117266"},{"ID":"117271"},{"ID":"118661"},{"ID":"118746"},{"ID":"119454"},{"ID":"119521"},{"ID":"120154"},{"ID":"122054"},{"ID":"125660"},{"ID":"126981"},{"ID":"127644"},{"ID":"127859"},{"ID":"129884"},{"ID":"131385"},{"ID":"131541"},{"ID":"135430"},{"ID":"137125"},{"ID":"140645"},{"ID":"142526"},{"ID":"144272"},{"ID":"144361"},{"ID":"144969"},{"ID":"145681"},{"ID":"146701"},{"ID":"146905"},{"ID":"146953"},{"ID":"146988"},{"ID":"146989"},{"ID":"146991"},{"ID":"147003"},{"ID":"147508"},{"ID":"147513"},{"ID":"148412"},{"ID":"149681"},{"ID":"149776"},{"ID":"150054"},{"ID":"150739"},{"ID":"151358"},{"ID":"151363"},{"ID":"151371"},{"ID":"151424"},{"ID":"153244"},{"ID":"153701"},{"ID":"154232"},{"ID":"154235"},{"ID":"154237"},{"ID":"154238"},{"ID":"155969"},{"ID":"156442"},{"ID":"156474"},{"ID":"156538"},{"ID":"157056"},{"ID":"157156"},{"ID":"157160"},{"ID":"159136"},{"ID":"159824"},{"ID":"160144"},{"ID":"160201"},{"ID":"160222"},{"ID":"160226"},{"ID":"180298"},{"ID":"181091"},{"ID":"181145"},{"ID":"181774"},{"ID":"182728"},{"ID":"183077"},{"ID":"183277"},{"ID":"184095"},{"ID":"184186"},{"ID":"184193"},{"ID":"184324"},{"ID":"184362"},{"ID":"184371"},{"ID":"184672"},{"ID":"185180"},{"ID":"185184"},{"ID":"185222"},{"ID":"185619"},{"ID":"185651"},{"ID":"185760"},{"ID":"185766"},{"ID":"185905"},{"ID":"185963"},{"ID":"186047"},{"ID":"186049"},{"ID":"186392"},{"ID":"187155"},{"ID":"187165"},{"ID":"187528"},{"ID":"188540"},{"ID":"188844"},{"ID":"188845"},{"ID":"189207"},{"ID":"189289"},{"ID":"189290"},{"ID":"189595"},{"ID":"189600"},{"ID":"189715"},{"ID":"189775"},{"ID":"189807"},{"ID":"189932"},{"ID":"190224"},{"ID":"190558"},{"ID":"191197"},{"ID":"191371"},{"ID":"191454"},{"ID":"191556"},{"ID":"192689"},{"ID":"192890"},{"ID":"193664"},{"ID":"196323"},{"ID":"198809"},{"ID":"199002"},{"ID":"199854"},{"ID":"207293"},{"ID":"210482"},{"ID":"210511"},{"ID":"217201"},{"ID":"218612"},{"ID":"220179"},{"ID":"220272"},{"ID":"221885"},{"ID":"223309"},{"ID":"225016"},{"ID":"227420"},{"ID":"229351"},{"ID":"229354"},{"ID":"229393"},{"ID":"229406"},{"ID":"229510"},{"ID":"229866"},{"ID":"230189"},{"ID":"234004"},{"ID":"234433"},{"ID":"234781"},{"ID":"234972"},{"ID":"238749"}];

    static dbName = "AppState";
    static storeNames = ["artworksStore", "artistsStore", "categoriesStore"];
    static cache = { artworksStore: {}, artistsStore: {}, categoriesStore: {} }; // Local cache of Fetched API resources
    static countriesStore;

    constructor() {
        this.initDB();
    }

    getDayArtWorkID(day){
        // returns the art id of the day
        let dayArtworks = [{"ID":14591},{"ID":14592},{"ID":14593},{"ID":14594},{"ID":14598},{"ID":14601},{"ID":14603},{"ID":14605},{"ID":14619},{"ID":14620},{"ID":14624},{"ID":14626},{"ID":14630},{"ID":14633},{"ID":14634},{"ID":14643},{"ID":14644},{"ID":14647},{"ID":14648},{"ID":14649},{"ID":14650},{"ID":14655},{"ID":14664},{"ID":14665},{"ID":14667},{"ID":14668},{"ID":14669},{"ID":14670},{"ID":14672},{"ID":14674},{"ID":14675},{"ID":14676},{"ID":14677},{"ID":14678},{"ID":14679},{"ID":14681},{"ID":14683},{"ID":14684},{"ID":14686},{"ID":14687},{"ID":14688},{"ID":14689},{"ID":14690},{"ID":14691},{"ID":14692},{"ID":14693},{"ID":14694},{"ID":14695},{"ID":14696},{"ID":14697},{"ID":14698},{"ID":14699},{"ID":14700},{"ID":14701},{"ID":14702},{"ID":14703},{"ID":14704},{"ID":14705},{"ID":14707},{"ID":14708},{"ID":14709},{"ID":14710},{"ID":14711},{"ID":14713},{"ID":14714},{"ID":14715},{"ID":14720},{"ID":14721},{"ID":14727},{"ID":14729},{"ID":14730},{"ID":14731},{"ID":14732},{"ID":14733},{"ID":14734},{"ID":14736},{"ID":14737},{"ID":14739},{"ID":14740},{"ID":14743},{"ID":14745},{"ID":14746},{"ID":14748},{"ID":14749},{"ID":14752},{"ID":14753},{"ID":14755},{"ID":14757},{"ID":14758},{"ID":14761},{"ID":14762},{"ID":14763},{"ID":14764},{"ID":14765},{"ID":14766},{"ID":14767},{"ID":14768},{"ID":14770},{"ID":14771},{"ID":14772},{"ID":14773},{"ID":14774},{"ID":14775},{"ID":14780},{"ID":14781},{"ID":14782},{"ID":14783},{"ID":14786},{"ID":14787},{"ID":14788},{"ID":14789},{"ID":14790},{"ID":14792},{"ID":14794},{"ID":14795},{"ID":14796},{"ID":14797},{"ID":14798},{"ID":14799},{"ID":14803},{"ID":14804},{"ID":14805},{"ID":14806},{"ID":14808},{"ID":14809},{"ID":14810},{"ID":14811},{"ID":14812},{"ID":14813},{"ID":14814},{"ID":14815},{"ID":14816},{"ID":14817},{"ID":14818},{"ID":14819},{"ID":14820},{"ID":14821},{"ID":14822},{"ID":14825},{"ID":14827},{"ID":14831},{"ID":14833},{"ID":14834},{"ID":14835},{"ID":14837},{"ID":14838},{"ID":14839},{"ID":14840},{"ID":14842},{"ID":80062},{"ID":14845},{"ID":14846},{"ID":14847},{"ID":14848},{"ID":14849},{"ID":14850},{"ID":120662},{"ID":14852},{"ID":14853},{"ID":14854},{"ID":14855},{"ID":14856},{"ID":14857},{"ID":14858},{"ID":14859},{"ID":14860},{"ID":14861},{"ID":14862},{"ID":14863},{"ID":14864},{"ID":14865},{"ID":14866},{"ID":14867},{"ID":14869},{"ID":14871},{"ID":14873},{"ID":14874},{"ID":14877},{"ID":14878},{"ID":14880},{"ID":14882},{"ID":14884},{"ID":14889},{"ID":14890},{"ID":14891},{"ID":14892},{"ID":14893},{"ID":14894},{"ID":14895},{"ID":14896},{"ID":14898},{"ID":14900},{"ID":14901},{"ID":14904},{"ID":14906},{"ID":14908},{"ID":14910},{"ID":14912},{"ID":14916},{"ID":14917},{"ID":14919},{"ID":14925},{"ID":14927},{"ID":14929},{"ID":14930},{"ID":14931},{"ID":14932},{"ID":14933},{"ID":14934},{"ID":14935},{"ID":14936},{"ID":14937},{"ID":14938},{"ID":14940},{"ID":14941},{"ID":14943},{"ID":14946},{"ID":14948},{"ID":14959},{"ID":14966},{"ID":14968},{"ID":14970},{"ID":14973},{"ID":14975},{"ID":14977},{"ID":14983},{"ID":14987},{"ID":14992},{"ID":14993},{"ID":14995},{"ID":15010},{"ID":15012},{"ID":15014},{"ID":15017},{"ID":15019},{"ID":15021},{"ID":15024},{"ID":15026},{"ID":15028},{"ID":15030},{"ID":15033},{"ID":15035},{"ID":15041},{"ID":15043},{"ID":15045},{"ID":15047},{"ID":15048},{"ID":15050},{"ID":15051},{"ID":15057},{"ID":15060},{"ID":15063},{"ID":15065},{"ID":15066},{"ID":15068},{"ID":15069},{"ID":15071},{"ID":15073},{"ID":15074},{"ID":15075},{"ID":15077},{"ID":15079},{"ID":15085},{"ID":15086},{"ID":15087},{"ID":15089},{"ID":15091},{"ID":15092},{"ID":15095},{"ID":15098},{"ID":15099},{"ID":15100},{"ID":15101},{"ID":15102},{"ID":15103},{"ID":15104},{"ID":15105},{"ID":15106},{"ID":15107},{"ID":15108},{"ID":15110},{"ID":15111},{"ID":15113},{"ID":15114},{"ID":15118},{"ID":15120},{"ID":15121},{"ID":15123},{"ID":15124},{"ID":15126},{"ID":15127},{"ID":15130},{"ID":15132},{"ID":15135},{"ID":15136},{"ID":15140},{"ID":15142},{"ID":15143},{"ID":15144},{"ID":15146},{"ID":15147},{"ID":15149},{"ID":15152},{"ID":15154},{"ID":15155},{"ID":15156},{"ID":15157},{"ID":15158},{"ID":15160},{"ID":15161},{"ID":15162},{"ID":15163},{"ID":15164},{"ID":15165},{"ID":15166},{"ID":15167},{"ID":15168},{"ID":15169},{"ID":15170},{"ID":15172},{"ID":15173},{"ID":15177},{"ID":15179},{"ID":15181},{"ID":15182},{"ID":15184},{"ID":15188},{"ID":15189},{"ID":15190},{"ID":15191},{"ID":15192},{"ID":15193},{"ID":15194},{"ID":15195},{"ID":15197},{"ID":15199},{"ID":15201},{"ID":15204},{"ID":15206},{"ID":15207},{"ID":15210},{"ID":15211},{"ID":15214},{"ID":15215},{"ID":15217},{"ID":15218},{"ID":15219},{"ID":15221},{"ID":15222},{"ID":15223},{"ID":15225},{"ID":15230},{"ID":15233},{"ID":15239},{"ID":15243},{"ID":15251},{"ID":15254},{"ID":15257},{"ID":15260},{"ID":15276},{"ID":15279},{"ID":15287},{"ID":15291},{"ID":15297},{"ID":15300},{"ID":15302},{"ID":15303},{"ID":15304},{"ID":15305}]

        return dayArtworks[day]['ID'];
    }

    getArtOdysseyList(pageNumber, itemsPerPage){
        // return the ids of arts for the page requested
        return persistentState.ArtOdysseyIDs.slice((pageNumber-1) * itemsPerPage, (pageNumber ) * itemsPerPage );
    }

    async getCountriesData(){
        // returns the data for the countries
        if (persistentState.countriesStore && Object.keys(persistentState.countriesStore).length > 0) {
            return persistentState.countriesStore; // Return existing data if available
        }
        else {
            try {
                // const response = await fetch('https://articasso.org/data/countries.json');
                const response = await fetch('../data/countries.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();

                // Convert JSON array to a dictionary (object) using country id as the key
                persistentState.countriesStore = {};
                let i = 0;
                jsonData.forEach(country => {
                    persistentState.countriesStore[i] = country;
                    i++
                });
                return persistentState.countriesStore;
            } catch (error) {
                console.error("Error loading JSON file:", error);
                return {};
            }
        }
    }

    async getCountriesPage(pageNumber, itemsPerPage){
        // returns the data for the countries
        if (persistentState.countriesStore && Object.keys(persistentState.countriesStore).length > 0) {
            return Object.values(persistentState.countriesStore).slice((pageNumber-1)*itemsPerPage, pageNumber*itemsPerPage); // Return existing data if available
        }
        else {
            try {
                let countriesData = await this.getCountriesData();
                return Object.values(countriesData).slice((pageNumber-1)*itemsPerPage, pageNumber*itemsPerPage);

            } catch (error) {
                console.error(error);
                return {}
            }
        }
    }

    // Initialize IndexedDB with separate stores and indexes
    initDB() {
        let request = indexedDB.open(persistentState.dbName, 1);
        request.onupgradeneeded = (event) => {
            let db = event.target.result;
            persistentState.storeNames.forEach((storeName) => {
                if (!db.objectStoreNames.contains(storeName)) {
                    let store = db.createObjectStore(storeName, { keyPath: "id" });
                    store.createIndex("nameIndex", "name", { unique: false });
                }
            });
        };
    }

    // Batch fetch multiple items in a single transaction
    async batchGetState(storeName, ids) {
        return new Promise((resolve, reject) => {
            let request = indexedDB.open(persistentState.dbName);
            request.onsuccess = (event) => {
                let db = event.target.result;
                let transaction = db.transaction(storeName, "readonly");
                let store = transaction.objectStore(storeName);

                let results = {};
                ids.forEach(id => {
                    let getRequest = store.get(id);
                    getRequest.onsuccess = () => results[id] = getRequest.result ? getRequest.result.data : null;
                });

                transaction.oncomplete = () => resolve(results);
                transaction.onerror = () => reject(`Batch fetch failed for ${storeName}`);
            };
        });
    }

    // Optimized getState with cache
    async getState(storeName, id) {
        if (persistentState.cache[storeName][id]) {
            return persistentState.cache[storeName][id];
        }
        let data = await this.fetchFromDB(storeName, id);
        if (data) persistentState.cache[storeName][id] = data; // Store in cache
        return data;
    }

    // Fetch data from IndexedDB
    async fetchFromDB(storeName, id) {
        return new Promise((resolve, reject) => {
            let request = indexedDB.open(persistentState.dbName);
            request.onsuccess = (event) => {
                let db = event.target.result;
                let transaction = db.transaction(storeName, "readonly");
                let store = transaction.objectStore(storeName);
                let getRequest = store.get(id);

                getRequest.onsuccess = () => resolve(getRequest.result ? getRequest.result.data : null);
                getRequest.onerror = () => reject(`Failed to fetch data from ${storeName}`);
            };
        });
    }

    // Add or update an item in IndexedDB
    async updateState(storeName, id, data) {
        persistentState.cache[storeName][id] = data; // Update cache
        let request = indexedDB.open(persistentState.dbName);
        request.onsuccess = (event) => {
            let db = event.target.result;
            let transaction = db.transaction(storeName, "readwrite");
            let store = transaction.objectStore(storeName);
            store.put({ id, data });
        };
    }

    // Check if an item exists (using cache first)
    async hasItem(storeName, id) {
        return persistentState.cache[storeName][id] !== undefined || await this.fetchFromDB(storeName, id) !== null;
    }

    
    async addItem(storeName, id, data) {
        // returns void
        let exists = await this.hasItem(storeName, id);
        if (!exists) { // Add new data only if it doesn't exist
            this.updateState(storeName, id, data);
        }
    }

    // Remove an item and clear cache
    async removeItem(storeName, id) {
        delete persistentState.cache[storeName][id]; // Remove from cache
        let request = indexedDB.open(persistentState.dbName);
        request.onsuccess = (event) => {
            let db = event.target.result;
            let transaction = db.transaction(storeName, "readwrite");
            let store = transaction.objectStore(storeName);
            store.delete(id);
        };
    }
}
