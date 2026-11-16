TGU BLOG + INTERNAL LINKS PATCH — 16 November 2026
==================================================

Upload this AFTER TGU_SEO_Fix_Patch_v2.zip. It is built on top of that
patch, so the order matters. Nothing is deleted; no design was changed.

WHAT TO UPLOAD
--------------
1. All 57 .html files      -> site root
2. sitemap.xml             -> site root (replaces the one from patch v2)
3. feed.xml                -> site root
4. assets/blog/*.webp      -> assets/blog/  (new folder, 6 cover images)


PART 1 — THE SIX NEW ARTICLES
-----------------------------
  insight-chatgpt-business-profile.html
  insight-ai-agents-shopping.html
  insight-ads-in-ai-answers.html
  insight-instagram-trends-festive-season.html
  insight-google-november-2026-core-update.html
  insight-microsoft-365-outage-plan-b.html

Each one is a full page built from your existing article template, with its
own title, meta description, canonical URL, Open Graph tags, breadcrumb,
Article and Breadcrumb structured data, and three "Keep reading" links.

Also updated:
- insights.html  : six new cards at the top of the grid (60 cards total).
                   Each card is filtered under the right tab.
- sitemap.xml    : the six new URLs, dated 2026-11-16 (113 URLs total).
- feed.xml       : the six new items at the top (57 items).

COVER IMAGES
  Rather than add six more Unsplash hotlinks, each article has its own
  branded cover, built in your navy and amber, hosted on your own domain,
  as WebP at 1200x800 and 14-18 KB each. They double as the og:image, so
  shares on LinkedIn and WhatsApp show a branded card instead of your
  generic logo image.

BEFORE YOU PUBLISH
  Work through the "Before you publish: verify these" list in the blog
  pack doc. The Microsoft outage and Google core update articles are the
  time-sensitive ones. In particular, Microsoft had not published its
  post-incident report when these were written, so the cause is described
  as unconfirmed.


PART 2 — INTERNAL LINKS (47 articles)
-------------------------------------
Before this patch, not one article on the site linked to a specific
service page. Forty of forty-eight had no service link at all; the other
eight linked only to the generic services.html.

Each of those 47 articles now ends with one short paragraph, written for
that article, linking to the service page it supports and to one related
article. It sits just above the existing "Book a free growth audit" block
and inherits the normal article styling.

Service pages now linked from articles:
  seo-content.html                 12      sales-support.html         2
  legal-compliance.html             5      pr-reputation.html         2
  strategy-research.html            5      social-media.html          2
  paid-ads.html                     5      hiring-hr.html             2
  sales-management.html             3      ecommerce-marketplaces.html 2
  crm-automation.html               3      brand-design.html          1
  outsourced-marketing-team.html    3      all-services.html          1
  websites-funnels.html             3

Only influencer-creators.html still has no article pointing at it, because
there is no influencer-marketing article on the site yet. That is a content
gap, not a linking one.


ALSO FIXED
----------
The Facebook, Twitter and LinkedIn share buttons on your three existing
insight articles pointed at http://localhost:8080/... — a leftover from the
WordPress export. Anyone sharing from those pages was sharing a dead link.
Now fixed, and correct on the six new articles.

The visible byline date on the new articles reads 16 Nov 26 and matches
their structured data. (Worth knowing: on the three older insight pages the
visible date says 03 Nov 26 while the structured data says 2026-11-09. Not
changed here, since I do not know which is right.)


AFTER UPLOADING
---------------
1. Open /insights.html and check the six new cards and the filter tabs.
2. Open each new article and check the cover, the links and the layout.
3. Google Search Console -> URL Inspection -> Request indexing, for each of
   the six new URLs. Then resubmit sitemap.xml.
4. Run one new article through Google's Rich Results Test.
5. Post the LinkedIn article, and link the blogs from the comments.
6. Blog 4 (Instagram trends) is the one with a deadline: it is written for
   the run-up to Black Friday on 27 November.
