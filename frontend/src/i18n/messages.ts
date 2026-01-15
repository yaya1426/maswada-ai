export const messages = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.myNotes": "My Notes",
    "nav.createNote": "New Note",
    "nav.signIn": "Sign In",
    "nav.signUp": "Sign Up",

    // Header
    "header.appName": "Maswada AI",
    "header.tagline": "AI-Powered Notes",

    // Home Page
    "home.hero.badge": "Design System",
    "home.hero.title": "A calm, glass-forward interface for Maswada AI",
    "home.hero.description":
      "Create, organize, and enhance your notes with powerful AI features. Bilingual support with seamless English and Arabic text handling.",
    "home.hero.getStarted": "Get Started",
    "home.hero.viewNotes": "View My Notes",

    // Notes Page
    "notes.title": "My Notes",
    "notes.empty.title": "No notes yet",
    "notes.empty.description": "Create your first note to get started with AI-powered note-taking.",
    "notes.empty.action": "Create Note",
    "notes.search.placeholder": "Search notes...",
    "notes.sort.newest": "Newest First",
    "notes.sort.oldest": "Oldest First",
    "notes.sort.title": "Title A-Z",
    "notes.delete.confirm": "Are you sure you want to delete this note?",
    "notes.delete.button": "Delete",
    "notes.edit.button": "Edit",
    "notes.view.button": "View",
    "notes.createdAt": "Created",
    "notes.updatedAt": "Updated",

    // Create/Edit Note
    "note.create.title": "Create New Note",
    "note.edit.title": "Edit Note",
    "note.form.title": "Title",
    "note.form.titlePlaceholder": "Enter note title...",
    "note.form.content": "Content",
    "note.form.contentPlaceholder": "Write your note content here...",
    "note.form.language": "Language",
    "note.form.language.en": "English",
    "note.form.language.ar": "Arabic",
    "note.form.save": "Save Note",
    "note.form.create": "Create Note",
    "note.form.cancel": "Cancel",
    "note.form.saving": "Saving...",
    "note.form.creating": "Creating...",
    "note.form.validation.titleRequired": "Title is required",
    "note.form.validation.contentRequired": "Content is required",
    "note.form.characterCount": "{count} characters",

    // Note Detail
    "noteDetail.backToNotes": "Back to Notes",
    "noteDetail.edit": "Edit",
    "noteDetail.delete": "Delete",
    "noteDetail.summary": "Summary",
    "noteDetail.noSummary": "No summary generated yet",

    // AI Features
    "ai.summarize": "Summarize",
    "ai.summarize.button": "Generate Summary",
    "ai.summarize.loading": "Generating summary...",
    "ai.summarize.success": "Summary generated successfully",
    "ai.summarize.save": "Save to Note",
    "ai.summarize.saved": "Summary saved",

    "ai.rewrite": "Rewrite",
    "ai.rewrite.button": "Rewrite Note",
    "ai.rewrite.loading": "Rewriting...",
    "ai.rewrite.mode.shorter": "Shorter",
    "ai.rewrite.mode.clearer": "Clearer",
    "ai.rewrite.mode.formal": "Formal",
    "ai.rewrite.mode.casual": "Casual",
    "ai.rewrite.selectMode": "Select rewrite mode",
    "ai.rewrite.replace": "Replace Content",
    "ai.rewrite.copy": "Copy",
    "ai.rewrite.copied": "Copied to clipboard",

    "ai.translate": "Translate",
    "ai.translate.button": "Translate to Arabic",
    "ai.translate.buttonToEnglish": "Translate to English",
    "ai.translate.loading": "Translating...",
    "ai.translate.success": "Translation completed",
    "ai.translate.createNote": "Create Note",
    "ai.translate.copy": "Copy",

    "ai.result.title": "AI Result",
    "ai.result.error": "Failed to process request",
    "ai.result.retry": "Retry",
    "ai.result.close": "Close",

    // Feedback Messages
    "feedback.noteCreated": "Note created successfully",
    "feedback.noteUpdated": "Note updated successfully",
    "feedback.noteDeleted": "Note deleted successfully",
    "feedback.error": "An error occurred",
    "feedback.tryAgain": "Please try again",

    // Loading States
    "loading.notes": "Loading notes...",
    "loading.note": "Loading note...",
    "loading.processing": "Processing...",

    // Errors
    "error.notFound": "Note not found",
    "error.unauthorized": "Please sign in to continue",
    "error.forbidden": "You don't have permission to access this",
    "error.serverError": "Server error occurred",
    "error.networkError": "Network error. Please check your connection.",

    // Auto-save & Editor
    "notes.editor.saving": "Saving...",
    "notes.editor.saved": "Saved {time}",
    "notes.editor.unsaved": "Unsaved changes",
    "notes.editor.autoSave": "Auto-save enabled",
    "notes.untitled": "Untitled Note",
    "notes.backToList": "Back to Notes",

    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.close": "Close",
    "common.confirm": "Confirm",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.now": "just now",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.myNotes": "ملاحظاتي",
    "nav.createNote": "ملاحظة جديدة",
    "nav.signIn": "تسجيل الدخول",
    "nav.signUp": "إنشاء حساب",

    // Header
    "header.appName": "مسودة AI",
    "header.tagline": "ملاحظات بالذكاء الاصطناعي",

    // Home Page
    "home.hero.badge": "نظام التصميم",
    "home.hero.title": "واجهة هادئة وعصرية لمسودة AI",
    "home.hero.description":
      "أنشئ ونظم وحسّن ملاحظاتك باستخدام ميزات الذكاء الاصطناعي القوية. دعم ثنائي اللغة مع معالجة سلسة للنصوص الإنجليزية والعربية.",
    "home.hero.getStarted": "ابدأ الآن",
    "home.hero.viewNotes": "عرض ملاحظاتي",

    // Notes Page
    "notes.title": "ملاحظاتي",
    "notes.empty.title": "لا توجد ملاحظات بعد",
    "notes.empty.description": "أنشئ ملاحظتك الأولى للبدء في تدوين الملاحظات بالذكاء الاصطناعي.",
    "notes.empty.action": "إنشاء ملاحظة",
    "notes.search.placeholder": "البحث في الملاحظات...",
    "notes.sort.newest": "الأحدث أولاً",
    "notes.sort.oldest": "الأقدم أولاً",
    "notes.sort.title": "العنوان أ-ي",
    "notes.delete.confirm": "هل أنت متأكد من حذف هذه الملاحظة؟",
    "notes.delete.button": "حذف",
    "notes.edit.button": "تعديل",
    "notes.view.button": "عرض",
    "notes.createdAt": "تم الإنشاء",
    "notes.updatedAt": "تم التحديث",

    // Create/Edit Note
    "note.create.title": "إنشاء ملاحظة جديدة",
    "note.edit.title": "تعديل الملاحظة",
    "note.form.title": "العنوان",
    "note.form.titlePlaceholder": "أدخل عنوان الملاحظة...",
    "note.form.content": "المحتوى",
    "note.form.contentPlaceholder": "اكتب محتوى ملاحظتك هنا...",
    "note.form.language": "اللغة",
    "note.form.language.en": "الإنجليزية",
    "note.form.language.ar": "العربية",
    "note.form.save": "حفظ الملاحظة",
    "note.form.create": "إنشاء الملاحظة",
    "note.form.cancel": "إلغاء",
    "note.form.saving": "جاري الحفظ...",
    "note.form.creating": "جاري الإنشاء...",
    "note.form.validation.titleRequired": "العنوان مطلوب",
    "note.form.validation.contentRequired": "المحتوى مطلوب",
    "note.form.characterCount": "{count} حرف",

    // Note Detail
    "noteDetail.backToNotes": "العودة للملاحظات",
    "noteDetail.edit": "تعديل",
    "noteDetail.delete": "حذف",
    "noteDetail.summary": "الملخص",
    "noteDetail.noSummary": "لم يتم إنشاء ملخص بعد",

    // AI Features
    "ai.summarize": "تلخيص",
    "ai.summarize.button": "إنشاء ملخص",
    "ai.summarize.loading": "جاري إنشاء الملخص...",
    "ai.summarize.success": "تم إنشاء الملخص بنجاح",
    "ai.summarize.save": "حفظ في الملاحظة",
    "ai.summarize.saved": "تم حفظ الملخص",

    "ai.rewrite": "إعادة كتابة",
    "ai.rewrite.button": "إعادة كتابة الملاحظة",
    "ai.rewrite.loading": "جاري إعادة الكتابة...",
    "ai.rewrite.mode.shorter": "أقصر",
    "ai.rewrite.mode.clearer": "أوضح",
    "ai.rewrite.mode.formal": "رسمي",
    "ai.rewrite.mode.casual": "غير رسمي",
    "ai.rewrite.selectMode": "اختر نمط إعادة الكتابة",
    "ai.rewrite.replace": "استبدال المحتوى",
    "ai.rewrite.copy": "نسخ",
    "ai.rewrite.copied": "تم النسخ",

    "ai.translate": "ترجمة",
    "ai.translate.button": "ترجمة إلى الإنجليزية",
    "ai.translate.buttonToEnglish": "ترجمة إلى العربية",
    "ai.translate.loading": "جاري الترجمة...",
    "ai.translate.success": "تمت الترجمة بنجاح",
    "ai.translate.createNote": "إنشاء ملاحظة",
    "ai.translate.copy": "نسخ",

    "ai.result.title": "نتيجة الذكاء الاصطناعي",
    "ai.result.error": "فشل في معالجة الطلب",
    "ai.result.retry": "إعادة المحاولة",
    "ai.result.close": "إغلاق",

    // Feedback Messages
    "feedback.noteCreated": "تم إنشاء الملاحظة بنجاح",
    "feedback.noteUpdated": "تم تحديث الملاحظة بنجاح",
    "feedback.noteDeleted": "تم حذف الملاحظة بنجاح",
    "feedback.error": "حدث خطأ",
    "feedback.tryAgain": "يرجى المحاولة مرة أخرى",

    // Loading States
    "loading.notes": "جاري تحميل الملاحظات...",
    "loading.note": "جاري تحميل الملاحظة...",
    "loading.processing": "جاري المعالجة...",

    // Errors
    "error.notFound": "الملاحظة غير موجودة",
    "error.unauthorized": "يرجى تسجيل الدخول للمتابعة",
    "error.forbidden": "ليس لديك صلاحية للوصول إلى هذا",
    "error.serverError": "حدث خطأ في الخادم",
    "error.networkError": "خطأ في الشبكة. يرجى التحقق من اتصالك.",

    // Auto-save & Editor
    "notes.editor.saving": "جاري الحفظ...",
    "notes.editor.saved": "تم الحفظ {time}",
    "notes.editor.unsaved": "تغييرات غير محفوظة",
    "notes.editor.autoSave": "الحفظ التلقائي مفعل",
    "notes.untitled": "ملاحظة بدون عنوان",
    "notes.backToList": "العودة للملاحظات",

    // Common
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.close": "إغلاق",
    "common.confirm": "تأكيد",
    "common.loading": "جاري التحميل...",
    "common.error": "خطأ",
    "common.success": "نجح",
    "common.back": "رجوع",
    "common.next": "التالي",
    "common.previous": "السابق",
    "common.now": "الآن",
  },
}
