#!/usr/bin/env python3
"""Update navigation menu across all HTML files"""
import re
import glob

# New navigation HTML with phone number and improved design
new_nav_items = '''                    <li class="nav-item"><a class="nav-link" href="#how-it-works">How It Works</a></li>
                    <li class="nav-item"><a class="nav-link" href="how-credit-repair-works.html">How Credit Repair Works</a></li>
                    <li class="nav-item"><a class="nav-link" href="states-we-fix-credit-in.html">States We Fix Credit In</a></li>
                    <li class="nav-item">
                        <a class="nav-link" href="http://secureclientaccess.com/" target="_blank">
                            <i class="bi bi-box-arrow-in-right"></i> Login
                        </a>
                    </li>
                    <li class="nav-item ms-lg-3">
                        <a href="tel:8001231234" class="nav-link text-primary fw-bold d-flex align-items-center">
                            <i class="bi bi-telephone-fill me-2"></i>
                            <span>Call NOW! <span class="d-none d-lg-inline">800-123-1234</span></span>
                        </a>
                    </li>
                    <li class="nav-item ms-lg-2">
                        <button class="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#quickConsultModal">Get Started</button>
                    </li>'''

# For state pages (with relative paths)
new_nav_items_states = '''                    <li class="nav-item"><a class="nav-link" href="../index.html#how-it-works">How It Works</a></li>
                    <li class="nav-item"><a class="nav-link" href="../how-credit-repair-works.html">How Credit Repair Works</a></li>
                    <li class="nav-item"><a class="nav-link" href="../states-we-fix-credit-in.html">States We Fix Credit In</a></li>
                    <li class="nav-item">
                        <a class="nav-link" href="http://secureclientaccess.com/" target="_blank">
                            <i class="bi bi-box-arrow-in-right"></i> Login
                        </a>
                    </li>
                    <li class="nav-item ms-lg-3">
                        <a href="tel:8001231234" class="nav-link text-primary fw-bold d-flex align-items-center">
                            <i class="bi bi-telephone-fill me-2"></i>
                            <span>Call NOW! <span class="d-none d-lg-inline">800-123-1234</span></span>
                        </a>
                    </li>
                    <li class="nav-item ms-lg-2">
                        <button class="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#quickConsultModal">Get Started</button>
                    </li>'''

# Pattern to match the nav items section (from first nav-item to last /li before /ul)
pattern = re.compile(
    r'(<ul class="navbar-nav ms-auto align-items-lg-center">)\s*'
    r'<li class="nav-item">.*?</li>\s*'
    r'(<li class="nav-item">.*?</li>\s*)*'
    r'(</ul>)',
    re.DOTALL
)

# Update main HTML files
main_files = ['index.html', 'how-credit-repair-works.html', 'states-we-fix-credit-in.html']
for file in main_files:
    try:
        with open(file, 'r') as f:
            content = f.read()
        
        # Replace the navigation items
        new_content = re.sub(
            r'<ul class="navbar-nav ms-auto align-items-lg-center">.*?</ul>',
            f'<ul class="navbar-nav ms-auto align-items-lg-center">\n{new_nav_items}\n                </ul>',
            content,
            flags=re.DOTALL
        )
        
        with open(file, 'w') as f:
            f.write(new_content)
        
        print(f"✓ Updated: {file}")
    except Exception as e:
        print(f"✗ Error updating {file}: {e}")

# Update all state pages
state_files = glob.glob('states/*.html')
for file in state_files:
    try:
        with open(file, 'r') as f:
            content = f.read()
        
        # Replace the navigation items
        new_content = re.sub(
            r'<ul class="navbar-nav ms-auto align-items-lg-center">.*?</ul>',
            f'<ul class="navbar-nav ms-auto align-items-lg-center">\n{new_nav_items_states}\n                </ul>',
            content,
            flags=re.DOTALL
        )
        
        with open(file, 'w') as f:
            f.write(new_content)
        
        print(f"✓ Updated: {file}")
    except Exception as e:
        print(f"✗ Error updating {file}: {e}")

print(f"\n✅ Navigation updated in all files!")
print("Changes:")
print("  - Removed 'Reviews' link")
print("  - Removed 'Contact' link")
print("  - Added phone number: Call NOW! 800-123-1234")
print("  - Improved design with icon and responsive display")
