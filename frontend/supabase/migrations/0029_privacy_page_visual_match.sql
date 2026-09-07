-- Brings the Privacy page's visual design in line with the bru.com.sa
-- reference: a compact image hero (like the News article hero) with a
-- two-line heading, and "Term — description" line formatting for the two
-- sections that are naturally lists.
-- Run in the Supabase SQL editor. Safe to re-run — every statement only
-- touches rows still holding their original seeded value, so admin edits
-- made in between are left untouched.

alter table privacy_page_settings
  add column if not exists hero_image text not null default '/images/why-choose-bg.avif';

update privacy_page_settings
set heading = 'Privacy' || chr(10) || 'Policy.'
where id = 1 and heading = 'Privacy Policy';

update privacy_page_settings
set heading_ar = 'سياسة' || chr(10) || 'الخصوصية'
where id = 1 and heading_ar = 'سياسة الخصوصية';

update privacy_page_sections
set
  body = 'Contact form — your name, email, phone number, project scope, location, budget range and message.' || chr(10) ||
    'Career application form — your name, email, phone number, the position you are applying for, your experience, your CV file, and any additional fields shown on the form at the time you apply.' || chr(10) ||
    'Language preference — a small cookie that remembers whether you view the site in English or Arabic.',
  body_ar = 'نموذج التواصل — الاسم، البريد الإلكتروني، رقم الهاتف، نطاق المشروع، الموقع، الميزانية التقريبية، ومحتوى الرسالة.' || chr(10) ||
    'نموذج التقديم الوظيفي — الاسم، البريد الإلكتروني، رقم الهاتف، الوظيفة المتقدَّم إليها، الخبرة، ملف السيرة الذاتية، وأي حقول إضافية تظهر في النموذج وقت التقديم.' || chr(10) ||
    'تفضيل اللغة — ملف تعريف ارتباط (كوكيز) صغير يحفظ ما إذا كنت تتصفح الموقع بالإنجليزية أو العربية.'
where title = 'Information we collect'
  and body = 'Contact form: your name, email, phone number, project scope, location, budget range and message. Career application form: your name, email, phone number, the position you are applying for, your experience, your CV file, and any additional fields shown on the form at the time you apply. Language preference: a small cookie that remembers whether you view the site in English or Arabic.';

update privacy_page_sections
set
  body = 'Supabase — our database, file storage and authentication provider. It stores the information submitted through our forms and any CV files you upload.' || chr(10) ||
    'Google Maps — embedded on our Contact page to show our office location. When it loads, Google may collect data under its own privacy policy.',
  body_ar = 'Supabase — مزوّد قاعدة البيانات وتخزين الملفات والمصادقة الخاص بنا. يقوم بتخزين المعلومات المُرسلة عبر نماذجنا وأي ملفات سيرة ذاتية تقوم برفعها.' || chr(10) ||
    'خرائط جوجل — مضمّنة في صفحة التواصل لعرض موقع مكتبنا. وعند تحميلها قد تجمع جوجل بيانات وفق سياسة الخصوصية الخاصة بها.'
where title = 'Third-party services'
  and body = 'Supabase, our database, file storage and authentication provider, stores the information submitted through our forms and any CV files you upload. Google Maps is embedded on our Contact page to show our office location; when it loads, Google may collect data under its own privacy policy. These providers act on our behalf and are required to protect your data.';

update privacy_page_settings
set footer_note = 'For privacy questions or requests, contact us at {email}.'
where id = 1 and footer_note = 'Questions about this policy? Contact us:';

update privacy_page_settings
set footer_note_ar = 'لأي أسئلة أو طلبات تخص هذه السياسة، تواصل معنا على {email}.'
where id = 1 and footer_note_ar = 'لديك أسئلة حول هذه السياسة؟ تواصل معنا:';
