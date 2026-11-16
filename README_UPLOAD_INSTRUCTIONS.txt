TGU SEO FIX PATCH v2 — 16 November 2026
=======================================

Built from the latest site files (Update Part 1-4 + the client update patch).
Upload these over the live site, keeping the same folder structure.
Nothing is deleted. No design was changed.

WHAT TO UPLOAD
--------------
1. All 63 .html files            -> site root
2. sitemap.xml                   -> site root (replaces the old one)
3. favicon.ico                   -> site root (NEW)
4. The_Growth_Union.pdf          -> site root (NEW)
5. assets/img/apple-touch-icon.png -> assets/img/ (NEW)


NEW IN v2: THE NEW DELHI OFFICE
-------------------------------
The site previously showed one office. It now shows two.

  Lower Ground Floor, Saket Salcon Rasvilas
  Saket District Centre, Sector 6, Pushp Vihar
  New Delhi - 110017   (next to Select Citywalk Mall)

- contact.html: heading changed from "One Office" to "Two Offices", and a
  New Delhi office card added beside the Gurgaon one, with a Get Directions
  link.
- Footer on 58 pages: a second address line for Saket, and both address
  lines now open Google Maps instead of going nowhere.
- delhi.html: its office schema had only "Innov8, Ras Vilas, Saket" and no
  PIN code. Now carries the full street address and 110017.
- index.html and contact.html: structured data now describes BOTH offices
  as separate locations under the parent organisation.
- gurgaon.html and delhi.html already had their own office schema, so the
  duplicate block from v1 was removed from those two pages.
- about.html body copy and the homepage social preview now say
  "Gurgaon and New Delhi" instead of Gurgaon alone.

Also fixed while in the footer:
- "Privacy Policy" and "Terms of Use" linked to "#" on 58 pages. They now
  point at privacy-policy.html and terms.html.
- Copyright read "(c) 2025" on 52 pages. Now 2026.


FROM v1 (still included)
------------------------
TITLES (53 pages)
  Every title now fits in 60 characters, so Google stops cutting them off.
  Keyword stays at the front. Social titles (og:title) left at full length
  on purpose - a social preview has more room than a search result.

META DESCRIPTIONS (6 pages)
  about, careers, contact, index, partner, services ran over 165 chars.
  Trimmed to 137-155.

MISSING FILES
  favicon.ico           - 51 pages linked to it; it did not exist.
  The_Growth_Union.pdf  - 59 pages linked to it; it did not exist.
                          This is company profile v5.
  apple-touch-icon.png  - the same mark at 180px, for iOS home screens.

FAVICON LINKS (58 pages) - those pages had no icon link at all.

MIXED CONTENT (3 pages)
  The author avatar on the three insight articles loaded over http on an
  https site. Browsers flag that.

BROKEN LINKS (3 pages)
  Leftover WordPress /?page_id=152 breadcrumb links now go to /insights.html

IMAGE ALT TEXT (5 pages)
  Added to the 7 images genuinely missing it. The 51 copies of l.png are
  decorative and correctly keep an empty alt - that is right, not a fault.

SITEMAP - partner.html and team.html added, dates refreshed, 107 URLs.


AFTER UPLOADING
---------------
1. Check the favicon appears in the browser tab.
2. Open thegrowthunion.com/The_Growth_Union.pdf and check it downloads.
3. Open /contact.html and check both office cards and both Get Directions
   links.
4. Google Search Console: Sitemaps -> resubmit sitemap.xml
5. Run the homepage and /contact.html through Google's Rich Results Test;
   confirm two ProfessionalService locations are picked up.
6. Check back in 2-4 weeks for click-through changes on the shortened
   titles.


STILL OPEN
----------
- 84 images load from other sites (74 Unsplash, 7 GitHub raw on the
  homepage, 3 Gravatar). You are hosting these on your GitHub - send the
  URLs and I will swap them in.
- Google Business Profiles for both offices, then reviews from your 46
  clients.
- Google Search Console verification.
