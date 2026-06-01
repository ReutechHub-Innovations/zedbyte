# TODO

- [x] Hide client admin dashboard behind `/z-admin/dashboard` (update React routes + login redirect).
- [x] Update dashboard links to use `/z-admin/*` paths.
- [x] Add a server-side admin seeding script (Cloudinary-ready already; focus here is users/admin sync).
- [x] Wire seeding behind `SEED_ADMIN=true` to keep services in sync without seeding on every boot.
- [x] Fix light-mode unreadable admin dashboard text via theme-aware CSS override.

Next recommended (not implemented yet):
- [ ] Create actual React routes/pages for `/z-admin/users`, `/z-admin/content`, `/z-admin/settings` (right now only dashboard shell exists).
- [ ] Add an API route + client UI for media uploads if not already present, and ensure it uses Cloudinary.

