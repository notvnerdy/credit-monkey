#!/usr/bin/env python3
"""
Generate individual state pages with ALL counties for Credit Monkey website
"""

# COMPLETE county data for all 50 states + DC
states_data = {
    "Alabama": ["Autauga", "Baldwin", "Barbour", "Bibb", "Blount", "Bullock", "Butler", "Calhoun", "Chambers", "Cherokee", "Chilton", "Choctaw", "Clarke", "Clay", "Cleburne", "Coffee", "Colbert", "Conecuh", "Coosa", "Covington", "Crenshaw", "Cullman", "Dale", "Dallas", "DeKalb", "Elmore", "Escambia", "Etowah", "Fayette", "Franklin", "Geneva", "Greene", "Hale", "Henry", "Houston", "Jackson", "Jefferson", "Lamar", "Lauderdale", "Lawrence", "Lee", "Limestone", "Lowndes", "Macon", "Madison", "Marengo", "Marion", "Marshall", "Mobile", "Monroe", "Montgomery", "Morgan", "Perry", "Pickens", "Pike", "Randolph", "Russell", "St. Clair", "Shelby", "Sumter", "Talladega", "Tallapoosa", "Tuscaloosa", "Walker", "Washington", "Wilcox", "Winston"],
    
    "Alaska": ["Aleutians East", "Aleutians West", "Anchorage", "Bethel", "Bristol Bay", "Denali", "Dillingham", "Fairbanks North Star", "Haines", "Hoonah-Angoon", "Juneau", "Kenai Peninsula", "Ketchikan Gateway", "Kodiak Island", "Lake and Peninsula", "Matanuska-Susitna", "Nome", "North Slope", "Northwest Arctic", "Petersburg", "Prince of Wales-Hyder", "Sitka", "Skagway", "Southeast Fairbanks", "Valdez-Cordova", "Wade Hampton", "Wrangell", "Yakutat", "Yukon-Koyukuk"],
    
    "Arizona": ["Apache", "Cochise", "Coconino", "Gila", "Graham", "Greenlee", "La Paz", "Maricopa", "Mohave", "Navajo", "Pima", "Pinal", "Santa Cruz", "Yavapai", "Yuma"],
    
    "Arkansas": ["Arkansas", "Ashley", "Baxter", "Benton", "Boone", "Bradley", "Calhoun", "Carroll", "Chicot", "Clark", "Clay", "Cleburne", "Cleveland", "Columbia", "Conway", "Craighead", "Crawford", "Crittenden", "Cross", "Dallas", "Desha", "Drew", "Faulkner", "Franklin", "Fulton", "Garland", "Grant", "Greene", "Hempstead", "Hot Spring", "Howard", "Independence", "Izard", "Jackson", "Jefferson", "Johnson", "Lafayette", "Lawrence", "Lee", "Lincoln", "Little River", "Logan", "Lonoke", "Madison", "Marion", "Miller", "Mississippi", "Monroe", "Montgomery", "Nevada", "Newton", "Ouachita", "Perry", "Phillips", "Pike", "Poinsett", "Polk", "Pope", "Prairie", "Pulaski", "Randolph", "Saline", "Scott", "Searcy", "Sebastian", "Sevier", "Sharp", "Stone", "Union", "Van Buren", "Washington", "White", "Woodruff", "Yell"],
    
    "California": ["Alameda", "Alpine", "Amador", "Butte", "Calaveras", "Colusa", "Contra Costa", "Del Norte", "El Dorado", "Fresno", "Glenn", "Humboldt", "Imperial", "Inyo", "Kern", "Kings", "Lake", "Lassen", "Los Angeles", "Madera", "Marin", "Mariposa", "Mendocino", "Merced", "Modoc", "Mono", "Monterey", "Napa", "Nevada", "Orange", "Placer", "Plumas", "Riverside", "Sacramento", "San Benito", "San Bernardino", "San Diego", "San Francisco", "San Joaquin", "San Luis Obispo", "San Mateo", "Santa Barbara", "Santa Clara", "Santa Cruz", "Shasta", "Sierra", "Siskiyou", "Solano", "Sonoma", "Stanislaus", "Sutter", "Tehama", "Trinity", "Tulare", "Tuolumne", "Ventura", "Yolo", "Yuba"],
    
    "Colorado": ["Adams", "Alamosa", "Arapahoe", "Archuleta", "Baca", "Bent", "Boulder", "Broomfield", "Chaffee", "Cheyenne", "Clear Creek", "Conejos", "Costilla", "Crowley", "Custer", "Delta", "Denver", "Dolores", "Douglas", "Eagle", "Elbert", "El Paso", "Fremont", "Garfield", "Gilpin", "Grand", "Gunnison", "Hinsdale", "Huerfano", "Jackson", "Jefferson", "Kiowa", "Kit Carson", "Lake", "La Plata", "Larimer", "Las Animas", "Lincoln", "Logan", "Mesa", "Mineral", "Moffat", "Montezuma", "Montrose", "Morgan", "Otero", "Ouray", "Park", "Phillips", "Pitkin", "Prowers", "Pueblo", "Rio Blanco", "Rio Grande", "Routt", "Saguache", "San Juan", "San Miguel", "Sedgwick", "Summit", "Teller", "Washington", "Weld", "Yuma"],
    
    "Connecticut": ["Fairfield", "Hartford", "Litchfield", "Middlesex", "New Haven", "New London", "Tolland", "Windham"],
    
    "Delaware": ["Kent", "New Castle", "Sussex"],
    
    "District of Columbia": ["District of Columbia"],
    
    "Florida": ["Alachua", "Baker", "Bay", "Bradford", "Brevard", "Broward", "Calhoun", "Charlotte", "Citrus", "Clay", "Collier", "Columbia", "DeSoto", "Dixie", "Duval", "Escambia", "Flagler", "Franklin", "Gadsden", "Gilchrist", "Glades", "Gulf", "Hamilton", "Hardee", "Hendry", "Hernando", "Highlands", "Hillsborough", "Holmes", "Indian River", "Jackson", "Jefferson", "Lafayette", "Lake", "Lee", "Leon", "Levy", "Liberty", "Madison", "Manatee", "Marion", "Martin", "Miami-Dade", "Monroe", "Nassau", "Okaloosa", "Okeechobee", "Orange", "Osceola", "Palm Beach", "Pasco", "Pinellas", "Polk", "Putnam", "St. Johns", "St. Lucie", "Santa Rosa", "Sarasota", "Seminole", "Sumter", "Suwannee", "Taylor", "Union", "Volusia", "Wakulla", "Walton", "Washington"],
    
    "Georgia": ["Appling", "Atkinson", "Bacon", "Baker", "Baldwin", "Banks", "Barrow", "Bartow", "Ben Hill", "Berrien", "Bibb", "Bleckley", "Brantley", "Brooks", "Bryan", "Bulloch", "Burke", "Butts", "Calhoun", "Camden", "Candler", "Carroll", "Catoosa", "Charlton", "Chatham", "Chattahoochee", "Chattooga", "Cherokee", "Clarke", "Clay", "Clayton", "Clinch", "Cobb", "Coffee", "Colquitt", "Columbia", "Cook", "Coweta", "Crawford", "Crisp", "Dade", "Dawson", "Decatur", "DeKalb", "Dodge", "Dooly", "Dougherty", "Douglas", "Early", "Echols", "Effingham", "Elbert", "Emanuel", "Evans", "Fannin", "Fayette", "Floyd", "Forsyth", "Franklin", "Fulton", "Gilmer", "Glascock", "Glynn", "Gordon", "Grady", "Greene", "Gwinnett", "Habersham", "Hall", "Hancock", "Haralson", "Harris", "Hart", "Heard", "Henry", "Houston", "Irwin", "Jackson", "Jasper", "Jeff Davis", "Jefferson", "Jenkins", "Johnson", "Jones", "Lamar", "Lanier", "Laurens", "Lee", "Liberty", "Lincoln", "Long", "Lowndes", "Lumpkin", "McDuffie", "McIntosh", "Macon", "Madison", "Marion", "Meriwether", "Miller", "Mitchell", "Monroe", "Montgomery", "Morgan", "Murray", "Muscogee", "Newton", "Oconee", "Oglethorpe", "Paulding", "Peach", "Pickens", "Pierce", "Pike", "Polk", "Pulaski", "Putnam", "Quitman", "Rabun", "Randolph", "Richmond", "Rockdale", "Schley", "Screven", "Seminole", "Spalding", "Stephens", "Stewart", "Sumter", "Talbot", "Taliaferro", "Tattnall", "Taylor", "Telfair", "Terrell", "Thomas", "Tift", "Toombs", "Towns", "Treutlen", "Troup", "Turner", "Twiggs", "Union", "Upson", "Walker", "Walton", "Ware", "Warren", "Washington", "Wayne", "Webster", "Wheeler", "White", "Whitfield", "Wilcox", "Wilkes", "Wilkinson", "Worth"],
    
    "Hawaii": ["Hawaii", "Honolulu", "Kalawao", "Kauai", "Maui"],
    
    "Idaho": ["Ada", "Adams", "Bannock", "Bear Lake", "Benewah", "Bingham", "Blaine", "Boise", "Bonner", "Bonneville", "Boundary", "Butte", "Camas", "Canyon", "Caribou", "Cassia", "Clark", "Clearwater", "Custer", "Elmore", "Franklin", "Fremont", "Gem", "Gooding", "Idaho", "Jefferson", "Jerome", "Kootenai", "Latah", "Lemhi", "Lewis", "Lincoln", "Madison", "Minidoka", "Nez Perce", "Oneida", "Owyhee", "Payette", "Power", "Shoshone", "Teton", "Twin Falls", "Valley", "Washington"],
    
    "Illinois": ["Adams", "Alexander", "Bond", "Boone", "Brown", "Bureau", "Calhoun", "Carroll", "Cass", "Champaign", "Christian", "Clark", "Clay", "Clinton", "Coles", "Cook", "Crawford", "Cumberland", "DeKalb", "DeWitt", "Douglas", "DuPage", "Edgar", "Edwards", "Effingham", "Fayette", "Ford", "Franklin", "Fulton", "Gallatin", "Greene", "Grundy", "Hamilton", "Hancock", "Hardin", "Henderson", "Henry", "Iroquois", "Jackson", "Jasper", "Jefferson", "Jersey", "Jo Daviess", "Johnson", "Kane", "Kankakee", "Kendall", "Knox", "Lake", "LaSalle", "Lawrence", "Lee", "Livingston", "Logan", "McDonough", "McHenry", "McLean", "Macon", "Macoupin", "Madison", "Marion", "Marshall", "Mason", "Massac", "Menard", "Mercer", "Monroe", "Montgomery", "Morgan", "Moultrie", "Ogle", "Peoria", "Perry", "Piatt", "Pike", "Pope", "Pulaski", "Putnam", "Randolph", "Richland", "Rock Island", "St. Clair", "Saline", "Sangamon", "Schuyler", "Scott", "Shelby", "Stark", "Stephenson", "Tazewell", "Union", "Vermilion", "Wabash", "Warren", "Washington", "Wayne", "White", "Whiteside", "Will", "Williamson", "Winnebago", "Woodford"],
    
    "Indiana": ["Adams", "Allen", "Bartholomew", "Benton", "Blackford", "Boone", "Brown", "Carroll", "Cass", "Clark", "Clay", "Clinton", "Crawford", "Daviess", "Dearborn", "Decatur", "DeKalb", "Delaware", "Dubois", "Elkhart", "Fayette", "Floyd", "Fountain", "Franklin", "Fulton", "Gibson", "Grant", "Greene", "Hamilton", "Hancock", "Harrison", "Hendricks", "Henry", "Howard", "Huntington", "Jackson", "Jasper", "Jay", "Jefferson", "Jennings", "Johnson", "Knox", "Kosciusko", "LaGrange", "Lake", "LaPorte", "Lawrence", "Madison", "Marion", "Marshall", "Martin", "Miami", "Monroe", "Montgomery", "Morgan", "Newton", "Noble", "Ohio", "Orange", "Owen", "Parke", "Perry", "Pike", "Porter", "Posey", "Pulaski", "Putnam", "Randolph", "Ripley", "Rush", "St. Joseph", "Scott", "Shelby", "Spencer", "Starke", "Steuben", "Sullivan", "Switzerland", "Tippecanoe", "Tipton", "Union", "Vanderburgh", "Vermillion", "Vigo", "Wabash", "Warren", "Warrick", "Washington", "Wayne", "Wells", "White", "Whitley"],
    
    "Iowa": ["Adair", "Adams", "Allamakee", "Appanoose", "Audubon", "Benton", "Black Hawk", "Boone", "Bremer", "Buchanan", "Buena Vista", "Butler", "Calhoun", "Carroll", "Cass", "Cedar", "Cerro Gordo", "Cherokee", "Chickasaw", "Clarke", "Clay", "Clayton", "Clinton", "Crawford", "Dallas", "Davis", "Decatur", "Delaware", "Des Moines", "Dickinson", "Dubuque", "Emmet", "Fayette", "Floyd", "Franklin", "Fremont", "Greene", "Grundy", "Guthrie", "Hamilton", "Hancock", "Hardin", "Harrison", "Henry", "Howard", "Humboldt", "Ida", "Iowa", "Jackson", "Jasper", "Jefferson", "Johnson", "Jones", "Keokuk", "Kossuth", "Lee", "Linn", "Louisa", "Lucas", "Lyon", "Madison", "Mahaska", "Marion", "Marshall", "Mills", "Mitchell", "Monona", "Monroe", "Montgomery", "Muscatine", "O'Brien", "Osceola", "Page", "Palo Alto", "Plymouth", "Pocahontas", "Polk", "Pottawattamie", "Poweshiek", "Ringgold", "Sac", "Scott", "Shelby", "Sioux", "Story", "Tama", "Taylor", "Union", "Van Buren", "Wapello", "Warren", "Washington", "Wayne", "Webster", "Winnebago", "Winneshiek", "Woodbury", "Worth", "Wright"],
    
    "Kansas": ["Allen", "Anderson", "Atchison", "Barber", "Barton", "Bourbon", "Brown", "Butler", "Chase", "Chautauqua", "Cherokee", "Cheyenne", "Clark", "Clay", "Cloud", "Coffey", "Comanche", "Cowley", "Crawford", "Decatur", "Dickinson", "Doniphan", "Douglas", "Edwards", "Elk", "Ellis", "Ellsworth", "Finney", "Ford", "Franklin", "Geary", "Gove", "Graham", "Grant", "Gray", "Greeley", "Greenwood", "Hamilton", "Harper", "Harvey", "Haskell", "Hodgeman", "Jackson", "Jefferson", "Jewell", "Johnson", "Kearny", "Kingman", "Kiowa", "Labette", "Lane", "Leavenworth", "Lincoln", "Linn", "Logan", "Lyon", "McPherson", "Marion", "Marshall", "Meade", "Miami", "Mitchell", "Montgomery", "Morris", "Morton", "Nemaha", "Neosho", "Ness", "Norton", "Osage", "Osborne", "Ottawa", "Pawnee", "Phillips", "Pottawatomie", "Pratt", "Rawlins", "Reno", "Republic", "Rice", "Riley", "Rooks", "Rush", "Russell", "Saline", "Scott", "Sedgwick", "Seward", "Shawnee", "Sheridan", "Sherman", "Smith", "Stafford", "Stanton", "Stevens", "Sumner", "Thomas", "Trego", "Wabaunsee", "Wallace", "Washington", "Wichita", "Wilson", "Woodson", "Wyandotte"],
    
    "Kentucky": ["Adair", "Allen", "Anderson", "Ballard", "Barren", "Bath", "Bell", "Boone", "Bourbon", "Boyd", "Boyle", "Bracken", "Breathitt", "Breckinridge", "Bullitt", "Butler", "Caldwell", "Calloway", "Campbell", "Carlisle", "Carroll", "Carter", "Casey", "Christian", "Clark", "Clay", "Clinton", "Crittenden", "Cumberland", "Daviess", "Edmonson", "Elliott", "Estill", "Fayette", "Fleming", "Floyd", "Franklin", "Fulton", "Gallatin", "Garrard", "Grant", "Graves", "Grayson", "Green", "Greenup", "Hancock", "Hardin", "Harlan", "Harrison", "Hart", "Henderson", "Henry", "Hickman", "Hopkins", "Jackson", "Jefferson", "Jessamine", "Johnson", "Kenton", "Knott", "Knox", "Larue", "Laurel", "Lawrence", "Lee", "Leslie", "Letcher", "Lewis", "Lincoln", "Livingston", "Logan", "Lyon", "McCracken", "McCreary", "McLean", "Madison", "Magoffin", "Marion", "Marshall", "Martin", "Mason", "Meade", "Menifee", "Mercer", "Metcalfe", "Monroe", "Montgomery", "Morgan", "Muhlenberg", "Nelson", "Nicholas", "Ohio", "Oldham", "Owen", "Owsley", "Pendleton", "Perry", "Pike", "Powell", "Pulaski", "Robertson", "Rockcastle", "Rowan", "Russell", "Scott", "Shelby", "Simpson", "Spencer", "Taylor", "Todd", "Trigg", "Trimble", "Union", "Warren", "Washington", "Wayne", "Webster", "Whitley", "Wolfe", "Woodford"],
    
    "Louisiana": ["Acadia", "Allen", "Ascension", "Assumption", "Avoyelles", "Beauregard", "Bienville", "Bossier", "Caddo", "Calcasieu", "Caldwell", "Cameron", "Catahoula", "Claiborne", "Concordia", "De Soto", "East Baton Rouge", "East Carroll", "East Feliciana", "Evangeline", "Franklin", "Grant", "Iberia", "Iberville", "Jackson", "Jefferson", "Jefferson Davis", "Lafayette", "Lafourche", "LaSalle", "Lincoln", "Livingston", "Madison", "Morehouse", "Natchitoches", "Orleans", "Ouachita", "Plaquemines", "Pointe Coupee", "Rapides", "Red River", "Richland", "Sabine", "St. Bernard", "St. Charles", "St. Helena", "St. James", "St. John the Baptist", "St. Landry", "St. Martin", "St. Mary", "St. Tammany", "Tangipahoa", "Tensas", "Terrebonne", "Union", "Vermilion", "Vernon", "Washington", "Webster", "West Baton Rouge", "West Carroll", "West Feliciana", "Winn"],
    
    "Maine": ["Androscoggin", "Aroostook", "Cumberland", "Franklin", "Hancock", "Kennebec", "Knox", "Lincoln", "Oxford", "Penobscot", "Piscataquis", "Sagadahoc", "Somerset", "Waldo", "Washington", "York"],
    
    "Maryland": ["Allegany", "Anne Arundel", "Baltimore", "Baltimore City", "Calvert", "Caroline", "Carroll", "Cecil", "Charles", "Dorchester", "Frederick", "Garrett", "Harford", "Howard", "Kent", "Montgomery", "Prince George's", "Queen Anne's", "Somerset", "St. Mary's", "Talbot", "Washington", "Wicomico", "Worcester"],
    
    "Massachusetts": ["Barnstable", "Berkshire", "Bristol", "Dukes", "Essex", "Franklin", "Hampden", "Hampshire", "Middlesex", "Nantucket", "Norfolk", "Plymouth", "Suffolk", "Worcester"],
    
    "Michigan": ["Alcona", "Alger", "Allegan", "Alpena", "Antrim", "Arenac", "Baraga", "Barry", "Bay", "Benzie", "Berrien", "Branch", "Calhoun", "Cass", "Charlevoix", "Cheboygan", "Chippewa", "Clare", "Clinton", "Crawford", "Delta", "Dickinson", "Eaton", "Emmet", "Genesee", "Gladwin", "Gogebic", "Grand Traverse", "Gratiot", "Hillsdale", "Houghton", "Huron", "Ingham", "Ionia", "Iosco", "Iron", "Isabella", "Jackson", "Kalamazoo", "Kalkaska", "Kent", "Keweenaw", "Lake", "Lapeer", "Leelanau", "Lenawee", "Livingston", "Luce", "Mackinac", "Macomb", "Manistee", "Marquette", "Mason", "Mecosta", "Menominee", "Midland", "Missaukee", "Monroe", "Montcalm", "Montmorency", "Muskegon", "Newaygo", "Oakland", "Oceana", "Ogemaw", "Ontonagon", "Osceola", "Oscoda", "Otsego", "Ottawa", "Presque Isle", "Roscommon", "Saginaw", "St. Clair", "St. Joseph", "Sanilac", "Schoolcraft", "Shiawassee", "Tuscola", "Van Buren", "Washtenaw", "Wayne", "Wexford"],
    
    "Minnesota": ["Aitkin", "Anoka", "Becker", "Beltrami", "Benton", "Big Stone", "Blue Earth", "Brown", "Carlton", "Carver", "Cass", "Chippewa", "Chisago", "Clay", "Clearwater", "Cook", "Cottonwood", "Crow Wing", "Dakota", "Dodge", "Douglas", "Faribault", "Fillmore", "Freeborn", "Goodhue", "Grant", "Hennepin", "Houston", "Hubbard", "Isanti", "Itasca", "Jackson", "Kanabec", "Kandiyohi", "Kittson", "Koochiching", "Lac qui Parle", "Lake", "Lake of the Woods", "Le Sueur", "Lincoln", "Lyon", "McLeod", "Mahnomen", "Marshall", "Martin", "Meeker", "Mille Lacs", "Morrison", "Mower", "Murray", "Nicollet", "Nobles", "Norman", "Olmsted", "Otter Tail", "Pennington", "Pine", "Pipestone", "Polk", "Pope", "Ramsey", "Red Lake", "Redwood", "Renville", "Rice", "Rock", "Roseau", "St. Louis", "Scott", "Sherburne", "Sibley", "Stearns", "Steele", "Stevens", "Swift", "Todd", "Traverse", "Wabasha", "Wadena", "Waseca", "Washington", "Watonwan", "Wilkin", "Winona", "Wright", "Yellow Medicine"],
    
    "Mississippi": ["Adams", "Alcorn", "Amite", "Attala", "Benton", "Bolivar", "Calhoun", "Carroll", "Chickasaw", "Choctaw", "Claiborne", "Clarke", "Clay", "Coahoma", "Copiah", "Covington", "DeSoto", "Forrest", "Franklin", "George", "Greene", "Grenada", "Hancock", "Harrison", "Hinds", "Holmes", "Humphreys", "Issaquena", "Itawamba", "Jackson", "Jasper", "Jefferson", "Jefferson Davis", "Jones", "Kemper", "Lafayette", "Lamar", "Lauderdale", "Lawrence", "Leake", "Lee", "Leflore", "Lincoln", "Lowndes", "Madison", "Marion", "Marshall", "Monroe", "Montgomery", "Neshoba", "Newton", "Noxubee", "Oktibbeha", "Panola", "Pearl River", "Perry", "Pike", "Pontotoc", "Prentiss", "Quitman", "Rankin", "Scott", "Sharkey", "Simpson", "Smith", "Stone", "Sunflower", "Tallahatchie", "Tate", "Tippah", "Tishomingo", "Tunica", "Union", "Walthall", "Warren", "Washington", "Wayne", "Webster", "Wilkinson", "Winston", "Yalobusha", "Yazoo"],
    
    "Missouri": ["Adair", "Andrew", "Atchison", "Audrain", "Barry", "Barton", "Bates", "Benton", "Bollinger", "Boone", "Buchanan", "Butler", "Caldwell", "Callaway", "Camden", "Cape Girardeau", "Carroll", "Carter", "Cass", "Cedar", "Chariton", "Christian", "Clark", "Clay", "Clinton", "Cole", "Cooper", "Crawford", "Dade", "Dallas", "Daviess", "DeKalb", "Dent", "Douglas", "Dunklin", "Franklin", "Gasconade", "Gentry", "Greene", "Grundy", "Harrison", "Henry", "Hickory", "Holt", "Howard", "Howell", "Iron", "Jackson", "Jasper", "Jefferson", "Johnson", "Knox", "Laclede", "Lafayette", "Lawrence", "Lewis", "Lincoln", "Linn", "Livingston", "McDonald", "Macon", "Madison", "Maries", "Marion", "Mercer", "Miller", "Mississippi", "Moniteau", "Monroe", "Montgomery", "Morgan", "New Madrid", "Newton", "Nodaway", "Oregon", "Osage", "Ozark", "Pemiscot", "Perry", "Pettis", "Phelps", "Pike", "Platte", "Polk", "Pulaski", "Putnam", "Ralls", "Randolph", "Ray", "Reynolds", "Ripley", "St. Charles", "St. Clair", "Ste. Genevieve", "St. Francois", "St. Louis", "St. Louis City", "Saline", "Schuyler", "Scotland", "Scott", "Shannon", "Shelby", "Stoddard", "Stone", "Sullivan", "Taney", "Texas", "Vernon", "Warren", "Washington", "Wayne", "Webster", "Worth", "Wright"],
    
    "Montana": ["Beaverhead", "Big Horn", "Blaine", "Broadwater", "Carbon", "Carter", "Cascade", "Chouteau", "Custer", "Daniels", "Dawson", "Deer Lodge", "Fallon", "Fergus", "Flathead", "Gallatin", "Garfield", "Glacier", "Golden Valley", "Granite", "Hill", "Jefferson", "Judith Basin", "Lake", "Lewis and Clark", "Liberty", "Lincoln", "McCone", "Madison", "Meagher", "Mineral", "Missoula", "Musselshell", "Park", "Petroleum", "Phillips", "Pondera", "Powder River", "Powell", "Prairie", "Ravalli", "Richland", "Roosevelt", "Rosebud", "Sanders", "Sheridan", "Silver Bow", "Stillwater", "Sweet Grass", "Teton", "Toole", "Treasure", "Valley", "Wheatland", "Wibaux", "Yellowstone"],
    
    "Nebraska": ["Adams", "Antelope", "Arthur", "Banner", "Blaine", "Boone", "Box Butte", "Boyd", "Brown", "Buffalo", "Burt", "Butler", "Cass", "Cedar", "Chase", "Cherry", "Cheyenne", "Clay", "Colfax", "Cuming", "Custer", "Dakota", "Dawes", "Dawson", "Deuel", "Dixon", "Dodge", "Douglas", "Dundy", "Fillmore", "Franklin", "Frontier", "Furnas", "Gage", "Garden", "Garfield", "Gosper", "Grant", "Greeley", "Hall", "Hamilton", "Harlan", "Hayes", "Hitchcock", "Holt", "Hooker", "Howard", "Jefferson", "Johnson", "Kearney", "Keith", "Keya Paha", "Kimball", "Knox", "Lancaster", "Lincoln", "Logan", "Loup", "McPherson", "Madison", "Merrick", "Morrill", "Nance", "Nemaha", "Nuckolls", "Otoe", "Pawnee", "Perkins", "Phelps", "Pierce", "Platte", "Polk", "Red Willow", "Richardson", "Rock", "Saline", "Sarpy", "Saunders", "Scotts Bluff", "Seward", "Sheridan", "Sherman", "Sioux", "Stanton", "Thayer", "Thomas", "Thurston", "Valley", "Washington", "Wayne", "Webster", "Wheeler", "York"],
    
    "Nevada": ["Carson City", "Churchill", "Clark", "Douglas", "Elko", "Esmeralda", "Eureka", "Humboldt", "Lander", "Lincoln", "Lyon", "Mineral", "Nye", "Pershing", "Storey", "Washoe", "White Pine"],
    
    "New Hampshire": ["Belknap", "Carroll", "Cheshire", "Coos", "Grafton", "Hillsborough", "Merrimack", "Rockingham", "Strafford", "Sullivan"],
    
    "New Jersey": ["Atlantic", "Bergen", "Burlington", "Camden", "Cape May", "Cumberland", "Essex", "Gloucester", "Hudson", "Hunterdon", "Mercer", "Middlesex", "Monmouth", "Morris", "Ocean", "Passaic", "Salem", "Somerset", "Sussex", "Union", "Warren"],
    
    "New Mexico": ["Bernalillo", "Catron", "Chaves", "Cibola", "Colfax", "Curry", "De Baca", "Doña Ana", "Eddy", "Grant", "Guadalupe", "Harding", "Hidalgo", "Lea", "Lincoln", "Los Alamos", "Luna", "McKinley", "Mora", "Otero", "Quay", "Rio Arriba", "Roosevelt", "Sandoval", "San Juan", "San Miguel", "Santa Fe", "Sierra", "Socorro", "Taos", "Torrance", "Union", "Valencia"],
    
    "New York": ["Albany", "Allegany", "Bronx", "Broome", "Cattaraugus", "Cayuga", "Chautauqua", "Chemung", "Chenango", "Clinton", "Columbia", "Cortland", "Delaware", "Dutchess", "Erie", "Essex", "Franklin", "Fulton", "Genesee", "Greene", "Hamilton", "Herkimer", "Jefferson", "Kings", "Lewis", "Livingston", "Madison", "Monroe", "Montgomery", "Nassau", "New York", "Niagara", "Oneida", "Onondaga", "Ontario", "Orange", "Orleans", "Oswego", "Otsego", "Putnam", "Queens", "Rensselaer", "Richmond", "Rockland", "St. Lawrence", "Saratoga", "Schenectady", "Schoharie", "Schuyler", "Seneca", "Steuben", "Suffolk", "Sullivan", "Tioga", "Tompkins", "Ulster", "Warren", "Washington", "Wayne", "Westchester", "Wyoming", "Yates"],
    
    "North Carolina": ["Alamance", "Alexander", "Alleghany", "Anson", "Ashe", "Avery", "Beaufort", "Bertie", "Bladen", "Brunswick", "Buncombe", "Burke", "Cabarrus", "Caldwell", "Camden", "Carteret", "Caswell", "Catawba", "Chatham", "Cherokee", "Chowan", "Clay", "Cleveland", "Columbus", "Craven", "Cumberland", "Currituck", "Dare", "Davidson", "Davie", "Duplin", "Durham", "Edgecombe", "Forsyth", "Franklin", "Gaston", "Gates", "Graham", "Granville", "Greene", "Guilford", "Halifax", "Harnett", "Haywood", "Henderson", "Hertford", "Hoke", "Hyde", "Iredell", "Jackson", "Johnston", "Jones", "Lee", "Lenoir", "Lincoln", "McDowell", "Macon", "Madison", "Martin", "Mecklenburg", "Mitchell", "Montgomery", "Moore", "Nash", "New Hanover", "Northampton", "Onslow", "Orange", "Pamlico", "Pasquotank", "Pender", "Perquimans", "Person", "Pitt", "Polk", "Randolph", "Richmond", "Robeson", "Rockingham", "Rowan", "Rutherford", "Sampson", "Scotland", "Stanly", "Stokes", "Surry", "Swain", "Transylvania", "Tyrrell", "Union", "Vance", "Wake", "Warren", "Washington", "Watauga", "Wayne", "Wilkes", "Wilson", "Yadkin", "Yancey"],
    
    "North Dakota": ["Adams", "Barnes", "Benson", "Billings", "Bottineau", "Bowman", "Burke", "Burleigh", "Cass", "Cavalier", "Dickey", "Divide", "Dunn", "Eddy", "Emmons", "Foster", "Golden Valley", "Grand Forks", "Grant", "Griggs", "Hettinger", "Kidder", "LaMoure", "Logan", "McHenry", "McIntosh", "McKenzie", "McLean", "Mercer", "Morton", "Mountrail", "Nelson", "Oliver", "Pembina", "Pierce", "Ramsey", "Ransom", "Renville", "Richland", "Rolette", "Sargent", "Sheridan", "Sioux", "Slope", "Stark", "Steele", "Stutsman", "Towner", "Traill", "Walsh", "Ward", "Wells", "Williams"],
    
    "Ohio": ["Adams", "Allen", "Ashland", "Ashtabula", "Athens", "Auglaize", "Belmont", "Brown", "Butler", "Carroll", "Champaign", "Clark", "Clermont", "Clinton", "Columbiana", "Coshocton", "Crawford", "Cuyahoga", "Darke", "Defiance", "Delaware", "Erie", "Fairfield", "Fayette", "Franklin", "Fulton", "Gallia", "Geauga", "Greene", "Guernsey", "Hamilton", "Hancock", "Hardin", "Harrison", "Henry", "Highland", "Hocking", "Holmes", "Huron", "Jackson", "Jefferson", "Knox", "Lake", "Lawrence", "Licking", "Logan", "Lorain", "Lucas", "Madison", "Mahoning", "Marion", "Medina", "Meigs", "Mercer", "Miami", "Monroe", "Montgomery", "Morgan", "Morrow", "Muskingum", "Noble", "Ottawa", "Paulding", "Perry", "Pickaway", "Pike", "Portage", "Preble", "Putnam", "Richland", "Ross", "Sandusky", "Scioto", "Seneca", "Shelby", "Stark", "Summit", "Trumbull", "Tuscarawas", "Union", "Van Wert", "Vinton", "Warren", "Washington", "Wayne", "Williams", "Wood", "Wyandot"],
    
    "Oklahoma": ["Adair", "Alfalfa", "Atoka", "Beaver", "Beckham", "Blaine", "Bryan", "Caddo", "Canadian", "Carter", "Cherokee", "Choctaw", "Cimarron", "Cleveland", "Coal", "Comanche", "Cotton", "Craig", "Creek", "Custer", "Delaware", "Dewey", "Ellis", "Garfield", "Garvin", "Grady", "Grant", "Greer", "Harmon", "Harper", "Haskell", "Hughes", "Jackson", "Jefferson", "Johnston", "Kay", "Kingfisher", "Kiowa", "Latimer", "Le Flore", "Lincoln", "Logan", "Love", "McClain", "McCurtain", "McIntosh", "Major", "Marshall", "Mayes", "Murray", "Muskogee", "Noble", "Nowata", "Okfuskee", "Oklahoma", "Okmulgee", "Osage", "Ottawa", "Pawnee", "Payne", "Pittsburg", "Pontotoc", "Pottawatomie", "Pushmataha", "Roger Mills", "Rogers", "Seminole", "Sequoyah", "Stephens", "Texas", "Tillman", "Tulsa", "Wagoner", "Washington", "Washita", "Woods", "Woodward"],
    
    "Oregon": ["Baker", "Benton", "Clackamas", "Clatsop", "Columbia", "Coos", "Crook", "Curry", "Deschutes", "Douglas", "Gilliam", "Grant", "Harney", "Hood River", "Jackson", "Jefferson", "Josephine", "Klamath", "Lake", "Lane", "Lincoln", "Linn", "Malheur", "Marion", "Morrow", "Multnomah", "Polk", "Sherman", "Tillamook", "Umatilla", "Union", "Wallowa", "Wasco", "Washington", "Wheeler", "Yamhill"],
    
    "Pennsylvania": ["Adams", "Allegheny", "Armstrong", "Beaver", "Bedford", "Berks", "Blair", "Bradford", "Bucks", "Butler", "Cambria", "Cameron", "Carbon", "Centre", "Chester", "Clarion", "Clearfield", "Clinton", "Columbia", "Crawford", "Cumberland", "Dauphin", "Delaware", "Elk", "Erie", "Fayette", "Forest", "Franklin", "Fulton", "Greene", "Huntingdon", "Indiana", "Jefferson", "Juniata", "Lackawanna", "Lancaster", "Lawrence", "Lebanon", "Lehigh", "Luzerne", "Lycoming", "McKean", "Mercer", "Mifflin", "Monroe", "Montgomery", "Montour", "Northampton", "Northumberland", "Perry", "Philadelphia", "Pike", "Potter", "Schuylkill", "Snyder", "Somerset", "Sullivan", "Susquehanna", "Tioga", "Union", "Venango", "Warren", "Washington", "Wayne", "Westmoreland", "Wyoming", "York"],
    
    "Rhode Island": ["Bristol", "Kent", "Newport", "Providence", "Washington"],
    
    "South Carolina": ["Abbeville", "Aiken", "Allendale", "Anderson", "Bamberg", "Barnwell", "Beaufort", "Berkeley", "Calhoun", "Charleston", "Cherokee", "Chester", "Chesterfield", "Clarendon", "Colleton", "Darlington", "Dillon", "Dorchester", "Edgefield", "Fairfield", "Florence", "Georgetown", "Greenville", "Greenwood", "Hampton", "Horry", "Jasper", "Kershaw", "Lancaster", "Laurens", "Lee", "Lexington", "McCormick", "Marion", "Marlboro", "Newberry", "Oconee", "Orangeburg", "Pickens", "Richland", "Saluda", "Spartanburg", "Sumter", "Union", "Williamsburg", "York"],
    
    "South Dakota": ["Aurora", "Beadle", "Bennett", "Bon Homme", "Brookings", "Brown", "Brule", "Buffalo", "Butte", "Campbell", "Charles Mix", "Clark", "Clay", "Codington", "Corson", "Custer", "Davison", "Day", "Deuel", "Dewey", "Douglas", "Edmunds", "Fall River", "Faulk", "Grant", "Gregory", "Haakon", "Hamlin", "Hand", "Hanson", "Harding", "Hughes", "Hutchinson", "Hyde", "Jackson", "Jerauld", "Jones", "Kingsbury", "Lake", "Lawrence", "Lincoln", "Lyman", "McCook", "McPherson", "Marshall", "Meade", "Mellette", "Miner", "Minnehaha", "Moody", "Pennington", "Perkins", "Potter", "Roberts", "Sanborn", "Shannon", "Spink", "Stanley", "Sully", "Todd", "Tripp", "Turner", "Union", "Walworth", "Yankton", "Ziebach"],
    
    "Tennessee": ["Anderson", "Bedford", "Benton", "Bledsoe", "Blount", "Bradley", "Campbell", "Cannon", "Carroll", "Carter", "Cheatham", "Chester", "Claiborne", "Clay", "Cocke", "Coffee", "Crockett", "Cumberland", "Davidson", "Decatur", "DeKalb", "Dickson", "Dyer", "Fayette", "Fentress", "Franklin", "Gibson", "Giles", "Grainger", "Greene", "Grundy", "Hamblen", "Hamilton", "Hancock", "Hardeman", "Hardin", "Hawkins", "Haywood", "Henderson", "Henry", "Hickman", "Houston", "Humphreys", "Jackson", "Jefferson", "Johnson", "Knox", "Lake", "Lauderdale", "Lawrence", "Lewis", "Lincoln", "Loudon", "McMinn", "McNairy", "Macon", "Madison", "Marion", "Marshall", "Maury", "Meigs", "Monroe", "Montgomery", "Moore", "Morgan", "Obion", "Overton", "Perry", "Pickett", "Polk", "Putnam", "Rhea", "Roane", "Robertson", "Rutherford", "Scott", "Sequatchie", "Sevier", "Shelby", "Smith", "Stewart", "Sullivan", "Sumner", "Tipton", "Trousdale", "Unicoi", "Union", "Van Buren", "Warren", "Washington", "Wayne", "Weakley", "White", "Williamson", "Wilson"],
    
    "Texas": ["Anderson", "Andrews", "Angelina", "Aransas", "Archer", "Armstrong", "Atascosa", "Austin", "Bailey", "Bandera", "Bastrop", "Baylor", "Bee", "Bell", "Bexar", "Blanco", "Borden", "Bosque", "Bowie", "Brazoria", "Brazos", "Brewster", "Briscoe", "Brooks", "Brown", "Burleson", "Burnet", "Caldwell", "Calhoun", "Callahan", "Cameron", "Camp", "Carson", "Cass", "Castro", "Chambers", "Cherokee", "Childress", "Clay", "Cochran", "Coke", "Coleman", "Collin", "Collingsworth", "Colorado", "Comal", "Comanche", "Concho", "Cooke", "Coryell", "Cottle", "Crane", "Crockett", "Crosby", "Culberson", "Dallam", "Dallas", "Dawson", "Deaf Smith", "Delta", "Denton", "DeWitt", "Dickens", "Dimmit", "Donley", "Duval", "Eastland", "Ector", "Edwards", "Ellis", "El Paso", "Erath", "Falls", "Fannin", "Fayette", "Fisher", "Floyd", "Foard", "Fort Bend", "Franklin", "Freestone", "Frio", "Gaines", "Galveston", "Garza", "Gillespie", "Glasscock", "Goliad", "Gonzales", "Gray", "Grayson", "Gregg", "Grimes", "Guadalupe", "Hale", "Hall", "Hamilton", "Hansford", "Hardeman", "Hardin", "Harris", "Harrison", "Hartley", "Haskell", "Hays", "Hemphill", "Henderson", "Hidalgo", "Hill", "Hockley", "Hood", "Hopkins", "Houston", "Howard", "Hudspeth", "Hunt", "Hutchinson", "Irion", "Jack", "Jackson", "Jasper", "Jeff Davis", "Jefferson", "Jim Hogg", "Jim Wells", "Johnson", "Jones", "Karnes", "Kaufman", "Kendall", "Kenedy", "Kent", "Kerr", "Kimble", "King", "Kinney", "Kleberg", "Knox", "Lamar", "Lamb", "Lampasas", "La Salle", "Lavaca", "Lee", "Leon", "Liberty", "Limestone", "Lipscomb", "Live Oak", "Llano", "Loving", "Lubbock", "Lynn", "McCulloch", "McLennan", "McMullen", "Madison", "Marion", "Martin", "Mason", "Matagorda", "Maverick", "Medina", "Menard", "Midland", "Milam", "Mills", "Mitchell", "Montague", "Montgomery", "Moore", "Morris", "Motley", "Nacogdoches", "Navarro", "Newton", "Nolan", "Nueces", "Ochiltree", "Oldham", "Orange", "Palo Pinto", "Panola", "Parker", "Parmer", "Pecos", "Polk", "Potter", "Presidio", "Rains", "Randall", "Reagan", "Real", "Red River", "Reeves", "Refugio", "Roberts", "Robertson", "Rockwall", "Runnels", "Rusk", "Sabine", "San Augustine", "San Jacinto", "San Patricio", "San Saba", "Schleicher", "Scurry", "Shackelford", "Shelby", "Sherman", "Smith", "Somervell", "Starr", "Stephens", "Sterling", "Stonewall", "Sutton", "Swisher", "Tarrant", "Taylor", "Terrell", "Terry", "Throckmorton", "Titus", "Tom Green", "Travis", "Trinity", "Tyler", "Upshur", "Upton", "Uvalde", "Val Verde", "Van Zandt", "Victoria", "Walker", "Waller", "Ward", "Washington", "Webb", "Wharton", "Wheeler", "Wichita", "Wilbarger", "Willacy", "Williamson", "Wilson", "Winkler", "Wise", "Wood", "Yoakum", "Young", "Zapata", "Zavala"],
    
    "Utah": ["Beaver", "Box Elder", "Cache", "Carbon", "Daggett", "Davis", "Duchesne", "Emery", "Garfield", "Grand", "Iron", "Juab", "Kane", "Millard", "Morgan", "Piute", "Rich", "Salt Lake", "San Juan", "Sanpete", "Sevier", "Summit", "Tooele", "Uintah", "Utah", "Wasatch", "Washington", "Wayne", "Weber"],
    
    "Vermont": ["Addison", "Bennington", "Caledonia", "Chittenden", "Essex", "Franklin", "Grand Isle", "Lamoille", "Orange", "Orleans", "Rutland", "Washington", "Windham", "Windsor"],
    
    "Virginia": ["Accomack", "Albemarle", "Alleghany", "Amelia", "Amherst", "Appomattox", "Arlington", "Augusta", "Bath", "Bedford", "Bland", "Botetourt", "Brunswick", "Buchanan", "Buckingham", "Campbell", "Caroline", "Carroll", "Charles City", "Charlotte", "Chesterfield", "Clarke", "Craig", "Culpeper", "Cumberland", "Dickenson", "Dinwiddie", "Essex", "Fairfax", "Fauquier", "Floyd", "Fluvanna", "Franklin", "Frederick", "Giles", "Gloucester", "Goochland", "Grayson", "Greene", "Greensville", "Halifax", "Hanover", "Henrico", "Henry", "Highland", "Isle of Wight", "James City", "King and Queen", "King George", "King William", "Lancaster", "Lee", "Loudoun", "Louisa", "Lunenburg", "Madison", "Mathews", "Mecklenburg", "Middlesex", "Montgomery", "Nelson", "New Kent", "Northampton", "Northumberland", "Nottoway", "Orange", "Page", "Patrick", "Pittsylvania", "Powhatan", "Prince Edward", "Prince George", "Prince William", "Pulaski", "Rappahannock", "Richmond", "Roanoke", "Rockbridge", "Rockingham", "Russell", "Scott", "Shenandoah", "Smyth", "Southampton", "Spotsylvania", "Stafford", "Surry", "Sussex", "Tazewell", "Warren", "Washington", "Westmoreland", "Wise", "Wythe", "York", "Alexandria City", "Bristol City", "Buena Vista City", "Charlottesville City", "Chesapeake City", "Colonial Heights City", "Covington City", "Danville City", "Emporia City", "Fairfax City", "Falls Church City", "Franklin City", "Fredericksburg City", "Galax City", "Hampton City", "Harrisonburg City", "Hopewell City", "Lexington City", "Lynchburg City", "Manassas City", "Manassas Park City", "Martinsville City", "Newport News City", "Norfolk City", "Norton City", "Petersburg City", "Poquoson City", "Portsmouth City", "Radford City", "Richmond City", "Roanoke City", "Salem City", "Staunton City", "Suffolk City", "Virginia Beach City", "Waynesboro City", "Williamsburg City", "Winchester City"],
    
    "Washington": ["Adams", "Asotin", "Benton", "Chelan", "Clallam", "Clark", "Columbia", "Cowlitz", "Douglas", "Ferry", "Franklin", "Garfield", "Grant", "Grays Harbor", "Island", "Jefferson", "King", "Kitsap", "Kittitas", "Klickitat", "Lewis", "Lincoln", "Mason", "Okanogan", "Pacific", "Pend Oreille", "Pierce", "San Juan", "Skagit", "Skamania", "Snohomish", "Spokane", "Stevens", "Thurston", "Wahkiakum", "Walla Walla", "Whatcom", "Whitman", "Yakima"],
    
    "West Virginia": ["Barbour", "Berkeley", "Boone", "Braxton", "Brooke", "Cabell", "Calhoun", "Clay", "Doddridge", "Fayette", "Gilmer", "Grant", "Greenbrier", "Hampshire", "Hancock", "Hardy", "Harrison", "Jackson", "Jefferson", "Kanawha", "Lewis", "Lincoln", "Logan", "McDowell", "Marion", "Marshall", "Mason", "Mercer", "Mineral", "Mingo", "Monongalia", "Monroe", "Morgan", "Nicholas", "Ohio", "Pendleton", "Pleasants", "Pocahontas", "Preston", "Putnam", "Raleigh", "Randolph", "Ritchie", "Roane", "Summers", "Taylor", "Tucker", "Tyler", "Upshur", "Wayne", "Webster", "Wetzel", "Wirt", "Wood", "Wyoming"],
    
    "Wisconsin": ["Adams", "Ashland", "Barron", "Bayfield", "Brown", "Buffalo", "Burnett", "Calumet", "Chippewa", "Clark", "Columbia", "Crawford", "Dane", "Dodge", "Door", "Douglas", "Dunn", "Eau Claire", "Florence", "Fond du Lac", "Forest", "Grant", "Green", "Green Lake", "Iowa", "Iron", "Jackson", "Jefferson", "Juneau", "Kenosha", "Kewaunee", "La Crosse", "Lafayette", "Langlade", "Lincoln", "Manitowoc", "Marathon", "Marinette", "Marquette", "Menominee", "Milwaukee", "Monroe", "Oconto", "Oneida", "Outagamie", "Ozaukee", "Pepin", "Pierce", "Polk", "Portage", "Price", "Racine", "Richland", "Rock", "Rusk", "St. Croix", "Sauk", "Sawyer", "Shawano", "Sheboygan", "Taylor", "Trempealeau", "Vernon", "Vilas", "Walworth", "Washburn", "Washington", "Waukesha", "Waupaca", "Waushara", "Winnebago", "Wood"],
    
    "Wyoming": ["Albany", "Big Horn", "Campbell", "Carbon", "Converse", "Crook", "Fremont", "Goshen", "Hot Springs", "Johnson", "Laramie", "Lincoln", "Natrona", "Niobrara", "Park", "Platte", "Sheridan", "Sublette", "Sweetwater", "Teton", "Uinta", "Washakie", "Weston"]
}

import json

# Load cities data
with open('assets/data/cities_by_county.json', 'r', encoding='utf-8') as f:
    cities_by_county = json.load(f)

def create_state_page(state_name, counties):
    """Generate HTML page for a single state with COMPLETE county list and pricing"""
    state_url = state_name.lower().replace(" ", "-")
    
    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Credit repair services in {state_name}. We help fix credit in all {len(counties)} counties across {state_name}.">
    <title>Credit Repair in {state_name} - All {len(counties)} Counties | Credit Monkey</title>

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
    <!-- AOS Animation -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="../assets/css/styles.css?v=2026052004">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="../">
                <img src="../assets/images/logo.webp" alt="Credit Monkey" height="45" width="206">
            </a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-lg-center">
                    <li class="nav-item"><a class="nav-link" href="../#how-it-works">How It Works</a></li>
                    <li class="nav-item"><a class="nav-link" href="../how-credit-repair-works">How Credit Repair Works</a></li>
                    <li class="nav-item"><a class="nav-link" href="../states-we-fix-credit-in">States We Fix Credit In</a></li>
                    <li class="nav-item"><a class="nav-link" href="../#reviews">Reviews</a></li>
                    <li class="nav-item"><a class="nav-link" href="../#contact">Contact</a></li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://secureclientaccess.com/" target="_blank" rel="noopener noreferrer">
                            <i class="bi bi-box-arrow-in-right"></i> Login
                        </a>
                    </li>
                    <li class="nav-item ms-lg-2">
                        <button class="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#quickConsultModal">Get Started</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Breadcrumb -->
    <section class="py-6 bg-light" style="margin-top: 76px;">
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="../" class="text-decoration-none">Home</a></li>
                    <li class="breadcrumb-item"><a href="../states-we-fix-credit-in" class="text-decoration-none">All States</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{state_name}</li>
                </ol>
            </nav>
        </div>
    </section>

    <!-- Page Hero -->
    <section class="hero-section">
        <div class="container">
            <div class="row align-items-center g-5">
                <div class="col-lg-8 mx-auto text-center" data-aos="fade-up">
                    <p class="text-uppercase fw-semibold mb-3" style="letter-spacing: 0.08em;">Credit Repair Services</p>
                    <h1 class="display-4 fw-bold mb-4">Fix Your Credit in {state_name}</h1>
                    <p class="lead text-secondary mb-4">Professional credit repair services available in all {len(counties)} counties across {state_name}. Select your county below to view cities served.</p>
                    <div class="d-flex flex-wrap gap-3 justify-content-center">
                        <button class="btn btn-primary btn-lg px-4" data-bs-toggle="modal" data-bs-target="#quickConsultModal">Get Started Now</button>
                        <a href="../states-we-fix-credit-in" class="btn btn-outline-primary btn-lg px-4">
                            <i class="bi bi-arrow-left me-2"></i>Back to All States
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Counties Grid -->
    <section class="py-6 bg-white">
        <div class="container">
            <div class="row mb-5" data-aos="fade-up">
                <div class="col-lg-8 mx-auto text-center">
                    <h2 class="display-5 fw-bold mb-3">All {len(counties)} Counties in {state_name}</h2>
                    <p class="lead text-secondary">We provide credit repair services in every county throughout {state_name}.</p>
                </div>
            </div>
            <div class="state-grid" data-aos="fade-up" data-aos-delay="100">
'''
    
    # Add ALL counties with staggered animations and links
    for idx, county in enumerate(counties):
        delay = (idx % 10) * 10 + 50  # Stagger animations
        county_slug = county.lower().replace(" ", "-") + "-county"
        html_content += f'                <a class="state-chip county-link w-100 text-center text-decoration-none" href="{state_url}/{county_slug}" data-county="{county}" data-state="{state_name}" data-aos="zoom-in" data-aos-delay="{delay}">{county} County</a>\n'
    
    html_content += f'''            </div>
        </div>
    </section>

    <!-- What We Do -->
    <section class="py-6 bg-light">
        <div class="container">
            <div class="row g-5 align-items-center">
                <div class="col-lg-6" data-aos="fade-right">
                    <h3 class="fw-bold mb-3">Common Items We Dispute</h3>
                    <p class="text-secondary mb-3">We review your reports for errors, outdated information, and unverifiable items, including:</p>
                    <ul class="list-unstyled">
                        <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i> Late payments and charge-offs</li>
                        <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i> Collections and public records</li>
                        <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i> Duplicate accounts and balance errors</li>
                        <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i> Hard inquiries you don't recognize</li>
                        <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i> Incorrect personal information</li>
                    </ul>
                    <div class="mt-4" data-aos="fade-up" data-aos-delay="300">
                        <img src="../assets/images/cv-investagation.png" alt="Credit Investigation Process" class="img-fluid rounded shadow-sm credit-investigation-img">
                    </div>
                </div>
                <div class="col-lg-6" data-aos="fade-left" data-aos-delay="100">
                    <h3 class="fw-bold mb-3">Getting Started Is Easy</h3>
                    <div class="row g-3">
                        <div class="col-12" data-aos="flip-up" data-aos-delay="150">
                            <div class="how-step-card">
                                <div class="step-icon"><i class="bi bi-telephone"></i></div>
                                <div class="step-number">Step 1</div>
                                <h5 class="fw-bold mb-2">Free Consultation</h5>
                                <p class="text-secondary">Speak with a credit expert to review your goals.</p>
                            </div>
                        </div>
                        <div class="col-12" data-aos="flip-up" data-aos-delay="250">
                            <div class="how-step-card">
                                <div class="step-icon"><i class="bi bi-pencil-square"></i></div>
                                <div class="step-number">Step 2</div>
                                <h5 class="fw-bold mb-2">Enroll Online</h5>
                                <p class="text-secondary">Sign up in minutes and access your secure dashboard.</p>
                            </div>
                        </div>
                        <div class="col-12" data-aos="flip-up" data-aos-delay="350">
                            <div class="how-step-card">
                                <div class="step-icon"><i class="bi bi-graph-up-arrow"></i></div>
                                <div class="step-number">Step 3</div>
                                <h5 class="fw-bold mb-2">Watch Results</h5>
                                <p class="text-secondary">We dispute items and you track progress in real time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Offers / Pricing -->
    <section id="offers" class="py-6 bg-white">
        <div class="container">
            <div class="row mb-5" data-aos="fade-up">
                <div class="col-lg-8 mx-auto text-center">
                    <h2 class="display-5 fw-bold mb-3">Choose Your Plan for {state_name}</h2>
                    <p class="lead text-secondary">Simple monthly plans with a 90-day money-back guarantee.</p>
                </div>
            </div>
            <div class="row g-4 mb-4">
                <div class="col-lg-4" data-aos="fade-up" data-aos-delay="0">
                    <div class="card pricing-card h-100 border-0 shadow">
                        <div class="card-body p-5">
                            <h4 class="fw-bold mb-2">Plan A</h4>
                            <p class="text-secondary mb-4">Negative Items</p>
                            <div class="mb-4">
                                <span class="display-4 fw-bold">$99</span>
                                <span class="text-secondary">/ month</span>
                            </div>
                            <ul class="list-unstyled mb-4">
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Personalized Credit Repair Plan</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Challenges to 3 Credit Bureaus</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Creditor Intervention Letters</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Score Tracking</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Challenge Hard Inquiries</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Email & Phone Support</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Online Customer Portal</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> 90-Day Money-Back Guarantee</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Cancel Anytime</li>
                            </ul>
                            <a href="https://credit3278.getcredithelpnow.com/billingselection" class="btn btn-outline-primary w-100" target="_blank" rel="noopener noreferrer">Choose Plan A</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                    <div class="card pricing-card featured h-100 border-primary shadow-lg">
                        <div class="ribbon">Most Popular</div>
                        <div class="card-body p-5">
                            <h4 class="fw-bold mb-2">Plan B</h4>
                            <p class="text-secondary mb-4">Negative Items + Inquiries</p>
                            <div class="mb-4">
                                <span class="display-4 fw-bold">$159</span>
                                <span class="text-secondary">/ month</span>
                            </div>
                            <ul class="list-unstyled mb-4">
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Personalized Credit Repair Plan</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Challenges to 3 Credit Bureaus</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Creditor Intervention Letters</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Score Tracking</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Challenge Hard Inquiries</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Email & Phone Support</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Online Customer Portal</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> 90-Day Money-Back Guarantee</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Cancel Anytime</li>
                            </ul>
                            <a href="https://credit3278.getcredithelpnow.com/billingselection" class="btn btn-primary w-100" target="_blank" rel="noopener noreferrer">Choose Plan B</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                    <div class="card pricing-card h-100 border-0 shadow">
                        <div class="card-body p-5">
                            <h4 class="fw-bold mb-2">Plan C</h4>
                            <p class="text-secondary mb-4">Premium Service</p>
                            <div class="mb-4">
                                <span class="display-4 fw-bold">$199</span>
                                <span class="text-secondary">/ month</span>
                            </div>
                            <ul class="list-unstyled mb-4">
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Personalized Credit Repair Plan</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Challenges to 3 Credit Bureaus</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Creditor Intervention Letters</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Score Tracking</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Challenge Hard Inquiries</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Email & Phone Support</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Online Customer Portal</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> 90-Day Money-Back Guarantee</li>
                                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Cancel Anytime</li>
                            </ul>
                            <a href="https://credit3278.getcredithelpnow.com/billingselection" class="btn btn-outline-primary w-100" target="_blank" rel="noopener noreferrer">Choose Plan C</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" data-aos="fade-up">
                <div class="col-12 text-center">
                    <button class="btn btn-primary btn-lg px-5" data-bs-toggle="modal" data-bs-target="#quickConsultModal">Get Started Now</button>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="py-6 bg-light">
        <div class="container">
            <div class="row align-items-center g-4">
                <div class="col-lg-8 mx-auto text-center" data-aos="fade-up">
                    <h2 class="display-5 fw-bold mb-3">Ready to Fix Your Credit in {state_name}?</h2>
                    <p class="lead text-secondary mb-4">Start your consultation today and get a clear plan forward.</p>
                    <button class="btn btn-primary btn-lg px-5" data-bs-toggle="modal" data-bs-target="#quickConsultModal">Get Started Now</button>
                </div>
            </div>
        </div>
    </section>


    <!-- Quick Consultation Modal -->
    <div class="modal fade" id="quickConsultModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text-start">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold">Quick Consultation Request</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4">
                    <form id="quickConsultForm">
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Name *</label>
                            <input type="text" class="form-control" required id="quickName" name="name">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Email *</label>
                            <input type="email" class="form-control" required id="quickEmail" name="email">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Phone *</label>
                            <input type="tel" class="form-control" required id="quickPhone" name="phone">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold">State</label>
                            <input type="text" class="form-control" value="{state_name}" readonly>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Preferred Contact Time</label>
                            <select class="form-select" id="contactTime" name="contactTime">
                                <option value="morning">Morning (9am-12pm)</option>
                                <option value="afternoon">Afternoon (12pm-5pm)</option>
                                <option value="evening">Evening (5pm-8pm)</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Submit Request</button>
                    </form>
                    <div id="quickFormMessage" class="mt-3"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- AOS Animation -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <!-- Custom JS -->
    <script src="../assets/js/script.js?v=2026052004"></script>
</body>
</html>
'''
    return html_content

# Generate all state pages
print("Generating state pages with COMPLETE county lists and pricing...")
for state_name, counties in states_data.items():
    state_url = state_name.lower().replace(" ", "-")
    html_content = create_state_page(state_name, counties)
    
    # Write to file
    filename = f"states/{state_url}.html"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"✓ Generated: {filename} ({len(counties)} counties)")

print(f"\n✅ Successfully generated ALL 51 state pages with complete county lists and pricing!")
print(f"\nTotal counties across all states: {sum(len(counties) for counties in states_data.values())}")

