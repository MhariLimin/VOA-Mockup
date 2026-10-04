# Pending

Work not yet done that is **not** stuck. Anything stuck is in [BLOCKERS.md](BLOCKERS.md).

## Theme — needs no server access

| Item | Notes |
| --- | --- |
| Check on a phone | Layout was measured at phone width and matches, but nothing was tried on a real touch screen |

## On your side — available now

| Item | Where |
| --- | --- |
| **Review the redirect list**, especially the ten proposed targets | [REDIRECTS.md](REDIRECTS.md) |
| Look for an existing staging site. The backup shows one exists | wp-admin → **HostGator → Staging** |
| Find where contact-form emails go (Q6) | wp-admin → **Contact → Contact Forms** → the form → **Mail** tab → **To** |
| Run a Wordfence scan: read the results only, **delete nothing** (Q10) | wp-admin → **Wordfence → Scan → Start New Scan** |
| Confirm the post count: wp-admin says 100, the sitemap 98 (Q12) | wp-admin → **Posts**: compare *All*, *Published* and *Draft* |

## Open questions — answers wanted, nothing stuck on them yet

| # | Question |
| --- | --- |
| Q1 | Where did the Divi belief come from? Is there a second WordPress install, or a Divi subscription being paid? |
| Q5 | Does hosting stay on HostGator? |
| Q8 | Posts have no categories. The theme already shows a category worked out from the title, the same way React does. Assign real categories during migration, or keep that? |
| — | URLs for the three renamed services and for `/why-voa` |
| — | Whose Google account should backups go to? The Drive connection in UpdraftPlus does not work |
| — | Which name shows as article author: the account's display name or its username? The theme uses the display name; React showed the username (`annevillavieja`). Showing usernames publicly helps password guessing |

## Migration steps after staging exists

Runbook steps 2–11:
1. Create staging and lock it down.
2. Scan and clean staging.
3. Install the theme, then run **Appearance → Site setup**.
4. Set up the forms.
5. Configure SEO and redirects.
6. Run QA.

Step 12, cutover, needs the client's authorisation.

## React prototype — small leftovers

- Three article links still point to the old `stagingsite2` site.
- The Week 3 changes have never been checked at mobile width.
- `Rezi Finance (1)` needs cleaning in the client-logo names.
- Dead `.role-fit` CSS remains.
