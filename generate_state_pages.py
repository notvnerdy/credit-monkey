#!/usr/bin/env python3
"""
Generate individual state pages with counties for Credit Monkey website
"""

# Complete data for all 50 states + DC with major counties
states_data = {
    "Alabama": ["Jefferson", "Mobile", "Madison", "Montgomery", "Shelby", "Tuscaloosa", "Baldwin", "Lee", "Calhoun", "Etowah"],
    "Alaska": ["Anchorage", "Fairbanks North Star", "Matanuska-Susitna", "Kenai Peninsula", "Juneau", "Bethel", "Kodiak Island"],
    "Arizona": ["Maricopa", "Pima", "Pinal", "Yavapai", "Mohave", "Coconino", "Yuma", "Navajo", "Apache", "Cochise"],
    "Arkansas": ["Pulaski", "Benton", "Washington", "Sebastian", "Faulkner", "Saline", "Craighead", "Garland", "White", "Lonoke"],
    "California": ["Los Angeles", "San Diego", "Orange", "Riverside", "San Bernardino", "Santa Clara", "Alameda", "Sacramento", "Contra Costa", "Fresno", "Kern", "San Francisco", "Ventura", "San Mateo", "San Joaquin"],
    "Colorado": ["Denver", "El Paso", "Arapahoe", "Jefferson", "Adams", "Larimer", "Douglas", "Boulder", "Weld", "Pueblo"],
    "Connecticut": ["Fairfield", "Hartford", "New Haven", "New London", "Litchfield", "Middlesex", "Tolland", "Windham"],
    "Delaware": ["New Castle", "Sussex", "Kent"],
    "District of Columbia": ["District of Columbia"],
    "Florida": ["Miami-Dade", "Broward", "Palm Beach", "Hillsborough", "Orange", "Pinellas", "Duval", "Lee", "Polk", "Brevard", "Volusia", "Pasco", "Seminole", "Sarasota", "Manatee"],
    "Georgia": ["Fulton", "Gwinnett", "Cobb", "DeKalb", "Clayton", "Cherokee", "Forsyth", "Henry", "Chatham", "Columbia"],
    "Hawaii": ["Honolulu", "Hawaii", "Maui", "Kauai", "Kalawao"],
    "Idaho": ["Ada", "Canyon", "Kootenai", "Bonneville", "Bannock", "Twin Falls", "Nez Perce", "Madison", "Bingham", "Elmore"],
    "Illinois": ["Cook", "DuPage", "Lake", "Will", "Kane", "McHenry", "Winnebago", "Madison", "St. Clair", "Sangamon"],
    "Indiana": ["Marion", "Lake", "Allen", "Hamilton", "St. Joseph", "Elkhart", "Tippecanoe", "Vanderburgh", "Porter", "Madison"],
    "Iowa": ["Polk", "Linn", "Scott", "Johnson", "Black Hawk", "Woodbury", "Dubuque", "Story", "Dallas", "Pottawattamie"],
    "Kansas": ["Johnson", "Sedgwick", "Shawnee", "Wyandotte", "Douglas", "Leavenworth", "Riley", "Reno", "Butler", "Saline"],
    "Kentucky": ["Jefferson", "Fayette", "Kenton", "Boone", "Warren", "Hardin", "Daviess", "Campbell", "Madison", "McCracken"],
    "Louisiana": ["East Baton Rouge", "Jefferson", "Orleans", "St. Tammany", "Lafayette", "Caddo", "Calcasieu", "Ouachita", "Livingston", "Rapides"],
    "Maine": ["Cumberland", "York", "Penobscot", "Kennebec", "Androscoggin", "Aroostook", "Oxford", "Somerset", "Hancock", "Knox"],
    "Maryland": ["Montgomery", "Prince George's", "Baltimore", "Anne Arundel", "Howard", "Harford", "Frederick", "Carroll", "Charles", "Baltimore City"],
    "Massachusetts": ["Middlesex", "Worcester", "Essex", "Suffolk", "Norfolk", "Bristol", "Plymouth", "Hampden", "Barnstable", "Berkshire"],
    "Michigan": ["Wayne", "Oakland", "Macomb", "Kent", "Genesee", "Washtenaw", "Ottawa", "Ingham", "Kalamazoo", "Livingston"],
    "Minnesota": ["Hennepin", "Ramsey", "Dakota", "Anoka", "Washington", "St. Louis", "Olmsted", "Scott", "Wright", "Carver"],
    "Mississippi": ["Hinds", "Harrison", "DeSoto", "Rankin", "Jackson", "Madison", "Lauderdale", "Forrest", "Lee", "Jones"],
    "Missouri": ["St. Louis", "Jackson", "St. Charles", "Greene", "Clay", "Jefferson", "Boone", "Cass", "Franklin", "Buchanan"],
    "Montana": ["Yellowstone", "Missoula", "Gallatin", "Flathead", "Cascade", "Lewis and Clark", "Ravalli", "Silver Bow", "Lake", "Deer Lodge"],
    "Nebraska": ["Douglas", "Lancaster", "Sarpy", "Hall", "Buffalo", "Scotts Bluff", "Madison", "Platte", "Dodge", "Lincoln"],
    "Nevada": ["Clark", "Washoe", "Carson City", "Lyon", "Elko", "Churchill", "Nye", "Douglas", "Humboldt", "White Pine"],
    "New Hampshire": ["Hillsborough", "Rockingham", "Merrimack", "Strafford", "Grafton", "Cheshire", "Belknap", "Carroll", "Sullivan", "Coos"],
    "New Jersey": ["Bergen", "Essex", "Middlesex", "Hudson", "Monmouth", "Ocean", "Union", "Camden", "Passaic", "Morris"],
    "New Mexico": ["Bernalillo", "Doña Ana", "Santa Fe", "Sandoval", "San Juan", "Lea", "Valencia", "Chaves", "Otero", "Eddy"],
    "New York": ["Kings", "Queens", "New York", "Suffolk", "Bronx", "Nassau", "Westchester", "Erie", "Monroe", "Richmond", "Onondaga", "Orange", "Rockland", "Albany", "Dutchess"],
    "North Carolina": ["Mecklenburg", "Wake", "Guilford", "Forsyth", "Cumberland", "Durham", "Buncombe", "Union", "Gaston", "New Hanover"],
    "North Dakota": ["Cass", "Burleigh", "Grand Forks", "Ward", "Williams", "Stark", "Morton", "Stutsman", "Richland", "Barnes"],
    "Ohio": ["Cuyahoga", "Franklin", "Hamilton", "Summit", "Montgomery", "Lucas", "Butler", "Stark", "Lorain", "Warren"],
    "Oklahoma": ["Oklahoma", "Tulsa", "Cleveland", "Canadian", "Comanche", "Rogers", "Wagoner", "Creek", "Payne", "Pottawatomie"],
    "Oregon": ["Multnomah", "Washington", "Clackamas", "Lane", "Marion", "Jackson", "Deschutes", "Linn", "Benton", "Douglas"],
    "Pennsylvania": ["Philadelphia", "Allegheny", "Montgomery", "Bucks", "Delaware", "Chester", "Lancaster", "York", "Berks", "Westmoreland"],
    "Rhode Island": ["Providence", "Kent", "Washington", "Newport", "Bristol"],
    "South Carolina": ["Greenville", "Richland", "Charleston", "Horry", "Spartanburg", "Lexington", "York", "Anderson", "Beaufort", "Berkeley"],
    "South Dakota": ["Minnehaha", "Pennington", "Lincoln", "Brown", "Brookings", "Codington", "Davison", "Lawrence", "Meade", "Yankton"],
    "Tennessee": ["Shelby", "Davidson", "Knox", "Hamilton", "Rutherford", "Williamson", "Sumner", "Montgomery", "Wilson", "Blount"],
    "Texas": ["Harris", "Dallas", "Tarrant", "Bexar", "Travis", "Collin", "Denton", "El Paso", "Fort Bend", "Hidalgo", "Montgomery", "Williamson", "Cameron", "Nueces", "Brazoria"],
    "Utah": ["Salt Lake", "Utah", "Davis", "Weber", "Washington", "Cache", "Tooele", "Summit", "Iron", "Box Elder"],
    "Vermont": ["Chittenden", "Rutland", "Washington", "Windsor", "Franklin", "Bennington", "Orange", "Addison", "Windham", "Lamoille"],
    "Virginia": ["Fairfax", "Virginia Beach City", "Prince William", "Loudoun", "Chesterfield", "Henrico", "Norfolk City", "Richmond City", "Chesapeake City", "Arlington"],
    "Washington": ["King", "Pierce", "Snohomish", "Spokane", "Clark", "Thurston", "Kitsap", "Yakima", "Whatcom", "Benton"],
    "West Virginia": ["Kanawha", "Berkeley", "Cabell", "Wood", "Monongalia", "Raleigh", "Harrison", "Putnam", "Marion", "Mercer"],
    "Wisconsin": ["Milwaukee", "Dane", "Waukesha", "Brown", "Racine", "Outagamie", "Winnebago", "Kenosha", "Rock", "Marathon"],
    "Wyoming": ["Laramie", "Natrona", "Campbell", "Sweetwater", "Fremont", "Albany", "Sheridan", "Park", "Uinta", "Carbon"]
}

def create_state_page(state_name, counties):
    """Generate HTML page for a single state"""
    state_url = state_name.lower().replace(" ", "-")
    
    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Credit repair services in {state_name}. We help fix credit in all counties across {state_name}.">
    <title>Credit Repair in {state_name} - All Counties | Credit Monkey</title>

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
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="../index.html">
                <img src="../assets/images/logo.png" alt="Credit Monkey" height="45">
            </a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-lg-center">
                    <li class="nav-item"><a class="nav-link" href="../index.html#how-it-works">How It Works</a></li>
                    <li class="nav-item"><a class="nav-link" href="../how-credit-repair-works.html">How Credit Repair Works</a></li>
                    <li class="nav-item"><a class="nav-link" href="../states-we-fix-credit-in.html">States We Fix Credit In</a></li>
                    <li class="nav-item"><a class="nav-link" href="../index.html#reviews">Reviews</a></li>
                    <li class="nav-item"><a class="nav-link" href="../index.html#contact">Contact</a></li>
                    <li class="nav-item">
                        <a class="nav-link" href="http://secureclientaccess.com/" target="_blank">
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
                    <li class="breadcrumb-item"><a href="../index.html" class="text-decoration-none">Home</a></li>
                    <li class="breadcrumb-item"><a href="../states-we-fix-credit-in.html" class="text-decoration-none">All States</a></li>
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
                    <p class="lead text-muted mb-4">Professional credit repair services available in all {len(counties)} counties across {state_name}. Select your county below to get started.</p>
                    <div class="d-flex flex-wrap gap-3 justify-content-center">
                        <button class="btn btn-primary btn-lg px-4" data-bs-toggle="modal" data-bs-target="#quickConsultModal">Get Started Now</button>
                        <a href="../states-we-fix-credit-in.html" class="btn btn-outline-primary btn-lg px-4">
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
                    <h2 class="display-5 fw-bold mb-3">Counties in {state_name}</h2>
                    <p class="lead text-muted">We provide credit repair services in all counties throughout {state_name}.</p>
                </div>
            </div>
            <div class="state-grid" data-aos="fade-up" data-aos-delay="100">
'''
    
    # Add counties with staggered animations
    for idx, county in enumerate(counties):
        delay = (idx % 10) * 10 + 50  # Stagger animations
        html_content += f'                <div class="state-chip" data-aos="zoom-in" data-aos-delay="{delay}">{county} County</div>\n'
    
    html_content += '''            </div>
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
                        <img src="../assets/images/cv-investagation.png" alt="Credit Investigation Process" class="img-fluid rounded shadow-sm" style="max-width: 90%;">
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

    <!-- CTA -->
    <section class="py-6 bg-white">
        <div class="container">
            <div class="row align-items-center g-4">
                <div class="col-lg-8 mx-auto text-center" data-aos="fade-up">
                    <h2 class="display-5 fw-bold mb-3">Ready to Fix Your Credit in '''
    
    html_content += f'''{state_name}?</h2>
                    <p class="lead text-secondary mb-4">Start your consultation today and get a clear plan forward.</p>
                    <button class="btn btn-primary btn-lg px-5" data-bs-toggle="modal" data-bs-target="#quickConsultModal">Get Started Now</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-light py-5 border-top">
        <div class="container">
            <div class="row g-4">
                <div class="col-lg-4">
                    <h5 class="fw-bold mb-3">About Credit Monkey</h5>
                    <p class="text-secondary">Professional credit repair service helping individuals across all 50 states improve their credit health through accurate reporting, expert guidance, and transparent processes.</p>
                    <h6 class="fw-bold mb-3 mt-4">Newsletter Signup</h6>
                    <form id="newsletterForm" class="mb-3">
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Enter your email" required id="newsletterEmail">
                            <button class="btn btn-primary" type="submit">Subscribe</button>
                        </div>
                        <small class="text-secondary d-block mt-2">Get credit tips & exclusive offers</small>
                    </form>
                </div>
                <div class="col-lg-2">
                    <h6 class="fw-bold mb-3">Services</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="../index.html#how-it-works" class="text-dark text-decoration-none">How It Works</a></li>
                        <li class="mb-2"><a href="../index.html#services" class="text-dark text-decoration-none">Services</a></li>
                        <li class="mb-2"><a href="../index.html#pricing" class="text-dark text-decoration-none">Pricing</a></li>
                        <li class="mb-2"><a href="../how-credit-repair-works.html" class="text-dark text-decoration-none">How Credit Repair Works</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h6 class="fw-bold mb-3">Company</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="../index.html#reviews" class="text-dark text-decoration-none">Reviews</a></li>
                        <li class="mb-2"><a href="../index.html#faq" class="text-dark text-decoration-none">FAQ</a></li>
                        <li class="mb-2"><a href="../index.html#contact" class="text-dark text-decoration-none">Contact</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h6 class="fw-bold mb-3">Legal</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="#" class="text-dark text-decoration-none">Privacy Policy</a></li>
                        <li class="mb-2"><a href="#" class="text-dark text-decoration-none">Terms of Service</a></li>
                        <li class="mb-2"><a href="#" class="text-dark text-decoration-none">Disclosures</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h6 class="fw-bold mb-3">Support</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="http://secureclientaccess.com/" class="text-dark text-decoration-none" target="_blank">Client Login</a></li>
                        <li class="mb-2"><a href="../index.html#contact" class="text-dark text-decoration-none">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <hr class="my-4 border-secondary opacity-25">
            <div class="row">
                <div class="col-12 text-center text-muted small">
                    <p class="mb-2">© 2026 Credit Monkey, Inc. All rights reserved.</p>
                    <p class="mb-0">FICO® is a registered trademark of Fair Isaac Corporation. Individual results may vary.</p>
                </div>
            </div>
        </div>
    </footer>

    <!-- Quick Consultation Modal -->
    <div class="modal fade" id="quickConsultModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
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
    <script src="../assets/js/script.js"></script>
</body>
</html>
'''
    return html_content

# Generate all state pages
for state_name, counties in states_data.items():
    state_url = state_name.lower().replace(" ", "-")
    html_content = create_state_page(state_name, counties)
    
    # Write to file
    filename = f"states/{state_url}.html"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"✓ Generated: {filename}")

print(f"\n✅ Successfully generated {len(states_data)} state pages!")
