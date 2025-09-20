import { useState } from "react";
import { Folder, Image as ImgIcon, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const ArchiveSection = () => {
	const [query, setQuery] = useState("");

	return (
		<section id="about" className="py-16 animate-fadeIn">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-club-primary mb-6 text-center">
					Archiv & Download
				</h2>

				<p className="max-w-2xl mx-auto text-center text-gray-600 mb-8">
					Hier finden Sie wichtige Dokumente, historische Zusammenfassungen und
					Links zu unserer Chronik und Fotogalerie. Falls Sie Material
					beitragen möchten, nutzen Sie die Hinweise unten.
				</p>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
					<Link
						to="/archiv/chronik"
						className="group block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition"
					>
						<div className="flex items-center gap-4">
							<div className="p-3 rounded-md bg-club-accent text-white">
								<Folder className="w-6 h-6" />
							</div>
							<div>
								<h3 className="font-semibold">Chronik</h3>
								<p className="text-sm text-gray-500">
									Ausführliche zeitliche Darstellung der Vereinsgeschichte.
								</p>
							</div>
						</div>
					</Link>

					<Link
						to="/archiv/galerie"
						className="group block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition"
					>
						<div className="flex items-center gap-4">
							<div className="p-3 rounded-md bg-club-accent text-white">
								<ImgIcon className="w-6 h-6" />
							</div>
							<div>
								<h3 className="font-semibold">Fotogalerie</h3>
								<p className="text-sm text-gray-500">
									Historische Fotos und aktuelle Bilder — interaktiv in der
									Galerie.
								</p>
							</div>
						</div>
					</Link>

					<Link 
            to="/archiv/dokumente" 
            className="group block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition"
          >
						<div className="flex items-center gap-4">
							<div className="p-3 rounded-md bg-club-accent text-white">
								<FileText className="w-6 h-6" />
							</div>
							<div>
								<h3 className="font-semibold">Dokumente & Downloads</h3>
								<p className="text-sm text-gray-500">
									Satzungen, Formulare und weitere PDF-Dokumente zum Download.
								</p>
							</div>
						</div>
					</Link>
				</div>
				<div className="max-w-3xl mx-auto mt-6 py-6 border-t">
					<h4 className="text-lg font-semibold mb-2">Material beitragen</h4>
					<p className="text-sm text-gray-600 mb-3">
						Wenn Sie Fotos, Scans oder Dokumente haben, die zur Vereinsgeschichte
						beitragen, kontaktieren Sie uns bitte.
					</p>
					<div className="flex gap-3">
						<a
							href="mailto:info@sc-laufenburg.de"
							className="inline-flex items-center gap-2 px-4 py-2 rounded bg-club-accent text-white hover:bg-club-dark transition"
						>
							Kontakt per E‑Mail
						</a>
						<Link
							to="/kontakt"
							className="inline-flex items-center gap-2 px-4 py-2 rounded bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
						>
							Kontaktformular
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ArchiveSection;