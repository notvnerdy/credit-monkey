# State Pages Bulk Update Guide

This guide helps you apply the SEO and accessibility improvements to all 49 remaining state pages (Alabama through Wyoming, excluding California which is already updated).

## What Needs to Be Updated

Each state page needs:
1. Enhanced meta tags and descriptions
2. Canonical URLs
3. Open Graph tags
4. Twitter Card tags
5. Resource hints (preconnect, dns-prefetch)
6. SRI hashes on Bootstrap and Icons
7. JSON-LD structured data
8. Skip-to-content link
9. Improved ARIA labels
10. Better image alt text

## Template Pattern (Use California as Reference)

### Step 1: Update the `<head>` section

Replace the existing `<head>` section in each state HTML file with this pattern:

```html
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Professional credit repair services in [STATE_NAME]. Available in all [COUNTY_COUNT] counties including [MAJOR_CITIES]. Licensed, compliant, $99/month.">
    <title>Credit Repair in [STATE_NAME] - All [COUNTY_COUNT] Counties | Credit Monkey</title>
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://creditmonkey.com/states/[state-slug]">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Credit Repair Services in [STATE_NAME]">
    <meta property="og:description" content="Professional credit repair in all [COUNTY_COUNT] [STATE_NAME] counties. Fix your credit with expert help.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://creditmonkey.com/states/[state-slug]">
    <meta property="og:image" content="https://creditmonkey.com/assets/images/cv-investagation.png">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Credit Repair Services in [STATE_NAME]">
    <meta name="twitter:description" content="Professional credit repair in all [COUNTY_COUNT] [STATE_NAME] counties.">
    
    <!-- Resource Hints -->
    <link rel="preconnect" href="https://cdn.jsdelivr.net">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://unpkg.com">

    <!-- Bootstrap 5 CSS with SRI -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" integrity="sha384-XGjxtQfXaH2tnPFa9x+ruJTuLE3Aa6LhHSWRr1XeTyhezb4abCG4ccI5AkVDxqC+" crossorigin="anonymous">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
    <!-- AOS Animation -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="../assets/css/styles.css?v=202602030001">
    
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Credit Monkey - [STATE_NAME]",
      "description": "Professional credit repair services available in all [COUNTY_COUNT] counties across [STATE_NAME]",
      "url": "https://creditmonkey.com/states/[state-slug]",
      "areaServed": {
        "@type": "State",
        "name": "[STATE_NAME]"
      },
      "provider": {
        "@type": "FinancialService",
        "name": "Credit Monkey"
      }
    }
    </script>
</head>
```

### Step 2: Update the `<body>` opening

Add skip-to-content link and improve navbar accessibility:

```html
</head>
<body>
    <!-- Skip to Content Link for Accessibility -->
    <a href="#main-content" class="skip-link visually-hidden-focusable">Skip to main content</a>
    
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm" role="navigation" aria-label="Main navigation">
        <div class="container">
            <a class="navbar-brand" href="../" aria-label="Credit Monkey Home">
                <img src="../assets/images/logo.png" alt="Credit Monkey Logo" height="45" width="auto">
            </a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation menu">
                <span class="navbar-toggler-icon"></span>
            </button>
```

### Step 3: Add id="main-content" to first content section

Find the first main section after the breadcrumb and add `id="main-content"`:

```html
    <!-- Page Hero -->
    <section class="hero-section" id="main-content">
```

## State-Specific Data

Use this reference for accurate county counts and major cities:

### Alabama
- Counties: 67
- Major Cities: Birmingham, Montgomery, Mobile, Huntsville

### Alaska  
- Boroughs: 30
- Major Cities: Anchorage, Juneau, Fairbanks

### Arizona
- Counties: 15
- Major Cities: Phoenix, Tucson, Mesa, Scottsdale

### Arkansas
- Counties: 75
- Major Cities: Little Rock, Fort Smith, Fayetteville

### Colorado
- Counties: 64
- Major Cities: Denver, Colorado Springs, Aurora

### Connecticut
- Counties: 8
- Major Cities: Hartford, New Haven, Bridgeport

### Delaware
- Counties: 3
- Major Cities: Wilmington, Dover, Newark

### Florida
- Counties: 67
- Major Cities: Miami, Tampa, Orlando, Jacksonville

### Georgia
- Counties: 159
- Major Cities: Atlanta, Columbus, Augusta, Savannah

### Hawaii
- Counties: 5
- Major Cities: Honolulu, Pearl City, Hilo

### Idaho
- Counties: 44
- Major Cities: Boise, Meridian, Nampa

### Illinois
- Counties: 102
- Major Cities: Chicago, Aurora, Naperville

### Indiana
- Counties: 92
- Major Cities: Indianapolis, Fort Wayne, Evansville

### Iowa
- Counties: 99
- Major Cities: Des Moines, Cedar Rapids, Davenport

### Kansas
- Counties: 105
- Major Cities: Wichita, Overland Park, Kansas City

### Kentucky
- Counties: 120
- Major Cities: Louisville, Lexington, Bowling Green

### Louisiana
- Parishes: 64
- Major Cities: New Orleans, Baton Rouge, Shreveport

### Maine
- Counties: 16
- Major Cities: Portland, Lewiston, Bangor

### Maryland
- Counties: 24
- Major Cities: Baltimore, Columbia, Germantown

### Massachusetts
- Counties: 14
- Major Cities: Boston, Worcester, Springfield

### Michigan
- Counties: 83
- Major Cities: Detroit, Grand Rapids, Warren

### Minnesota
- Counties: 87
- Major Cities: Minneapolis, St. Paul, Rochester

### Mississippi
- Counties: 82
- Major Cities: Jackson, Gulfport, Southaven

### Missouri
- Counties: 115
- Major Cities: Kansas City, St. Louis, Springfield

### Montana
- Counties: 56
- Major Cities: Billings, Missoula, Great Falls

### Nebraska
- Counties: 93
- Major Cities: Omaha, Lincoln, Bellevue

### Nevada
- Counties: 17
- Major Cities: Las Vegas, Henderson, Reno

### New Hampshire
- Counties: 10
- Major Cities: Manchester, Nashua, Concord

### New Jersey
- Counties: 21
- Major Cities: Newark, Jersey City, Paterson

### New Mexico
- Counties: 33
- Major Cities: Albuquerque, Las Cruces, Rio Rancho

### New York
- Counties: 62
- Major Cities: New York City, Buffalo, Rochester

### North Carolina
- Counties: 100
- Major Cities: Charlotte, Raleigh, Greensboro

### North Dakota
- Counties: 53
- Major Cities: Fargo, Bismarck, Grand Forks

### Ohio
- Counties: 88
- Major Cities: Columbus, Cleveland, Cincinnati

### Oklahoma
- Counties: 77
- Major Cities: Oklahoma City, Tulsa, Norman

### Oregon
- Counties: 36
- Major Cities: Portland, Salem, Eugene

### Pennsylvania
- Counties: 67
- Major Cities: Philadelphia, Pittsburgh, Allentown

### Rhode Island
- Counties: 5
- Major Cities: Providence, Warwick, Cranston

### South Carolina
- Counties: 46
- Major Cities: Charleston, Columbia, Greenville

### South Dakota
- Counties: 66
- Major Cities: Sioux Falls, Rapid City, Aberdeen

### Tennessee
- Counties: 95
- Major Cities: Nashville, Memphis, Knoxville

### Texas
- Counties: 254
- Major Cities: Houston, Dallas, Austin, San Antonio

### Utah
- Counties: 29
- Major Cities: Salt Lake City, West Valley City, Provo

### Vermont
- Counties: 14
- Major Cities: Burlington, South Burlington, Rutland

### Virginia
- Counties: 133
- Major Cities: Virginia Beach, Norfolk, Richmond

### Washington
- Counties: 39
- Major Cities: Seattle, Spokane, Tacoma

### West Virginia
- Counties: 55
- Major Cities: Charleston, Huntington, Morgantown

### Wisconsin
- Counties: 72
- Major Cities: Milwaukee, Madison, Green Bay

### Wyoming
- Counties: 23
- Major Cities: Cheyenne, Casper, Laramie

## Automation Script (Optional)

If you want to automate this process, you can create a Python script to batch update all files. Here's a starter:

```python
import os
import re

states = {
    'alabama': {'counties': 67, 'cities': 'Birmingham, Montgomery, Mobile'},
    'alaska': {'counties': 30, 'cities': 'Anchorage, Juneau, Fairbanks'},
    # ... add all states
}

def update_state_file(state_slug, data):
    file_path = f'states/{state_slug}.html'
    # Read, replace, write logic here
    pass

for state_slug, data in states.items():
    update_state_file(state_slug, data)
```

## Quality Checklist

After updating each state page, verify:
- [ ] Canonical URL is correct
- [ ] State name is properly capitalized throughout
- [ ] County/Parish count is accurate
- [ ] Major cities are relevant
- [ ] Skip link works (test with Tab key)
- [ ] Structured data validates (Google Rich Results Test)
- [ ] Image lazy loading is applied
- [ ] All links work correctly
- [ ] Breadcrumb navigation is correct

## Testing

Test one state page thoroughly before bulk updating:
1. Run Lighthouse audit
2. Test with screen reader
3. Validate structured data
4. Check mobile responsiveness
5. Verify all links
6. Test skip-to-content link

Once satisfied, proceed with remaining states.
