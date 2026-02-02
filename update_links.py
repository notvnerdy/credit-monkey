#!/usr/bin/env python3
import re

states_list = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"]

with open('states-we-fix-credit-in.html', 'r') as f:
    content = f.read()

for state in states_list:
    state_url = state.lower().replace(" ", "-")
    pattern = f'<div class="state-chip" data-aos="zoom-in" data-aos-delay="([0-9]+)">{state}</div>'
    replacement = f'<a href="states/{state_url}.html" class="state-chip-link"><div class="state-chip" data-aos="zoom-in" data-aos-delay="\\1">{state}</div></a>'
    content = re.sub(pattern, replacement, content)

with open('states-we-fix-credit-in.html', 'w') as f:
    f.write(content)

print("✅ Updated all 51 state chips with links!")
