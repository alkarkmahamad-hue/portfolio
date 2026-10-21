 // أنيميشن خطوط المازر بورد والإنترو السينمائي
window.addEventListener('load', () => {
    const canvas = document.getElementById('circuitCanvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const lines = [];

    for (let i = 0; i < 40; i++) {
        let startX, startY;
        const side = Math.floor(Math.random() * 4);
        if (side === 0) { startX = Math.random() * canvas.width; startY = 0; }
        else if (side === 1) { startX = canvas.width; startY = Math.random() * canvas.height; }
        else if (side === 2) { startX = Math.random() * canvas.width; startY = canvas.height; }
        else { startX = 0; startY = Math.random() * canvas.height; }

        lines.push({
            x: startX,
            y: startY,
            targetX: centerX + (Math.random() - 0.5) * 50,
            targetY: centerY + (Math.random() - 0.5) * 50,
            progress: 0,
            speed: 0.015 + Math.random() * 0.025
        });
    }

    let animationRunning = true;

    function drawCircuit() {
        if (!animationRunning) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = '#00ff66';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ff66';

        let completed = true;

        lines.forEach(line => {
            if (line.progress < 1) {
                line.progress += line.speed;
                completed = false;
            }
            const currentX = line.x + (line.targetX - line.x) * line.progress;
            const currentY = line.y + (line.targetY - line.y) * line.progress;

            ctx.beginPath();
            ctx.moveTo(line.x, line.y);
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
        });

        if (!completed) {
            requestAnimationFrame(drawCircuit);
        } else {
            document.getElementById('energyGlow').classList.add('active');
            
            setTimeout(() => {
                document.getElementById('explosionFlash').classList.add('explode');
                
                setTimeout(() => {
                    document.getElementById('introScreen').classList.add('hidden');
                    document.body.classList.add('loaded');
                }, 300);
            }, 500);
        }
    }

    setTimeout(() => {
        drawCircuit();
    }, 300);
});

// مؤشر الفأرة الدائري النيون (Custom Cyber Cursor) مع الحفاظ على كامل التفاعل والضغط
const cursor = document.createElement('div');
cursor.className = 'cyber-cursor';
const follower = document.createElement('div');
follower.className = 'cyber-cursor-follower';
document.body.appendChild(cursor);
document.body.appendChild(follower);

window.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    follower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
});

// تأثير ظهور العناصر تدريجياً أثناء النزول في الموقع (Scroll Reveal)
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-item').forEach(item => {
    observer.observe(item);
});

// تأثير كتابة الكود البرمجي التلقائي (Typing Effect)
const typingTextEl = document.getElementById('typingText');
const nameAr = "محمد ربيع الكعكي";
const nameEn = "Mohammed Elkaky";
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentName = currentLang === 'ar' ? nameAr : nameEn;
    if (!isDeleting && charIndex <= currentName.length) {
        typingTextEl.textContent = currentName.substring(0, charIndex);
        charIndex++;
        setTimeout(typeWriter, 120);
    } else if (isDeleting && charIndex >= 0) {
        typingTextEl.textContent = currentName.substring(0, charIndex);
        charIndex--;
        setTimeout(typeWriter, 60);
    } else {
        isDeleting = !isDeleting;
        setTimeout(typeWriter, isDeleting ? 2000 : 500);
    }
}
setTimeout(typeWriter, 1800);

// نافذة تفاصيل الخدمات المنبثقة (Service Modal)
const modalOverlay = document.getElementById('serviceModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalIcon = document.getElementById('modalIcon');

const serviceDetailsData = {
    ar: {
        web: { title: "تصميم وتطوير المواقع", desc: "نقدم لك حلول ويب متكاملة، مواقع شخصية وتجارية فائقة السرعة، متجاوبة مع كافة الشاشات وبأحدث تقنيات البرمجة.", icon: "fas fa-laptop-code" },
        photo: { title: "التصوير الفوتوغرافي", desc: "خدمات تصوير احترافية تبرز أدق التفاصيل وتمنح أعمالك ولمساتك طابعاً جمالياً فريداً وساحراً.", icon: "fas fa-camera-retro" },
        video: { title: "المونتاج وتحرير الفيديو", desc: "إنتاج وتحرير فيديوهات احترافية تليق بالمحتوى الإبداعي ومنصات التوصل الاجتماعي بإيقاع جذاب ومؤثرات بصرية قوية.", icon: "fas fa-film" },
        marketing: { title: "التسويق الرقمي", desc: "استراتيجيات تسويقية متطورة لتعزيز ظهورك الرقمي، زيادة المتابعين، والوصول الفعّال لجمهورك المستهدف.", icon: "fas fa-chart-line" }
    },
    en: {
        web: { title: "Web Design & Dev", desc: "Providing full-stack web solutions, ultra-fast personal & business websites built with modern technologies.", icon: "fas fa-laptop-code" },
        photo: { title: "Photography", desc: "Professional photography services highlighting fine details with a unique aesthetic touch.", icon: "fas fa-camera-retro" },
        video: { title: "Video Editing", desc: "Producing and editing engaging videos tailored for creative content and social media platforms.", icon: "fas fa-film" },
        marketing: { title: "Digital Marketing", desc: "Advanced marketing strategies to boost your digital presence and reach your target audience effectively.", icon: "fas fa-chart-line" }
    }
};

document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const serviceKey = e.currentTarget.getAttribute('data-service');
        const data = serviceDetailsData[currentLang][serviceKey];
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalIcon.innerHTML = `<i class="${data.icon}"></i>`;
        modalOverlay.classList.add('active');
    });
});

closeModal.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

// تحويل شريط التنقل (Navbar) عند التمرير
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// تبديل الوضع (Dark / Light Mode)
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlRoot = document.getElementById('htmlRoot');

themeToggleBtn.addEventListener('click', () => {
    htmlRoot.classList.toggle('dark');
    htmlRoot.classList.toggle('light');
    
    if (htmlRoot.classList.contains('light')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// بيانات الترجمة الديناميكية
const translations = {
    ar: {
        nav_about: "من أنا",
        nav_passions: "شغفي",
        nav_services: "خدماتي",
        nav_work: "أعمالي",
        nav_contact: "تواصل معي",
        hero_badge: "مرحباً بك في موقعي الشخصي",
        hero_greeting: "أنا",
        hero_desc: "أنا شاب مصري أبلغ من العمر 17 عاماً، طالب في الصف الثالث الثانوي (مسار عام)، حققت 98% في اختبار القدرات العامة و100% في المدرسة، وأعيش في الرياض بالمملكة العربية السعودية.",
        btn_contact: "تواصل معي",
        btn_work: "استعرض أعمالي",
        stat_school: "مدرسة",
        stat_qudrat: "قدرات عامة",
        stat_vol: "ساعات تطوع",
        passions_title: "شغفي واهتماماتي",
        passions_subtitle: "المجالات والأنشطة التي شغوف بها وأسعى لتطوير نفسي فيها",
        p1_title: "الطب البشري",
        p1_desc: "طموحي وهدفي القادم للدراسة في كلية الطب البشري لخدمة المجتمع.",
        p2_title: "الطيران",
        p2_desc: "شغف كبير بعالم الطيران ومحاكاة الطيران والتعرف على هندسته.",
        p3_title: "المونتاج",
        p3_desc: "شغف بتعديل وتحرير الفيديو وإنتاج محتوى بصري جذاب واحترافي.",
        p4_title: "عمل المواقع",
        p4_desc: "الاهتمام بتطوير وبناء وبرمجة المواقع الإلكترونية الحديثة.",
        p5_title: "التصوير",
        p5_desc: "حب التصوير الفوتوغرافي وتوثيق اللحظات بلمسات إبداعية.",
        p6_title: "التسويق",
        p6_desc: "الاهتمام بمجال التسويق الرقمي واستراتيجيات نمو المشاريع.",
        p7_title: "الجيم (Fitness)",
        p7_desc: "الالتزام بالتمارين الرياضية وبناء الأجسام وتعزيز اللاقة البدنية.",
        services_title: "خدماتي",
        services_subtitle: "ما يمكنني تقديمه بمهارة واحترافية عالية",
        s1_title: "تصميم وتطوير المواقع",
        s1_desc: "بناء مواقع إلكترونية متجاوبة، سريعة، وذات تصميم عصري يلبي احتياجاتك.",
        s2_title: "التصوير الفوتوغرافي",
        s2_desc: "خدمات تصوير احترافية تبرز التفاصيل بدقة وجمالية عالية.",
        s3_title: "المونتاج وتحرير الفيديو",
        s3_desc: "إنتاج وتعديل الفيديوهات بإيقاع احترافي ومؤثرات بصرية مميزة.",
        s4_title: "التسويق الرقمي",
        s4_desc: "استراتيجيات تسويقية لتعزيز الظهور الرقمي والوصول للجمهور المستهدف.",
        view_details: "عرض التفاصيل",
        order_service: "اطلب الخدمة الآن",
        work_title: "أعمالي المميزة",
        work_subtitle: "نموذج لمشروع سابق قمت بتطويره",
        project_tag: "مشروع ويب",
        project_desc: "موقع إلكتروني متكامل بتصميم عصري وأنيق لمتجر قهوة، يعرض المنتجات بطريقة جذابة وسلسة للمستخدمين.",
        visit_project: "زيارة المشروع",
        contact_title: "تواصل معي",
        contact_subtitle: "يسعدني تواصلك معي عبر إحدى الوسائل التالية",
        wa_desc: "تواصل مباشر عبر الواتساب",
        email_title: "البريد الإلكتروني",
        footer_text: "© 2026 محمد ربيع الكعكي (Mohammed Elkaky). جميع الحقوق محفوظة."
    },
    en: {
        nav_about: "About Me",
        nav_passions: "Passions",
        nav_services: "Services",
        nav_work: "My Work",
        nav_contact: "Contact",
        hero_badge: "Welcome to my portfolio",
        hero_greeting: "I'm",
        hero_desc: "I am an Egyptian 17-year-old high school senior (General Track) student with 98% in general aptitude and 100% in school, living in Riyadh, Saudi Arabia.",
        btn_contact: "Contact Me",
        btn_work: "View My Work",
        passions_title: "My Passions",
        passions_subtitle: "Fields and activities I am passionate about and constantly developing in",
        p1_title: "Human Medicine",
        p1_desc: "My future ambition and goal to study Medicine to serve the community.",
        p2_title: "Aviation",
        p2_desc: "A deep passion for the world of aviation, flight simulation, and engineering.",
        p3_title: "Video Editing",
        p3_desc: "Passionate about video editing and producing engaging visual content.",
        p4_title: "Web Development",
        p4_desc: "Interest in developing, building, and coding modern websites.",
        p5_title: "Photography",
        p5_desc: "Love for photography and capturing moments with creative touches.",
        p6_title: "Marketing",
        p6_desc: "Interest in digital marketing and project growth strategies.",
        p7_title: "Fitness / Gym",
        p7_desc: "Dedicated to physical training, bodybuilding, and physical fitness.",
        services_title: "My Services",
        services_subtitle: "What I can offer with high skill and professionalism",
        s1_title: "Web Design & Dev",
        s1_desc: "Building responsive, fast, and modern websites tailored to your needs.",
        s2_title: "Photography",
        s2_desc: "Professional photography services highlighting fine details.",
        s3_title: "Video Editing",
        s3_desc: "Producing and editing videos with professional pacing and effects.",
        s4_title: "Digital Marketing",
        s4_desc: "Marketing strategies to enhance digital presence and reach targets.",
        view_details: "View Details",
        order_service: "Order Service Now",
        work_title: "Featured Projects",
        work_subtitle: "An example of a previous project I developed",
        project_tag: "Web Project",
        project_desc: "A fully integrated, modern and elegant website for a coffee shop, displaying products attractively and smoothly.",
        visit_project: "Visit Project",
        contact_title: "Contact Me",
        contact_subtitle: "I'd love to hear from you through any of the channels below",
        wa_desc: "Direct contact via WhatsApp",
        email_title: "Email",
        footer_text: "© 2026 Mohammed Rabea Elkaky. All rights reserved."
    }
};

const langToggleBtn = document.getElementById('langToggle');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

let currentLang = 'ar';

langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    
    if (currentLang === 'en') {
        htmlRoot.setAttribute('lang', 'en');
        htmlRoot.setAttribute('dir', 'ltr');
        langToggleBtn.textContent = 'AR';
    } else {
        htmlRoot.setAttribute('lang', 'ar');
        htmlRoot.setAttribute('dir', 'rtl');
        langToggleBtn.textContent = 'EN';
    }

    updateTexts();
});

function updateTexts() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
}

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});