import styled, { css } from 'styled-components'


export const Container = styled.div`
    .position-container{
        position: relative;
    }
`

export const BtnStyle = styled.div`
    position: relative;
    border-radius: 0.5rem; /* rounded-lg */
    padding: 0.5rem; /* p-2 */
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1); /* transition */
    cursor: pointer; /* cursor-pointer */

    &:hover {
        background-color: #f1f5f9; /* hover:bg-slate-100 */
    }
`

export const PopoverMenu = styled.div<{ $open: boolean }>`
  /* 1. Base Mobile Positioning */
  position: fixed;
  top: 4rem; /* top-16 */
  left: 1rem; /* left-4 */
  right: 1rem; /* right-4 */
  z-index: 50; /* z-50 */
  margin-top: 0.5rem; /* mt-2 */
  width: 18rem; /* w-72 */
  max-width: calc(100vw - 2rem); /* max-w-[calc(100vw-2rem)] */

  /* 2. Visual Styling */
  background-color: #ffffff; /* bg-white */
  border: 1px solid #e2e8f0; /* border border-slate-200 */
  border-radius: 0.75rem; /* rounded-xl */
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); /* shadow-xl */

  /* 3. Animation & Transitions */
  transform-origin: top right; /* origin-top-right */
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1); /* transition-all duration-200 */

  /* 4. Conditional State (Open vs Closed) */
  ${({ $open }) =>
    $open
      ? css`
          transform: scale(1); /* scale-100 */
          opacity: 1; /* opacity-100 */
          pointer-events: auto;
        `
      : css`
          transform: scale(0.95); /* scale-95 */
          opacity: 0; /* opacity-0 */
          pointer-events: none; /* pointer-events-none */
    `}
/* Some classes inside popover menu */
    .notification-item-container {
        max-height: 300px;
        overflow: auto;
        cursor: pointer;
        border-top: 1px solid #e5e7eb;
    }

    .no-notification-container{
        padding: 2rem 1rem;       /* py-8 (32px) e px-4 (16px) */
        text-align: center;       /* text-center */
        font-size: 0.875rem;      /* text-sm (14px) */
        line-height: 1.25rem;     /* text-sm (altura de linha padrão) */
        color: #64748b;           /* text-slate-500 */
    }

    .ht-bottom{
        border-top: 1px solid #e5e7eb; /* border-t (cor padrão do Tailwind) */
        padding: 0.75rem 1rem;         /* py-3 (12px) e px-4 (16px) */
        text-align: center;   
    }

  /* 5. Desktop / Tablet Breakpoint (sm: 640px) */
  @media (min-width: 640px) {
    position: absolute; /* sm:absolute */
    top: auto; /* sm:top-auto */
    right: 0; /* sm:right-0 */
    left: auto; /* sm:left-auto */
    width: 20rem; /* sm:w-80 */
    max-width: none; /* sm:max-w-none */
  }
`

export const NotificationDot = styled.span`
    position: absolute;
    top: 0.25rem; /* top-1 */
    right: 0.25rem; /* right-1 */
    height: 0.625rem; /* h-2.5 (10px) */
    width: 0.625rem; /* w-2.5 (10px) */
    border-radius: 9999px; /* rounded-full */
    background-color: #ef4444; /* bg-red-500 */
`

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #e2e8f0; /* Default Tailwind border color (slate-200) */
    padding-left: 1rem; /* px-4 */
    padding-right: 1rem; /* px-4 */
    padding-top: 0.75rem; /* py-3 */
    padding-bottom: 0.75rem; /* py-3 */

    .font-style {
        font-weight: 600;
    }
`

export const TextButton = styled.button`
  /* Base Reset & Cursor */
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer; /* cursor-pointer */

  /* Typography */
  font-size: 0.875rem; /* text-sm (14px) */
  line-height: 1.25rem;
  font-weight: 500; /* font-medium */

  /* Color & Hover State */
  color: #2563eb; /* text-blue-600 */
  transition: color 150ms ease-in-out;

  &:hover {
    color: #1d4ed8; /* hover:text-blue-700 */
  }

  /* Accessibility focus ring */
  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
`

export const NotificationContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: #f8fafc;
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1 1 0%;
  justify-content: space-between;
`;

export const Title = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
`;

export const Time = styled.p`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #64748b;
`;

export const UnreadDot = styled.span`
  margin-top: 0.5rem;
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 9999px;
  background-color: #2563eb;
`
