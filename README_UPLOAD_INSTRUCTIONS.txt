TGU SEO FIX PATCH — 16 November 2026
====================================

Built from the latest site files (Update Part 1-4 + the client update patch).
Upload these over the live site, keeping the same folder structure.

WHAT TO UPLOAD
--------------
1. All 63 .html files  ->  site root (same place as index.html)
2. sitemap.xml         ->  site root (replaces the old one)
3. favicon.ico         ->  site root (NEW - was linked from 51 pages but missing)
4. The_Growth_Union.pdf->  site root (NEW - was linked from 59 pages but missing)
5. assets/img/apple-touch-icon.png -> assets/img/ (NEW)

Nothing is deleted. No page content or design was changed.


WHAT CHANGED, AND WHY
---------------------
TITLES (53 pages)
  Every page title now fits in 60 characters, so Google stops cutting them
  off in search results. The keyword stays at the front. The social-share
  titles (og:title) were left at full length on purpose - social previews
  have more room than a search result.

META DESCRIPTIONS (6 pages)
  about, careers, contact, index, partner, services ran over 165 characters
  and were being truncated. Trimmed to 137-155.

MISSING FILES (2)
  favicon.ico      - 51 pages linked to it; it did not exist. Built from
                     your logo mark, with 16/32/48/64/128/256px sizes.
  The_Growth_Union.pdf - 59 pages linked to it; it did not exist. This is
                     the company profile v5 (the one with 29 client logos,
                     Aryan/Rugs/Sankalp removed).
  apple-touch-icon.png - same mark at 180px, for iOS home screens.

FAVICON LINKS (58 pages)
  58 pages had no favicon link at all. Added.

LOCAL SEO (4 pages: index, contact, gurgaon, delhi)
  Added ProfessionalService (LocalBusiness) structured data with the
  Gurgaon address, phone, email, opening hours, service areas and social
  profiles. This is what Google reads for local results and the knowledge
  panel.

MIXED CONTENT (3 pages)
  The author avatar on the three insight articles loaded over http://
  instead of https://. Browsers flag or block that on a secure site. Fixed.

BROKEN LINKS (3 pages)
  Leftover WordPress links of the form /?page_id=152 in the breadcrumb now
  point at /insights.html.

IMAGE ALT TEXT (5 pages)
  Added alt text to the 7 images that were genuinely missing it (3 on the
  homepage, 1 founder photo, 3 author avatars). The 51 copies of l.png are
  decorative and correctly keep an empty alt - that is the right practice,
  not a fault.

SITEMAP
  partner.html and team.html added (they were missing). All lastmod dates
  set to 2026-11-16. Now 107 URLs.


AFTER UPLOADING
---------------
1. Open the site and check the favicon appears in the browser tab.
2. Open thegrowthunion.com/The_Growth_Union.pdf and check it downloads.
3. In Google Search Console: Sitemaps -> resubmit sitemap.xml
4. Run the homepage through Google's Rich Results Test and confirm the
   LocalBusiness block is picked up.
5. Give it 2-4 weeks, then check Search Console for click-through changes
   on the pages whose titles were shortened.


STILL TO DO (not in this patch - needs your input or a decision)
----------------------------------------------------------------
- The contact page still says "One Office" and lists only Gurgaon. Your
  New Delhi (Innov8, Saket) office is not on the site at all. Send me the
  full Delhi address and I will add it, plus a second LocalBusiness block.
- 84 images still load from other sites (74 Unsplash, 7 GitHub raw,
  3 Gravatar). The GitHub raw ones are on your homepage. These should be
  downloaded and hosted on your own domain as WebP.
- Google Business Profiles for both offices.
- Google Search Console: confirm the property is verified.
