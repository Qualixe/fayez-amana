-- The CV upload on the Careers application form is now required (previously
-- optional). Updates the default hint/validation copy to match — guarded so
-- it only touches rows still holding the original seeded text, leaving any
-- admin-edited copy untouched.
-- Run in the Supabase SQL editor. Safe to re-run.

update careers_page_settings
set form_cv_hint = 'PDF only, up to 3 MB.'
where id = 1 and form_cv_hint = 'PDF only, up to 3 MB. Optional, but it speeds up the review.';

update careers_page_settings
set form_cv_hint_ar = 'PDF فقط، حتى 3 ميجابايت.'
where id = 1 and form_cv_hint_ar = 'PDF فقط، حتى 3 ميجابايت. اختياري، لكنه يسرّع المراجعة.';

update careers_page_settings
set form_validation_error = 'Please add your name, a valid email, the position you''re applying for, and attach your CV.'
where id = 1 and form_validation_error = 'Please add your name, a valid email, and the position you''re applying for.';

update careers_page_settings
set form_validation_error_ar = 'يرجى إضافة اسمك وبريد إلكتروني صحيح والوظيفة المتقدم إليها وإرفاق سيرتك الذاتية.'
where id = 1 and form_validation_error_ar = 'يرجى إضافة اسمك وبريد إلكتروني صحيح والوظيفة المتقدم إليها.';
