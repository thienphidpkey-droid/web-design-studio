import React from 'react';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectsProps {
    projects: ProjectItem[];
    onBackClick: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ projects, onBackClick }) => {
    return (
        <div className="min-h-screen py-24 scroll-mt-28">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <button
                        onClick={onBackClick}
                        className="group flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6"
                    >
                        <div className="p-2 rounded-full shadow-neu hover:shadow-neu-pressed transition-all">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="font-medium">Về trang chủ</span>
                    </button>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Tất Cả Dự Án
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl">
                        Khám phá bộ sưu tập đầy đủ các website và ứng dụng tôi đã thiết kế và phát triển.
                    </p>
                    <div className="mt-4 text-sm text-gray-400">
                        <span className="font-semibold text-blue-600">{projects.length}</span> dự án
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project, idx) => (
                        <a
                            key={idx}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group rounded-3xl bg-neu-base shadow-neu overflow-hidden aspect-[4/3] cursor-pointer hover:shadow-neu-pressed transition-all duration-300 block"
                        >
                            {/* Image Background */}
                            <div className="absolute inset-0">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
                                />
                                {/* Overlay for text legibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>
                            </div>

                            {/* Overlay Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg flex justify-between items-center hover:bg-white/20 transition-colors">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md">{project.title}</h3>
                                        <p className="text-white/80 text-xs font-medium uppercase tracking-wider">{project.cat}</p>
                                    </div>
                                    <div className="bg-white/20 p-2 rounded-full text-white hover:bg-blue-500 hover:text-white transition-all">
                                        <ExternalLink size={16} />
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
