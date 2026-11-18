THE GROWTH UNION — SITE FIX, 18 November 2026
=============================================

WHAT WAS WRONG
--------------
Your new site is live and correct. The problem is that the OLD site was
never removed — both sites are sitting in the same GitHub repo, so old
pages are still publicly reachable.

38 pages from the previous Elementor build are still live, including:
    thegrowthunion.com/seo-services.html         "From Rs 18,000/month"
    thegrowthunion.com/website-development.html  "From Rs 18,000"
    thegrowthunion.com/services-and-pricing.html
    thegrowthunion.com/order.html
Nothing on the new site links to them, so you only land on one via Google,
an old bookmark, or a link shared before the rebuild. That is what you saw.

Also still live, and shouldn't be:
    case-study-aryan-hospital.html      (asked to be removed on 16 Nov)
    case-study-rugs-creations.html      (asked to be removed on 16 Nov)
    assets/clients/aryan-hospital.png
    assets/clients/sankalp-centre.png
    DELETE_THESE_FILES.txt              (my upload notes, published by mistake)
    README_UPLOAD_INSTRUCTIONS.txt      (same)

Both case studies were still listed in sitemap.xml, so Google was being
actively pointed at them.

Root cause: the November patches were uploaded, but the accompanying
DELETE_THESE_FILES.txt step was never carried out, and the original
Elementor pages were never cleared when the new site was uploaded over
the top. GitHub "Add files via upload" only adds and overwrites; it never
deletes.


WHAT'S IN THIS ZIP
------------------
upload/              8 corrected files to upload to the repo root
FILES_TO_DELETE.txt  44 files to delete from the repo


STEP 1 — DELETE THE 44 FILES  (this is the part that fixes your problem)
On github.com/Thegrowthunion/TheGrowthunion, open each file listed in
FILES_TO_DELETE.txt and use the bin icon > Commit changes.

Faster, if you have git on your machine:
    git clone https://github.com/Thegrowthunion/TheGrowthunion
    cd TheGrowthunion
    xargs git rm < /path/to/FILES_TO_DELETE.txt
    git commit -m "Remove the old Elementor site"
    git push

STEP 2 — UPLOAD THE 8 FILES from upload/ to the repo root.


WHAT THE 8 FILES CHANGE
-----------------------
Your figures disagreed across the site: three different client counts
(50+, 75+, 274+) and three experience figures (10+, 12, 13+). The Monday
patch only reached three pages and used a different HTML pattern, so it
missed several. Every page now reads:

    274+ businesses   12 years   2 offices   15+ industries   5 countries

    index.html        50+ Businesses Grown      -> 274+
    about.html        10+ Years / 75+ / 3 Offices -> 12 / 274+ / 2
    careers.html      75+ Brands Grown          -> 274+
    contact.html      50+ Businesses, 13+ Years -> 274+, 12
    growth-audit.html 75+ Brands, 10+ Years     -> 274+, 12
    services.html     50+ Businesses, 13+ Years -> 274+, 12
    team.html         50+ Businesses Grown (x2) -> 274+
    sitemap.xml       113 URLs -> 111 (two case studies removed)

team.html keeps "12 / 5+ / 4+ Years Experience" where those describe
individual consultants rather than the firm.


KEPT ON PURPOSE
---------------
wp-content/ and wp-includes/ stay. Your NEW pages still load the theme
CSS, jQuery, the Elementor assets and your logo from those folders.
Deleting them would break the live site.


AFTER YOU PUSH
--------------
1. Open thegrowthunion.com/seo-services.html — it should now 404.
2. Google Search Console > Removals > request removal for the old URLs,
   then resubmit sitemap.xml. Otherwise the old pricing pages stay in
   Google's index for weeks.
3. Check thegrowthunion.com/index.html shows "274+ Businesses Grown".
