#!/usr/bin/env python3
"""
Batch update all state pages with SEO improvements
Updates 49 state HTML files with enhanced meta tags, structured data, and accessibility features
"""

import os
import re
from pathlib import Path

# State data with county counts and major cities
STATES_DATA = {
    'alabama': {'counties': 67, 'cities': 'Birmingham, Montgomery, Mobile, Huntsville'},
    'alaska': {'counties': 30, 'cities': 'Anchorage, Juneau, Fairbanks', 'unit': 'boroughs'},
    'arizona': {'counties': 15, 'cities': 'Phoenix, Tucson, Mesa, Scottsdale'},
    'arkansas': {'counties': 75, 'cities': 'Little Rock, Fort Smith, Fayetteville'},
    'colorado': {'counties': 64, 'cities': 'Denver, Colorado Springs, Aurora'},
    'connecticut': {'counties': 8, 'cities': 'Hartford, New Haven, Bridgeport'},
    'delaware': {'counties': 3, 'cities': 'Wilmington, Dover, Newark'},
    'district-of-columbia': {'counties': 1, 'cities': 'Washington DC', 'unit': 'district'},
    'florida': {'counties': 67, 'cities': 'Miami, Tampa, Orlando, Jacksonville'},
    'georgia': {'counties': 159, 'cities': 'Atlanta, Columbus, Augusta, Savannah'},
    'hawaii': {'counties': 5, 'cities': 'Honolulu, Pearl City, Hilo'},
    'idaho': {'counties': 44, 'cities': 'Boise, Meridian, Nampa'},
    'illinois': {'counties': 102, 'cities': 'Chicago, Aurora, Naperville'},
    'indiana': {'counties': 92, 'cities': 'Indianapolis, Fort Wayne, Evansville'},
    'iowa': {'counties': 99, 'cities': 'Des Moines, Cedar Rapids, Davenport'},
    'kansas': {'counties': 105, 'cities': 'Wichita, Overland Park, Kansas City'},
    'kentucky': {'counties': 120, 'cities': 'Louisville, Lexington, Bowling Green'},
    'louisiana': {'counties': 64, 'cities': 'New Orleans, Baton Rouge, Shreveport', 'unit': 'parishes'},
    'maine': {'counties': 16, 'cities': 'Portland, Lewiston, Bangor'},
    'maryland': {'counties': 24, 'cities': 'Baltimore, Columbia, Germantown'},
    'massachusetts': {'counties': 14, 'cities': 'Boston, Worcester, Springfield'},
    'michigan': {'counties': 83, 'cities': 'Detroit, Grand Rapids, Warren'},
    'minnesota': {'counties': 87, 'cities': 'Minneapolis, St. Paul, Rochester'},
    'mississippi': {'counties': 82, 'cities': 'Jackson, Gulfport, Southaven'},
    'missouri': {'counties': 115, 'cities': 'Kansas City, St. Louis, Springfield'},
    'montana': {'counties': 56, 'cities': 'Billings, Missoula, Great Falls'},
    'nebraska': {'counties': 93, 'cities': 'Omaha, Lincoln, Bellevue'},
    'nevada': {'counties': 17, 'cities': 'Las Vegas, Henderson, Reno'},
    'new-hampshire': {'counties': 10, 'cities': 'Manchester, Nashua, Concord'},
    'new-jersey': {'counties': 21, 'cities': 'Newark, Jersey City, Paterson'},
    'new-mexico': {'counties': 33, 'cities': 'Albuquerque, Las Cruces, Rio Rancho'},
    'new-york': {'counties': 62, 'cities': 'New York City, Buffalo, Rochester'},
    'north-carolina': {'counties': 100, 'cities': 'Charlotte, Raleigh, Greensboro'},
    'north-dakota': {'counties': 53, 'cities': 'Fargo, Bismarck, Grand Forks'},
    'ohio': {'counties': 88, 'cities': 'Columbus, Cleveland, Cincinnati'},
    'oklahoma': {'counties': 77, 'cities': 'Oklahoma City, Tulsa, Norman'},
    'oregon': {'counties': 36, 'cities': 'Portland, Salem, Eugene'},
    'pennsylvania': {'counties': 67, 'cities': 'Philadelphia, Pittsburgh, Allentown'},
    'rhode-island': {'counties': 5, 'cities': 'Providence, Warwick, Cranston'},
    'south-carolina': {'counties': 46, 'cities': 'Charleston, Columbia, Greenville'},
    'south-dakota': {'counties': 66, 'cities': 'Sioux Falls, Rapid City, Aberdeen'},
    'tennessee': {'counties': 95, 'cities': 'Nashville, Memphis, Knoxville'},
    'texas': {'counties': 254, 'cities': 'Houston, Dallas, Austin, San Antonio'},
    'utah': {'counties': 29, 'cities': 'Salt Lake City, West Valley City, Provo'},
    'vermont': {'counties': 14, 'cities': 'Burlington, South Burlington, Rutland'},
    'virginia': {'counties': 133, 'cities': 'Virginia Beach, Norfolk, Richmond'},
    'washington': {'counties': 39, 'cities': 'Seattle, Spokane, Tacoma'},
    'west-virginia': {'counties': 55, 'cities': 'Charleston, Huntington, Morgantown'},
    'wisconsin': {'counties': 72, 'cities': 'Milwaukee, Madison, Green Bay'},
    'wyoming': {'counties': 23, 'cities': 'Cheyenne, Casper, Laramie'}
}

def get_state_display_name(slug):
    """Convert state slug to display name"""
    name_map = {
        'district-of-columbia': 'District of Columbia'
    }
    if slug in name_map:
        return name_map[slug]
    return slug.replace('-', ' ').title()

def generate_head_section(state_slug, state_data):
    """Generate updated <head> section for state page"""
    state_name = get_state_display_name(state_slug)
    counties = state_data['counties']
    cities = state_data['cities']
    unit = state_data.get('unit', 'counties')
    
    head_template = f'''<head>
    <meta charset="UTF-8">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Professional credit repair services in {state_name}. Available in all {counties} {unit} including {cities}. Licensed, compliant, $99/month.">
    <title>Credit Repair in {state_name} - All {counties} {unit.title()} | Credit Monkey</title>
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://creditmonkey.com/states/{state_slug}">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Credit Repair Services in {state_name}">
    <meta property="og:description" content="Professional credit repair in all {counties} {state_name} {unit}. Fix your credit with expert help.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://creditmonkey.com/states/{state_slug}">
    <meta property="og:image" content="https://creditmonkey.com/assets/images/cv-investagation.png">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Credit Repair Services in {state_name}">
    <meta name="twitter:description" content="Professional credit repair in all {counties} {state_name} {unit}.">
    
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
    {{
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Credit Monkey - {state_name}",
      "description": "Professional credit repair services available in all {counties} {unit} across {state_name}",
      "url": "https://creditmonkey.com/states/{state_slug}",
      "areaServed": {{
        "@type": "State",
        "name": "{state_name}"
      }},
      "provider": {{
        "@type": "FinancialService",
        "name": "Credit Monkey"
      }}
    }}
    </script>
    <!-- Ahrefs Analytics -->
    <script src="https://analytics.ahrefs.com/analytics.js" data-key="JFNXT4H7oGFXERk+25AXyw" async></script>
</head>'''
    return head_template

def update_state_file(state_slug):
    """Update a single state HTML file"""
    file_path = Path(f'states/{state_slug}.html')
    
    if not file_path.exists():
        print(f"⚠️  File not found: {file_path}")
        return False
    
    state_data = STATES_DATA.get(state_slug)
    if not state_data:
        print(f"⚠️  No data for state: {state_slug}")
        return False
    
    try:
        # Read current file
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace <head> section
        new_head = generate_head_section(state_slug, state_data)
        
        # Pattern to match entire <head> section
        head_pattern = r'<head>.*?    <!-- Ahrefs Analytics -->
    <script src="https://analytics.ahrefs.com/analytics.js" data-key="JFNXT4H7oGFXERk+25AXyw" async></script>
</head>'
        
        if not re.search(head_pattern, content, re.DOTALL):
            print(f"⚠️  Could not find <head> section in {file_path}")
            return False
        
        # Replace head section
        updated_content = re.sub(head_pattern, new_head, content, flags=re.DOTALL)
        
        # Add skip-to-content link if not present
        if 'skip-link' not in updated_content:
            body_pattern = r'(    <!-- Ahrefs Analytics -->
    <script src="https://analytics.ahrefs.com/analytics.js" data-key="JFNXT4H7oGFXERk+25AXyw" async></script>
</head>\s*<body>)'
            skip_link = r'    <!-- Ahrefs Analytics -->
    <script src="https://analytics.ahrefs.com/analytics.js" data-key="JFNXT4H7oGFXERk+25AXyw" async></script>
</head>\n<body>\n    <!-- Skip to Content Link for Accessibility -->\n    <a href="#main-content" class="skip-link visually-hidden-focusable">Skip to main content</a>\n    '
            updated_content = re.sub(body_pattern, skip_link, updated_content)
        
        # Update navbar accessibility if needed
        if 'aria-label="Main navigation"' not in updated_content:
            updated_content = updated_content.replace(
                '<nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">',
                '<nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm" role="navigation" aria-label="Main navigation">'
            )
        
        # Update navbar brand
        updated_content = updated_content.replace(
            '<a class="navbar-brand" href="../">',
            '<a class="navbar-brand" href="../" aria-label="Credit Monkey Home">'
        )
        
        # Update navbar toggle
        updated_content = updated_content.replace(
            '<button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">',
            '<button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation menu">'
        )
        
        # Update logo alt text
        updated_content = updated_content.replace(
            'alt="Credit Monkey"',
            'alt="Credit Monkey Logo"'
        )
        
        # Add id="main-content" to first section after breadcrumb if not present
        if 'id="main-content"' not in updated_content:
            # Find first section after breadcrumb
            section_pattern = r'(</section>\s*<!-- Page Hero -->\s*<section class="hero-section")'
            updated_content = re.sub(
                section_pattern,
                r'\1 id="main-content"',
                updated_content
            )
            # If pattern not found, try simpler pattern
            if 'id="main-content"' not in updated_content:
                updated_content = updated_content.replace(
                    '<!-- Page Hero -->\n    <section class="hero-section">',
                    '<!-- Page Hero -->\n    <section class="hero-section" id="main-content">'
                )
        
        # Update CSS version
        updated_content = updated_content.replace(
            'styles.css?v=202602021943',
            'styles.css?v=202602030001'
        )
        
        # Write updated content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"✅ Updated: {state_slug}.html")
        return True
        
    except Exception as e:
        print(f"❌ Error updating {state_slug}.html: {e}")
        return False

def main():
    """Main function to update all state pages"""
    print("=" * 60)
    print("Credit Monkey - State Pages Batch Update")
    print("=" * 60)
    print()
    
    # Change to script directory
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    total = len(STATES_DATA)
    success = 0
    failed = 0
    
    print(f"Updating {total} state pages...\n")
    
    for state_slug in sorted(STATES_DATA.keys()):
        if state_slug == 'california':  # Skip California as it's already updated
            print(f"⏭️  Skipped: {state_slug}.html (already updated)")
            success += 1
            continue
            
        if update_state_file(state_slug):
            success += 1
        else:
            failed += 1
    
    print()
    print("=" * 60)
    print(f"Update Complete!")
    print(f"✅ Success: {success}/{total}")
    if failed > 0:
        print(f"❌ Failed: {failed}/{total}")
    print("=" * 60)
    print()
    print("Next steps:")
    print("1. Test a few state pages in your browser")
    print("2. Validate structured data with Google Rich Results Test")
    print("3. Check accessibility with browser dev tools")
    print("4. Deploy to production")

if __name__ == '__main__':
    main()
