import React, { useRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({
    children,
    className,
    variant = 'primary',
    onClick,
    ...props
}) {
    const baseStyles = 'group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-transform duration-500 will-change-transform hover:-translate-y-[1px]';
    const bezier = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    const variants = {
        primary: 'bg-champagne text-obsidian px-8 py-4',
        nav: 'bg-champagne text-obsidian px-6 py-2.5 text-sm',
        outline: 'border border-champagne text-champagne px-8 py-4',
    };

    const bgLayers = {
        primary: 'bg-ivory',
        nav: 'bg-ivory',
        outline: 'bg-champagne',
    };

    const textHover = {
        primary: 'group-hover:text-obsidian',
        nav: 'group-hover:text-obsidian',
        outline: 'group-hover:text-obsidian',
    };

    return (
        <button
            className={twMerge(clsx(baseStyles, variants[variant], className))}
            style={{ transitionTimingFunction: bezier }}
            onClick={onClick}
            {...props}
        >
            <span
                className={clsx(
                    "absolute inset-0 translate-y-[100%] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0",
                    bgLayers[variant]
                )}
            />
            <span className={clsx("relative z-10 transition-colors duration-500", textHover[variant])}>
                {children}
            </span>
        </button>
    );
}
