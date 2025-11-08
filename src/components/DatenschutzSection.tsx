import { Card } from "@/components/ui/card";
import { Mail, MapPin, Lock, Shield, Server, Trash2, ClipboardList, Info, Earth } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { Link } from "react-router-dom";


const DatenschutzSection = () => {
  const animations = [
    useScrollAnimation(),
    useScrollAnimation(),
    useScrollAnimation(),
    useScrollAnimation(),
    useScrollAnimation(),
    useScrollAnimation(),
    useScrollAnimation()
  ];

  return (
    <>
    <section id="datenschutz" className="py-16 container mx-auto px-4 animate-fadeIn">
        <div className="container mx-auto px-4">
            <header className="text-center mb-10">
                <h2 className="text-3xl font-bold text-club-primary">Datenschutz</h2>
                <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                    Informationen zur Erhebung, Verarbeitung und Nutzung personenbezogener Daten auf dieser Webseite sowie Ihre Rechte nach der DSGVO.
                </p>
            </header>

            {/* Allgemeine Hinweise */}
            <Card 
                ref={animations[0].elementRef}
                className={`mb-12 opacity-0 ${animations[0].isVisible ? 'animate-slideInLeft' : ''}`}
            >
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                    <Shield className="text-club-accent" />
                    Allgemeine Hinweise
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <span>
                                Nachfolgend möchten wir Sie über die Art, den Umfang und die Zwecke der Erhebung 
                                und Verwendung Ihrer personenbezogenen Daten auf unserer Webseite informieren. 
                                Wir behandeln personenbezogene Daten gemäß dieser Datenschutzerklärung und der 
                                gesetzlichen Vorschriften grundsätzlich vertraulich. Den Schutz Ihrer persönlichen 
                                Daten nehmen wir sehr ernst. Wenn Sie unsere Website benutzen, werden verschiedene 
                                personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie 
                                persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung 
                                erläutert, welche Daten wir erheben und wofür wir diese nutzen. Sie erläutert auch, 
                                wie und zu welchem Zweck das geschieht. Eine Datenübertragung im Internet kann 
                                z.B. bei E-Mail-Kommunikation Sicherheitslücken aufweisen. Wir möchten Sie darauf 
                                hinweisen, dass ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte nicht 
                                möglich ist.
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Verantwortliche Stelle */}
            <Card 
            ref={animations[1].elementRef}
            className={`mb-12 opacity-0 ${animations[1].isVisible ? 'animate-slideInRight' : ''}`}
            >
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                    <Info className="text-club-accent" />
                        Datenschutzerklärung
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p>Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:</p>
                        <div className="flex items-center gap-3">
                        <MapPin className="text-club-accent" size={20} />
                        <span>Schachclub Laufenburg e.V.<br/>c/o Jens Werther<br/>Wallbrunnstr. 74<br/>79539 Lörrach</span>
                        </div>
                        <div className="flex items-center gap-3">
                        <Mail className="text-club-accent" size={20} />
                        <a href="mailto:info@sc-laufenburg.de" className="underline hover:text-club-accent">info@sc-laufenburg.de</a>
                        </div>
                        <div className="flex items-center gap-3">
                        <Earth className="text-club-accent" size={20} />
                        <a href="http://www.sc-laufenburg.de" className="underline hover:text-club-accent">http://www.sc-laufenburg.de</a>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Datenverarbeitungszwecke */}
            <Card 
            ref={animations[2].elementRef}
            className={`mb-12 opacity-0 ${animations[2].isVisible ? 'animate-slideInLeft' : ''}`}
            >
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="text-club-accent" />
                    Datenverarbeitungs-<br></br> zwecke
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <span>
                                Wir verarbeiten Ihre personenbezogenen Daten nur zu den in dieser Datenschutzerklärung 
                                genannten Zwecken. Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als 
                                den genannten Zwecken findet nicht statt. Wir geben Ihre persönlichen Daten nur an Dritte 
                                weiter, wenn:<br/><br/>
                                - Sie Ihre ausdrückliche Einwilligung dazu erteilt haben,<br/>
                                - die Verarbeitung zur Abwicklung eines Vertrags mit Ihnen erforderlich ist,<br/>
                                - die Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist,<br/><br/>
                                die Verarbeitung zur Wahrung berechtigter Interessen erforderlich ist und kein Grund 
                                zur Annahme besteht, dass Sie ein überwiegendes schutzwürdiges Interesse an der 
                                Nichtweitergabe Ihrer Daten haben.
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Datenlöschung */}
            <Card 
            ref={animations[3].elementRef}
            className={`mb-12 opacity-0 ${animations[3].isVisible ? 'animate-slideInRight' : ''}`}
            >
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                    <Trash2 className="text-club-accent" />
                    Löschung der Daten
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <span>
                                Wir halten uns an die Grundsätze der Datenvermeidung und Datensparsamkeit. Wir speichern 
                                Ihre personenbezogenen Daten daher nur so lange, wie dies zur Erreichung der hier 
                                genannten Zwecke erforderlich ist oder wie es die vom Gesetzgeber vorgesehenen vielfältigen 
                                Speicherfristen vorsehen. Nach Fortfall des jeweiligen Zweckes bzw. Ablauf dieser Fristen 
                                werden die entsprechenden Daten routinemäßig und entsprechend den gesetzlichen Vorschriften 
                                gesperrt oder gelöscht.
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Server-Logfiles */}
            <Card 
            ref={animations[4].elementRef}
            className={`mb-12 opacity-0 ${animations[4].isVisible ? 'animate-slideInLeft' : ''}`}
            >
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                    <Server className="text-club-accent" />
                    Server-Logfiles
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <span>
                                Wenn Sie auf unsere Website zugreifen, werden automatisch Informationen allgemeiner Natur 
                                erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das 
                                verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und ähnliches. 
                                Hierbei handelt es sich ausschließlich um Informationen, welche keine Rückschlüsse auf Ihre 
                                Person zulassen.<br/><br/>
                                Diese Informationen sind technisch notwendig, um von Ihnen angeforderte Inhalte von Webseiten 
                                korrekt auszuliefern und fallen bei Nutzung des Internets zwingend an. Sie werden insbesondere 
                                zu folgenden Zwecken verarbeitet:<br/><br/>
                                - Sicherstellung eines problemlosen Verbindungsaufbaus der Website,<br/>
                                - Sicherstellung einer reibungslosen Nutzung unserer Website,<br/>
                                - Auswertung der Systemsicherheit und -stabilität sowie<br/>
                                - zu weiteren administrativen Zwecken.<br/><br/>
                                Die Verarbeitung Ihrer personenbezogenen Daten basiert auf unserem berechtigten Interesse aus 
                                den vorgenannten Zwecken zur Datenerhebung. Wir verwenden Ihre Daten nicht, um Rückschlüsse 
                                auf Ihre Person zu ziehen. Empfänger der Daten sind nur die verantwortliche Stelle und ggf. 
                                Auftragsverarbeiter.<br/><br/>
                                Anonyme Informationen dieser Art werden von uns ggfs. statistisch 
                                ausgewertet, um unseren Internetauftritt und die dahinterstehende Technik zu optimieren.
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* SSL-Verschlüsselung */}
            <Card 
            ref={animations[5].elementRef}
            className={`mb-12 opacity-0 ${animations[5].isVisible ? 'animate-slideInRight' : ''}`}
            >
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                    <Lock className="text-club-accent" />
                    SSL-Verschlüsselung
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <span>
                                Um die Sicherheit Ihrer Daten bei der Übertragung zu schützen, verwenden wir dem aktuellen 
                                Stand der Technik entsprechende Verschlüsselungsverfahren (z. B. SSL) über HTTPS.
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Kontaktformular */}
            <Card 
            ref={animations[6].elementRef}
            className={`mb-12 opacity-0 ${animations[6].isVisible ? 'animate-slideInLeft' : ''}`}
            >
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                    <Mail className="text-club-accent" />
                    Kontaktformular
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <span>
                                Wir verarbeiten Daten (z. B. Namen und Adressen sowie Kontaktdaten von Nutzern), die in den 
                                Kontaktformularen, Anmeldung für RSS-Feeds oder im Onlinemelder erhoben werden, um vertraglichen 
                                Verpflichtungen, Serviceleistungen und der Organisation von Wettkämpfen und Veranstaltungen 
                                nachzukommen.
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </section>
    <div className="mt-8 py-4 bg-gray-100 shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-4">
        <div className="flex flex-row sm:flex-col sm:mr-6 gap-3">
          <Link to="/impressum" className="hover:text-club-accent underline">
            Impressum
          </Link>
          <Link to="/datenschutz" className="hover:text-club-accent underline">
            Datenschutz
          </Link>
        </div>
        <span className="text-center sm:text-right">Copyright © 2000 - {new Date().getFullYear()} SC Laufenburg e.V.</span>
        <span className="text-gray-600">
          Letzte Änderung: 02.03.2025
        </span>
      </div>
    </div>
    </>
  );
};

export default DatenschutzSection;