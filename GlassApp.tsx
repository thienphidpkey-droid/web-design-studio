import React, { useState, useEffect } from 'react';
import { 
  Github, Twitter, Linkedin, Instagram, Dribbble, Palette, 
  Code, Layers, Smartphone, Mail, ExternalLink, Home, User, Folder, Send
} from 'lucide-react';
import { ProjectItem } from './types';

// Data
const ALL_PROJECTS: ProjectItem[] = [
  {
    title: "Heona Media",
    cat: "Creative Agency",
    url: "https://heonamedia.vercel.app/",
    image: "https://i.postimg.cc/nLs1yFp1/a1.jpg"
  },
  {
    title: "Neon Glide Patin",
    cat: "Sports E-commerce",
    url: "https://neon-glide-patin.vercel.app/",
    image: "https://i.postimg.cc/MGcYC6qt/a2.jpg"
  },
  {
    title: "Emerald Estate",
    cat: "Real Estate",
    url: "https://emerald-estate.vercel.app/",
    image: "https://i.postimg.cc/XvZgRj4K/a3.jpg"
  },
  {
    title: "Sen Mộc Spa",
    cat: "Beauty & Wellness",
    url: "https://senmocspa.vercel.app/",
    image: "https://i.postimg.cc/2SHDHwSh/spa-nedir.jpg"
  },
  {
    title: "Minh An Studio",
    cat: "Photography Portfolio",
    url: "https://minh-an-studio.vercel.app/",
    image: "https://i.postimg.cc/g0wKCzmq/a5.jpg"
  },
  {
    title: "Nha Khoa T-M-C",
    cat: "Medical Clinic",
    url: "https://nha-khoa-t-m-c.vercel.app/",
    image: "https://i.postimg.cc/g0wKCzmq/a5.jpg"
  },
  {
    title: "Web design CreativeFlow",
    cat: "Design Studio",
    url: "#",
    image: "https://i.postimg.cc/KYK56GxT/a7.jpg"
  },
  {
    title: "Camera Pro",
    cat: "Photography Gear",
    url: "https://camerapro-eight.vercel.app/",
    image: "https://i.postimg.cc/hGJ0kDcz/a8.jpg"
  },
  {
    title: "English Note Center",
    cat: "Education",
    url: "https://english-note-center.vercel.app/",
    image: "https://i.postimg.cc/LsqVc92J/a9.jpg"
  },
  {
    title: "Luxe Bijoux",
    cat: "Luxury Jewelry",
    url: "https://luxe-bijoux.vercel.app/",
    image: "https://i.postimg.cc/jS3X3w0N/a10.jpg"
  },
  {
    title: "Luxury Fashion",
    cat: "Fashion E-commerce",
    url: "https://luxury-fashion.vercel.app/",
    image: "https://i.postimg.cc/mgpwpzfF/a11.jpg"
  },
  {
    title: "Portfolio",
    cat: "Creative Portfolio",
    url: "https://portfolio-thienphidpkey-droids-projects.vercel.app/",
    image: "https://i.postimg.cc/JzYqYDV0/a12.jpg"
  },
  {
    title: "Business Automation",
    cat: "SaaS Platform",
    url: "https://business-automation-ten.vercel.app/",
    image: "https://i.postimg.cc/Mp3D3M2X/a13.jpg"
  },
  {
    title: "Liquid Automation",
    cat: "Automation Platform",
    url: "https://liquid-automation.vercel.app/",
    image: "https://i.postimg.cc/DwpgpJkw/a14.jpg"
  },
  {
    title: "Notebook Flips",
    cat: "Interactive Notebook",
    url: "https://notebook-flips.vercel.app/",
    image: "https://i.postimg.cc/2S9w9bRj/a15.jpg"
  },
];

const GlassApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500/30 selection:text-purple-200 overflow-hidden relative">
      
      {/* Background Ambient Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row h-screen p-4 gap-4 overflow-hidden">
        
        {/* LEFT SIDEBAR - Profile & Nav */}
        <aside className="w-full lg:w-[350px] flex-shrink-0 flex flex-col gap-4 animate-slide-left">
          
          {/* Profile Card */}
          <div className="glass rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="w-32 h-32 rounded-full border-4 border-white/10 shadow-2xl mb-6 overflow-hidden relative">
              <img 
                src="https://i.postimg.cc/placeholder3.png" 
                alt="Profile" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                   // Fallback if image fails
                   (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Creative+Flow&background=0D8ABC&color=fff';
                }}
              />
            </div>
            
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
              CreativeFlow
            </h1>
            <p className="text-sm text-gray-400 mb-6 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              Freelance Web Designer & Developer
            </p>
            
            <div className="flex gap-4 mb-8">
              {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/20 hover:text-blue-400 transition-all duration-300 border border-white/5 hover:scale-110">
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <button 
              onClick={() => scrollTo('contact')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Liên Hệ Ngay
            </button>
          </div>

          {/* Navigation */}
          <nav className="glass rounded-3xl p-4 flex-1 flex flex-col justify-center gap-2">
            {[
              { id: 'home', label: 'Trang Chủ', icon: Home },
              { id: 'about', label: 'Giới Thiệu', icon: User },
              { id: 'projects', label: 'Dự Án', icon: Folder },
              { id: 'contact', label: 'Liên Hệ', icon: Send },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group
                  ${activeSection === item.id 
                    ? 'bg-white/10 text-white shadow-lg border border-white/10' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white hover:pl-6'
                  }
                `}
              >
                <item.icon size={20} className={`${activeSection === item.id ? 'text-blue-400' : 'group-hover:text-blue-400'} transition-colors`} />
                <span className="font-medium">{item.label}</span>
                {activeSection === item.id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"></div>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* RIGHT CONTENT - Scrollable */}
        <main className="flex-1 glass rounded-3xl overflow-y-auto overflow-x-hidden relative hide-scrollbar animate-slide-right scroll-smooth">
          
          {/* HOME SECTION */}
          <section id="home" className="min-h-full p-8 md:p-12 flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 p-8 opacity-50">
              <div className="text-8xl font-black text-white/5 select-none">01</div>
            </div>
            
            <div className="max-w-2xl animate-slide-down-fade">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                AVAILABLE FOR WORK
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                Biến Ý Tưởng <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Thành Hiện Thực
                </span>
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
                Tôi chuyên thiết kế và xây dựng các trải nghiệm kỹ thuật số đẳng cấp, kết hợp giữa thẩm mỹ tinh tế và công nghệ hiện đại.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-8 px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <div className="text-3xl font-bold text-white">5+</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Năm Kinh Nghiệm</div>
                  </div>
                  <div className="w-px h-10 bg-white/10"></div>
                  <div>
                    <div className="text-3xl font-bold text-white">50+</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Dự Án Hoàn Thành</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT / SERVICES SECTION */}
          <section id="about" className="min-h-full p-8 md:p-12 relative border-t border-white/5">
            <div className="absolute top-0 right-0 p-8 opacity-50">
              <div className="text-8xl font-black text-white/5 select-none">02</div>
            </div>
            
            <h3 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <span className="w-10 h-1 bg-blue-500 rounded-full"></span>
              Dịch Vụ Cung Cấp
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Palette, title: "UI/UX Design", desc: "Thiết kế giao diện người dùng trực quan, hiện đại, tối ưu trải nghiệm." },
                { icon: Code, title: "Web Development", desc: "Xây dựng website hiệu năng cao, chuẩn SEO với công nghệ mới nhất." },
                { icon: Layers, title: "3D Visuals", desc: "Tích hợp các yếu tố 3D tương tác và hiệu ứng chuyển động mượt mà." },
                { icon: Smartphone, title: "Responsive", desc: "Tương thích hoàn hảo trên mọi thiết bị từ di động đến máy tính." }
              ].map((service, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="text-blue-400" size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-gray-200">{service.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section id="projects" className="min-h-full p-8 md:p-12 relative border-t border-white/5">
            <div className="absolute top-0 right-0 p-8 opacity-50">
              <div className="text-8xl font-black text-white/5 select-none">03</div>
            </div>
            
            <h3 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <span className="w-10 h-1 bg-purple-500 rounded-full"></span>
              Dự Án Tiêu Biểu
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ALL_PROJECTS.map((project, idx) => (
                <a 
                  key={idx} 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative rounded-2xl overflow-hidden aspect-video bg-gray-900 border border-white/10"
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-blue-400 text-xs font-bold tracking-wider mb-1">{project.cat}</div>
                      <h4 className="text-xl font-bold text-white flex items-center gap-2">
                        {project.title}
                        <ExternalLink size={16} className="opacity-50" />
                      </h4>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact" className="min-h-full p-8 md:p-12 relative border-t border-white/5">
            <div className="absolute top-0 right-0 p-8 opacity-50">
              <div className="text-8xl font-black text-white/5 select-none">04</div>
            </div>
            
            <h3 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <span className="w-10 h-1 bg-pink-500 rounded-full"></span>
              Liên Hệ
            </h3>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Họ tên</label>
                    <input type="text" className="w-full bg-black/20 rounded-xl border border-white/10 p-4 outline-none text-white focus:border-blue-500/50 focus:bg-black/40 transition-all" placeholder="Tên của bạn" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Email</label>
                    <input type="email" className="w-full bg-black/20 rounded-xl border border-white/10 p-4 outline-none text-white focus:border-blue-500/50 focus:bg-black/40 transition-all" placeholder="email@example.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Tin nhắn</label>
                  <textarea rows={4} className="w-full bg-black/20 rounded-xl border border-white/10 p-4 outline-none text-white focus:border-blue-500/50 focus:bg-black/40 transition-all resize-none" placeholder="Nội dung tin nhắn..."></textarea>
                </div>

                <button type="submit" className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                  <Send size={18} />
                  Gửi Tin Nhắn
                </button>
              </form>
            </div>
            
            <footer className="mt-20 text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} CreativeFlow Design. All rights reserved.</p>
            </footer>
          </section>

        </main>
      </div>
    </div>
  );
};

export default GlassApp;
