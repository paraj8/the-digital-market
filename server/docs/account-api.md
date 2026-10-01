# Account API

All endpoints below are mounted under `/api/v1/users` and require
`Authorization: Bearer <JWT>`. Successful user reads and updates return
`{ "success": true, "data": ... }`; errors return
`{ "success": false, "message": ... }`.

## Current user

- `GET /me` returns `id`, `fullName`, `email`, `phone`, `emailVerified`,
  `phoneVerified`, and `accountStatus`.
- `PATCH /me` accepts only `{ "fullName": "..." }`.
- `PATCH /me/password` accepts `currentPassword` and `newPassword`. Passwords
  must be 6-128 characters, matching the existing registration form's minimum.
- `POST /me/email/change/otp` accepts `newEmail` and `currentPassword`.
- `POST /me/email/change/verify` accepts `newEmail` and a six-digit `otp`.
- `DELETE /me` accepts `currentPassword` and the exact confirmation `DELETE`.

Account email-change codes are bound to the authenticated user and target email,
HMAC-hashed, expire after 10 minutes, allow at most five verification attempts,
and have a 60-second resend cooldown. OTP-request routes are additionally
limited to five requests per IP per 15 minutes.

## Phone verification

`POST /me/phone/otp` accepts a phone number and
`POST /me/phone/verify` accepts a phone number and six-digit code. Indian mobile
numbers are normalized to `+91XXXXXXXXXX`. Both endpoints currently return
HTTP 503 because no SMS provider or delivery configuration exists. No phone
code is generated, stored, or delivered until a provider is configured.

## Account deletion and retention

`DELETE /me` deactivates and anonymizes the User profile instead of deleting
the User document. Existing Orders retain their User reference and all
order-linked Address documents are retained for fulfillment and accounting;
those Address documents still contain shipping contact/address information.
Unreferenced saved addresses, carts, wishlists, product-presence records, and
outstanding OTPs are removed. Coupons are global and have no user relationship.

Deleted accounts are rejected by JWT middleware. This operation does not
implement session management; password changes do not revoke other outstanding
JWTs.