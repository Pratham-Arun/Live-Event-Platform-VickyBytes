# Conflict Resolution Guide (Remaining Work)

If GitHub still shows unresolved conflicts, use this checklist to complete the merge manually.

## 1) Sync your local branches

```bash
git fetch origin
git checkout work
git pull --rebase origin work
```

Then merge/rebase the target branch (usually `main`):

```bash
# Option A: merge
git merge origin/main

# Option B: rebase (cleaner history)
git rebase origin/main
```

## 2) Resolve conflicts in the files GitHub reported

Conflicted files:

- `app/event/[id]/page.tsx`
- `app/page.tsx`
- `components/EventCard.tsx`
- `components/Navbar.tsx`
- `data/events.ts`
- `styles/globals.css`

For each file:

1. Find conflict markers:

```txt
<<<<<<< HEAD
...
=======
...
>>>>>>> branch-name
```

2. Keep the final intended code (remove all marker lines).
3. Save the file.

## 3) Fast marker scan (required)

Run this exact command and ensure it prints nothing:

```bash
rg -n "^(<<<<<<<|=======|>>>>>>>)" app/event/[id]/page.tsx app/page.tsx components/EventCard.tsx components/Navbar.tsx data/events.ts styles/globals.css
```

## 4) Mark files resolved and continue

```bash
git add app/event/[id]/page.tsx app/page.tsx components/EventCard.tsx components/Navbar.tsx data/events.ts styles/globals.css
```

If you are merging:

```bash
git commit -m "Resolve merge conflicts in frontend files"
```

If you are rebasing:

```bash
git rebase --continue
```

## 5) Validate no unresolved merge entries remain

```bash
git ls-files -u
```

Expected result: no output.

## 6) Optional project checks

```bash
npm install
npm run lint
npm run build
```

If `npm install` fails in your environment due registry or proxy rules, resolve that first and re-run checks.

## 7) Push updated branch

```bash
git push origin work
```

If rebased, use:

```bash
git push --force-with-lease origin work
```

## Notes for this project

- Keep category + UI behavior consistent in:
  - `data/events.ts`
  - `app/page.tsx`
  - `components/EventCard.tsx`
- Keep event detail metadata and fallback logic stable in:
  - `app/event/[id]/page.tsx`
- Keep global motion/accessibility styles stable in:
  - `styles/globals.css`

