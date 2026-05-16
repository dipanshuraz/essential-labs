# @kiddex/ui

Shared design system for **Essential Labs Admin** and **Kiddex Creators**.

## Shell accents

Set on `<html data-shell="admin|creators">` via `ThemeProvider`:

| Shell | Accent |
|-------|--------|
| `admin` | Green `#3d8b5c` |
| `creators` | Indigo `#6366f1` |

Legacy Tailwind aliases `brand` and `primary` map to the same accent.

## Usage

```tsx
import { Button, Card, ThemeProvider, ThemeToggle } from "@kiddex/ui";
import "@kiddex/ui/styles.css";
```

## Components

`Button`, `Card`, `Badge`, `Pagination`, `KpiCard`, `StatusDot`, `StatusPill`, `StatusBadge`, `TablePagination`, `ThemeToggle`, `ThemeProvider`

## CSS utilities

`form-field`, `form-search`, `btn-primary`, `btn-outline`, `trakr-card`, `trakr-table-head`
