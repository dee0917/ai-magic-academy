import React, { useState, useEffect } from 'react';

interface TypewriterProps {
    texts: string[];
    speed?: number;
    delay?: number;
    className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ texts, speed = 150, delay = 2000, className = "" }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleType = () => {
            const fullText = texts[currentTextIndex];
            if (isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length - 1));
            } else {
                setCurrentText(fullText.substring(0, currentText.length + 1));
            }

            if (!isDeleting && currentText === fullText) {
                setTimeout(() => setIsDeleting(true), delay);
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setCurrentTextIndex((prev) => (prev + 1) % texts.length);
            }
        };

        const timer = setTimeout(handleType, isDeleting ? speed / 2 : speed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, texts, currentTextIndex, speed, delay]);

    return (
        <span className={`inline-flex items-center ${className}`}>
            {currentText}
            <span className="animate-blink ml-1 text-zinc-500">|</span>
        </span>
    );
};
export default Typewriter;
