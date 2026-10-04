# Pending

Work not yet done that is **not** stuck. Anything stuck is in [BLOCKERS.md](BLOCKERS.md).

## Theme build — needs no server access

| Step | What | Notes |
| --- | --- | --- |
| 6 | Service page template and its custom blocks: service hero, systems diagram, fit-flow, testimonial grid, managed steps | Next. The icon-matching logic must be ported intact |
| 7 | Nine page templates: Services index, About, How It Works, Why Virtual Office Angels, Client Stories, Videos, FAQs, Contact, Thank you | |
| 9 | Block patterns: ready-made sections the client can insert and edit | |
| — | **First visual review in a browser**, desktop and mobile, light and dark | Nothing has been looked at yet |

## On the user's side — available now

| Item | Where |
| --- | --- |
| Find where contact-form emails go (Q6) | wp-admin → **Contact → Contact Forms** → open the form → **Mail** tab → **To** |
| Run a Wordfence scan on live: scan and read the results only, **delete nothing** (Q10) | wp-admin → **Wordfence → Scan → Start New Scan** |
| Confirm the post count: wp-admin says 100, the sitemap 98 (Q12) | wp-admin → **Posts**; compare *All*, *Published* and *Draft* |

## Open questions — answers wanted, nothing stuck on them yet

| # | Question |
| --- | --- |
| Q1 | Where did the Divi belief come from? Is there a second WordPress install, or a Divi subscription being paid for? |
| Q5 | Does hosting stay on HostGator? |
| Q8 | Posts have no categories or tags. Fix during migration, or accept? The recommendation is to auto-assign from the React rules, then review by hand |
| — | URLs for the three renamed services and for `/why-voa` |

## Migration steps after staging exists

Runbook steps 2–11:
1. Create staging and lock it down.
2. Scan and clean staging.
3. Install the theme.
4. Rebuild the content.
5. Set up the forms.
6. Configure SEO and redirects.
7. Run QA.

Step 12, cutover, needs the client's authorisation.

## React prototype — small leftovers

- Three article links still point to the old `stagingsite2` site.
- The Week 3 changes have never been checked at mobile width.
- `Rezi Finance (1)` needs cleaning in the client-logo names.
- Dead `.role-fit` CSS remains.
