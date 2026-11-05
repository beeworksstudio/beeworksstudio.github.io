# BeeWorks Studio website

A buildless, mobile-first English/Arabic website for the independent BeeWorks Studio brand and its first app, FilGyb

## Source and preview

Publish only this folder's contents. Never upload the iOS app, backend, email secrets, local user data or the enclosing FilGyb folder.

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory .
```

Open http://127.0.0.1:8080/ . Root-relative studio links assume a domain-root deployment, as configured below.

## Routes

| Purpose | English | Arabic |
|---|---|---|
| Studio | `/` | `/ar/` |
| Studio contact | `/contact/` | `/ar/contact/` |
| FilGyb | `/filgybapp/` | `/filgybapp/ar/` |
| FilGyb support | `/filgybapp/support/` | `/filgybapp/ar/support/` |
| Privacy | `/filgybapp/privacy/` | `/filgybapp/ar/privacy/` |
| Terms | `/filgybapp/terms/` | `/filgybapp/ar/terms/` |
| About FilGyb | `/filgybapp/aboutfilgyb/` | `/filgybapp/ar/aboutfilgyb/` |

`/filgybapp/privacypolicy/` remains an alias. Old root legal/support routes redirect to FilGyb so existing app links keep working after the domain transition.

## Publish to the existing GitHub Pages repository

Repository: https://github.com/beeworksapps/filgybapp

1. Upload the **contents** of this folder to main/root, preserving subfolders and hidden `.nojekyll`. Do not add an outer Website directory.
2. GitHub Settings → Pages: main, root, Custom domain **www.beeworksapps.com**. The included CNAME declares the same host.
3. Verify domain ownership in the GitHub account's Pages settings using GitHub's TXT value. Configure Namecheap website records from the project domain-setup document, preserving Google Workspace MX/SPF/DKIM.
4. Wait for DNS and GitHub certificate validation, then enable Enforce HTTPS.
5. Verify studio, FilGyb, English/Arabic legal routes and support links on the custom domain before changing OAuth URLs.

`robots.txt`, `sitemap.xml`, absolute canonical and Open Graph URLs are included for the intended production domain. Source helper scripts are under `filgyb/tools`; `localize.py` regenerates Arabic FilGyb pages. Studio pages are already authored in both languages.

## Email and contact behavior

The studio form opens a draft to `hello@beeworksapps.com`; FilGyb support opens a draft to `support@beeworksapps.com`. Visitors review and send through their own email app. There is no server submission, stored message database, false success claim, advertising analytics or marketing cookie.

Authentication email delivery is separate: Supabase Auth → Resend SMTP using the isolated `mail.beeworksapps.com` sending domain. Templates and DNS instructions are outside the public website source. DNS verification/SMTP activation are not implied by the website build.

## Before release

FilGyb is shown as in testing, coming to iPhone. There is no fake public download badge. After App Store approval, replace that status and add the verified App Store URL. Final subscription allowance enforcement, bank-notification compatibility and market-update behavior must match the published claims. The owner-provided dashboard screenshot is preserved and contains the owner's chosen displayed data. Legal copy remains project-specific and should be reviewed against final behavior.

31 October 2026: locally checked 27 HTML pages and 297 local links, JavaScript syntax and native app Info.plist syntax. Website publishing and custom-domain activation require separate verification. The GitHub connector currently has pull-only access; a signed-in owner browser can publish.
