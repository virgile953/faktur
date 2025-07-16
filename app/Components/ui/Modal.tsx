import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
	maxWidth?: string;
}

export default function Modal({
	isOpen,
	onClose,
	title,
	children,
	maxWidth = "max-w-md",
}: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpen) {
			// Store original body overflow and scroll position
			const originalOverflow = document.body.style.overflow;
			const scrollY = window.scrollY;

			// Prevent scrolling
			document.body.style.overflow = "hidden";
			document.body.style.position = "fixed";
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = "100%";

			const handleEscape = (event: KeyboardEvent) => {
				if (event.key === "Escape") {
					onClose();
				}
			};

			document.addEventListener("keydown", handleEscape);

			// Focus management
			if (modalRef.current) {
				modalRef.current.focus();
			}

			return () => {
				// Restore scrolling and position
				document.body.style.overflow = originalOverflow;
				document.body.style.position = "";
				document.body.style.top = "";
				document.body.style.width = "";
				window.scrollTo(0, scrollY);

				document.removeEventListener("keydown", handleEscape);
			};
		}
	}, [isOpen, onClose]);

	// Handle backdrop click
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	if (!isOpen) return null;

	const modalContent = (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
			onClick={handleBackdropClick}
		>
			<div
				ref={modalRef}
				className={`bg-gray-800 p-6 rounded-lg ${maxWidth} w-full mx-4 max-h-[90vh] overflow-y-auto`}
				tabIndex={-1}
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-title"
			>
				<div className="flex justify-between items-center mb-4">
					<h2 id="modal-title" className="text-xl font-bold">
						{title}
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-white text-2xl leading-none"
						aria-label="Close modal"
					>
						×
					</button>
				</div>
				{children}
			</div>
		</div>
	);

	// Render modal in a portal to ensure it's rendered at the document root
	return typeof document !== "undefined"
		? createPortal(modalContent, document.body)
		: null;
}
