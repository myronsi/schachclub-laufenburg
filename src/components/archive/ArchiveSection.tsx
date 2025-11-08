import { useState } from "react";
import { Folder, Image as ImgIcon, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";

const ArchiveSection = () => {
	const [query, setQuery] = useState("");

	return (
		<section id="about" className="py-16 animate-fadeIn">
			<div className="container mx-auto px-4">
				<header className="text-center mb-10">
					<h2 className="text-3xl font-bold text-club-primary">Archiv &amp; Download</h2>
					<p className="mt-3 text-gray-600 max-w-2xl mx-auto">
						Hier finden Sie wichtige Dokumente, historische Zusammenfassungen und
						Links zu unserer Chronik und Fotogalerie. Falls Sie Material
						beitragen möchten, nutzen Sie die Hinweise unten.
					</p>
				</header>

				<div className="flex flex-wrap justify-center gap-6 mb-10">
					{[
						{
							key: 'chronik',
							to: '/archiv/chronik',
							title: 'Chronik',
							subtitle: 'Historische Zusammenfassungen',
							description: 'Ausführliche zeitliche Darstellung der Vereinsgeschichte.',
							Icon: Folder
						},
						{
							key: 'galerie',
							to: '/archiv/galerie',
							title: 'Fotogalerie',
							subtitle: 'Fotos & Erinnerungen',
							description: 'Historische Fotos und aktuelle Bilder — interaktiv in der Galerie.',
							Icon: ImgIcon
						},
						{
							key: 'dokumente',
							to: '/archiv/dokumente',
							title: 'Dokumente & Downloads',
							subtitle: 'Formulare & Satzungen',
							description: 'Satzungen, Formulare und weitere PDF-Dokumente zum Download.',
							Icon: FileText
						}
					].map((item) => {
						const Icon = item.Icon as any;
						return (
							<article
								key={item.key}
								className="w-full sm:w-80 flex-none bg-white rounded-lg shadow-sm p-5 flex flex-col hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
								aria-labelledby={`a-${item.key}-title`}
							>
								<div className="flex items-start gap-4">
									<div className="w-12 h-12 flex items-center justify-center rounded-full bg-club-primary/10 text-club-primary shrink-0">
										<Icon className="w-6 h-6" />
									</div>

									<div className="flex-1">
										<h3 id={`a-${item.key}-title`} className="text-lg font-semibold">{item.title}</h3>
										<p className="text-sm text-gray-500">{item.subtitle}</p>
									</div>
								</div>

								<p className="text-sm text-gray-600 mt-4 flex-1">{item.description}</p>

								<div className="mt-4 flex items-center justify-between">

									<Link
										to={item.to}
										className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded bg-club-accent text-white hover:bg-club-dark transition-colors"
										aria-label={`Mehr zu ${item.title}`}
									>
										Details
									</Link>
								</div>
							</article>
						);
					})}
				</div>
				<div className="max-w-3xl mx-auto mt-6 py-6 border-t">
					<h4 className="text-lg font-semibold mb-2">Material beitragen</h4>
					<p className="text-sm text-gray-600 mb-3">
						Wenn Sie Fotos, Scans oder Dokumente haben, die zur Vereinsgeschichte
						beitragen, kontaktieren Sie uns bitte.
					</p>
					<div className="flex gap-3">
						<Link
							to="/kontakt"
							className="inline-flex items-center gap-2 px-4 py-2 rounded bg-club-accent text-white hover:bg-club-dark transition"
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