-- Privacy Policy page, fully editable from the dashboard.
-- Phone/email in the footer are NOT stored here — the page pulls those live
-- from Contact page settings, so there is one source of truth.
-- Run in the Supabase SQL editor. Safe to re-run.

create extension if not exists pgcrypto;

create table if not exists privacy_page_settings (
  id int primary key default 1,
  eyebrow text not null default 'Legal',
  eyebrow_ar text not null default 'قانوني',
  heading text not null default 'Privacy Policy',
  heading_ar text not null default 'سياسة الخصوصية',
  intro text not null default 'This policy explains what information Fayez Amana Construction Company collects through this website, how it is used, and the choices you have.',
  intro_ar text not null default 'توضح هذه السياسة المعلومات التي تجمعها شركة فايز أمانة للمقاولات عبر هذا الموقع، وكيفية استخدامها، والخيارات المتاحة لك.',
  last_updated text not null default '7 September 2026',
  last_updated_ar text not null default '٧ سبتمبر ٢٠٢٦',
  last_updated_label text not null default 'Last updated',
  last_updated_label_ar text not null default 'آخر تحديث',
  footer_note text not null default 'Questions about this policy? Contact us:',
  footer_note_ar text not null default 'لديك أسئلة حول هذه السياسة؟ تواصل معنا:',
  constraint privacy_page_settings_singleton check (id = 1)
);

insert into privacy_page_settings (id) values (1) on conflict (id) do nothing;

alter table privacy_page_settings enable row level security;
drop policy if exists "privacy_page_settings_public_read" on privacy_page_settings;
create policy "privacy_page_settings_public_read" on privacy_page_settings for select to anon using (true);
drop policy if exists "privacy_page_settings_admin_all" on privacy_page_settings;
create policy "privacy_page_settings_admin_all" on privacy_page_settings for all to authenticated using (true) with check (true);

create table if not exists privacy_page_sections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_ar text not null,
  body text not null,
  body_ar text not null,
  sort_order int not null default 0
);

alter table privacy_page_sections enable row level security;
drop policy if exists "privacy_page_sections_public_read" on privacy_page_sections;
create policy "privacy_page_sections_public_read" on privacy_page_sections for select to anon using (true);
drop policy if exists "privacy_page_sections_admin_all" on privacy_page_sections;
create policy "privacy_page_sections_admin_all" on privacy_page_sections for all to authenticated using (true) with check (true);

insert into privacy_page_sections (title, title_ar, body, body_ar, sort_order)
select * from (values
  (
    'Scope',
    'النطاق',
    'This Privacy Policy applies to fayezamana.com.sa and describes how Fayez Amana Construction Company ("we", "us") collects, uses and protects information submitted through this website. It does not cover information collected offline or through any other channel.',
    'تنطبق سياسة الخصوصية هذه على موقع fayezamana.com.sa وتوضح كيفية قيام شركة فايز أمانة للمقاولات ("نحن") بجمع المعلومات المقدَّمة عبر هذا الموقع واستخدامها وحمايتها. ولا تغطي هذه السياسة أي معلومات تُجمع خارج الموقع أو عبر أي قناة أخرى.',
    0
  ),
  (
    'Information we collect',
    'المعلومات التي نجمعها',
    'Contact form: your name, email, phone number, project scope, location, budget range and message. Career application form: your name, email, phone number, the position you are applying for, your experience, your CV file, and any additional fields shown on the form at the time you apply. Language preference: a small cookie that remembers whether you view the site in English or Arabic.',
    'نموذج التواصل: الاسم، البريد الإلكتروني، رقم الهاتف، نطاق المشروع، الموقع، الميزانية التقريبية، ومحتوى الرسالة. نموذج التقديم الوظيفي: الاسم، البريد الإلكتروني، رقم الهاتف، الوظيفة المتقدَّم إليها، الخبرة، ملف السيرة الذاتية، وأي حقول إضافية تظهر في النموذج وقت التقديم. تفضيل اللغة: ملف تعريف ارتباط (كوكيز) صغير يحفظ ما إذا كنت تتصفح الموقع بالإنجليزية أو العربية.',
    1
  ),
  (
    'How we use your information',
    'كيف نستخدم معلوماتك',
    'We use the information you submit to respond to your enquiry or project request, review your job application and get in touch about it, and remember your preferred language on future visits. We do not sell or rent your information, we do not use it for advertising, and we do not run third-party analytics or tracking scripts on this site.',
    'نستخدم المعلومات التي تقدّمها للرد على استفسارك أو طلب مشروعك، ومراجعة طلب التوظيف والتواصل معك بشأنه، وحفظ لغتك المفضّلة لزياراتك القادمة. نحن لا نبيع معلوماتك ولا نؤجرها، ولا نستخدمها لأغراض إعلانية، ولا نشغّل أي أدوات تحليل أو تتبّع تابعة لجهات خارجية على هذا الموقع.',
    2
  ),
  (
    'Cookies',
    'ملفات تعريف الارتباط',
    'This site uses a single cookie to remember your language choice. It is not used for tracking or advertising, and no analytics cookies are active on this site.',
    'يستخدم هذا الموقع ملف تعريف ارتباط واحد فقط لحفظ لغتك المختارة. لا يُستخدم هذا الملف للتتبّع أو الإعلانات، ولا توجد أي ملفات تعريف ارتباط خاصة بالتحليلات مفعّلة على هذا الموقع.',
    3
  ),
  (
    'Third-party services',
    'خدمات الجهات الخارجية',
    'Supabase, our database, file storage and authentication provider, stores the information submitted through our forms and any CV files you upload. Google Maps is embedded on our Contact page to show our office location; when it loads, Google may collect data under its own privacy policy. These providers act on our behalf and are required to protect your data.',
    'تقوم Supabase، مزوّد قاعدة البيانات وتخزين الملفات والمصادقة الخاص بنا، بتخزين المعلومات المُرسلة عبر نماذجنا وأي ملفات سيرة ذاتية تقوم برفعها. كما يتم تضمين خرائط جوجل في صفحة التواصل لعرض موقع مكتبنا؛ وعند تحميلها قد تجمع جوجل بيانات وفق سياسة الخصوصية الخاصة بها. تعمل هذه الجهات نيابةً عنّا وهي ملزمة بحماية بياناتك.',
    4
  ),
  (
    'Data retention',
    'الاحتفاظ بالبيانات',
    'Enquiries and job applications are kept for as long as needed to respond to you, evaluate open positions, or meet our legal and record-keeping obligations, after which they are deleted or anonymized.',
    'يتم الاحتفاظ بالاستفسارات وطلبات التوظيف للمدة اللازمة للرد عليك أو تقييم الوظائف الشاغرة أو الوفاء بالتزاماتنا القانونية وحفظ السجلات، ثم يتم حذفها أو إخفاء هويتها بعد ذلك.',
    5
  ),
  (
    'Data security',
    'أمن البيانات',
    'Information submitted through this site is transmitted over an encrypted (HTTPS) connection. Access to enquiries, applications and uploaded CVs is restricted to authorized staff through a password-protected admin panel.',
    'تُنقل المعلومات المُرسلة عبر هذا الموقع عبر اتصال مشفّر (HTTPS). ويقتصر الوصول إلى الاستفسارات وطلبات التوظيف والسير الذاتية المرفوعة على الموظفين المخوّلين عبر لوحة تحكم محمية بكلمة مرور.',
    6
  ),
  (
    'Your rights',
    'حقوقك',
    'You may ask us to access, correct or delete the information you have submitted to us by contacting us using the details below.',
    'يمكنك طلب الوصول إلى المعلومات التي قدّمتها لنا أو تصحيحها أو حذفها عبر التواصل معنا باستخدام البيانات أدناه.',
    7
  ),
  (
    'Children''s privacy',
    'خصوصية الأطفال',
    'This website is not directed at children, and we do not knowingly collect information from children.',
    'هذا الموقع غير موجّه للأطفال، ولا نقوم عن قصد بجمع معلومات منهم.',
    8
  ),
  (
    'Governing law',
    'القانون الحاكم',
    'This policy is governed by the laws of the Kingdom of Saudi Arabia, including the Personal Data Protection Law (PDPL).',
    'تخضع هذه السياسة لأنظمة المملكة العربية السعودية، بما في ذلك نظام حماية البيانات الشخصية.',
    9
  ),
  (
    'Changes to this policy',
    'التغييرات على هذه السياسة',
    'We may update this policy from time to time. Material changes will be reflected on this page with an updated date.',
    'قد نقوم بتحديث هذه السياسة من وقت لآخر. وستُنشر أي تغييرات جوهرية في هذه الصفحة مع تحديث التاريخ.',
    10
  )
) as v(title, title_ar, body, body_ar, sort_order)
where not exists (select 1 from privacy_page_sections);
