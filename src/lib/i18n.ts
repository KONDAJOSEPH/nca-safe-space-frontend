"use client";
import { useStore } from "./store";

const en = {
  app: "NCA Safe Space", login: "Sign in", email: "Email", pass: "Password", role: "Role",
  Admin: "Admin", Staff: "Staff", Viewer: "Viewer",
  dashboard: "Dashboard", cases: "Cases", reports: "Reports", settings: "Settings", help: "Help & Support",
  home: "Home", add: "Add case", profile: "Profile", logout: "Log out",
  total: "Total cases", active: "Active cases", resolved: "Resolved cases", pending: "Pending reviews",
  trend: "Cases trend", status: "Status distribution", map: "Case locations", monthly: "Monthly overview",
  allRegions: "All regions", allStatus: "All statuses", search: "Search cases", from: "From", to: "To",
  id: "Case ID", title: "Title", region: "Region", date: "Date", st: "Status", desc: "Description & notes",
  photo: "Photo", save: "Save case", req: "This field is required", saved: "Case saved",
  badLogin: "Email or password doesn’t match the selected role. Use one of the demo accounts below.",
  demo: "Demo accounts (click a row to select the role)", online: "Installable app · works offline",
  empty: "No cases match these filters. Clear a filter or add a case.", prev: "Previous", next: "Next",
  soon: "This section is coming soon.", loading: "Loading…", loadErr: "Couldn’t load cases. Check your connection and retry.",
  retry: "Retry", noAdd: "Viewers can’t add cases. Ask an admin to change your role.",
  byRegion: "Cases by region", rate: "Resolution rate", perMonth: "Average per month", exportCsv: "Export CSV", month: "Month",
  language: "Language", theme: "Appearance", system: "System", light: "Light", dark: "Dark",
  notifications: "Notifications", notifOn: "Enable push notifications", notifGranted: "Notifications are on.",
  notifDenied: "Notifications are blocked in your browser settings.", notifUnsupported: "This device doesn’t support notifications.",
  clearCache: "Clear offline data", cleared: "Offline data cleared.",
  faq: "Frequently asked questions", contact: "Contact support", subject: "Subject", message: "Message", send: "Send message",
  q1: "How do I add a case?", a1: "Open Cases, choose Add case, fill in the required fields and save. New cases start as Pending.",
  q2: "Why can’t I add or edit cases?", a2: "Viewers have read-only access. Ask an admin to change your role.",
  q3: "Does the app work offline?", a3: "Pages you have opened stay available offline. Changes sync when you reconnect to the network.",
  q4: "How do I install the app?", a4: "Choose Install app on your Profile page, or use your browser’s menu to add it to your home screen.",
  account: "Account", totalInSystem: "Cases in the system", install: "Install app", installHint: "Use your browser’s menu to add this app to your home screen.",
  back: "Back to cases", details: "Case details", changeStatus: "Update status", notFound: "Case not found.", noNotes: "No notes.",
  Active: "Active", Resolved: "Resolved", Pending: "Pending",
  North: "North", Central: "Central", East: "East", West: "West",
};
const ar: typeof en = {
  app: "المساحة الآمنة NCA", login: "تسجيل الدخول", email: "البريد الإلكتروني", pass: "كلمة المرور", role: "الدور",
  Admin: "مسؤول", Staff: "موظف", Viewer: "مشاهد",
  dashboard: "لوحة التحكم", cases: "الحالات", reports: "التقارير", settings: "الإعدادات", help: "المساعدة والدعم",
  home: "الرئيسية", add: "إضافة حالة", profile: "حسابي", logout: "تسجيل الخروج",
  total: "إجمالي الحالات", active: "الحالات النشطة", resolved: "الحالات المحلولة", pending: "مراجعات معلقة",
  trend: "اتجاه الحالات", status: "توزيع الحالات", map: "مواقع الحالات", monthly: "نظرة شهرية",
  allRegions: "كل المناطق", allStatus: "كل الحالات", search: "ابحث في الحالات", from: "من", to: "إلى",
  id: "رقم الحالة", title: "العنوان", region: "المنطقة", date: "التاريخ", st: "الحالة", desc: "الوصف والملاحظات",
  photo: "صورة", save: "حفظ الحالة", req: "هذا الحقل مطلوب", saved: "تم حفظ الحالة",
  badLogin: "البريد أو كلمة المرور لا يطابق الدور المحدد. استخدم أحد الحسابات التجريبية أدناه.",
  demo: "حسابات تجريبية (اضغط لتحديد الدور)", online: "تطبيق قابل للتثبيت · يعمل دون اتصال",
  empty: "لا توجد حالات مطابقة. امسح مرشحًا أو أضف حالة.", prev: "السابق", next: "التالي",
  soon: "هذا القسم قريبًا.", loading: "جارٍ التحميل…", loadErr: "تعذر تحميل الحالات. تحقق من الاتصال وأعد المحاولة.",
  retry: "إعادة المحاولة", noAdd: "لا يمكن للمشاهدين إضافة حالات. اطلب من المسؤول تغيير دورك.",
  byRegion: "الحالات حسب المنطقة", rate: "نسبة الحل", perMonth: "المتوسط الشهري", exportCsv: "تصدير CSV", month: "الشهر",
  language: "اللغة", theme: "المظهر", system: "النظام", light: "فاتح", dark: "داكن",
  notifications: "الإشعارات", notifOn: "تفعيل الإشعارات", notifGranted: "الإشعارات مفعّلة.",
  notifDenied: "الإشعارات محظورة في إعدادات المتصفح.", notifUnsupported: "هذا الجهاز لا يدعم الإشعارات.",
  clearCache: "مسح البيانات دون اتصال", cleared: "تم مسح البيانات دون اتصال.",
  faq: "الأسئلة الشائعة", contact: "تواصل مع الدعم", subject: "الموضوع", message: "الرسالة", send: "إرسال الرسالة",
  q1: "كيف أضيف حالة؟", a1: "افتح الحالات، اختر إضافة حالة، املأ الحقول المطلوبة واحفظ. تبدأ الحالات الجديدة بوضع معلقة.",
  q2: "لماذا لا أستطيع إضافة أو تعديل الحالات؟", a2: "المشاهدون لديهم صلاحية القراءة فقط. اطلب من المسؤول تغيير دورك.",
  q3: "هل يعمل التطبيق دون اتصال؟", a3: "تبقى الصفحات التي فتحتها متاحة دون اتصال. تتم المزامنة عند عودة الاتصال بالشبكة.",
  q4: "كيف أثبّت التطبيق؟", a4: "اختر تثبيت التطبيق في صفحة حسابي، أو استخدم قائمة المتصفح لإضافته إلى الشاشة الرئيسية.",
  account: "الحساب", totalInSystem: "الحالات في النظام", install: "تثبيت التطبيق", installHint: "استخدم قائمة المتصفح لإضافة هذا التطبيق إلى الشاشة الرئيسية.",
  back: "العودة إلى الحالات", details: "تفاصيل الحالة", changeStatus: "تحديث الحالة", notFound: "لم يتم العثور على الحالة.", noNotes: "لا توجد ملاحظات.",
  Active: "نشطة", Resolved: "محلولة", Pending: "معلقة",
  North: "الشمال", Central: "الوسط", East: "الشرق", West: "الغرب",
};

const dict = { en, ar };
export type Key = keyof typeof en;

export function useT() {
  const lang = useStore((s) => s.lang);
  return (k: Key) => dict[lang][k];
}
