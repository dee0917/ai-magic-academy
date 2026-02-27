import React from 'react';

const Footer = () => (
    <footer className="py-12 border-t border-white/5 text-center bg-[#050505] mt-auto">
        <div className="font-signature text-3xl text-zinc-600 mb-6">Dee.</div>
        <div className="flex justify-center gap-8 text-sm text-zinc-500 mb-8 font-medium">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://www.threads.net/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Threads</a>
        </div>
        <p className="text-xs text-zinc-700">© 2026 Dee. All rights reserved.</p>
    </footer>
);
export default Footer;